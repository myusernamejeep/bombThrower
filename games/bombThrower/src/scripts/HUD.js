(function(scope){

    var HUD = function(game, gameInfo){
        this.initialize(game, gameInfo);
    };

    Assets = scope.Assets;

    var p = HUD.prototype;
    p.stage;
    p.game;

    p.livesText;
	p.livesLabel;
	p.gnomeSprite;

    p.scoreLabel;
    p.scoreText;
	p.scoreManager;

    p.levelLabel;
    p.levelText;

    p.padding;
    p.labelSize;
    p.textSize;

    p.display;

    p.initialize = function(game, gameInfo){
        this.game = game;
        this.stage = game.stage;

        this.display = new Container();
        this.stage.addChild(this.display);

        this.labelSize = 14;
        this.textSize = 40;
        this.padding = 10;

        this.scoreLabel = this.createTextField("SCORE", this.labelSize, this.padding + 1, 45 + this.labelSize/2, "#51c4fc");
        this.scoreText = this.createTextField("0", this.textSize, this.padding, 15 + this.textSize/2);
	    this.scoreManager = new GameLibs.ScoreManager(this.scoreText);

        this.levelLabel = this.createTextField("LEVEL", this.labelSize, gameInfo.width/2-20, 45 + this.labelSize/2, "#51c4fc");
        this.levelText = this.createTextField("1-1", this.textSize, gameInfo.width/2-25, 15 + this.textSize/2);

        this.gnomeSprite = new Bitmap(game.assets[Assets.HUD_GNOME]);
	    this.gnomeSprite.x = gameInfo.width - 100;
	    this.gnomeSprite.y = 5;
        this.display.addChild(this.gnomeSprite);

	    this.livesLabel = this.createTextField("LIVES", this.labelSize, gameInfo.width-70, 45 + this.labelSize/2, "#51c4fc");
        this.livesText = this.createTextField("x3", this.textSize, gameInfo.width-70, 15 + this.textSize/2);
    };

    p.setLives = function(value){
        if(this.currentLives == value){ return; }
        this.currentLives = value;
	    this.livesText.text = "x" + value;
    };

    p.setScore = function(value){
	    this.scoreManager.setScore(value)
    };

	p.setLevel = function(value){
        this.levelText.text = value;
    };

    p.createTextField = function(text, fontSize, x, y, color){
	    if(color == null){ color = "#ffffff"; }
        var tf = new Text(text, fontSize + "px " + Atari.Fonts.DEMI, color);
	    tf.textBaseline = "alphabetic";
        tf.x = x || 0;
        tf.y = y || 0;
        this.display.addChild(tf);
        return tf;
    };

    scope.HUD = HUD;
}(Atari.currentGame));