(function(scope) {

	function Missile() {
		//this.spritesheet = spritesheet;
		this.initialize();
	}
	var p = Missile.prototype = {
		sprite:null,
		spritesheet:null,

		initialize: function() {
			this.hitCount = 5;
			this.speed = 0;
			this.vx = this.vy = 0;
			this.spritesheet_weapon  = new GameLibs.SpriteSheetWrapper(scope.ImageManager.weapon);
			this.sprite = new createjs.BitmapAnimation(this.spritesheet_weapon);
			this.sprite.gotoAndPlay("nuclear_missile");
			this.spritesheet_weapon._data["nuclear_missile"].next = "nuclear_missile";

			this.width = this.sprite.width = 114;
			this.height = this.sprite.height = 106;
		}
	}

	scope.Missile = Missile;

}(window.Atari.currentGame));