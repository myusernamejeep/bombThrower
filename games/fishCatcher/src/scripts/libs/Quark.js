
(function(win){

	/**
	 * @name Quark
	 * @class QuarkJS? 
	 */
	var Quark = win.Quark = win.Quark || 
	{
		version: "1.0.0",
		global: win
	};
	
	Quark.getDOM = function(id)
	{
		return document.getElementById(id);
	};
	
	var emptyConstructor = function() {};
	Quark.inherit = function(childClass, parentClass) 
	{
		emptyConstructor.prototype = parentClass.prototype;
		childClass.superClass = parentClass.prototype;
		childClass.prototype = new emptyConstructor();
		childClass.prototype.constructor = childClass;
		//Quark.merge(childClass.prototype, parentClass.prototype);
	};
	
	Quark.delegate = function(func, self)
	{
		var context = self || win;
		if (arguments.length > 2) 
		{
			var args = Array.prototype.slice.call(arguments, 2);    	
			return function() 
			{
				var newArgs = Array.prototype.concat.apply(args, arguments);
				return func.apply(context, newArgs);
			};
		}else 
		{
			return function() {return func.apply(context, arguments);};
		}
	};

	Quark.createDOM = function(type, props)
	{
		var dom = document.createElement(type);
		for(var p in props) 
		{
			var val = props[p];
			if(p == "style")
			{
				for(var s in val) dom.style[s] = val[s];
			}else
			{
				dom[p] = val;
			}
		}
		return dom;
	};
	
	function detectBrowser(ns)
	{
		var ua = ns.ua = navigator.userAgent;		
		ns.isWebKit = (/webkit/i).test(ua);
		ns.isMozilla = (/mozilla/i).test(ua);	
		ns.isIE = (/msie/i).test(ua);
		ns.isFirefox = (/firefox/i).test(ua);
		ns.isChrome = (/chrome/i).test(ua);
		ns.isSafari = (/safari/i).test(ua) && !this.isChrome;
		ns.isMobile = (/mobile/i).test(ua);
		ns.isOpera = (/opera/i).test(ua);
		ns.isIOS = (/ios/i).test(ua);
		ns.isIpad = (/ipad/i).test(ua);
		ns.isIpod = (/ipod/i).test(ua);
		ns.isIphone = (/iphone/i).test(ua) && !this.isIpod;
		ns.isAndroid = (/android/i).test(ua);
		ns.supportStorage = "localStorage" in win;
		ns.supportOrientation = "orientation" in win;
		ns.supportDeviceMotion = "ondevicemotion" in win;
		ns.supportTouch = "ontouchstart" in win;
		ns.supportCanvas = document.createElement("canvas").getContext != null;
		ns.cssPrefix = ns.isWebKit ? "webkit" : ns.isFirefox ? "Moz" : ns.isOpera ? "O" : ns.isIE ? "ms" : "";
	};

	detectBrowser(Quark);
	Quark.merge = function(obj, props, strict)
	{
		for(var key in props)
		{
			if(!strict || obj.hasOwnProperty(key) || obj[key] !== undefined) obj[key] = props[key];
		}
		return obj;
	};

	if(win.Q == undefined) win.Q = Quark;
	if(win.trace == undefined) win.trace = Quark.trace;
	
})(window);