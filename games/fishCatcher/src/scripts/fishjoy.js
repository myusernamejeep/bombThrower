(function(scope) {
 
	var ns = scope;
 
	var game = ns.game = {	
		container: null,
		width: 480,
		height: 320,
		fps: 60,
		frames: 0,
		params: null,
 		
		fireInterval: 30,
		fireCount: 0
	};
	/*
	game.load = function(assets, stage, gameInfo){
 
		this.fireInterval = this.fps*0.5;
		this.width = gameInfo.width ;
		this.height = gameInfo.height ;
		this.stage = stage ;
		this.assets = assets ;
		
		this.container = new createjs.DOMElement("container");
		this.container.htmlElement.style.overflow = "hidden";
		this.container.htmlElement.style.width = this.width + "px";
		this.container.htmlElement.style.height = this.height + "px";
		this.screenWidth = window.innerWidth;
		this.screenHeight = window.innerHeight;
		
		//load info
		var loaderDiv = $("<div/>", {
			text: "Loading ..." ,
			id: "loader",
			position: "absolute",
			zIndex: 100,
			textAlign: 'center',
			width: this.width + "px",
			left: "0px",
			top: (this.height >> 1) + "px",
			textAlign: "center",
			color: "#fff",
			font: 'bold 64px white',
			textShadow: "0 5px 5px #111"
		});
		
		//console.log(this.container.htmlElement);
		$("#middle").append(loaderDiv);
		this.loader = loaderDiv;
		
		//hide nav bar
		this.hideNavBar();
		//if(Q.supportOrientation)
		//{
			window.onorientationchange = function(e)
			{
				game.hideNavBar();
			   if(game.stage) game.stage.updatePosition();
			};
		//}
		
		//start load image
		var imgLoader = new Q.ImageLoader();
		imgLoader.addEventListener("loaded", Q.delegate(this.onLoadLoaded, this));
		imgLoader.addEventListener("complete", Q.delegate(this.onLoadComplete, this));
		imgLoader.load(ns.R.sources);
	};

	game.onLoadLoaded = function(e)
	{
		var content = "Loading ... (" + Math.round(e.target.getLoadedSize()/e.target.getTotalSize()*100) + "%)";
		this.loader.innerHTML = content;
	};

	game.onLoadComplete = function(e)
	{
		e.target.removeAllEventListeners();
		this.init(e.images);
	};
	*/
	game.init = function(images)
	{
		ns.R.init(images);
		this.startup();
	};

	game.startup = function(assets, stage, gameInfo){
 
		this.fireInterval = this.fps*0.5;
		this.width = gameInfo.width ;
		this.height = gameInfo.height ;
		this.stage = stage ;
		this.assets = assets ;
		this.gameInfo = gameInfo ;
		console.debug(this.assets);
		
		ns.R.init(this.assets);
		//this.spritesheet = new GameLibs.SpriteSheetWrapper(this.assets.TextureSheet);
		// setup
		this.stage.enableMouseOver();
		this.initUI();
		this.initPlayer();
		
		//this.testFish();
		//this.testFishDirection();
		//this.testFishALL();
		
		this.fishManager = new ns.FishManager(this.fishContainer);
		this.fishManager.makeFish();
		//console.debug(this.fishContainer);
		// Add a HUD background
		var hud = new createjs.Shape(new createjs.Graphics().beginFill("rgba(0,0,0,0.4)").drawRect(0,0,this.width,55));
		this.stage.addChild(hud);
		
		createjs.Ticker.setFPS(60);
		createjs.Ticker.addListener(this.stage);
		createjs.Ticker.addEventListener("tick", Atari.proxy(this.tick, this));
 
		this.bgAudio = new Audio("/audios/bg.mp3", true, true, true);
		
		this.startGame();
	};
	
	game.handleShoot =  function () {
 		var self = this;
		if( game.fireCount >= game.fireInterval ) { 
			game.fireCount = 0;
			//console.log("handleShoot : " , self.stageX, self.stageY ); // always in bounds
			game.player.fire({ x: self.stageX, y: self.stageY });
			game.bgAudio.play();
		}
	};
	
	game.handleKeyBoardButton =  function (key) {
		if(key == GameLibs.GamePad.BUTTON_1 ){
			if (!this.isInsideField) {
				if (this.shootAllowed) {
					this.shootAllowed = false;
					//Tween.get(this, {override:false}).wait(250).call(this.fireDelay, null, this);
				}
			}
		}
		if (key == GameLibs.GamePad.BUTTON_3 || key == GameLibs.GamePad.BUTTON_2){
			this.handleShoot();
		}
		if (key == GameLibs.GamePad.BUTTON_2){
			//this.yars.arm.rotation +=  5;
		}
		if (key == GameLibs.GamePad.BUTTON_4){
			//this.yars.arm.rotation -=  5;
		}

	};	
	game.initUI = function() {
 
		var spritesheet = new GameLibs.SpriteSheetWrapper(ns.R.mainbg);
		var sprite  =  new  createjs.BitmapAnimation( spritesheet );
		sprite.gotoAndPlay("default");	
		this.bg = sprite;
		
		this.fishContainer = new createjs.Container();
		this.stage.addChildAt(this.fishContainer, 1);
		
		this.bullets = [];
 
		var self = this;
		 
		this.stage.onMouseDown = function(evt) {
			console.debug("the canvas was clicked at "+evt.stageX+","+evt.stageY);
			self.clickEvent(evt);
		}
		 
		this.stage.onMouseMove = function(evt) {
			self.stageX = evt.stageX;
			self.stageY = evt.stageY;
		}
		/*this.bg.onPress = function(evt) {
			// add handlers directly to the event object:
			evt.onMouseMove = function(evt) {
				evt.target.x = evt.stageX;
				evt.target.y = evt.stageY;
			}
			console.log("onPress stageX/Y: "+evt.stageX+","+evt.stageY); // always in bounds
			
			evt.onMouseUp = function(evt) { console.log("up"); }
		}*/
		 
		var _spriteSheet = new GameLibs.SpriteSheetWrapper(this.assets.bottom);
		this.bottom =  new  createjs.BitmapAnimation( _spriteSheet );
 		this.bottom.id = "bottom";
		this.bottom.x = this.width - this.bottom.spriteSheet._frames[0].rect.width >> 1;
		this.bottom.y = this.height - this.bottom.spriteSheet._frames[0].rect.height + 2;
 		this.bottom.gotoAndPlay("bottombar");	
 		//console.debug("this.bottom " ,this.bottom);
			
		this.stage.addChild(this.bg, this.fishContainer, this.bottom);	
	};

	game.initPlayer = function()
	{
		var coin = 10000 ; //Number(this.params.coin) || 10000;
		this.player = new ns.Player({id:"quark", coin:coin, sheet: this.assets });
	};
	
	game.clickEvent = function(e) {
		console.debug(e);
		if( game.fireCount >= game.fireInterval )
		{
			game.fireCount = 0;
			game.player.fire({ x: e.stageX, y: e.stageY });
			//load background audio for ios devices.
			game.bgAudio.play();
			/*if(game.bgAudio && !game.bgAudio.playing() && !game.bgAudio.loading)
			{
				game.bgAudio.loading = true;
				game.bgAudio.load();
			} else if (game.bgAudio && !game.bgAudio.playing())
			{
				game.bgAudio._element.play();
			}*/
		}
	};
	// Start level resets everything.
	game.startLevel = function() { 
		this.timeRemaining = game.GAME_TIME;
		this.startTime = new Date().getTime();
		this.hits = 0;
		this.ballText.text = "Hits: " + this.hits;
	};

	game.startGame = function() {
		
		// When touch-enabled, add the touch throttle.
		/*
		if (this.gameInfo.touchEnabled) {
			this.throttle = new GameLibs.Throttle(new createjs.Rectangle(0,0,this.gameInfo.width,this.gameInfo.height),
					GameLibs.Throttle.HORIZONTAL,
					{autoHide:false});
			this.throttle.setPosition(this.gameInfo.width>>1, this.gameInfo.height-60);
			this.stage.addChild(this.throttle.sprite);

		}
		
		if (this.gameInfo.touchEnabled) {

			// Create a joystick. There are lots of awesome
			// configurations, but this is all you need to get
			// started. Check out the docs for options!
			var joystick = new GameLibs.Joystick(stage);
			joystick.setPosition(25, 25);
			stage.addChild(joystick);
		}*/
		/*
		this.gameInfo.touchEnabled = true;
		if (this.gameInfo.touchEnabled) {
			this.spritesheet = new GameLibs.SpriteSheetWrapper(this.assets.YarsAssets_All );
			 
			this.moveJoyStick = new GameLibs.Joystick(null, {
				controlDirection: true,
				autoHide: false,
				radius: 20,
				pullRadius: 50
			}, this.spritesheet);
			this.moveJoyStick.setPosition(100, 550);
			this.buttonOverlay = new Shape();
			this.shootBtn = new GameLibs.ArcadeButton(GameLibs.GamePad.BUTTON_3, null, this.spritesheet, "shoot", {hoverAlpha:1, disabledAlpha:0.5, alpha:1});
			this.shootBtn.setDisabled(true);
			this.shootBtn.setPosition(925, 550);
			this.stage.addChild(this.moveJoyStick.sprite, this.shootBtn.sprite);

		} 
		GameLibs.GamePad.player.onButtonDown = Atari.proxy(this.handleKeyBoardButton, this);	
		*/
		// Create the on-screen text
		this.scoreText = new createjs.Text("Score: 0", "20px Arial", "#ffffff");
		this.scoreText.x = 20
		this.scoreText.y = 15;
		this.scoreManager = new GameLibs.ScoreManager(this.scoreText);
		this.scoreManager.prefix = "Score: ";
		
		this.timeText = new createjs.Text("1:00:00", "40px Arial", "#ffffff");
		this.timeText.textAlign = "center";
		this.timeText.y = 5;
		this.timeText.x = this.gameInfo.width >> 1;

		this.ballText = new createjs.Text("Hits: 0", "20px Arial", "#ffffff");
		this.ballText.y = 15;
		this.ballText.textAlign = "right";
		this.ballText.x = this.gameInfo.width - 20;

		this.stage.addChild(this.scoreText, this.timeText, this.ballText);

		// Create the intro text
		this.titleText = new createjs.Text("Catch many fish as you can!", "40px Arial", "#ffffff");
		this.titleText.x = -1500;
		this.titleText.y = 150;
		this.titleText.alpha = 0;
		this.titleText.textAlign = "center";
		this.stage.addChild(this.titleText);

		// Tween in the intro text, then tween out.
		createjs.Tween.get(this.titleText)
				.wait(1000)
				.to({x:this.gameInfo.width>>1, alpha:1},400,createjs.Ease.backOut)
				.wait(1000)
				.to({x:1500, alpha:0}, 400, Ease.backIn)
				.call(this.startLevel, null, this);
				
		this.shootTimer = setInterval( Atari.proxy(this.handleShoot, this) , 3000); 
	};
	 
	game.updateTime = function() {
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
	};
	 
	game.gameOver = function() {
		// We could do something fancy here...
		this.onGameOver();
	};
	
	game.tick = function(tickFactor)
	{
		this.frames++;
		this.fireCount++;
		if(this.fishManager){
			this.fishManager.update();
		}
		for(var i = 0, len = this.bullets.length; i < len; i++){
			var _bullet = this.bullets[i];
			if(_bullet)
				_bullet.update();
			else{
				this.bullets.splice(i, 1);		
			}
		}
		this.numTicks += tickFactor;
		this.timeRemaining = game.GAME_TIME - (new Date().getTime() - this.startTime);

		// refresh the timer
		this.updateTime();
  		if (this.timeRemaining > 0 && this.numTicks > this.lastItem + this.itemDelay) {
			this.lastItem = this.numTicks;
 		}
 		this.showFPS();
		this.stage.update();
	};
	
	game.pause= function(paused) {

	};

	game.getScore = function() {
		return new GameLibs.GameDetails(this.scoreManager.score);
	};

	game.restart = function() {
		this.scoreManager.setScore(0);
		this.startLevel();
	};

	game.continueGame = function(keepPoints) {
		if (!this.keepPoints) {
			this.scoreManager.setScore(0);
		}
		this.startLevel();
	};
	
	game.destroy = function(){

	};
	
	/*********************************************************************
	 * Framework Callbacks
	 **********************************************************************/
	game.onLevelComplete = null;
	game.onGameComplete = null;
	game.onGameOver = null;
	game.onGameError = null;

	game.testFish = function()
	{
		var num = this.params.num || 500, len = ns.R.fishTypes.length;
		for(var i = 0; i < num; i++)
		{
			var chance = Math.random() * (len - 1) >> 0;
			var index = Math.random() * chance + 1 >> 0;
			var type = ns.R.fishTypes[index];
			
			var fish = new ns.Fish(type);
			fish.x = Math.random()*this.width >> 0;
			fish.y = Math.random()*this.height >> 0;
			fish.moving = true;
			fish.rotation = Math.random() * 360 >> 0;
			fish.init();
			this.fishContainer.addChild(fish);
		}
	};

	game.testFishDirection = function()
	{
		var dirs = [0, 45, 90, 135, 180, 225, 270, 315];
		
		for(var i = 0; i < 8; i++)
		{
			var fish = new ns.Fish(ns.R.fishTypes[1]);
			fish.x = this.width >> 1;
			fish.y = this.height >> 1;
			fish.speed = 0.5;
			fish.setDirection(dirs[i]);
			fish.moving = true;
			this.stage.addChild(fish);
		}
	};

	game.testFishALL = function()
	{
		var sx = 100, sy = 50, y = 0, len = ns.R.fishTypes.length;
		for(var i = 0; i < len - 1; i++)
		{
			var type = ns.R.fishTypes[i+1];
			var fish = new ns.Fish(type);	
			if(i == 9) fish.x = sx;
			else fish.x = sx + Math.floor(i/5)*200;
			if(i == 9) y = sy + 320;
			else if(i%5 == 0) y = sy;
			fish.y = y + (i%5) * 20;
			y += fish.height;
			fish.update = function(){ };
			this.stage.addChild(fish);
		}
	};

	game.showFPS = function()
	{
		var fpsContainer = new createjs.DOMElement("fps");
		if(fpsContainer)
		{
 			fpsContainer.htmlElement.innerHTML = "FPS:" + Ticker.getMeasuredFPS(); 
		}
	};

	game.hideNavBar = function()
	{
		window.scrollTo(0, 1);
	};


	scope.game = game;

}(window.Atari.currentGame))