(function(scope){

    var Player = function(){}

    //STATIC VARS
    var p = Player.prototype;
    var CurrentGame = scope.currentGame;
    var Assets = CurrentGame.Assets;
    var GamePad = GameLibs.GamePad;

    var stage;
    var bg;

    var IDLE_STATE = "idleState";
    var WALKING_STATE = "walkingState";
    var DYING_STATE = "dyingState";
	var SHOT_DELAY = 100;

    //INSTANCE VARS
    p.playerSpeed;
    p.shotSpeed;
    p.display;
    p.width;
    p.height;
    p.currentShot;
    p.minY;
    p.isDead;
	p.lives;
	p.hitBox;
	p.shotHitBox;
	p.tweenDisplay;

    p.initialize = function(p_stage, p_bg){
        //Dependancies
        bg = p_bg;
        stage = p_stage;

        this.minY = bg.minPlayerY;

        //Create player
        this.playerSpeed = 11;
        this.shotSpeed = 25;
        this.rowHeight = bg.rowHeight;
        this.display = Assets.getBitmap(Assets.TEX_PLAYER_IDLE);
        this.display.onAnimationEnd = Atari.proxy(this.onAnimationEnd, this);

        this.width = this.display.width;
        this.height = this.display.height;

		this.hitBox = new Rectangle(0,0,bg.rowWidth, bg.rowHeight);
		this.shotHitBox = new Rectangle(0,0,bg.rowWidth>>1, bg.rowHeight>>1);

	    this.lastShotTime = Ticker.getTime();

        stage.addChild(this.display);
    };

    p.onAnimationEnd = function(){
        if(this.state == IDLE_STATE){
            this.display.gotoAndStop(Assets.TEX_PLAYER_IDLE);
        } else if(this.state == WALKING_STATE){
	        if(GamePad.player.isButtonDown(GamePad.LEFT)){
		        this.display.gotoAndPlay(Assets.TEX_PLAYER_WALK_LEFT);
	        } else {
		        this.display.gotoAndPlay(Assets.TEX_PLAYER_WALK_RIGHT);
	        }
        } else if(this.state == DYING_STATE){
	        var frames = this.display.spriteSheet._data[this.display.currentAnimation].frames;
	        var frame = frames[frames.length-1];
			this.display.gotoAndStop(frame);
        }
    };

    p.reset = function(fadeIn, tweenTarget){
	    var startX = (CurrentGame.width - this.width + 20 ) >> 1;
	    var startY = (CurrentGame.height - this.height);
	    if(tweenTarget){
		    Tween.get(this.hitBox).to({x: startX, y: startY}, 1000, Ease.quadOut);
			this.tweenDisplay = Tween.get(this.display).to({x: startX, y: startY - this.display.height + bg.rowHeight}, 1000, Ease.quadOut)
				.call( function() { this.tweenDisplay = null; }, null, this );
	    } else if (this.tweenDisplay == null) {
		    this.setPosition(startX, startY);
	    }
	    var mushroom = bg.getMushroomByPosition(this.hitBox.x + this.hitBox.width/2, this.hitBox.y + this.hitBox.height/2);
	    if(mushroom){
		    bg.removeMushroom(mushroom);
	    }
	    if(this.isDead || fadeIn){
		    this.isDead = false;
			this.display.alpha = 0;
		    Tween.get(this.display).to({alpha: 1}, 500);
	    }
        this.state = IDLE_STATE;
	    this.display.gotoAndStop(Assets.TEX_PLAYER_IDLE);
	    this.removeShot();
	    GamePad.player.setButtonUp(GamePad.BUTTON_1);
    };

    p.setPosition = function(x, y){
        this.hitBox.x = x;
        this.hitBox.y = y;
		this.display.x = x;
		this.display.y = y - this.height + bg.rowHeight;
    };

    p.kill = function(){
	    if(this.state == DYING_STATE){ return; }
        this.state = DYING_STATE;
        this.isDead = true;
        this.lives--;
        this.display.gotoAndPlay(Assets.TEX_PLAYER_DEATH);
        this.removeShot();
	    SoundJS.play(CurrentGame.Assets.SND_PLAYER_HIT);

	    var explosion = Assets.getBitmapAnimation(Assets.TEX_DEATH_SMOKE, true);
        explosion.x = this.display.x + (this.width >> 1);
        explosion.y = this.display.y + (this.height >> 1);
        explosion.onAnimationEnd = Atari.proxy(this.onExplosionComplete, this, explosion);
        stage.addChild(explosion);
    };

	p.onExplosionComplete = function(explosion){
		stage.removeChild(explosion);
	}

    p.tick = function(tickFactor){
		this.updateShot(tickFactor);

        //If we're dying nothing left to do here...
        if(this.state == DYING_STATE){
            return;
        }
	    else if(this.display.parent == null){
	        stage.addChild(this.display);
        }

        this.movePlayer(tickFactor);

        //If attacking, ignore state for now...
        if(this.display.currentAnimation == Assets.TEX_PLAYER_ATTACK){
            return;
        }
        if(this.state == IDLE_STATE){
            this.display.gotoAndStop(Assets.TEX_PLAYER_IDLE);
        } else if(this.state == WALKING_STATE && this.display.currentAnimation != Assets.TEX_PLAYER_WALK_LEFT &&
	        this.display.currentAnimation != Assets.TEX_PLAYER_WALK_RIGHT ){
	        if(GamePad.player.isButtonDown(GamePad.LEFT)){
                this.display.gotoAndPlay(Assets.TEX_PLAYER_WALK_LEFT);
            } else {
                this.display.gotoAndPlay(Assets.TEX_PLAYER_WALK_RIGHT);
            }
        }

    };

    p.movePlayer = function(tickFactor){
        var distance = this.playerSpeed * tickFactor;
        var deltaX = 0, deltaY = 0;

        this.state = IDLE_STATE;

	    if(GamePad.player.isButtonDown(GamePad.LEFT)){
		    this.state = WALKING_STATE;
		    deltaX = -distance;
	    }
	    if(GamePad.player.isButtonDown(GamePad.RIGHT)){
		    this.state = WALKING_STATE;
		    deltaX = distance;
	    }
        if(GamePad.player.isButtonDown(GamePad.UP)){
	        this.state = WALKING_STATE;
            deltaY = -distance;
        }
        if(GamePad.player.isButtonDown(GamePad.DOWN)){
            this.state = WALKING_STATE;
            deltaY = distance;
        }

	    // If we have a joystick, use it to factor the distance.
	    var joystick = CurrentGame.instance.joystick;
	    var usingJoystick = joystick && joystick.buttonActive;
	    if (usingJoystick) {
		    var joystickDelta = joystick.currentAmount;
		    deltaX *= Math.abs(joystickDelta.x);
		    deltaY *= Math.abs(joystickDelta.y);
	    }

		// Move player along x axis.
		this.hitBox.x += deltaX;

		//Keep player in bounds
		this.hitBox.x = Math.min(CurrentGame.width - this.hitBox.width, Math.max(this.hitBox.x, 0));

        //Check for Blockages
		var i, l, dx = 0, dy = 0, rx = 0, ry = 0, spriteHitBox;
		var halfWidth = this.hitBox.width/2;
		var halfHeight = this.hitBox.height/2;

        var neighbours = bg.getNeighbours(this.hitBox);

        for(i = 0, l = neighbours.length; i < l; i++){
            spriteHitBox = neighbours[i].hitBox ? neighbours[i].hitBox : neighbours[i];
            dx = (spriteHitBox.x + spriteHitBox.width/2) - (this.hitBox.x + halfWidth);
			dy = (spriteHitBox.y + spriteHitBox.height/2) - (this.hitBox.y + halfHeight);

			if(Math.abs(dx) < (spriteHitBox.width/2+halfWidth) && Math.abs(dy) < (spriteHitBox.height/2+halfHeight)){

				// Move the sprite momentarily on top of its collider.
				this.hitBox.x += dx;

				rx = dx>0?-bg.rowWidth:bg.rowWidth;

				this.hitBox.x += rx;

				break;
			}
        }

		// Move player along y axis.
		this.hitBox.y += deltaY;

		//Keep player in bounds
		this.hitBox.y = Math.min(CurrentGame.height - this.hitBox.height, Math.max(this.hitBox.y, this.minY + this.hitBox.height));

		neighbours = bg.getNeighbours(this.hitBox);
		for(i = 0, l = neighbours.length; i < l; i++){
			spriteHitBox = neighbours[i].hitBox ? neighbours[i].hitBox : neighbours[i];
			dx = (spriteHitBox.x + spriteHitBox.width/2) - (this.hitBox.x + halfWidth);
			dy = (spriteHitBox.y + spriteHitBox.height/2) - (this.hitBox.y + halfHeight);

			if(Math.abs(dx) < (spriteHitBox.width/2+halfWidth) && Math.abs(dy) < (spriteHitBox.height/2+halfHeight)){

				// Move the sprite momentarily on top of its collider.
				this.hitBox.y += dy;

				ry = dy>0?-bg.rowHeight:bg.rowHeight;

				// Move the sprite to the top/bottom of the collider.
				this.hitBox.y += ry;

				break;
			}
		}

		// Move the display to match the hitBox.
		this.display.x = this.hitBox.x;
		this.display.y = this.hitBox.y - this.display.height + bg.rowHeight;
    };

    p.updateShot = function(tickFactor){
        if(this.currentShot){
	        this.currentShot.lastY = this.currentShot.hitBox.y;
	        this.currentShot.y -= this.currentShot.velY * tickFactor;
			this.currentShot.hitBox.y = this.currentShot.y+this.currentShot.hitBox.height*2;
            this.currentShot.velY *= 1.05;

	        if(this.currentShot.y < -this.currentShot.height){
                this.removeShot();
            } else {
                if(this.onShotCallback){
	                //Check for collisions, interpolate up 3 steps
	                var shot = {width: this.currentShot.hitBox.width, height: this.currentShot.hitBox.height, regX: this.currentShot.regX, regY: this.currentShot.regY, x: this.currentShot.hitBox.x};
	                var startY = this.currentShot.hitBox.y;
	                var step = (this.currentShot.lastY - startY) / 3;
	                for(var i = 0; i < 3; i++){
		                shot.y = startY + step * i;
		                if(this.onShotCallback(shot)){
                            this.removeShot();
			                break;
                        }
	                }
                }
            }
        } else {
            if(GamePad.player.isButtonDown(GamePad.BUTTON_1) && Ticker.getTime() - this.lastShotTime > SHOT_DELAY){
                this.currentShot = Assets.getBitmapAnimation(Assets.TEX_SHOT);
	            this.currentShot.scaleX = this.currentShot.scaleY = .8;
                this.currentShot.x = this.display.x + (this.display.width - (this.currentShot.width >> 1));
                this.currentShot.y = this.display.y - 10;
	            this.currentShot.velY = this.shotSpeed;
				this.currentShot.hitBox = this.shotHitBox;
				this.currentShot.hitBox.x = this.currentShot.x + (this.currentShot.width>>1) - (this.shotHitBox.width>>1);
				this.currentShot.hitBox.y = this.currentShot.y+this.currentShot.hitBox.height*2;

                stage.addChild(this.currentShot);
	            stage.swapChildren(this.display, this.currentShot);

                this.display.gotoAndPlay(Assets.TEX_PLAYER_ATTACK);
                SoundJS.play(Assets.SND_SHOOT);
	            this.lastShotTime = Ticker.getTime();
	            //Atari.trace(this.lastShotTime);
            }
        }
    };

    p.removeShot = function(){
        if(this.currentShot == null){ return; }
        stage.removeChild(this.currentShot);
        this.currentShot = null;
    }

    scope.currentGame.Player = Player;
}(window.Atari))