(function(scope) {
 
	var ns = scope;
	var game = ns.game ;

	Character = function(stage)
	{
 		this.name = "Character";	
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
	
 	Character.prototype = new createjs.Container(); // inherit from Container
	Character.prototype.Container_initialize = Character.prototype.initialize;
	
	Character.prototype.currentLevel = 0;
	Character.prototype.levels = [{maxHealth:100, score:10, money:3, speed:3 }];
	Character.prototype.IDLE = "idle";
	Character.prototype.FIRE = "fire";

 	Character.prototype.initialize = function()
	{
 		
    }
	Character.prototype._create = function()
	{
 		//set level
		this.setLevel(this, this.currentLevel);	
		//create avatar
		var spritesheet  = new GameLibs.SpriteSheetWrapper(scope.ImageManager._soldier);
 		this._avatar = this.createBitmap("walkRight", spritesheet);
		this.addChild(this._avatar);
		this._avatar.anim_death = false;
		console.log('_create Character', this);
	}
	Character.prototype.createBitmap = function(name, spritesheet) {	
 
		var sprite = new createjs.BitmapAnimation( spritesheet );
		sprite.gotoAndPlay(name);
		sprite.mouseEnabled = true;
 
		return sprite;
	} 
	Character.prototype._createHealthBar = function()
	{	
		var x = this.HealthBar_x;
		var y = this.HealthBar_y;
		//health red bg
		var spritesheet_icon  = new GameLibs.SpriteSheetWrapper(scope.ImageManager._icon);
		var bg = this.createBitmap("healthRed",  spritesheet_icon);
		bg.x = x;
		bg.y = y;
		this._healthBarBg = bg;
		this.addChild(bg);
		//health green bar
		var bar = this.createBitmap("healthGreen", spritesheet_icon);
		bar.x = x;
		bar.y = y;
		this._healthBar = bar;
		this.addChild(bar);
	}
	Character.prototype.setLevel = function(target, level)
	{
		if(level >= this.levels.length)
		{
			var nowLevel = this.levels[level-1];
			var nextLevel = this.levels[level] = {};
			this.levels[level].maxHealth = nowLevel.maxHealth*1.50>>0;
			this.levels[level].score = nowLevel.score*1.10>>0;
			this.levels[level].money = nowLevel.money+(level>>1);
			this.levels[level].speed = nowLevel.speed;
			this.levels[level].turnSpeed = nowLevel.turnSpeed*1.10>>0;
			//console.log("level:", level, nextLevel.maxHealth, nextLevel.score, nextLevel.money);
		}
		
		if(target)
		{
			target.level = level;
			target.health = target.maxHealth = this.levels[level].maxHealth;
			target.score = this.levels[level].score;
			target.money = this.levels[level].money;
			target.speed = this.levels[level].speed;
			target.realTurnSpeed = target.turnSpeed = this.levels[level].turnSpeed;
		}	
	}
 
	Character.prototype.getLevel = function(level)
	{
		if(level == undefined) level = this.currentLevel;
		if(level < 0 || level >= this.levels.length) return null;
		return this.levels[level];
	}
	Character.prototype.isAttackAble = function()
	{
		return this.attackAble || false;
	}
	Character.prototype.isMoveAble = function()
	{
		return true;
	}
	Character.prototype.isAggressive = function()
	{
		return this.aggressive || false; 
	}
	Character.prototype.isAntiTower = function()
	{
		return this.antiTower || false;
	}
	Character.prototype.isMovingToTarget = function(distance)
	{
		return this.movingToTarget || false;
	}
	Character.prototype.setMovingToTarget = function(value)
	{
		this.movingToTarget = value;
	}
	Character.prototype.isInAttackRadius = function(distance)
	{
		return distance <= this.attackRadius;
	}
	Character.prototype.isInAttackRadius = function(distance)
	{
		return distance <= this.attackRadius;
	}
	Character.prototype.isDead = function()
	{	
		return this.health == 0;
	}
	Character.prototype.isDeadFinished = function()
	{
		return this._avatar && this._avatar.currentFrame > 33 && this._avatar._paused;
	}
	Character.prototype.aim = function(target, autoFire)
	{
		//target can be either a DisplayObject or a Point like {x:10, y:10}
		var dx = target.x - this.x;
		var dy = target.y - this.y;
		//var angle = 180 / Math.PI * Math.atan2(dy, dx) + 180;
		var distance = Math.sqrt(dx*dx + dy*dy);
 
		var inRadius = this.isInAttackRadius(distance);
		var status;
		if(autoFire)
		{
			if(inRadius) status = this.FIRE;
			else status = this.IDLE;
		}
		var hit = status == this.FIRE;
		//set turn and fire time
		
		//console.log('hit inRadius ',distance, this.attackRadius,  inRadius, status, this.FIRE);
		if(hit) 
		{
			if(this.status == this.IDLE)
			{
				this._turnTime = new Date().getTime();
				this._fireTime = 0;
			}else
			{
				this._turnTime = this._turnTime || 0;
				this._fireTime = new Date().getTime() - this._turnTime ;
			}	
		}else{
			this._turnTime = new Date().getTime();	
		}
 
		//skip if there is no change and beyond radius
		if((!inRadius ) && this.status == status) 
		{
			//console.log('!inRadius this.status', this.status);
			if(hit) return this._checkShot();
			return false;
		}	
		this.status = status;
		frame = "atk_right";
		if(hit)
		{
			this._avatar.gotoAndPlay(frame);
			//console.log('enemy aim and atk hit', frame, status, this._fireTime , this.realTurnSpeed, this._fireTime >= this.realTurnSpeed);
			return this._checkShot();
		}else
		{
			this._avatar.gotoAndPlay("stand");
		}
		return false;
	}
	Character.prototype._checkShot = function()
	{
		if(this._fireTime >= this.realTurnSpeed)
		{
			this._fireTime = 0;
			this._turnTime = new Date().getTime();
			//console.log('atk _checkShot true');
			return true;
		}
		return false;
	}
	Character.prototype.getDamange = function()
	{
		return Math.round(Math.random()*(this.maxDamage - this.minDamage)) + this.minDamage;
	}
	Character.prototype.setDirection = function(direction)
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
			this._avatar.gotoAndPlay("walkRight");
		}else if(direction[0] == -1) 
		{
			//walk left, reverse right frames
			this._healthBarBg.x = -20;
			this._healthBar.x = -20;
			this._avatar.scaleX = -1;
			this._avatar.gotoAndPlay("walkRight");
		}else if(direction[1] == 1)
		{
			//walk down
			this._avatar.gotoAndPlay("walkDown");
		}else if(direction[1] == -1)
		{
			//walk top
			this._healthBarBg.x = -21;
			this._healthBar.x = -21;
			this._avatar.gotoAndPlay("walkTop");
		}
	}
	Character.prototype.getShot = function(damage)
	{
		this.health -= damage;
		if(this.health < 0) this.health = 0;
		
		//update health bar
		var percent = this.health / this.maxHealth;
		//make it bigger than 1 to avoid render error
		var healthWidth = Math.round(40*percent) || 1;
		if(this._healthBar) this._healthBar.scaleX = percent;
		
 		if(this.status && this.status != this.FIRE){
			this.animateHit();
		}
		console.log('Character.getShot', this.health , '/', this.maxHealth ,   this.status);
		if( this.isDead()  && !this._avatar.anim_death ){
			this.animateDeath();
		}
 	}
	
	Character.prototype.animateIdle = function()
	{
		this._avatar.gotoAndPlay("walkRight");
 	} 
	Character.prototype.animateMove = function()
	{
		this._avatar.gotoAndPlay("walkRight");
 	}
	Character.prototype.animateHit = function()
	{
  	
	} 
	Character.prototype.animateAttack = function()
	{
		var direction = this.direction;
		if(!direction){ 
			return;
		}
		this.status = this.FIRE;
		if(direction[0] == 1) 
		{
			//  right
			this._avatar.scaleX = -1;
			this._avatar.gotoAndPlay("atk_left");
		}else if(direction[0] == -1) 
		{
			//  left, reverse right frames
			this._healthBarBg.x = -20;
			this._healthBar.x = -20;
			this._avatar.gotoAndPlay("atk_left");
		}else if(direction[1] == 1)
		{
			//  down
			this._avatar.gotoAndPlay("atk_up");
		}else if(direction[1] == -1)
		{
			//  top
			this._healthBarBg.x = -21;
			this._healthBar.x = -21;
			this._avatar.gotoAndPlay("atk_up");
		}
 	}
	Character.prototype.animateDeath = function() 
	{
		this.removeChild(this._healthBar);
		this.removeChild(this._healthBarBg);
		this._healthBar = null;
		this._healthBarBg = null;
		this._avatar.anim_death = true;
 		var frame_name = '';
		if(this.direction[0] == 1)
		{
 			frame_name = 'deathRightForwards';
		}else if(this.direction[0] == -1)
		{
  			frame_name = 'deathRightBackwards';
		}else if(this.direction[1] == 1)
		{
  			frame_name = 'deathDownBackwards';
		}else if(this.direction[1] == -1)
		{
  			frame_name = 'deathTopForwards';
		}
 		this._avatar.gotoAndPlay(frame_name);
		var self = this;
		this._avatar.onAnimationEnd = function(){
			if(self.parent)
				self.parent.removeChild(self);
		};
	}
	Character.prototype.tick = function( ) 
	{
		if(this.isDead() && !this._avatar.anim_death )
		{
			//animate death if health=0
			//console.log('animateDeath', this.health );
			
			this.animateDeath();
		}else if(this.isDeadFinished()) 
		{
			//fade to ash if is dead
			this._avatar.alpha -= 0.1;
			this._avatar.stop();
		}
		
 	}
	Character.prototype.upgrade = function() 
	{
		this.currentLevel++;
		return true;
	}
	scope.Character = Character;

}(window.Atari.currentGame))	