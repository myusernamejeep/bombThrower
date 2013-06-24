(function(scope) {
 
	var ns = scope;
	var game = ns.game ;

	Soldier = function()
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
		
		this.initialize();
 	}
 	Soldier.prototype = new createjs.Container(); // inherit from Container
	Soldier.prototype.Container_initialize = Soldier.prototype.initialize;
	Soldier.prototype.Container_tick = Soldier.prototype._tick; 
	
 	Soldier.prototype.initialize = function(){
		this.Container_initialize();
		this._create();
	}	
	Soldier.prototype._tick = function () {
		this.Container_tick();
    }
	Soldier.prototype.currentLevel = 0;
	Soldier.prototype.levels = [{maxHealth:100, score:10, money:3, speed:5}];

	Soldier.prototype.setLevel = function(target, level)
	{
		if(level >= this.levels.length)
		{
			var nowLevel = this.levels[level-1];
			var nextLevel = this.levels[level] = {};
			this.levels[level].maxHealth = nowLevel.maxHealth*1.50>>0;
			this.levels[level].score = nowLevel.score*1.10>>0;
			this.levels[level].money = nowLevel.money+(level>>1);
			this.levels[level].speed = nowLevel.speed;
			console.log("level:", level, nextLevel.maxHealth, nextLevel.score, nextLevel.money);
		}
		
		if(target)
		{
			target.level = level;
			target.health = target.maxHealth = this.levels[level].maxHealth;
			target.score = this.levels[level].score;
			target.money = this.levels[level].money;
			target.speed = this.levels[level].speed;
		}	
	}

	Soldier.prototype.getLevel = function(level)
	{
		if(level == undefined) level = this.currentLevel;
		if(level < 0 || level >= this.levels.length) return null;
		return this.levels[level];
	}

	Soldier.prototype.upgrade = function()
	{
		this.currentLevel++;
		return true;
	}
	Soldier.prototype.createBitmap = function(name, spritesheet) {	
 
		var sprite =  new  createjs.BitmapAnimation( spritesheet || this.spritesheet );
		sprite.gotoAndPlay(name);
 
		return sprite;
	} 
	Soldier.prototype._create = function()
	{
		//set level
		this.setLevel(this, this.currentLevel);	
		//create avatar
		this.spritesheet  = new GameLibs.SpriteSheetWrapper(scope.ImageManager._soldier);
		this._avatar = this.createBitmap("walkRight", this.spritesheet);
		/*
		this._avatar = new MovieClip();	
		//walk
		this._avatar.addFrame(ImageManager.soldier.walkRight);
		this._avatar.addFrame(ImageManager.soldier.walkTop);
		this._avatar.addFrame(ImageManager.soldier.walkDown);
		//death
		this._avatar.addFrame(ImageManager.soldier.deathRightForwards);
		this._avatar.addFrame(ImageManager.soldier.deathRightBackwards);
		this._avatar.addFrame(ImageManager.soldier.deathDownBackwards);
		this._avatar.addFrame(ImageManager.soldier.deathTopForwards);*/
		this.addChild(this._avatar);
		
		var x = -18;
		var y = -50;
		//health red bg
		this.spritesheet_icon  = new GameLibs.SpriteSheetWrapper(scope.ImageManager._icon);
		var bg = this.createBitmap("healthRed", this.spritesheet_icon);
		//var bg = new Bitmap(ImageManager.icon.src, ImageManager.icon.healthRed);
		bg.x = x;
		bg.y = y;
		this._healthBarBg = bg;
		this.addChild(bg);
		//health green bar
		var bar = this.createBitmap("healthGreen", this.spritesheet_icon);
		//var bar = new Bitmap(ImageManager.icon.src, ImageManager.icon.healthGreen);
		bar.x = x;
		bar.y = y;
		this._healthBar = bar;
		this.addChild(bar);
	}

	Soldier.prototype.setDirection = function(direction)
	{
		if(!direction){ 
			//console.debug("direction", direction, 'this.direction', this.direction);
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

	Soldier.prototype.getShot = function(damage)
	{
		this.health -= damage;
		if(this.health < 0) this.health = 0;
		
		//update health bar
		var percent = this.health / this.maxHealth;
		//make it bigger than 1 to avoid render error
		var healthWidth = Math.round(40*percent) || 1;
		if(this._healthBar) this._healthBar.scaleX = percent;
 	}

	Soldier.prototype.animateDeath = function()
	{
		this.removeChild(this._healthBar);
		this.removeChild(this._healthBarBg);
		this._healthBar = null;
		this._healthBarBg = null;
		this._avatar.anim_death = true;
		//var deathFrame = 33;
		var frame_name = '';
		if(this.direction[0] == 1)
		{
			//deathRightForwards
			//deathFrame += 1;	
			frame_name = 'deathRightForwards';
		}else if(this.direction[0] == -1)
		{
			//deathRightBackwards
			//deathFrame += ImageManager.soldier.deathRightForwards.length + 1;
			frame_name = 'deathRightBackwards';
		}else if(this.direction[1] == 1)
		{
			//deathDownBackwards
			//deathFrame += ImageManager.soldier.deathRightForwards.length + ImageManager.soldier.deathRightBackwards.length + 1;
			frame_name = 'deathDownBackwards';
		}else if(this.direction[1] == -1)
		{
			//deathTopForwards		
			//deathFrame = this._avatar._frames.length - ImageManager.soldier.deathTopForwards.length + 1;
			frame_name = 'deathTopForwards';
		}
		//console.debug("._avatar.gotoAndPlay", frame_name, this._avatar );
		this._avatar.gotoAndPlay(frame_name);
		var self = this;
		this._avatar.onAnimationEnd = function(){
			self.parent.removeChild(self);
		};
	}

	Soldier.prototype.isDead = function()
	{	
		return this.health == 0;
	}

	Soldier.prototype.isDeadFinished = function()
	{
		return this._avatar.currentFrame > 33 && this._avatar._paused;
	}

	Soldier.prototype.tick = function(context)
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
		
		//Soldier.superClass.render.call(this, context);
	}

	scope.Soldier = Soldier;

}(window.Atari.currentGame))	