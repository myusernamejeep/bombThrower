(function(scope) {

	function Swirl(spritesprite) {
		this.spritesprite = spritesprite;
		this.initialize();
	}

	var s = Swirl.prototype = {
			sprite:null,
			vx:null,
			vy:null,
			active:null,
			duration:null,
			speed:null,
			width:null,
			height:null,
			currentLevel:null,
			data:null,
			maxValue:null,
			minValue:null,
			ss:null,
			resume:null,
			hitSound:null,

			initialize: function() {
				this.speed = 25;
				this.maxValue = 1000;
				this.minValue = 500;
				this.vx = this.vy = 0;
				this.duration = 1000;
				this.active = true;
				this.resume = true;

				this.sprite = new BitmapAnimation(this.spritesprite);
				this.sprite.gotoAndPlay("BossProjectile");

				this.sprite.visible = false;
				this.sprite.regX = 64>>1;
				this.sprite.regY = 88>>1;

				this.width = 64;
				this.height = 88;

			},

			hit: function () {
				this.active = false;
				if (this.hitSound == null) {
					this.hitSound = SoundJS.play("swirlHit");
				}
			},

			stop: function () {
				this.resume = false;
				this.duration = -1
				this.active = false;
			},

			start: function () {
				this.resume = true;
				this.active = true;
				var scale = Math.max(this.minValue,this.maxValue - this.currentLevel);
				var offset = Math.max(0,this.minValue - this.currentLevel);
				this.duration = 1 + offset + Math.random() * scale | 0;
			},

			resetDuration: function () {
				this.maxValue = 1000;
				this.minValue = 500;
			},

			tick: function () {
				if (!this.resume) { return; }
				if (--this.duration == 0) {
					this.active = true;
					var scale = Math.max(this.minValue,this.maxValue - this.currentLevel);
					var offset = Math.max(0,this.minValue - this.currentLevel);
					this.duration = 1 + offset + Math.random() * scale | 0;

				} else {
					this.active = false;
					this.hitSound && this.hitSound.stop();
					this.hitSound = null;
				}
			}
		}

	scope.currentGame.Swirl = Swirl;

}(window.Atari));