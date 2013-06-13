(function(scope){

    var Spider = function(stage, bg, minY){
        this.initialize(stage, bg, minY);
    };

    var Game = scope.currentGame;
    var Assets = Game.Assets;

    Spider.LEFT = "left";
    Spider.RIGHT = "right";

    var p = Spider.prototype;
    p.yVector;
    p.xVector;
    p.dir;
    p.turnSeed;
    p.stage;
    p.display;
    p.speed;
    p.isDead;
	p.minY;
	p.hitBox;

    p.initialize = function(stage, bg, minY){
        this.stage = stage;
        this.bg = bg;
        this.speed = 6 + Math.min(bg.MAX_SPEED, (CurrentGame.globalLevel - 1) * 2);
        this.turnSeed = .1;
        this.xVector = 1;
        this.yVector = 1;
	    this.minY = minY;
        this.display = Assets.getBitmapAnimation(Assets.TEX_SPIDER_LEFT, true);
	    this.display.height *= .5;
	    this.stage.addChild(this.display);
		this.hitBox = new Rectangle(0,0, bg.rowWidth * 3, bg.rowHeight);
    };

    p.tick = function(tickFactor){
	    if(this.dir == Spider.LEFT && this.display.currentAnimation != Assets.TEX_SPIDER_LEFT){
		    this.display.gotoAndPlay(Assets.TEX_SPIDER_LEFT);
	    }
	    else if(this.dir == Spider.RIGHT && this.display.currentAnimation != Assets.TEX_SPIDER_RIGHT){
            this.display.gotoAndPlay(Assets.TEX_SPIDER_RIGHT);
        }
        //Move
        var xDistance = (this.dir == Spider.LEFT)? -this.speed : this.speed;
        xDistance *= this.xVector;

        var yDistance = this.speed;
        yDistance *= this.yVector;

        this.hitBox.x += xDistance * tickFactor;
        this.hitBox.y += yDistance * tickFactor;

        //Random Direction Change?
        if(Math.random() < .05){
            this.changeDirection();
        }

        var mushroom = this.bg.getMushroomByPosition(this.hitBox.x + (this.hitBox.width >> 1), this.hitBox.y);
        if(mushroom){
            this.bg.removeMushroom(mushroom);
        }
        this.checkBounds();
    };

    p.changeDirection = function(){

        this.xVector = Math.random() > .35? 1 : 0;
        var seed = Math.random();
        if(seed < .33){
            this.yVector = -1;
        } else if(seed < .66 && this.xVector != 0){
            this.yVector = 0;
        } else {
            this.yVector = 1;
        }
        if(this.yVector == 0 && this.xVector == 0){
            this.yVector = this.xVector = 1;
        }
    };

    p.checkBounds = function() {
        //Check Bounds
        if(this.dir == Spider.LEFT && this.hitBox.x < -this.hitBox.width){
            this.kill(); //Dead
        } else if(this.dir == Spider.RIGHT && this.hitBox.x > Game.width + this.hitBox.width){
            this.kill(); //Dead
        } else {
            //Don't allow him to go off the bottom, or into the top half of the screen...
            if(this.hitBox.y < this.minY){
                this.yVector = 1;
            } else if(this.hitBox.y > Game.height - this.hitBox.height){
                this.yVector = -1;
            }
			this.display.x = this.hitBox.x + (this.hitBox.width >> 1);
			this.display.y = this.hitBox.y;
        }
    };

    p.setPosition = function(x, y){
        this.hitBox.x = x;
        this.hitBox.y = y;
        this.checkBounds();
    };

    p.kill = function(){
        this.isDead = true;
        this.stage.removeChild(this.display);
    };

    scope.currentGame.Spider = Spider;

}(window.Atari));