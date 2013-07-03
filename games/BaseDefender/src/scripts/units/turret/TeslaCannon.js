(function(scope) {
 
	TeslaCannon = function(stage)
	{
 		this.id = UID.get(); 	
		this.name = "TeslaCannon";	
		this.prefix_key_anim = "tesla_";	
		this.status = "idle";	
		this.level = 0;
		this.cost = 0;
		this.sellMoney = 0;
		this.upgradeMoney = 0;
		this.minDamage = 0;
		this.maxDamage = 0;
		this.attackRadius = 0;
		this.turnSpeed = 0;
		this.realTurnSpeed = 0;
		this.target = null;
		this.tx = -1;
		this.ty = -1;
		
		this._turnTime = 0;
		this._fireTime = 0;
		this._currentAngleFrame = -1;
		this._currentAngle = 0;
		
		this.maxHealth = 0;
		this.health = 0;	
		this._healthBar = null;	
		this._healthBarBg = null;	
		this.stage = stage;
		
		
		this.initialize( );
	}
	TeslaCannon.prototype = new scope.Turret() ;
	TeslaCannon.prototype.Container_initialize = TeslaCannon.prototype.initialize;
	TeslaCannon.prototype.Container_tick = TeslaCannon.prototype.tick; 
	
	TeslaCannon.prototype.IDLE = "idle";
	TeslaCannon.prototype.FIRE = "fire";

	TeslaCannon.prototype.currentLevel = 0;
	TeslaCannon.prototype.levels = [{cost:250 , sellMoney:125, upgradeMoney:200, minDamage:60, maxDamage:120, attackRadius:300, turnSpeed:400, maxHealth:2000} ];
 
	TeslaCannon.prototype.initialize = function( )
	{
		this._create();
		this._createHealthBar();
		
 	}
	TeslaCannon.prototype.tick = function()
	{
		this.Container_tick();
	}
	TeslaCannon.prototype._create = function()
	{
		//console.log('_create '  , this , this.prefix_key_anim );
		//set level
		this.setLevel(this, 0);
		var spritesheet_turret  = new GameLibs.SpriteSheetWrapper(scope.ImageManager.turret);
		 
		this.sprite = this.createBitmap(this.prefix_key_anim + "idle", spritesheet_turret);
  		this.sprite.regX = 31;
		this.sprite.regY = 56;
		this.addChild(this.sprite);
		
		//this.tick();
		
 	}
  
	scope.TeslaCannon = TeslaCannon;

}(window.Atari.currentGame))	