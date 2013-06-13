(function (scope) {

    var Game = function() {};

    var p = Game.prototype;
    var CurrentGame = scope.currentGame;
    var Assets = CurrentGame.Assets;
    var GamePad = GameLibs.GamePad;

	var TargetFPS = 60;

    /**
     * Public Properties
     */
	p.debugMode = false;
	p.debugShape = null;

    p.lastTick;
    p.levelManager;
    p.proximityManager;
    p.stage;
    p.hud;
    p.bg;
    p.player;
	p.spritesBehind; // Sprite containers for behind and in front of mushrooms.
	p.spritesInFront;

    p.isPaused;
    p.isPlayerDead;

    p.currentScore;

    p.centipedeList = [];
    p.currentSpider;
    p.currentFlea;
    p.currentScorpion;

	p.lastLengthChecked = 0;
	p.lastPoisonChecked = false;

	p.joystick = null;


    p.initialize = function(p_assets, p_stage, gameInfo){

        //Parse TexturePackerData and initialize Assets class
	    this.assets = p_assets;
        var textureSheetJSON = p_assets["TextureSheet"];
        for(var p in textureSheetJSON.animations){
	        textureSheetJSON.animations[p].frequency = TargetFPS / 20;
		}
	    Assets.textureSheet = new GameLibs.SpriteSheetWrapper(textureSheetJSON, "images/");

        this.stage = p_stage;

        //Store off game width/height so it's globally accessible
        this.width = CurrentGame.width = this.stage.canvas.width;
        this.height = CurrentGame.height = this.stage.canvas.height;

        //Set background
        this.dayBg = new Bitmap(p_assets["backgroundDay"]);
	    this.stage.addChild(this.dayBg);

	    //Need to delay this call a bit, otherwise it can show up before the DayBG is rendered.
	    //setTimeout(function(){
		    var bg = GameLibs.GameUI.changeBackground(p_assets["background"], gameInfo.width, gameInfo.height);
	        p_stage.addChildAt(bg, 0);
	    //}, 500);

        //Adjust ticker FPS
        Ticker.setFPS(TargetFPS);
		this.lastTick = Ticker.getTime();

		this.spritesBehind = new Container();
		this.stage.addChild(this.spritesBehind);

        //Bg to hold a grid of mushrooms
        this.bg = new CurrentGame.BG();
        this.bg.initialize(this);

		this.spritesInFront = new Container();
		this.stage.addChild(this.spritesInFront);

        //Gnome!
        this.player = new CurrentGame.Player();
        this.player.initialize(this.spritesInFront, this.bg);
        this.player.onShotCallback = Atari.proxy(this.hitTestShot, this);

	    //Init sound manager
	    CurrentGame.BackgroundSound.init(this);

        //Hud
        this.currentScore = 0;
        this.hud = new CurrentGame.HUD(this, gameInfo);

        //Level Manager to manage progression through levels
        this.levelManager = new CurrentGame.LevelManager(this, CurrentGame);

        //GamePad to handle user input
	    if (Atari.developerMode) {
            GamePad.player.onButtonDown = Atari.proxy(this.onButtonDown, this);
	    }

	    if(gameInfo.touchEnabled){
		    var ss = new GameLibs.SpriteSheetWrapper(this.assets.controls, "images/");

		    this.joystick = new GameLibs.Joystick(new Rectangle(0, 0, this.width/2, this.height), {
			    controlDirection:true,
			    autoHide: false,
			    autoMove: true,
			    showStick: false,
				radius: 34
		    }, ss);
		    this.joystick.setPosition(100, gameInfo.height-72);

		    this.fireBtn = new GameLibs.ArcadeButton(GameLibs.GamePad.BUTTON_1,
		        new Rectangle(this.width/2, 0, this.width/2, this.height), ss, "fire");
		    this.fireBtn.setPosition(gameInfo.width - 124, gameInfo.height-72);

		    this.stage.addChild(this.joystick.sprite, this.fireBtn.sprite);
	    }

		//A43 - Debug
		if(this.debugMode) {
			this.debugShape = new Shape();
			this.stage.addChild(this.debugShape);
		}

	    //FPS Meter (debug)
        //new GameLibs.FPSMeter(this.stage);
    };

	/**
	 * This is used for debugging only, lets us easily shoot specific segments.
	 */
	p.snipe = function(){
		this.levelManager.nextLevel();
		//this.player.kill();
		//var centipede = this.centipedeList[this.centipedeList.length-1];
		//if(Math.random() < .1 || centipede.segmentList.length == 0){
			//this.hitTestShot({x: centipede.head.display.x, y: centipede.head.display.y, width: 10, height: 10});
		//} else {
		//	var seg = centipede.segmentList[2];
		//	this.hitTestShot({x: seg.x, y: seg.y, width: 10, height: 10});
		//}
	};

    p.startGame = function(){
	    this.levelManager.startGame();
        this.hud.setLives(this.player.lives);
        this.hud.setScore(this.currentScore);
    };

    p.endGame = function() {
	    this.cleanUp();
    };

	p.cleanUp = function() {
	    //HighScores.saveLocalScore("centipede", this.currentScore);
	    this.currentScore = 0;
	    this.hud.setScore(this.currentScore);
		this.levelManager.reset();
        this.removeEnemies();
        this.bg.reset();
    };

	/***********************************************************************
     * Framework Hooks
     **********************************************************************/

    p.pause = function(value){
        this.isPaused = value;
	    if(value){
		    scope.currentGame.BackgroundSound.pause();
		    this.levelManager.lastFleaSound && this.levelManager.lastFleaSound.pause();
	    } else {
		    scope.currentGame.BackgroundSound.resume();
		    this.levelManager.lastFleaSound && this.levelManager.lastFleaSound.resume();
	    }
    };

    p.getScore = function(){
		return new GameLibs.GameDetails(this.currentScore, this.levelManager._currentLevel, this.player.lives);
    };

    p.continueGame = function(keepPoints) {
	    if (!keepPoints) {
		    this.currentScore = 0;
		    this.hud.setScore(this.currentScore);
	    }
	    scope.currentGame.BackgroundSound.init(this);
		this.levelManager.continueGame();
    };

    p.restart = function() {
		this.cleanUp();
	    scope.currentGame.BackgroundSound.init(this);
	    this.startGame();
    };

    p.destroy = function(){

    };


    /*********************************************************************
     * Framework Callbacks
     **********************************************************************/
    p.onLevelComplete = null;
    p.onGameComplete = null;
    p.onGameOver = null;
    p.onGameError = null;


	/*********************************************************************
     * GamePad ButtonPressed
     * @param code
	 /********************************************************************* */
    p.onButtonDown = function(code){
        //DEBUG: Hit Ctrl to kill the first centipede in the list
        if(code == GamePad.BUTTON_2){
            //if(this.tempIndex == null){ this.tempIndex = 0; }
            //this.tempIndex = (++this.tempIndex <= 11)? this.tempIndex : 1;
            //this.levelManager.updateColorPalette(this.tempIndex);
	        this.snipe();
        }
    };


    /***********************************************************************
     * CORE GAME ENGINE
     **********************************************************************/
    p.tick = function(){
        //Respect internal pause flag
        if(this.isPaused || !this.hud){ return; }

	    //If the player is dead set an internal flag and let LevelManager decide what to do next...
        if(this.player.isDead){
            if(!this.isPlayerDead){
                this.isPlayerDead = true;
                this.levelManager.onPlayerKilled();
	            scope.currentGame.BackgroundSound.update();
                this.hud.setLives(this.player.lives);
            }
            return;
        } else {
            this.isPlayerDead = false;
        }

        //Propagate tick
	    var tickFactor = Math.min(Ticker.getTime() - this.lastTick, 50) / 30;
	    this.lastTick = Ticker.getTime();
        this.levelManager.tick(tickFactor);
        this.player.tick(tickFactor);

	    //Make sure HUD is on top of everything else
        if(this.stage.getChildIndex(this.hud.display) < this.stage.getNumChildren() - 1){
            this.stage.setChildIndex(this.hud.display, this.stage.getNumChildren() - 1);
        }

        //Check for collisions between player and enemy sprites
        var enemyList = this.centipedeList.concat([this.currentFlea, this.currentScorpion, this.currentSpider]);
        var playerHit = false;
        var enemy;
        for(var i = 0, l = enemyList.length; i < l; i++){
            enemy = enemyList[i];
            if(!enemy){ continue; }
            //It's a centipede, hit test each segment
            if(this.centipedeList.indexOf(enemy) != -1){
                var pieces = enemy.segmentList.concat([enemy.head]);
                for(var j = 0, m = pieces.length; j < m; j++){
                    playerHit = this.hitTestRects(pieces[j].hitBox, this.player.hitBox, 1);
                    if(playerHit){
                        this.player.kill();
                        break;
                    }
                }
            }
            //It's some other enemy, hit test directly
            else {
                playerHit = this.hitTestRects(enemy.hitBox, this.player.hitBox, 1);
                if(playerHit){
					this.player.kill();
                    enemy.kill();
                    this.addExplosionAt(enemy.display.x, enemy.display.y);
                }
            }
        }

		//A43 - Draw out EVERYTHING'S hitboxes.
		if(this.debugMode) {
			this.debugShape.graphics.clear();
			this.debugShape.graphics.beginStroke("rgba(255,255,255,1)");
			this.debugShape.graphics.drawRect(this.player.hitBox.x,this.player.hitBox.y,this.player.hitBox.width,this.player.hitBox.height);
			this.debugShape.graphics.drawRect(this.player.shotHitBox.x,this.player.shotHitBox.y,this.player.shotHitBox.width,this.player.shotHitBox.height);

			if(this.currentSpider) {
				this.currentSpider.setPosition(this.width>>1, this.height - 100);
				this.debugShape.graphics.drawRect(this.currentSpider.hitBox.x,this.currentSpider.hitBox.y,this.currentSpider.hitBox.width,this.currentSpider.hitBox.height);
			}
			if(this.currentFlea) {
				this.currentFlea.setPosition((this.width>>1) - 200, this.height - 100);
				this.debugShape.graphics.drawRect(this.currentFlea.hitBox.x,this.currentFlea.hitBox.y,this.currentFlea.hitBox.width,this.currentFlea.hitBox.height);
			}
			if(this.currentScorpion) {
				this.currentScorpion.setPosition((this.width>>1) + 200, this.height - 100);
				this.debugShape.graphics.drawRect(this.currentScorpion.hitBox.x,this.currentScorpion.hitBox.y,this.currentScorpion.hitBox.width,this.currentScorpion.hitBox.height);
			}

			var mushrooms = this.bg.getMushroomArray();
			for(var i= 0, l = mushrooms.length; i<l; i++) {
				var mushroom = mushrooms[i];
				this.debugShape.graphics.drawRect(mushroom.hitBox.x,mushroom.hitBox.y,mushroom.hitBox.width,mushroom.hitBox.height);
			}
			for(i= 0, l = this.centipedeList.length; i<l; i++) {
				var cent = this.centipedeList[i];
				this.debugShape.graphics.drawRect(cent.head.hitBox.x,cent.head.hitBox.y,cent.head.hitBox.width,cent.head.hitBox.height);
				for(j= 0, k = cent.segmentList.length; j<k; j++) {
					var seg = cent.segmentList[j];
					this.debugShape.graphics.drawRect(seg.hitBox.x,seg.hitBox.y,seg.hitBox.width,seg.hitBox.height);
				}
			}
		}
    };

    /**
     * Check for collisions between 2 sprites. Sprites MUST have regX, regY, width and height injected.
     * @param sprite1
     * @param sprite2
     */
    p.hitTestSprites = function(sprite1, sprite2, scale){
	    if(scale == null){ scale = 1; }
	    scale *= .5;
        //[SB] This is called often, so I've optimized it not to allocate any memory. Hard to read, but less work for the GC :)
        if(Math.abs((sprite1.x + sprite1.width * .5 - sprite1.regX) - (sprite2.x + sprite2.width* .5 - sprite2.regX)) < (sprite1.width + sprite2.width) * scale &&
           Math.abs((sprite1.y + sprite1.height * .5 - sprite1.regY) - (sprite2.y + sprite2.height * .5 - sprite2.regY)) < (sprite1.height + sprite2.height) * scale){
            return true;
        }
        return false;
    };
	/**
	 * Check for collisions between 2 rectangles. This is for checking hitBoxes.
	 * @param sprite1
	 * @param sprite2
	 */
	p.hitTestRects = function(rect1, rect2, scale){
		if(scale == null){ scale = 1; }
		scale *= .5;
		//[SB] This is called often, so I've optimized it not to allocate any memory. Hard to read, but less work for the GC :)
		if(Math.abs((rect1.x + rect1.width * .5) - (rect2.x + rect2.width* .5)) < (rect1.width + rect2.width) * scale &&
			Math.abs((rect1.y + rect1.height * .5) - (rect2.y + rect2.height * .5)) < (rect1.height + rect2.height) * scale){
			return true;
		}
		return false;
	};

    /**
     * Test a shot against mushrooms and enemies.
     * Once a player fires a shot, he will request this hitTest from the main game.
     * @param shot
     */
    p.hitTestShot = function(shot){

	    var hitSuccess = false;
		var hitBox;

        var mushroom = this.bg.shootMushroom(shot);
        if(mushroom != null){
            if(mushroom.parent == null){
                this.addToScore(1);
            }
	        hitSuccess = true;
        }

        //Hit test centipedes
        if(this.centipedeList.length > 0){
            for(var i = this.centipedeList.length - 1; i >= 0; i--){
	            var centipede = this.centipedeList[i];
                if(centipede.hitTestShot(shot)){
                    var firstCorpse = centipede.deadSegments.shift();
                    this.bg.addMushroomAt(firstCorpse.x, firstCorpse.y);
                    this.addExplosionAt(firstCorpse.x, firstCorpse.y);
	                this.spritesBehind.removeChild(firstCorpse);

                    if(centipede.deadSegments.length > 0){
                        var newCentipede = new CurrentGame.Centipede();
	                    newCentipede.initialize(this.spritesBehind, this.bg);
	                    newCentipede.createFromCorpse(centipede.deadSegments, centipede.head);
                        this.centipedeList.push(newCentipede);
                        this.addToScore(10);
                    } else {
                        this.addToScore(100);
                    }
                    hitSuccess = true;
                }
            }
        }
        //Hit test Flea
        if(this.currentFlea){
			hitBox = this.currentFlea.hitBox;
            var dx = hitBox.x + (hitBox.width >>1) - (shot.x + shot.width/2);

            if(hitBox.y >= shot.y &&
               Math.abs(dx) < (hitBox.width + shot.width)/2){
                var isDead = this.currentFlea.shot();
	            this.addExplosionAt(this.currentFlea.display.x, this.currentFlea.display.y);
	            if(isDead){
					this.addToScore(200);
				}
	            hitSuccess = true;
            }
        }

        //Hit test Spider
        if(this.currentSpider){
			hitBox = this.currentSpider.hitBox;
            var dx = hitBox.x + (hitBox.width >> 1) - (shot.x + (shot.width>>1));
            var dy = hitBox.y - (shot.y + (shot.height>>1));
            if(Math.abs(dx) < hitBox.width >>1 &&
               Math.abs(dy) < hitBox.height >>1){
                this.currentSpider.kill();
                this.addExplosionAt(this.currentSpider.display.x, this.currentSpider.display.y);

                hitSuccess = true;
				var row = (this.currentSpider.hitBox.y / this.bg.rowHeight | 0);
				//More points if the spider is lower down the grid...
				if(row <= this.bg.rowCount - 10){
					this.addToScore(300);
					this.addFLoaty(Assets.TEX_300, this.currentSpider.display.x, this.currentSpider.display.y);
				} else if(row <= this.bg.rowCount - 6){
					this.addToScore(600);
					this.addFLoaty(Assets.TEX_600, this.currentSpider.display.x, this.currentSpider.display.y);
				} else {
					this.addToScore(900);
					this.addFLoaty(Assets.TEX_900, this.currentSpider.display.x, this.currentSpider.display.y);
				}
            }
        }

        //Hit test Scorpion
        if(this.currentScorpion){
			hitBox = this.currentScorpion.hitBox;
            var dx = hitBox.x + (hitBox.width >> 1) - (shot.x + (shot.width>>1));
            var dy = hitBox.y - (shot.y + (shot.height>>1));

            if(Math.abs(dx) < hitBox.width >>1 &&
               Math.abs(dy) < hitBox.height >>1){
                this.currentScorpion.kill();
                this.addExplosionAt(this.currentScorpion.display.x, this.currentScorpion.display.y);

                hitSuccess = true;
                this.addToScore(900);
                this.addFLoaty(Assets.TEX_900, this.currentScorpion.display.x, this.currentScorpion.display.y);
            }
        }
        return hitSuccess;
    };

	p.addExplosionAt = function(x, y, scale){
		if(isNaN(scale)){ scale = 1; }
		var explosion = Assets.getBitmapAnimation(Assets.TEX_EXPLOSION, true);
		explosion.x = x;
		explosion.y = y;
		explosion.scaleX = explosion.scaleY = scale;
		this.spritesInFront.addChild(explosion);
		explosion.onAnimationEnd = this.onExplosionComplete;
		SoundJS.play(Assets.SND_EXPLOSION);

	};

    p.addFLoaty = function(texture, x, y){
        var floaty = Assets.getBitmapAnimation(texture, true);
	    var animation = floaty.spriteSheet.getAnimation(texture);
	    animation.next = false;

	    floaty.x = x;
        floaty.y = y;
        this.spritesInFront.addChild(floaty);

        Tween.get(floaty).to({y: y - 25}, 500).wait(500).to({alpha: 0}, 350);
        setTimeout(function(){
            floaty.parent.removeChild(floaty);
        }, 1500);
    };

    p.onExplosionComplete = function(explosion){
        explosion.parent.removeChild(explosion);
    };

    p.addToScore = function(value){
        this.currentScore += value;
        this.hud.setScore(this.currentScore);
        this.levelManager.checkExtraLives();
    }

    p.pauseEnemies = function(value){
	    var f = (value)? "stop" : "play";
        if(f == "stop"){
	        CurrentGame.BackgroundSound.pause();
        }
	    if(this.currentFlea){
            this.currentFlea.display[f]();
        }
        if(this.currentSpider){
            this.currentSpider.display[f]();
        }
        if(this.currentScorpion){
            this.currentScorpion.display[f]();
        }
        //Centipedes
        for(var i = 0, l = this.centipedeList.length; i < l; i++){
            this.centipedeList[i][f]();
        }
    };

    p.removeEnemies = function(){
	    if(this.currentFlea){
            this.currentFlea.kill();
            this.currentFlea = null;
        }

        if(this.currentSpider){
            this.currentSpider.kill();
            this.currentSpider = null;
        }

        if(this.currentScorpion){
            this.currentScorpion.kill();
            this.currentScorpion = null;
        }
        //Centipedes
        for(var i = 0, l = this.centipedeList.length; i < l; i++){
            this.centipedeList[i].kill();
        }
        this.centipedeList.length = 0;

		// Make sure none spawn prematurely.
		this.levelManager.removeSpawnTimers();
    };

    /***********************************************************************
     * Factory Methods (Create Enemies)
     **********************************************************************/
    p.createFlea = function(){
        this.currentFlea = new CurrentGame.Flea(this.spritesInFront, this.bg);
        var pt = this.bg.getGridPoint(Math.random() * CurrentGame.width);
	    this.currentFlea.setPosition(pt.x, -this.bg.rowHeight);
    };

    p.createScorpion = function(){
        this.currentScorpion= new CurrentGame.Scorpion(this.spritesInFront, this.bg);
	    //Scorpion can only spawn at rows 1-12
        var pt = this.bg.getGridPoint(0, (this.bg.rowHeight * 5) + (this.bg.rowHeight * 6 * Math.random()));
        if(Math.random() > .5){
            pt.x = CurrentGame.width + 50;
            this.currentScorpion.dir = CurrentGame.Scorpion.LEFT;
        } else {
            pt.x = -50;
            this.currentScorpion.dir = CurrentGame.Scorpion.RIGHT;
        }
        this.currentScorpion.setPosition(pt.x, Math.round(pt.y) + .5);
    };

    p.createSpider = function(){
	    var maxRow = 12;
        if(this.currentScore > 180000 && this.currentScore < 860000){
	        maxRow = 6;
        }
	    var minY = this.height - (this.bg.rowHeight * maxRow);
		//Pass minY position into spider so it knows how high it's allowed to travel.
	    this.currentSpider = new CurrentGame.Spider(this.spritesInFront, this.bg, minY);

        var pt = this.bg.getGridPoint(0, CurrentGame.height - minY/2);
        if(Math.random() > .5){
            pt.x = CurrentGame.width + 50;
            this.currentSpider.dir = CurrentGame.Spider.LEFT;
        } else {
            pt.x = -50;
            this.currentSpider.dir = CurrentGame.Spider.RIGHT;
        }
        this.currentSpider.setPosition(pt.x, pt.y);
    }

    p.createCentipede = function(segmentCount, x, y, positionAtTop){
        var centipede = new CurrentGame.Centipede();
        centipede.initialize(this.spritesBehind, this.bg, this.player);
	    centipede.createFromScratch(segmentCount, x, y, positionAtTop);
        this.centipedeList.push(centipede);
        return centipede;
    };

    scope.currentGame.Game = Game;
}(window.Atari));