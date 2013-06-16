(function(scope) {

    function fishCatcher() {}

	
	var ns = scope;
	var game = ns.game;
	
	var s = fishCatcher;
	fishCatcher.prototype = {
 
	    // Passed in via initialize
	    stage: null,
	    assets: null,
	    gameInfo: null,
		
	    scoreText: null,        // Text fields for score and time
	    timeText: null,
	    itemDelay: 5,           // Time between items (in ticks)
	    numTicks: 0,            // Overall ticks elapsed in-game
	    timeRemaining:s.GAME_TIME, // Remaining game time in milliseconds
	    startTime: 0,           // Time that the game started
	    scoreManager: null,     // Tracks the score
 
	    initialize: function(assets, stage, gameInfo) {
		    this.assets = assets;
		    this.stage = stage;
		    this.gameInfo = gameInfo;
			this.height = gameInfo.height;
			this.width = gameInfo.width;
	 
			ns.game.startup(assets, stage, gameInfo);
		},
		startGame: function() {
			// When touch-enabled, add the touch throttle.
		    if (this.gameInfo.touchEnabled) {
			    this.throttle = new GameLibs.Throttle(new createjs.Rectangle(0,0,this.gameInfo.width,this.gameInfo.height),
					    GameLibs.Throttle.HORIZONTAL,
			            {autoHide:false});
			    this.throttle.setPosition(this.gameInfo.width>>1, this.gameInfo.height-60);
			    this.stage.addChild(this.throttle.sprite);
 
		    }
		},
		tick: function(tickFactor) { 
		    
		    // Increment the tick and decrement time remaining
		    this.numTicks += tickFactor;
		    this.timeRemaining = s.GAME_TIME - (new Date().getTime() - this.startTime);

		    // refresh the timer
		    this.updateTime();
			//this.enterFrameHandler(tickFactor);
		    // Occasionally spawn a new ball
		    if (this.timeRemaining > 0 && this.numTicks > this.lastItem + this.itemDelay) {
			    this.lastItem = this.numTicks;
			    //this.spawnItem();
		    }
			this.stage.update();
  	    },

	    updateTime: function() {
			if(!this.timeText)
				return ;
 		    if (this.timeRemaining < 0) {
			    this.timeText.text = "00:00:00";
			    return;
		    }
		    var seconds = "" + (this.timeRemaining / 1000 >> 0);
		    while (seconds.length < 2) { seconds = "0" + seconds; }
		    var ms = ""+((this.timeRemaining - seconds * 1000) / 10 | 0);
		    while (ms.length < 2) { ms = "0" + ms; }
		    this.timeText.text = "00:" + seconds + ":" + ms;
	    },
		 
	    gameOver: function() {
		    // We could do something fancy here...
			this.onGameOver();
	    },

	    pause: function(paused) {

	    },

	    getScore: function() {
		    return new GameLibs.GameDetails(this.scoreManager.score);
	    },
		
		restart: function() {
		    this.scoreManager.setScore(0);
		    this.startLevel();
	    },

	    continueGame: function(keepPoints) {
		    if (!this.keepPoints) {
			    this.scoreManager.setScore(0);
		    }
			this.startLevel();
	    },
		
		destroy : function(){

		},
		
		/*********************************************************************
		 * Framework Callbacks
		 **********************************************************************/
		onLevelComplete : null,
		onGameComplete : null,
		onGameOver : null,
		onGameError : null,

    }

    scope.fishCatcher = fishCatcher;

}(window.Atari.currentGame))