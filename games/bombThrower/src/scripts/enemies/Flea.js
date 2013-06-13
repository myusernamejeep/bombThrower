(function(scope){

    var Flea = function(stage, bg){
        this.initialize(stage, bg);
    };

    var Game = scope.currentGame;
    var Assets = Game.Assets;


    var p = Flea.prototype;

    p.mushroomSeed;
    p.stage;
    p.bg;
    p.display;
    p.speed;
    p.isDead;
    p.shotByPlayer;
	p.audio;
	p.hitBox;

    p.initialize = function(stage, bg){
        this.stage = stage;
        this.bg = bg;
        this.speed = 4 + Math.min(bg.MAX_SPEED, (CurrentGame.globalLevel - 1) * 2);
        this.mushroomSeed = .05;
        this.display = Assets.getBitmapAnimation(Assets.TEX_FLEA, true);
        this.stage.addChild(this.display);
	    this.damage = 0;
	    this.display.alpha = 0
		this.hitBox = new Rectangle(0,0,bg.rowWidth, bg.rowHeight);
    };

    p.tick = function(tickFactor){
        //Move
        this.hitBox.y += this.speed * tickFactor;
        if(this.hitBox.y > this.bg.rowHeight * 4 && this.display.alpha == 0){
	        Tween.get(this.display).to({alpha: 1}, 350);
        }
	    if(Math.random() < this.mushroomSeed){
            this.bg.addMushroomAt(this.hitBox.x, this.hitBox.y - this.hitBox.height);
        }
        //Check Bounds
        this.checkBounds();
    };

    p.checkBounds = function() {
        if(this.hitBox.y > Game.height + this.hitBox.height){
            this.kill();
        } else {
			this.display.x = this.hitBox.x + (this.hitBox.width>>1);
			this.display.y = this.hitBox.y;
		}
    };

    p.shot = function(){
		this.damage++;
		if(this.damage > 1){
			this.shotByPlayer = true;
			this.kill();
		} else {
			Tween.get(this.display).to({scaleX: 1.35, scaleY: 1.35}, 100, Ease.quadOut).to({scaleX: 1, scaleY: 1}, 200, Ease.quadIn);
		}
		return this.isDead;
    };

    p.kill = function(){
        this.isDead = true;
        this.stage.removeChild(this.display);
    };

    p.setPosition = function(x, y){
        this.hitBox.x = x;
        this.hitBox.y = y;
        this.checkBounds();
    };

    scope.currentGame.Flea = Flea;

}(window.Atari));