(function(scope){

    var Scorpion = function(stage, bg){
        this.initialize(stage, bg);
    };

    var Game = scope.currentGame;
    var Assets = Game.Assets;

    Scorpion.LEFT = "left";
    Scorpion.RIGHT = "right";

    var p = Scorpion.prototype;
    p.dir;
    p.stage;
    p.display;
    p.speed;
    p.isDead;
	p.hitBox;

    p.initialize = function(stage, bg){
        this.stage = stage;
        this.bg = bg;
        this.speed = 4 + Math.min(bg.MAX_SPEED, (CurrentGame.globalLevel - 1) * 2);
        this.display = Assets.getBitmapAnimation(Assets.TEX_SCORPION, true);
        this.stage.addChild(this.display);
		this.hitBox = new Rectangle(0,0,bg.rowWidth * 2.5, bg.rowHeight);
    };

    p.tick = function(tickFactor){
        //Move
        if(this.dir == Scorpion.LEFT){
            this.hitBox.x -= this.speed * tickFactor;
        } else {
            this.hitBox.x += this.speed * tickFactor;
            if(this.display.scaleX == 1){
                this.display.scaleX = -1;
            }
        }

        var mushroom = this.bg.getMushroomByPosition(this.hitBox.x + (this.hitBox.width >> 1), this.hitBox.y);
        if(mushroom){
            this.bg.poisonMushroom(mushroom);
        }
        //Check Bounds
        this.checkBounds();
    };

    p.checkBounds = function() {
        if(this.dir == Scorpion.LEFT && this.hitBox.x < -this.hitBox.width/2){
            this.kill();
        } else if(this.dir == Scorpion.RIGHT && this.hitBox.x > Game.width + this.hitBox.width){
            this.kill();
        } else {
			this.display.x = this.hitBox.x + (this.hitBox.width >> 1);// + (this.dir == Scorpion.RIGHT ? this.display.width : 0);
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

    scope.currentGame.Scorpion = Scorpion;

}(window.Atari));