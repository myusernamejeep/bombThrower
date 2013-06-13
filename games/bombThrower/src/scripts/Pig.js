(function(scope){

    var Pig = function(spritesheet){
        this.initialize(spritesheet);
    };

    var Game = scope.currentGame;
    var Assets = Game.Assets;
 
    var p = Pig.prototype;
    p.stage;
    p.display;
    p.isDead;
 
    p.initialize = function(spritesheet){
 		this.spritesheet = spritesheet;
		this.ready = false;
		this.dead = false;
		this._paused = false;
		this.is_anim = false;
		this.sprite = null;
		this.mouseEnabled = false;
		this.mouseChildren = false;
		this._create();
    };
	
	p._create = function(){
 
		this.sprite =  new  createjs.BitmapAnimation( this.spritesheet );
 		this.sprite.gotoAndPlay("pig1");
  		this.sprite.x = 0;
		this.sprite.y = 0;
		this.sprite.scaleX = this.sprite.scaleY = 0.8;
		this.sprite.self = this;
		/*
		this._avatar.addFrame(new Frame(bmp1, null, null, 2));
		this._avatar.addFrame(new Frame(bmp2, null, null, 2));
		this._avatar.addFrame(new Frame(bmp1, null, null, 2, 1));
		
		//????????
		var bmp3 = new Bitmap(game.images[0].image,[217,0,126,120,63,60]);
		var bmp4 = new Bitmap(game.images[0].image,[113,147,128,123,64,61]);
		var bmp5 = new Bitmap(game.images[0].image,[274,141,143,138,71,69]);

		this._avatar.addFrame(new Frame(bmp3, "die", null, 1));
		this._avatar.addFrame(new Frame(bmp4, null, null, 1));
		this._avatar.addFrame(new Frame(bmp5, null, null, 1));
		this._avatar.addFrame(new Frame(casual.copy(bmp5, null, {alpha:0.7}), null, null, 1));
		this._avatar.addFrame(new Frame(casual.copy(bmp5, null, {alpha:0.4}), null, null, 1));
		this._avatar.addFrame(new Frame(casual.copy(bmp5, null, {alpha:0.1}), null, null, 1, 1));
		*/
		
	}
	
	p.anim_play = function(cb){	
 
		var y = this.sprite.y
		var self = this;
		self.sprite.gotoAndStop("pig2");
			
		var callback1 = function(){
			self.sprite.gotoAndStop("pig1");
			createjs.Tween.get(self.sprite).to({y:y, scale:0.93}, 300).call(callback2); 
		}
		var callback2 = function(){
			self.sprite.gotoAndStop("pig2");
			createjs.Tween.get(self.sprite).to({y:y, scale:1.03}, 200).call(callback3); 
		}
		var callback3 = function(){
			self.sprite.gotoAndStop("pig1");
			createjs.Tween.get(self.sprite).to({y:y, scale:1},300).call(callback4); 
		}
		var callback4 = function(){
			self.sprite.gotoAndStop("pig2");
			createjs.Tween.get(self.sprite).to({y:y, scale:0.95}, 300).call(callback5); 
		}
		var callback5 = function(){
			self.sprite.gotoAndStop("pig1");
			createjs.Tween.get(self.sprite).to({y:y, scale:1}, 300).call(cb); 
		}
		createjs.Tween.get(this.sprite).to({y:y, scale:1.07}, 200).call(callback1); 
	};
	
	p.anim_die = function(cb){	
		this.sprite.gotoAndStop("pig_die");
		var self = this;
		
		var callback1 = function(){
			self.sprite.gotoAndStop("pig3");
			createjs.Tween.get(self.sprite).to({ scale:1.1 }, 100).call(callback2); 
		}
		var callback2 = function(){
			self.sprite.gotoAndStop("pig4");
			createjs.Tween.get(self.sprite).to({ scale:0.91}, 100).call(callback3); 
		}
		var callback3 = function(){
			self.sprite.gotoAndStop("pig5");
			createjs.Tween.get(self.sprite).to({scale:0.98}, 100).call(callback4); 
		}
		var callback4 = function(){
 			createjs.Tween.get(self.sprite).to({alpha:0.7,scale:0.7}, 150).to({alpha:0.4,scale:0.4}, 150).to({alpha:0.1,scale:0.1}, 150).call(cb);
		}
		createjs.Tween.get(self.sprite).to({ scale:1.05 }, 100).call(callback1); 
		
	};
	
	p.animate = function(){	
		var yes = Math.random() > 0.7;
		if(!yes || this._paused) return;
		if(this.is_anim){
			return;
		}
		this.is_anim = true;
		var self = this;
		var cb = function(){
			self.is_anim = false;
		}
		this.anim_play(cb);
		//this.sprite.gotoAndPlay(1);	
	};

	p.die = function(cb){	
		//if(this._avatar.currentFrame >= 4) return;
		this.dead = true;
		//this._avatar.gotoAndPlay("die");
		this.anim_die(cb);
		
 	};
	
    p.tick = function(tickFactor){
        //Move
   
    };
  
	p.setPosition = function(x, y){
		this.hitBox.x = x;
		this.hitBox.y = y;
		this.checkBounds();
	};


    p.kill = function(){
        this.isDead = true;
        this.stage.removeChild(this.sprite);
    };

    scope.currentGame.Pig = Pig;

}(window.Atari));