(function(scope) {
 
	var ns = scope;
	var game = ns.game ;

	ScoreBar = function(player, gameInfo, enemyFactory)
	{
		this.initialize(player, gameInfo, enemyFactory);	
		this.name =  UID.get(); 	
		
		this.offsetX = 60;
		this.offsetY = 30;
		
	}
 
	ScoreBar.prototype = new createjs.Container(); // inherit from Container
	ScoreBar.prototype.Container_initialize = ScoreBar.prototype.initialize;
	ScoreBar.prototype.Container_tick = ScoreBar.prototype._tick; 
	
 	ScoreBar.prototype.initialize = function(player, gameInfo, enemyFactory){
		this.Container_initialize();
		
		this.player = player;
		this.gameInfo = gameInfo;
		this.enemyFactory = enemyFactory;
		
		this._create();
	}	
	ScoreBar.prototype.createBitmap = function(name, spriteSheet) {	
 
		var sprite =  new  createjs.BitmapAnimation( spriteSheet );
		sprite.gotoAndStop(name);
  
		return sprite;
	} 
	ScoreBar.prototype._create = function()
	{
		this.spritesheet  = new GameLibs.SpriteSheetWrapper(scope.ImageManager._icon);
		
		//money icon
		this._moneyIcon = this.createBitmap('money', this.spritesheet); // new Bitmap(ImageManager.icon.src, ImageManager.icon.money);
		this.addChild(this._moneyIcon);
		//console.debug('this._moneyIcon', this._moneyIcon);
			
		//life icon
		this._lifeIcon = this.createBitmap('life', this.spritesheet);
 		this._lifeIcon.x = this.gameInfo.width - 150;
		this._lifeIcon.y = 0;
		this.addChild(this._lifeIcon);
 
		//digits
		this.spritesheet_digits  = new GameLibs.SpriteSheetWrapper(scope.ImageManager._digit);
		this._digits = this.createBitmap("0",this.spritesheet_digits);
		this.addChild(this._digits);
		this._digits.visible = false; 
		
		//round title
		this.spritesheet_eng  = new GameLibs.SpriteSheetWrapper(scope.ImageManager._eng);
		
		this._roundTitle = this.createBitmap("R",this.spritesheet_eng);
		this._txt_roundTitle = ['R','O','U','N','D'];
 
		this._pausedTitle = this.createBitmap("P",this.spritesheet_eng);
		this._txt_pausedTitle = ['P','A','U','S','E','D'];
 
		this.money = new createjs.Container();
		this.addChild(this.money);
		
		this._lifeContainer = new createjs.Container();
		this.addChild(this._lifeContainer);
		
		this.scoreContainer  = new createjs.Container();
		this.addChild(this.scoreContainer );
		
		this._pausedTitleContainer = new createjs.Container();
		this.addChild(this._pausedTitleContainer );
		
		this._roundTitleContainer = new createjs.Container();
		this.addChild(this._roundTitleContainer );
		/*
		// draw round text
		var w = this.gameInfo.width; // this.getStage().getStageWidth();
		var str = this.player.round.toString();
		var offsetX = w - 120 - str.length*16 >> 1;
		for(var i = 0; i < this._txt_roundTitle.length; i++)
		{
  			var frame = this.createBitmap(this._txt_roundTitle[i],this.spritesheet_eng);
  			frame.x = this.x + offsetX;
			frame.y = this.y + 75;
 			this._roundTitleContainer.addChild(frame);
			offsetX += scope.ImageManager._eng["frames"][ this._txt_roundTitle[i].charCodeAt(0) - 65 ][2] - 5;
			//console.log(' **** frame',frame, offsetX, scope.ImageManager._eng["frames"], this._txt_roundTitle[i].charCodeAt(0) - 65, scope.ImageManager._eng["frames"][ this._txt_roundTitle[i].charCodeAt(0) - 65 ]);
		}
		
		offsetX += 7;
		for(var i = 0; i < str.length; i++)
		{
			var n = Number(str[i]);
			var frame = this._roundTitle.clone();
			var frame = this.createBitmap(str[i],this.spritesheet_digits);
			frame.x = this.x + offsetX;
			frame.y = this.y + 75;
			this._roundTitleContainer.addChild(frame);
			offsetX += scope.ImageManager._digit["frames"][ str[i]  ][2]  + 8;
		}*/
	}

	ScoreBar.prototype.tick = function(context)
	{
		this.Container_tick();
 		var w = this.gameInfo.width; // this.getStage().getStageWidth();
		var offsetX = this.offsetX;
		var offsetY = this.offsetY;
		
		//render money
		var str = this.player.money.toString();
		if(this.money){
			this.money.removeAllChildren();
		}			
 		for(var i = 0; i < str.length; i++)
		{
			var n = Number(str[i]);
			var frame = this._digits.clone();
			frame.visible = true; 
			frame.gotoAndStop(str[i]); //._frames[n];
			frame.x = this.x + offsetX;
			frame.y = this.y + offsetY;
			this.money.addChild(frame);
			offsetX += scope.ImageManager._digit["frames"][ str[i] ][2];
		}
		 
		if(this.enemyFactory.countDown <= this.enemyFactory.roundTime)
		{			
			//render count down
			str = this.enemyFactory.countDown.toString();
		}else
		{
			//render score	
			str = this.player.score.toString();	
		}
		
		if(this.scoreContainer){
			this.scoreContainer.removeAllChildren();
		}
		offsetX = w - str.length*16 >> 1;
		for(var i = 0; i < str.length; i++)
		{
			var n = Number(str[i]);
 			var frame = this.createBitmap(str[i],this.spritesheet_digits);
 			frame.x = this.x + offsetX;
			frame.y = this.y + offsetY;
			this.scoreContainer.addChild(frame);
			offsetX += scope.ImageManager._digit["frames"][ str[i] ][2] ;
		}
		  
		if(createjs.Ticker.getPaused())
		{
			if(this._roundTitleContainer){
				this._roundTitleContainer.removeAllChildren();
			}
			//render paused title
			offsetX = w - 120 >> 1;
			for(var i = 0; i < this._txt_pausedTitle.length; i++)
			{
				var frame = this._pausedTitle.clone();
				frame.visible = true; 
				frame.gotoAndStop(this._txt_pausedTitle[i]); 
				frame.x = this.x + offsetX;
				frame.y = this.y + 75;
				this._pausedTitleContainer.addChild(frame);
				offsetX += scope.ImageManager._eng["frames"][ this._txt_pausedTitle[i].charCodeAt(0) - 65 ][2]  ;
			}
		}else
		{	
			if(this._pausedTitleContainer){
				this._pausedTitleContainer.removeAllChildren();
			}
			//render round title
			str = this.player.round.toString();
			offsetX = w - 120 - str.length*16 >> 1;
			for(var i = 0; i < this._txt_roundTitle.length; i++)
			{
				var frame = this._roundTitle.clone();
				frame.visible = true; 
				frame.gotoAndStop(this._txt_roundTitle[i]); //._frames[n];
				frame.x = this.x + offsetX;
				frame.y = this.y + 75;
				this._roundTitleContainer.addChild(frame);
				offsetX += scope.ImageManager._eng["frames"][ this._txt_roundTitle[i].charCodeAt(0) - 65 ][2] ;
			}
			//render round
			offsetX += 7;
			for(var i = 0; i < str.length; i++)
			{
				var n = Number(str[i]);
 				var frame = this.createBitmap(str[i],this.spritesheet_digits);
 				frame.x = this.x + offsetX;
				frame.y = this.y + 75;
				this._roundTitleContainer.addChild(frame);
				offsetX += scope.ImageManager._digit["frames"][ str[i]  ][2] ;
			}	
		}
		if(this._lifeContainer){
			this._lifeContainer.removeAllChildren();
		}
 		//render life
		offsetX = this._lifeIcon.x + 100;
		
		var str = this.player.life.toString();
		//console.log('life', str);
		for(var i = str.length - 1; i >= 0; i--)
		{
			var n = Number(str[i]);
 			var frame = this.createBitmap(str[i],this.spritesheet_digits);
 			frame.x = this.x + offsetX;
			frame.y = this.y + offsetY;
			this._lifeContainer.addChild(frame);
			if(frame) offsetX -= scope.ImageManager._digit["frames"][ str[i] ][2] ;
		}
  	}
	
	ScoreBar.prototype.updateLife = function()
	{
		var offsetX = this.offsetX;
		var offsetY = this.offsetY;
		
		if(this._lifeContainer){
			this._lifeContainer.removeAllChildren();
		}
		//render life
		offsetX = this._lifeIcon.x + 100;
		
		var str = this.player.life.toString();
		console.log('life', str);
		for(var i = str.length - 1; i >= 0; i--)
		{
			var n = Number(str[i]);
 			var frame = this.createBitmap(str[i],this.spritesheet_digits);
 			frame.x = this.x + offsetX;
			frame.y = this.y + offsetY;
			this._lifeContainer.addChild(frame);
			if(frame) offsetX -= scope.ImageManager._digit["frames"][ str[i] ][2] ;
		}
	}
	
	scope.ScoreBar = ScoreBar;

}(window.Atari.currentGame))