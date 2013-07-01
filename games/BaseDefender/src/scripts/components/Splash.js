(function(scope) {

    function Splash(spritesheet) {
	    this.spritesheet = spritesheet;
	    this.emitter;

        this.initialize();
    }

	Splash.prototype = {
        sprite:null,
	    particleList:null,
	    emitter:null,
		tickCount:null,
		particleContainer:null,
		emitPoint: null,

        initialize: function() {
	        this.value = 5;
	        this.sprite = new Container();
	        this.tickCount = 0;

	        this.particleProps = {
		        speed: 5,
		        gravity: 0.2,
		        life: 0.8,
		        rotation: false,
		        angle: 270,
		        spread: 90
	        };
	        this.emitPoint = new Point();
		    var p1 = new BitmapAnimation(this.spritesheet);
	        p1.gotoAndStop("WaterfallSplash");
		    this.particleList = [p1];

	        this.particleContainer = new Container();
	        this.sprite.addChild(this.particleContainer);

        },

	    tick: function (tickFactor) {
		    if(this.sprite == null) { return; }
		    if(!this.emitter && this.sprite){
			   this.emitter = new GameLibs.ParticleEmitter(this.particleContainer);
			   this.emitter.tickFactor = tickFactor;
		    }
			if (++this.tickCount % 2 == 0) {// % (Math.random() * 4 + 2 | 0) == 0) {
				this.emitter.emitMultiple(this.emitPoint, 1, this.particleProps, this.particleList);
			}

	    }

    }

    scope.currentGame.Splash = Splash;
}(window.Atari));