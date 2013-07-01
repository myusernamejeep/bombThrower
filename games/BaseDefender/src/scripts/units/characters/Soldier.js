(function(scope) {
 
	var ns = scope;
	var game = ns.game ;

	Soldier = function(stage)
	{
 		this.name = "soldier";	
		this.id = UID.get(); 	
		this.status = "idle";	
		this.level = 0;
		this.maxHealth = 0;
		this.health = 0;	
		this.speed = 0;
		this.score = 0;
		this.money = 0;
		
		this.path = null;
		this.tx = -1;
		this.ty = 3;
		this.direction = [1, 0];
		this.width = 38;
		this._avatar = null;
		this._healthBar = null;	
		this._healthBarBg = null;	
		this.stage = stage;
		this.HealthBar_x = -18;
		this.HealthBar_y = -50;
		
		this._turnTime = 0;
		this._fireTime = 0;
   		this.minDamage = 0;
		this.maxDamage = 0;
		this.attackRadius = 0;
		this.turnSpeed = 0;
		this.realTurnSpeed = 0;
		this.target = null;
 
 	}
	
 	Soldier.prototype = scope.Character.prototype; // inherit from Container
	Soldier.prototype.Container_initialize = Soldier.prototype.initialize;
	
	Soldier.prototype.currentLevel = 0;
	Soldier.prototype.levels = [{maxHealth:100, score:10, money:3, speed:3 }];
	Soldier.prototype.IDLE = "idle";
	Soldier.prototype.FIRE = "fire";

 	Soldier.prototype.initialize = function()
	{
 		
    }
	Soldier.prototype._create = function()
	{
 		//set level
		this.setLevel(this, this.currentLevel);	
		//create avatar
		var spritesheet  = new GameLibs.SpriteSheetWrapper(scope.ImageManager._soldier);
 		this._avatar = this.createBitmap("walkRight", spritesheet);
		this.addChild(this._avatar);
		this._avatar.anim_death = false;
		console.log('_create Soldier', this);
	}
 
	scope.Soldier = Soldier;

}(window.Atari.currentGame))	