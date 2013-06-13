(function(scope){

    var Point = function(spritesheet, name, obj, cb){
        this.initialize(spritesheet, name, obj, cb);
    };

    var Game = scope.currentGame;
    var Assets = Game.Assets;
 
    var p = Point.prototype;
    p.stage;
    p.display;
    p.isDead;
 
    p.initialize = function(spritesheet,name, obj, cb){
 		this.spritesheet = spritesheet;
		this.is_anim = false;
		this.sprite = null;
		this._create(name, obj, cb);
    };
	
	p._create = function(name, obj, cb){
		console.debug(obj);
		this.sprite =  new  createjs.BitmapAnimation( this.spritesheet );
 		this.sprite.gotoAndPlay(name);
  		this.sprite.x = obj.x ?  obj.x : obj.sprite.x;
		this.sprite.y = obj.y ?  obj.y : obj.sprite.y;
		this.sprite.scaleX = this.sprite.scaleY = 0.5  ;
		this.sprite.self = this;
		
		var y = this.sprite.y;
		var x = this.sprite.x;
		var self = this;
	 
		createjs.Tween.get(self.sprite).to({opacity:1, scale:0.9}, 150).to({y:y-this.sprite.height/2, x:x-this.sprite.width/2, scale:1.2}, 300).to({opacity:1, scale:1}, 150).call(cb); 
		
		console.debug(this.sprite);
	}
	 
    scope.currentGame.Point = Point;

}(window.Atari));