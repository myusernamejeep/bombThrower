(function(scope) {

	function YarsRevenge2(canvas) {
		this.canvas = canvas;
	}

	var s = YarsRevenge2;
	s.SHOOTING_BLOCK = 1,
	s.COLLECT_ENERGY = 5,
	s.SHOOT_BADDIES = 10,
	s.HIT_SWIRL = 5000,
	s.SHOOTING_QOTILE_WITH_ZORION = 10000,
	s.SHOOTING_SWIRL_WITH_ZORION_BEFORE_LAUNCH = 2000,
	s.SHOOTING_SWIRL_WITH_ZORION_AFTER_LAUNCH = 6000,
	s.MILE_STONE_1 = 70000,
	s.MILE_STONE_2 = 150000,
	s.MILE_STONE_3 = 230000,
	s.TOTAL_ALLOWED = 3,
	s.FIRE_RATE = 5,
	s.SPARK_PROPS = {
		decay: 0.95,
		life: 1,
		rotation: true,
		gravity: .10,
		spread: 0,
		variation: 0,
		stretchFactor: null,
		scaleDecay: 1,
		addOnBottom: true}

	var p = YarsRevenge2.prototype = {

        yars: null,
		qotile:null,
		energyField:null,
		energyField2:null,
		count:null,

		stage: null,
		direction: null,
		zorlanCanon:null,
		bullet:null,
		w:null,
		h:null,
		lastTick:null,
		tickInterval:null,
		intervalCount:null,
		isActive:null,
		force:null,
		isMoving:null,
		TARGET_FPS:null,
		targetX:null,
		targetY:null,
		swirl:null,
		totalLives:null,
		//Waterfall soundInteraction
		dir:null,
		currentX:null,
		oldX:null,
		splashHasPlayed:null,
		spritesheet:null,
		circles:null,
		baddies:null,
		bullets:null,
		energies:null,
		timer:null,
		angle:null,
		offsetX:null,
		offsetY:null,
		cannon:null,
		insideCannon:null,
		totalCollected:null,
		killedCircle:null,
		shake:null,
		targetAngle:null,
		swirlMoving:null,
		baddyTimer:null,
		missile:null,
		missileActive:null,
		allowRotation:null,
		allowBossMove:null,
		container:null,
		containerAngle:null,
		constainerSpeed:null,
		moveJoyStick:null,
		index:null,
		numTicks:null,
		numTicks2:null,
		tickFactor:null,
		killPlayer:null,
		gameInfo:null,
		assets:null,
		onLevelComplete:null,
		onGameComplete:null,
		onGameOver:null,
		onGameError:null,
		onLifeLost:null,
		isInsideField:null,
		emitter:null,
		activeList:null,
		levelManager:null,
		popup:null,
		waterfallSplash:null,
		frontWaterfall:null,
		pinkParticles:null,
		blueParticles:null,
		yarsParticles:null,
		buttonOverlay:null,
		hitArea:null,
		currentStageX:null,
		currentStageY:null,
		music:null,
		jungleSound:null,
		qotileDestroyed:null,
		forceFieldSound:null,
		cannonSound:null,
		fireSound:null,
		swirlSound:null,
		qotileAttackSound:null,
		qotile_attack:null,
		yarsKillSound:null,
		clicks:null,
		perf:null,
		touchList:null,
		allowConstantFire:null,
		isGameOver:null,
		splashSound:null,
		inWaterfallSound:null,
		playInside:null,
		turnOffParticles:null,
		hasPressed:null,
		particleContainer:null,
		stopSwirlMovement:null,
		bulletIndex:null,
		pool:null,
		bulletMax:null,


		initialize: function(assets, stage, gameInfo) {

			this.assets = assets;
			this.gameInfo = gameInfo;
			this.stage = stage;
			this.pool = [];
			this.bullet = 0;
			this.bulletMax = 5;
			this.circles = [];
			this.bullets = [];
			this.baddies = [];
			this.energies = [];
			this.angle = 0;
			this.timer = 100;
			this.offsetX = 962;
			this.offsetY = 300;
			this.insideCannon = false;
			this.totalCollected = 0;
			this.shake = false;
			this.targetAngle = 0;
			this.swirlMoving = false;
			this.baddyTimer = 0;
			this.missileActive = false;
			this.constainerSpeed = 0;
			this.turnOffParticles = false;
			this.hasPressed = false;

			this.clicks = [];

			this.containerAngle = 0;
			this.index = 0;
			this.numTicks = 0;
			this.numTicks2 = 0;

			this.spritesheet = new GameLibs.SpriteSheetWrapper(this.assets.yarsAssetsAll);

			this.pinkParticles = new BitmapAnimation(this.spritesheet);
			this.pinkParticles.gotoAndStop("RedParticle");

			this.blueParticles = new BitmapAnimation(this.spritesheet);
			this.blueParticles.gotoAndStop("BlueParticle");

			this.yarsParticles = new BitmapAnimation(this.spritesheet);
			this.yarsParticles.gotoAndStop("YarParticle");

			this.w = this.stage.canvas.width;
			this.h = this.stage.canvas.height;

			this.isActive = false;
			this.force = 1.5;
			this.isMoving = false;
			this.angle = 0;

			this.activeList = [];

			this.yars = new scope.currentGame.Yars(this.spritesheet, Atari.proxy(this.yarsReady, this));
			this.cannon = new scope.currentGame.Cannon(this.spritesheet);
			this.qotile = new scope.currentGame.Qotile(this.spritesheet, Atari.proxy(this.qotileHitComplete, this));
			this.qotile.sprite.x = this.offsetX;
			this.qotile.sprite.y = this.offsetY;
			this.qotile.originX = this.offsetX;
			this.qotile.originY = this.offsetY;

			this.energyField = new scope.currentGame.EnergyField(this.spritesheet, 3.1, true, false);
			this.energyField.sprite.x = 85;

			this.energyField2 = new scope.currentGame.EnergyField(this.spritesheet, 3.15, false, false);
			this.energyField2.sprite.x = 85;

			this.frontWaterfall = new scope.currentGame.EnergyField(this.spritesheet, 3.1, false, true);
			this.frontWaterfall.sprite.x = 80;

			this.waterfallSplash = new scope.currentGame.Splash(this.spritesheet);
			this.waterfallSplash.sprite.x = 211;
			this.waterfallSplash.sprite.y = this.h;

			this.swirl = new scope.currentGame.Swirl(this.spritesheet);
			this.swirl.sprite.x = this.offsetX;
			this.swirl.sprite.y = this.offsetY;

			this.levelManager = new scope.currentGame.LevelManager();
			var levelType = this.levelManager.getLevelType();
			this.allowRotation = levelType.rotation;
			this.constainerSpeed = (levelType.oscillate) ? 0.02 : 0;
			this.container = new Container();
			this.container.x = this.offsetX + 1000;
			this.container.y = this.offsetY;
			this.stage.addChild(this.container);
			this.dir = 0;
			this.currentX = 0;
			this.oldX = 0;
			this.splashHasPlayed = false;
			this.playInside = false;
			this.scoreBoardSetUp();

			new GameLibs.FPSMeter(this.stage);

			this.shootAllowed = true;

			this.lastTick = Ticker.getTime();
			this.killPlayer = false;

			var bg = GameLibs.GameUI.changeBackground(this.assets.background, gameInfo.width, gameInfo.height);
			stage.addChildAt(bg, 0);
			//this.gameInfo.touchEnabled = true;

			var ss = new GameLibs.SpriteSheetWrapper(this.assets.controls, "images/");

			this.hitArea = new Shape();
			this.hitAreaShape = new Shape();
			var _g = this.hitAreaShape.graphics;
			_g.setStrokeStyle(1);
			_g.beginFill("#FF0099");
			_g.drawRect(0, 0, this.w, this.h);
			_g.endFill();
			this.hitArea.hitArea = this.hitAreaShape;
			this.hitArea.onPress = Atari.proxy(this.handleMouseDown, this);
			this.stage.addChild(this.hitArea);

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

			}
			GameLibs.GamePad.player.onButtonDown = Atari.proxy(this.handleKeyBoardButton, this);

			this.perf = new GameLibs.PerformanceMonitor(Atari.proxy(this.enableLowQuality, this), 40);
			this.init();
		},

		handleKeyBoardButton: function (key) {
			if(key == GameLibs.GamePad.BUTTON_1 ){
				if (!this.isInsideField) {
					if (this.shootAllowed) {
						this.shootAllowed = false;
						Tween.get(this, {override:false}).wait(250).call(this.fireDelay, null, this);
					}
				}
			}
			if (key == GameLibs.GamePad.BUTTON_3 || key == GameLibs.GamePad.BUTTON_2){
				this.handleShoot();
			}
			if (key == GameLibs.GamePad.BUTTON_2){
				this.yars.arm.rotation +=  5;
			}
			if (key == GameLibs.GamePad.BUTTON_4){
				this.yars.arm.rotation -=  5;
			}

		},

		fireDelay: function () {
			this.shootAllowed = true;
			this.fire(this.tickFactor);
		},

		enableLowQuality: function(lowQuality) {
			this.turnOffParticles = lowQuality;
			if (lowQuality) {
				this.energyField.sprite.alpha = 0;
				this.energyField2.sprite.alpha = 0;
				this.waterfallSplash.sprite.alpha = 0;
				this.frontWaterfall.sprite.alpha = 1;
			} else {
				this.energyField.sprite.alpha = 1;
				this.energyField2.sprite.alpha = 1;
				this.waterfallSplash.sprite.alpha = 1;
			}
		},

		handleShoot: function () {
			if (this.isGameOver) { return; }
			if (this.cannon.fullCharge && !this.cannon.hasFired) {
				this.fireMissile(this.cannon);

				if (this.shootBtn != null) {
					this.shootBtn.setDisabled(!this.cannon.fullCharge);
				}
			}
		},

		qotileHitComplete: function () {
			this.qotile.drool.alpha = 0;
			Tween.get(this.qotile.sprite, {override:true}).to({alpha:0}, 500).call(this.handleComplete, null, this);
		},

		handleComplete: function () {
			this.qotile.sprite.visible = true;
			this.qotile.sprite.alpha = 0;

			this.levelManager.levelComplete();

			var level = this.levelManager.currentLevel;
			this.scoreBoard.updateLevels(this.levelManager.currentLevel);
			this.popup.setText("Level "+level);
			this.popup.show(1500);
			this.cannon.reset();
			this.stopSwirlMovement = false;
			this.cannon.total = this.levelManager.getCannonChargeTotal();
			this.stage.setChildIndex(this.popup.sprite, this.stage.children.length - 1);

			Tween.get(this).wait(4000).call(this.handleLevelComplete, null, this);
		},

		handleLevelComplete: function() {
			this.qotileDestroyed.stop();
			this.totalCollected = 0;

			if (this.shootBtn != null) {
				this.shootBtn.setDisabled(!this.cannon.fullCharge);
			}

			this.yars.full = false;
			this.onLevelComplete();
			this.swirl.duration = 1000;
			this.swirl.active = true;
			this.swirl.resume = true;

			this.startLevel();
		},

		startLevel: function () {
			this.touchList = [];
			this.isGameOver = false;
			this.index = 0;
			this.stopSwirlMovement = false;
			this.dir = 0;
			this.currentX = 0;
			this.oldX = 0;
			this.splashHasPlayed = false;
			this.playInside = false;
			this.turnOffParticles = false;
			this.containerAngle = 0;

			this.container.x = this.offsetX + 1000;
			this.container.y = this.offsetY + 30;

			this.qotile.sprite.x = this.offsetX;
			this.qotile.sprite.y = this.offsetY;

			var levelType = this.levelManager.getLevelType();
			this.allowRotation = levelType.rotation;
			this.constainerSpeed = (levelType.oscillate) ? 0.02 : 0;
			this.qotile.sprite.visible = true;
			this.qotile.sprite.alpha = 0;
			this.qotile.drool.alpha = 0;
			this.createRings(22, 40, 150, "left", 0.01);
			this.createRings(29, 40, 210, "right", 0.01);

			this.cannon.total = this.levelManager.getCannonChargeTotal();

			if (this.shootBtn != null) {
				this.shootBtn.setDisabled(!this.cannon.fullCharge);
			}

			this.qotile.reset();
			this.qotile.hitTotal = this.levelManager.getQotileHitTotal();
		},

		handleMouseUp: function () {
			this.allowConstantFire = false;
			this.touchList = [];
		},

		handleMouseMove: function (event) {
			this.currentStageX = event.rawX;
			this.currentStageY = event.rawY;
		},

		handleMouseDown: function (event) {
			//SD:This will restrict spamming fire with multiple fingers
			event.onMouseUp = Atari.proxy(this.handleMouseUp, this);
			event.onMouseMove = Atari.proxy(this.handleMouseMove, this);
			this.allowConstantFire = true;
			this.hasPressed = true;
			this.currentStageX = event.rawX;
			this.currentStageY = event.rawY;
			this.touchList.push(event);
		},

		prepMissile: function () {
			if (!this.isInsideField) {
				this.fire(this.tickFactor);
			}
		},

		pauseSound: function () {
			//this.cannonSound.pause();
			//this.forceFieldSound.pause();
		},

		loadPool: function () {
			for (var i = 0; i<this.bulletMax; i++) {
				var bullet = new scope.currentGame.Blast(this.spritesheet)
				this.pool.push(bullet);
			}
			this.bulletIndex = this.bulletMax;
		},

		bulletBackToPool: function (bullet) {
			this.pool[this.bulletIndex++] = bullet;
		},

		getBullet: function () {
			if (this.bulletIndex > 0) {
				return this.pool[--this.bulletIndex];
			} else {
				Atari.trace("Empty");
				return null;
			}
			return null;
		},

		init: function() {
			this.loadPool();
			this.startLevel();
			this.cannon.sprite.x = 0;
			this.cannon.sprite.y = 330;

			this.stage.addChild(this.cannon.sprite);
			this.stage.addChild(this.qotile.sprite);
			this.stage.addChild(this.energyField.sprite);
			this.stage.addChild(this.energyField2.sprite);
			this.stage.addChild(this.swirl.sprite);
			this.stage.addChild(this.scoreBoard.sprite);

			this.yars.sprite.x = 75;
			this.yars.sprite.y = 300;

			this.stage.addChild(this.yars.sprite);

			this.stage.addChild(this.waterfallSplash.sprite);
			this.stage.addChild(this.frontWaterfall.sprite);


			if (this.shootBtn != null) {
				this.stage.setChildIndex(this.shootBtn.sprite, this.stage.getNumChildren()-1);
				this.stage.setChildIndex(this.moveJoyStick.sprite, this.stage.getNumChildren()-1);
			}

			this.particleContainer = new Container();
			this.stage.addChild(this.particleContainer);
			this.emitter = new GameLibs.ParticleEmitter(this.particleContainer);

			this.popup = new scope.currentGame.Popup();
			this.popup.sprite.x = this.w - this.popup.sprite.width>>1;
			this.popup.sprite.y = this.h - this.popup.sprite.height>>1;
			this.stage.addChild(this.popup.sprite);
		},

		touchPadSetup: function () {
			this.touchPad = new GameLibs.TouchBar(this.stage, new Rectangle(0, 0, this.w, this.h), this.yars.sprite, "TL");
			this.touchPad.targetMode = GameLibs.TouchBar.TWEEN_MODE;
			this.touchPad.targetAmount = 5;
		},

		scoreBoardSetUp: function () {
			this.scoreBoard = new scope.currentGame.ScoreBoard(this.spritesheet);
			this.scoreBoard.updateLives(this.levelManager.lives);
			this.scoreBoard.updateLevels(this.levelManager.currentLevel);
			this.scoreManager = new GameLibs.ScoreManager(this.scoreBoard.scoreDisplay);
			this.scoreManager.leading = 1;
		},

		fireMissile: function (clip) {
			if (this.cannon.hasFired) { return; }
			if (this.missile != null) { return; }
			this.cannon.hasFired = true;
			this.missile = new scope.currentGame.Missile(this.spritesheet);
			this.missile.sprite.x = clip.sprite.x + clip.width / 2;
			this.missile.sprite.y = (this.cannon.sprite.y + this.cannon.sprite.height/2) + 3;
			this.missileActive = true;
			this.playSound("missileFire");

			this.cannon.shootCannon();
			this.cannon.reset();

			this.stage.addChild(this.missile.sprite);
		},

		fire: function(tickFactor) {
			this.numTicks = this.numTicks + (1*(this.tickFactor/2));
			var timer = 1;
			if (this.yars.isKilled) { return; }

			if (this.gameInfo.touchEnabled) {
				var dx = this.currentStageX - this.yars.sprite.x;
				var dy = this.currentStageY - this.yars.sprite.y;
				var angle = Math.atan2(dy, dx) * 180/Math.PI;

				this.yars.arm.rotation = (this.hasPressed) ? angle : 10;
				this.yars.backArm.rotation = (this.hasPressed) ? angle : 10;
			}

			var bullet = this.getBullet();
			if (bullet != null) {
				bullet.speed = 15*this.tickFactor;
				bullet.angle = this.yars.arm.rotation;

				this.playSound("fire");
				this.yars.fire();

				bullet.vx = bullet.speed * Math.cos(bullet.angle * Math.PI / 180);
				bullet.vy = bullet.speed * Math.sin(bullet.angle * Math.PI / 180);

				bullet.sprite.rotation = bullet.angle;

				var pt = this.yars.hand.localToGlobal(0, 0);
				bullet.sprite.x = pt.x;
				bullet.sprite.y = pt.y-5;

				this.bullets.push(bullet);
				this.stage.addChild(bullet.sprite);
				this.stage.setChildIndex(bullet.sprite, this.stage.getChildIndex(this.yars.sprite)-1);
			}
		},

		//Game Framework
		startGame: function() {
			this.jungleSound = SoundJS.play("jungleMusic", null, 0, 0, -1);
			this.jungleSound.pause();
			this.music = SoundJS.play("music", null, 0, 0, -1);
			this.music.pause();

			this.inWaterfallSound = SoundJS.play("inWaterfallSound", null, 0, 0, -1);
			this.inWaterfallSound.pause();

			this.popup.setText("Level "+ this.levelManager.currentLevel);
			this.popup.show(1500);
			this.stage.setChildIndex(this.popup.sprite,this.stage.getNumChildren() - 1);

			this.jungleSound.setVolume(1);
			this.music.setVolume(1);

			this.yars.start();
		},

		pause: function(paused) {
			if (paused) {
				this.music.pause();
				this.jungleSound.pause();
			} else {
				this.music.resume();
				this.jungleSound.resume();
			}
		},

		getScore: function () {
			return new GameLibs.GameDetails(this.scoreManager.score, this.levelManager.currentLevel, this.scoreBoard.lives+1);
		},

        continueGame: function (keepPoints) {
	        if (!keepPoints) {
		        this.scoreManager.setScore(0);
	        }
	        this.isGameOver = false;
	        this.handleContinuePress();

        },

        restart: function () {
	        if (this.swirl.sprite.visible) {
		        this.resetSwirl();
	        }

	        this.totalLives = 3;
	        this.scoreManager.setScore(0);
	        this.isGameOver = false;
	        this.scoreBoard.resetLives();
	        this.levelManager.reset();
	        this.swirl.stop();
	        this.qotile.charged = false;
	        this.music.resume();
	        this.scoreBoard.updateLevels(this.levelManager.currentLevel);
	        this.cannon.reset();
	        this.jungleSound.resume();

	        var levelType = this.levelManager.getLevelType();
	        this.allowRotation = levelType.rotation;
	        this.constainerSpeed = (levelType.oscillate) ? 0.02 : 0;

	        this.totalCollected=0;
	        this.container.y = this.offsetY + 30;

	        var l = this.energies.length;
	        for(var i=this.energies.length-1;i>=0;i--) {
		        var e = this.energies.splice(i, 1)[0];
		        this.stage.removeChild(e.sprite);
	        }
	        l = this.circles.length;
	        for (var i=0; i<l; i++) {
		        var c = this.circles[i];
		        if (!c.getHit()) {
			        c.resetEgg();
		        }
	        }

	        this.cannon.total = this.levelManager.getCannonChargeTotal();
	        this.qotile.reset();
	        this.qotile.hitTotal = this.levelManager.getQotileHitTotal();

	        if (this.missile != null) {
		        this.missileActive = false;
		        this.stage.removeChild(this.missile.sprite);

	        }
	        this.missile = null;
	        this.spawnYars();


	        //this.swirl.active = true;
	        //this.swirlMoving = false;

	        this.swirl.sprite.x = this.offsetX;
	        this.swirl.sprite.y = this.offsetY;

	        this.swirl.start();

	        //this.resetSwirl();

        },

		handleContinuePress: function () {
			this.totalLives = 3;
			this.scoreBoard.resetLives();
			Tween.get(this.yars.sprite).wait(1000).call(this.spawnYars, null, this);

			this.music.resume();
			this.jungleSound.resume();
		},



        destroy: function() {

        },

		gameOver: function() {
			this.jungleSound.pause();
			this.music.pause();
			this.inWaterfallSound.pause();
			this.isGameOver = true;

			this.playSound("loseCoda");

			this.onGameOver();

		},

		createRings: function (total, radius, outer, direction, speed) {
			var angle = 0;
			var step = (Math.PI * 2/total);
			var c;
			for(var i=1;i<total+1;i++) {
				c = new scope.currentGame.Fetus(this.spritesheet);
				c.sprite.x = Math.cos(angle)*outer;
				c.sprite.y = Math.sin(angle)*outer;
				c.timer = this.levelManager.getFetusSpawnTime();
				angle = (step*i);
				c.angle = angle;
				c.stationaryAngle = angle;
				c.outer = outer;
				c.direction = direction;
				c.speed = speed;
				var degrees = angle * 180 / Math.PI;
				if (!this.allowRotation) {
					if (degrees > 65 && degrees < 310) {
						this.container.addChild(c.sprite);
						this.activeList.push(c);
						this.circles.push(c);
					} else {
						c.setHit(false);
					}
				} else {
					this.container.addChild(c.sprite);
					this.circles.push(c);
				}
			}

			Tween.get(this.container).to({x:this.offsetX}, 2000).call(this.containerHasAppeared, null, this);

		},

		containerHasAppeared: function() {
			Tween.get(this.qotile.sprite , {override:true}).to({alpha:1}, 1000).call(this.qotileAppears, null, this);
			Tween.get(this.qotile.drool).wait(1000).to({alpha:1}, 1000);

			this.music.resume();
			this.jungleSound.resume();
		},

		qotileAppears: function () {
			this.qotile.sprite.alpha = 1;
		},

		getSprite: function (diameter, color) {
			var radius = diameter/2;
			var c = new scope.currentGame.Ball(radius, color);
			c.hitCount = 5;
			return c;

		},

		playSound: function (soundname, volume) {
			var inst = SoundJS.play(soundname);
			if (volume != null) { inst.setVolume(volume); }
			return inst;
		},

		checkBounds: function(clip) {
			clip.sprite.x = Math.max((clip.width/8), Math.min(clip.sprite.x, this.w - clip.width / 2 ));
			clip.sprite.y = Math.max((clip.height/8), Math.min(clip.sprite.y, this.h - clip.height / 4 ));
		},

		checkWalls: function (clip) {
			var right = this.w;
			var left = 0;
			var top = left;
			var bottom = this.h;
			if (clip.sprite.x - clip.width / 2 > right
				|| clip.sprite.x + clip.width / 2 < left
				|| clip.sprite.y - clip.height / 2 > bottom
				|| clip.sprite.y + clip.height / 2 < top) {
				return true;
			}
			return false;
		},

		checkCollisionSwirl: function (bullet, canRemove) {
			if (!this.swirl.sprite.visible) { return; }
			if (bullet == null) { return; }
			var hit = this.calculateDistance(this.swirl, bullet, 25);
			if (hit) {
				if (this.stage.contains(bullet.sprite)) {
					if (canRemove) {
						if (!this.popup.showing) {
							this.popup.setText("Extra Life");
							this.popup.show(1500);
							this.scoreBoard.addLife();
							this.stage.setChildIndex(this.popup.sprite, this.stage.children.length-1);
							this.cannon.hasFired = false;
						}
						this.scoreManager.addScore(s.HIT_SWIRL);
						this.resetSwirl();
						this.missileActive = false;
						this.stage.removeChild(this.missile.sprite);
						this.missile = null;
						return;
					}
					var index = this.bullets.indexOf(bullet);
					if (index > -1) {
						this.bullets.splice(index, 1);
						this.bulletBackToPool(bullet);
					}
					this.stage.removeChild(bullet.sprite);

				}
				return;
			}
		},

		checkCollisionYars: function () {
			if (this.isGameOver) { return; }
			var hit = this.calculateDistance(this.missile, this.yars, 0);
			if (hit) {
				if (this.stage.contains(this.missile.sprite)) {
					this.missileActive = false;

					this.stage.removeChild(this.missile.sprite);
					this.missile = null;
					this.playerKilled();
				}
			}
		},

		checkCollisionMissile: function (b) {
			var len = this.circles.length;
			if (this.missile == null) { return;}
			var c;
			for (var i=0; i<len; i++) {
				c = this.circles[i];
				if (c.getHit()) {
					var hit = this.calculate(c, this.missile, 0);
					if (hit) {
						c.setHit(false);
						this.killedCircle = c;
						this.createEnergy();
						if (this.stage.contains(this.missile.sprite)) {
							this.scoreManager.addScore(this.SHOOTING_BLOCK*2);
							this.missileActive = false;
							this.createSparks(this.missile.sprite.x, this.missile.sprite.y, [this.blueParticles], 5);
							this.stage.removeChild(this.missile.sprite);
							this.missile = null;
						}
						return;
					}
				}
			}
		},

		removeAllEnemies: function () {
			this.swirl.stop();
			this.qotile.charged = false;
			for(var i=this.baddies.length-1;i>=0;i--){
				var baddy = this.baddies[i];
				var x = baddy.sprite.x;
				var y = baddy.sprite.y;
				this.createExplosion(x, y);
				this.stage.removeChild(baddy.sprite);
				this.baddies.splice(i, 1);
			}

			for(var i=this.circles.length-1;i>=0;i--){
				var circle = this.circles[i];
				if (circle.getHit()) {
					var pt = this.container.getChildAt(i);
					var x = this.container.x + pt.x;
					var y = this.container.y + pt.y;
					this.createExplosion(x, y, "QotileExplosion");
					circle.setHit(false);
				}
			}

			this.container.removeAllChildren();
			this.circles = [];

			var l = this.bullets.length;
			for(var i=this.bullets.length-1;i>=0;i--) {
				var b = this.bullets[i];
				this.stage.removeChild(b.sprite);
				this.bullets.splice(i, 1);
				this.bulletBackToPool(b);
			}
			this.activeList = [];
			this.bullets = [];
			this.baddies = [];
		},

		checkCollisionBossMissile: function () {
			if (this.isGameOver) { return; }
			if (this.missile == null) { return; }
			var hit = this.calculateDistance(this.qotile, this.missile, 40);
			if (hit) {
				if (this.stage.contains(this.missile.sprite)) {
					this.stage.removeChild(this.missile.sprite);
					this.missile = null;
					this.missileActive = false;
					this.playSound("qotileHit");
					this.qotile.hit(true);

					if (this.qotile.hitCount == this.qotile.hitTotal) {
						this.qotile.kill();
						this.qotileDestroyed = this.playSound("qotile_destroyed");
						this.scoreManager.addScore(s.SHOOTING_QOTILE_WITH_ZORION);
						this.qotile.isKilled = true;
						this.removeAllEnemies();
					}
				}
				return;
			}
		},

		checkCollisionBoss: function(b, canDamage, type) {
			if (this.isGameOver) { return; }
			if (b == null) { return; }
			var hit = this.calculateDistance(this.qotile, b, 40);
			if (hit) {
				if (this.stage.contains(b.sprite)) {
					this.qotile.hit(canDamage);
					if (canDamage) {
						this.scoreManager.addScore(s.SHOOTING_QOTILE_WITH_ZORION);
						if (type == "bullet") {
							var index = this.bullets.indexOf(b);
							if (index > -1) {
								var bull = this.bullets.splice(index, 1);
								this.bulletBackToPool(b);
							}
							this.stage.removeChild(b.sprite);
						}
						return;
					}
					if (type == "bullet") {
						if (this.qotile.sprite.alpha == 1) {
							this.createSparks(b.sprite.x, b.sprite.y, [this.blueParticles], 5);
							this.qotile.hitSheild(b.sprite.x, b.sprite.y);
							var index = this.bullets.indexOf(b);
							if (index > -1) {
								this.bullets.splice(index, 1);
								this.bulletBackToPool(b);
							}
							this.stage.removeChild(b.sprite);
						}
					}
				}
				return;
			}
		},

		checkCollisionMissileBaddies: function () {
			if (this.isGameOver) { return; }
			var len = this.baddies.length;
			if (this.missile == null) { return; }
			var baddy;
			for (var i=this.baddies.length-1; i>=0; i--) {
				baddy = this.baddies[i];
				if (baddy.getHit()) {
					var dx = baddy.sprite.x - this.missile.sprite.x;
					var dy = baddy.sprite.y - this.missile.sprite.y;
					var distance = Math.sqrt(dx*dx+dy*dy);
					var minDistance = baddy.width / 2 + this.missile.width / 2;
					if (distance < minDistance) {
						baddy.setHit(false);

						//SD:Shooting a block of the Qotile's shield
						this.scoreManager.addScore(s.SHOOT_BADDIES);
						this.playSound("squidKilled");
						this.createEnergy();
						this.stage.removeChild(this.missile.sprite);
						this.stage.removeChild(baddy.sprite);
						var index = this.baddies.indexOf(baddy);
						if (index > -1) { this.baddies.splice(index, 1); }
						this.missile = null;
						return;
					}
				}
			}
		},

		checkCollisionBaddies: function (b) {
			if (this.isGameOver) { return; }
			var len = this.baddies.length;
			if (b == null) { return; }
			var c;
			for (var i=this.baddies.length-1; i>=0; i--) {
			//for (var i=0; i<len; i++) {
				c = this.baddies[i];
				if (c.getHit()) {
					var dx = c.sprite.x - b.sprite.x;
					var dy = c.sprite.y - b.sprite.y;
					var distance = Math.sqrt(dx*dx+dy*dy);
					var minDistance = c.width / 2 + b.width / 2;
					if (distance < minDistance) {
						c.setHit(false);
						this.killedCircle = c;
						//SD:Shooting a block of the Qotile's shield
						this.scoreManager.addScore(s.SHOOT_BADDIES);
						this.createEnergy();
						this.createSparks(b.sprite.x, b.sprite.y, [this.pinkParticles], 5);
						this.playSound("squidKilled");

						var index = this.bullets.indexOf(b);
						if (index > -1) {
							this.bullets.splice(index, 1);
							if (b.sprite != null) {
								this.bulletBackToPool(b);
								this.stage.removeChild(b.sprite);
							}
						}

						index = this.baddies.indexOf(c);
						if (index > -1) {
							this.baddies.splice(index, 1);
							if (c.sprite != null) {
								this.stage.removeChild(c.sprite);
							}
						}

						//b = null;
						return;
					}
				}
			}
		},

		checkCollision: function (bullet) {
			if (this.isGameOver) { return; }
			var len = this.circles.length;
			if (bullet == null) { return; }
			var c;
			for (var i=0; i<len; i++) {
				c = this.circles[i];
				if (c.getHit()) {
					var hit = this.calculate(c, bullet, 10);//this.calculateDistance(c, bullet, 10);
					if (hit) {
						//SD:Shooting a block of the Qotile's shield
						this.createSparks(bullet.sprite.x, bullet.sprite.y, [this.pinkParticles], 5);
						this.playSound("eggZap");
						this.scoreManager.addScore(s.SHOOTING_BLOCK);
						c.setHit(false);
						this.killedCircle = c;
						this.createEnergy();

						var index = this.bullets.indexOf(bullet);
						if (index > -1) {
							this.bullets.splice(index, 1);
							this.bulletBackToPool(bullet);
						}
						this.stage.removeChild(bullet.sprite);
						//bullet = null;
						return;
					}
				}
			}
		},

		checkYars: function (ball) {
			if (this.isGameOver) { return; }
			if (!ball.getHit()) { return; }
			if (this.yars.isKilled) { return; }

			//if (this.yars.disabled) { return; }

			var hit = this.calculate(ball, this.yars, 10);//this.calculateDistance(this.yars, ball, 10);
			if (hit) {
				var pt = ball.sprite.localToGlobal(0, 0);
				var minDistance = this.yars.width/2 + ball.width/2;
				//var angle = Math.atan2(this.yars.sprite.y - ball.sprite.y, this.yars.sprite.x - ball.sprite.x);
				var angle = Math.atan2(this.yars.sprite.y - pt.y, this.yars.sprite.x - pt.x);
				//var targetX = ball.sprite.x+Math.cos(angle)*minDistance;
				//var targetY = ball.sprite.y+Math.sin(angle)*minDistance;

				var targetX = pt.x+Math.cos(angle)*minDistance;
				var targetY = pt.y+Math.sin(angle)*minDistance;

				var ax = (targetX - this.yars.sprite.x)*0.75;
				var ay = (targetY - this.yars.sprite.y)*0.75;
				this.yars.sprite.x += ax*this.tickFactor;
				this.yars.sprite.y += ay*this.tickFactor;
				if (--ball.hitCount <= 0) {
					//ball.visible = false;
				}
				return;
			}
		},

		getRandomFetusItem: function(arr) {
			var allActive = [];
			for(var i = 0;i<arr.length;i++) {
				var item = arr[i];
				if (item.getHit()) {
					allActive.push(item);
				}
			}
			return allActive[Math.random() * allActive.length | 0];
		},

		launchBaddy: function (tickFactor) {
			this.baddyTimer = this.baddyTimer + (1*tickFactor);

			if (this.baddyTimer > (this.levelManager.getBaddyTimer()) && (this.baddies.length < s.TOTAL_ALLOWED)) {
				var selected;
				var baddySound = this.playSound("skull_baddy");
				var c;
				//SD: get a random fetus.
				var selected = (this.allowRotation) ? this.getRandomFetusItem(this.circles) : this.getRandomFetusItem(this.activeList);
				if (selected == null) { return }
				if (selected.sprite == null) { return }
				var pt = selected.sprite.localToGlobal(0, 0);
				var baddy = new scope.currentGame.Baddy(selected.width/2, "#FF0000", this.spritesheet);
				baddy.timer = this.levelManager.getBaddySpawnTime();
				baddy.sprite.x = pt.x;
				baddy.sprite.y = pt.y;
				var angle = (Math.atan2(this.yars.sprite.y - baddy.sprite.y, this.yars.sprite.x - baddy.sprite.x) * 180 / Math.PI) + 180;

				baddy.sprite.rotation = 0//this.fixAngle(angle);
				this.baddies.push(baddy);
				this.stage.addChild(baddy.sprite);
				this.baddyTimer = 0;
			}
		},

		fixAngle: function (angle) {
			return ((angle %= 360) < 0) ? angle + 360 : angle;
		},

		checkCollisionCannon: function () {
			//if (this.yars.sprite.x > 360 || this.cannon.fullCharge) { return;  }
			var inside = this.insideCannon;
			var hit = this.calculateDistance(this.cannon, this.yars, 250);
			this.insideCannon = (hit);

			if (this.insideCannon && !inside) {
				//SD:Create Sprites
				for(var i=0;i<this.totalCollected;i++) {
					var s = new BitmapAnimation(this.spritesheet);
					s.gotoAndPlay("Energy");
					s.x = this.yars.sprite.x;
					s.y = this.yars.sprite.y;
					this.stage.addChild(s);
					var targetX = GameLibs.Math2.getRange(this.cannon.sprite.x+this.cannon.width/2, (this.cannon.sprite.x+this.cannon.width/2) + 5);
					var targetY = GameLibs.Math2.getRange(this.cannon.sprite.y+this.cannon.height,this.cannon.sprite.y+this.cannon.height/2 );
					Tween.get(s).to({x:targetX, y:targetY}, 250*(i+1)).call(this.energyToChangeComplete, null, this);
				}
				//this.totalCollected = 0;
				this.yars.full = false;
			}
		},

		energyToChangeComplete: function (tween) {
			this.stage.removeChild(tween._target);
			this.playSound("chargeCannon");

			if (!this.yars.isKilled) {
				this.scoreManager.addScore(5);
			}

			if (!this.cannon.fullCharge) {
				this.cannon.chargeCannon(1);
			}

			if (this.shootBtn != null) {
				this.shootBtn.setDisabled(!this.cannon.fullCharge);
			}
			this.totalCollected--;
		},

		checkCollisionEnergy: function () {
			var c;
			for (var i=0; i<this.energies.length; i++) {
				c = this.energies[i];
				if (c.getHit()) {
					var hit = this.calculateDistance(c, this.yars, 0);
					if (hit) {
						c.sprite.alpha -=  .25;
						if (c.sprite.alpha <= 0) {
							this.playSound("collectEnergy");
							this.stage.removeChild(c.sprite);
							this.yars.full = true;

							var index = this.energies.indexOf(c);
							if (index > -1) { this.energies.splice(index, 1); }
							this.scoreManager.addScore(s.COLLECT_ENERGY);
							this.totalCollected++;
							return;
						}
					}
				}
			}
		},

		createEnergy: function () {
			if (this.killedCircle == null) { return; }

			var energy = new scope.currentGame.Energy(this.spritesheet);
			var pt = this.killedCircle.sprite.localToGlobal(0, 0);
			energy.sprite.x = pt.x;//this.killedCircle.sprite.x;
			energy.sprite.y = pt.y;//this.killedCircle.sprite.y;
			energy.vx = GameLibs.Math2.getRange(-8, 2);
			energy.vy = GameLibs.Math2.getRange(-2, 4);

			this.energies.push(energy);
			this.stage.addChild(energy.sprite);
		},

		setupSwirlTarget: function () {
			this.stopSwirlMovement = true;
			var dx = this.yars.sprite.x - this.swirl.sprite.x;
			var dy = this.yars.sprite.y - this.swirl.sprite.y;
			this.swirl.currentLevel = this.levelManager.currentLevel;
			this.targetAngle = Math.atan2(dy,dx);
		},

		resetSwirl: function () {
			this.qotile_attack.stop();
			this.swirl.active = false;
			this.targetAngle = 0;
			this.swirl.sprite.visible = false;
			this.swirl.sprite.x = this.offsetX;
			this.swirl.sprite.y = this.offsetY;
			this.swirlMoving = false;
			this.stopSwirlMovement = false;
		},

		moveYars: function (tickFactor) {
			var pad = GameLibs.GamePad;
			var player = pad.player;
			var _x = this.yars.sprite.x;
			var _y = this.yars.sprite.y;
			var stepAmount = 10*this.tickFactor;
			var deltaX = 0, deltaY = 0;

			if (player.isButtonDown(pad.UP)) {
				deltaY = -stepAmount;
			}

			if (player.isButtonDown(pad.DOWN)) {
				deltaY = stepAmount;
			}

			if (player.isButtonDown(pad.LEFT)) {
				deltaX = -stepAmount;
			}

			if (player.isButtonDown(pad.RIGHT)) {
				deltaX = stepAmount;
			}

			var usingJoystick = this.moveJoyStick && this.moveJoyStick.buttonActive;
			if (usingJoystick) {
				var joystickDelta = this.moveJoyStick.currentAmount;
				deltaX *= Math.abs(joystickDelta.x);
				deltaY *= Math.abs(joystickDelta.y);
			}

			this.yars.sprite.x += deltaX;
			this.yars.sprite.y += deltaY;
		},

		onAnimationComplete: function () {
			if (this.stage.contains(this.yars.sprite)) {
				this.stage.removeChild(this.yars.sprite);
				this.scoreBoard.removeLife();
				this.yars.kill();
				this.checkLives();
			}
		},

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

		yarsReady: function () {
			this.stage.removeChild(this.yars.sprite);
			this.scoreBoard.removeLife();
			this.totalCollected = 0;
			this.checkLives();
		},

		moveBaddies: function () {
			var b;
			for(var i=0;i<this.baddies.length;i++) {
				b = this.baddies[i];
				b.tick(this.yars, this.tickFactor);
				var hit = this.calculateDistance(this.yars, b, 0);
				//if (this.yars.disabled) { return; }
				if (hit) {
					//Tween.get(this.yars.sprite, {override:true}).to({scaleX:0, scaleY:0}, 550, Ease.quadOut).call(Atari.proxy(this.onAnimationComplete, this));
					if (this.yars.sprite.y < this.h) {
						if (this.stage.contains(this.yars.sprite) && !this.yars.isKilled) {
							this.createExplosion(this.yars.sprite.x, this.yars.sprite.y);
							this.playSound("player_killed");
							this.yars.kill();
						}
					}
					//return;
				}
			}
		},

		checkLives: function () {
			if (this.scoreBoard.lives > -1) {
				this.spawnYars();
			} else {
				this.gameOver();
			}
		},

		spawnYars: function () {
			var l = this.bullets.length;
			var bullet;
			for(var i=0;i<l;i++) {
				bullet = this.bullets[i];
				if (bullet != null) {
					this.bulletBackToPool(bullet);
					this.stage.removeChild(bullet.sprite);
				}
			}
			l = this.baddies.length;
			for(var i=0;i<l;i++) {
				var baddy = this.baddies[i];
				if (baddy != null) {
					this.stage.removeChild(baddy.sprite);
				}
			}
			this.bullets = [];
			this.baddies = [];
			this.yars.reset();
			this.yars.sprite.x = 75;
			this.yars.sprite.y = 300;
			this.stage.addChild(this.yars.sprite);

			this.stage.setChildIndex(this.frontWaterfall.sprite, this.stage.getNumChildren()-1);
			this.stage.setChildIndex(this.waterfallSplash.sprite, this.stage.getNumChildren()-1);
			if (this.shootBtn != null) {
				this.stage.setChildIndex(this.shootBtn.sprite, this.stage.getNumChildren()-1);
				this.stage.setChildIndex(this.moveJoyStick.sprite, this.stage.getNumChildren()-1);
			}
		},

		moveSwirl: function () {
			if (this.isGameOver) { return; }
			if (!this.swirlMoving) { return; }
			var outofbounds = this.checkWalls(this.swirl);
			if (outofbounds) {
				this.resetSwirl();
				return;
			}

			var speed = this.levelManager.getSwirlSpeed();
			var vx = Math.cos(this.targetAngle) * speed*this.tickFactor;
			var vy = Math.sin(this.targetAngle) * speed*this.tickFactor;
			var hit = this.calculateDistance(this.swirl, this.yars, 10);
			if (hit) {
				this.resetSwirl();
				this.playerKilled();
			}

			this.swirl.sprite.rotation = (this.targetAngle * 180/Math.PI) + 180;

			this.swirl.sprite.x += vx;
			this.swirl.sprite.y += vy;
		},

		moveMissile: function() {
			if (this.missile == null && !this.missileActive) {  return; }
			if (this.missile == null) { return; }
			this.missile.sprite.x +=  25 * this.tickFactor;
			var hit = this.checkWalls(this.missile);
			if (hit) {
				//if (this.stage.contains(this.missile)) {

					this.missileActive = false;
					this.stage.removeChild(this.missile.sprite);
					this.missile = null;
					this.qotile.charged = false;
					return;
				//}
			}
			this.checkCollisionYars();
			if (this.swirl.sprite.visible) {
				this.checkCollisionSwirl(this.missile, true);
			}

			this.checkCollisionBossMissile();
			this.checkCollisionMissile(this.missile);
			this.checkCollisionMissileBaddies();
		},

		moveBullet: function () {
			var b;
			for(var i=0;i<this.bullets.length;i++) {
				b = this.bullets[i];
				b.sprite.x += b.vx*this.tickFactor;
				b.sprite.y += b.vy*this.tickFactor;
				var hit = this.checkWalls(b);
				if (hit) {
					var index = this.bullets.indexOf(b);
					if (index > -1) {
						this.bullets.splice(index, 1);
						this.bulletBackToPool(b);
					}
					this.stage.removeChild(b.sprite);
					return;
				}
				if (this.swirl.sprite.visible) {
					this.checkCollisionSwirl(b, false);
				}
				if (!this.qotile.isKilled) {
					this.checkCollisionBoss(b, false, "bullet");
				}
				this.checkCollision(b);
				this.checkCollisionBaddies(b);
			}
		},

		moveRings: function () {

			if (!this.levelManager.getLevelType().oscillate) {
				this.containerAngle = 0;
			}
			this.container.y = 20+this.offsetY + Math.sin(this.containerAngle)* 80;
			this.qotile.sprite.y = this.container.y - 30;

			if (!this.stopSwirlMovement) {
				this.swirl.sprite.y = this.qotile.sprite.y;
			}

			var l = this.circles.length;
			var count = 0;

			for (var i=0; i<l; i++) {
				var c = this.circles[i];
				c.tick();
				c.sprite.x = Math.cos(c.angle) *c.outer;
				c.sprite.y = Math.sin(c.angle) *c.outer;
				if (this.allowRotation) {
					if (c.direction == "left") {
						c.angle -=  c.speed;
					} else {
						c.angle +=  c.speed;
					}
				}

				if (c.getHit()) {
					this.checkYars(c);
				}
			}
			this.containerAngle += this.constainerSpeed;
		},

		calculate: function (clip1, clip2, offset) {
			var pt = clip1.sprite.localToGlobal(0, 0);
			var dx = clip2.sprite.x - pt.x;
			var dy = clip2.sprite.y - pt.y;
			var distance = Math.sqrt(dx*dx+dy*dy);
			var minDistance = clip2.width / 2 + clip1.width / 2;
			return (distance < minDistance + offset) ? true : false;
		},

		calculateDistance: function(clip1, clip2, offset) {
			var dx = clip2.sprite.x - clip1.sprite.x;
			var dy = clip2.sprite.y - clip1.sprite.y;
			var distance = Math.sqrt(dx*dx+dy*dy);
			var minDistance = clip2.width / 2 + clip1.width / 2;
			if (distance < minDistance + offset) {
				return true;
			}
			return false;
		},

		moveCannon: function () {
			if (this.isGameOver) { return; }
			if (this.yars.isKilled) { return; }
			var _y = Math.max(0,Math.min((this.yars.sprite.y-this.yars.height/2)-30, this.h - this.cannon.height));
			this.cannon.sprite.y += ( _y - this.cannon.sprite.y) * .015;
			//Tween.get(this.cannon.sprite, {override:true}).to({y:_y}, 550, Ease.bounceOut);
		},

		moveEnergy: function () {
			var gravity = 0;
			var wind = -.045;
			var airFriction = .97;
			var b;

			for (var i=this.energies.length-1; i>=0; i--) {
				b = this.energies[i];
				b.vx +=  wind;
				b.vy +=  gravity;
				b.vx *=  airFriction;
				b.vy *=  airFriction;
				b.sprite.x +=  b.vx*this.tickFactor;
				b.sprite.y +=  b.vy*this.tickFactor;

				if (b.sprite.x - b.width/2 < (this.energyField.sprite.x + this.energyField.width)-20) {
					b.sprite.alpha -= .25;
					b.sprite.y += 5;
					if (b.sprite.alpha < 0) {
						this.energies.splice(i, 1);
						this.stage.removeChild(b.sprite);
					}
				}
			}
		},

		checkScore: function () {
			var score = this.scoreManager.score;
			if (score == this.MILE_STONE_1) {
				this.swirl.minValue /= 3;
				this.swirl.maxValue /= 3;
			} else if (score == this.MILE_STONE_2) {
				this.swirl.resetDuration();
			} else if (score == this.MILE_STONE_3) {
				this.swirl.minValue /= 3;
				this.swirl.maxValue /= 3;
			}
		},

		checkWaterFallSound: function () {
			if (!this.isInsideField) {
				if (this.splashHasPlayed) {
					this.playSound("splashSound");
					this.inWaterfallSound.pause();
				} else {
					this.inWaterfallSound.pause();
				}

				this.playInside = false;
				this.splashHasPlayed = false;
				return;
			}
			this.oldX = this.currentX;
			this.currentX = this.yars.sprite.x;
			if (this.oldX > this.currentX) {
				//LEFT SIDE
				this.dir = -1;
				if (this.isInsideField && !this.splashHasPlayed) {
					this.splashHasPlayed = true;
					this.playSound("splashSound");
				}
			} else if (this.oldX<this.currentX) {
				//RIGHT SIDE
				this.dir = 1;
				if (this.inside && !this.splashHasPlayed) {
					this.splashHasPlayed = true;
					this.playSound("splashSound");
				}
			} else {

				if (!this.playInside) {
					this.inWaterfallSound.resume();
					this.playInside = true;
				}
				this.dir = 0;
				return
			}
		},

		tick: function(tickFactor) {
			this.tickFactor = tickFactor;
			this.emitter.tickFactor = tickFactor;

			if (this.waterfallSplash != null) {
				this.waterfallSplash.tick(tickFactor);
			}


			if (this.touchList.length && this.allowConstantFire) {
				if (this.yars.canFire) {
					this.prepMissile();
				}
			}

			if (!this.isGameOver) {
				this.launchBaddy(tickFactor);
			}

			this.isInsideField = GameLibs.Math2.isBetween(this.yars.sprite.x, 140, 340);
			this.checkWaterFallSound();
			this.yars.disabled = this.isInsideField;

			if (!this.isGameOver) {
				this.moveYars(tickFactor);
				this.moveMissile();
				this.moveBullet();
				this.moveBaddies();
				this.checkBounds(this.yars);
				this.checkCollisionCannon();
				this.checkCollisionEnergy();
				this.moveRings();
				this.moveEnergy();
				this.qotile.tick();
				this.swirl.tick();
			}

			this.energyField.tick();
			this.energyField2.tick();
			this.frontWaterfall.tick();

			var angle;
			if (!this.gameInfo.touchEnabled) {
				var dx = this.currentStageX - this.yars.sprite.x;
				var dy = this.currentStageY - this.yars.sprite.y;
				angle = Math.atan2(dy, dx) * 180/Math.PI;

				this.yars.arm.rotation = (this.hasPressed) ? angle : 10;
				this.yars.backArm.rotation = (this.hasPressed) ? angle : 10;
			}
			this.yars.isBackwards = (GameLibs.Math2.isBetween(this.yars.arm.rotation, -180, -90) || GameLibs.Math2.isBetween(this.yars.arm.rotation, 90, 180)) ? true : false;

			if (!this.isGameOver) {
				this.yars.tick(angle, this.tickFactor);
				this.checkScore();
			}

			if (this.swirl.active && !this.swirlMoving) {
				this.qotile.charge();
			}
			if (!this.isGameOver) {
				if (this.qotile.charged) {
					this.qotile_attack = this.playSound("qotile_attack");
					this.qotile.charged = false;
					this.setupSwirlTarget();
					this.swirlMoving = true;
					this.swirl.sprite.visible = true;
				}
			}
			this.moveSwirl();
			this.moveCannon();
		}
	}

	scope.currentGame.YarsRevenge2 = YarsRevenge2;
}(window.Atari));