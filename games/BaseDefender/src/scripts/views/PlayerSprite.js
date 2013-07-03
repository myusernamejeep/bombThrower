(function(scope) {
 
	(function(scope) {
		var playerAnimData = {
			images: ["assets/runningboy.png"],
			frames: {width:50, height:50},
			animations: {run:[0,4], jump:[5,8,"run"]}
		};
		scope.playerAnimSpriteSheet = new SpriteSheet(playerAnimData);
	}(window.Atari.currentGame));
	
	var ns = scope; 
	var game = ns.game;
	
	var PlayerSprite = function() {
		this.initialize();
	}
	
	PlayerSprite._SpriteSheet = new createjs.SpriteSheet(playerAnimSpriteSheet);
	var PlayerSprite_p = PlayerSprite.prototype = new createjs.BitmapAnimation();
	PlayerSprite_p.BitmapAnimation_initialize = PlayerSprite_p.initialize;
	PlayerSprite_p.initialize = function() {
		this.BitmapAnimation_initialize(PlayerSprite._SpriteSheet);
		this.paused = false;
	}
	PlayerSprite_p.run = function(){
		this.gotoAndPlay("run");
	}
	/*
	var player = new PlayerSprite();
	player.run();
	*/
	scope.PlayerSprite = PlayerSprite;

}(window.Atari.currentGame))