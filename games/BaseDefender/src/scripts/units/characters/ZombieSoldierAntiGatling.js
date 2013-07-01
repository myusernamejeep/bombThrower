(function(scope) {
 
	ZombieSoldierAntiGatling = function(stage)
	{
 		this.name = UID.get(); 	
		
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
		this.minDamage = 0;
		this.maxDamage = 0;
		this.attackRadius = 0;
		this.stage = stage; 
		this.HealthBar_x = -10;
		this.HealthBar_y = -10;
		
		// set behavier
		this.antiTower = true;
		this.aggressive = true;
		this.attackAble = true;
		
		this._create();
		this._createHealthBar();
		
  	}
 	ZombieSoldierAntiGatling.prototype = scope.Character.prototype; 
	ZombieSoldierAntiGatling.prototype.constructor = ZombieSoldierAntiGatling;
	ZombieSoldierAntiGatling.prototype.Container_initialize = ZombieSoldierAntiGatling.prototype.initialize;
 	
 	ZombieSoldierAntiGatling.prototype.initialize = function(){
 	}	
	 
	ZombieSoldierAntiGatling.prototype.currentLevel = 0;
	ZombieSoldierAntiGatling.prototype.levels = [{maxHealth:1300, score:50, money:20, speed:4, minDamage:15, turnSpeed:500, maxDamage:50, attackRadius:80}];
 
	ZombieSoldierAntiGatling.prototype._create = function()
	{
		//set level
		this.setLevel(this, this.currentLevel);	
 		//create avatar
	 
		var spritesheet  = new GameLibs.SpriteSheetWrapper(scope.ImageManager.ZombieSlaughter);
 		this._avatar = this.createBitmap("stand", spritesheet);
		this.addChild(this._avatar);
		 
		console.log('_create ZombieSoldierAntiGatling ', this);
		
	}
	ZombieSoldierAntiGatling.prototype.setLevel = function(target, level)
	{
		if(level >= this.levels.length)
		{
			var nowLevel = this.levels[level-1];
			var nextLevel = this.levels[level] = {};
			this.levels[level].maxHealth = nowLevel.maxHealth*1.50>>0;
			this.levels[level].score = nowLevel.score*1.10>>0;
			this.levels[level].money = nowLevel.money+(level>>1);
			this.levels[level].speed = nowLevel.speed;
			this.levels[level].minDamage = nowLevel.minDamage*1.30>>0;
			this.levels[level].maxDamage = nowLevel.maxDamage*1.30>>0;
			this.levels[level].attackRadius = nowLevel.attackRadius*1.20>>0;
			this.levels[level].turnSpeed = nowLevel.turnSpeed*1.10>>0;
			
 			console.log("level:", level, nextLevel.maxHealth, nextLevel.score, nextLevel.money);
		}
		
		if(target)
		{
			target.level = level;
			target.health = target.maxHealth = this.levels[level].maxHealth;
			target.score = this.levels[level].score;
			target.money = this.levels[level].money;
			target.speed = this.levels[level].speed;
			target.minDamage = this.levels[level].minDamage;
			target.maxDamage = this.levels[level].maxDamage;
			target.attackRadius = this.levels[level].attackRadius;
			target.realTurnSpeed = target.turnSpeed = this.levels[level].turnSpeed;
		}	
	}
	ZombieSoldierAntiGatling.prototype.animateIdle = function(){
		this._avatar.gotoAndPlay("stand");
   	}
	ZombieSoldierAntiGatling.prototype.animateMove = function(){
		this._avatar.gotoAndPlay("walk_left");
   	} 
	ZombieSoldierAntiGatling.prototype.animateHit = function(){
		this._avatar.gotoAndPlay("damage");
		//console.log("animateHit:" );
  	} /*
	ZombieSoldierAntiGatling.prototype.animateAttack = function(){
		var direction = this.direction;
		if(!direction){ 
			return;
		}
		var frame_name;
		if(direction[0] == 1) 
		{
			//  right
			this._avatar.scaleX = -1;
			frame_name = "atk_right";
		}else//(direction[0] == -1) 
		{
			//  left, reverse right frames
			this._healthBarBg.x = -20;
			this._healthBar.x = -20;
			frame_name = "atk_left";
		} 
		console.log("animateAttack:", frame_name);
		this._avatar.gotoAndPlay(frame_name);
 	}*/
	ZombieSoldierAntiGatling.prototype.animateDeath = function()
	{
		this.removeChild(this._healthBar);
		this.removeChild(this._healthBarBg);
		this._healthBar = null;
		this._healthBarBg = null;
		this._avatar.anim_death = true;
 		var frame_name = '';
 
		if(this.direction[0] == 1)
		{
  			frame_name = 'die_right';
			this._avatar.scaleX = -1;
			
		}else// (this.direction[0] == -1)
		{
  			frame_name = 'die_left';
		} 
		console.log("ZombieSoldierAntiGatling.animateDeath:", frame_name);
		
		this._avatar.gotoAndPlay(frame_name);
		var self = this;
		this._avatar.onAnimationEnd = function(){
			console.log("ZombieSoldierAntiGatling.removeChild:" );
			if(self.parent)
				self.parent.removeChild(self);
		};
	}
	scope.ZombieSoldierAntiGatling = ZombieSoldierAntiGatling;

}(window.Atari.currentGame))	