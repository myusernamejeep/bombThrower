(function(scope) {

	function EnergyField(spritesheet, speed, wabble, front) {
		this.spritesheet = spritesheet;
		this.speed = speed;
		this.front = front;
		this.wabble = wabble || false;
		this.initialize();
	}

	EnergyField.prototype = {
		sprite:null,
		x:null,
		y:null,
		width:null,
		height:null,
		index:null,
		slice:null,
		total:null,
		spritesheet:null,
		wabble:null,
		angle:null,
		container:null,
		containerHeight:null,
		speed:null,
		len:null,
		front:null,

		initialize: function() {
			this.total = 622;
			this.len = this.speed;
			this.containerHeight = 0;
			this.container = new Container();
			this.slice = Math.ceil(this.total/this.len);
			this.angle = 0;

			this.sprite = new Container();
			this.container = new Container();

			for(var i = 0;i<(this.len+1);i++) {
				var s = new BitmapAnimation(this.spritesheet);
				if (this.front) {
					s.gotoAndStop("WaterfallFrontTile");
				} else {
					s.gotoAndStop("WaterfallTile");
				}

				s.y = 208*i;
				this.containerHeight += 208;
				this.container.addChild(s);
			}

			this.sprite.addChild(this.container);
			this.width = 267;
			this.height = 1244;
		},

		tick: function () {
			if (this.wabble) {
				this.sprite.x = 80 + Math.sin(this.angle) * 40;
				this.angle += 0.03;
			}
			this.container.y = (this.container.y-this.slice) % (this.total-this.containerHeight);
		}
	}

	scope.currentGame.EnergyField = EnergyField;

}(window.Atari));