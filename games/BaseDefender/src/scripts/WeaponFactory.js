(function(scope) {
 
	var ns = scope;
	var game = ns.game ;

	WeaponFactory = function(stage, player, weaponTool, mainGame)
	{
		this.offsetX = -150;
		this.offsetY = 30;
		this.marginX = 10;
		this.initialize(stage, player, weaponTool, mainGame);		
	}
 	WeaponFactory.prototype = new createjs.Container(); // inherit from Container
	WeaponFactory.prototype.Container_initialize = WeaponFactory.prototype.initialize;
	WeaponFactory.prototype.Container_tick = WeaponFactory.prototype._tick; 
 
	WeaponFactory.prototype.createBitmap = function(name, sprite) 
	{	
		var sprite =  new  createjs.BitmapAnimation( sprite || this.spritesheet );
		sprite.gotoAndPlay(name);
		sprite.mouseEnabled = true;
 
		return sprite;
	} 
 	WeaponFactory.prototype.initialize = function(stage, player, weaponTool, mainGame)
	{
		this.Container_initialize();
		
		this.mainGame = mainGame;
		this.name =  UID.get(); 	
		this.stage = stage;
		this.scene = stage.getChildAt(0);
		this.player = player;	
		this.weaponTool = weaponTool;	
		
		//register mouse event for creating gating
		stage.onMouseMove = Atari.proxy(this.mouseMoveHandler, this);
		stage.onMouseDown = Atari.proxy(this.mouseDownHandler, this);
		stage.onMouseUp = Atari.proxy(this.mouseUpHandler, this);
 		
		this.MinigunIcon = new scope.MinigunIcon(stage, player, weaponTool, mainGame);
		this.addChild(this.MinigunIcon);
		this.MinigunIcon.x = this.offsetX;
 		this.MinigunIcon.y = this.offsetY;
		this.offsetX += this.MinigunIcon.icon.width + this.marginX;
		
		this.MissileIcon = new scope.MissileIcon(stage, player, weaponTool, mainGame);
		this.addChild(this.MissileIcon);
 		this.MissileIcon.x = this.offsetX;
 		this.MissileIcon.y = this.offsetY;
		this.offsetX += this.MissileIcon.icon.width + this.marginX;
		
		this.GammaBeamIcon = new scope.GammaBeamIcon(stage, player, weaponTool, mainGame);
		this.addChild(this.GammaBeamIcon);
 		this.GammaBeamIcon.x = this.offsetX;
 		this.GammaBeamIcon.y = this.offsetY;
		this.offsetX += this.GammaBeamIcon.icon.width + this.marginX;
	 
		this.TeslaIcon = new scope.TeslaIcon(stage, player, weaponTool, mainGame);
		this.addChild(this.TeslaIcon);
 		this.TeslaIcon.x = this.offsetX;
 		this.TeslaIcon.y = this.offsetY;
		this.offsetX += this.TeslaIcon.icon.width + this.marginX;
		 
		this.MegaClusterGrenadeIcon = new scope.MegaClusterGrenadeIcon(stage, player, weaponTool, mainGame);
		this.addChild(this.MegaClusterGrenadeIcon);
 		this.MegaClusterGrenadeIcon.x = this.offsetX;
 		this.MegaClusterGrenadeIcon.y = this.offsetY;
		this.offsetX += this.MegaClusterGrenadeIcon.icon.width + this.marginX;
		
		//console.log(this.offsetX, this.offsetY, this.marginX);
		//this.addMissileIcon();
		//this.addGammaBeamIcon();
		/*
		this.addGrapplingHookIcon();
		this.addMegaClusterGrenadeIcon();
		this.addNukeIcon();
		this.addGameOverNukeIcon(); */
	}
	
	WeaponFactory.prototype.addIcon = function()
	{
 		//gatling icon
		this.spritesheet = new GameLibs.SpriteSheetWrapper(scope.ImageManager._icon);
		this._gatingIcon = this.createBitmap("gatlingIcon-0", this.spritesheet );
		this._gatingIcon.name =  "gatingIcon"; 	
 		this._gatingIcon.width = 77;
		this._gatingIcon.height = 79;
		this._gatingIcon.onMouseOver = function(){
			document.body.style.cursor = 'pointer';
		};
		this._gatingIcon.onMouseOut = function(){
			document.body.style.cursor = 'default';
		};
		this._gatingIcon.addEventListener("mousedown", function(evt) {
 			var o = evt.target;
			o.parent.addChild(o);
			var offset = {x:o.x-evt.stageX, y:o.y-evt.stageY};
 
			evt.addEventListener("mousemove", function(ev) {
				o.x = ev.stageX+offset.x;
				o.y = ev.stageY+offset.y;
 				update = true;
			});
		});
		this.addChild(this._gatingIcon);
 		this.tmp_gatling = new scope.Gatling(stage);
	}
 
	WeaponFactory.prototype.addMissileIcon = function()
	{
		//Missile icon
		var spritesheet = new GameLibs.SpriteSheetWrapper(scope.ImageManager.icons);
		this.MissileIcon = this.createBitmap("Missile", spritesheet );
		this.MissileIcon.name =  "MissileIcon"; 	
 		this.MissileIcon.width = 77;
		this.MissileIcon.height = 79;
		this.MissileIcon.onMouseOver = function(){
			document.body.style.cursor = 'pointer';
		};
		this.MissileIcon.onMouseOut = function(){
			document.body.style.cursor = 'default';
		};
		this.MissileIcon.addEventListener("mousedown", function(evt) {
 			var o = evt.target;
			o.parent.addChild(o);
			var offset = {x:o.x-evt.stageX, y:o.y-evt.stageY};
 
			evt.addEventListener("mousemove", function(ev) {
				o.x = ev.stageX+offset.x;
				o.y = ev.stageY+offset.y;
 				update = true;
			});
		});
		this.addChild(this.MissileIcon);
 		//this.tmp_gatling = new scope.Gatling(stage);
	}
		
	WeaponFactory.prototype.addGammaBeamIcon = function()
	{
		//GammaBeam icon
		var spritesheet = new GameLibs.SpriteSheetWrapper(scope.ImageManager.icons);
		this.GammaBeamIcon = this.createBitmap("GammaBeam", spritesheet );
		this.GammaBeamIcon.name =  "GammaBeamIcon"; 	
 		this.GammaBeamIcon.width = 77;
		this.GammaBeamIcon.height = 79;
		this.GammaBeamIcon.onMouseOver = function(){
			document.body.style.cursor = 'pointer';
		};
		this.GammaBeamIcon.onMouseOut = function(){
			document.body.style.cursor = 'default';
		};
		this.GammaBeamIcon.addEventListener("mousedown", function(evt) {
 			var o = evt.target;
			o.parent.addChild(o);
			var offset = {x:o.x-evt.stageX, y:o.y-evt.stageY};
 
			evt.addEventListener("mousemove", function(ev) {
				o.x = ev.stageX+offset.x;
				o.y = ev.stageY+offset.y;
 				update = true;
			});
		});
		this.addChild(this.GammaBeamIcon);
 		//this.tmp_gatling = new scope.Gatling(stage);
	}

	WeaponFactory.prototype.addTeslaIcon = function()
	{
		//GrapplingHook icon
		var spritesheet = new GameLibs.SpriteSheetWrapper(scope.ImageManager.icons);
		this.GrapplingHookIcon = this.createBitmap("GrapplingHook", spritesheet );
		this.GrapplingHookIcon.name =  "GrapplingHookIcon"; 	
 		this.GrapplingHookIcon.width = 77;
		this.GrapplingHookIcon.height = 79;
		this.GrapplingHookIcon.onMouseOver = function(){
			document.body.style.cursor = 'pointer';
		};
		this.GrapplingHookIcon.onMouseOut = function(){
			document.body.style.cursor = 'default';
		};
		this.GrapplingHookIcon.addEventListener("mousedown", function(evt) {
 			var o = evt.target;
			o.parent.addChild(o);
			var offset = {x:o.x-evt.stageX, y:o.y-evt.stageY};
 
			evt.addEventListener("mousemove", function(ev) {
				o.x = ev.stageX+offset.x;
				o.y = ev.stageY+offset.y;
 				update = true;
			});
		});
		this.addChild(this.GrapplingHookIcon);
 		//this.tmp_gatling = new scope.Gatling(stage);
	}	

	WeaponFactory.prototype.addMegaClusterGrenadeIcon = function()
	{
		//MegaClusterGrenade icon
		var spritesheet = new GameLibs.SpriteSheetWrapper(scope.ImageManager.icons);
		this.MegaClusterGrenadeIcon = this.createBitmap("MegaClusterGrenade", spritesheet );
		this.MegaClusterGrenadeIcon.name =  "MegaClusterGrenadeIcon"; 	
 		this.MegaClusterGrenadeIcon.width = 77;
		this.MegaClusterGrenadeIcon.height = 79;
		this.MegaClusterGrenadeIcon.onMouseOver = function(){
			document.body.style.cursor = 'pointer';
		};
		this.MegaClusterGrenadeIcon.onMouseOut = function(){
			document.body.style.cursor = 'default';
		};
		this.MegaClusterGrenadeIcon.addEventListener("mousedown", function(evt) {
 			var o = evt.target;
			o.parent.addChild(o);
			var offset = {x:o.x-evt.stageX, y:o.y-evt.stageY};
 
			evt.addEventListener("mousemove", function(ev) {
				o.x = ev.stageX+offset.x;
				o.y = ev.stageY+offset.y;
 				update = true;
			});
		});
		this.addChild(this.MegaClusterGrenadeIcon);
 		//this.tmp_gatling = new scope.Gatling(stage);
	}	

	WeaponFactory.prototype.addNukeIcon = function()
	{
		//NukeIcon icon
		var spritesheet = new GameLibs.SpriteSheetWrapper(scope.ImageManager.icons);
		this.NukeIcon = this.createBitmap("Nuke", spritesheet );
		this.NukeIcon.name =  "NukeIcon"; 	
 		this.NukeIcon.width = 77;
		this.NukeIcon.height = 79;
		this.NukeIcon.onMouseOver = function(){
			document.body.style.cursor = 'pointer';
		};
		this.NukeIcon.onMouseOut = function(){
			document.body.style.cursor = 'default';
		};
		this.NukeIcon.addEventListener("mousedown", function(evt) {
 			var o = evt.target;
			o.parent.addChild(o);
			var offset = {x:o.x-evt.stageX, y:o.y-evt.stageY};
 
			evt.addEventListener("mousemove", function(ev) {
				o.x = ev.stageX+offset.x;
				o.y = ev.stageY+offset.y;
 				update = true;
			});
		});
		this.addChild(this.NukeIcon);
 		//this.tmp_gatling = new scope.Gatling(stage);
	}	
	
	WeaponFactory.prototype.addGameOverNukeIcon = function()
	{
		//GameOverNuke icon
		var spritesheet = new GameLibs.SpriteSheetWrapper(scope.ImageManager.icons);
		this.GameOverNukeIcon = this.createBitmap("GameOverNuke", spritesheet );
		this.GameOverNukeIcon.name =  "NukeIcon"; 	
 		this.GameOverNukeIcon.width = 77;
		this.GameOverNukeIcon.height = 79;
		this.GameOverNukeIcon.onMouseOver = function(){
			document.body.style.cursor = 'pointer';
		};
		this.GameOverNukeIcon.onMouseOut = function(){
			document.body.style.cursor = 'default';
		};
		this.GameOverNukeIcon.addEventListener("mousedown", function(evt) {
 			var o = evt.target;
			o.parent.addChild(o);
			var offset = {x:o.x-evt.stageX, y:o.y-evt.stageY};
 
			evt.addEventListener("mousemove", function(ev) {
				o.x = ev.stageX+offset.x;
				o.y = ev.stageY+offset.y;
 				update = true;
			});
		});
		this.addChild(this.GameOverNukeIcon);
 		//this.tmp_gatling = new scope.Gatling(stage);
	}	
 
	WeaponFactory.prototype.mouseMoveHandler = function(e)
	{
  		this.placeWeapon(this._dragWeapon, e.stageX,  e.stageY);
	}
	
	WeaponFactory.prototype.getElementOffset = function (elem) 
	{
		var left = elem.offsetLeft, top = elem.offsetTop;
		while ((elem = elem.offsetParent) && elem != document.body && elem != document) {
			left += elem.offsetLeft;
			top += elem.offsetTop;
		}
		return { left: left, top: top };
	}
	
	WeaponFactory.prototype.mouseDownHandler = function(e)
	{	
		var canvas = document.getElementById("gameCanvas");
		var offset = this.getElementOffset(canvas);
		//offsetX = offset.left;
		//offsetY = offset.top;
		var obj = this.stage.getObjectUnderPoint(this.stage.mouseX, this.stage.mouseY);
		//var intersection = ndgmr.checkRectCollision(bird,pig.sprite);
		console.log('mouseDownHandler obj'  , obj );
		if(!this.is_selected_weaponFactory && obj.name && obj.name.indexOf('Icon') != -1  &&  obj.name != 'sellIcon' &&  obj.name != "upgradeIcon" ){
			this.createWeapon(obj , e.stageX,  e.stageY);
			this.is_selected_weaponFactory = true;
		}
	}

	WeaponFactory.prototype.mouseUpHandler = function(e)
	{	
		//console.log('mouseUpHandler'  , this._dragWeapon );
		this.is_selected_weaponFactory = false;
		if(!this._dragWeapon) return;
		var yes = this.placeWeapon(this._dragWeapon, e.stageX,  e.stageY);
		if(yes)
		{		
			this.player.addWeapon(this._dragWeapon);
			this.player.money -= this._dragWeapon.cost;
			this.updateWeapon(this._dragWeaponIcon);
			this.weaponTool.removeRadius();
		}else
		{
			this._dragWeapon.parent.removeChild(this._dragWeapon);		
		}
		this._dragWeapon = null;
		this._dragWeaponIcon = null;
	}
	WeaponFactory.prototype.tick = function()
	{
		this.Container_tick();
		for(var i = 0; i < this.children.length; i++)
		{		
			var icon_instance = this.children[i];
			icon_instance.tick();
			this.updateWeapon(icon_instance.icon);
		}
	}
	WeaponFactory.prototype.updateWeapon = function(icon)
	{
		if (!icon) return false;
		//console.log('icon'  , icon );
		if(this.canCreate(icon.tmp_instance))
		{
			icon.parent.animateCanCreate(true); //.gotoAndStop("gatlingIcon-1");
		}else
		{
			icon.parent.animateCanCreate(false); //this._gatingIcon.gotoAndStop("gatlingIcon-0");
		}
	}

	WeaponFactory.prototype.createWeapon = function(obj, x, y)
	{
		// obj is weapon instance ex. gatling
		console.log('createWeapon'  , obj );
		if(this.canCreate(obj.tmp_instance))
		{
			var g = new scope[obj.className](this.stage);	
			this._dragWeapon = g;
			this._dragWeaponIcon = obj;
			this.placeWeapon(g, x, y);
			this.stage.addChild(g);
			//g.onClick = Atari.proxy(this.GatlingmouseDownHandler, this);
		}
	}
	
	WeaponFactory.prototype.GatlingmouseDownHandler = function()
	{
		this.mainGame.selectedWeapon = obj;
		//obj.drawRadius(true);
		this.weaponTool.show(this.mainGame.selectedWeapon, true, true);
	}
	
	WeaponFactory.prototype.placeWeapon = function(weapon, x, y)
	{
		if(!this._dragWeapon){
			return false;
		}
		//console.log('placeWeapon'  ,x, y );
		if (!weapon) return false;
		var p = this.getAvailablePositionNearby(x, y);
		//console.log('placeWeapon'  , this._dragWeapon, p  );
		if(p)
		{
			this._dragWeapon.x = p.x;
			this._dragWeapon.y = p.y;
			this._dragWeapon.tx = p.tx;
			this._dragWeapon.ty = p.ty;
			var radiusCircle;
			
			//if(p.tx <= 0 || p.tx >= 17 || p.ty <= 0 || p.ty == 3 || p.ty >= 7 || this.player.getWeaponAt(p.tx, p.ty) || !this.player.buildPath(p.tx, p.ty)) 
			if((p.tx==0 && p.ty==3) || p.tx < 0 || p.tx > 17 || p.ty < 0 || p.ty >= 7 || this.player.getWeaponAt(p.tx, p.ty) || !this.player.buildPath(p.tx, p.ty)) 
			{			
				radiusCircle = this.weaponTool.drawRadius(this._dragWeapon, false);
				//radiusCircle.x = (-this._dragWeapon.attackRadius - 2)/2;
				//radiusCircle.y = (-this._dragWeapon.attackRadius - 8)/2;
				this._dragWeapon.addChild(radiusCircle);
				this._dragWeapon.alpha = 0.5;
				return false;
			}else 
			{
				radiusCircle = this.weaponTool.drawRadius(this._dragWeapon, true);
				//radiusCircle.x = (-this._dragWeapon.attackRadius - 2)/2;
				//radiusCircle.y = (this._dragWeapon.y -this._dragWeapon.attackRadius - 8)/2;			
				this._dragWeapon.addChild(radiusCircle);
				this._dragWeapon.alpha = 1.0;
			}		
			return true;
		}
		return false;
	}

	WeaponFactory.prototype.getAvailablePositionNearby = function(x, y)
	{
		
		var h = Math.round((x - this.player.startPoint[0]) / this.player.tileWidth);
		var v = Math.round((y - this.player.startPoint[1]) / this.player.tileHeight);
		//console.log('getAvailablePositionNearby'  , x, y, h, v, this.player.startPoint, this.player.tileWidth, this.player.tileHeight);
		x = this.player.startPoint[0] + h * this.player.tileWidth;
		y = this.player.startPoint[1] + v * this.player.tileHeight;
		return {x:x, y:y, tx:h, ty:v};
	}

	WeaponFactory.prototype.canCreate = function(weapon)
	{
		return this.player.money >= weapon.getLevel(0).cost;
	}
	
	scope.WeaponFactory = WeaponFactory;

}(window.Atari.currentGame))	