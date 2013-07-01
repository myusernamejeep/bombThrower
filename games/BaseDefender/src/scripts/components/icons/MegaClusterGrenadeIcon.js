  
(function(scope) {
 
	MegaClusterGrenadeIcon = function(stage, player, weaponTool, mainGame)
	{
		this.offsetX = 0;
		this.offsetY = 0;
		
		this.initialize(stage, player, weaponTool, mainGame);		
	}
 	MegaClusterGrenadeIcon.prototype = new scope.Icon(); 
	MegaClusterGrenadeIcon.prototype.Container_initialize = MegaClusterGrenadeIcon.prototype.initialize;
	MegaClusterGrenadeIcon.prototype.Container_tick = MegaClusterGrenadeIcon.prototype.tick; 
	
 	MegaClusterGrenadeIcon.prototype.initialize = function(stage, player, weaponTool, mainGame)
	{
 		this.addIcon();
		this._createUpgradeCost();
	}
	MegaClusterGrenadeIcon.prototype.tick = function()
	{
		this.Container_tick();
	}
	MegaClusterGrenadeIcon.prototype.addIcon = function()
	{
 		var spritesheet = new GameLibs.SpriteSheetWrapper(scope.ImageManager.icons);
		this.icon = this.createBitmap("MegaClusterGrenadeIcon", spritesheet );
		this.icon.name =  "MegaClusterGrenadeIcon"; 	
		this.icon.className = "LightTurret";
 		this.icon.width = 42;
		this.icon.height = 60;
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
	
	scope.MegaClusterGrenadeIcon = MegaClusterGrenadeIcon;

}(window.Atari.currentGame))	