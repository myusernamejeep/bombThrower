(function(scope) {

	function Fetus(spritesheet) {
		this.spritesheet = spritesheet;
		this.initialize();
	}

	var s = Fetus;
	s.TIMER = 1000;

	var p = Fetus.prototype = {
		sprite:null,
		hitCount:null,
		radius:null,
		angle:null,
		outer:null,
		direction:null,
		speed:null,
		index:null,
		isHit:null,
		width:null,
		height:null,
		vx:null,
		vy:null,
		color:null,
		numTicks:null,
		fetus:null,
		egg:null,
		timer:null,
		spawnSound:null,
		stationaryAngle:null,
		spritesheet:null,

		initialize: function() {
			this.hitCount = 5;
			this.speed = 0;
			this.isHit = true;
			this.index = 0;
			this.vx = this.vy = 0;
			this.numTicks = 0;
			this.timer = 0;
			this.stationaryAngle = 0;

			this.sprite = new Container();

			this.fetus = new BitmapAnimation(this.spritesheet);
			this.fetus.gotoAndStop("Squid");

			this.egg = new BitmapAnimation(this.spritesheet);
			this.egg.gotoAndStop("Egg");

			this.egg.regX = 26>>1;
			this.egg.regY = 25>>1;

			this.fetus.regX = 38>>1;
			this.fetus.regY = 36>>1;

			//this.sprite.addChild(this.fetus);
			this.sprite.addChild(this.egg);

			this.width = this.sprite.width = 40;
			this.height = this.sprite.height = 40;
		},

		getHit: function () { return this.isHit; },
		setHit: function (value) {
			this.isHit = value;
			if (!this.isHit) {
				Tween.get(this.sprite, {override:true}).to({scaleX:0, scaleY:0}, 550, Ease.quadOut).call(this.onTweenCompleteScale, null, this);
				this.spawnSound && this.spawnSound.stop();
				this.spawnSound = null;
			}
		},

		onTweenCompleteScale: function () {
			this.sprite.visible = false;
		},

		stop: function () {
			//this.result = false;
		},

		onTweenComplete: function () {
			if (this.spawnSound == null) {
				this.spawnSound = SoundJS.play("eggSpawn");
			}
		},

		resetEgg: function  () {
			this.sprite.visible = true;
			this.isHit = true;
			Tween.get(this.sprite).to({scaleX:1, scaleY:1}, 550, Ease.quadOut);

		},

		tick: function () {
			//this.egg.rotation -= 15//Math.random() * 50 + .5;//GameLibs.Math2.getRange(-8, 8);
			//this.fetus.rotation -= 15;
			if (this.sprite.visible) { return; }


			this.numTicks++;

			if (this.numTicks > this.timer) {
				this.isHit = true;
				this.sprite.visible = true;
				this.numTicks = 0;
				var scale = 1;
				Tween.get(this.sprite, {override:true}).to({scaleX:scale, scaleY:scale}, 550, Ease.quadOut).call(this.onTweenComplete, null, this);

			}
		}
	}
	scope.currentGame.Fetus = Fetus;

}(window.Atari));