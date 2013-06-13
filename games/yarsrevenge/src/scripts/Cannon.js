(function(scope) {

	function Cannon(spritesheet) {
		this.spritesheet = spritesheet;
		this.initialize();
	}

	var s = Cannon
	s.IDLE = "ZorlonIdle",
	s.SHOOT = "ZorlonFire",
	s.READY = "ZorlonReady",
	s.PINK = "#47cc5a",
	s.BLUE = "#52dfd4"

	var p = Cannon.prototype = {
		sprite:null,
		data:null,
		bar:null,
		total:null,
		hasFired:null,
		fullCharge:null,
		cannon:null,
		spritesheet:null,
		readyCannonSound:null,
		glowImage:null,

		initialize: function() {
			this.total = 1;
			this.currentLevel = 0;
			this.fullCharge = false;
			this.hasFired = false;

			this.sprite = new Container();
			this.bar = new Shape();
			var g = this.bar.graphics;
			g.setStrokeStyle(1);
			g.beginFill(s.PINK);
			g.drawRect(0, 0, 10, 75);
			g.endFill();
			this.bar.scaleY = 0;

			this.cannon = new BitmapAnimation(this.spritesheet);
			this.cannon.onAnimationEnd = Atari.proxy(this.handleShootComplete, this, this.cannon);
			this.cannon.gotoAndStop("ZorlonIdle");

			this.width = this.sprite.width = 98;
			this.height = this.sprite.height = 114;

			this.glowImage = new BitmapAnimation(this.spritesheet);
			this.glowImage.gotoAndStop(s.READY);
			this.glowImage.alpha = 0;

			this.bar.rotation = 180;
			this.bar.x = 12;
			this.bar.y = 95;
			this.sprite.addChild(this.bar);
			this.sprite.addChild(this.cannon);
			this.sprite.addChild(this.glowImage);

		},

		handleShootComplete: function () {
			this.cannon.gotoAndPlay(s.IDLE);
		},

		changeBarColor: function(color) {
			var g = this.bar.graphics;
			g.clear();
			g.setStrokeStyle(1);
			g.beginFill(color);
			g.drawRect(0, 0, 10, 75);
			g.endFill();
		},

		shootCannon: function () {
			this.cannon.gotoAndPlay(s.SHOOT);
			this.glowImage.alpha = 0;
			Tween.removeTweens(this.glowImage);
			this.changeBarColor(s.PINK);
			this.readyCannonSound && this.readyCannonSound.stop();
			this.readyCannonSound = null;
		},

		chargeCannon: function (value) {
			this.currentLevel += Math.min(value, this.total);
			this.fullCharge = (this.currentLevel >= this.total) ? true : false;
			this.bar.scaleY = Math.min(this.currentLevel/this.total, 1);
			if (this.bar.scaleY == 1) {
				this.changeBarColor(s.BLUE);
				Tween.get(this.glowImage, {loop:true}).to({alpha:1}, 500).wait(500).to({alpha:0}, 500);
				if (this.readyCannonSound == null) {
					this.readyCannonSound = SoundJS.play("cannonReady");
				}
			}
		},

		reset: function() {
			this.currentLevel = 0;
			this.bar.scaleY  = 0;
			this.fullCharge = false;
			this.hasFired = false;
			this.glowImage.alpha = 0;
			//this.total = 1;
			Tween.removeTweens(this.glowImage);
			this.chargeCannon(this.currentLevel);
		}

	}

	scope.currentGame.Cannon = Cannon;

}(window.Atari));