(function(scope) {

    function fishCatcher() {}

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
			
		
			var ns = Q.use("fish");
			ns.game.load();
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