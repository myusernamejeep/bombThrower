(function(scope){

    var Bird = function(spritesheet){
        this.initialize(spritesheet);
    };

    var Game = scope.currentGame;
    var Assets = Game.Assets;
	 
    var p = Bird.prototype;
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
		this._motions = ["motion1","motion2", "jump", "rotate1", "rotate2"];
		this.mouseEnabled = false;
		this.mouseChildren = false;
     
		this._create();
	};
	
	p.animate = function() {	
		var yes = Math.random() > 0.7;
 		if(!yes || this._paused) return;
		 if(this.is_anim){
			return;
		}
		var labelIndex = 0;
		if(this.sprite.ready){ 
			labelIndex = Math.floor(Math.random()*2);
		}else{
			labelIndex = Math.floor(Math.random()*this._motions.length);
		}
		this.is_anim = true;
		var self = this;
		var cb = function(){
			self.is_anim = false;
		}
		//console.debug('anim_',  this._motions[labelIndex] );
		this['anim_'+ this._motions[labelIndex]](cb);	
	};

	p.die = function(){
		this.dead = true;
		if(this.parent){ 
			this.parent.removeChild(this);	
		}
	};
	
	p._create = function() {	
 
		this.sprite =  new  createjs.BitmapAnimation( this.spritesheet );
		this.sprite.gotoAndPlay("bird1");
		this.sprite.x = 0;
		this.sprite.y = -10;
		this.sprite.scaleX = this.sprite.scaleY = 0.8;
		this.sprite.self = this;
 
	};
	//"motion1","motion2", "jump", "rotate1", "rotate2"
	p.anim_motion1 = function(cb){	
 
		this.sprite.gotoAndStop("bird3");
		var y = this.sprite.y
		var self = this;
		
		var callback1 = function(){
			self.sprite.gotoAndStop("bird2");
			createjs.Tween.get(self.sprite).to({opacity:1}, 200).call(callback2); 
		}
		var callback2 = function(){
			self.sprite.gotoAndStop("bird3");
			createjs.Tween.get(self.sprite).to({opacity:1}, 300).call(callback3); 
		}
		var callback3 = function(){
			self.sprite.gotoAndStop("bird1");
			createjs.Tween.get(self.sprite).to({opacity:1}, 300).call(callback4); 
		}
		var callback4 = function(){
			self.sprite.gotoAndStop("bird2");
			createjs.Tween.get(self.sprite).to({opacity:1}, 200).call(callback5); 
		}
		var callback5 = function(){
			self.sprite.gotoAndStop("bird1");
			createjs.Tween.get(self.sprite).to({opacity:1}, 100).call(cb); 
		}
		createjs.Tween.get(this.sprite).to({opacity:1}, 300).call(callback1); 
 	};
	p.anim_motion2 = function(cb){	
 
		var y = this.sprite.y
		var self = this;
		
		var callback1 = function(){ 
		
			self.sprite.gotoAndStop("bird3");
			createjs.Tween.get(self.sprite).to({opacity:1}, 200).call(callback2); 
		}
		var callback2 = function(){ 
		
			self.sprite.gotoAndStop("bird1");
			createjs.Tween.get(self.sprite).to({opacity:1}, 200).call(callback3); 
		}
		var callback3 = function(){ 
		
			self.sprite.gotoAndStop("bird2");
			createjs.Tween.get(self.sprite).to({opacity:1}, 100).call(callback4); 
		}
		var callback4 = function(){ 
		
			self.sprite.gotoAndStop("bird3");
			createjs.Tween.get(self.sprite).to({opacity:1}, 300).call(callback5); 
		}
		var callback5 = function(){ 
			self.sprite.gotoAndStop("bird1");
			createjs.Tween.get(self.sprite).to({opacity:1}, 100).call(cb); 
		}
		createjs.Tween.get(this.sprite).to({y:y}, 300).call(callback1); 
 	};
	p.anim_jump = function(cb){	
		this.sprite.gotoAndStop("bird1");
		var y = this.sprite.y
		var self = this;
		
		var callback0 = function(){
			self.sprite.gotoAndStop("bird1");
			createjs.Tween.get(self.sprite).to({y:y, scale:1.05}, 300).call(callback1); 
		}
		var callback1 = function(){
			self.sprite.gotoAndStop("bird3");
			createjs.Tween.get(self.sprite).to({y:y, scale:0.95}, 200).call(callback2); 
		}
		var callback2 = function(){
			self.sprite.gotoAndStop("bird1");
			createjs.Tween.get(self.sprite).to({y:y, scale:1.05 }, 200).call(callback3); 
		}
		
		var callback3 = function(){
			createjs.Tween.get(self.sprite).to({y:y-10, scale:1}, 200).to({y:y-5}, 100).to({y:y}, 50).call(cb); 
		}
		createjs.Tween.get(this.sprite).to({y:y-5},  0).to({y:y-40}, 200).to({y: y}, 100).call(callback0);
 
 	}; 
	
	p.anim_die = function(cb){	
		this.sprite.gotoAndStop("bird2");
		var self = this;
		var y = this.sprite.y
		
		var callback1 = function(){
			self.sprite.gotoAndStop("drawPath");
			createjs.Tween.get(self.sprite).to({scale:0.95}, 100).call(callback2); 
		}
 
		var callback2 = function(){
 			createjs.Tween.get(self.sprite).to({alpha:0.7, scale:0.75}, 150).to({alpha:0.4, scale:0.45}, 150).to({alpha:0.1, scale:0.25}, 150).call(cb);
		}
		createjs.Tween.get(self.sprite).to({scale:1.1}, 100).call(callback1); 
		
		
		
	};
	p.anim_rotate1 = function(cb){	
		this.sprite.gotoAndStop("bird3");
		var y = this.sprite.y
		createjs.Tween.get(this.sprite).to({y:y-5, rotation: 0, scale:0.9 }, 300).to({rotation: 360, scale:1.1}, 300).to({rotation: 0, scale:1}, 100).to({y:y}, 50).call(cb); 
 	};
	p.anim_rotate2 = function(cb){	
		this.sprite.gotoAndStop("bird1");
		var y = this.sprite.y
		createjs.Tween.get(this.sprite).to({y:y-5, rotation: 360, scale:1.1}, 300).to({rotation: 0, scale:0.91}, 300).to({y:y-5}, 200).to({rotation: 0, scale:1}, 100).to({y:y}, 50).call(cb);  
 	};
    p.tick = function(tickFactor){
		console.debug('tick', tickFactor);
		
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

    scope.currentGame.Bird = Bird;

}(window.Atari));