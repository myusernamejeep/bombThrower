(function(scope) {
 
	var ns = scope;
	var game = ns.game ;
	
	var Num = ns.Num = function(props){	
		this.initialize(props);
	}
 
	Num.prototype = new createjs.Container(); // inherit from Container
	Num.prototype.Container_initialize = Num.prototype.initialize;
	Num.prototype.Container_tick = Num.prototype._tick; 
	var p = Num.prototype;
    p.stage;
    p.display;
    p.isDead;
 
    
	p.initialize = function(props){
		this.Container_initialize();
		
		this.max = 1;
		this.gap = 2;
		this.addSign = false;
		this.autoAddZero = false;
		this.src = null;
		props = props || {};
  		this.id = props.id || UID.get();
		this.eventEnabled = this.eventChildren = false;
		this.autoSize = true;
		this.sheet = props.sheet;
		Q.merge(this, props, true);
		
		this.init();
	};
	
	p._tick = function () {
		this.Container_tick();
    };
	
	p.init = function(){	
		var count = this.addSign ? this.max + 1 : this.max;
		for(var i = 0; i < count; i++)
		{
			var rect = this.sheet.frames[0];
 			var spritesheet = new GameLibs.SpriteSheetWrapper(this.sheet);
			var n  =  new  createjs.BitmapAnimation( spritesheet );
			n.x = (rect[2]+this.gap)*i;
			n.gotoAndStop("0");	
			if(this.scaleX){
				n.scaleX = this.scaleX;
			}
			if(this.scaleY){
				n.scaleY = this.scaleY;
			}
 			this.addChild(n);
		}
	};

	p.setValue = function(val){
		var str = val.toString(), len = this.children.length, positive = val > 0;
		if(this.autoAddZero)
		{
			var count = this.addSign ? len - 1 : len;
			while(str.length < count) str = "0" + str;
		}	
		if(this.addSign && positive) str = "+" + str;
 				
		for(var i = len - 1, j = str.length - 1; i >= 0; i--)
		{
			var n = this.getChildAt(i), valid = j >= 0;
			n.visible = valid;
			if(valid) {
 				n.gotoAndStop(""+str.charAt(j));	
			}
			j--;
		}
	};
		
	scope.Num = Num;

}(window.Atari.currentGame))