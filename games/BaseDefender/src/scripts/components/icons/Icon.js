(function(scope) {
 
	Icon = function(stage, player, weaponTool, mainGame)
	{
		this.offsetX = 0;
		this.offsetY = 0;
		
		this.initialize(stage, player, weaponTool, mainGame);		
	}
 	Icon.prototype = new createjs.Container(); 
	Icon.prototype.Container_initialize = Icon.prototype.initialize;
	Icon.prototype.Container_tick = Icon.prototype._tick; 
	Icon.prototype.initialize = function(stage, player, weaponTool, mainGame)
	{
		this.Container_initialize();
		
		this.mainGame = mainGame;
		this.name =  UID.get(); 	
		this.stage = stage;
 		this.player = player;	
		this.weaponTool = weaponTool;	
		
		this._createUpgradeCost();
	}
	Icon.prototype.addIcon = function()
	{
	}
	Icon.prototype._createUpgradeCost = function()
	{	
		this.upgradeDigit = new createjs.Container();
		this.spritesheet_yellowdigit  = new GameLibs.SpriteSheetWrapper(scope.ImageManager.yellow_digit);
		this.addChild(this.upgradeDigit);
 	}
	Icon.prototype.tick = function()
	{
 		if(this.upgradeDigit){
			this.upgradeDigit.removeAllChildren();
		}else{
			return ;
		} 
  		var str = this.icon.tmp_instance.getLevel(0).cost.toString();
 		var offsetX =  45 - (35-str.length*7)*0.5;
		var offsetY =  30 ;
		var scale = 0.4;
		for(var i = str.length - 1; i >= 0; i--)
		{
 			var frame = this.createBitmap(""+str[i]-1 ,this.spritesheet_yellowdigit);
			frame.scaleX = frame.scaleY = scale;
			frame.x = offsetX;
			frame.y = offsetY;
			this.upgradeDigit.addChild(frame);
			offsetX -= scope.ImageManager.yellow_digit["frames"][ str[i] ][2] *  scale -1;
		}
 	}
	Icon.prototype.createBitmap = function(name, sprite) 
	{	
		var sprite =  new  createjs.BitmapAnimation( sprite || this.spritesheet );
		sprite.gotoAndPlay(name);
		sprite.mouseEnabled = true;
 
		return sprite;
	} 
	Icon.prototype.animateCanCreate = function(is_enable)
	{
		if(is_enable){
			this.icon.alpha = 1;
		}else{
			this.icon.alpha = 0.5;
		}
	}
	
	scope.Icon = Icon;

}(window.Atari.currentGame))	