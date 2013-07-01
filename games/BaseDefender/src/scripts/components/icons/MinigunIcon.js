(function(scope) {
 
	MinigunIcon = function(stage, player, weaponTool, mainGame)
	{
		this.offsetX = 0;
		this.offsetY = 0;
		
		this.initialize(stage, player, weaponTool, mainGame);		
	}
 	MinigunIcon.prototype = new scope.Icon(); 
	MinigunIcon.prototype.Container_initialize = MinigunIcon.prototype.initialize;
	MinigunIcon.prototype.Container_tick = MinigunIcon.prototype.tick; 
	
 	MinigunIcon.prototype.initialize = function(stage, player, weaponTool, mainGame)
	{
 		this.addIcon();
		this._createUpgradeCost();
	}
	MinigunIcon.prototype.tick = function()
	{
		this.Container_tick();
	}
	MinigunIcon.prototype.addIcon = function()
	{
 		var spritesheet = new GameLibs.SpriteSheetWrapper(scope.ImageManager.icons);
		this.icon = this.createBitmap("MinigunIcon", spritesheet );
		this.icon.name =  "MinigunIcon"; 	
		this.icon.className = "Gatling";
 		this.icon.width = 46;
		this.icon.height = 33;
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
	
	scope.MinigunIcon = MinigunIcon;

}(window.Atari.currentGame))	