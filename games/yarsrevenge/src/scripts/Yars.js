(function(scope) {

	function Yars(spritesheet, callback) {
		this.spritesheet = spritesheet;
		this.callback = callback;
		this.initialize();
	}

	var s = Yars;
	s.EMPTY_FORWARD = "HeadEmpty";
	s.FULL_FORWARD = "HeadCharged";
	s.EMPTY_BACKWARD = "HeadBackEmpty";
	s.FULL_BACKWARD = "HeadBackCharged";
	s.HANDLE_IDLE = "YarHandIdle";
	s.HAND_SHOOT= "YarHandFire";
	s.FIRE_DELAY = 20;

	var p = Yars.prototype = {
		sprite:null,
		position: null,
		radius:5,
		vx:0,
		vy:0,
		x:0,
		y:0,
		dx:null,
		dy:null,
		width:null,
		height:null,
		canRemove:null,
		isKilled:null,
		disabled:null,
		ss:null,
		json:null,
		full:null,
		body:null,
		frontLeg:null,
		backLeg:null,
		oldX:null,
		assets:null,
		swing:null,
		head:null,
		frontArm:null,
		backArm:null,
		hand:null,
		arm:null,
		headSpriteSheet:null,
		bodySpriteSheet:null,
		isBackwards:null,
		pieces:null,
		canFire:null,
		numTicks:null,
		lastFire:null,
		oldYarsX:null,
		oldYarsY:null,
		currentX:null,
		currentY:null,
		tween:null,
		allowTween:null,
		sprite1:null,
		spritesheet:null,

		initialize: function() {
			this.full = false;
			this.oldYarsX = 0;
			this.oldYarsY = 0;
			this.currentX = 0;
			this.currentY = 0;
			this.allowTween = false;

			this.pieces = [];
			this.swing = 0;
			this.oldX = 0;
			this.width = 116;
			this.height = 95;
			this.numTicks = 0;
			this.lastFire = 0;
			this.lastFire = new Date().getTime();
			this.canFire = true;

			this.isBackwards = false;
			this.sprite = new Container();
			this.sprite1 = new Container();

			this.arm = new Container();
			this.body = new BitmapAnimation(this.spritesheet);
			this.body.regX = 39;
			this.body.regY = 31;
			this.body.gotoAndPlay("YarBody");
			this.spritesheet.getAnimation("YarBody").next = "YarBody";

			this.head = new BitmapAnimation(this.spritesheet);
			this.head.x = 46;
			this.head.y = 5;
			this.head.regX = 8;
			this.head.regY = 13;
			this.head.gotoAndStop(s.EMPTY_FORWARD);

			this.frontLeg = new BitmapAnimation(this.spritesheet);
			this.frontLeg.x = 4;
			this.frontLeg.y = 23;
			this.frontLeg.regX = 8;
			this.frontLeg.regY = 7;
			this.frontLeg.gotoAndStop("YarLegFront");

			this.backLeg = new BitmapAnimation(this.spritesheet);
			this.backLeg.x = 4;
			this.backLeg.y = 4;
			this.backLeg.gotoAndStop("YarLegBack")

			this.frontLeg.regX = 9;
			this.frontLeg.regY = 7;

			this.frontArm = new BitmapAnimation(this.spritesheet);
			this.frontArm.gotoAndStop("YarArmFront");

			this.backArm = new BitmapAnimation(this.spritesheet);
			this.backArm.x = 25;
			this.backArm.y = 7;
			this.backArm.regX = 9;
			this.backArm.regY = 8;
			this.backArm.gotoAndStop("YarArmBack");

			this.hand = new BitmapAnimation(this.spritesheet);
			//this.spritesheet._data[s.HAND_SHOOT].frequency = ;
			this.hand.onAnimationEnd = Atari.proxy(this.handleShootComplete, this, this.hand);
			this.hand.x = 55;
			this.hand.y = 27//9;
			this.hand.regX = 9;
			this.hand.regY = 8;
			this.hand.gotoAndStop(s.HANDLE_IDLE);

			this.arm.x = 18;
			this.arm.y = 12;
			this.arm.regX = 6;
			this.arm.regY = 7;
			this.arm.addChild(this.frontArm);
			this.arm.addChild(this.hand);

			this.sprite1.addChild(this.backLeg);
			this.sprite1.addChild(this.backArm);
			this.sprite1.addChild(this.body);
			this.sprite1.addChild(this.frontLeg);
			this.sprite1.addChild(this.arm);
			this.sprite1.addChild(this.head);
			this.sprite.addChild(this.sprite1);
			this.sprite.width = this.width;
			this.sprite.height = this.height;
			this.setPosition();

		},

		start: function () {
			this.body.gotoAndPlay("YarBody");
			this.spritesheet.getAnimation("YarBody").next = "YarBody";
		},

		handleShootComplete: function () {
			this.hand.gotoAndPlay(s.HANDLE_IDLE);
		},

		fire: function () {
			this.canFire = false;
			this.lastFire = this.numTicks;
			this.hand.gotoAndPlay(s.HAND_SHOOT);
		},

		setPosition: function () {
			var l = this.sprite1.children.length;
			for(var i=0;i<l;i++) {
				var bodyPart = this.sprite1.children[i];
				var angle = Math.random() * -45;
				var range = Math.random() * -20;
				bodyPart.vx = Math.cos(angle) + range;
				bodyPart.vy = Math.sin(angle) + range;
				bodyPart.r = Math.random() * 5;
				bodyPart.alpha = 1;
				this.pieces.push(bodyPart);
			}
		},

		tick: function (angle, tickFactor) {
			if (this.isKilled) {
				var l = this.pieces.length;
				for(var i=0;i<l;i++) {
					var bodyPart = this.pieces[i];
					if (bodyPart.alpha == 0) { continue; }
					bodyPart.vx += -0.52;
					bodyPart.vy += (.98)* tickFactor;
					bodyPart.vy *= 0.98;
					bodyPart.x += bodyPart.vx;
					bodyPart.y += bodyPart.vy;
					bodyPart.rotation += bodyPart.r;
					bodyPart.alpha -= 0.02;
					if (bodyPart.alpha < 0.02) {
						bodyPart.alpha = 0;
						if (i == l-1) {
							this.callback();
						}
					}
				}
				return;
			}

			this.numTicks = this.numTicks + (1*tickFactor);

			if (this.lastFire == 0 || this.numTicks > this.lastFire + s.FIRE_DELAY) {
				this.canFire = true;
			}

			var frame
			if (!this.isBackwards) {
				frame = (this.full) ? s.FULL_FORWARD : s.EMPTY_FORWARD;
			} else {
				frame = (this.full) ? s.FULL_BACKWARD : s.EMPTY_BACKWARD;
			}

			if (this.isBackwards) {
				this.sprite1.setChildIndex(this.head, this.sprite1.children.length-1);
				this.head.rotation =0;
				this.head.x = 27;

			} else {
				this.sprite1.setChildIndex(this.head, this.sprite1.children.length-2);
				this.head.regX = 8;
				this.head.regY = 13;
				this.head.rotation = Math.max(-30, Math.min(angle, 30));
				this.head.x = 38;
				this.head.y = 0;
			}

			this.head.gotoAndStop(frame);

			this.frontLeg.rotation += (this.sprite.x - this.oldX) * 0.7;
			this.backLeg.rotation += (this.sprite.x - this.oldX) * 0.7;
			this.swing = (this.swing * 0.8) + (-(this.frontLeg.rotation / 50));
			this.frontLeg.rotation  = Math.max(-90, Math.min((this.frontLeg.rotation + this.swing), 90));
			this.backLeg.rotation  = Math.max(-90, Math.min((this.backLeg.rotation + this.swing), 90));

			var dirX = this.getDirX();
			var dirY = this.getDirY();
			if ((dirX && dirY)) {
				Tween.get(this.sprite1, {loop:true}).to({y:this.sprite1.y+10}, 500, Ease.quadInOut).to({y:this.sprite1.y}, 500, Ease.quadInOut);
			} else {
				Tween.removeTweens(this.sprite);
			}

			this.oldX = this.sprite.x;
		},

		getDirX: function () {
			this.oldYarsX = this.currentX;
			this.currentX = this.sprite1.x;
			var isAllowed = false;
			if (this.oldYarsX > this.currentX) {
				isAllowed = false;

			} else if (this.oldYarsX < this.currentX) {
				isAllowed = false;
			} else {
				isAllowed = true;
			}
			return isAllowed;
		},

		getDirY: function () {
			this.oldYarsY = this.currentY;
			this.currentY = this.sprite1.y;
			var isAllowed = false;
			if (this.oldYarsY > this.currentY) {
				isAllowed = false;
			} else if (this.oldYarsY < this.currentY) {
				isAllowed = false;
			} else {
				isAllowed = true;
			}
			return isAllowed;
		},

		getRotation: function() {
			return this.sprite.rotation;
		},

		rotation: function(value) {
			this.sprite.rotation = value;
		},

		kill: function () {
			this.full = false;
			this.isKilled = true;
			this.canFire = false;
		},

		reset: function ()  {
			this.full = false;
			this.pieces = [];
			this.body.x = 0;
			this.body.y = 0;
			this.head.x = 46;
			this.head.y = 5;
			this.frontLeg.x = 4;
			this.frontLeg.y = 23;
			this.backLeg.x = 4;
			this.backLeg.y = 4;
			this.backArm.x = 25;
			this.backArm.y = 7;
			this.hand.x = 55;
			this.hand.y = 27;
			this.arm.x = 18;
			this.arm.y = 12;
			this.canFire = true;
			this.body.rotation = 0;
			this.head.rotation = 0;
			this.frontLeg.rotation = 0;
			this.backLeg.rotation = 0;
			this.backArm.rotation = 0;
			this.hand.rotation = 0;
			this.arm.rotation = 0;
			this.hand.rotation = 0;
			this.setPosition();
			this.isKilled = false;

			this.body.gotoAndPlay("YarBody");
			this.spritesheet.getAnimation("YarBody").next = "YarBody";
		}
	}

	scope.currentGame.Yars = Yars;

}(window.Atari));