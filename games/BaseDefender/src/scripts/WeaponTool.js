(function(scope) {
 
	var ns = scope;
	var game = ns.game ;
	WeaponTool = function(stage, player)
	{	
		this.initialize(stage, player);
	}
	
	WeaponTool.prototype = new createjs.Container();  
	WeaponTool.prototype.Container_initialize = WeaponTool.prototype.initialize;
	
	WeaponTool.prototype.create = function(name, spritesheet) {	
 
		var sprite =  new  createjs.BitmapAnimation( spritesheet || this.spritesheet );
		sprite.gotoAndPlay(name);
		sprite.mouseEnabled = true;
		sprite.name = name;
		return sprite;
	} 
	
 	WeaponTool.prototype.initialize = function(stage, player){
		this.Container_initialize();
		
		this.name =  UID.get(); 	
		
		this.player = player;
		this.stage = stage;
		this.weapon = null;
		
		this.spritesheet  = new GameLibs.SpriteSheetWrapper(scope.ImageManager._icon);
		//icons
		this.sellIcon = this.create("sellIcon");
 		this.upgradeIcon = this.create("upgradeIcon");
		this.upgradeDisabledIcon = this.create("upgradeDisabledIcon");
		this.spritesheet_darkdigit  = new GameLibs.SpriteSheetWrapper(scope.ImageManager._digit);
 		this.upgradeDigit = new createjs.Container();
		
		//stage.addChild(this.upgradeDigit);
 	}	
	
	WeaponTool.prototype.drawRadius = function(weapon, enabled)
	{	
		var radius = weapon.attackRadius;	
		
		if(enabled == undefined) enabled = false;
		if(!this._radiusCircle) {
 			
			var graphics = new createjs.Graphics();
			graphics.setStrokeStyle(4,"round")
			.beginStroke("#b8eaff")
			.beginFill(enabled ? "#b8eaff" : "#ff0000", 0.4)
			.drawCircle(0, -8, radius); 
			this._radiusCircle = new createjs.Shape(graphics);
			this._radiusCircle.alpha = 0.5;
			this._radiusCircle.radius = radius;
			this._radiusCircle.enabled = enabled;
			//this._radiusCircle.x = -radius/2;
			//this._radiusCircle.y = (-radius-8)/2; 
			//console.log('!this._radiusCircle', 'this._radiusCircle.radius != radius'  ,this._radiusCircle.radius, radius , this._radiusCircle.enabled, enabled );
		}
		
		if(this._radiusCircle.radius != radius)
		{
			//console.log('this._radiusCircle.radius != radius'  ,radius);
			this._radiusCircle.graphics.clear();	
			/*this._radiusCircle.radius = radius;
			this._radiusCircle.graphics.drawCircle(2, 2, radius);	
			this._radiusCircle.x = -radius;
			this._radiusCircle.y = -radius-8;*/
		}
		if(this._radiusCircle.enabled != enabled)
		{
			//console.log('this._radiusCircle.enabled != enabled'  ,enabled);
		/*
			this._radiusCircle.graphics.clear();	
			this._radiusCircle.enabled = enabled;
 			this._radiusCircle.graphics.drawCircle(2, 2, radius);	
			this._radiusCircle.x = -radius;
			this._radiusCircle.y = -radius-8;
			this._radiusCircle.graphics.setStrokeStyle(4,"round").beginStroke("#b8eaff");
			this._radiusCircle.graphics.beginFill(enabled ? "#008b00" : "#ff0000", 0.4);		*/
		}
		//this._radiusCircle.graphics.clear();
		this._radiusCircle.graphics.endFill();
		this.stage.update();
		//console.log('this._radiusCircle'  ,this._radiusCircle );
		
		return 	this._radiusCircle;
	}

	WeaponTool.prototype.removeRadius = function()
	{
		if(this._radiusCircle.parent) this._radiusCircle.parent.removeChild(this._radiusCircle);
	}

	WeaponTool.prototype.remove = function()
	{
		if(this.rightIcon) this.removeChild(this.rightIcon);
		if(this.upgradeDigit){
			this.upgradeDigit.removeAllChildren();
		}
		this.stage.removeChild(this);
		this.weapon = null;
	}

	WeaponTool.prototype.show = function(weapon, enabled, hasTool)
	{
		this.weapon = weapon;
		this.drawRadius(weapon, enabled);
		this.addChild(this._radiusCircle);
		//
		if(hasTool)
		{
			this.addChild(this.sellIcon);
			this.sellIcon.x = 0;
			this.sellIcon.y = 0;
			this.sellIcon.scaleX = this.sellIcon.scaleY = 0.20;		
			
			if(weapon.canUpgrade() && this.player.money >= weapon.upgradeMoney) this.rightIcon = this.upgradeIcon;
			else this.rightIcon = this.upgradeDisabledIcon;	
			this.rightIcon.x = 0;
			this.rightIcon.y = 0;
			this.rightIcon.scaleX = this.rightIcon.scaleY = 0.20;
			this.addChild(this.rightIcon);
		}
			
		var p = weapon.localToGlobal(0, 0);
		this.x = weapon.x - 0;
		this.y = weapon.y - 5;
		this._radiusCircle.graphics.clear();	
 		this._radiusCircle.graphics.setStrokeStyle(4,"round")
			.beginStroke("#b8eaff")
			.beginFill(1 ? "#b8eaff" : "#ff0000", 0.4)
			.drawCircle(0, -8,  weapon.attackRadius); 
		//this._radiusCircle.drawCircle(0, -8, weapon.attackRadius); 
		 	
		//this._radiusCircle.x = -weapon.attackRadius - 2;
		//this._radiusCircle.y = -weapon.attackRadius - 4;
		this.addChild(this.upgradeDigit);
		
		this.tick();
		this.stage.addChild(this);
	}

	WeaponTool.prototype.tick = function(context)
	{
		if(!this.weapon){
			return ; 
		}
		var scale = this.sellIcon.scaleX;
		if(scale < 1)
		{
			this.sellIcon.scaleX = this.sellIcon.scaleY = scale + 0.20;
			this.sellIcon.x -= 17;
			this.rightIcon.scaleX = this.rightIcon.scaleY = scale + 0.20;
			this.rightIcon.x += 20;
		}
		
		//WeaponTool.superClass.render.call(this, context);
		//WeaponTool.superClass._render.call(this, context);
		
		if(this.upgradeDigit){
			this.upgradeDigit.removeAllChildren();
		}
		
		if(scale >= 1)
		{
			//render sell number
			var p = this.localToGlobal(0, 0);
			var str = (this.weapon.sellMoney).toString();
			var offsetX = this.sellIcon.x + 25 - (35-str.length*7)*0.5;
			var offsetY = this.sellIcon.y + 30;
			for(var i = str.length - 1; i >= 0; i--)
			{
				//var frame = scope.ImageManager._darkdigit[Number(str[i])];
				//var frame = this.create(Number(str[i]), scope.ImageManager._darkdigit );
				var frame = this.createBitmap(str[i],this.spritesheet_darkdigit);
				frame.scaleX = frame.scaleY = 0.7;
				frame.x = offsetX ;
				frame.y = offsetY;
				this.upgradeDigit.addChild(frame);
				//frame.render(context, p.x + offsetX, p.y + offsetY);
				offsetX -= scope.ImageManager._darkdigit["frames"][ str[i] ][2] *  0.7-1;
			}
			
			//render upgrade number
			str = (this.weapon.upgradeMoney).toString();
			offsetX = this.rightIcon.x + 25 - (28-str.length*7)*0.5;
			var offsetY = this.rightIcon.y + 30;
			for(var i = str.length - 1; i >= 0; i--)
			{
				//var frame = this.create(Number(str[i]), scope.ImageManager._darkdigit );
				var frame = this.createBitmap(str[i],this.spritesheet_darkdigit);
				//var frame = ImageManager.font.darkdigit[Number(str[i])];
				frame.scaleX = frame.scaleY = 0.7;
				frame.x = offsetX ;
				frame.y = offsetY;
				//frame.render(context, p.x + offsetX, p.y + offsetY);
				this.upgradeDigit.addChild(frame);
				offsetX -= scope.ImageManager._darkdigit["frames"][ str[i] ][2] * 0.7-1;
			}
			//console.log('**** WeaponTool scale'  ,scale , str, this.upgradeDigit);
		
		}	
	}
	WeaponTool.prototype.createBitmap = function(name, spriteSheet) {	
 
		var sprite =  new  createjs.BitmapAnimation( spriteSheet );
		sprite.gotoAndStop(name);
  
		return sprite;
	} 
	scope.WeaponTool = WeaponTool;

}(window.Atari.currentGame))	