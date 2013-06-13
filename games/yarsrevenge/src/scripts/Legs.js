(function(scope) {

	function Legs(spritesheet) {
		this.spritesheet = spritesheet;
		this.initialize();
	}

	var p = Legs.prototype = {
		sprite:null,
		circles:null,
		numNodes:null,
		offset:null,
		space:null,
		friction:null,
		range:null,
		freq:null,
		speed:null,
		count:null,
		spritesheet:null,

		initialize: function() {
			this.circles = [];
			this.numNodes = 15;
			this.count = 0;
			this.offset = this.getRange(3,4);
			this.space = this.getRange(6,8);
			this.speed = 0.09 + (Math.random() * 10) / 50;
			this.friction = 0.9 + (Math.random() * 10) / 100;
			this.range = this.getRange(50, 66);
			this.freq = 0.1 + (Math.random() * 10) / 250;
			this.sprite = new Container();
			this.draw();
		},

		getRange: function (min, max) {
			return Math.random()*(max - min) + min;
		},

		draw: function () {
			var l = this.numNodes;
			for (var i=0;i< l;i++) {
				var s = new BitmapAnimation(this.spritesheet);
				s.gotoAndStop("Tentacle");

				s.scaleX = s.scaleY = (this.numNodes - i)  /  (this.numNodes);
				this.circles.push(s);
				this.sprite.addChild(s);
			}
		},

		tick: function () {
			//if (!this.circles.length) { return;}
			this.circles[0].x = this.offset * Math.cos(Math.PI);
			this.circles[0].y = this.offset * Math.sin(Math.PI);
			this.count += this.freq;
			var posY = (this.range * Math.sin(this.count)) + 180;
			var angle = (posY) * Math.PI/180;
			this.circles[1].x  = -this.offset * Math.cos(angle);
			this.circles[1].y = -this.offset * Math.sin(angle);
			var dx;
			var dy;
			var distance;
			for (var i = 2; i < this.numNodes; i++) {
				dx = this.circles[i].x - this.circles[i - 2].x;
				dy = this.circles[i].y - this.circles[i - 2].y;
				var a = Math.atan2(dy, dx)*180/Math.PI;
				this.circles[i].rotation = a;
				distance = Math.sqrt(dx * dx + dy * dy);
				this.circles[i].x = this.circles[i - 1].x + dx * this.space / distance;
				this.circles[i].y = this.circles[i - 1].y + dy * this.space / distance;
			}
		}

	}

	scope.currentGame.Legs = Legs;

}(window.Atari));