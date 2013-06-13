(function(scope) {

	function Energy(spritesheet) {
		this.spritesheet = spritesheet;
		this.initialize();
	}

	var s = Energy;
	s.TIMER = 300;

	var p = Energy.prototype = {
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
		images:null,
		ss:null,
		spritesheet:null,

		initialize: function() {
			this.hitCount = 5;
			this.speed = 0;
			this.isHit = true;
			this.index = 0;
			this.vx = this.vy = 0;
			this.numTicks = 0;

			this.sprite = new BitmapAnimation(this.spritesheet);
			this.sprite.gotoAndPlay("Energy");
			this.spritesheet._data["Energy"].next = "Energy";

			this.sprite.regX = 32>>1;
			this.sprite.regY = 36>>1;
			this.width = this.sprite.width = 35;
			this.height = this.sprite.height = 35;
		},

		getHit: function () { return this.isHit; },
		setHit: function (value) {
			this.isHit = value;
			this.sprite.visible = this.isHit;

			if (!this.sprite.visible) {
				this.sprite.scaleX = this.sprite.scaleY = 0;
			}
		},

		tick: function () {
			if (this.sprite.visible) { return; }
			this.numTicks++;
			if (this.numTicks > s.TIMER) {
				this.isHit = true;
				this.sprite.visible = true;
				this.numTicks = 0;
				var scale = 1;
				Tween.get(this.sprite, {override:true}).to({scaleX:scale, scaleY:scale}, 550, Ease.quadOut);

			}
		}

	}

	scope.currentGame.Energy = Energy;

}(window.Atari));