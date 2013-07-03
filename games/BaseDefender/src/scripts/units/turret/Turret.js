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
			
		
	}
	
	Turret.prototype = new createjs.Container(); // inherit from Container
	Turret.prototype.Container_initialize = Turret.prototype.initialize;
 	Turret.prototype.initialize = function () 
	{
		//console.log('**** initialize loadPool'  , this.parent );
		this.Container_initialize();
		this.loadPool();
		
		this._create();
		this._createHealthBar();
		
    }
	Turret.prototype.IDLE = "idle";
	Turret.prototype.FIRE = "fire";

	Turret.prototype.currentLevel = 0;
	Turret.prototype.levels = [{cost:50, sellMoney:25, upgradeMoney:45, minDamage:10, maxDamage:20, attackRadius:135, turnSpeed:300, maxHealth:500},
					  {cost:90, sellMoney:45, upgradeMoney:65, minDamage:20, maxDamage:50, attackRadius:160, turnSpeed:300, maxHealth:1000},
					  {cost:150, sellMoney:75, upgradeMoney:95, minDamage:50, maxDamage:80, attackRadius:200, turnSpeed:300, maxHealth:1500}];
	Turret.prototype._create = function()
	{
		//console.log('_create '  , this );
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
		explosion.x =  0;
		explosion.y =  0;
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
		//console.log('upgrade', this.turnSpeed ,  this.attackRadius, this.minDamage , this.maxDamage, this.health );
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
 
	Turret.prototype.tick = function(tickFactor, player)
	{
		if(isNaN(tickFactor))
			return;
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
			this.animateDeath(player);
		}
		
		//this.tickFactor = tickFactor;
		
		this.emitter.tickFactor = tickFactor;
		//this.moveBullet(tickFactor, player);
		//this.numTicks = this.numTicks + (1*tickFactor);
		
		if (this.lastFire == 0 || this.numTicks > this.lastFire + s.FIRE_DELAY) {
			this.canFire = true;
		}
	}

	Turret.prototype.getShot = function(damage,player)
	{
		this.health -= damage;
		if(this.health < 0) this.health = 0;
		
		//update health bar
		var percent = this.health / this.maxHealth;
		//make it bigger than 1 to avoid render error
	 
		var healthWidth = Math.round(40*percent) || 1;
		if(this._healthBar) this._healthBar.scaleX = percent;
		//console.log('Turret getShot', this.health , '/', this.maxHealth );
		if( this.isDead()  && !this.anim_death ){
			this.animateDeath(player);
		}
 	}
	
	Turret.prototype.animateDeath = function(player)
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
			//console.log('explosion.onAnimationEnd'  );
			player.removeWeapon(self);
			self.parent.removeChild(self);
 			self.removeBullets(player);
		
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
		var angle = 180 / Math.PI * Math.atan2(dy, dx) ;//+ 180;
		var distance = Math.sqrt(dx*dx + dy*dy);
		
		//each frame represent 10 degree angle
		//var frame = Math.round(angle / 10);	
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
		if((!inRadius ) && this.status == status) 
		{
			if(hit) return this._checkShot();
			return false;
		}	
		
		//save changes
		//this._currentAngleFrame = frame;	
		//this._currentAngle = angle;
		this.status = status;
  		frame = "atk";
		//this.sprite.rotation =  angle - 180 - 45;
		//aim it, hit it
		 if(angle == -90) angle = 0;
		else if(angle < 0 && angle > -90) angle = -angle;
		else if(angle >= 180 && angle <= 270) angle = 180 - angle;
		 
		//var _angle = Math.floor( angle/45 )*45;
		//frame = 'deg'+_angle;
		this.sprite.rotation =  angle;//angle - 45;
		
		if(hit)
		{
			//console.log('gotoAndPlay hit', this.prefix_key_anim + frame, angle );
			this.sprite.gotoAndPlay(this.prefix_key_anim + frame);
			return this._checkShot();
		}else
		{
			//console.log('gotoAndStop !hit', this.prefix_key_anim + frame, angle );
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
	
	Turret.prototype.clearPool = function (bullet) {
		this.pool[this.bulletIndex++] = bullet;
	}
	
	Turret.prototype.getBullet = function () {
		if (this.bulletIndex > 0) {
			return this.pool[--this.bulletIndex];
		} else {
			//Atari.trace("Empty");
			return null;
		}
		return null;
	}
	Turret.prototype.playSound = function (soundname, volume) {
		var inst = SoundJS.play(soundname);
		if (volume != null) { inst.setVolume(volume); }
		return inst;
	},

	Turret.prototype.fire = function(target , tickFactor, player) {
		if(isNaN(tickFactor)){
			//console.log('*** fire # tickFactor', tickFactor );
			return;
		}
		var dx = (target.x + target.width) - (this.sprite.x + this.sprite.regX);
		var dy = (target.y + target.height) - (this.sprite.y + this.sprite.regY);//target.y - this.sprite.y;
		var angle = (Math.atan2(dy, dx) * 180/Math.PI) + 180;
		
		//fire
		var dir = scope.Utils.calcDirection(this.sprite, target), degree = dir.degree;
		if(degree == -90) degree = 0;
		else if(degree < 0 && degree > -90) degree = -degree;
		else if(degree >= 180 && degree <= 270) degree = 180 - degree;
		
		var bullet = this.getBullet();
		if (bullet != null) {
			var sin = Math.sin(degree*scope.Q.DEG_TO_RAD), cos = Math.cos(degree*scope.Q.DEG_TO_RAD);
 			/*
			bullet.sprite.x = this.sprite.x + (this.sprite.regX + 10) * sin;
			bullet.sprite.y = this.sprite.y - (this.sprite.regY + 10) * cos;*/
			bullet.sprite.rotation = degree;
 			bullet.vx = bullet.speed * sin;
			bullet.vy = bullet.speed * cos;
	 
			//bullet.speed = 2 * tickFactor ;
			bullet.angle = bullet.sprite.rotation;

			this.playSound("fire");
			this.updatefire();

			//bullet.vx = bullet.speed * Math.cos(bullet.angle * Math.PI / 180);
			//bullet.vy = bullet.speed * Math.sin(bullet.angle * Math.PI / 180);
	
			//bullet.sprite.rotation = bullet.angle;
			
			var pt = this.sprite.localToGlobal(0, 0);
			bullet.sprite.x = pt.x;
			bullet.sprite.y = pt.y-5;
			//console.log('*** fire bullet  ', tickFactor, bullet.vx, bullet.vy, bullet.sprite.rotation, bullet.sprite.x, bullet.sprite.y);
			console.log('*** fire angle at ', degree, bullet.sprite.x, bullet.sprite.y);
		
			this.bullets.push(bullet);
			player.stage.addChild(bullet.sprite);
			player.stage.setChildIndex(bullet.sprite, player.stage.getChildIndex(this.sprite)-1);
		}else{
			//console.log('*** fire bullet  null ' );
			
		}
	}
	
	Turret.prototype.updatefire = function () {
		this.canFire = false;
		this.lastFire = this.numTicks;
 	} 
	 
	Turret.prototype.removeBullets = function (player) {
		var b;
		for(var i=0;i<this.bullets.length;i++) {
			b = this.bullets[i];
			var index = this.bullets.indexOf(b);
			if (index > -1) {
				this.bullets.splice(index, 1);
				this.bulletBackToPool(b);
			}
			player.pool_bullets.push(b); 
			player.stage.addChild(b.sprite);
			//this.removeChild(b.sprite);
  		}
	} 
	Turret.prototype.moveBullet = function (tickFactor, player) {
		var b;
		for(var i=0;i<this.bullets.length;i++) {
			b = this.bullets[i];
			if(isNaN(tickFactor))
				return;
			b.sprite.x += b.vx* tickFactor;
			b.sprite.y += b.vy* tickFactor;
			console.log('*** moveBullet ', tickFactor , b.vx,b.vy,  b.sprite.x, b.sprite.y);
			var hit = this.checkWalls(b,player);
			if (hit) {
				var index = this.bullets.indexOf(b);
				if (index > -1) {
					this.bullets.splice(index, 1);
					this.bulletBackToPool(b);
				}
				this.removeChild(b.sprite);
				return;
			}
 
			this.checkCollisionEnemy(b,player);
 		}
	} 
	
	Turret.prototype.calculate = function (clip1, clip2, offset) {
		var pt = clip1.localToGlobal(0, 0);
		var dx = clip2.sprite.x - pt.x;
		var dy = clip2.sprite.y - pt.y;
		var distance = Math.sqrt(dx*dx+dy*dy);
		var minDistance = clip2.width / 2 + clip1.width / 2;
		return (distance < minDistance + offset) ? true : false;
	}
	
	Turret.prototype.checkCollisionEnemy = function (bullet,player) {
		//if (this.isGameOver) { return; }
		var targets = player.targets;
		var len = targets.length;
		if (bullet == null) { return; }
		var c;
		for (var i=0; i<len; i++) {
			c = targets[i];
			var hit = this.calculate(c, bullet, 10);//this.calculateDistance(c, bullet, 10);
			if (hit) {
				//this.createSparks(bullet.sprite.x, bullet.sprite.y, [this.pink_bullet], 5);
				this.playSound("qotileHit");
				
				var damage = this.getDamange();
				c.getShot(damage);
				//console.log('*** getDamange ',damage);
				var _enemy = c;
				// counter attack
				if(_enemy.isAggressive() && !_enemy.target){
					_enemy.target = this;
				}
				//bullet.setHit();
				var index = this.bullets.indexOf(bullet);
				if (index > -1) {
					this.bullets.splice(index, 1);
					this.bulletBackToPool(bullet);
					//console.log('*** bulletBackToPool ',bullet);
				
				}
				player.stage.removeChild(bullet.sprite);
				//bullet = null;
				return;
			}
 		}
	} 
	Turret.prototype.checkBounds = function(clip) {
		clip.sprite.x = Math.max((clip.width/8), Math.min(clip.sprite.x, this.w - clip.width / 2 ));
		clip.sprite.y = Math.max((clip.height/8), Math.min(clip.sprite.y, this.h - clip.height / 4 ));
	} 

	Turret.prototype.checkWalls = function (clip,player) {
		var right = player.gameInfo.width;
		var left = 0;
		var top = left;
		var bottom = player.gameInfo.height;
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
 
	scope.Turret = Turret;

}(window.Atari.currentGame))	