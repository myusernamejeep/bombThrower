(function(scope) {
 
	LightTurret = function(stage)
	{
 		this.id = UID.get(); 	
		this.name = "LightTurret";	
		this.prefix_key_anim = "light_turret_";	
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
		
		this.initialize();
	} 
	
 	
	LightTurret.prototype = new scope.Turret() ; 
	LightTurret.prototype.Container_initialize = LightTurret.prototype.initialize;
	LightTurret.prototype.Container_tick = LightTurret.prototype.tick; 
	
	LightTurret.prototype.IDLE = "idle";
	LightTurret.prototype.FIRE = "fire";

	LightTurret.prototype.currentLevel = 0;
	LightTurret.prototype.levels = [{cost:50, sellMoney:25, upgradeMoney:45, minDamage:10, maxDamage:20, attackRadius:135, turnSpeed:300, maxHealth:500},
					  {cost:90, sellMoney:45, upgradeMoney:65, minDamage:20, maxDamage:50, attackRadius:160, turnSpeed:300, maxHealth:1000},
					  {cost:150, sellMoney:75, upgradeMoney:95, minDamage:50, maxDamage:80, attackRadius:200, turnSpeed:300, maxHealth:1500}];
	
	LightTurret.prototype.initialize = function()
	{
		
		this._create();
		this._createHealthBar();
		
 	}
	LightTurret.prototype.tick = function()
	{
		this.Container_tick();
	}
	LightTurret.prototype._create = function()
	{
		//console.log('_create '  , this , this.prefix_key_anim);
		//set level
		this.setLevel(this, 0);
		var spritesheet_turret  = new GameLibs.SpriteSheetWrapper(scope.ImageManager.turret);
		 
		this.sprite = this.createBitmap(this.prefix_key_anim + "idle",  spritesheet_turret);
  		this.sprite.regX = 23;
		this.sprite.regY = 36;
		this.addChild(this.sprite);
 
		//this.tick();
		
 	}
  
	scope.LightTurret = LightTurret;

}(window.Atari.currentGame))	