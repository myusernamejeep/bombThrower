(function(scope) {

	function Blast(spritesheet, name) {
		this.spritesheet = spritesheet;
		this.initialize(name);
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


		initialize: function(name) {
			this.hitCount = 5;
			this.speed = 0;
			this.isHit = true;
			this.index = 0;
			this.vx = this.vy = 0;
			this.numTicks = 0;
			
			name = name || "green_bullet";
			this.spritesheet  = new GameLibs.SpriteSheetWrapper(scope.ImageManager.weapon);
			this.sprite = new createjs.BitmapAnimation(this.spritesheet);
			this.sprite.gotoAndStop(name);
 			//this.sprite = new BitmapAnimation(this.spritesheet);
			//this.sprite.gotoAndPlay(name);
			this.spritesheet._data[name].next = name;

			this.width = this.sprite.width = 33;
			this.height = this.sprite.height = 27;
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

	scope.Blast = Blast;

}(window.Atari.currentGame));