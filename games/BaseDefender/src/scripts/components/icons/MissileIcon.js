(function(scope) {
 
	MissileIcon = function(stage, player, weaponTool, mainGame)
	{
		this.offsetX = 0;
		this.offsetY = 0;
		
		this.initialize(stage, player, weaponTool, mainGame);		
	}
 	MissileIcon.prototype = new scope.Icon(); 
	MissileIcon.prototype.Container_initialize = MissileIcon.prototype.initialize;
	MissileIcon.prototype.Container_tick = MissileIcon.prototype.tick; 
	
 	MissileIcon.prototype.initialize = function(stage, player, weaponTool, mainGame)
	{
 		this.addIcon();
		this._createUpgradeCost();
	}
	MissileIcon.prototype.tick = function()
	{
		this.Container_tick();
	}
	MissileIcon.prototype.addIcon = function()
	{
 		var spritesheet = new GameLibs.SpriteSheetWrapper(scope.ImageManager.icons);
		this.icon = this.createBitmap("MissileIcon", spritesheet );
		this.icon.name =  "MissileIcon"; 	
		this.icon.className = "LightTurret";
 		this.icon.width = 77;
		this.icon.height = 79;
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
	
	scope.MissileIcon = MissileIcon;

}(window.Atari.currentGame))	