(function(scope) {

	function Blast(spritesheet) {
		this.spritesheet = spritesheet;
		this.initialize();
	}

	var s = Blast;
	s.TIMER = 300;

	var p =Blast.prototype = {
		sprite:null,
		data:null,
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
		spritesheet:null,


		initialize: function() {
			this.hitCount = 5;
			this.speed = 0;
			this.isHit = true;
			this.index = 0;
			this.vx = this.vy = 0;
			this.numTicks = 0;

			this.sprite = new BitmapAnimation(this.spritesheet);
			this.sprite.gotoAndPlay("YarProjectile");
			this.spritesheet._data["YarProjectile"].next = "YarProjectile";

			this.width = this.sprite.width = 34;
			this.height = this.sprite.height = 21;
		},

		getHit: function () { return this.isHit; },
		setHit: function (value) {
			this.isHit = value;
			this.sprite.visible = this.isHit;

			if (!this.sprite.visible) {
				this.sprite.scaleX = this.sprite.scaleY = 0;
			}
		}
	}

	scope.currentGame.Blast = Blast;

}(window.Atari));