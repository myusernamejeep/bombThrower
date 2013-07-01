(function(scope) {
 
	Turret = function()
	{
 		this.id = UID.get(); 	
		this.name = "Turret";	
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
 		
		this.pool = [];
		this.bullet = 0;
		this.bulletMax = 5;
		this.circles = [];
		this.bullets = [];
 		this.energies = [];
		this.angle = 0;
		this.timer = 100;
		this.missileActive = false;
		this.constainerSpeed = 0;
		this.turnOffParticles = false;
		this.hasPressed = false;
		this.numTicks = 0;
		this.lastFire = 0;
		this.lastFire = new Date().getTime();
		this.canFire = true;
  
		this.spritesheet_weapon  = new GameLibs.SpriteSheetWrapper(scope.ImageManager.weapon);
		this.pink_bullet = new createjs.BitmapAnimation(this.spritesheet_weapon);
		this.pink_bullet.gotoAndStop("pink_bullet");
/*
 		
		this.light_blue_bullet = new createjs.BitmapAnimation(this.spritesheet_weapon);
		this.light_blue_bullet.gotoAndStop("light_blue_bullet");

		this.green_bullet = new createjs.BitmapAnimation(this.spritesheet_weapon);
		this.green_bullet.gotoAndStop("green_bullet");
		*/
		this.particleContainer = new Container();
		this.addChild(this.particleContainer);
		this.emitter = new GameLibs.ParticleEmitter(this.particleContainer);

 		this.initialize();
			
		this._create();
		this._createHealthBar();
		
	}
	Turret.prototype = new createjs.Container(); // inherit from Container
	Turret.prototype.Container_initialize = Turret.prototype.initialize;
 	Turret.prototype.initialize = function () 
	{
		console.log('initialize loadPool'  , this );
		this.Container_initialize();
		this.loadPool();
		
		
    }
	Turret.prototype.IDLE = "idle";
	Turret.prototype.FIRE = "fire";

	Turret.prototype.currentLevel = 0;
	Turret.prototype.levels = [{cost:50, sellMoney:25, upgradeMoney:45, minDamage:10, maxDamage:20, attackRadius:135, turnSpeed:300, maxHealth:500},
					  {cost:90, sellMoney:45, upgradeMoney:65, minDamage:20, maxDamage:50, attackRadius:160, turnSpeed:300, maxHealth:1000},
					  {cost:150, sellMoney:75, upgradeMoney:95, minDamage:50, maxDamage:80, attackRadius:200, turnSpeed:300, maxHealth:1500}];
	Turret.prototype._create = function()
	{
		console.log('_create '  , this );
		//set level
		this.setLevel(this, 0);
		this.spritesheet_turret  = new GameLibs.SpriteSheetWrapper(scope.ImageManager.turret);
		 
		this.sprite = this.createBitmap(this.prefix_key_anim + "idle", this.spritesheet_turret);
  		this.sprite.regX = 23;
		this.sprite.regY = 36;
		this.addChild(this.sprite);
 
		this.tick();
	}
	Turret.prototype._createHealthBar = function()
	{
 	
		this.levelDigit = new createjs.Container();
		this.spritesheet_yellowdigit  = new GameLibs.SpriteSheetWrapper(scope.ImageManager.yellow_digit);
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
	}
	Turret.prototype.setLevel = function(target, level)
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

	Turret.prototype.getLevel = function(level)
	{
		if(level == undefined) level = this.currentLevel;
		if(level < 0 || level >= this.levels.length) return null;
		return this.levels[level];
	}

	Turret.prototype.canUpgrade = function()
	{
		return this.level < 10;
	}

	Turret.prototype.upgrade = function()
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
	Turret.prototype.createBitmap = function(name, spritesheet, play) 
	{	
 
		var sprite =  new  createjs.BitmapAnimation( spritesheet || this.spritesheet );
		if(play){
			sprite.gotoAndPlay(name);
		}else{
			sprite.gotoAndStop(name);
		}
		sprite.mouseEnabled = true;
 
		return sprite;
	} 
 
	Turret.prototype.tick = function(tickFactor)
	{
		if(this.levelDigit){
			this.levelDigit.removeAllChildren();
		}else{
			return ;
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
		//console.log('Turret tick', this.levelDigit  , this.level, str.length, this.spritesheet_yellowdigit["_frames"]);
		if(this.isDead() && !this.anim_death )
		{
			//animate death if health=0
			this.animateDeath();
		}
		
		this.update(tickFactor);
 	}
 
	Turret.prototype.getShot = function(damage)
	{
		this.health -= damage;
		if(this.health < 0) this.health = 0;
		
		//update health bar
		var percent = this.health / this.maxHealth;
		//make it bigger than 1 to avoid render error
	 
		var healthWidth = Math.round(40*percent) || 1;
		if(this._healthBar) this._healthBar.scaleX = percent;
		console.log('Turret getShot', this.health , '/', this.maxHealth );
		if( this.isDead()  && !this.anim_death ){
			this.animateDeath();
		}
 	}
	
	Turret.prototype.animateDeath = function()
	{
		this.removeChild(this._healthBar);
		this.removeChild(this._healthBarBg);
		this._healthBar = null;
		this._healthBarBg = null;
		this.anim_death = true;
 		this.sprite.gotoAndPlay("idle");
		
		this.explosion.visible = true;
		this.explosion.gotoAndPlay("explosion");
 
		var self = this;
		this.explosion.onAnimationEnd = function(){
			console.log('explosion.onAnimationEnd'  );
			self.parent.stage.player.removeWeapon(self);
			self.parent.removeChild(self);
			console.log('self.parent', self.parent.stage );
 			
		};
	}

	Turret.prototype.isDead = function()
	{	
		return this.health == 0;
	}
	
	Turret.prototype.getDamange = function()
	{
		return Math.round(Math.random()*(this.maxDamage - this.minDamage)) + this.minDamage;
	}

	Turret.prototype.isInAttackRadius = function(distance)
	{
		return distance <= this.attackRadius;
	}

	Turret.prototype.stop = function()
	{
		this.status = this.IDLE;
  		this.sprite.visible = true;
 		this.sprite.gotoAndPlay(this.prefix_key_anim + "idle");
 	}
  
	Turret.prototype.aim = function(target, autoFire)
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
  		frame = "atk";
		this.sprite.rotation =  angle - 180 - 45;
		//aim it, hit it
 
		if(hit)
		{
			this.sprite.gotoAndPlay(this.prefix_key_anim + frame);
			return this._checkShot();
		}else
		{
			this.sprite.gotoAndStop(this.prefix_key_anim + frame);
		}
		return false;
	}
	 
	Turret.prototype._checkShot = function()
	{
		if(this._fireTime >= this.realTurnSpeed)
		{
			this._fireTime = 0;
			this._turnTime = new Date().getTime();
			return true;
		}
		return false;
	}
	/*
	Turret.prototype.fireMissile = function (clip) {
		if (this.cannon.hasFired) { return; }
		if (this.missile != null) { return; }
		this.cannon.hasFired = true;
		this.missile = new scope.Missile(this.spritesheet);
		this.missile.sprite.x = clip.sprite.x + clip.width / 2;
		this.missile.sprite.y = (this.cannon.sprite.y + this.cannon.sprite.height/2) + 3;
		this.missileActive = true;
		this.playSound("missileFire");

		this.cannon.shootCannon();
		this.cannon.reset();

		this.stage.addChild(this.missile.sprite);
	}*/

	Turret.prototype.loadPool = function () {
		for (var i = 0; i<this.bulletMax; i++) {
			var bullet = new scope.Blast();
			this.pool.push(bullet);
		}
		this.bulletIndex = this.bulletMax;
	},

	Turret.prototype.bulletBackToPool = function (bullet) {
		this.pool[this.bulletIndex++] = bullet;
	}

	Turret.prototype.getBullet = function () {
		if (this.bulletIndex > 0) {
			return this.pool[--this.bulletIndex];
		} else {
			Atari.trace("Empty");
			return null;
		}
		return null;
	}
	Turret.prototype.playSound = function (soundname, volume) {
		var inst = SoundJS.play(soundname);
		if (volume != null) { inst.setVolume(volume); }
		return inst;
	},

	Turret.prototype.fire = function(target,tickFactor) {
		//this.numTicks = this.numTicks + (1*(this.tickFactor/2));
		var timer = 1;
	 
		var dx = target.x - this.sprite.x;
		var dy = target.y - this.sprite.y;
		var angle = Math.atan2(dy, dx) * 180/Math.PI;

		var bullet = this.getBullet();
		if (bullet != null) {
			bullet.speed = 15;//*this.tickFactor;
			bullet.angle = this.sprite.rotation;

			this.playSound("fire");
			this.updatefire();

			bullet.vx = bullet.speed * Math.cos(bullet.angle * Math.PI / 180);
			bullet.vy = bullet.speed * Math.sin(bullet.angle * Math.PI / 180);

			bullet.sprite.rotation = bullet.angle;

			var pt = this.sprite.localToGlobal(0, 0);
			bullet.sprite.x = pt.x;
			bullet.sprite.y = pt.y-5;

			this.bullets.push(bullet);
			this.addChild(bullet.sprite);
			this.setChildIndex(bullet.sprite, this.getChildIndex(this.sprite)-1);
		}
	}
	/*
	Turret.prototype.moveMissile =  function() {
		if (this.missile == null && !this.missileActive) {  return; }
		if (this.missile == null) { return; }
		this.missile.sprite.x +=  25 * this.tickFactor;
		var hit = this.checkWalls(this.missile);
		if (hit) {
			//if (this.stage.contains(this.missile)) {

				this.missileActive = false;
				this.stage.removeChild(this.missile.sprite);
				this.missile = null;
				this.qotile.charged = false;
				return;
			//}
		}
		this.checkCollisionEnemy(this.missile);
 
	} */

	Turret.prototype.moveBullet = function () {
		var b;
		for(var i=0;i<this.bullets.length;i++) {
			b = this.bullets[i];
			b.sprite.x += b.vx*this.tickFactor;
			b.sprite.y += b.vy*this.tickFactor;
			var hit = this.checkWalls(b);
			if (hit) {
				var index = this.bullets.indexOf(b);
				if (index > -1) {
					this.bullets.splice(index, 1);
					this.bulletBackToPool(b);
				}
				this.stage.removeChild(b.sprite);
				return;
			}
 
			this.checkCollisionEnemy(b);
 		}
	} 
	Turret.prototype.checkCollisionEnemy = function (bullet) {
		//if (this.isGameOver) { return; }
		var targets = this.parent.stage.player.targets;
		var len = targets.length;
		if (bullet == null) { return; }
		var c;
		for (var i=0; i<len; i++) {
			c = targets[i];
			//if (c.getHit()) {
				var hit = this.calculate(c, bullet, 10);//this.calculateDistance(c, bullet, 10);
				if (hit) {
					//SD:Shooting a block of the Qotile's shield
					//this.createSparks(bullet.sprite.x, bullet.sprite.y, [this.pink_bullet], 5);
					this.playSound("qotileHit");
					//this.scoreManager.addScore(s.SHOOTING_BLOCK);
					//c.setHit(false);
					//this.killedCircle = c;
					//this.createEnergy();
					var damage = this.getDamange();
					c.getShot(damage);
					var _enemy = c;
					// counter attack
					if(_enemy.isAggressive() && !_enemy.target){
						_enemy.target = this;
					}
					
					var index = this.bullets.indexOf(bullet);
					if (index > -1) {
						this.bullets.splice(index, 1);
						this.bulletBackToPool(bullet);
					}
					this.removeChild(bullet.sprite);
					//bullet = null;
					return;
				}
			//}
		}
	} 
	Turret.prototype.checkBounds = function(clip) {
		clip.sprite.x = Math.max((clip.width/8), Math.min(clip.sprite.x, this.w - clip.width / 2 ));
		clip.sprite.y = Math.max((clip.height/8), Math.min(clip.sprite.y, this.h - clip.height / 4 ));
	} 

	Turret.prototype.checkWalls = function (clip) {
		var right = this.parent.stage.gameInfo.width;
		var left = 0;
		var top = left;
		var bottom = this.parent.stage.gameInfo.height;
		if (clip.sprite.x - clip.width / 2 > right
			|| clip.sprite.x + clip.width / 2 < left
			|| clip.sprite.y - clip.height / 2 > bottom
			|| clip.sprite.y + clip.height / 2 < top) {
			return true;
		}
		return false;
	} 
	
	Turret.prototype.createSparks = function (x, y, list, num) {
		if (this.turnOffParticles) { return; }
		this.emitter.emitMultiple({x:x, y:y}, num, s.SPARK_PROPS, list);
	} 
 
	Turret.prototype.updatefire = function () {
		this.canFire = false;
		this.lastFire = this.numTicks;
		//this.hand.gotoAndPlay(s.HAND_SHOOT);
	},

	Turret.prototype.update = function(tickFactor) {
		this.tickFactor = tickFactor;
		this.emitter.tickFactor = tickFactor;
  
		//if (!this.isGameOver) {
 			//this.moveMissile();
			this.moveBullet();
 			//this.checkBounds(this.yars);
			//this.checkCollisionCannon();
			//this.checkCollisionEnergy();
 			//this.moveEnergy();
  		//}
 
		var angle;
		/*if (!this.gameInfo.touchEnabled) {
			var dx = this.currentStageX - this.sprite.x;
			var dy = this.currentStageY - this.sprite.y;
			angle = Math.atan2(dy, dx) * 180/Math.PI;

			this.sprite.rotation = (this.hasPressed) ? angle : 10;
			//this.yars.backArm.rotation = (this.hasPressed) ? angle : 10;
		}*/
		this.numTicks = this.numTicks + (1*tickFactor);

		if (this.lastFire == 0 || this.numTicks > this.lastFire + s.FIRE_DELAY) {
			this.canFire = true;
		}
		/*
		if (this.canFire) {
			this.fire(this.tickFactor);
		}*/
	}

	scope.Turret = Turret;

}(window.Atari.currentGame))	