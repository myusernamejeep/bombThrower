(function(scope) {

	function Qotile(spritesheet, callback) {
		this.spritesheet = spritesheet;
		this.callback = callback;
		this.initialize();
	}
	var s = Qotile;
	s.IDLE = "BossIdle";
	s.HIT = "BossHit";
	s.CHARGE = "BossCharge";
	s.CHARGE_SPEED = Math.random()*18-14;
	s.NORMAL_SPEED = Math.random()*4-2;

	var p = Qotile.prototype = {
		sprite:null,
		vx:0,
		vy:0,
		duration:null,
		cx:null,
		cy:null,
		width:null,
		height:null,
		shake:null,
		boss:null,
		healthBar:null,
		healthTrack:null,
		hitCount:null,
		hitTotal:null,
		spritesheet:null,
		shakeSpeed:null,
		charged:null,
		totalCount:null,
		count:null,
		isKilled:null,
		shield:null,
		hitSound:null,
		drool:null,
		canShake:null,
		originX:null,
		originY:null,
		shakeCount:null,

		initialize: function() {
			this.shake = false;
			this.duration = 50;
			this.hitTotal = 10;
			this.hitCount = 0;
			this.totalCount = 5;
			this.count = 0;
			this.shakeCount = 0;
			this.originX = this.originY = 0;
			this.charged = false;
			this.isKilled = false;
			this.canShake = true;
			this.sprite = new Container();

			var loopingAnimations = [s.IDLE, s.CHARGE, "QotileDrool"];

			for(var p in this.spritesheet._data){
				this.spritesheet._data[p].frequency = 4;
				if(loopingAnimations.indexOf(p) != -1){
					this.spritesheet._data[p].next = p;
				} else {
					this.spritesheet._data[p].next = false;
				}
			}

			this.boss = new BitmapAnimation(this.spritesheet);
			this.boss.gotoAndPlay("BossIdle");
			this.boss.regX = 125/2;
			this.boss.regY = 151/2;
			this.boss.onAnimationEnd = Atari.proxy(this.onAnimationComplete, this,this.boss);

			this.width = 90;
			this.height = 90;

			this.drool = new BitmapAnimation(this.spritesheet);
			this.spritesheet._data["QotileDrool"].frequency = 5;
			this.drool.gotoAndPlay("QotileDrool");

			this.healthBar = new Shape();
			this.healthTrack = new BitmapAnimation(this.spritesheet);
			this.healthTrack.gotoAndStop("UIBossHealth");
			g = this.healthBar.graphics;
			g.setStrokeStyle(1);
			g.beginFill("#b30012");
			g.drawRoundRect(2, 1, 97, 5, 3);
			g.endFill();

			this.healthBar.x = this.width/4 - 100>>1;
			this.healthBar.y = 110;
			this.healthTrack.x = this.healthBar.x;
			this.healthTrack.y = this.healthBar.y;

			this.shield = new BitmapAnimation(this.spritesheet);
			this.shield.gotoAndStop("QotileShield");
			this.shield.regX = 167/2;
			this.shield.regY = 167/2;
			this.shield.alpha = 0;

			this.drool.x = this.healthTrack.x+10;
			this.drool.y = 25;

			this.sprite.addChild(this.shield);
			this.sprite.addChild(this.drool);
			this.sprite.addChild(this.boss);
			this.sprite.addChild(this.healthTrack);
			this.sprite.addChild(this.healthBar);
		},

		createExplosion: function () {
			this.shake = true;
			this.duration = 100;
			if (this.totalCount == this.count) {
				this.duration = 0;
				this.shake = false;
				this.shakeCount = 0;
				this.canShake = true;
				this.callback();
				return;
			}

			var arr = [new Point(-35, -35),
				new Point(-57., -57.5),
				new Point(-12.5, -57.5),
				new Point(-12.5, -12.5),
				new Point(-57.5, -12.5)];

			this.spritesheet._data["QotileExplosion"].frequency = 2;
			var explosion = new BitmapAnimation(this.spritesheet);
			explosion.gotoAndPlay("QotileExplosion");
			explosion.onAnimationEnd = Atari.proxy(this.handleExplosionComplete, this, explosion);
			explosion.x = arr[this.count].x;
			explosion.y = arr[this.count].y;


			this.sprite.addChild(explosion);
		},

		hitSheild: function (x, y) {
			this.shield.alpha = 1;
			var pt = this.sprite.globalToLocal(x, y);
			var dx = pt.x - this.shield.x;
			var dy = pt.y - this.shield.y;
			var angle = (Math.atan2(dy, dx) * 180/Math.PI) - 180;

			this.shield.rotation = angle;

			Tween.get(this.shield, {override:true}).wait(300).call(this.handleSheildComplete, null, this);
		},

		handleSheildComplete: function () {
			Tween.get(this.shield, {override:true}).to({alpha:0}, 300);
		},

		handleComplete: function () {
			this.count++;
			this.createExplosion();
		},

		handleExplosionComplete: function (ref) {
			this.sprite.removeChild(ref);
			Tween.get(this.sprite, {override:true}).wait(100).call(this.handleComplete, null, this);
		},

		onAnimationComplete: function (animation) {
			switch(animation.currentAnimation) {
				case s.HIT:
					animation.gotoAndPlay(s.IDLE);
					break;
				case s.CHARGE:
					animation.gotoAndPlay(s.IDLE);
					this.charged = true;
					this.shake = false;
					break;
				case s.IDLE:

					break;
			}
		},

		hit: function(value) {
			this.shake = true;
			if (value) {
				if (this.hitSound == null) {
					this.hitSound = SoundJS.play("qotileHit");
				}
				this.count = 0;
				var ratio = (++this.hitCount)/this.hitTotal;
				this.healthBar.scaleX = Math.max(1-ratio, 0);
				this.boss.gotoAndPlay(s.HIT);
			}
		},

		kill: function () {
			this.isKilled = true;
			this.hitSound && this.hitSound.stop();
			this.hitSound = null;
			this.createExplosion();
		},

		reset: function () {
			this.healthBar.scaleX = 1;
			this.hitCount = 0;
			this.isKilled = false;
			this.shakeCount = 0;
			this.canShake = true;
		},

		charge: function () {
			this.boss.gotoAndPlay(s.CHARGE);
			this.shake = true;

		},

		onFinishShake: function() {
			this.shakeCount++;
			if (this.shakeCount >= 10) {
				Tween.removeTweens(this.sprite);
				this.sprite.x = this.originX;
				this.sprite.y = this.originY;
				this.canShake = true;
				this.shakeCount = 0;
			}
		},

		tick: function() {
			if (this.shake && this.canShake) {
				this.shakeCount = 0;
				this.shake = false;
				this.canShake = false;
				Tween.get(this.sprite,{loop:true}).to({x:this.sprite.x+Math.random()*10-10, y:this.sprite.y+Math.random()*10-10}, 100).call(this.onFinishShake, null, this);
			}
		}
	}

	scope.currentGame.Qotile = Qotile;

}(window.Atari));