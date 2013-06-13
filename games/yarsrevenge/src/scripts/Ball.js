(function(scope) {

	function Ball(radius, color) {
		this.radius = radius;
		this.color = color;
		this.initialize();
	}

	var s = Ball;
	s.TIMER = 300;

	var p = Ball.prototype = {
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

		initialize: function() {
			this.hitCount = 5;
			this.speed = 0;
			this.isHit = true;
			this.index = 0;
			this.vx = this.vy = 0;
			this.numTicks = 0;

			this.sprite = new Shape();
			var g = this.sprite.graphics;
			g.setStrokeStyle(1);
			g.beginFill(this.color);
			g.drawCircle(0, 0, this.radius);
			g.endFill();

			this.width = this.sprite.width = this.radius;
			this.height = this.sprite.height = this.radius;
		},

		getHit: function () { return this.isHit; },
		setHit: function (value) {
			this.isHit = value;
			this.sprite.visible = this.isHit;

			if (!this.sprite.visible) {
				this.sprite.scaleX = this.sprite.scaleY = 0;
			}
		},

		resetEgg: function () {
			this.sprite.visible = true;
			Tween.get(this.sprite, {override:true}).to({scaleX:scale, scaleY:scale}, 550, Ease.quadOut);
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

	scope.currentGame.Ball = Ball;

}(window.Atari));