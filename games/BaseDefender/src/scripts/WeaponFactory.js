(function(scope) {
 
	var ns = scope;
	var game = ns.game ;

	WeaponFactory = function(stage, player, weaponTool, mainGame)
	{
		this.initialize(stage, player, weaponTool, mainGame);		
	}
 	WeaponFactory.prototype = new createjs.Container(); // inherit from Container
	WeaponFactory.prototype.Container_initialize = WeaponFactory.prototype.initialize;
	WeaponFactory.prototype.Container_tick = WeaponFactory.prototype._tick; 
	WeaponFactory.prototype._tick = function () {
		this.Container_tick();
    }
	WeaponFactory.prototype.createBitmap = function(name, sprite) {	
 
		var sprite =  new  createjs.BitmapAnimation( sprite || this.spritesheet );
		sprite.gotoAndPlay(name);
		sprite.mouseEnabled = true;
 
		return sprite;
	} 
 	WeaponFactory.prototype.initialize = function(stage, player, weaponTool, mainGame){
		this.Container_initialize();
		
		this.mainGame = mainGame;
		this.name =  UID.get(); 	
		this.stage = stage;
		this.scene = stage.getChildAt(0);
		this.player = player;	
		this.weaponTool = weaponTool;	
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
			// bump the target in front of it's siblings:
			var o = evt.target;
			o.parent.addChild(o);
			var offset = {x:o.x-evt.stageX, y:o.y-evt.stageY};
			//console.log('mousedown'  , o );
 		
			// add a listener to the event object's mouseMove event
			// this will be active until the user releases the mouse button:
			evt.addEventListener("mousemove", function(ev) {
				o.x = ev.stageX+offset.x;
				o.y = ev.stageY+offset.y;
				//console.log('mousemove'  , o );// indicate that the stage should be updated on the next tick:
				update = true;
			});
		});
		//register mouse event for creating gating
		stage.onMouseMove = Atari.proxy(this.mouseMoveHandler, this);
		stage.onMouseDown = Atari.proxy(this.mouseDownHandler, this);
		stage.onMouseUp = Atari.proxy(this.mouseUpHandler, this);
		 //this._gatingIcon.onClick = Atari.proxy(this.mouseDownHandler, this); 
		this.addChild(this._gatingIcon);
 		this.tmp_gatling = new scope.Gatling(stage);	
		/* 
		stage.addEventListener("stagemousemove", Atari.proxy(this.mouseMoveHandler, this) );
		stage.addEventListener("stagemousedown", Atari.proxy(this.mouseDownHandler, this));
		stage.addEventListener("stagemouseup", Atari.proxy(this.mouseUpHandler, this));
		 */
 	}	
	
	WeaponFactory.prototype.mouseMoveHandler = function(e)
	{
		//console.log('mouseMoveHandler'  , this._dragWeapon );
 		this.placeWeapon(this._dragWeapon, e.stageX,  e.stageY);
	}
	
	WeaponFactory.prototype.getElementOffset = function (elem) {
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
		offsetX = offset.left;
		offsetY = offset.top;
		var obj = this.stage.getObjectUnderPoint(this.stage.mouseX, this.stage.mouseY);
		//var intersection = ndgmr.checkRectCollision(bird,pig.sprite);
		//skip right button click
		//console.log('mouseDownHandler', this.is_selected_weaponFactory  ,obj );
		if(!this.is_selected_weaponFactory && obj.name ==  "gatingIcon" ){
			//this._gatingIcon.hitTest(e.mouseX, e.mouseY) ){
			//this._gatingIcon.hitTestPoint(e.stageX - offsetX, e.stageY - offsetY)
			//console.log('**** mouseDownHandler createWeapon'  , e.stageX,  e.stageY );
			this.createWeapon(e.stageX,  e.stageY);
			this.is_selected_weaponFactory = true;
		}
 		/*
		if (e.button == 2) return;
		if (this._gatingIcon.currentFrame == 2 && this._gatingIcon.hitTestPoint(e.stageX - offsetX, e.stageY-offsetY))
		{
			this.createWeapon();
		}	*/
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
			this.updateWeapon();
			this.weaponTool.removeRadius();
		}else
		{
			this._dragWeapon.parent.removeChild(this._dragWeapon);		
		}
		this._dragWeapon = null;
	}

	WeaponFactory.prototype.updateWeapon = function()
	{
		if(this.canCreate(this.tmp_gatling))
		{
			this._gatingIcon.gotoAndStop("gatlingIcon-1");
		}else
		{
			this._gatingIcon.gotoAndStop("gatlingIcon-0");
		}
	}

	WeaponFactory.prototype.createWeapon = function(x, y)
	{
		if(this.canCreate(this.tmp_gatling))
		{
			var g = new scope.Gatling(this.stage);	
			this._dragWeapon = g;
			this.placeWeapon(g, x, y);
			this.stage.addChild(g);
			//g.onClick = Atari.proxy(this.GatlingmouseDownHandler, this);
		}
	}
	
	WeaponFactory.prototype.GatlingmouseDownHandler = function(){
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