(function(scope) {
 
	HeavyTurret = function(stage)
	{
 		this.id = UID.get(); 	
		this.name = "HeavyTurret";	
		this.prefix_key_anim = "turret_";	
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
		
		this._create();
		this._createHealthBar();
		
		this.initialize();
	}
	HeavyTurret.prototype = new scope.LightTurret() ;
	HeavyTurret.prototype.Container_initialize = HeavyTurret.prototype.initialize;
 
	HeavyTurret.prototype.IDLE = "idle";
	HeavyTurret.prototype.FIRE = "fire";

	HeavyTurret.prototype.currentLevel = 0;
	HeavyTurret.prototype.levels = [{cost:150 , sellMoney:75, upgradeMoney:135, minDamage:30, maxDamage:60, attackRadius:160, turnSpeed:400, maxHealth:1000} ];
	
	HeavyTurret.prototype.initialize = function()
	{
 	}

	HeavyTurret.prototype._create = function()
	{
		console.log('_create '  , this );
		//set level
		this.setLevel(this, 0);
		
		this.spritesheet_turret  = new GameLibs.SpriteSheetWrapper(scope.ImageManager.turret);
		 
		this.sprite = this.createBitmap(this.prefix_key_anim + "idle", this.spritesheet_turret);
  		this.sprite.regX = 50;
		this.sprite.regY = 46;
		this.addChild(this.sprite);
 
		this.tick();
		
 	}
  
	scope.HeavyTurret = HeavyTurret;

}(window.Atari.currentGame))	