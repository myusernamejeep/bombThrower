(function(scope) {

	function Missile(spritesheet) {
		this.spritesheet = spritesheet;
		this.initialize();
	}
	var p = Missile.prototype = {
		sprite:null,
		spritesheet:null,

		initialize: function() {
			this.hitCount = 5;
			this.speed = 0;
			this.vx = this.vy = 0;
			this.sprite = new BitmapAnimation(this.spritesheet);
			this.sprite.gotoAndPlay("ZorlonProjectile");
			this.spritesheet._data["ZorlonProjectile"].next = "ZorlonProjectile";

			this.width = this.sprite.width = 20;
			this.height = this.sprite.height = 20;
		}
	}

	scope.currentGame.Missile = Missile;

}(window.Atari));