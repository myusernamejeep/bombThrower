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
	Gatling.prototype.levels = [{cost:50, sellMoney:25, upgradeMoney:45, minDamage:10, maxDamage:20, attackRadius:135, turnSpeed:300},
					  {cost:90, sellMoney:45, upgradeMoney:65, minDamage:20, maxDamage:50, attackRadius:160, turnSpeed:300},
					  {cost:150, sellMoney:75, upgradeMoney:95, minDamage:50, maxDamage:80, attackRadius:200, turnSpeed:300}];

	Gatling.prototype.setLevel = function(target, level)
	{
		target.level = level;
		target.cost = this.levels[level].cost;
		target.sellMoney = this.levels[level].sellMoney;
		target.upgradeMoney = this.levels[level].upgradeMoney;
		target.minDamage = this.levels[level].minDamage;
		target.maxDamage = this.levels[level].maxDamage;
		target.attackRadius = this.levels[level].attackRadius;
		target.realTurnSpeed = target.turnSpeed = this.levels[level].turnSpeed;
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
		console.log('upgrade', this.turnSpeed ,  this.attackRadius, this.minDamage , this.maxDamage );
		this.tick();
	}
	Gatling.prototype.createBitmap = function(name, spritesheet) {	
 
		var sprite =  new  createjs.BitmapAnimation( spritesheet || this.spritesheet );
		sprite.gotoAndStop(name);
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
		
		this.spritesheet_yellowdigit  = new GameLibs.SpriteSheetWrapper(this.stage.assets.yellow_digit);
		this.addChild(this.sprite_idle);
		this.addChild(this.sprite_attack1);
		//note: here we only have bitmaps for right side, we use scaleX=-1 for flipping to left side
		this.addChild(this.levelDigit);
				
		this.tick();
	}
	
	Gatling.prototype.tick = function()
	{
		if(this.levelDigit){
			this.levelDigit.removeAllChildren();
		}
		var str = this.level + 1;
 		var str = str.toString();
		var offsetX =  25 - (35-str.length*7)*0.5;
		var offsetY =  30;
		for(var i = str.length - 1; i >= 0; i--)
		{
			var frame = this.createBitmap(str[i],this.spritesheet_yellowdigit);
			frame.scaleX = frame.scaleY = 0.7;
			frame.x = offsetX ;
			frame.y = offsetY;
			this.levelDigit.addChild(frame);
			offsetX -= this.spritesheet_yellowdigit["_frames"][ str[i] ][2] *  0.7-1;
		}
		console.log('Gatling tick', this.levelDigit  , this.level, str.length, this.spritesheet_yellowdigit["_frames"]);
		
 	}

	Gatling.prototype.stop = function()
	{
		this.status = this.IDLE;
  		this.sprite_idle.visible = true;
		this.sprite_attack1.visible = false;
		this.sprite_idle.gotoAndPlay("idle");
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