(function(scope) {

	function ScoreBoard(spritesheet) {
		this.score = 0;
		this.spritesheet = spritesheet;
		this.initialize();
	}

	ScoreBoard.prototype = {
		score: null,
		lives:null,
		scoreContainer:null,
		playersDisplay:null,
		scoreDisplay:null,
		sprite:null,
		image:null,
		padding:null,
		lifeContainer:null,
		count:null,
		max:null,
		spritesheet:null,

		initialize: function() {
			this.padding = 5;
			this.max = 9;
			this.lives = 3;
			this.count = this.lives;
			this.sprite = new Container();
			var bmp = new BitmapAnimation(this.spritesheet);
			bmp.gotoAndStop("UIText");
			bmp.x = 20;
			bmp.y = 23;

			this.lifeContainer = new Container();
			this.draw();

			this.scoreDisplay = new Text("0", "30px "+ Atari.Fonts.DEMI, "#FFFFFF");
			//this.scoreDisplay.textBaseline = "alphabetic";
			this.scoreDisplay.x = 20;
			this.scoreDisplay.y = 30;

			this.levelDisplay = new Text("", "30px "+ Atari.Fonts.DEMI, "#FFFFFF");
			//this.levelDisplay.textBaseline = "alphabetic";
			this.levelDisplay.x = 160;
			this.levelDisplay.y = 30;

			this.sprite.addChild(this.scoreDisplay);
			this.sprite.addChild(this.levelDisplay);
			this.sprite.addChild(bmp);
			this.sprite.addChild(this.lifeContainer);
		},

		draw: function () {
			if (this.lives < 0) { return; }
			var space = 5;
			var cols = 9;
			var offsetX = 233;
			var offsetY = 50;
			for(var i=0;i<this.lives;i++) {
				var _icon = new BitmapAnimation(this.spritesheet);
				_icon.gotoAndStop("UIYarLives");
				var _w = 35;
				var _h = 29;
				_icon.x = offsetX + (_w+space) * (i%cols);
				_icon.y = offsetY + (i/cols|0) * (_h+space);
				this.lifeContainer.addChild(_icon);
			}
		},

		addLife: function () {
			if(this.lifeContainer.getNumChildren() == this.max) { return };
			this.lifeContainer.removeAllChildren();
			this.lives = Math.min(++this.count, this.max);
			this.updateLives(this.lives);
			this.draw();
		},

		removeLife: function () {
			this.lives = Math.max(-1, --this.count);
			if (this.lives >= 0) {
				this.lifeContainer.removeChildAt(this.lives);
				this.updateLives(this.lives);
			}
		},

		resetScore: function() {
			this.updateScore(0);
		},

		resetLives: function() {
			this.lives = 3;
			this.lifeContainer.removeAllChildren();
			this.count = this.lives;
			this.draw();
		},

		updateLives: function(value) {
			var displayValue = (value >= 0) ? value : 0;
			this.lives = value;
			//this.playersDisplay.text = ''+displayValue;

		},

		updateLevels: function (value) {
			this.level = value;
			this.levelDisplay.text = '' + this.level;
		},

		saveHighScore: function() {
			scope.HighScores.saveLocalScore("yarsrevenge", this.score);
		},

		updateScore: function (value) {
			if (value < 0) { return; }
			this.score += value;
			this.scoreDisplay.text = "" + this.score;
		}
	}
	scope.currentGame.ScoreBoard = ScoreBoard;
}(window.Atari));
