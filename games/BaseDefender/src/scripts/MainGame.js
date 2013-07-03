Runner = {};

var imageURLs =["images/grasslands_grid_s.png", 
				"images/gatling_01.png", 
				"images/gatling_02.png", 
				"images/soldier_01.png",
				"images/font.png",
				"images/other.png"];

var bgURLs = ["sounds/grasslands.ogg",
			  "sounds/grasslands.mp3"];
var loaded = 0;

var canvas;
var context;
var stage;
var scene;
var gatling;
var scoreBar;
var offsetX = 0, offsetY = 0;

//soldier AI
var soldierStartX = 0;
var soldierStartY = 315;
var soldierInterval;
//fps
var frames = 0;
var lastTime = 0;
var fpsInterval;
//player
var player;
//weapon factory
var weaponFactory;
//enemy factory
var enemyFactory;
//control button
var controlBtn;
var fastBtn;
var selectedWeapon;
var weaponTool;
var defaultWeapons;

var bgSound;

(function(scope) {
	function MainGame() {}
 
	var s = MainGame;
	scope.GAME_TIME = 30 * 1000;
	MainGame.prototype = {

		// props
		assets: null,
		stage: null,
		gameInfo: null,
		scoreText: null,        // Text fields for score and time
	    timeText: null,
	    itemDelay: 5,           // Time between items (in ticks)
	    numTicks: 0,            // Overall ticks elapsed in-game
	    timeRemaining:scope.GAME_TIME, // Remaining game time in milliseconds
	    startTime: 0,           // Time that the game started
	    scoreManager: null,     // Tracks the score
		
		initialize: function(assets, stage, gameInfo) {
			this.assets = assets;
			this.stage = stage;
			this.gameInfo = gameInfo;
			this.stage.gameInfo = gameInfo;
			this.stage.assets = assets;
			this.height = gameInfo.height;
			this.width = gameInfo.width;
			
			this.spritesheet = new GameLibs.SpriteSheetWrapper(scope.ImageManager.weapon);
			this.levelManager = new scope.LevelManager();
			this.scoreBoardSetUp();
			var sk = new Graphics();
 			sk.beginBitmapFill(assets.grasslands, "repeat-x");
			sk.drawRect(0, 0, assets.grasslands.width, assets.grasslands.height).endFill();
			var bg = new createjs.Shape(sk);
 			stage.addChild(bg);
	 
 	 
 			console.debug(this.stage.assets,this.stage,this.gameInfo);
	 
			stage.mouseEnabled = true;
        
			createjs.Ticker.setFPS(25);
 			createjs.Ticker.addListener(stage);
			createjs.Ticker.useRAF = true;
			createjs.Ticker.addEventListener("tick", Atari.proxy(this.tick, this));
			this.fps_meter = new GameLibs.FPSMeter(this.stage);
			this.lastTick = Ticker.getTime();
			
			// Add a HUD background
		    var hud = new createjs.Shape(new createjs.Graphics().beginFill("rgba(0,0,0,0.4)").drawRect(0,0,this.gameInfo.width,55));
		    this.stage.addChild(hud);
			
 			stage.enableMouseOver(10);
			this.createGame();
 
		}, 
		
		scoreBoardSetUp: function () {
			this.scoreBoard = new scope.ScoreBoard(this.spritesheet);
			this.scoreBoard.updateLives(this.levelManager.lives);
			this.scoreBoard.updateLevels(this.levelManager.currentLevel);
			this.scoreManager = new GameLibs.ScoreManager(this.scoreBoard.scoreDisplay);
			this.scoreManager.leading = 1;
		},
		// Start level resets everything.
	    startLevel: function() {  
			console.debug('startLevel' );
			this.timeRemaining = scope.GAME_TIME;
		    this.startTime = new Date().getTime();
			this.hits = 0;
		    this.ballText.text = "Hits: " + this.hits;
			
			//this.createExtraEnemy();
			
			//var enemy = this.addDefaultEnemy();
					
		},
		
		createExtraEnemy: function() {  
		
			//this.spritesheet = new GameLibs.SpriteSheetWrapper(this.assets.monster_zombie);
			this.zombie = new scope.Zombie(this.assets.monster_zombie, "stand");
			this.zombie.x = 320;
			this.zombie.y = 350;
			this.stage.addChild(this.zombie);
			
			this.zombie = new scope.Zombie(this.assets.monster_zombie, "walk_left");
			this.zombie.x = 350;
			this.zombie.y = 350;
			this.stage.addChild(this.zombie);
			
			this.zombie = new scope.Zombie(this.assets.monster_zombie, "walk_up");
			this.zombie.x = 380;
			this.zombie.y = 350;
			this.stage.addChild(this.zombie);
			
			this.zombie = new scope.Zombie(this.assets.monster_zombie, "atk_left");
			this.zombie.x = 420;
			this.zombie.y = 350;
			this.stage.addChild(this.zombie);
			
			this.zombie = new scope.Zombie(this.assets.monster_zombie, "atk_up");
			this.zombie.x = 450;
			this.zombie.y = 350;
			this.stage.addChild(this.zombie);
			
			this.zombie = new scope.Zombie(this.assets.monster_zombie, "die_left");
			this.zombie.x = 480;
			this.zombie.y = 350;
			this.stage.addChild(this.zombie);
			
			this.zombie = new scope.Zombie(this.assets.monster_zombie, "die_up");
			this.zombie.x = 510;
			this.zombie.y = 350;
			this.stage.addChild(this.zombie);
			//stand walkup atkleft atkup die
			
	    },
		
		createBitmap : function(name, spritesheet) {	
	 
			var sprite =  new  createjs.BitmapAnimation( spritesheet );
			sprite.gotoAndPlay(name);
 	 
			return sprite;
		} ,
		
		createGame: function() {
			console.debug('createGame');
			//main scene
			this.scene = new createjs.Container();
			this.scene.id = "scene";
			this.scene.x = 0;
			this.scene.y = 0;
			this.stage.addChild(this.scene);
			
			//player
			this.player = new scope.Player(this.scene, this.gameInfo, this);
 			this.stage.player = this.player;
			//weapon tool
			this.weaponTool = new scope.WeaponTool(this.stage, this.player);
 			//weapon factory
			this.weaponFactory = new scope.WeaponFactory(this.stage, this.player, this.weaponTool, this );
			this.weaponFactory.x = this.gameInfo.width - 200 ;//1100;
			this.weaponFactory.y = 495;
			this.weaponFactory.mouseEnabled = true;
			this.weaponFactory.updateWeapon();
 			this.stage.addChild(this.weaponFactory);
 
			//control button
			var spritesheet = new GameLibs.SpriteSheetWrapper(scope.ImageManager._icon);
			this.controlBtn = this.createBitmap("control-0", spritesheet );
			this.controlBtn.x = 20;
			this.controlBtn.y = 530;
			this.controlBtn.name = "controlBtn";
			//this.controlBtn.regX = 34/2 ;
			//this.controlBtn.regY = 39/2 ;
			this.controlBtn.mouseEnabled = true;
			this.stage.addChild(this.controlBtn); 
 			var self = this;
 			this.controlBtn.cursor = "pointer";
			this.controlBtn.scaleX = this.controlBtn.scaleY = this.controlBtn.scale = 1;
			this.controlBtn.onClick = Atari.proxy(this.controlBtnmouseDownHandler, this);  
			this.controlBtn.addEventListener("mouseover", function(evt) {
				//var o = evt.target;
				//o.scaleX = o.scaleY = o.scale*1.1;
				document.body.style.cursor = 'pointer';
 			});
			this.controlBtn.addEventListener("mouseout", function(evt) {
				var o = evt.target;
				o.scaleX = o.scaleY = o.scale;
				document.body.style.cursor = 'default';
 			});
			
			//fast forward button
			this.fastBtn = this.createBitmap("fastForward-0", spritesheet );
			this.fastBtn.x = this.controlBtn.x + 45;
			this.fastBtn.y = this.controlBtn.y + 4;
			//this.fastBtn.regX = 43/2 ;
			//this.fastBtn.regY = 33/2 ;
			this.fastBtn.name = "fastBtn";
 			this.fastBtn.mouseEnabled = true;
			this.fastBtn.scaleX = this.fastBtn.scaleY = this.fastBtn.scale = 1;
			this.fastBtn.onClick = Atari.proxy(this.fastBtnmouseDownHandler, this); 
			this.fastBtn.addEventListener("mouseover", function(evt){
  				document.body.style.cursor = 'pointer';
				//var o = evt.target;
				//o.scaleX = o.scaleY = o.scale*1.1;
			});
			this.fastBtn.addEventListener("mouseout", function(evt){
  				var o = evt.target;
				o.scaleX = o.scaleY = o.scale;
				document.body.style.cursor = 'default';
			});
			 
			this.stage.addChild(this.fastBtn);
 			
			//enemy factory
			this.enemyFactory = new scope.EnemyFactory(this.scene, this.player);
			this.enemyFactory.stop();
			 //score bar
			this.scoreBar = new scope.ScoreBar(this.player, this.gameInfo, this.enemyFactory);
			this.scoreBar.x = 5;
			this.scoreBar.y = 5;
			this.scoreBar.score = this.player.score;
			this.stage.addChild(this.scoreBar);
			
			this.popup = new scope.Popup();
			this.popup.sprite.x = (this.w - this.popup.sprite.width)>>1;
			this.popup.sprite.y = (this.h - this.popup.sprite.height)>>1;
			this.stage.addChild(this.popup.sprite);
			
			
			 var defaultWeapons = [ 
			{ type:"Turret", pos: [7,4] },
			{ type:"LightTurret", pos: [8,4] },
			{ type:"HeavyTurret", pos: [9,5] }
			];//, [6,5]];//, [10,6], [12,5], [13,6]]
			//default weapons
			if(defaultWeapons)
			{
				for(var i = 0; i < defaultWeapons.length; i++)
				{		
					var turret = defaultWeapons[i];
					this.addDefaultTurret(turret);
				}
				this.player.path = this.player.buildPath();
			}
			/*/test
			var s = new scope.Soldier();
			s.x = this.player.startPoint[0] + 3 * 60;
			s.y = this.player.startPoint[1] + 3 * 60;
			s.setDirection([-1,0]);
			//s.animateDeath();
			this.scene.addChild(s);
			//*/
			var defaultEnemies = [/*{ type:'ZombieSoldier' } ,*/{ type:'ZombieSoldierAntiGatling' }, {type:'Soldier' } ]; //;// ]; //{type:'Soldier' } ,  
			if(defaultEnemies)
			{
				for(var i = 0; i < defaultEnemies.length; i++)
				{		
					var enemy = defaultEnemies[i];
					this.addDefaultEnemy(enemy);
 				}
 			}
			 
			canvas = document.getElementById("gameCanvas");
			var offset = this.getElementOffset(canvas);
			offsetX = offset.left;
			offsetY = offset.top;
			 		
 			//this.stage.addEventListener("mousedown", this.mouseDownHandler);
			this.stage.onClick = Atari.proxy(this.mouseDownHandler, this);
			//this.playSound("sounds_grasslands");
			
			this.music = SoundJS.play("music", null, 0, 0, -1);
			this.bgm = SoundJS.play("bgm", null, 0, 0, -1);
			
			this.bgm.setVolume(0.5);
			this.music.setVolume(1);
			this.bgm.pause();
			
			//this.enemyFactory.started = false;
			
			//this.proximityManager = new GameLibs.ProximityManager(50);

			//setTimeout(Atari.proxy(this.wiggleMushroom, this), 1000);
 		},
		createSparks: function (x, y, list, num) {
			if (this.turnOffParticles) { return; }
			this.emitter.emitMultiple({x:x, y:y}, num, s.SPARK_PROPS, list);
		},

		createExplosion: function (x, y, label) {
			if (label == null) {
				label = "YarExplosion";
			}
			this.spritesheet._data[label].frequency = 5;
			var explosion = new BitmapAnimation(this.spritesheet);
			explosion.onAnimationEnd = Atari.proxy(this.handleExplosionComplete, this, explosion);
			explosion.x = x;
			explosion.y = y;
			explosion.gotoAndPlay(label);
			this.stage.addChild(explosion);
		},

		handleExplosionComplete: function (ref) {
			this.stage.removeChild(ref);
		},
		addEffectExplosion : function(x,y){
			this.spritesheet_weapon  = new GameLibs.SpriteSheetWrapper(this.stage.assets.weapon);
			var explosion = this.createBitmap("explosion", this.spritesheet_weapon);
			explosion.x = x || 400;
			explosion.y = y || 400;
			this.stage.addChild(explosion);
			explosion.gotoAndPlay("explosion");
			
			return explosion;
		},
		
		addDefaultTurret: function(turret){
			console.log(' turret ',turret, turret.type , turret.pos, this.stage);
			var s = new scope[ turret.type](this.stage);	
			//s._create();	
			//s._createHealthBar();
			//var s = new scope.Gatling(this.stage);
			s.x = this.player.startPoint[0] + turret.pos[0] * this.player.tileWidth;
			s.y = this.player.startPoint[1] + turret.pos[1] * this.player.tileHeight;
			s.tx = turret.pos[0];
			s.ty = turret.pos[1];
			this.scene.addChild(s);
			this.player.weapons.push(s);
		},
		addDefaultEnemy : function(enemy){
			this._soldierStartX = 100;
			this._soldierStartY = 315;
			console.log(' addDefaultEnemy ', enemy );
			/*
			var r = Math.random();
			if( r < .33){	
				var s = new scope.ZombieSoldier(this.stage);
			}else if( r < .66){	
				var s = new scope.ZombieSoldierAntiGatling(this.stage);
			}else{
				var s = new scope.Soldier(this.stage);
			}*/
			var s = new scope[enemy.type](this.stage);
		    
			//s._create();
			//var s = new scope.Soldier(this.stage);
			s.x = this._soldierStartX;
			s.y = this._soldierStartY;
			s.mouseEnabled = false;
			this.player.addTarget(s);
			this.stage.addChild(s);
			
			//s.animateAttack();
		},
		/*
		wiggleMushroom : function(){
			var j = this.mushroomRowArray.length * Math.random()|0;
			var i = this.mushroomRowArray[j].getNumChildren() * Math.random()|0;
			var m = this.mushroomRowArray[j].getChildAt(i);

			if(!m || m.damage > 0){ return; }
			if(m.currentAnimation == Assets.TEX_MUSHROOM){
				m.gotoAndPlay(Assets.TEX_MUSHROOM_MOVE);
			}
			else if(m.currentAnimation == Assets.TEX_MUSHROOM_POISONED){
				m.gotoAndPlay(Assets.TEX_MUSHROOM_POISONED_MOVE);
			}
			m.onAnimationEnd = Atari.proxy(this.onWiggleComplete, m);

			setTimeout(Atari.proxy(this.wiggleMushroom, this), 100 + 100 * Math.random());

		},

		onWiggleComplete : function(){
			if(Math.random() > .75){ return; }
			if(this.currentAnimation == Assets.TEX_MUSHROOM_MOVE){
				this.gotoAndPlay(Assets.TEX_MUSHROOM);
			}
			else if(this.currentAnimation == Assets.TEX_MUSHROOM_POISONED_MOVE){
				this.gotoAndPlay(Assets.TEX_MUSHROOM_POISONED);
			}
		},*/
		fastBtnmouseDownHandler: function (e) {
 			if(this.player.fastForward == 1){
				createjs.Ticker.setFPS(50);
				this.fastBtn.gotoAndStop("fastForward-1");
				this.player.fastForward = 2;
			}else {
				createjs.Ticker.setFPS(25);
				this.fastBtn.gotoAndStop("fastForward-0");
				this.player.fastForward = 1;
			}
			console.log("fastForward", this.player.fastForward );	
				
		},
		controlBtnmouseDownHandler: function (e) {
			
 			//resume or pause game
			if(createjs.Ticker.getPaused())
			{
				this.controlBtn.gotoAndStop("control-0");
				createjs.Ticker.setPaused(false);
				console.log("setPaused", createjs.Ticker.getPaused() );	
				this.enemyFactory.resume();
			}else
			{
				this.controlBtn.gotoAndStop("control-1");
				createjs.Ticker.setPaused(true);
				console.log("setPaused", createjs.Ticker.getPaused() );	
				this.enemyFactory.stop();
			}
		},
		playSound: function (soundname, volume) {
			var inst = SoundJS.play(soundname);
			if (volume != null) { inst.setVolume(volume); }
			return inst;
		},

		startGame: function() {
			// When touch-enabled, add the touch throttle.
			//this.gameInfo.touchEnabled = true;
			console.debug('startGame' );
		    
			if (this.gameInfo.touchEnabled) {
			    this.throttle = new GameLibs.Throttle(new createjs.Rectangle(0,0,this.gameInfo.width,this.gameInfo.height),
					    GameLibs.Throttle.HORIZONTAL,
			            {autoHide:false});
			    this.throttle.setPosition(this.gameInfo.width>>1, this.gameInfo.height-60);
			    this.stage.addChild(this.throttle.sprite);
 
		    }
			
		    // Create the on-screen text
		    this.scoreText = new createjs.Text("Score: 0", "20px VisualMagnets", "#ffffff");
		    this.scoreText.x = 20
			this.scoreText.y = 15;
		    this.scoreManager = new GameLibs.ScoreManager(this.scoreText);
		    this.scoreManager.prefix = "Score: ";
			
			this.timeText = new createjs.Text("1:00:00", "40px VisualMagnets", "#ffffff");
		    this.timeText.textAlign = "center";
		    this.timeText.y = 5;
		    this.timeText.x = this.gameInfo.width >> 1;

		    this.ballText = new createjs.Text("Hits: 0", "20px VisualMagnets", "#ffffff");
		    this.ballText.y = 15;
		    this.ballText.textAlign = "right";
		    this.ballText.x = this.gameInfo.width - 20;
			
		    //this.stage.addChild(this.scoreText, this.timeText, this.ballText);
			 
		    // Create the intro text
		    this.titleText = new createjs.Text("Defend your base!", "60px VisualMagnets", "#ffffff");
		    this.titleText.x = -1500;
		    this.titleText.y = 150;
		    this.titleText.alpha = 0;
		    this.titleText.textAlign = "center";
		    this.stage.addChild(this.titleText);

			this.popup.setText("Level "+ this.levelManager.currentLevel);
			this.popup.show(1000);
			this.stage.setChildIndex(this.popup.sprite,this.stage.getNumChildren() - 1);

		    // Tween in the intro text, then tween out.
		    createjs.Tween.get(this.titleText)
				    .wait(800)
				    .to({x:this.gameInfo.width>>1, alpha:1},400,createjs.Ease.backOut)
				    .wait(1000)
				    .to({x:1000, alpha:0}, 400, Ease.backIn)
				    .call(this.startLevel, null, this);
 
	    },
		
		enterFrameHandler : function(tickFactor) {
			//game over
			if(this.player.life == 0)
			{
				this.gameOver();
				return;
			}

			//continue to get new wave of enemies to run
			if(this.player.targets.length == 0 && (this.enemyFactory && !this.enemyFactory.started)) //  && !this.stage.getPaused()
			{
				//console.log('enemyFactory nextRound' );
				//this.enemyFactory.nextRound();
				return;
			}
			if(this.scoreBar)
				this.scoreBar.tick(tickFactor);
			if(this.player)
				this.player.tick(tickFactor);
			if(this.weaponFactory)
				this.weaponFactory.tick(tickFactor);	
			if(this.weaponTool)
				this.weaponTool.tick(tickFactor);	
			//Runner.gameOver();
		 
			for(var i = 0; i < this.scene.children.length; i++)
			{		
				var soldier = this.scene.children[i];
				soldier.tick(tickFactor , this.player);
			}
			//this.showFPS();
			this.fps_meter.tick();
		},

		mouseDownHandler : function(e) {	
			//console.log('mouseDownHandler',e );
 			
			if (this.player.life <= 0)
			{
				//restart the game
				this.player.reset();	
				this.player.money = 100;
				this.scene.removeAllChildren();
				//scope.Gatling.level = 0;
				//scope.Soldier.level = 0;
				createjs.Ticker.setPaused(false);
				this.enemyFactory.count = 0;
				this.enemyFactory.round = 0;
				this.enemyFactory.started = false;
			}else
			{		
				//console.log('mouseDownHandler',e.stageX,  offsetX, e.stageY, offsetY );
 			
				var obj = this.stage.getObjectUnderPoint(e.stageX-offsetX, e.stageY-offsetY, true);
				//var obj = stage.mouseTarget;
				console.log("select:", obj, e.stageX, e.stageY ,  offsetX , offsetY,  createjs.Ticker.getPaused() );
				 
				if(obj == this.controlBtn)
				{
					//resume or pause game
					if(createjs.Ticker.getPaused())
					{
						this.controlBtn.gotoAndStop("control-0");
						//this.stage.setPaused(false);
						createjs.Ticker.setPaused(false);
						this.enemyFactory.resume();
					}else
					{
						this.controlBtn.gotoAndStop("control-1");
						//this.stage.setPaused(true, true);
						createjs.Ticker.setPaused(true);
						this.enemyFactory.stop();
					}
					console.log('createjs.Ticker.getPaused() ', createjs.Ticker.getPaused() );
 			
				}else if(obj == this.fastBtn)
				{
					if(this.fastBtn.currentFrame == 1)
					{
						createjs.Ticker.setFPS(50);
						this.fastBtn.gotoAndStop("fastForward-1");
						this.player.fastForward = 2;
					}else
					{
						createjs.Ticker.setFPS(25);
						this.fastBtn.gotoAndStop("fastForward-0");
						this.player.fastForward = 1;
					}
					console.log('this.player.fastForward ', this.player.fastForward );
 			
				}/*else if(obj && obj.name ==  "gatingIcon" )
				{
					if(!this.is_selected_weaponFactory){
						this.weaponFactory.createWeapon();
						this.is_selected_weaponFactory = true;
					}
					console.log('_gatingIcon ', obj );
 			
				}*/else if(obj && obj.parent.name == "gatling")
				{			
					//draw radius for selected weapon
					this.selectedWeapon = obj.parent;
					//obj.drawRadius(true);
					this.weaponTool.show(this.selectedWeapon, true, true);
					console.log('*** selectedWeapon Gatling ', this.selectedWeapon );
					return;
				}else if(obj && obj.name == "sellIcon")
				{
					this.player.money += this.selectedWeapon.sellMoney;
					this.player.removeWeapon(this.selectedWeapon);
					console.log('sellIcon ', this.selectedWeapon );
					this.stage.removeChild(this.selectedWeapon);
					this.weaponTool.remove();
					this.selectedWeapon = null;	
					
					return;
				}else if(obj && obj.name == "upgradeIcon")
				{
					this.player.money -= this.selectedWeapon.upgradeMoney;
					this.selectedWeapon.upgrade();
					this.weaponTool.remove();
					this.selectedWeapon = null;
					console.log('upgradeIcon ', this.selectedWeapon );
					
					return;
				}else if(obj && obj.name == "upgradeDisabledIcon")
				{
					return;
				}
				
				//unselect weapon
				if(this.selectedWeapon) this.weaponTool.remove();
			}
		},
		
		getElementOffset : function (elem) {
			var left = elem.offsetLeft, top = elem.offsetTop;
			while ((elem = elem.offsetParent) && elem != document.body && elem != document) {
				left += elem.offsetLeft;
				top += elem.offsetTop;
			}
			return { left: left, top: top };
		},
		
		updateTime: function(tickFactor) { //console.debug('updateTime' );
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
		
		tick: function(tickFactor) {
			//console.log("tick:" , tickFactor);
				
			this.numTicks += tickFactor;
		    this.timeRemaining = scope.GAME_TIME - (new Date().getTime() - this.startTime);
			
			this.updateTime(tickFactor);
			this.enterFrameHandler(tickFactor);
			
			this.stage.update();
		},

		pause: function(paused) {
			console.debug('pause' );
			if (paused) {
				this.music.pause();
				this.bgm.pause();
			} else {
				this.music.resume();
				this.bgm.resume();
			}
		},

		continueGame: function(keepPoints) {
			console.debug('continueGame' );
		},

		restart: function() {
			console.debug('restart' );
			this.scoreManager.setScore(0);
	        this.isGameOver = false;
	        this.scoreBoard.resetLives();
	        this.levelManager.reset();
	        this.music.resume();
	        this.scoreBoard.updateLevels(this.levelManager.currentLevel);
	        this.bgm.resume();

		},
		handleContinuePress: function () {
			//this.totalLives = 3;
			this.scoreBoard.resetLives();
			//Tween.get(this.yars.sprite).wait(1000).call(this.spawnYars, null, this);

			this.music.resume();
			this.bgm.resume();
		},

		reduceFrameRate: function(reduce) {

		},

		destroy: function() {
			console.debug('destroy' );
		},
		
		gameOver: function() {
			console.debug('gameOver' );
			
			if (!this.popup.showing) {
				this.popup.setText("gameOver");
				this.popup.show(1500);
				//this.scoreBoard.addLife();
				this.stage.setChildIndex(this.popup.sprite, this.stage.children.length-1);
 			}
		    // We could do something fancy here..			
			//this.bgm.pause();
			this.music.pause();
 			this.isGameOver = true;
			this.playSound("loseCoda");
			this.onGameOver();
			
			
	    },
		/*
		playerKilled: function () {
			this.player_killed = this.playSound("player_killed");
			this.createExplosion(this.yars.sprite.x, this.yars.sprite.y);
			this.yars.kill();
			this.totalCollected = 0;

			this.cannon.total = this.levelManager.getCannonChargeTotal();

			//SD: simple way of killing sound
			Tween.get(this.yars.sprite).wait(2000).call(this.killYarsSound, null, this);
			this.createSparks(this.yars.sprite.x, this.yars.sprite.y, [this.yarsParticles]);
		},

		killYarsSound: function () {
			this.player_killed.stop();
		},

		createSparks: function (x, y, list, num) {
			if (this.turnOffParticles) { return; }
			this.emitter.emitMultiple({x:x, y:y}, num, s.SPARK_PROPS, list);
		},

		createExplosion: function (x, y, label) {
			if (label == null) {
				label = "YarExplosion";
			}
			this.spritesheet._data[label].frequency = 5;
			var explosion = new BitmapAnimation(this.spritesheet);
			explosion.onAnimationEnd = Atari.proxy(this.handleExplosionComplete, this, explosion);
			explosion.x = x;
			explosion.y = y;
			explosion.gotoAndPlay(label);
			this.stage.addChild(explosion);
		},

		handleExplosionComplete: function (ref) {
			this.stage.removeChild(ref);
		},
		*/
		restart: function() {
			console.debug('restart' );
		    this.scoreManager.setScore(0);
		    this.startLevel();
	    },

	    continueGame: function(keepPoints) {
			console.debug('continueGame' );
		    if (!this.keepPoints) {
			    this.scoreManager.setScore(0);
		    }
			this.startLevel();
	    },		
		/**
		 * The framework has requested the current game state, usually after the player wins or loses.
		 * <b>This method is required.</b>
		 * @method getScore
		 * @return {Object} An object containing properties for the current<ul>
		 *     <li>score: A number representing the player's game score.</li>
		 *     <li>level: A number representing how many levels the player has <i>started</i>.</li>
		 *     <li>lives: The number of lives the user currently has. If they have lost, it should be zero.</li>
		 * </ul>
		 */
		getScore: function() {
			return new GameLibs.GameDetails(this.scoreManager.score, this.levelManager.currentLevel, this.scoreBoard.lives+1);
		},

		onGameOver: function(){
			//stop stage rendering
			this.stage.setPaused(true);
			//stop enemy
			this.enemyFactory.started = false;
			this.enemyFactory.stop();
			/*
			//draw a transparent modal layer
			context.globalAlpha = 0.7;
			context.fillStyle = "#000000";
			context.fillRect(0,0,context.canvas.width, context.canvas.height);
			context.globalAlpha = 1.0;
			
			//show GAME OVER!
			var x = 500;
			var y = 250;
			var over = "GAME OVER!";
			for(var i = 0; i < over.length; i++)
			{
				var c = over[i];
				if(c == " ")
				{
					x += 15;
					continue;
				}else if(c == "!")
				{
					c = "em";
				}
				var frame = ImageManager.font.eng[c];
				frame.render(context, x, y);
				x += frame.disObj.width - 5;
			}
			
			//show tip
			context.fillStyle = "#d89304";
			context.font = "10px verdana";
			context.fillText("(Click anywhere to play again)", 515, y + 30);*/
		},

		/**
		 * Notify the framework that a level has been complete. The score and game level should updated
		 * by the time this has been called. <b>This callback is required.</b>
		 * @event onLevelComplete
		 */
		onLevelComplete: null,

		/**
		 * Notify the framework that the game has been completed. The score, level, and number of lives
		 * should be updated by the time this has been called. <b>This callback is required.</b>
		 * @event onGameComplete
		 */
		onGameComplete: null,

		/**
		 * Notify the framework that the user has lost a life. The score, game life count, and level
		 * should be updated by the time this has been called. This callback is not required.
		 * @event onLifeLost
		 */
		onLifeLost: null,

		/**
		 * Notify the framework that the player has awarded an achievement. This is TBD, but achievements
		 * will likely be stored in the user's profile, and may be shown to a user when they are achieved/received.
		 * This callback is not required.
		 * @event onGameAchievement
		 * @param {Object|Achievement} achievement The achievement details. TBD.
		 * @todo
		 */
		onGameAchievement: null,

		/**
		 * An error has occurred in the game. This could either be a general fault, a detection of cheating,
		 * or any other specific error case. The framework will log the error, and may display a dialog, or
		 * end the game depending on the warning level. <b>This callback is required.</b>
		 * @event gameError
		 * @param {Object} error The "error" object, including the following properties:
		 * <ol>
		 *     <li>title: The error type or title</li>
		 *     <li>message: The error message body</li>
		 *     <li>errorLevel The level of the error, which determines how the framework
		 * will handle it.<ul>
		 *          <li>GameMediator.ERROR_NOTIFY: Minor errors, which can be logged</li>
		 *          <li>GameMediator.ERROR_WARNING: Minor errors which can be displayed</li>
		 *          <li>GameMediator.ERROR_CRITICAL: Major errors which prevent further gameplay</li>
		 *      </ul></li>
		 *  </ol>
		 */
		onGameError: null,

		/**
		 * Notify the framework with a general notification from the game. This is an alternate method to
		 * display messaging to the player that is not caused by an error. This callback is not required.
		 * @event gameNotification
		 * @param {Object|Notification} notification The notification object, which contains the following properties:
		 * <ol>
		 *     <li>title: The title of the notification</li>
		 *     <li>message: The body content of the notification</li>
		 * </ol>
		 */
		onGameNotification: null,


	// Multiplayer methods.

		/**
		 * Apply a sync packet from the server or a host player. This should overwrite the entire game's state
		 * to keep all the games synchronized. This is always applied before player actions and the game tick.
		 * <b>Only games with full synchronization require the sync command.</b>
		 * @method sync
		 * @param {GamePacket} packet The game state object sent by the host.
		 */
		sync: function(packet) {

		},

		/**
		 * Create a sync packet for the other games. This method is only called on host game instances to create
		 * a synchronization packet for the other players. This is always fired after the game tick and frame packets
		 * are collected. <b>All multi-player games require the getGamePacket method.</b>
		 * @method getGamePacket
		 * @return {GamePacket} The current game packet.
		 */
		getGamePacket: function() {
			return new GameLibs.GamePacket();
		},

		/**
		 * Apply other player's game actions. This is injected into your game as packets from other players are received.
		 * Note that this is always fired after sync packets are applied, and before the game tick.
		 * <b>All multi-player games require the updatePlayers()method.</b>
		 * @method updatePlayers
		 * @param {Array} packets A list of FramePackets for the other players.
		 * This list will contain a unique id for each player.
		 */
		updatePlayers: function(packets) {

		},

		/**
		 * Get the game events/state for the current frame. This may return null some of the time, it
		 * is up to your game to decide how to minimize the amount of framepackets being sent.
		 * PLEASE READ: http://playerio.com/documentation/tutorials/building-flash-multiplayer-games-tutorial/synchronization
		 * @method getFramePacket
		 * @return {FramePacket} The current game packet for the frame.
		 */
		getFramePacket: function() {
			return new GameLibs.FramePacket();
		},

		/**
		 * A player has been disconnected from the current multiplayer game.
		 * @method playerDisconnected
		 */
		removePlayer: function(playerId) {

		},
		/*
		showFPS :function() {
			var fpsContainer = new createjs.DOMElement("fps");
			if(fpsContainer)
			{
				fpsContainer.htmlElement.innerHTML = "FPS:" + Ticker.getMeasuredFPS(); 
			}
		} */

	}

	// It is important to store a reference to the game class on the provided scope, which should always be
	// window.Atari.currentGame. This ensures the game class can be instantiated.
	scope.MainGame = MainGame;

}(window.Atari.currentGame))