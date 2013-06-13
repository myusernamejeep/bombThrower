(function(scope) {

	function Baddy(radius, color, spritesheet) {
		this.radius = radius;
		this.color = color;
		this.spritesheet = spritesheet;
		this.initialize();
	}

	var s = Baddy;
	s.TIMER = 100;

	var p = Baddy.prototype = {
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
		egg:null,
		clips:null,
		oldX:null,
		currentX:null,
		dir:null,
		timer:null,
		turnOn:null,
		hasMoved:null,
		spritesheet:null,


		initialize: function() {
			this.hitCount = 5;
			this.speed = 0;
			this.timer = 100;
			this.isHit = true;
			this.index = 0;
			this.vx = this.vy = 0;
			this.numTicks = 0;
			this.clips = [];
			this.turnOn = false;
			this.oldX = 0;
			this.dir = 1;
			this.currentX = 0;
			this.hasMoved = false;

			this.sprite = new Container();

			this.spritesheet._data["Egghatch"].frequency = 6;
			this.spritesheet._data["SquidIdle"].frequency = 8;

			this.egg = new BitmapAnimation(this.spritesheet);
			//this.egg.regX = 41>>1;
			//this.egg.regY = 41>>1;
			this.egg.gotoAndPlay("Egghatch");
			this.egg.onAnimationEnd = Atari.proxy(this.animationEnd, this);

			for (var i=0; i<2; i++) {
				var leg = new scope.currentGame.Legs(this.spritesheet);
				leg.sprite.x = this.sprite.x;
				leg.sprite.y = this.sprite.y;
				this.clips.push(leg);
				this.sprite.addChild(leg.sprite);
			}
			this.sprite.addChild(this.egg);

			this.width = this.sprite.width = this.radius;
			this.height = this.sprite.height = this.radius;
		},

		animationEnd: function () {
			this.egg.gotoAndPlay("SquidIdle");
		},

		getHit: function () { return this.isHit; },
		setHit: function (value) {
			this.hitCount--;
			this.isHit = value;
			var scale = (this.isHit) ? 0 : 1;
			this.sprite.visible = this.isHit;
		},

		hitComplete: function () {
			this.sprite.visible = this.isHit;
		},

		fixAngle: function (angle) {
			return ((angle %= 360) < 0) ? angle+360:angle;
		},

		tick: function (clip, tickFactor) {
			this.numTicks = this.numTicks + (1*tickFactor);
			this.oldX = this.currentX;
			this.currentX = this.sprite.x;

			if (this.oldX > this.currentX) {
				//LOOK LEFT;
				this.egg.scaleX = 1;
				this.dir = 1;
			} else if (this.oldX < this.currentX) {
				//LOOK RIGHT
				this.egg.scaleX = -1;
				this.dir = -1;
			} else {
				if (!this.hasMoved) {
					this.egg.scaleX = 1;
				} else {
					this.egg.scaleX = this.dir;
				}
			}

			if (this.numTicks > this.timer) {//s.TIMER) {
				this.turnOn = true;
				this.hasMoved = true;
				var dx = clip.sprite.x - this.sprite.x;
				var dy = clip.sprite.y - this.sprite.y;

				var midX = ((clip.sprite.x - this.sprite.x)/2) + this.sprite.x;
				var midY = ((clip.sprite.y - this.sprite.y)/2) + this.sprite.y;
				var degrees = (Math.atan2(dy, dx) * 180 / Math.PI);
				var angle = this.fixAngle(degrees);

				if (!clip.disabled) {
					Tween.get(this.sprite, {override:true}).to({x:midX, y:midY, rotation:angle}, 1200, Ease.quadOut);
					Tween.get(this.egg, {override:true}).to({rotation:-angle}, 1200, Ease.quadOut);
				} else {
					Tween.get(this.sprite, {override:true}).to({x:350, y:midY}, 1200, Ease.quadOut);

				}
				this.numTicks = 0;
			} else {
				this.turnOn = false;
			}
			var l = this.clips.length;
			var leg;
			var dx;
			var dy;
			var angle;

			for (var i=0; i<l; i++) {
				leg = this.clips[i];
				dx = this.egg.x - leg.sprite.x;
				dy = this.egg.y - leg.sprite.y;
				angle = (Math.atan2(dy,dx) * 180 / Math.PI) + 180;
				if (this.turnOn) {
					leg.sprite.rotation = angle;
				}
				leg.tick();
			}
		}

	}

	scope.currentGame.Baddy = Baddy;

}(window.Atari));