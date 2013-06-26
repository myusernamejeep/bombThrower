(function(scope) {
 
	ZombieSoldier = function(stage)
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
		
		this.initialize();
 	}
 	ZombieSoldier.prototype = new scope.Soldier(); 
	ZombieSoldier.prototype.Container_initialize = ZombieSoldier.prototype.initialize;
	//ZombieSoldier.prototype.Container_tick = ZombieSoldier.prototype._tick; 
	
 	ZombieSoldier.prototype.initialize = function(){
		//this.Container_initialize();
		this._create();
		this._createHealthBar();
	}	
	 
	ZombieSoldier.prototype.currentLevel = 0;
	ZombieSoldier.prototype.levels = [{maxHealth:100, score:10, money:3, speed:5, minDamage:10, maxDamage:20, attackRadius:20}];

	ZombieSoldier.prototype.setLevel = function(target, level)
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
			
		}	
	}
	
	ZombieSoldier.prototype.attackAble = function()
	{
		return true;
	}
	
	ZombieSoldier.prototype.upgrade = function()
	{
		this.currentLevel++;
		return true;
	}
 
	ZombieSoldier.prototype._create = function()
	{
		//set level
		this.setLevel(this, this.currentLevel);	
		//create avatar
		this._avatar = new scope.Zombie(this.stage.assets.monster_zombie, "stand");
		this.addChild(this._avatar);
		
		this._avatar.gotoAndPlay("walk_left");
		this._avatar.scaleX = -1;
	}

	ZombieSoldier.prototype.setDirection = function(direction)
	{
		if(!direction){ 
			return;
		}
		if(this.direction[0] == direction[0] && this.direction[1] == direction[1]) return;
		
		this.direction = direction;
		this._avatar.scaleX = 1;
		this._healthBarBg.x = -18;
		this._healthBar.x = -18;
		
		if(direction[0] == 1) 
		{
			//walk right
			this._avatar.gotoAndPlay("walk_left");
			this._avatar.scaleX = -1;
			
		}else if(direction[0] == -1) 
		{
			//walk left, reverse right frames
			this._healthBarBg.x = -20;
			this._healthBar.x = -20;
			//this._avatar.scaleX = -1;
			this._avatar.gotoAndPlay("walk_left");
		}else if(direction[1] == 1)
		{
			//walk down
			this._avatar.gotoAndPlay("walk_up");
			//this._avatar.scaleY = -1;
			
		}else if(direction[1] == -1)
		{
			//walk top
			this._healthBarBg.x = -21;
			this._healthBar.x = -21;
			this._avatar.gotoAndPlay("walk_up");
		}
	}
 
	ZombieSoldier.prototype.animateDeath = function()
	{
		this.removeChild(this._healthBar);
		this.removeChild(this._healthBarBg);
		this._healthBar = null;
		this._healthBarBg = null;
		this._avatar.anim_death = true;
 		var frame_name = '';
		if(this.direction[0] == 1)
		{
			frame_name = 'die_left';
			this._avatar.scaleX = -1;
			
		}else if(this.direction[0] == -1)
		{
			frame_name = 'die_left';
			
		}else if(this.direction[1] == 1)
		{
			frame_name = 'die_up';
			
		}else if(this.direction[1] == -1)
		{
			frame_name = 'die_up';
		}
		this._avatar.gotoAndPlay(frame_name);
		var self = this;
		this._avatar.onAnimationEnd = function(){
			self.parent.removeChild(self);
		};
	}
 
	ZombieSoldier.prototype.tick = function(context)
	{
		if(this.isDead() && !this._avatar.anim_death )
		{
			//animate death if health=0
			this.animateDeath();
		}else if(this.isDeadFinished()) 
		{
			//fade to ash if is dead
			this._avatar.alpha -= 0.1;
			this._avatar.stop();
		}
		
		//ZombieSoldier.superClass.render.call(this, context);
	}

	scope.ZombieSoldier = ZombieSoldier;

}(window.Atari.currentGame))	