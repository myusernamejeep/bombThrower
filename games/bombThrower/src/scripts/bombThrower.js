(function(scope) {

    function bombThrower() {}

	var s = bombThrower;
	s.PADDLE_SPEED = 25;
	s.GAME_TIME = 30 * 1000;
	window.alphaThresh = 0.75;
    bombThrower.prototype = {
 
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
		
		// from angrybirds.js
		images: null,
		canvas: null,
		context: null,
		stage: null,
		width: 0,
		height: 0,	
			
		birdContainer: null,	
		pigContainer: null,
		pathContainer: null,
		rightSling: null,
		leftSling: null,
		slingLineLeft: null,
		slingLineRight: null,
		dragBird: null,

		birds: [],
		pigs: [],
		animateTimer: null,
		
		originX: 0,
		originY: 0,
		startX: 0,
		startY: 0,
		groundY: 0,
		
		shotTarget: null,
		shotAngle: 0,
		speed: 100,
		speedFactor: 1.5,
		gravity: 10,
		shotTime: 0,
		timeFactor: 0.2,
		
		enableSound: true,
		bgSound: null,
		bgSoundURLs: ["sounds/AngryBird.mp3", "sounds/AngryBird.ogg"],
	
	    initialize: function(assets, stage, gameInfo) {
		    this.assets = assets;
		    this.stage = stage;
		    this.gameInfo = gameInfo;
			this.height = gameInfo.height;
			this.width = gameInfo.width;
			this.spritesheet = new GameLibs.SpriteSheetWrapper(this.assets.TextureSheet);
 
			this.spritesheet1 = new GameLibs.SpriteSheetWrapper(this.assets.TextureSheet1);
			this.spritesheetPongAssets = new GameLibs.SpriteSheetWrapper(this.assets.PongAssets);
 
			var g = new Graphics();
			g.beginBitmapFill(assets.ground1 , "repeat-x")
			g.drawRect(0, 0, gameInfo.width, assets.ground1.height).endFill();
 			var ground = new createjs.Shape(g);
			ground.y = gameInfo.height - assets.ground1.height;
			this.groundY = assets.ground1.height;
		    stage.addChild(ground);
			
			var sk = new Graphics();
 			sk.beginBitmapFill(assets.skin1, "repeat-x");
			sk.drawRect(0, 0, gameInfo.width, assets.skin1.height).endFill();
			var skin = new createjs.Shape(sk);
			skin.scaleY = (gameInfo.height - this.groundY) / assets.skin1.height;
			stage.addChild(skin);
	
			// grass 1
			var gr = new Graphics();
 			gr.beginBitmapFill(assets.grass, "repeat-x");
			gr.drawRect(0, 0, gameInfo.width, assets.grass.height).endFill();
			var grass = new createjs.Shape(gr);
 			grass.y = gameInfo.height - this.groundY - assets.grass.height;
			grass.alpha = 0.8;
			stage.addChild(grass);
	
			// grass 2
			var gr = new Graphics();
 			gr.beginBitmapFill(assets.grass2, "repeat-x");
			gr.drawRect(0, 0, gameInfo.width, assets.grass2.height).endFill();
			var grass2 = new createjs.Shape(gr);
			grass2.y = gameInfo.height - this.groundY - assets.grass2.height;
			grass2.alpha = 1.0;
			stage.addChild(grass2);	

			// grass 3
			var gr = new Graphics();
 			gr.beginBitmapFill(assets.grass3, "repeat-x");
			gr.drawRect(0, 0, gameInfo.width, assets.grass3.height).endFill();
			var grass3 = new createjs.Shape(gr);
			grass3.y = gameInfo.height - this.groundY - assets.grass3.height + 6;
			grass3.alpha = 1.0;
			stage.addChild(grass3);	
 
		    this.ballContainer = new createjs.Container();
		    stage.addChild(this.ballContainer);

		    // Add a HUD background
		    var hud = new createjs.Shape(new createjs.Graphics().beginFill("rgba(0,0,0,0.4)").drawRect(0,0,this.gameInfo.width,55));
		    this.stage.addChild(hud);
			
			createjs.Ticker.setFPS(30);
			createjs.Ticker.addListener(stage);
			
			this.createUnits();
	    },
		
		createUnits : function(){
  		    this.rightSling =  new  BitmapAnimation( this.spritesheet );
			this.rightSling.gotoAndPlay("rightSling");
			this.rightSling.x = 200;
			this.rightSling.y = this.height - this.groundY - 158;
			this.rightSling.scaleX = this.rightSling.scaleY = 0.80;
			this.stage.addChild(this.rightSling );
			
			this.leftSling  =  new  createjs.BitmapAnimation( this.spritesheet );
			this.leftSling.gotoAndPlay("leftSling");
 			this.leftSling.x = this.rightSling.x - 23;
			this.leftSling.y = this.rightSling.y - 5;
			this.leftSling.scaleX = this.leftSling.scaleY = 0.80;
			this.stage.addChild(this.leftSling);
			
			this.originX = this.rightSling.x;
			this.originY = this.rightSling.y + 20;
			
			this.pathContainer = new createjs.Container();
			this.stage.addChildAt(this.pathContainer, 5);
			
			this.birdContainer = new createjs.Container();
			this.stage.addChildAt(this.birdContainer, 6);
			
			this.pointContainer = new createjs.Container();
			this.stage.addChildAt(this.pointContainer, 8);
			
			this.pigContainer = new createjs.Container();
			this.pigContainer.mouseEnabled = false;
			this.stage.addChildAt(this.pigContainer, 7);
			
			
			this.initBirds();
			this.initPigs();
 
			var self = this;
 			this.animateTimer = setInterval( Atari.proxy(this.animate, this) , 2000);
			 
 			this.getBirdReady(0);
			this.initSound();
			//createjs.Ticker.addEventListener("tick", handleTick);
  			//createjs.Ticker.addEventListener("tick", Atari.proxy(this.enterFrameHandler, this));
			createjs.Ticker.addEventListener("tick", Atari.proxy(this.tick, this));
			//var ss = new GameLibs.SpriteSheetWrapper(this.assets.controls, "images/");

			this.hitArea = new Shape();
			this.hitAreaShape = new Shape();
			var _g = this.hitAreaShape.graphics;
			_g.setStrokeStyle(1);
			_g.beginFill("#FF0099");
			_g.drawRect(0, 0, this.width, this.height);
			_g.endFill();
			//this.hitArea.hitArea = this.hitAreaShape;
			//this.hitArea.onPress = Atari.proxy(this.mouseDownHandler, this);
			//this.stage.addChild(this.hitArea);
			/*
			if (this.gameInfo.touchEnabled) {
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

			}*/
			//GameLibs.GamePad.player.onButtonDown = Atari.proxy(this.handleKeyBoardButton, this);
  		},
		handleKeyBoardButton: function (key) {
			if(key == GameLibs.GamePad.BUTTON_1 ){
				if (!this.isInsideField) {
					if (this.shootAllowed) {
						this.shootAllowed = false;
						//Tween.get(this, {override:false}).wait(250).call(this.fireDelay, null, this);
					}
				}
			}
			if (key == GameLibs.GamePad.BUTTON_3 || key == GameLibs.GamePad.BUTTON_2){
				//this.handleShoot();
			}
			if (key == GameLibs.GamePad.BUTTON_2){
				//this.yars.arm.rotation +=  5;
			}
			if (key == GameLibs.GamePad.BUTTON_4){
				//this.yars.arm.rotation -=  5;
			}

		},
		initBirds : function(){
 			var num = 4;
			for(var i = 0; i < num; i++){
				var bird = new CurrentGame.Bird(this.spritesheet);	
				bird.id = "Bird"+i;
				bird.sprite.x += 200 - 50*i;
				bird.sprite.y += this.height - this.groundY -10;
 				this.birdContainer.addChild(bird.sprite);
				this.birds.push(bird);
			}
		},
		
		initPigs : function(){
			var num = 4;
			for(var i = 0; i < num; i++){
				var pig = new CurrentGame.Pig(this.spritesheet);	
				pig.id = "Pig"+i;
				pig.sprite.x += 600 + 100*i;
				pig.sprite.y += this.height - this.groundY - 17;
 				this.pigContainer.addChild(pig.sprite);
				this.pigs.push(pig);
			}
		},
		
		getBirdReady : function(index){
			if(index < 0 || index >= this.birds.length) return;
			var bird = this.birds[index];	
			bird.mouseEnabled = true;
			bird.sprite.ready = true;
			//bird.sprite.x = this.originX;
			//bird.sprite.y = this.originY;
			createjs.Tween.get(bird.sprite).to({x:this.originX, y:this.originY},  500); 
		
			console.log('getBirdReady', bird, index, this.originX, this.originY);
 			bird.sprite.onPress = Atari.proxy(this.mouseDownHandler, this);
			bird.sprite.onMouseUp = Atari.proxy(this.mouseMoveHandler, this);
			bird.sprite.onMouseMove = Atari.proxy(this.mouseUpHandler, this);
  		},
		
		animate : function(){ 
			for(var i = 0, len = this.birds.length; i < len; i++){
				var bird = this.birds[i];
				bird.animate();
			}

			for(var i = 0, len = this.pigs.length; i < len; i++){
				var pig = this.pigs[i];
				pig.animate();
			}
 		},
		
		initSound : function(){
			var isWebKit = (/WEBKIT/).test(window.navigator.userAgent.toUpperCase());	
			if(!isWebKit) 
			{
				this.bgSound = new Audio(this.bgSoundURLs[1], true, true);
				this.bgSound._element.addEventListener("ended", function(){this.play();}, false);
			}else 
			{
				this.bgSound = new Audio(this.bgSoundURLs[0], true, true);
			}
		},
		
		enterFrameHandler : function(e){
 			if(this.shotTarget){
 				if(this.shotTarget.y >= this.height - this.groundY - 20){			
 					if(!this.shotTarget.dead){
						//this.shotTarget.dead = true;
						this.birds.splice(0, 1);
						//this.birds.splice(this.birds.indexOf(this.shotTarget), 1);
						//console.log('this.shotTarget', this.shotTarget, this.shotTarget.self);
						console.log('this.birds', this.birds, this.birds.indexOf(this.shotTarget), this.shotTarget);
						try{
							this.shotTarget.self.die();
						}catch(e){
							console.error(e.message);
						}
						this.birdContainer.removeChild(this.shotTarget);
					}
 					this.shotTarget = null;
					this.getBirdReady(0);
					return;
				}
				
				this.shotTime += this.timeFactor;
				var x = this.speed*Math.cos(this.shotAngle)*this.shotTime + this.startX;
				var y = this.speed*Math.sin(this.shotAngle)*this.shotTime - (this.gravity*this.shotTime*this.shotTime)/2 - this.startY;

				this.shotTarget.x = x;
 				this.shotTarget.y = Math.min(-y, this.height - this.groundY - 20);
 				this.drawPath(this.shotTarget.x, this.shotTarget.y);
				if(!this.shotTarget.dead) this.CheckCollision(this.shotTarget);
			}
 		},

		drawPath : function(x, y){
 			var path = new Bitmap(this.assets["drawPath"]); 
			path  =  new  createjs.BitmapAnimation( this.spritesheet );
			path.gotoAndPlay("drawPath");
 			path.scaleX = path.scaleY = this.pathContainer.getNumChildren()%2 ? 0.12 : 0.2;
			path.x = x;
			path.y = y;
			//console.log('drawPath', x, y);
			this.pathContainer.addChild(path);
		},

		CheckCollision : function(bird){
			 
			for(var i = 0, len = this.pigs.length; i < len; i++){
				var pig = this.pigs[i];
 
				var intersection = ndgmr.checkRectCollision(bird,pig.sprite);
				//var collision = ndgmr.checkPixelCollision(bird,pig,window.alphaThresh);
				//console.log('intersection',intersection  ); //, bird.hitTest( target.globalToLocal(pig.sprite.x, pig.sprite.y) )
				 
				if( intersection ){
 
					this.pigs.splice(i, 1);
					this.birds.splice(0, 1);
					//console.debug(this.birds.indexOf(bird));
					var self = this;
					var cb = function(){
						self.shotTarget = null;
						self.getBirdReady(0);
						//createjs.Tween.get(birds[0].sprite).to({x:self.originX, y:self.originY},  500);
					}
					pig.die(cb);
					
					var self = this;
					var callback1 = function(){
 						//self.pointContainer.removeChild(p300.sprite);
					}
					var p300 = new  CurrentGame.Point(this.spritesheet1,'Floaty_s300', pig, callback1);
					this.pointContainer.addChild(p300.sprite);
			 
					bird.self.die();
					
					var callback2 = function(){
 						self.pointContainer.removeChild(p600.sprite);
					}
					var p600 = new CurrentGame.Point(this.spritesheet1,'Floaty_s600', bird, callback2);
					this.pointContainer.addChild(p600.sprite);
					
					this.birdContainer.removeChild(bird);
					return;
				}
			}
		},

		mouseDownHandler : function(e){
			var obj =  e.target;//this.stage.getObjectUnderPoint(e.mouseX, e.mouseY, true);
			//console.debug(obj, e , obj instanceof CurrentGame.Bird, obj.ready);
 			if(obj.ready){  
				this.dragBird = obj;
				//console.debug(this.dragBird);
				//console.log("pressed");
				e.onMouseMove = Atari.proxy(this.mouseMoveHandler, this);
				e.onMouseUp = Atari.proxy(this.mouseUpHandler, this);
			}
		},

		mouseMoveHandler : function(e){
			if(!this.dragBird) return;
			//console.debug('mouseMoveHandler', e);

 			var mx = e.stageX;
			var my = e.stageY;
			var dx = mx - this.originX;
			var dy = my - this.originY;
			var distance = Math.sqrt(dx*dx + dy*dy);
			if(distance > 100) return;
			
 			var angle = 180 / Math.PI * Math.atan2(dy, -dx);
			if(angle >= 80 && angle <= 115){
				if(dy > 32) my = this.originY + 32;
				this.dragBird.x = this.originX;
				this.dragBird.y = this.originY;
				this.stage.removeChild(this.slingLineLeft);
				this.stage.removeChild(this.slingLineRight);	
				this.dragBird = null;
					
				return;
			}	
			this.dragBird.x = mx;
			this.dragBird.y = my;
			//console.debug('mouseMoveHandler', distance, angle , my);

 			var bird = this.dragBird;
			if(!this.slingLineLeft){
				//var grass3 = new createjs.Shape(gr);
				this.slingLineLeft = new  createjs.Shape();
				this.slingLineRight = new  createjs.Shape();
			}else {
				this.slingLineLeft.graphics.clear();
				this.slingLineRight.graphics.clear();
			}
			
 			var w = 5;		
			if(this.originX > bird.x) var endX = bird.x+w-15;
			else endX = bird.x+w+10;
			if(this.originY > bird.y) var endY = bird.y+w-10;
			else endY = bird.y+w+10;		
			
			var g = new createjs.Graphics();
			g.beginStroke("#301708");
			g.setStrokeStyle(w);
			//g.lineStyle(w, "#301708");
			//g.beginPath();
			g.moveTo(this.originX+w-10, this.originY+w-5);
			g.lineTo(endX, endY);
			g.closePath();
			g.endFill();
			this.slingLineLeft = new  createjs.Shape(g);
				
 			var g = new createjs.Graphics();
			g.beginStroke("#301708");
			g.setStrokeStyle(w);
			//g.lineStyle(w, "#301708");
			//g.beginPath();
			g.moveTo(endX, endY);
			g.lineTo(this.originX+w+10, this.originY+w+2);
			g.closePath();
			g.endFill();
			
 			this.slingLineRight = new  createjs.Shape(g);
			
			this.stage.addChildAt(this.slingLineLeft, 7);
			this.stage.addChildAt(this.slingLineRight, 6);
		},

		mouseUpHandler : function(e){
			if(this.dragBird == null) return;
			
 			this.shotTarget = this.dragBird;
			this.dragBird = null;
			this.stage.removeChild(this.slingLineLeft);
			this.stage.removeChild(this.slingLineRight);	
			
 			this.startX = this.shotTarget.x;
			this.startY = this.shotTarget.y;

 			var dx = this.startX - this.originX;
			var dy = this.startY - this.originY;
			this.shotAngle = Math.atan2(dy, -dx);
			var distance = Math.sqrt(dx*dx + dy*dy);
			this.speed = distance*this.speedFactor;
			this.shotTime = 0;
			//console.debug('mouseUpHandler', distance, this.speed,this.shotAngle );
			this.pathContainer.removeAllChildren();
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
		    this.titleText = new createjs.Text("Kill all your opponent!", "80px Arial", "#ffffff");
		    this.titleText.x = -1500;
		    this.titleText.y = 150;
		    this.titleText.alpha = 0;
		    this.titleText.textAlign = "center";
		    this.stage.addChild(this.titleText);

		    // Tween in the intro text, then tween out.
		    createjs.Tween.get(this.titleText)
				    .wait(1000)
				    .to({x:this.gameInfo.width>>1, alpha:1},400,createjs.Ease.backOut)
				    .wait(2500)
				    .to({x:1500, alpha:0}, 400, Ease.backIn)
				    .call(this.startLevel, null, this);
					
			 
	    },

	    // Start level resets everything.
	    startLevel: function() {console.debug('startLevel' );
			this.timeRemaining = s.GAME_TIME;
		    this.startTime = new Date().getTime();
		    this.hits = 0;
		    this.ballText.text = "Hits: " + this.hits;
	    },

	    tick: function(tickFactor) { 
		    
		    // Increment the tick and decrement time remaining
		    this.numTicks += tickFactor;
		    this.timeRemaining = s.GAME_TIME - (new Date().getTime() - this.startTime);

		    // refresh the timer
		    this.updateTime();
			this.enterFrameHandler(tickFactor);
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

    scope.bombThrower = bombThrower;

}(window.Atari.currentGame))