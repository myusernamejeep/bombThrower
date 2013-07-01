
(function(scope) {
 
	TeslaIcon = function(stage, player, weaponTool, mainGame)
	{
		this.offsetX = 0;
		this.offsetY = 0;
		
		this.initialize(stage, player, weaponTool, mainGame);		
	}
 	TeslaIcon.prototype = new scope.Icon(); 
	TeslaIcon.prototype.Container_initialize = TeslaIcon.prototype.initialize;
	TeslaIcon.prototype.Container_tick = TeslaIcon.prototype.tick; 
	
 	TeslaIcon.prototype.initialize = function(stage, player, weaponTool, mainGame)
	{
 		this.addIcon();
		this._createUpgradeCost();
	}
	TeslaIcon.prototype.tick = function()
	{
		this.Container_tick();
	}
	TeslaIcon.prototype.addIcon = function()
	{
 		var spritesheet = new GameLibs.SpriteSheetWrapper(scope.ImageManager.icons);
		this.icon = this.createBitmap("TeslaIcon", spritesheet );
		this.icon.name =  "TeslaIcon"; 	
		this.icon.className = "TeslaCannon";
 		this.icon.width = 50;
		this.icon.height = 44;
		this.icon.onMouseOver = function(){
			document.body.style.cursor = 'pointer';
		};
		this.icon.onMouseOut = function(){
			document.body.style.cursor = 'default';
		};
		//for create to check can buy this.
 		this.icon.tmp_instance = new scope[this.icon.className](stage);
 
		this.addChild(this.icon);

	}
	
	scope.TeslaIcon = TeslaIcon;

}(window.Atari.currentGame))	