(function(scope) {
 
	var ns = scope; 
	var game = ns.game;

	var Bullet = ns.Bullet = function(props)
	{
		this.power = 1;
		this.speedX = 0;
		this.speedY = 0;
		
		//Bullet.superClass.constructor.call(this, props);
		this.id = UID.get();
		this.sheet = ns.R.bullet_sprites[ this.power ];
		var spritesheet = new GameLibs.SpriteSheetWrapper(this.sheet);
		var sprite  =  new  createjs.BitmapAnimation( spritesheet );
		sprite.gotoAndStop( "default" );	
		sprite.regX = this.sheet.regX, sprite.regY = this.sheet.regY;
		
		this.sprite = sprite;
		
	};
	//Q.inherit(Bullet, Q.Bitmap);

	Bullet.prototype.update = function(timeInfo)
	{	
		
		if(this.isOutOfScreen())
		{
			this.destory();
		}else
		{
			this.sprite.x += this.speedX;
			this.sprite.y -= this.speedY;	
			
			//console.debug('Bullet.sprite', this.sprite,  this.speedX, this.speedY);
			if(this.checkCollision()) this.destory();
		}
	};

	Bullet.prototype.checkCollision = function()
	{	
		var fishes = game.fishManager.fishes, len = fishes.length;
		
		//resort all fishes by y axis	
		//fishes.sort(function(a, b){return b.y - a.y;});
		
		//check if any fish be hitted
		var hitted = false;
		for(var i = 0; i < len; i++)
		{
			var fish = fishes[i];
			if(this.sprite.y - this.height*0.5 > fish.sprite.y + fish.height*0.5 || 
			   this.sprite.y + this.height*0.5 < fish.sprite.y - fish.height*0.5 || 
			   this.sprite.x - this.width*0.5 > fish.sprite.x + fish.width*0.5 || 
			   this.sprite.x + this.width*0.5 < fish.sprite.x - fish.width*0.5)
			{
				continue;
			}	
			var intersection = ndgmr.checkRectCollision(this.sprite,fish.sprite);
			if(intersection)
			{
				hitted = true;
				break;
			}
		}
		if(hitted === false) return false;
		
		this.destory();
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
		
		//make the web animate
		/*
		Q.Tween.to(web, {scaleX:1.0, scaleY:1.0}, {time:100, reverse:true, 
			onComplete:function(tween)
			{			
				if(tween.reversing&& web.parent) web.parent.removeChild(web);
				tween.reversing = true;
			}}
		);*/
		 createjs.Tween.get(web)
 				    .to({scaleX:1.0, scaleY:1.0},100,createjs.Ease.backOut)
 				    .call(function(tween){			
						web.parent.removeChild(web);
						//tween.reversing = true;
					});
		//check if any fish be captured
		for(var i = 0; i < len; i++)
		{
			var fish = fishes[i];
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
		}
		return true;
	};

	Bullet.prototype.destory = function()
	{
		for(var i = 0; i < game.bullets.length; i++)
		{
			var bullet = game.bullets[i];
			if(bullet.is_destroyed){
				game.bullets.splice(i, 1);		
			}
		}
		this.parent.removeChild(this);
		this.sprite.is_destroyed = true
		 
	};

	Bullet.prototype.isOutOfScreen = function()
	{
		return (this.sprite.x < -50 ||
				this.sprite.x > game.width + 50 || 
				this.sprite.y < -50 || 
				this.sprite.y > game.height + 50);
	};

	scope.Bullet = Bullet;

}(window.Atari.currentGame))