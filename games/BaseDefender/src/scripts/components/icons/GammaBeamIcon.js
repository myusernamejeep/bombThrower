(function(scope) {
 
	GammaBeamIcon = function(stage, player, weaponTool, mainGame)
	{
		this.offsetX = 0;
		this.offsetY = 0;
		
		this.initialize(stage, player, weaponTool, mainGame);		
	}
 	GammaBeamIcon.prototype = new scope.Icon(); 
	GammaBeamIcon.prototype.Container_initialize = GammaBeamIcon.prototype.initialize;
	GammaBeamIcon.prototype.Container_tick = GammaBeamIcon.prototype.tick; 
	
 	GammaBeamIcon.prototype.initialize = function(stage, player, weaponTool, mainGame)
	{
 		this.addIcon();
		this._createUpgradeCost();
	}
	GammaBeamIcon.prototype.tick = function()
	{
		this.Container_tick();
	}
	GammaBeamIcon.prototype.addIcon = function()
	{
 		var spritesheet = new GameLibs.SpriteSheetWrapper(scope.ImageManager.icons);
		this.icon = this.createBitmap("GammaBeamIcon", spritesheet );
		this.icon.name =  "GammaBeamIcon"; 	
		this.icon.className = "HeavyTurret";
 		this.icon.width = 43;
		this.icon.height = 45;
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
	
	scope.GammaBeamIcon = GammaBeamIcon;

}(window.Atari.currentGame))	