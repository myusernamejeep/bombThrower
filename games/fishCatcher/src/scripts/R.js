/**
 * Resource Manager.
 */

(function(scope) {
 
	var ns = scope;


	var R = ns.R = {};
	
	R.sources = 
	[
		//{id:"cannon", size:50, src:"../games/fishCatcher/src/images/cannon-hd.png?"+Math.random()},
		//{id:"fish", size:50, src:"../games/fishCatcher/src/images/fish-hd.png?"+Math.random()},
		//{id:"shark", size:50, src:"../games/fishCatcher/src/images/shark-hd.png?"+Math.random()},
		{id:"mainbg", size:456, src:"../games/fishCatcher/src/images/game_bg_2_hd.jpg?"+Math.random()},
		{id:"bottom", size:50, src:"../games/fishCatcher/src/images/bottom.png?"+Math.random()},
		{id:"fish1", size:6, src:"../games/fishCatcher/src/images/fish1.png?"+Math.random()},
		{id:"fish2", size:16, src:"../games/fishCatcher/src/images/fish2.png?"+Math.random()},
		{id:"fish3", size:11, src:"../games/fishCatcher/src/images/fish3.png?"+Math.random()},
		{id:"fish4", size:15, src:"../games/fishCatcher/src/images/fish4.png?"+Math.random()},
		{id:"fish5", size:43, src:"../games/fishCatcher/src/images/fish5.png?"+Math.random()},
		{id:"fish6", size:45, src:"../games/fishCatcher/src/images/fish6.png?"+Math.random()},
		{id:"fish7", size:80, src:"../games/fishCatcher/src/images/fish7.png?"+Math.random()},
		{id:"fish8", size:100, src:"../games/fishCatcher/src/images/fish8.png?"+Math.random()},
		{id:"fish9", size:104, src:"../games/fishCatcher/src/images/fish9.png?"+Math.random()},
		{id:"fish10", size:121, src:"../games/fishCatcher/src/images/fish10.png?"+Math.random()},
		{id:"shark1", size:287, src:"../games/fishCatcher/src/images/shark1.png?"+Math.random()},
		{id:"shark2", size:382, src:"../games/fishCatcher/src/images/shark2.png?"+Math.random()},
		{id:"cannon1", size:11, src:"../games/fishCatcher/src/images/cannon1.png?"+Math.random()},
		{id:"cannon2", size:11, src:"../games/fishCatcher/src/images/cannon2.png?"+Math.random()},
		{id:"cannon3", size:11, src:"../games/fishCatcher/src/images/cannon3.png?"+Math.random()},
		{id:"cannon4", size:13, src:"../games/fishCatcher/src/images/cannon4.png?"+Math.random()},
		{id:"cannon5", size:13, src:"../games/fishCatcher/src/images/cannon5.png?"+Math.random()},
		{id:"cannon6", size:15, src:"../games/fishCatcher/src/images/cannon6.png?"+Math.random()},
		{id:"cannon7", size:17, src:"../games/fishCatcher/src/images/cannon7.png?"+Math.random()},
		{id:"bullet", size:8, src:"../games/fishCatcher/src/images/bullet.png?"+Math.random()},
		{id:"web", size:93, src:"../games/fishCatcher/src/images/web.png?"+Math.random()},
		{id:"numBlack", size:1, src:"../games/fishCatcher/src/images/number_black.png?"+Math.random()},
		{id:"coinAni1", size:19, src:"../games/fishCatcher/src/images/coinAni1.png?"+Math.random()},
		{id:"coinAni2", size:22, src:"../games/fishCatcher/src/images/coinAni2.png?"+Math.random()},
		{id:"coinText", size:16, src:"../games/fishCatcher/src/images/coinText.png?"+Math.random()}
	];
	var prefix_path = '../games/fishCatcher/src/';
	R.init = function( assets )
	{
		this.assets = assets;
		/*
		this.bottom = this.getImageSrc("bottom");
 
		this.bottombar = {image:this.bottom , rect:[0,0,765,72]};
		this.bottombarBitmap = this.toEaselFormat(this.bottombar );
		
		this.cannonMinus = {image:this.bottom, up:{rect:[132,72,44,31]}, down:{rect:[88,72,44,31]}, width:44, height:31};
		this.cannonMinusBitmap = this.toEaselFormat(this.cannonMinus );
		this.cannonPlus = {image:this.bottom, up:{rect:[44,72,44,31]}, down:{rect:[0,72,44,31]}, width:44, height:31};
		this.cannonPlusBitmap = this.toEaselFormat(this.cannonPlus );
		*/
		var mainbg = {
			"images": ["images/game_bg_2_hd.jpg"],
			"frames": [ [0,0,1024,768, 0, 0 ,0 ] ] ,
			"animations": {  "default": {"frames": [0]}  }
		}
		this.mainbg = mainbg;
		var bullet1 = {
			"images": ["images/bullet.png"],
			"frames": [ [86,0,24,26] ], regX:12, regY:13,
			"animations": {  "default": {"frames": [0]}  }
		}
		var bullet2 = {
			"images": ["images/bullet.png"],
			"frames": [ [61,0,25,29] ], regX:12, regY:14,
			"animations": {  "default": {"frames": [0]}  }
		}  	
		var bullet3 = {
			"images": ["images/bullet.png"],
			"frames": [ [32,35,27,31] ], regX:13, regY:15,
			"animations": {  "default": {"frames": [0]}  }
		}  
		var bullet4 = {
			"images": ["images/bullet.png"],
			"frames": [ [30,82,29,33] ], regX:14, regY:16,
			"animations": {  "default": {"frames": [0]}  }
		}  
		var bullet5 = {
			"images": ["images/bullet.png"],
			"frames": [ [0,82,30,34] ], regX:15, regY:17,
			"animations": {  "default": {"frames": [0]}  }
		}  
		var bullet6 = {
			"images": ["images/bullet.png"],
			"frames": [ [30,0,31,35] ], regX:15, regY:17,
			"animations": {  "default": {"frames": [0]}  }
		}  
		var bullet7 = {
			"images": ["images/bullet.png"],
			"frames": [ [0,44,32,38] ], regX:16, regY:19,
			"animations": {  "default": {"frames": [0]}  }
		} 
		this.bullet_sprites = [bullet1,bullet2,bullet3,bullet4,bullet5,bullet6,bullet7 ];
		
		var web1 = {
			"images": ["images/web.png"],
			"frames": [ [319,355,116,118] ], regX:58, regY:59,
			"animations": {  "default": {"frames": [0]}  }
		} 
		var web2 = {
			"images": ["images/web.png"],
			"frames": [ [0,399,137,142] ], regX:68, regY:71,
			"animations": {  "default": {"frames": [0]}  }
		} 
		var web3 = {
			"images": ["images/web.png"],
			"frames": [ [163,355,156,162] ], regX:78, regY:81,
			"animations": {  "default": {"frames": [0]}  }
		} 
		var web4 = {
			"images": ["images/web.png"],
			"frames": [ [242,181,180,174] ], regX:90, regY:87,
			"animations": {  "default": {"frames": [0]}  }
		} 
		var web5 = {
			"images": ["images/web.png"],
			"frames": [ [0,244,163,155] ], regX:81, regY:77,
			"animations": {  "default": {"frames": [0]}  }
		} 
		var web6 = {
			"images": ["images/web.png"],
			"frames": [ [242,0,191,181] ], regX:95, regY:90,
			"animations": {  "default": {"frames": [0]}  }
		} 
		var web7 = {
			"images": ["images/web.png"],
			"frames": [ [0,0,242,244] ], regX:121, regY:122,
			"animations": {  "default": {"frames": [0]}  }
		} 
		this.web_sprites = [web1,web2,web3,web4,web5,web6,web7 ];
		
		assets.fish1.mixin = {coin:1, captureRate:0.55, maxNumGroup:8, minSpeed:0.5, maxSpeed:1.2, regX:35, regY:12, useFrames:true, interval:10};
		assets.fish2.mixin = {coin:3, captureRate:0.50, maxNumGroup:6, minSpeed:0.5, maxSpeed:1.2, regX:58, regY:20, useFrames:true, interval:10};
		assets.fish3.mixin = {coin:5, captureRate:0.45, maxNumGroup:6, minSpeed:0.5, maxSpeed:1.2, regX:52, regY:18, useFrames:true, interval:10};
		assets.fish4.mixin = {coin:8, captureRate:0.40, maxNumGroup:6, minSpeed:0.5, maxSpeed:1.2, regX:57, regY:18, useFrames:true, interval:10};
		assets.fish5.mixin = {coin:10, captureRate:0.35, maxNumGroup:5, minSpeed:0.5, maxSpeed:1.2, regX:67, regY:50, useFrames:true, interval:10};
		assets.fish6.mixin = {coin:20, captureRate:0.30, maxNumGroup:3, minSpeed:0.5, maxSpeed:1.2, regX:65, regY:25, useFrames:true, interval:10};
		assets.fish7.mixin = {coin:30, captureRate:0.25, maxNumGroup:5, minSpeed:0.5, maxSpeed:0.8, regX:40, regY:50, useFrames:true, interval:10};
		assets.fish8.mixin = {coin:40, captureRate:0.20, maxNumGroup:3, minSpeed:0.5, maxSpeed:0.8, regX:90, regY:50, useFrames:true, interval:10};
		assets.fish9.mixin = {coin:50, captureRate:0.15, maxNumGroup:2, minSpeed:0.5, maxSpeed:0.8, regX:120, regY:70, useFrames:true, interval:10};
		assets.fish10.mixin = {coin:60, captureRate:0.10, maxNumGroup:2, minSpeed:0.5, maxSpeed:0.8, regX:100, regY:80, useFrames:true, interval:10};
		assets.shark1.mixin = {coin:100, captureRate:0.05, maxNumGroup:1, minSpeed:0.5, maxSpeed:0.6, regX:350, regY:130, useFrames:true, interval:10};
		assets.shark2.mixin = {coin:200, captureRate:0.02, maxNumGroup:1, minSpeed:0.5, maxSpeed:0.6, regX:350, regY:130, useFrames:true, interval:10};
		this.fishTypes = [null, assets.fish1, assets.fish2, assets.fish3, assets.fish4, assets.fish5, assets.fish6, assets.fish8, assets.fish9, assets.fish10, assets.fish7, assets.shark1, assets.shark2];
		this.cannonTypes = [null, assets.cannon1, assets.cannon2, assets.cannon3, assets.cannon4, assets.cannon5, assets.cannon6, assets.cannon7];
		
		//this.images = images;
		//this.convertPlistImage();	
		//this.initResources();
	};
	
	R.toEaselFormat = function(obj ){
		/*
		var sample = {
			"images": ["images/all.png" ],
			"frames": [
				[54,153,38,199, 0, 0, 0],
			],
			"animations": {
				"rightSling": {"frames": [0]},
			}
		};*/
		var animations = {};
		var frames = [];
		var width, height;
		if(obj.up){
			var rect = obj.up.rect ;
			var frame = [rect[0],rect[1],rect[2],rect[3], 0 , obj.width/2 || 0, obj.height/2 || 0 ];
			frames.push(frame);
			animations['up'] = {"frames": [frames.length - 1]} ;
		}
		if(obj.down){
			var rect = obj.down.rect ;
			var frame = [rect[0],rect[1],rect[2],rect[3], 0 , obj.width/2 || 0, obj.height/2 || 0 ];
			frames.push(frame);
			animations['down'] = {"frames": [frames.length - 1]} ;
		}
		if(obj.rect){
			var rect = obj.rect ;
			var frame = [rect[0],rect[1],rect[2],rect[3], 0 , obj.width/2 || 0, obj.height/2 || 0 ];
			frames.push(frame);
			animations['default'] = {"frames": [frames.length - 1]} ;
			width = rect[2], height = rect[3];
		}
		var TextureSheet = {
			"images": [obj.image],
			"frames": frames,
			"animations": animations
		};
		console.debug(TextureSheet);
		
		var spritesheet = new GameLibs.SpriteSheetWrapper(TextureSheet);
		var _bmp  =  new  createjs.BitmapAnimation( spritesheet );
		if(width){
			_bmp.width = width;
		}
		if(height){
			_bmp.height = height;
		}
		//_bmp.gotoAndPlay(animations);	
		
		return _bmp;
	};
	
	R.toEaselAnim = function(obj ){
 
		var animations = {};
		var frames = [];
		 console.debug(obj);
		
		if(obj.sprite){
			var sprites = obj.sprite ;
			for(var key in sprites){
				var rect = sprites[key];
				var frame = [rect[0],rect[1],rect[2],rect[3], 0 , rect[2]/2, rect[3]/2 ];
				frames.push(frame);
				animations[key] = {"frames": [frames.length - 1]} ;
			}
		}
		var TextureSheet = {
			"images": [obj.image],
			"frames": frames,
			"animations": animations
		};
		return TextureSheet;
		/*
		var spritesheet = new GameLibs.SpriteSheetWrapper(TextureSheet);
		var _bmp  =  new  createjs.BitmapAnimation( spritesheet );
		if(obj.scaleX){
			_bmp.scaleX = obj.scaleX;
		}
		if(obj.scaleY){
			_bmp.scaleY = obj.scaleY;
		}
		if(obj.regX){
			_bmp.regX = obj.regX;
		}
		if(obj.regY){
			_bmp.regY = obj.regY;
		}
		return _bmp;
		*/
		
	};
	
	R.initResources = function()
	{
		this.mainbg = this.getImage("mainbg");
		console.debug(this.mainbg);
		
		this.bottom = this.getImageSrc("bottom");
		console.debug(this.bottom);
		
		this.bottombar = {image:this.bottom , rect:[0,0,765,72]};
		this.bottombarBitmap = this.toEaselFormat(this.bottombar );
		
		this.cannonMinus = {image:this.bottom, up:{rect:[132,72,44,31]}, down:{rect:[88,72,44,31]}, width:44, height:31};
		this.cannonMinusBitmap = this.toEaselFormat(this.cannonMinus );
		this.cannonPlus = {image:this.bottom, up:{rect:[44,72,44,31]}, down:{rect:[0,72,44,31]}, width:44, height:31};
		this.cannonPlusBitmap = this.toEaselFormat(this.cannonPlus );
		
		this.numBlack = 
		{
			image: this.getImage("numBlack"),
			sprite:{
				9: [0, 0, 20, 24],
				8: [0, 24, 20, 24],
				7: [0, 48, 20, 24],
				6: [0, 72, 20, 24],
				5: [0, 96, 20, 24],
				4: [0, 120, 20, 24],
				3: [0, 144, 20, 24],
				2: [0, 168, 20, 24],
				1: [0, 192, 20, 24],
				0: [0, 216, 20, 24]
			}
		};
		this.numBlackBitmap = this.toEaselAnim(this.numBlack );
		
		
		this.coinText = 
		{
			image: this.getImage("coinText"),
			0: [0, 0, 36, 49],
			1: [36, 0, 36, 49],
			2: [72, 0, 36, 49],
			3: [108, 0, 36, 49],
			4: [144, 0, 36, 49],
			5: [180, 0, 36, 49],
			6: [216, 0, 36, 49],
			7: [252, 0, 36, 49],
			8: [288, 0, 36, 49],
			9: [324, 0, 36, 49],
			"+": [360, 0, 36, 49]
		};
		this.coinTextBitmap = this.toEaselAnim(this.coinText );
		
		this.coinAni1 = {image:this.getImage("coinAni1"), 
		frames:[
		{rect:[0,0,60,60]},
		{rect:[0,60,60,60]},
		{rect:[0,120,60,60]},
		{rect:[0,180,60,60]},
		{rect:[0,240,60,60]},
		{rect:[0,300,60,60]},
		{rect:[0,360,60,60]},
		{rect:[0,420,60,60]},
		{rect:[0,480,60,60]},
		{rect:[0,540,60,60]}
		], regX:30, regY:30, scaleX:0.8, scaleY:0.8, useFrames:true, interval:2};
		this.coinAni1Bitmap = this.toEaselAnim(this.coinAni1 );
		
		this.coinAni2 = {image:this.getImage("coinAni2"), 
		frames:[
		{rect:[0,0,60,60]},
		{rect:[0,60,60,60]},
		{rect:[0,120,60,60]},
		{rect:[0,180,60,60]},
		{rect:[0,240,60,60]},
		{rect:[0,300,60,60]},
		{rect:[0,360,60,60]},
		{rect:[0,420,60,60]},
		{rect:[0,480,60,60]},
		{rect:[0,540,60,60]}
		], regX:30, regY:30, scaleX:0.8, scaleY:0.8, useFrames:true, interval:2};
		this.coinAni2Bitmap = this.toEaselAnim(this.coinAni2 );
		
		var fish1 = {image:this.getImage("fish1"), 
		frames:[
		{rect:[0,0,55,37], label:"swim"},
		{rect:[0,37,55,37]},
		{rect:[0,74,55,37]},
		{rect:[0,111,55,37], jump:"swim"},
		{rect:[0,148,55,37], label:"capture"},
		{rect:[0,185,55,37]},
		{rect:[0,222,55,37]},
		{rect:[0,259,55,37], jump:"capture"}
		], polyArea:[{x:10, y:5}, {x:55, y:5}, {x:55, y:22}, {x:10, y:22}],
		mixin:{coin:1, captureRate:0.55, maxNumGroup:8, minSpeed:0.5, maxSpeed:1.2, regX:35, regY:12, useFrames:true, interval:10}};
		this.fish1Bitmap = this.toEaselAnim( fish1 );
		
		var fish2 = {image:this.getImage("fish2"), 
		frames:[
		{rect:[0,0,78,64], label:"swim"},
		{rect:[0,64,78,64]},
		{rect:[0,128,78,64]},
		{rect:[0,192,78,64], jump:"swim"},
		{rect:[0,256,78,64], label:"capture"},
		{rect:[0,320,78,64]},
		{rect:[0,384,78,64]},
		{rect:[0,448,78,64], jump:"capture"}
		], polyArea:[{x:15, y:10}, {x:78, y:10}, {x:78, y:32}, {x:15, y:32}],
		mixin:{coin:3, captureRate:0.50, maxNumGroup:6, minSpeed:0.5, maxSpeed:1.2, regX:58, regY:20, useFrames:true, interval:10}};
		
		var fish3 = {image:this.getImage("fish3"), 
		frames:[
		{rect:[0,0,72,56], label:"swim"},
		{rect:[0,56,72,56]},
		{rect:[0,112,72,56]},
		{rect:[0,168,72,56], jump:"swim"},
		{rect:[0,224,72,56], label:"capture"},
		{rect:[0,280,72,56]},
		{rect:[0,336,72,56]},
		{rect:[0,392,72,56], jump:"capture"}
		], polyArea:[{x:5, y:5}, {x:72, y:5}, {x:72, y:28}, {x:5, y:28}], 
		mixin:{coin:5, captureRate:0.45, maxNumGroup:6, minSpeed:0.5, maxSpeed:1.2, regX:52, regY:18, useFrames:true, interval:10}};
		
		var fish4 = {image:this.getImage("fish4"), 
		frames:[
		{rect:[0,0,77,59], label:"swim"},
		{rect:[0,59,77,59]},
		{rect:[0,118,77,59]},
		{rect:[0,177,77,59], jump:"swim"},
		{rect:[0,236,77,59], label:"capture"},
		{rect:[0,295,77,59]},
		{rect:[0,354,77,59]},
		{rect:[0,413,77,59], jump:"capture"}
		], polyArea:[{x:10, y:5}, {x:77, y:5}, {x:77, y:28}, {x:10, y:28}],
		mixin:{coin:8, captureRate:0.40, maxNumGroup:6, minSpeed:0.5, maxSpeed:1.2, regX:57, regY:18, useFrames:true, interval:10}};
		
		var fish5 = {image:this.getImage("fish5"), 
		frames:[
		{rect:[0,0,107,122], label:"swim"},
		{rect:[0,122,107,122]},
		{rect:[0,244,107,122]},
		{rect:[0,366,107,122], jump:"swim"},
		{rect:[0,488,107,122], label:"capture"},
		{rect:[0,610,107,122]},
		{rect:[0,732,107,122]},
		{rect:[0,854,107,122], jump:"capture"}
		], polyArea:[{x:20, y:30}, {x:100, y:30}, {x:100, y:70}, {x:20, y:70}],
		mixin:{coin:10, captureRate:0.35, maxNumGroup:5, minSpeed:0.5, maxSpeed:1.2, regX:67, regY:50, useFrames:true, interval:10}};
		
		var fish6 = {image:this.getImage("fish6"), 
		frames:[
		{rect:[0,0,105,79], label:"swim"},
		{rect:[0,79,105,79]},
		{rect:[0,158,105,79]},
		{rect:[0,237,105,79]},
		{rect:[0,316,105,79]},
		{rect:[0,395,105,79]},
		{rect:[0,474,105,79]},
		{rect:[0,553,105,79], jump:"swim"},
		{rect:[0,632,105,79], label:"capture"},
		{rect:[0,711,105,79]},
		{rect:[0,790,105,79]},
		{rect:[0,869,105,79], jump:"capture"}
		], polyArea:[{x:45, y:0}, {x:105, y:0}, {x:105, y:55}, {x:45, y:55}],
		mixin:{coin:20, captureRate:0.30, maxNumGroup:3, minSpeed:0.5, maxSpeed:1.2, regX:65, regY:25, useFrames:true, interval:10}};
		
		var fish7 = {image:this.getImage("fish7"), 
		frames:[
		{rect:[0,0,92,151], label:"swim"},
		{rect:[0,151,92,151]},
		{rect:[0,302,92,151]},
		{rect:[0,453,92,151]},
		{rect:[0,604,92,151]},
		{rect:[0,755,92,151], jump:"swim"},
		{rect:[0,906,92,151], label:"capture"},
		{rect:[0,1057,92,151]},
		{rect:[0,1208,92,151]},
		{rect:[0,1359,92,151], jump:"capture"}
		], polyArea:[{x:15, y:5}, {x:85, y:5}, {x:85, y:80}, {x:15, y:80}], 
		mixin:{coin:30, captureRate:0.25, maxNumGroup:5, minSpeed:0.5, maxSpeed:0.8, regX:40, regY:50, useFrames:true, interval:10}};
		
		var fish8 = {image:this.getImage("fish8"), 
		frames:[
		{rect:[0,0,174,126], label:"swim"},
		{rect:[0,126,174,126]},
		{rect:[0,252,174,126]},
		{rect:[0,378,174,126]},
		{rect:[0,504,174,126]},
		{rect:[0,630,174,126]},
		{rect:[0,756,174,126]},
		{rect:[0,882,174,126], jump:"swim"},
		{rect:[0,1008,174,126], label:"capture"},
		{rect:[0,1134,174,126]},
		{rect:[0,1260,174,126]},
		{rect:[0,1386,174,126], jump:"capture"}
		], polyArea:[{x:20, y:20}, {x:120, y:20}, {x:120, y:75}, {x:20, y:75}], 
		mixin:{coin:40, captureRate:0.20, maxNumGroup:3, minSpeed:0.5, maxSpeed:0.8, regX:90, regY:50, useFrames:true, interval:10}};
		
		var fish9 = {image:this.getImage("fish9"), 
		frames:[
		{rect:[0,0,166,183], label:"swim"},
		{rect:[0,183,166,183]},
		{rect:[0,366,166,183]},
		{rect:[0,549,166,183]},
		{rect:[0,732,166,183]},
		{rect:[0,915,166,183]},
		{rect:[0,1098,166,183]},
		{rect:[0,1281,166,183], jump:"swim"},
		{rect:[0,1464,166,183], label:"capture"},
		{rect:[0,1647,166,183]},
		{rect:[0,1830,166,183]},
		{rect:[0,2013,166,183], jump:"capture"}
		], polyArea:[{x:60, y:10}, {x:160, y:10}, {x:160, y:140}, {x:60, y:140}], 
		mixin:{coin:50, captureRate:0.15, maxNumGroup:2, minSpeed:0.5, maxSpeed:0.8, regX:120, regY:70, useFrames:true, interval:10}};
		
		var fish10 = {image:this.getImage("fish10"), 
		frames:[
		{rect:[0,0,178,187], label:"swim"},
		{rect:[0,187,178,187]},
		{rect:[0,374,178,187]},
		{rect:[0,561,178,187]},
		{rect:[0,748,178,187]},
		{rect:[0,935,178,187], jump:"swim"},
		{rect:[0,1122,178,187], label:"capture"},
		{rect:[0,1309,178,187]},
		{rect:[0,1496,178,187]},
		{rect:[0,1683,178,187], jump:"capture"}
		], polyArea:[{x:20, y:30}, {x:170, y:30}, {x:170, y:120}, {x:20, y:120}], 
		mixin:{coin:60, captureRate:0.10, maxNumGroup:2, minSpeed:0.5, maxSpeed:0.8, regX:100, regY:80, useFrames:true, interval:10}};
		
		var shark1 = {image:this.getImage("shark1"), 
		frames:[
		{rect:[0,0,509,270], label:"swim"},
		{rect:[0,270,509,270]},
		{rect:[0,540,509,270]},
		{rect:[0,810,509,270]},
		{rect:[0,1080,509,270]},
		{rect:[0,1350,509,270]},
		{rect:[0,1620,509,270]},
		{rect:[0,1890,509,270], jump:"swim"},
		{rect:[0,2160,509,270], label:"capture"},
		{rect:[0,2430,509,270]},
		{rect:[0,2700,509,270]},
		{rect:[0,2970,509,270], jump:"capture"}
		], polyArea:[{x:20, y:50}, {x:500, y:50}, {x:500, y:220}, {x:20, y:210}], 
		mixin:{coin:100, captureRate:0.05, maxNumGroup:1, minSpeed:0.5, maxSpeed:0.6, regX:350, regY:130, useFrames:true, interval:10}};
		
		var shark2 = {image:this.getImage("shark2"), 
		frames:[
		{rect:[0,0,516,273], label:"swim"},
		{rect:[0,273,516,273]},
		{rect:[0,546,516,273]},
		{rect:[0,819,516,273]},
		{rect:[0,1092,516,273]},
		{rect:[0,1365,516,273]},
		{rect:[0,1638,516,273]},
		{rect:[0,1911,516,273], jump:"swim"},
		{rect:[0,2184,516,273], label:"capture"},
		{rect:[0,2457,516,273]},
		{rect:[0,2730,516,273]},
		{rect:[0,3003,516,273], jump:"capture"}
		], polyArea:[{x:20, y:50}, {x:500, y:50}, {x:500, y:220}, {x:20, y:210}],
		mixin:{coin:200, captureRate:0.02, maxNumGroup:1, minSpeed:0.5, maxSpeed:0.6, regX:350, regY:130, useFrames:true, interval:10}};
		
		var cannon1 = {image:this.getImage("cannon1"),
		frames:[
		{rect:[0,0,74,74]},
		{rect:[0,74,74,74]},
		{rect:[0,148,74,74]},
		{rect:[0,222,74,74]},
		{rect:[0,296,74,74], stop:1}
		], mixin:{regX:37, regY:45, useFrames:true, interval:3, power:1}};
		
		var cannon2 = {image:this.getImage("cannon2"), 
		frames:[
		{rect:[0,0,74,76]},
		{rect:[0,76,74,76]},
		{rect:[0,152,74,76]},
		{rect:[0,228,74,76]},
		{rect:[0,304,74,76], stop:1}
		], mixin:{regX:37, regY:46, useFrames:true, interval:3, power:2}};
		
		var cannon3 = {image:this.getImage("cannon3"), 
		frames:[
		{rect:[0,0,74,76]},
		{rect:[0,76,74,76]},
		{rect:[0,152,74,76]},
		{rect:[0,228,74,76]},
		{rect:[0,304,74,76], stop:1}
		], mixin:{regX:37, regY:46, useFrames:true, interval:3, power:3}};
		
		var cannon4 = {image:this.getImage("cannon4"), 
		frames:[
		{rect:[0,0,74,83]},
		{rect:[0,83,74,83]},
		{rect:[0,166,74,83]},
		{rect:[0,249,74,83]},
		{rect:[0,332,74,83], stop:1}
		], mixin:{regX:37, regY:52, useFrames:true, interval:3, power:4}};
		
		var cannon5 = {image:this.getImage("cannon5"), 
		frames:[
		{rect:[0,0,74,85]},
		{rect:[0,85,74,85]},
		{rect:[0,170,74,85]},
		{rect:[0,255,74,85]},
		{rect:[0,340,74,85], stop:1}
		], mixin:{regX:37, regY:55, useFrames:true, interval:3, power:5}};
		
		var cannon6 = {image:this.getImage("cannon6"), 
		frames:[
		{rect:[0,0,74,90]},
		{rect:[0,90,74,90]},
		{rect:[0,180,74,90]},
		{rect:[0,270,74,90]},
		{rect:[0,360,74,90], stop:1}
		], mixin:{regX:37, regY:58, useFrames:true, interval:3, power:6}};
		
		var cannon7 = {image:this.getImage("cannon7"),  
		frames:[
		{rect:[0,0,74,94]},
		{rect:[0,94,74,94]},
		{rect:[0,188,74,94]},
		{rect:[0,282,74,94]},
		{rect:[0,376,74,94], stop:1}
		], mixin:{regX:37, regY:60, useFrames:true, interval:3, power:7}};
		
		this.fishTypes = [null, fish1, fish2, fish3, fish4, fish5, fish6, fish8, fish9, fish10, fish7, shark1, shark2];
		this.cannonTypes = [null, cannon1, cannon2, cannon3, cannon4, cannon5, cannon6, cannon7];
			
		var bullet = this.getImage("bullet");
		this.bullets = [
		{image:bullet, rect:[86,0,24,26], regX:12, regY:13},
		{image:bullet, rect:[61,0,25,29], regX:12, regY:14},
		{image:bullet, rect:[32,35,27,31], regX:13, regY:15},
		{image:bullet, rect:[30,82,29,33], regX:14, regY:16},
		{image:bullet, rect:[0,82,30,34], regX:15, regY:17},
		{image:bullet, rect:[30,0,31,35], regX:15, regY:17},
		{image:bullet, rect:[0,44,32,38], regX:16, regY:19}
		];
		
		
		var web = this.getImage("web");
		this.webs = [
		{image:web, rect:[319,355,116,118], regX:58, regY:59, polyArea:[{x:20, y:20}, {x:100, y:20}, {x:100, y:100}, {x:20, y:100}]},
		{image:web, rect:[0,399,137,142], regX:68, regY:71, polyArea:[{x:20, y:20}, {x:120, y:20}, {x:120, y:120}, {x:20, y:120}]},
		{image:web, rect:[163,355,156,162], regX:78, regY:81, polyArea:[{x:20, y:20}, {x:140, y:20}, {x:140, y:140}, {x:20, y:140}]},
		{image:web, rect:[242,181,180,174], regX:90, regY:87, polyArea:[{x:20, y:20}, {x:160, y:20}, {x:160, y:160}, {x:20, y:160}]},
		{image:web, rect:[0,244,163,155], regX:81, regY:77, polyArea:[{x:10, y:10}, {x:150, y:10}, {x:150, y:150}, {x:10, y:150}]},
		{image:web, rect:[242,0,191,181], regX:95, regY:90, polyArea:[{x:10, y:10}, {x:180, y:10}, {x:180, y:180}, {x:10, y:180}]},
		{image:web, rect:[0,0,242,244], regX:121, regY:122, polyArea:[{x:30, y:30}, {x:210, y:30}, {x:210, y:210}, {x:30, y:210}]}
		];

	};
 
	R.getImage = function(id)
	{
		return this.images[id].image;
	};
	R.getImageSrc = function(id, attr)
	{
		//return this.images[id].image.img_src;
		for(var r in this.sources){
			var obj = this.sources[r];
			if(obj.id == id){
				return attr ? obj[attr] : obj['img_src'];
			}
		}
		return '';
	};
	scope.R = R;

}(window.Atari.currentGame))