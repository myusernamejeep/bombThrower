(function(scope) {
 
	var ns = scope; 
	var game = ns.game;

	var Cannon = ns.Cannon = function( sheet )
	{	console.debug( sheet);
		this.power = 0;
		this.sheet = sheet;
		//Cannon.superClass.constructor.call(this, props);
		var spritesheet = new GameLibs.SpriteSheetWrapper(this.sheet);
		var sprite  =  new  createjs.BitmapAnimation( spritesheet );
		sprite.gotoAndPlay("default");	
		this.sprite = sprite;
		/*
		var btn = new createjs.MovieClip(null, null, false, {up:0,over:10,down:20, out:0}).set({x:100, y:30});
		stage.addChild(btn);

		var shape = new createjs.Shape(new createjs.Graphics().f("#f00").dr(0,0,100,30));
		var u = new createjs.Text("Up","32px Arial","#000000").set({x:-15, y:7});
		var o = new createjs.Text("Over","32px Arial","#60609f").set({x:-27, y:8});
		var d = new createjs.Text("Down","32px Arial","#cf3060").set({x:-31, y:6});
		u.hitArea = o.hitArea = d.hitArea = shape;

		btn.timeline.addTween(
			createjs.Tween.get(u).wait(10).to({_off:true}),
			createjs.Tween.get(o).to({_off:true}).wait(10).to({_off:false}).wait(10).to({_off:true}),
			createjs.Tween.get(d).to({_off:true}).wait(20).to({_off:false})
		);

		var helper = new createjs.ButtonHelper(btn);
*/
		//this.stop();
	};
	Q.inherit(Cannon, BitmapAnimation );

	Cannon.prototype.setPower = function(power, increase)
	{	
		if(increase) power += this.power;
		power = power > 7 ? 1 : power < 1 ? 7 : power;	
		if(this.power == power) return;
		
		this.power = power;
		this.setType(ns.R.cannonTypes[power]);
	};

	Cannon.prototype.setType = function(type)
	{
		Q.merge(this, type, true);
		Q.merge(this, type.mixin, false);
		
		//this.setDrawable(type.image);
		//this._frames.length = 0;
		//this.addFrame(type.frames);
		var spritesheet = new GameLibs.SpriteSheetWrapper(type);
		var sprite  =  new  createjs.BitmapAnimation( spritesheet );
		sprite.gotoAndPlay("default");	
		this.sprite = sprite;
		//this.gotoAndStop(0);
	};

	Cannon.prototype.fire = function(degree)
	{
		this.rotation = degree;
		//this.gotoAndPlay(0);
		this.sprite.gotoAndPlay("default");	
	};

	scope.Cannon = Cannon;

}(window.Atari.currentGame))