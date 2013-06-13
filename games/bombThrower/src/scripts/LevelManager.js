(function(scope){

    var LevelManager = function(game, data){
        this.initialize(game, data);
    }

    LevelManager.instance;

	CurrentGame = scope.currentGame;
	CurrentGame.globalLevel = 1;

	var STARTING_LEVEL = "startingLevel";
	var PLAYING_GAME = "playingGame";

    var p = LevelManager.prototype;

	p.state;
    p._currentLevel;
    p.data;
    p.game;

	p.player;
    p.bg;
    p.stage;

    p.centipedeList;
    p.levelHues;

    p.isLevelPending;

    p.nextFleaSpawn = -1;
    p.nextSpiderSpawn = -1;
    p.nextScorpionSpawn = -1;
    p.nextCentipedeSpawn = -1;

	p.levelText;
	p.levelTextUnderlay;
	p.levelTextX;

    p.levelHues;

    p.startingLives = 3;
    p.extraLifeScore = 12500;
    p.nextExtraLife;

	p.gameOverSound;
	p.repairSound;

	p.minScorpionLevel = 3;

    p.minSpiderSpawn = 3000;
    p.minScorpionSpawn = 5000;
    p.minCentipedeSpawn = 10000;

    p.textureContexts;

    p.initialize = function(game, data){
        LevelManager.instance = this;
        Assets = data.Assets;

	    this.textureContexts = [];
        this.game = game;
        this.data = data;
        this.player = game.player;
        this.bg = game.bg;
        this.stage = game.stage;
        this.centipedeList = game.centipedeList;

	    this.levelTextUnderlay = new Shape();
	    this.levelTextUnderlay.graphics.beginFill("#000000");
	    this.levelTextUnderlay.graphics.drawRect(0, 0, game.width, game.height);
	    game.stage.addChild(this.levelTextUnderlay);

	    this.levelText = new Text("Level 1", "40px " + Atari.Fonts.DEMI, "#FFFFFF");
	    this.levelText.x = this.levelTextX = 430;
	    this.levelText.y = game.height/2 - 75;
	    game.stage.addChild(this.levelText);

        //Create initial values to enable hue shifting between levels.
        this.initHueShift();
    };

    p.startGame = function(){
        //Clear mushroom bg
        this.bg.reset();

        //Plant mushroom seeds :)
        this.bg.createMushrooms(.05);
		this.bg.addMushroomAt(512, 100);

        //Reset player position
        this.player.reset();

        //Update HUD
        this.player.lives = this.startingLives;
        this.game.hud.setLives(this.player.lives);

        this.game.currentScore = 0;
        this.game.hud.setScore(this.game.currentScore);

        //Reset Extra Life counter
        this.nextExtraLife = this.extraLifeScore;

        this._currentLevel = 1;
	    SoundJS.play(CurrentGame.Assets.SND_GAMESTART);
        this.startCurrentLevel(true);

	    if(this.gameOverSound){
		    this.gameOverSound.stop();
	    }
	    if(this.repairSound){
            this.repairSound.stop();
        }
    };

	p.reset = function() {
		this._currentLevel = 1;
		CurrentGame.globalLevel = 1;
		this.game.hud.setLevel(CurrentGame.globalLevel + "-" + this._currentLevel);
	};

    p.startCurrentLevel = function(showLevelText){
        this.state = STARTING_LEVEL;
	    this.game.isPaused = true;
		this.game.removeEnemies();
		this.player.reset();

	    if(showLevelText){
		    this.levelTextUnderlay.alpha = 0;
            Tween.get(this.levelTextUnderlay).wait(300).to({alpha: .5}, 500).wait(1000).to({alpha: 0}, 500);

		    this.levelText.text = "Level " + this._currentLevel;
            this.levelText.x = this.game.width;
            Tween.get(this.levelText).wait(500).to({x: this.levelTextX}, 500, Ease.backOut).wait(1000).to({x: -this.game.width/2}, 500, Ease.backIn);
			//Set Color Palette
		    setTimeout(Atari.proxy(this.updateColorPalette, this), 1000);
		    setTimeout(Atari.proxy(this.startLevelNow, this), 2500);
	    }
	     else {
		    setTimeout(Atari.proxy(this.startLevelNow, this), 1500);
	    }
    };

	p.startLevelNow = function(){
		//Reset main player.
        this.state = PLAYING_GAME;
		this.game.isPaused = false;
		this.game.player.reset();

        //Get starting point for centipede #1 (always top center). Add half the grid cell width to center in on the grid space.
        var x = (this.bg.colCount >> 1) * this.bg.rowWidth - this.bg.rowHeight/2;
        var y = 2 * this.bg.rowHeight + this.bg.rowHeight/2;

        //Number of segments for main centipede is 12 - currentLevel
        var centipede = this.game.createCentipede(12 - this._currentLevel, x, y, true);
	    //var centipede = this.game.createCentipede(11, x, y, true);

        //Spawn centipedes at a random location, 1 for each additional level over 1
        for(var i = 1; i < this._currentLevel; i++){
	        var x = (Math.random() > .5)? -50 + Math.random() * -50 : this.game.width + 50 + Math.random() * 50;
            var pt = this.bg.getGridPoint(x, this.bg.rowHeight * 3 + this.bg.rowHeight * Math.random() * 2);
            var centipede = this.game.createCentipede(0, pt.x, pt.y);
            centipede.head.setCurrentDir(x < 0? "left" : "right");

            centipede.head.nextPoint = {x : pt.x, y : pt.y};
            centipede.head.nextPoint.x += ((x < 0)? 100 : -100);
        }

		this.game.hud.setLevel(CurrentGame.globalLevel + "-" + this._currentLevel);
		var dayAlpha = 1;
		if(this._currentLevel >= 10){
			dayAlpha = 0;
		} else {
			dayAlpha = 1 - this._currentLevel / 10;
		}
		Tween.get(this.game.dayBg).to({alpha: dayAlpha}, 500);
		CurrentGame.BackgroundSound.update();
	};

	p.continueGame = function(){
		this.gameOverSound.stop();
		this.player.lives = this.startingLives;
        this.game.hud.setLives(this.player.lives);
		this.startCurrentLevel();
	};

    p.initHueShift = function(){
	    /*
        //Set hue shift value for each level.
        this.levelHues = [
            0,
            -16,
            16,
            -77,
            77,
            180,
            -145,
            -82,
            30,
            100,
            130,
            -116
        ];

	    //Store off a copy of each image in a context, will make it quicker to apply tint between levels...
	    for(var i = 0; i < Assets.textureSheet._images.length; i++){
		    var textureImage = Assets.textureSheet._images[i];
            var canvas = document.createElement('canvas');
            canvas.width = textureImage.width;
            canvas.height = textureImage.height;
            var context = canvas.getContext("2d");
		    context.drawImage(textureImage, 0, 0);
		    this.textureContexts.push(context);
	    }
	    */
    };

    p.updateColorPalette = function(paletteIndex){
	    /*
        var cm = new ColorMatrix(0, 0, 0, this.levelHues[this._currentLevel]);
        var filter = new ColorMatrixFilter(cm);

        //Textures
	    for(var i = 0; i < this.textureContexts.length; i++){
		    var canvas = document.createElement('canvas');
            canvas.width = this.textureContexts[i].canvas.width;
            canvas.height = this.textureContexts[i].canvas.height;
            filter.applyFilter(this.textureContexts[i], 0, 0, canvas.width, canvas.height, canvas.getContext("2d"), 0, 0);
            Assets.textureSheet._images[i].src = canvas.toDataURL("image/png");
	    }
	    */
    };


    p.onPlayerKilled = function(){
	    this.game.removeEnemies();
        this.repairSound = SoundJS.play(Assets.SND_REPAIR, null, 0, 0, -1);
	    this.lastFleaSound && this.lastFleaSound.stop();
        this.bg.repairMushrooms(Atari.proxy(this.onRepairMushroomsComplete, this));
    };

    p.onRepairMushroomsComplete = function(){
        this.game.removeEnemies();
	    this.repairSound.stop();
        if(this.player.lives <= 0){
	        scope.currentGame.BackgroundSound.stop();
	        this.gameOverSound = SoundJS.play(Assets.SND_GAMEOVER);
            this.game.onGameOver();
        } else {
            this.startCurrentLevel(false);
        }
    };

    /**
     * Core Tick
     */
    p.tick = function(tickFactor){
		this.tickFactor = tickFactor;

	    //Update / Spawn All Enemies
        this.updateFlea();
		this.updateSpider();
		this.updateScorpion();
		this.updateCentipedes();

        //Start Next Level?
        if(this.centipedeList.length == 0 && this.state != STARTING_LEVEL){
            this.nextLevel();
        }
    };

    p.nextLevel = function(){
	    SoundJS.play(Assets.SND_LEVELCOMPLETE);
        this._currentLevel++;
        if(this._currentLevel > 12){
            this._currentLevel = 1;
	        CurrentGame.globalLevel++;
        }
	    this.player.reset(false, true);
        this.startCurrentLevel(true);
    };

    p.checkExtraLives = function(){
        if(this.game.currentScore > this.nextExtraLife){
            this.game.player.lives++;
            this.game.hud.setLives(this.game.player.lives);
            this.nextExtraLife += this.extraLifeScore;
            SoundJS.play(Assets.SND_EXTRA_LIFE);
        }
    }

    /**
     * Enemy Management
     */
    p.updateCentipedes = function(){
	    var isPoisoned = false;
	    for(var i = this.centipedeList.length - 1; i >= 0; i--){
		    if(this.centipedeList[i].isDead){
			    this.centipedeList[i].destroy();
			    this.centipedeList.splice(i, 1);
		    } else {
		        this.centipedeList[i].tick(this.tickFactor);
			    if(this.centipedeList[i].head.isPoisoned && !isPoisoned){
				    isPoisoned = true;
			    }
		        if(this.centipedeList[i].head.y >= this.bg.minPlayerY){
		            if(this.nextCentipedeSpawn == -1){
		                this.nextCentipedeSpawn = Ticker.getTime() + this.minCentipedeSpawn + this.minCentipedeSpawn * Math.random();
		            }
		            //Once we reach spawnTime, add a new head
		            else if(this.nextCentipedeSpawn != -1 && Ticker.getTime() > this.nextCentipedeSpawn){
		                var x = (Math.random() > .5)? -50 : this.game.width + 50;
			            var pt = this.bg.getGridPoint(x, this.bg.minPlayerY);
			            var centipede = this.game.createCentipede(0, pt.x, pt.y);
		                centipede.head.setCurrentDir(x < 0? "left" : "right");

			            centipede.head.nextPoint = {x : pt.x, y : pt.y};
			            centipede.head.nextPoint.x += ((x < 0)? 100 : -100);
		                this.nextCentipedeSpawn = -1;
		            }
		        }
		    }
		}

    };

    p.updateFlea = function(){
        //Spawn Fleas
        //If the player area has less than 5 mushrooms in it, spawn a flee every few seconds.
        // Unless the player shot the previous flee... then spawn a new one immediately!
        var flea = this.game.currentFlea;
        if(flea != null){
	        //Flea already exists, tick it
            if(!flea.isDead){
                flea.tick(this.tickFactor);
            } else {
	            if(flea.shotByPlayer == true){
                    this.nextFleaSpawn = Ticker.getTime() + 100;
                }
                this.game.currentFlea = null;
	            this.lastFleaSound && this.lastFleaSound.stop();
	            this.lastFleaSound = null;
            }
        } else {
	        //If we have less than 5 mushrooms in the player area and there is more than 1 centipede, set spawnTime
            if(this.nextFleaSpawn == -1 && this.bg.getBottomMushroomCount() < 5 && this.game.centipedeList.length > 1){
                this.nextFleaSpawn = Ticker.getTime() + 3000 + 4000 * Math.random();
            }
            //Once we reach spawnTime, add a flea
            else if(this.nextFleaSpawn != -1 && Ticker.getTime() > this.nextFleaSpawn){
                this.game.createFlea();
	            this.lastFleaSound = SoundJS.play(Assets.SND_FLEA, null, 0, 0, 0, 1);
	            this.lastFleaSound.onComplete = Atari.proxy(this.fleaSoundComplete, this);
                this.nextFleaSpawn = -1;
            }
        }

    };

	p.fleaSoundComplete = function(event) {
		this.lastFleaSound = null;
	}

    p.updateSpider = function(){
        //Spawn Spiders
        //If there are no spiders, spawn a new one every few seconds
        var spider = this.game.currentSpider;
        if(spider){
	        spider.tick(this.tickFactor);
            if(spider.isDead){
	            this.game.currentSpider = null;
	            CurrentGame.BackgroundSound.update();
            }
        } else {
	        if(this.nextSpiderSpawn == -1 && this._currentLevel >= 1){
                this.nextSpiderSpawn = Ticker.getTime() + this.minSpiderSpawn + this.minSpiderSpawn * Math.random();
            }
            //Once we reach spawnTime, add a spider
            else if(this.nextSpiderSpawn != -1 && Ticker.getTime() > this.nextSpiderSpawn){
                this.nextSpiderSpawn = -1;
		        this.game.createSpider();
		        CurrentGame.BackgroundSound.update();
            }
        }

    };

    p.updateScorpion = function(){
        //Spawn Scorpions
        //If we're over a certain level, spawn scorpions every few seconds
        var scorpion = this.game.currentScorpion;
        if(scorpion){
	        scorpion.tick(this.tickFactor);
            if(scorpion.isDead){
                this.game.currentScorpion = null;
	            CurrentGame.BackgroundSound.update();
            }
        } else {
	       if(this.nextScorpionSpawn == -1 && this._currentLevel >= this.minScorpionLevel){
                this.nextScorpionSpawn = Ticker.getTime() + this.minScorpionSpawn + this.minScorpionSpawn * Math.random();
            }
            //Once we reach spawnTime, add a spider
            else if(this.nextScorpionSpawn != -1 && Ticker.getTime() > this.nextScorpionSpawn){
                this.game.createScorpion();
		        CurrentGame.BackgroundSound.update();
                this.nextScorpionSpawn = -1;
            }
        }

    };

	p.removeSpawnTimers = function() {
		this.nextCentipedeSpawn = -1;
		this.nextFleaSpawn = -1;
		this.nextSpiderSpawn = -1;
		this.nextScorpionSpawn = -1;
	}

    scope.currentGame.LevelManager = LevelManager;
}(window.Atari));
