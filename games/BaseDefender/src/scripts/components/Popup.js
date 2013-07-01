(function(scope) {

	function Popup() {
		this.initialize();
	}

	var s = Popup;
	s.TIMER = 300;

	var p = Popup.prototype = {
		sprite:null,
		display:null,
		bg:null,
		width:null,
		height:null,
		duration:null,
		showing:null,

		initialize: function() {
			this.sprite = new Container();
			this.duration = 1000;
			this.bg = new Shape();
			this.showing = false;
			this.width = this.sprite.width = 300;
			this.height = this.sprite.height = 100;
			var g = this.bg.graphics;
			g.setStrokeStyle(1);
			g.beginFill("#FF0000");
			g.drawRect(0, 0, this.width, this.height);
			g.endFill();

			this.display = new Text("Level 0", "75px "+ Atari.Fonts.DEMI, "#FFFFFF");
			//this.display.textBaseline = "alphabetic";
			this.display.x = 10;
			this.bg.alpha = .5;

			this.bg.alpha = 0;
			this.visible = false;
			this.sprite.addChild(this.bg);
			this.sprite.addChild(this.display);

			this.sprite.alpha = 0;

		},

		show: function (duration) {
			if (this.showing) { return }
			this.showing = true;
			this.duration = duration;
			Tween.get(this.sprite).to({alpha:1}, this.duration).call(this.handleShowComplete, null, this)
		},

		handleShowComplete: function () {
			this.showing = false;
			Tween.get(this.sprite).to({alpha:0}, this.duration);
		},

		setText: function (value) {
			this.display.text = value;
		}
	}

	scope.currentGame.Popup = Popup;

}(window.Atari));