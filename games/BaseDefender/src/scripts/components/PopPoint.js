(function(scope) {

	function PopPoint(value) {
		this.initialize(value);
	}

	var s = PopPoint;
	s.TIMER = 300;

	var p = PopPoint.prototype = {
		sprite:null,
		display:null,
		bg:null,
		width:null,
		height:null,
		duration:null,
		showing:null,

		initialize: function(value) {
			this.value = value;
			this.sprite = new Container();
			this.duration = 300;
			this.spritesheet_digits  = new GameLibs.SpriteSheetWrapper(scope.ImageManager._digit);
		
			var str = value;
			if(value){
				for(var i = str.length - 1; i >= 0; i--)
				{
					var n = Number(str[i]);
					var frame = this.createBitmap(str[i],this.spritesheet_digits);
					frame.x = this.x + offsetX;
					frame.y = this.y + offsetY;
					frame.scale = 0.5;
					this.sprite.addChild(frame);
					if(frame) offsetX -= scope.ImageManager._digit["frames"][ str[i] ][2] ;
				}
			}
			/*
			this.display = new Text("Level 0", "12px "+ Atari.Fonts.DEMI, "#FFFFFF");
 			this.display.x = 0;
			this.display.y = 0;
 
 			this.visible = false;
 			this.sprite.addChild(this.display);
			*/
			this.sprite.alpha = 0;

		},
		createBitmap : function(name, spriteSheet) {	
 
			var sprite =  new  createjs.BitmapAnimation( spriteSheet );
			sprite.gotoAndStop(name);
	  
			return sprite;
		}, 	
		show: function (duration) {
			if (this.showing) { return }
			this.showing = true;
			this.duration = duration;
			Tween.get(this.sprite).to({alpha:1,x:10,y:15}, this.duration).call(this.handleShowComplete, null, this)
		},

		handleShowComplete: function () {
			this.showing = false;
			Tween.get(this.sprite).to({alpha:0,x:20,y:0}, this.duration/2);
		},

		setText: function (value) {
 			if(this.sprite){
				this.sprite.removeAllChildren();
			}
			this.value = value;
			var str = value;
 			for(var i = str.length - 1; i >= 0; i--)
			{
				var n = Number(str[i]);
  				var frame = this.createBitmap(str[i],this.spritesheet_digits);
 				frame.x = this.x + offsetX;
				frame.y = this.y + offsetY;
				this.sprite.addChild(frame);
				if(frame) offsetX -= scope.ImageManager._digit["frames"][ str[i] ][2] ;
			}
		}
	}

	scope.currentGame.PopPoint = PopPoint;

}(window.Atari));