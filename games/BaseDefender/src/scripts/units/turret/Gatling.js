(function(scope) {
 
	var ns = scope;
	var game = ns.game ;

	 
	Gatling = function(stage)
	{
 		this.id = UID.get(); 	
		this.name = "gatling";	
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
		
		//this._create();
		this.initialize(stage);
	}
	Gatling.prototype = new createjs.Container(); // inherit from Container
	Gatling.prototype.Container_initialize = Gatling.prototype.initialize;
	Gatling.prototype.Container_tick = Gatling.prototype._tick; 
	Gatling.prototype._tick = function () {
		this.Container_tick();
    }
	Gatling.prototype.IDLE = "idle";
	Gatling.prototype.FIRE = "fire";

	Gatling.prototype.currentLevel = 0;
	Gatling.prototype.levels = [{cost:50, sellMoney:25, upgradeMoney:45, minDamage:10, maxDamage:20, attackRadius:135, turnSpeed:300, maxHealth:500},
					  {cost:90, sellMoney:45, upgradeMoney:65, minDamage:20, maxDamage:50, attackRadius:160, turnSpeed:300, maxHealth:1000},
					  {cost:150, sellMoney:75, upgradeMoney:95, minDamage:50, maxDamage:80, attackRadius:200, turnSpeed:300, maxHealth:1500}];

	Gatling.prototype.setLevel = function(target, level)
	{
	
		if(level >= this.levels.length)
		{
			var nowLevel = this.levels[level-1];
			var nextLevel = this.levels[level] = {};
			this.levels[level].cost = nowLevel.cost*1.50>>0;
			this.levels[level].sellMoney = nowLevel.sellMoney*1.50>>0;
			this.levels[level].upgradeMoney = nowLevel.upgradeMoney*1.50>>0;
			this.levels[level].minDamage = nowLevel.minDamage*1.30>>0;
			this.levels[level].maxDamage = nowLevel.maxDamage*1.30>>0;
			this.levels[level].attackRadius = nowLevel.attackRadius*1.20>>0;
 			this.levels[level].turnSpeed = nowLevel.turnSpeed*1.10>>0;
			this.levels[level].maxHealth = nowLevel.maxHealth*1.20>>0;
 		}
		
		if(target)
		{
			target.level = level;
			target.cost = this.levels[level].cost;
			target.sellMoney = this.levels[level].sellMoney;
			target.upgradeMoney = this.levels[level].upgradeMoney;
			target.minDamage = this.levels[level].minDamage;
			target.maxDamage = this.levels[level].maxDamage;
			target.attackRadius = this.levels[level].attackRadius;
			target.realTurnSpeed = target.turnSpeed = this.levels[level].turnSpeed;
 			target.health = target.maxHealth = this.levels[level].maxHealth;
		}
	}

	Gatling.prototype.getLevel = function(level)
	{
		if(level == undefined) level = this.currentLevel;
		if(level < 0 || level >= this.levels.length) return null;
		return this.levels[level];
	}

	Gatling.prototype.canUpgrade = function()
	{
		return this.level < 10;
	}

	Gatling.prototype.upgrade = function()
	{
		if(!this.canUpgrade()) return;
		this.level++;
		this.cost = this.cost + this.upgradeMoney;
		this.sellMoney = this.cost*0.5>>0;
		this.upgradeMoney = this.upgradeMoney + 25;	
		this.minDamage = this.minDamage + 10;
		this.maxDamage = this.maxDamage + 20 + this.level*this.level;
		if(this.attackRadius < 200) this.attackRadius = this.attackRadius + 10;
		this.turnSpeed += 2;
		this.realTurnSpeed +=2;
		this.health = this.maxHealth*1.20>>0;
		console.log('upgrade', this.turnSpeed ,  this.attackRadius, this.minDamage , this.maxDamage, this.health );
		this.tick();
	}
	Gatling.prototype.createBitmap = function(name, spritesheet, play) {	
 
		var sprite =  new  createjs.BitmapAnimation( spritesheet || this.spritesheet );
		if(play){
			sprite.gotoAndPlay(name);
		}else{
			sprite.gotoAndStop(name);
		}
		sprite.mouseEnabled = true;
 
		return sprite;
	} 
	Gatling.prototype.initialize = function(stage ){
		this.Container_initialize();
		this.stage = stage;
		//set level
		this.setLevel(this, 0);
		this.spritesheet_idle  = new GameLibs.SpriteSheetWrapper(scope.ImageManager._gatling);
		this.spritesheet_gatling_attack1 = new GameLibs.SpriteSheetWrapper(scope.ImageManager._gatling_attack1);
		this.sprite_idle = this.createBitmap("idle", this.spritesheet_idle);
		this.sprite_attack1 = this.createBitmap("attack1", this.spritesheet_gatling_attack1);
		this.sprite_attack1.visible = false;
		this.levelDigit = new createjs.Container();
		//console.log('assets', this.stage, this.stage.assets );
		
		this.spritesheet_yellowdigit  = new GameLibs.SpriteSheetWrapper(scope.ImageManager.yellow_digit);
		this.addChild(this.sprite_idle);
		this.addChild(this.sprite_attack1);
		//note: here we only have bitmaps for right side, we use scaleX=-1 for flipping to left side
		this.addChild(this.levelDigit);
		
		this.spritesheet_weapon  = new GameLibs.SpriteSheetWrapper(scope.ImageManager.weapon);
 		var explosion = this.createBitmap("explosion", this.spritesheet_weapon);
		explosion.x = -120;
		explosion.y = -120;
		this.explosion = explosion;
		this.explosion.visible = false;
		this.addChild(explosion);
		
		// health
		this.healthContainer = new createjs.Container();
		var x = -18;
		var y = -50;
		//health red bg
		this.spritesheet_icon  = new GameLibs.SpriteSheetWrapper(scope.ImageManager._icon);
		var bg = this.createBitmap("healthRed", this.spritesheet_icon);
		bg.x = x;
		bg.y = y;
		this._healthBarBg = bg;
		this.healthContainer.addChild(bg);
		//health green bar
		var bar = this.createBitmap("healthGreen", this.spritesheet_icon);
		bar.x = x;
		bar.y = y;
		this._healthBar = bar;
		this.healthContainer.addChild(bar);
		this.addChild(this.healthContainer);
		
		this.tick();
		
		//this.animateDeath();
	}
	
	Gatling.prototype.tick = function()
	{
		if(this.levelDigit){
			this.levelDigit.removeAllChildren();
		}
		var str = this.level + 1;
 		var str = str.toString();
		var offsetX =  25 - (35-str.length*7)*0.5;
		var offsetY =  30 - 60;
		for(var i = str.length - 1; i >= 0; i--)
		{
			var frame = this.createBitmap(str[i],this.spritesheet_yellowdigit);
			frame.scaleX = frame.scaleY = 0.5;
			frame.x = offsetX;
			frame.y = offsetY;
			this.levelDigit.addChild(frame);
			offsetX -= this.spritesheet_yellowdigit["_frames"][ str[i] ][2] *  0.7-1;
		}
 		if(this.isDead() && !this.anim_death )
		{
			//animate death if health=0
			this.animateDeath();
		}
 	}

	Gatling.prototype.stop = function()
	{
		this.status = this.IDLE;
  		this.sprite_idle.visible = true;
		this.sprite_attack1.visible = false;
		this.sprite_idle.gotoAndPlay("idle");
 	}
	
	Gatling.prototype.getShot = function(damage)
	{
		this.health -= damage;
		if(this.health < 0) this.health = 0;
		
		//update health bar
		var percent = this.health / this.maxHealth;
		//make it bigger than 1 to avoid render error
	 
		var healthWidth = Math.round(40*percent) || 1;
		if(this._healthBar) this._healthBar.scaleX = percent;
		console.log('Gatling getShot', this.health , '/', this.maxHealth );
		if( this.isDead()  && !this.anim_death ){
			this.animateDeath();
		}
 	}
	
	Gatling.prototype.animateDeath = function()
	{
		this.removeChild(this._healthBar);
		this.removeChild(this._healthBarBg);
		this._healthBar = null;
		this._healthBarBg = null;
		this.anim_death = true;
		this.sprite_idle.visible = true;
		this.sprite_attack1.visible = false;
		this.sprite_idle.gotoAndPlay("idle");
		
		this.explosion.visible = true;
		this.explosion.gotoAndPlay("explosion");
 
		var self = this;
		this.explosion.onAnimationEnd = function(){
			console.log('explosion.onAnimationEnd'  );
			self.stage.player.removeWeapon(self);
			self.parent.removeChild(self);
			console.log('self.parent', self.parent );
			console.log('self.stage.player', self.stage.player );
			
		};
	}

	Gatling.prototype.isDead = function()
	{	
		return this.health == 0;
	}
	
	Gatling.prototype.getDamange = function()
	{
		return Math.round(Math.random()*(this.maxDamage - this.minDamage)) + this.minDamage;
	}

	Gatling.prototype.isInAttackRadius = function(distance)
	{
		return distance <= this.attackRadius;
	}

	Gatling.prototype.aim = function(target, autoFire)
	{
		//target can be either a DisplayObject or a Point like {x:10, y:10}
		var dx = target.x - this.x;
		var dy = target.y - this.y;
		var angle = 180 / Math.PI * Math.atan2(dy, dx) + 180;
		var distance = Math.sqrt(dx*dx + dy*dy);
		
		//each frame represent 10 degree angle
		var frame = Math.round(angle / 10);	
		var inRadius = this.isInAttackRadius(distance);
		var status;
		if(autoFire)
		{
			if(inRadius) status = this.FIRE;
			else status = this.IDLE;
		}
		var hit = status == this.FIRE;
		//set turn and fire time
		if(hit) 
		{
			if(this.status == this.IDLE)
			{
				this._turnTime = new Date().getTime();
				this._fireTime = 0;
			}else
			{
				this._fireTime = new Date().getTime() - this._turnTime;
			}	
		}
		//trace(angle, frame, distance, this.attackRadius, status);	
		
		//skip if there is no change and beyond radius
		if((!inRadius || this._currentAngleFrame == frame) && this.status == status) 
		{
			if(hit) return this._checkShot();
			return false;
		}	
		
		//save changes
		this._currentAngleFrame = frame;	
		this._currentAngle = angle;
		this.status = status;
		//console.log('angle', angle);
		//frame = this.getRealFrame(frame, angle);
		frame = "right-atk";
		this.sprite_attack1.rotation =  angle - 180 - 45;
		//aim it, hit it
		this.sprite_idle.visible = false;
		this.sprite_attack1.visible = true;
		if(hit)
		{
			this.sprite_attack1.gotoAndPlay(frame);
			return this._checkShot();
		}else
		{
			this.sprite_attack1.gotoAndStop(frame);
		}
		return false;
	}

	Gatling.prototype.getRealFrame = function(angleFrame, angle)
	{
		//count real frame accordingly	
		var frame = angleFrame;
		if(angle >= 90 && angle <= 270) 
		{
			//right
			frame = frame - 8;
			this.scaleX = 1;
		}else if(angle >=0 && angle < 90)
		{
			//left top
			frame = 10 - frame;
			this.scaleX = -1;
		}else if(angle > 270 && angle <= 360)
		{
			//left down
			frame = 19 -(frame - 27);
			this.scaleX = -1;
		}
		return frame;
	}

	Gatling.prototype._checkShot = function()
	{
		if(this._fireTime >= this.realTurnSpeed)
		{
			this._fireTime = 0;
			this._turnTime = new Date().getTime();
			return true;
		}
		return false;
	}
	
	scope.Gatling = Gatling;

}(window.Atari.currentGame))	