(function(scope) {
	
	var ns = scope; 
	var game = ns.MainGame;

	function Blast(spritesheet, name) {
		this.spritesheet = spritesheet;
		this.initialize(name);
	}

	var s = Blast;
	s.TIMER = 300;

	var p = Blast.prototype = {
		sprite:null,
		data:null,
		angle:null,
		outer:null,
		direction:null,
		speed:null,
		index:null,
		isHit:null,
		width:null,
		height:null,
		vx:null,
		vy:null,
		color:null,
		numTicks:null,
		spritesheet:null,


		initialize: function(name) {
			name = name || "green_bullet";
			this.hitCount = 5;
			this.power = 5;
			this.speed = 5;
			this.isHit = true;
			this.index = 0;
			this.vx = this.vy = 0;
			this.numTicks = 0;
			
			this.spritesheet  = new GameLibs.SpriteSheetWrapper(scope.ImageManager.weapon);
			this.sprite = new createjs.BitmapAnimation(this.spritesheet);
			this.sprite.gotoAndStop(name);
 
			this.spritesheet._data[name].next = name;

			this.width = this.sprite.width = 33;
			this.height = this.sprite.height = 27;
			this.sprite.regX = this.sprite.width/2;
			this.sprite.regY = this.sprite.height/2;
		},

		getHit: function () { return this.isHit; },
		setHit: function (value) {
			this.isHit = value;
			this.sprite.visible = this.isHit;

			if (!this.sprite.visible) {
				this.sprite.scaleX = this.sprite.scaleY = 0;
			}
		},
		
		update : function(timeInfo){	
			
			if(this.isOutOfScreen())
			{
				this.destory();
			}else
			{
				this.sprite.x += this.vx;
				this.sprite.y -= this.vy;	
				
				//console.debug('Bullet.sprite', this.sprite,  this.speedX, this.speedY);
				if(this.checkCollision()) this.destory();
			}
		},
		
		checkCollision : function(){	
			var targets = game.player.targets, len = targets.length;
	 
			//check if any fish be hitted
			var hitted = false;
			for(var i = 0; i < len; i++)
			{
				var enemy = targets[i];
				if(this.sprite.y - this.height*0.5 > enemy.sprite.y + enemy.height*0.5 || 
				   this.sprite.y + this.height*0.5 < enemy.sprite.y - enemy.height*0.5 || 
				   this.sprite.x - this.width*0.5 > enemy.sprite.x + enemy.width*0.5 || 
				   this.sprite.x + this.width*0.5 < enemy.sprite.x - enemy.width*0.5)
				{
					continue;
				}	
				var intersection = ndgmr.checkRectCollision(this.sprite,enemy.sprite);
				if(intersection)
				{
					hitted = true;
					break;
				}
			}
			if(hitted === false) return false;
			
			this.destory();
			/*
			//release a web
			var sp = ns.R.web_sprites[ this.power ];
			//console.debug('sp',sp);
			var spritesheet = new GameLibs.SpriteSheetWrapper(sp);
			var web  =  new  createjs.BitmapAnimation( spritesheet );
			web.gotoAndStop( "default" );	
			web.regX = sp.regX, web.regY = sp.regY;
			
			this.web = web;
			
			web.x = this.sprite.x;
			web.y = this.sprite.y;
			web.scaleX = web.scaleY = 0.8;
			web.eventEnabled = false;
			this.parent.addChild(web);
			*/
			//make the web animate
			/*
			 createjs.Tween.get(web)
						.to({scaleX:1.0, scaleY:1.0},100,createjs.Ease.backOut)
						.call(function(tween){			
							web.parent.removeChild(web);
							//tween.reversing = true;
						});
			//check if any fish be captured
			for(var i = 0; i < len; i++)
			{
				var enemy = targets[i];
				if(web.y - web.height*0.5 > fish.sprite.y + fish.height*0.5 || 
				   web.y + web.height*0.5 < fish.sprite.y - fish.height*0.5 || 
				   web.x - web.width*0.5 > fish.sprite.x + fish.width*0.5 || 
				   web.x + web.width*0.5 < fish.sprite.x - fish.width*0.5)
				{
					continue;
				}
				var intersection = ndgmr.checkRectCollision(web,fish.sprite);
				if(intersection && fish.canBeCaptured(this.power ))
				{		
					fish.moving = false;
					fish.captured = true;
					fish.capturingCounter = game.fps >> 1;
					fish.sprite.gotoAndPlay("capture");
				}
			}*/
			return true;
		},
		
		destory : function(){
			for(var i = 0; i < game.bullets.length; i++)
			{
				var bullet = game.bullets[i];
				if(bullet.is_destroyed){
					game.bullets.splice(i, 1);		
				}
			}
			this.parent.removeChild(this);
			this.sprite.is_destroyed = true
			 
		},
		
		isOutOfScreen : function(){
			return (this.sprite.x < -50 ||
					this.sprite.x > game.gameInfo.width + 50 || 
					this.sprite.y < -50 || 
					this.sprite.y > game.gameInfo.height + 50);
		}
	}

	scope.Blast = Blast;

}(window.Atari.currentGame));