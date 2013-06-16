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
		
		// Add a HUD background
		var hud = new createjs.Shape(new createjs.Graphics().beginFill("rgba(0,0,0,0.4)").drawRect(0,0,this.width,55));
		this.stage.addChild(hud);
		
		createjs.Ticker.setFPS(60);
		createjs.Ticker.addListener(this.stage);
		createjs.Ticker.addEventListener("tick", Atari.proxy(this.tick, this));
 
		this.bgAudio = new Audio("/audios/bg.mp3", true, true, true);
	};

	game.initUI = function()
	{
 		//console.debug(ns.R.mainbg, this.assets.mainbg);
		var g = new Graphics();
		g.beginBitmapFill(this.assets.mainbg , "no-repeat")
		g.drawRect(0, 0, this.width, this.height).endFill();
		this.bg = new createjs.Shape(g);
		//console.debug(this.bg);
 
		this.fishContainer = new createjs.Container();
		this.stage.addChildAt(this.fishContainer, 1);
		this.fishContainer.click = Atari.proxy(this.clickEvent, this);
		//this.fishContainer = new Q.DisplayObjectContainer({id:"fishContainer", width:this.width, height:this.height, eventChildren:false, transformEnabled:false});
		/*
		this.fishContainer.onEvent = function(e)
		{
			if(e.type == game.events[0] && game.fireCount >= game.fireInterval)
			{
				game.fireCount = 0;
				game.player.fire({ x: e.eventX, y: e.eventY });
				//load background audio for ios devices.
				if(game.bgAudio && !game.bgAudio.playing() && !game.bgAudio.loading)
				{
					game.bgAudio.loading = true;
					game.bgAudio.load();
				} else if (game.bgAudio && !game.bgAudio.playing())
				{
					game.bgAudio._element.play();
				}
			}
		};*/
 			 
		var _spriteSheet = new GameLibs.SpriteSheetWrapper(this.assets.bottom);
		this.bottom =  new  createjs.BitmapAnimation( _spriteSheet );
 		this.bottom.id = "bottom";
		this.bottom.x = this.width - this.bottom.spriteSheet._frames[0].rect.width >> 1;
		this.bottom.y = this.height - this.bottom.spriteSheet._frames[0].rect.height + 2;
 		this.bottom.gotoAndPlay("bottombar");	
 		
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
			game.player.fire({ x: e.eventX, y: e.eventY });
			//load background audio for ios devices.
			if(game.bgAudio && !game.bgAudio.playing() && !game.bgAudio.loading)
			{
				game.bgAudio.loading = true;
				game.bgAudio.load();
			} else if (game.bgAudio && !game.bgAudio.playing())
			{
				game.bgAudio._element.play();
			}
		}
	};
	
	game.tick = function(event)
	{
		this.frames++;
		this.fireCount++;
		if(this.fishManager)
			this.fishManager.update();
		
		//this.fireEvent(event);
		this.showFPS();
		this.stage.update();
	};

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