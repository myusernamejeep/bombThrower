(function(scope) {

	var ns = scope;
	var game = ns.game ;
	
    var Button = function(sheet,up,down) {
        this.initialize(sheet, up,down)
    },p = Button.prototype = new DisplayObject;
 
    p.DisplayObject_initialize = p.initialize;
 
    p.initialize = function(sheet, up,down) {
        this.DisplayObject_initialize();
	 
		/*
		var spriteSheet = new createjs.SpriteSheet(sheet);
		var button = new createjs.BitmapAnimation(spriteSheet);
		var helper = new createjs.ButtonHelper(button, "normal", "hover", "clicked");

 		button.x = x;
		button.y = y;
		button.gotoAndStop("normal");*/
		var spritesheet = new GameLibs.SpriteSheetWrapper( sheet );
		var button  =  new  createjs.BitmapAnimation( spritesheet );
 
		button.gotoAndPlay(up);	
		button.onMouseOver = function()
        {
            this.gotoAndStop(up);
            game.stage.update();
        }
        button.onMouseOut = function()
        {
            this.gotoAndStop(up);
            //this.stage.update();
        }
        button.onPress = function()
        {
            this.gotoAndStop(down);
            //game.stage.update();
        }
 
        button.onMouseUp = function()
        {
            this.gotoAndStop(up);
			//game.stage.update();
        } 
        button.onClick = function()
        {
            /* because onMouseUp is not working in this easelJS version ..put the code here */
            this.gotoAndStop(down);
            //game.stage.update();
        };
		this.button = button;
    };
  
	scope.Button = Button;
	
})(window.Atari.currentGame);