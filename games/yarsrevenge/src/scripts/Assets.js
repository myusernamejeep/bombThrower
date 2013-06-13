(function(scope){

	function Assets() {}

    Assets.textureSheet; //An Easel SpriteSheet which is injected externally by the main game class, it holds all texturePacker assets for the game.

    Assets.getBitmap = function(name, center, play){

        var spriteSheet = Assets.textureSheet;
		try {
			var bmp = new BitmapAnimation(spriteSheet);
	        if(play){
	            bmp.gotoAndPlay(name);
	        } else {
	            bmp.gotoAndStop(name);
	        }

	        //Inject type
	        bmp.type = name;

	        //Inject width/height
	        if(bmp.spriteSheet._frameWidth != 0){
	            bmp.width = bmp.spriteSheet._frameWidth;
	            bmp.height = bmp.spriteSheet._frameHeight;
	        } else {
	            try {
	                var frame = bmp.spriteSheet._frames[bmp.currentFrame];
	                bmp.width = frame.rect.width;
	                bmp.height = frame.rect.height;
	            } catch(e){
	                throw(e);
	            }
	        }
	        //Center registration point?
	        if(center){
	            bmp.regX = bmp.width/2;
	            bmp.regY = bmp.height/2;
	        } else {
		        bmp.regX = 0;
	            bmp.regY = 0;
	        }
	        return bmp;
		} catch(e){
			throw("ERROR: Unable to create bitmap name: " + name);
		}

    }

    Assets.getBitmapAnimation = function(name, center){
        var bmp = Assets.getBitmap(name, center, true);
        bmp.gotoAndPlay(name);
        return bmp;
    }

    scope.Assets = Assets;
}
)(window.Atari.currentGame)