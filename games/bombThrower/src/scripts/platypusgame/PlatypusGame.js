if (!window.lib) { window.lib = {}; }

var p; // shortcut to reference prototypes

// stage content:
(lib.PlatypusGame = function() {
	this.initialize();

	// score
	this.scoreTxt = new Text("SCORE: 0", "bold 24px Arial", "#ffffff");
	this.scoreTxt.textBaseline = "top";
	this.scoreTxt.lineHeight = 26;
	this.scoreTxt.lineWidth = 224;
	this.scoreTxt.setTransform(23.2,18);

	// platypus
	this.platypus = new lib.Platypus();
	this.platypus.setTransform(657.1,157.8,0.801,0.801,0,0,0,137.9,94.3);

	// background
	this.bg = new lib.Background();
	this.bg.setTransform(400,200,1,1,0,0,0,400,200);
	this.bg.cache(0,0,878,402);

	this.addChild(this.bg,this.platypus,this.scoreTxt);
}).prototype = p = new Container();
p.nominalBounds = new Rectangle(0,0,875.5,400);
p.constructor = lib.PlatypusGame;


// symbols:
(lib.Platypus = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{idle:0,pop:60,fall:65},true);

	// timeline functions:
	this.frame_59 = function() {
		this.gotoAndPlay("idle");
	}
	this.frame_60 = function() {
		playSound("pop",0);
	}
	this.frame_64 = function() {
		if (this.onPopped) { this.onPopped(this); }
	}
	this.frame_69 = function() {
		this.gotoAndPlay("fall");
	}

	// actions tween:
	this.timeline.addTween(Tween.get(this).wait(59).call(this.frame_59).wait(1).call(this.frame_60).wait(4).call(this.frame_64).wait(5).call(this.frame_69).wait(1));

	// idle
	this.platypusIdle = new lib.PlatypusIdle();
	this.platypusIdle.setTransform(128.4,9,1,1,-5.6,0,0,128.3,9);

	this.timeline.addTween(Tween.get(this.platypusIdle).to({rotation:0,regX:128.4,regY:9.1,y:14.1},14,Ease.get(-0.99)).to({rotation:3.7,regX:128.3,regY:9,y:9.1},16,Ease.get(1)).to({rotation:0.3,regX:128.8,regY:9.5,x:128.8,y:14},14,Ease.get(-0.99)).to({rotation:-5.5,regX:128.3,regY:9,x:128.4,y:9},15,Ease.get(1)).to({_off:true},1).wait(10));

	// pop and fall
	this.instance = new lib.PlatypusPop("synched",0);
	this.instance.setTransform(128.2,167.7,1,1,0,0,0,127.6,165.9);
	this.instance._off = true;

	this.timeline.addTween(Tween.get(this.instance).wait(60).to({_off:false},0).wait(10));

}).prototype = p = new MovieClip();
p.nominalBounds = new Rectangle(-0.2,-9.9,261.6,341.1);
p.constructor = lib.Platypus;


(lib.PlatypusIdle = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{},true);

	// beak
	this.instance = new lib.Beak("synched",0);
	this.instance.setTransform(63.6,260.4,1,1,0,0,0,63.6,22.7);

	this.timeline.addTween(Tween.get(this.instance).to({rotation:-2.8,x:63.7},9,Ease.get(1)).to({rotation:0,x:63.6},10).wait(1));

	// eye
	this.instance_1 = new lib.Eye("synched",0);
	this.instance_1.setTransform(80.6,253.1,1,1,-10.6,0,0,10.8,13.4);

	this.timeline.addTween(Tween.get(this.instance_1).wait(4).to({scaleX:1,scaleY:1,rotation:-10.4,regY:13.3,x:80.5,y:253},5,Ease.get(-0.99)).to({scaleX:1,scaleY:1,rotation:-10.5,regY:13.4,x:80.6,y:253.1},5,Ease.get(1)).wait(1));

	// balloon
	this.balloon = new lib.Balloon();
	this.balloon.setTransform(129.9,3.9,1,1,0,0,0,56.3,3.9);

	this.timeline.addTween(Tween.get(this.balloon).wait(1));

	// legback
	this.instance_2 = new lib.LegFront("synched",9);
	this.instance_2.setTransform(182.4,255.1,1,1,0,0,0,13.9,8.8);

	this.timeline.addTween(Tween.get({}).to({state:[{t:this.instance_2}]}).wait(20));

	// legfront
	this.instance_3 = new lib.LegFront("synched",0);
	this.instance_3.setTransform(106.4,264.6,1,1,0,0,0,10.5,17.6);

	this.timeline.addTween(Tween.get({}).to({state:[{t:this.instance_3}]}).wait(20));

	// body
	this.instance_4 = new lib.Body("synched",0);
	this.instance_4.setTransform(132.1,185.1,1,1,0,0,0,80.1,11.2);

	this.timeline.addTween(Tween.get({}).to({state:[{t:this.instance_4}]}).wait(20));

	// tail
	this.instance_5 = new lib.Tail("synched",0);
	this.instance_5.setTransform(214,236.6,1.001,1.004,0,0,5.6,9.8,23.8);

	this.timeline.addTween(Tween.get(this.instance_5).to({scaleX:1,scaleY:1,skewX:-23.8,skewY:-19.3,regX:9.7,regY:23.5,x:213.9,y:236.5},9,Ease.get(1)).to({scaleX:1,scaleY:1,skewX:0,skewY:5.6,regX:9.8,regY:23.8,x:214,y:236.6},10).wait(1));

	// legfrontback
	this.instance_6 = new lib.LegFront("synched",0);
	this.instance_6.setTransform(163.7,254.1,0.86,0.86,0,0,0,10.6,17.6);

	this.timeline.addTween(Tween.get({}).to({state:[{t:this.instance_6}]}).wait(20));

	// legbackfront
	this.instance_7 = new lib.LegFront("synched",9);
	this.instance_7.setTransform(99.3,263.2,0.884,0.884,0,0,0,13.9,8.8);

	this.timeline.addTween(Tween.get({}).to({state:[{t:this.instance_7}]}).wait(20));

}).prototype = p = new MovieClip();
p.nominalBounds = new Rectangle(0,0.2,235.4,332);
p.constructor = lib.PlatypusIdle;


(lib.Beak = function() {
	this.initialize();

	// beakshapes
	this.shape = new Shape();
	this.shape.graphics.f("#000000").p("AERkpQgTgbgWgWQABgCgGgCQgSgRgUgMQgugcgLAlQgJAYAKAcQgBAAAAAAQgLALggAkQgbAegTAPQhCA3gsAgQhAAtg5AbQgNAHg5AUQgsAPgXARQgcAUgFAmQgEAbAJAsQAQBWAlA9QAtBLBGAbQCLA3CbhOQCQhJBIiJQAhg8ADhVQAChKgThMQgUhRgqgyQgDgCgGgG").p("ACwlpQAIAEAVARQA2AuApBXQAjBcAJAJIgFgDQAHA3gDAzQgGBUgkA9QhOCCiVBDQilBKh6hSQg3glgjhLQgdhDgGhKQgEglAUgXQAQgSAmgOQBUgfAsgbQAygcA4gsQAngeA6gyQARgPAWgcQAYgdALgMQACAGADAFQBXCAAJgEQAFgCgkg5QgTgegXgiQgXgqAHgaQADgMAYAP").p("ACFiqIAPgEQAPgFAHAGQAHAGAEAKQAEALgBAJQgCANgQgOQgQgNgBgIQgCgGAIgEQACgBABgBQgEACgGADQgCABgBABQgJAKANAPQAJALAMAGQAQAHAHgNQAIgOgKgUQgKgTgPgFQgCAAgCAAQgGAAgMAFQgBAAAAAAQgQAHAGAE").f("#736357").p("ACVlsQgHAaAXAqQAXAiATAeQAkA5gFACQgJAEhXiAQgDgFgCgGQgLAMgYAdQgWAcgRAPQg6AygnAeQg4AsgyAcQgsAbhUAfQgmAOgQASQgUAXAEAlQAGBKAdBDQAjBLA3AlQB6BSClhKQCVhDBOiCQAkg9AGhUQADgzgHg3IAFADQgJgJgjhcQgphXg2guQgVgRgIgEQgYgPgDAM").p("ACPi1QAKgHAJACQACAAACAAQAPAFAKATQAKAUgIAOQgHANgQgHQgMgGgJgLQgNgPAJgKQACgIAOgCIgcAEQgGgEAQgH").f("#534741").p("ACQi1QAMgFAGAAQgJgCgKAHQAAAAABAA").p("ACUiuIgPAEIAcgEQgOACgCAIQABgBACgBQAGgDAEgCQgBABgCABQgIAEACAGQABAIAQANQAQAOACgNQABgJgEgLQgEgKgHgGQgHgGgPAF").f();
	this.shape.setTransform(36.1,39.7);

	this.addChild(this.shape);
}).prototype = p = new Container();
p.nominalBounds = new Rectangle(0,0.5,72.2,78.5);
p.constructor = lib.Beak;


(lib.Eye = function() {
	this.initialize();

	// eyeball
	this.shape = new Shape();
	this.shape.graphics.f("#000000").p("AATAEQACgHgEgHQgFgHgJgCQgHgBgHAEQgGAFgBAJQgCAHAEAHQAFAGAJACQAHACAHgFQAGgEABgJ").f();
	this.shape.setTransform(11.3,14.4);

	// eyeshape
	this.shape_1 = new Shape();
	this.shape_1.graphics.f("#000000").p("ACIheQACgPhKgFQhAgEgTAEQh+AuALASQABAAAmgNQgDANgCAcQAEAfATAcQAOAUASANQgFgBgGAAQgigEgBABQgGAFAiAPQAVAHAbgFQAFAAAHgDQASABASgLQAGgEAFgFQAQgJgEgFIgBAAQAJgQgCgUQgEgggbgfQgWgagbgOQgCgBgCgBQAQgFADAAQADgBBGACQBBACABgD").p("AAUgmQAWAbAEAYQAEAdgXARQgDAAgEACQgSAFgJADQgOgCgOgJQgagSgQgfQgPgbABgcQAAgDACgRQAIgCAJgDQAXgIAPgFQAFACAGADQAYASATAX").p("ABEAeQgHAYABACQAGAJANgdQAKgYABgKQAAgHgLgaQgNgcgGAJQgBABAHAYQAHAYAAADQAAADgHAZ").p("AAvBlQArgYgMgIQhLAsgBgBQADAOAqgZ").f("#ffffff").p("AgXhPQgGgDgFgCQgPAFgXAIQgJADgIACQgCARAAADQgBAcAPAbQAQAfAaASQAOAJAOACQAJgDASgFQAEgCADAAQAXgRgEgdQgEgYgWgbQgTgXgYgS").f();
	this.shape_1.setTransform(13.6,11.7);

	this.addChild(this.shape_1,this.shape);
}).prototype = p = new Container();
p.nominalBounds = new Rectangle(0,0,27.1,23.4);
p.constructor = lib.Eye;


(lib.Balloon = function() {
	this.initialize();

	// balloonshapes
	this.shape = new Shape();
	this.shape.graphics.f("#000000").p("AEntrQhNgihfgKQi/gVilBNQivBShVCmQhQCeAVDLQASC2BdCrQBPCTCPB5QBRBDBHAdQAHADARADQAKADANACQgBAAABAAQAAABAAAAQABAEABAAQgDAHgDAMQgHAeACAJQAHAWAZAGQABAYABAaQAFCEABBBIACBiQAAAOAPAAQAPAAAAgOQAAh3gKjgQAIgBAJgDQAUgGAOgNQAQgPgFgTQgCgJgcgSQgCgBgCgBQASgHAzglQAYgRAYgVQAagTAdgYQBahYBHh3QBPiGAriOQAtiZgDiRQgChkgbhVQgfhfg8hDQg6hBhVgm").p("AG4AaQhJClhtB8QgwA2g4AtQhPA2gRAKQgGgCgEgCQgCgCgCgDQAFgHALgTQAFgRAKgjQAFgZAEgWQAIgrgFAAQAAAAgYBRQgUBAgDAUQgFgEgFgDQABgCAAg1QAAg3gFgBQgIAAABA5QAAAqAGAKQgFgDgGgCQgagJgHAKQgHgKgJgOQgmg0gHAOQABgDAiAwQAPAWAIALQgLgCgFgBQgygRg3gnQhnhGhchyQhVhpgziFQgyiDgKiLQgPi+BbidQBeiiCuhEQCxhFC4AlQDMApBcCaQBZCVgSDUQgQCvhSC6").p("AgFHWIAnAHQAAACATAOQAVAOABAFQAFAMgRAKQgNAHgOADQgSAEgOgEQgQgGAAgTQAAgBAEgZQAFgWgCgB").f("#c1272d").p("AIalPQASjUhZiVQhciajMgpQi4glixBFQiuBEheCiQhbCdAPC+QAKCLAyCDQAzCFBVBpQBcByBnBGQA3AnAyARQAFABALACQgIgLgPgWQgigwgBADQAHgOAmA0QAJAOAHAKQAHgKAaAJQAGACAFADQgGgKAAgqQgBg5AIAAQAFABAAA3QAAA1gBACQAFADAFAEQADgUAUhAQAYhRAAAAQAFAAgIArQgEAWgFAZQgKAjgFARQgLATgFAHQACADACACQAEACAGACQARgKBPg2QA4gtAwg2QBth8BJilQBSi6AQiv").p("AFZrkQAYATAJAKQArAuAaA6QALAWATBUQAXBggTgBQgFAAgIhFQgOg/gbg8Qgcg6gjgrQg4g5ADgDQAEgGAeAZ").p("AHhk5QgLAAgCgZQgBgZALgDQAMgEACAdQADAcgOAA").p("AgIHtQgEAZAAABQAAATAQAGQAOAEASgEQAOgDANgHQARgKgFgMQgBgFgVgOQgTgOAAgCIgngHQACABgFAW").p("AgrHVQAMAEALACQAAAAAAgBQgBAAABAAQgNgCgKgD").f("#ffffff").p("AE3r3QgDADA4A5QAjArAcA6QAbA8AOA/QAIBFAFAAQATABgXhgQgThUgLgWQgag6grguQgJgKgYgTQgegZgEAG").p("AHslVQgCgdgMAEQgLADABAZQACAZALAAQAOAAgDgc").f();
	this.shape.setTransform(55.8,92.7);

	this.addChild(this.shape);
}).prototype = p = new Container();
p.nominalBounds = new Rectangle(0,0.2,111.6,184.9);
p.constructor = lib.Balloon;


(lib.LegFront = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{},true);

	// legmovement
	this.instance = new lib.LegFrontMove("synched",0);
	this.instance.setTransform(10.3,13.8,1,1,-31.6,0,0,10.2,13.5);

	this.timeline.addTween(Tween.get(this.instance).to({scaleX:1.02,scaleY:0.79,rotation:0,skewX:-4.6,skewY:-16.2,regX:10.3,x:10.4,y:13.7},4).to({scaleX:1,scaleY:1,rotation:28.7,skewX:0,skewY:0,x:10.3,y:13.8},5).to({scaleX:1,scaleY:1.07,rotation:0,skewX:-1.1,skewY:4.6,regX:10.4,regY:13.6,x:10.4,y:13.9},5).to({scaleX:1,scaleY:1,rotation:-31.5,skewX:0,skewY:0,regX:10.2,regY:13.5,x:10.3,y:13.8},5).wait(1));

}).prototype = p = new MovieClip();
p.nominalBounds = new Rectangle(-5.2,-13,67.8,75.7);
p.constructor = lib.LegFront;


(lib.LegFrontMove = function() {
	this.initialize();

	// Layer 1
	this.shape = new Shape();
	this.shape.graphics.f("#000000").p("AgLAQQACAHAUAKQAdANgCgIQAAADgSgNQgSgOgCgEQgDgHgDgKQgDgNgCgHQgGAcgHAUQgIhFAIADQgKgGgEA/QACAKAMAZQAJgSAEgN").f();
	this.shape.setTransform(6.3,16.6);

	this.shape_1 = new Shape();
	this.shape_1.graphics.f("#000000").p("AA1gSQgBAAgZALQgaAMgBABQgYAHgOgEIgPgIQgHAFAdANQAPAEATgHQAHgCAWgNQAagOgFgF").f();
	this.shape_1.setTransform(10.9,34.5);

	this.shape_2 = new Shape();
	this.shape_2.graphics.f("#000000").p("AB+BsQgXhSgIghQgVhXAGg+QABgGAKgrQALgrABAAQgJgGgaBYQgLA8ANBKQAGAgAZBXQARBOgeAkQgTAXgiAAQgfgCgYgSQgqghgchIQgahGAAhDQAAgGAGglQAGglABAAQgKgIgQBqQAABOAfBJQAdBBA4AjQBEArAxg4QAigngMhH").f();
	this.shape_2.setTransform(13,25.5);

	this.shape_3 = new Shape();
	this.shape_3.graphics.f("#a67c52").p("ABwBUQgfh8gEgnQgJheAohDIjPCCQgVAjgBA5QgBA2ARA5QAqCFBXAPQBCAKAVg5QARgugQhA").f();
	this.shape_3.setTransform(12.5,24.8);

	this.shape_4 = new Shape();
	this.shape_4.graphics.f("#000000").p("AghgXQAPA7ASAHQgegJgTgRQgHgGgeg7QgWABAzBSQAVATAiALQATAHAcAEQAgAFAQADQgOgKgegSQgYgRgPgQQgUgXgLgaQgDgQgEgNQgGgagCAAQgMgCAPA8").f();
	this.shape_4.setTransform(25.5,53.2);

	this.shape_5 = new Shape();
	this.shape_5.graphics.f("#ffffff").p("AhBgmQADAxAoAeQAgAZA2AIQgmgYgWgnQgVgmACgtIgyAi").f();
	this.shape_5.setTransform(23.4,52.3);

	this.shape_6 = new Shape();
	this.shape_6.graphics.f("#000000").p("AgigEQAQAdAnAiQgDgCAFAGQgQAAgigUQgJgGg1g1QgNADAtA4QAgAeAnAHQASADAWgEQANgDAZgKQgggNgMgFQgWgMgRgQQgegdgOgjQgCgKgCgJQgFgRgCAAQgPgBAbBN").f();
	this.shape_6.setTransform(30.8,47.1);

	this.shape_7 = new Shape();
	this.shape_7.graphics.f("#ffffff").p("AgfhLIgsBAQAOAqAuAbQAvAcAqgPQgsgRgegpQgigqADgu").f();
	this.shape_7.setTransform(29.4,46.6);

	this.shape_8 = new Shape();
	this.shape_8.graphics.f("#000000").p("AAOA2QgngUgRgvQgCgHgGhBQgMgFgBBCQAGAqAdAfQARATAYAJQASAHAgAEQgdgqgIgQQgBgCgMgrQgMgogBAAQgNgBAMA1QAGAbAJAe").f();
	this.shape_8.setTransform(16.6,56);

	this.shape_9 = new Shape();
	this.shape_9.graphics.f("#ffffff").p("AgphPQgSAyAbAyQAcA0A0AHQgog3AAhKIgxge").f();
	this.shape_9.setTransform(15.7,55.3);

	this.addChild(this.shape_9,this.shape_8,this.shape_7,this.shape_6,this.shape_5,this.shape_4,this.shape_3,this.shape_2,this.shape_1,this.shape);
}).prototype = p = new Container();
p.nominalBounds = new Rectangle(0,0.5,40.1,64.3);
p.constructor = lib.LegFrontMove;


(lib.Body = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{},true);

	// hair3
	this.instance = new lib.hair3("synched",0);
	this.instance.setTransform(76,11.3,1,1,0,0,0,3,11);

	this.timeline.addTween(Tween.get(this.instance).to({scaleX:1.03,skewX:23.7,skewY:9},2,Ease.get(1)).to({scaleX:1,skewX:0,skewY:0},2).wait(1));

	// hair4
	this.instance_1 = new lib.hair4("synched",0);
	this.instance_1.setTransform(80.7,39.1,1,1,0,0,0,2.3,11.7);

	this.timeline.addTween(Tween.get(this.instance_1).to({scaleY:1.01,skewX:24.2,skewY:15.5},2,Ease.get(1)).to({scaleY:1,skewX:0,skewY:0},2).wait(1));

	// hair2
	this.instance_2 = new lib.hair2("synched",0);
	this.instance_2.setTransform(35.3,24.4,1,1,0,0,0,2.7,10.8);

	this.timeline.addTween(Tween.get(this.instance_2).to({scaleX:1.2,skewX:9.7,skewY:43.2,regX:2.8,regY:10.7,x:35.4,y:24.3},2,Ease.get(1)).to({scaleX:1,skewX:0,skewY:0,regX:2.7,regY:10.8,x:35.3,y:24.4},2).wait(1));

	// hair1
	this.instance_3 = new lib.hair1("synched",0);
	this.instance_3.setTransform(30.4,27.1,1,1,0,0,0,7,9.9);

	this.timeline.addTween(Tween.get(this.instance_3).to({scaleX:1,scaleY:1.01,skewX:11.1,skewY:1.8,regX:6.9,regY:9.8,x:30.3,y:27},2,Ease.get(1)).to({scaleX:1,scaleY:1,skewX:0,skewY:0,regX:7,regY:9.9,x:30.4,y:27.1},2).wait(1));

	// bodyShapes
	this.shape = new Shape();
	this.shape.graphics.f("#000000").p("AAUAOQgBgDgQgNQgQgQgDABQgLACAXAVQAWAVACgMIAAgB").f();
	this.shape.setTransform(86.7,71);

	this.shape_1 = new Shape();
	this.shape_1.graphics.f("#000000").p("AABAAQgggjACAAQgRgCAnAsQAmAsADgUQgBAEgggj").f();
	this.shape_1.setTransform(88.6,68.1);

	this.shape_2 = new Shape();
	this.shape_2.graphics.f("#000000").p("AkHgtQgCgEgGgcQgFgcABAAQgMgEAOBLQASAqAvAmQBgBQBwgUQBjgPBVhIQARgOAogwQAwg7gLgGQABABgtAxQgsAygIAGQhYBHhgAPQhmARhchGQgxgkgSgo").f();
	this.shape_2.setTransform(32.7,101.1);

	this.shape_3 = new Shape();
	this.shape_3.graphics.f("#a67c52").p("Ag3BoQBiAEBhg9QBeg7AshbIopADQgTBLBVBDQBMA9BOAB").f();
	this.shape_3.setTransform(32.7,100.5);

	this.shape_4 = new Shape();
	this.shape_4.graphics.f("#000000").p("AACgLQAGgEAFgEQAKgHgBgCQgBgHgSAMQgOAKgDAEQgEAEgDATQgEAVAFgEQACgBAIgSQAIgTAEgE").f();
	this.shape_4.setTransform(86.4,20.2);

	this.shape_5 = new Shape();
	this.shape_5.graphics.f("#000000").p("Ag3lPQBLDXAFC8QAEBqgbBOQgPAtgbAkQgDAFABAFQABAGAGADQAJAGAIgGQAFgEAHgLQAvhHALhqQAJhOgNhtQgMhqgehrQgNgzgTgzQgEgNgPADQgPAEAFAN").f();
	this.shape_5.setTransform(83.1,43.3);

	this.shape_6 = new Shape();
	this.shape_6.graphics.f("#000000").p("AgDgEQgbAOAKAFQADABATgLQAUgKAAgCQABgNgaAQ").f();
	this.shape_6.setTransform(41.4,47.5);

	this.shape_7 = new Shape();
	this.shape_7.graphics.f("#000000").p("AgDgbQAFAFgKAbQgGAPgJAUQAZgYAOgKQAFgEAbgMQAPgHAGgDQgIABgUADQghAHgGALQAGgOgCgNQgBgSgRAIQgGADgcAhQgbAhAEAAQAHABAWghQAWggAPAD").f();
	this.shape_7.setTransform(31.4,47.2);

	this.shape_8 = new Shape();
	this.shape_8.graphics.f("#000000").p("AAqgtQABAegHADQgEACgZhNQABARADAjQABAdgKAUQgyBLgBAAQAGAGAogxQAkgugKgMQAaAXAAgnIgFgwQgDABABAe").f();
	this.shape_8.setTransform(155,67);

	this.shape_9 = new Shape();
	this.shape_9.graphics.f("#000000").p("AABAAQANgzACABQgLgKgOA7QgPA6AQgEQgCAAALg1").f();
	this.shape_9.setTransform(5.7,63.9);

	this.shape_10 = new Shape();
	this.shape_10.graphics.f("#000000").p("ABYhWQgUBAggA1QgjA8gsAjQhMAoAAABQACASBhg2QAugkAlhDQANgYAZhOQAdhegRgBQgFgBgUBU").f();
	this.shape_10.setTransform(71.2,75.6);

	this.shape_11 = new Shape();
	this.shape_11.graphics.f("#a67c52").p("AAwAnQA8hiAIhsIjoFQQBggOBEh0").f();
	this.shape_11.setTransform(70.9,75.4);

	this.shape_12 = new Shape();
	this.shape_12.graphics.f("#000000").p("AD7ABQgYAognAUQhLAmh3ghQhbgZhRg2QgJgHhZhQQgRAIB6BpQBQA3BdAYQB4AbBLgqQArgYAWguQAEgHAHgWQAIgbgFgBQgCgBgXA0").f();
	this.shape_12.setTransform(111.7,83.8);

	this.shape_13 = new Shape();
	this.shape_13.graphics.f("#a67c52").p("AEUgtIoogyQAiA6BSAzQBTA1BYAVQBiAWBEgcQBOghAVhe").f();
	this.shape_13.setTransform(111.7,83.2);

	this.shape_14 = new Shape();
	this.shape_14.graphics.f("#000000").p("AKdkpQiPhsi/g5Qi3g2i7AJQjCAKiqBNQioBMh0B5QiECKgcCjQgPBYASBYQATBbA1BEQA1BDBIAVQAKADA4ABQA8AAgEgHQhAAGgFgBQgzgCgvgcQhFgqgphaQgqhdAGhsQAFhoAxheQBWiqC+hzQCshpDNgdQC4gaC8ApQC7AoCfBjQC/B4AmCIQAYBVguBSQgoBHhSA1QhTA0hWAPQhfAQhUghQg5gXhyg+QhngwhNAAQhTAAhKBGQgaAZgiArQgTAYgkAuQhEBRgyAmQgmAbgfAIQg5AFABgDQgDAMBXgRQAmgQAwgqQAhgfAngtQAGgGA9hKQAxg5AYgUQAtgnAxgJQAygKA8AQQArAMA+AdQBJAmAlATQBCAiAxALQBhAYB3guQBogoBGhHQBShUAAhiQACiZi3iL").f();
	this.shape_14.setTransform(85.1,59.8);

	this.shape_15 = new Shape();
	this.shape_15.graphics.f("#a67c52").p("ANDg+QgYhviBhoQjsi/lCgdQlCgekICSQiaBVhiB3QhwCJgOCcQgGBGATBJQATBOAoA5QBgCMCZgpIgSAIIAIABQAwAKA2ghQAkgWAvgwQAegfAzg+QA2hDAagbQBfhnCSAoQAzAPBMAkQBSAqAnARQBzA0CDghQB9ggBZhgQAsgvATg4QAUg7gOg8").f();
	this.shape_15.setTransform(84.9,60.3);

	this.timeline.addTween(Tween.get({}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(5));

}).prototype = p = new MovieClip();
p.nominalBounds = new Rectangle(0,0.5,170.2,111.5);
p.constructor = lib.Body;


(lib.hair3 = function() {
	this.initialize();

	// Layer 1
	this.shape = new Shape();
	this.shape.graphics.f("#000000").p("AAXgOQgHgUgTgfIAAA0QgXBGgFgIQADAJAcglQADgJABgNQACgVABgDQAMAcACAVQACAZgOAKQgBABgNAGQABAFAOgIQAOgJADgFQAKgXgOgo").f();
	this.shape.setTransform(3.2,7);

	this.shape_1 = new Shape();
	this.shape_1.graphics.f("#a67c52").p("AgCA5QAkgDgGgtQgEgjgUgdQAAApgDANQgGAegYALIAbAR").f();
	this.shape_1.setTransform(2.9,7.8);

	this.addChild(this.shape_1,this.shape);
}).prototype = p = new Container();
p.nominalBounds = new Rectangle(0,0.2,6.4,13.5);
p.constructor = lib.hair3;


(lib.hair4 = function() {
	this.initialize();

	// Layer 1
	this.shape = new Shape();
	this.shape.graphics.f("#000000").p("AgWgbQAYgSAJgIQAAASgFAZQAAADgIApQAZgWARgJQghBXgHgIQAEAHAagqQAbgrgGgPQgJADgRALQgLAGADgQQACgQABgVQgBgYAAgNQgIALgeAeQggAhgCgDQADAFAcgW").f();
	this.shape.setTransform(5.3,8.5);

	this.shape_1 = new Shape();
	this.shape_1.graphics.f("#a67c52").p("AACBLQAvgoAAgtQgWAIgSAOQAKgrAAgrQgdAkgoAVIA0Bc").f();
	this.shape_1.setTransform(5,9.2);

	this.addChild(this.shape_1,this.shape);
}).prototype = p = new Container();
p.nominalBounds = new Rectangle(0,0.2,10.6,16.5);
p.constructor = lib.hair4;


(lib.hair2 = function() {
	this.initialize();

	// Layer 1
	this.shape = new Shape();
	this.shape.graphics.f("#000000").p("AAdAHQgBgQgIgPQgHgMgNgLQgHgFgTgLQAHAwAAATQAAACgGAeQgGAbADABQALAIAKgpQAIgpABgCQADgEAEAgQAFAigDgCQAHAFAGgWQAGgSgBgG").f();
	this.shape.setTransform(3,6.7);

	this.shape_1 = new Shape();
	this.shape_1.graphics.f("#a67c52").p("AgIg0QAKA8gbAuIAngQQAPgWgHgbQgIgbgWgO").f();
	this.shape_1.setTransform(2.6,7.8);

	this.addChild(this.shape_1,this.shape);
}).prototype = p = new Container();
p.nominalBounds = new Rectangle(0,0.2,5.9,13);
p.constructor = lib.hair2;


(lib.hair1 = function() {
	this.initialize();

	// Layer 1
	this.shape = new Shape();
	this.shape.graphics.f("#000000").p("AAig0QgIgIgPgKIgJA3QgIAlgJARQgDAFggAYQABAMAmgVQAPgNAJgYQACgDAGgWQAHgYgBAAQAKAHgEAgQgEAfADABQAKAIAFgmQAEgigCgIQgEgOgLgK").f();
	this.shape.setTransform(5,7.5);

	this.shape_1 = new Shape();
	this.shape_1.graphics.f("#a67c52").p("AAKg3QgJA3gGASQgLAdgUALIA7gSQAPgWgDgcQgDgfgWgO").f();
	this.shape_1.setTransform(5.9,7.9);

	this.addChild(this.shape_1,this.shape);
}).prototype = p = new Container();
p.nominalBounds = new Rectangle(0,0.2,10.1,14.4);
p.constructor = lib.hair1;


(lib.Tail = function() {
	this.initialize();

	// tail
	this.shape = new Shape();
	this.shape.graphics.f("#000000").p("Ag+ldQAtAlAGAHQAxA6AhBXQAfBTAHBbQAFBPgNBjQgJBIgEAQQgOA4gaAWQgPALgVgKQgRgJgMgQQgSgagGg1QgDgdgBg/QgBg8gEggQgIg6gZgZQgFgFgUgLQgYgMgBAHQABgEAXASQAXARACADQARAcAEA5QABATAABRQgBA+AHAmQAIArAcAgQAiAnAngUQAhgRASg6QAHgZAKhGQAQhqgGhVQgHhhgkhZQgmhgg8g8QgMgKgngbQgugfgCAIQABgEAuAm").f();
	this.shape.setTransform(13.3,40.1);

	this.shape_1 = new Shape();
	this.shape_1.graphics.f("#8c6239").p("Ahpl5IgYFeQBFALALBpQAGA6gFBnQAEAsAKAbQAPAnAeAOQAeAOAVgUQAQgOANgjQAYhEAJhXQAIhPgGhQQgJh2g7hpQhAh2hjgp").f();
	this.shape_1.setTransform(12.9,39.4);

	this.addChild(this.shape_1,this.shape);
}).prototype = p = new Container();
p.nominalBounds = new Rectangle(0,1.4,26.6,77.3);
p.constructor = lib.Tail;


(lib.PlatypusPop = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{},true);

	// beak
	this.instance = new lib.Beak("synched",0);
	this.instance.setTransform(63.6,260.4,1,1,0,0,0,63.6,22.7);

	this.timeline.addTween(Tween.get(this.instance).to({rotation:-11,regX:63.7,x:79.8,y:271.5},4).wait(6));

	// balloon
	this.instance_1 = new lib.BalloonPop("synched",0);
	this.instance_1.setTransform(129.1,91.1,1,1,0,0,0,55.8,92.7);

	this.timeline.addTween(Tween.get({}).to({state:[{t:this.instance_1}]}).wait(10));

	// legback
	this.instance_2 = new lib.LegFront2("synched",0);
	this.instance_2.setTransform(182.4,255.1,1,1,22.3,0,0,13.9,8.7);

	this.timeline.addTween(Tween.get(this.instance_2).to({rotation:-90.4,regX:13.8,regY:8.8,y:242.9},4).wait(6));

	// legfront
	this.instance_3 = new lib.LegFront2("synched",0);
	this.instance_3.setTransform(106.4,264.7,1,1,46.2,0,0,10.5,17.7);

	this.timeline.addTween(Tween.get(this.instance_3).wait(1).to({rotation:83,regY:17.6,x:100.7,y:256.7},0).wait(1).to({scaleX:1,scaleY:1,rotation:159,x:103.9,y:248.7},0).wait(1).to({scaleX:1,scaleY:1,rotation:145.3,regX:0,regY:0,x:136.2,y:240.2},0).wait(7));

	// eye
	this.instance_4 = new lib.EyeSurprise("synched",0);
	this.instance_4.setTransform(80.1,248.1,1,1,0,0,0,15,12.5);

	this.timeline.addTween(Tween.get(this.instance_4).to({rotation:-11,regY:12.6,x:93.4,y:256.3,startPosition:3},4).wait(6));

	// body
	this.instance_5 = new lib.Body("synched",0);
	this.instance_5.setTransform(132.1,185.1,1,1,0,0,0,80.1,11.2);

	this.timeline.addTween(Tween.get(this.instance_5).to({rotation:-11,x:132.3,y:184.3,startPosition:3},4).wait(6));

	// tail
	this.instance_6 = new lib.Tail("synched",0);
	this.instance_6.setTransform(214,236.6,1.001,1.004,0,0,5.6,9.8,23.8);

	this.timeline.addTween(Tween.get(this.instance_6).to({scaleX:1.05,skewX:-173.4,skewY:12.1,x:220.2,y:219.7},4).to({skewX:-184,skewY:1.7,regY:23.9,x:220.1},3).to({skewX:-173.4,skewY:12.1,regY:23.8,x:220.2},2).wait(1));

	// legfrontback
	this.instance_7 = new lib.LegFront2("synched",0);
	this.instance_7.setTransform(158.8,246.3,0.86,0.86,51.7,0,0,10.5,17.7);

	this.timeline.addTween(Tween.get(this.instance_7).to({rotation:-39.3,regY:17.6,y:236.8,startPosition:4},4).to({_off:true},1).wait(5));

	// legbackfront
	this.instance_8 = new lib.LegFront2("synched",0);
	this.instance_8.setTransform(98.6,267.5,0.884,0.884,68.5,0,0,13.9,8.7);

	this.timeline.addTween(Tween.get(this.instance_8).to({rotation:0,skewX:-125.9,skewY:-127.3,regX:14,regY:8.8,x:98.5,y:262,startPosition:4},4).to({_off:true},1).wait(5));

}).prototype = p = new MovieClip();
p.nominalBounds = new Rectangle(0,-59,244.9,392.5);
p.constructor = lib.PlatypusPop;


(lib.BalloonPop = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{},true);

	// smallChunk1
	this.instance = new lib.balloonChunk4("synched",0);
	this.instance.setTransform(19,96.2,1,1,49.1,0,0,8.3,8.4);

	this.timeline.addTween(Tween.get(this.instance).wait(1).to({rotation:-52.2,regX:8.4,regY:8.5,x:-36.6,y:137.3},0).to({_off:true},1).wait(8));

	// smallChunk2
	this.instance_1 = new lib.balloonChunk4("synched",0);
	this.instance_1.setTransform(19,16.2,1,1,114.5,0,0,8.4,8.4);

	this.timeline.addTween(Tween.get(this.instance_1).wait(1).to({x:-8.8,y:-29.5},0).to({_off:true},1).wait(8));

	// midChunk1
	this.instance_2 = new lib.balloonChunk2("synched",0);
	this.instance_2.setTransform(15.9,50.7,1,1,0,0,0,14.6,24.9);

	this.timeline.addTween(Tween.get(this.instance_2).wait(1).to({rotation:8.9,x:-44.4,y:21.3},0).to({_off:true},1).wait(8));

	// midChunk2
	this.instance_3 = new lib.balloonChunk3("synched",0);
	this.instance_3.setTransform(91.7,84,1,1,0,0,0,13.2,26.7);

	this.timeline.addTween(Tween.get(this.instance_3).wait(1).to({rotation:9,regX:13.4,x:154.3,y:92},0).to({_off:true},1).wait(8));

	// bigChunk
	this.instance_4 = new lib.balloonChunk1("synched",0);
	this.instance_4.setTransform(65,34.3,1,1,0,0,0,33,40.5);

	this.timeline.addTween(Tween.get(this.instance_4).wait(1).to({x:79.5,y:-17},0).to({_off:true},1).wait(8));

	// flatBalloon
	this.instance_5 = new lib.BurstBalloon("synched",0);
	this.instance_5.setTransform(56.2,143.9,1,0.805,0,0,0,23.5,138.6);

	this.timeline.addTween(Tween.get(this.instance_5).wait(2).to({scaleY:1,regX:20.5,regY:74.6,x:53.2,y:79.9},0).to({scaleY:1,skewX:-5,x:46.4},2).to({scaleY:1,skewX:4.6,x:59.2},3).wait(1).to({scaleY:1,skewX:2.3,x:56.2,y:79.8},0).wait(1).to({scaleY:1,skewX:0,x:53.2,y:79.9},0).wait(1));

	// string
	this.shape = new Shape();
	this.shape.graphics.f("#000000").p("AgbkMQADBAAEBQQADBJAHCSQAFCTAABJQAAA7AYgVQAMgKgDgwQgFg0AAgLQgChcgHiNQgJjRgBgYIgDhtQAAgOgOAAQgPgBAAAPIABBL").f();
	this.shape.setTransform(58.2,150.5,1,0.961);

	this.timeline.addTween(Tween.get({}).to({state:[{t:this.shape}]}).wait(10));

}).prototype = p = new MovieClip();
p.nominalBounds = new Rectangle(1.6,-5.9,103.6,191);
p.constructor = lib.BalloonPop;


(lib.balloonChunk4 = function() {
	this.initialize();

	// Layer 1
	this.shape = new Shape();
	this.shape.graphics.f("#000000").p("AAcgiQANAYAQAeQgbApgbgBQgYgBgcgoQgRgWALgSQAHgLAegTQAXgQgJgBQgKAAgSANQgGAEgZASQgVARABANQAFAbAZAdQAcAfAaAAQAsAAAnhHQgigNgIghQgIgxgDAAQgZAAAWAw").f();
	this.shape.setTransform(8.4,8.7);

	this.shape_1 = new Shape();
	this.shape_1.graphics.f("#c1272d").p("AADhBQgXAAgUAWQgBAAgfAmQAWArAFAJQAUAeAZAFQAWAEAWgYQAKgLATggQgagMgIgdQgGgUAAgmIgeAP").f();
	this.shape_1.setTransform(8.2,8.4);

	this.addChild(this.shape_1,this.shape);
}).prototype = p = new Container();
p.nominalBounds = new Rectangle(0,0.3,16.8,16.8);
p.constructor = lib.balloonChunk4;


(lib.balloonChunk2 = function() {
	this.initialize();

	// Layer 1
	this.shape = new Shape();
	this.shape.graphics.f("#000000").p("AArhDQgEAAAnBIQAoBLAAAIQhBgHg1AlQgwAhggA/QgpgnAHggQABgDAnhJQAZgvAYhNQAfhuAHgTQABAHAJBGQAKBDAFAAQACAAgRjNQgaAzgdBcQgjBtgPAkQgBADgmA7QgbAsAFAWQAFAWAYAXQADAEAmAfQAmhRAtgeQAwggBYgBQgWgrgdg0QgthPgHAC").f();
	this.shape.setTransform(14.9,25.2);

	this.shape_1 = new Shape();
	this.shape_1.graphics.f("#c1272d").p("AAmgxQAAghgJg2QgKhCgBgWQgWAwgbBaQgdBhgRApQgBABghA1QgYAmAFATQAFARARASQAJAKAXARQAghFAyghQAzghBMAAQgGgLguhEQgggvgGgmIgFAZ").f();
	this.shape_1.setTransform(14.9,25.8);

	this.addChild(this.shape_1,this.shape);
}).prototype = p = new Container();
p.nominalBounds = new Rectangle(0.3,0.3,29.1,49.7);
p.constructor = lib.balloonChunk2;


(lib.balloonChunk3 = function() {
	this.initialize();

	// Layer 1
	this.shape = new Shape();
	this.shape.graphics.f("#000000").p("AAej+QACABgPALQgNgcgEAFQAAgBAKAdQgUAPgvAeQgPAIgJAFQgQAIgGAIQADAVAQAfQARAkAEAOQAJAegOAgQgHAUgZAkQgFAIgRAXQgNAVAIAOQAHAMARASQAUAXAGAHQAHAKAMAdQAKAaAKAKQAVAXgCgcQgIgiAAgFQAAgkAlghQAWgSA4gkQAsgjABgqQABgoglg4QguhIgHgVQgOgmgKgWQAQgQgGgD").p("AAOjjQANAkACAJQAJAgAVAjQAMAVAbAqQAdAxgNAiQgKAZgpAaQhCAsgCACQglAegFAkQgDgPgkgqQgZgfAXgfQAhguAHghQAIgngWguQgSgmABgPQABgSAegVQAqgeAUgSQAAABAAAB").f();
	this.shape.setTransform(13.5,27);

	this.shape_1 = new Shape();
	this.shape_1.graphics.f("#c1272d").p("AgbjDQgvAagXAOQgIAWAXApQAcAvACAQQACAegbAsQgPAXgeAtQAfAZAZAvQAOAaAXA0QgZg9AwgxQAdgdBKgzQAkghgNguQgHgagjg1Qgkg0gJgrQgGgegFgOQgCgGgDgFQgRAWgbAS").p("AAcj6IgegKQALAKAIAPQAGgIAFgH").f();
	this.shape_1.setTransform(13.7,26.6);

	this.addChild(this.shape_1,this.shape);
}).prototype = p = new Container();
p.nominalBounds = new Rectangle(0.3,0.3,26.5,53.5);
p.constructor = lib.balloonChunk3;


(lib.balloonChunk1 = function() {
	this.initialize();

	// Layer 1
	this.shape = new Shape();
	this.shape.graphics.f("#000000").p("AgnkjQAXAYA0ANQAeAIA/AOQA0AQAYAeQAIAKgFAXQgDAMgHAVQgNAoAPAwQAKAgAqA2QApA1AIAhQioAyASBvQgDgHgOgMQgVgQgEgEQgngngahMQgQhDgOgrQgbhRggAFQhNAPhLBIQhLBGgUBLQAFgogFh9QgEhlAVg/QAfhaAFgZQAOhOgogeQAIAFAyAKQASAEAMABQgigLhfguQA2A8gPBbQgIA0ghBqQgJArABA4QABAhAEBDQAEBIgVBvQBDh2Aqg9QBNhsBTgXQAdgJAcBUQAMAtASBEQAXA5A7BCQAhAlBDBIQghhWgCgIQgOg6AggkQAWgYAqgRQAHgDBDgUQgNgcgwhFQgqg6gLgqQgEgPAJhPQAHg6gjgSQgfgRg3gNQhDgRgQgGQhWghAChnQgDADgvAoQgtAlABABQAEAFBShBQgDA8AfAf").f();
	this.shape.setTransform(33.3,40.8);

	this.shape_1 = new Shape();
	this.shape_1.graphics.f("#c1272d").p("AhClxQgcAcg+AqIgFgPQg9AHg7gqQAnArgLBMQgEAZghBjQgVBCAFB2QAGCFgLA3QBIh6AggnQBEhSBYgXQAXgFAPAjQAIAUAIAoQAHAUAMAnQALAkAKAXQARAnAqAuQAYAaAvA0QgghOAwg3QAmgqBWgaQgLgXgxhIQgog6gKgqQgGgYAKgrQALgsgEgUQgDgRgYgOQgOgIgagKQhmgZgqgUQhIgiADhV").f();
	this.shape_1.setTransform(33.6,38.4);

	this.addChild(this.shape_1,this.shape);
}).prototype = p = new Container();
p.nominalBounds = new Rectangle(0.3,0.3,66,80.9);
p.constructor = lib.balloonChunk1;


(lib.BurstBalloon = function() {
	this.initialize();

	// poppedballoonshapes
	this.shape = new Shape();
	this.shape.graphics.f("#c1272d").p("Ag+o0QgMAtAHBIQAMB1AAAAQAGCxgmB7QgWgbgOgrQgCgKgRhCQABAMgaD9QgQCogBA6QACAQABAPIAEgCQASCOAxBXQAPAaALAOQAUAYAUADQAdABANABQgHgMgMgRQghgvgBACQAHgOAkA1QANASAHANQABgCABgCQAMgNAcAPQgHgHgBgvQAAg6AJACQAFAAABA3QAAA3gDABQgBAAAAAAQAGADAFAEQACgVAThBQAXhQADAAIABAAQAPADgeBUQgOAogRAoQAKAIgDAEQgBABgBAAQgGgCgGgCQgBADArATQABABACAAQgEgEgHgEQgDgCgDgCQAigGAEgCQAXgMANgcQAJgUAHghQAKgzAAhDQAAgVgBgnIAHAKQgBgBgWj+QgIhCgMhFQgRhkgRg1QgNghgHgRQgMgdgBgUQAAAgADA9QACA6gHAmQgBgGgMgNQgHgGgHgIQgDgCgCgCQgEgDgDgDQABAKABAIQADAdATByQAUB5ADgBQgPAKgrkIQgFg6gPhGQgHgkgWhaQgThEgKg/QAAAAgDg1QgCgigKgT").p("AAyDNQABABABAAIgBAAQgCABgCgBIADgB").p("AA7KOIgogGQAEADgCANQgBAMgEAPQgHApAzgLQA2gLgXgTQgQgKgHgHQgMgLADgJ").f("#000000").p("AAvDOQACABACgBIABAAQgBAAgBgBIgDAB").p("Agyn/QADA1AAAAQAKA/ATBEQAWBaAHAkQAPBGAFA6QArEIAPgKQgDABgUh5QgThygDgdQgBgIgBgKQADADAEADQACACADACQAHAIAHAGQAMANABAGQAHgmgCg6QgDg9AAggQABAUAMAdQAHARANAhQARA1ARBkQAMBFAIBCQAWD+ABABIgHgKQABAnAAAVQAABDgKAzQgHAhgJAUQgNAcgXAMQgEACgiAGQADACADACQAGgBAJgCQANgCAMgFQADgCAEgBQAhgOARhKQANg5AChJQABg1gEhQQgCgUgCgTQAAgDAAgDQgCgwgEhBQgLhvgvi3Qg1jSgOhTQgGBtgCA9QgDBdADBMQgHgVgQgSQgHgrgMg2Qgbh/gFgbQgMhBgPhwQgRiCgIgvQgVCfAJC7QAEBrgCA1QgCBZgPBGQgGABgdhzQgeiAgDgFQACBXgHB1QgFBEgKCIQgEA1gBArQgHAQgEATQgKAxAJBFQATCeA6BdQArBCAuAFQAYgDAKgDQABABAAABQAAADABACQABABACAAQgGAKgCATQgDAZAGAQQAKAbApgGQAkgEAVgSQAcgXghgXQgCAAgBgBQgrgTABgDQgDAJAMALQAHAHAQAKQAXATg2ALQgzALAHgpQAEgPABgMQACgNgEgDIAoAGQAGACAGACQABAAABgBQADgEgKgIQARgoAOgoQAehUgPgDIgBAAQgDAAgXBQQgTBBgCAVQgFgEgGgDQAAAAABAAQADgBAAg3QgBg3gFAAQgJgCAAA6QABAvAHAHQgcgPgMANQgBACgBACQgHgNgNgSQgkg1gHAOQABgCAhAvQAMARAHAMQgNgBgdgBQgUgDgUgYQgLgOgPgaQgxhXgSiOIgEACQgBgPgCgQQABg6AQioQAaj9gBgMQARBCACAKQAOArAWAbQAmh7gGixQAAAAgMh1QgHhIAMgtQAKATACAi").f();
	this.shape.setTransform(20.5,74.6);

	this.addChild(this.shape);
}).prototype = p = new Container();
p.nominalBounds = new Rectangle(0,0,41,149.2);
p.constructor = lib.BurstBalloon;


(lib.LegFront2 = function() {
	this.initialize();

	// legmovement
	this.instance = new lib.LegFrontMove("synched",0);
	this.instance.setTransform(10.3,13.8,1,1,-31.6,0,0,10.2,13.5);

	this.addChild(this.instance);
}).prototype = p = new Container();
p.nominalBounds = new Rectangle(-5.2,-12.9,67.9,75.7);
p.constructor = lib.LegFront2;


(lib.EyeSurprise = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{},true);

	// Layer 2
	this.instance = new lib.EyeBallDot("synched",0);
	this.instance.setTransform(14.6,18.1,1,1,0,0,0,2,2);

	this.timeline.addTween(Tween.get(this.instance).to({scaleX:0.63,scaleY:0.63,x:13.6,y:6.1},4).wait(21));

	// Layer 1
	this.instance_1 = new lib.EyeBall("synched",0);
	this.instance_1.setTransform(15,12.5);

	this.timeline.addTween(Tween.get({}).to({state:[{t:this.instance_1}]}).wait(25));

}).prototype = p = new MovieClip();
p.nominalBounds = new Rectangle(0.2,0.2,30,25);
p.constructor = lib.EyeSurprise;


(lib.EyeBallDot = function() {
	this.initialize();

	// Layer 1
	this.shape = new Shape();
	this.shape.graphics.f("#000000").p("AAOAOQAGgFAAgJQAAgIgGgGQgFgFgJAAQgIAAgGAFQgFAGAAAIQAAAJAFAFQAGAGAIAAQAJAAAFgG").f();
	this.shape.setTransform(2,2);

	this.addChild(this.shape);
}).prototype = p = new Container();
p.nominalBounds = new Rectangle(0,0,4,4);
p.constructor = lib.EyeBallDot;


(lib.EyeBall = function() {
	this.initialize();

	// Layer 1
	this.shape = new Shape();
	this.shape.graphics.f("#000000").p("AgEghQiHADAFAVQABABBAgBQBEgBAFABQAEABBBAXQA9AXABgCQANgWiYgv").f();
	this.shape.setTransform(-1.2,-8.7);

	this.shape_1 = new Shape();
	this.shape_1.graphics.f("#000000").p("AAQAAQgThDgKAPQgBABAHAYQAHAZAAACQAAADgHAZQgIAZACABQAKAOAThE").f();
	this.shape_1.setTransform(13.8,3);

	this.shape_2 = new Shape();
	this.shape_2.graphics.f("#000000").p("AAngJQglAKgBAAQgDAAgkgCQgigEAAABQgGAFAiAOQAVAHAagEQBSgYgLgMQgBgBgiAK").f();
	this.shape_2.setTransform(1.3,10.9);

	this.shape_3 = new Shape();
	this.shape_3.graphics.f("#000000").p("ABQAoQAAApglARQgmARglghQgdgcgPgqQgOgpAHgiQAMgggBgCQgKgJgRBKQgBAoAUAoQATApAiAVQAnAaAogSQAvgWACgxQACgqgdgsQgYgmgggXQgugdgBAIQAkAbADADQAdAaAUAjQAVAmAAAg").f();
	this.shape_3.setTransform(0.2,0.2);

	this.shape_4 = new Shape();
	this.shape_4.graphics.f("#ffffff").p("AhJhdQgTAZABApQAAAmASAlQASAnAcASQAfAVAjgLQBSgbgqhgQgRgmggggQgfgfgdgIIgrAY").f();
	this.shape_4.setTransform(0.2,-0.2);

	this.addChild(this.shape_4,this.shape_3,this.shape_2,this.shape_1,this.shape);
}).prototype = p = new Container();
p.nominalBounds = new Rectangle(-14.7,-12.2,30,25);
p.constructor = lib.EyeBall;


(lib.Background = function() {
	this.initialize();

	// cliff
	this.instance = new lib.cliff();
	this.instance.setTransform(0,89);

	// FlashAICB
	this.instance_1 = new lib.Cloud("synched",0);
	this.instance_1.setTransform(629.6,340.6,0.51,0.32,0,46.1,0);
	this.instance_1.alpha = 0.4;

	this.instance_2 = new lib.Cloud("synched",0);
	this.instance_2.setTransform(334.6,280.6,0.66,0.555,0,-44.4,0);
	this.instance_2.alpha = 0.48;

	this.instance_3 = new lib.Cloud("synched",0);
	this.instance_3.setTransform(297.6,98.6,1.4,1.408,0,-6.1,180);

	this.instance_4 = new lib.Cloud("synched",0);
	this.instance_4.setTransform(666.6,195.6,1.31,1.293,0,50.2,0);
	this.instance_4.alpha = 0.63;

	// sky
	this.shape = new Shape();
	this.shape.graphics.lf(["#d7eccb","#48a6ad"],[0,1],0,210,0.1,-209.9).p("EA+ggfPMh8/AAAMAAAA+fMB8/AAAMAAAg+f").f();
	this.shape.setTransform(400,200);

	this.addChild(this.shape,this.instance_4,this.instance_3,this.instance_2,this.instance_1,this.instance);
}).prototype = p = new Container();
p.nominalBounds = new Rectangle(0,0,875.5,400);
p.constructor = lib.Background;


(lib.cliff = function() {
	this.initialize(images.cliff);
}).prototype = new Bitmap();
p.constructor = lib.cliff;
p.nominalBounds = new Rectangle(0,0,139,311);


(lib.Cloud = function() {
	this.initialize();

	// Layer 1
	this.shape = new Shape();
	this.shape.graphics.f("#cccccc").p("AMeAFQAbhkhAg8Qg2gyhsgOQhIgKh8ACIhVAAQgVAAgEgIQgDgOgEgPQgYhPhDg0Qg+guhVgPQhRgOhSATQhTAUg6AxQgNALgcAmQgaAhgSANQgMAHgjgBQgngCgNAFQgyARg1AnQglAggNAHQgSAKglgOQhFgYhQARQhKAPhAAuQgdAVg6BUQgvBCg1ANQhGARgVA0QgGAOgBAVQgDAOgWAGQg2ANgqAWQg4AdgRAlQgVAuBKAlQAtAWBBAOQCIAcC4glQAqgJBXgfQBUgfAtgIQAZgEArAPQA2ATAPABQADABBSABQAxABAiAOQAPAHBbA4QBBAoAxAFQBKAIBTghQA2gUBbg2QA2gfBSgHQBHgGBIANQAaAFAxAMQAqAJAigCQAdgBAzATQBAAXASAEQBNANBWgBQAygCAsgFQAuAQAvAIQAdAFAmgCQASgBAygEQBPgIAzgSQBVgfgmgzIgCgBQgcgkhJgFQhSgGgbgXQgIgIgmgnQgbgdgZgOQg+gjhfgUQAUg2g8gaQgmgQhBgE").p("AOOCXQAug0BmA3QBaAwAkA9QgOABgiAJQgpAKADAGQGTAAh9BSIgEADQg1AihPAKQhKAJhHgPQgCAAhVgWQhLgUAAACQgCACAWALQAMAHANAFQh8ANhqgRQghgGgzgPQgLgCgPgHQgWgJAPgCQgSgIgUAAQASANg2gFQhCgHgmgQQAlgFAWgJQAigMANgXQAnhMgUADQADAAgKAcQgLAcgCACQgTAVgiAMQgYAIgmAEQg+AHhjgKQhKgHg+gFQh6gKgBAEQAAAJBRAMQArAGA2AGQiFBLgIAEQhSAphGAGQhKAGhSgsQheg5gvgbQgYgOgfAAQglAEgVACQgfACgogNQg7gSgKgCQgYgFgfAMQgkAPgRAGQhiAiheAPQipAdiwgiQhFgOgbgjQgggpBEgmQAhgSAugPQAjgMAXAOQAnAZAQAEQATAFBEgMQBIgNgHgOQgDgIgkAHQhGAPgBAAQhiAPAPhTQAIgqBjgeQAygQAwgLQABgIgtAAQAqh9CBg6QCCg7B3A7QgVAggCAkQgEAmAVAeQgTAJgcAEQggADgQADQg5AJgXAoQgMAUAWAwQAWAxAJgMQAEgFgJgOQgMgSgGgLQgXgrAlgcQAtggA+ABQAvABA/AUQhFhAAGg+QAHg+BQg2QBcg+A1AIQAIACBEAtQBAAqADgGQACgDgFgLQgGgLgDACQACAJAEAHQgagMgegbQgmgjAMgSQAlg2BCgxQBxhRCNAeQA+ANAwAaQA5AfAgAtQAkAvAEA9QABAFAwAAQA7AECDgDQB1ABBEAdQAuATAkBAQAqBJg4AXQgwAFgsAFQhVAJACAIQABACBugBQB2gBAHAAQBkAGgTA8QgNAqhEA9QBKgaAogBQBJgEAPA9QAFARgqBPQARATAkhzQgFgqgqgXQgOgHgfAAQgfAAgLgG").f();
	this.shape.setTransform(0.5,0.5,0.9,0.9);

	this.shape_1 = new Shape();
	this.shape_1.graphics.f("#ffffff").p("APTBaQgGgMgPADQgRAEgPAaQAagzg/gZQgngPhCgCQAuiWiYg1QhVgdi5ABIheAAQgegBgEgMQgCgWgHgTQgXhChFgyQg6grhJgQQhIgPhIAOQiFAZhmCIQgQAXgNgEQgdgJgLAAQggAEgvAWQgmATggAaQgPARgKAKQgSAVgJAAQgXgBgzgSQgvgRgeACQhOAFhJAsQgpAYhABXQg3BKg4AQQhNAXgMA4QgGAcgLAJQgIAGgiAIQg6APgsAdQg/AqAiAsQAeAmBXAQQAqAIBZAFQC6AKDLhEIBRgeQAXgJANAFQAIADAaANQBDAZBjgJQAlgDAvAcQAbAQAyAjQBaA1BfgGQBIgFBUgnQAogSBog8QAagPAsADQAYACAwAFQAzABAhgDQAtAbA2ADQAqACAzANQAdAHA+ARQA0AMBIACQArABBTAAQBIABCTATQCAAHBSg3QA3gmhVgkQgzgUhFgNQgjgGgoglQg0gygSgKQhAgkhlgUQAeAFAOgJQAMgIgHgM").f();
	this.shape_1.setTransform(0.6,0.2,0.9,0.9);

	this.shape_2 = new Shape();
	this.shape_2.graphics.f("#ffffff").p("AQ8CjQg8gfhfgTQAdg1hAgZQgogPhBgCQAtiWiYg1QhVgdi5ABIhdAAQgfgBgEgMQgBgWgHgTQgYhChEgyQg7grhJgQQhIgPhIAOQiFAZhmCIQgQAXgNgEQgdgJgKAAQghAEgvAWQglATghAaQgPARgKAKQgSAVgJAAQgXgBgygSQgwgRgeACQhOAFhIAsQgpAYhABXQg4BKg4AQQhNAXgMA4QgFAcgLAJQgJAGgiAIQg6APgrAdQhAAqAiAsQAeAmBXAQQAqAIBaAFQC5AKDLhEIBRgeQAXgJANAFQAIADAbANQBDAZBigJQAlgDAwAcQAaAQAyAjQBbA1BfgGQBHgFBUgnQAogSBog8QAbgPArADQAZACAvAFQAzABAhgDQAtAbA2ADQAwACBJAUQBWAXAhAEQArAHBngCQBcgBA0ALQCSAfB3gnQBsghgigoQgRgVhjgYQgsgLgWgKIAOgCQATgDAGgFQACgDABgCQAFgMgYgLQgZgLgPAIQgRAIAPAgQgihDhRgo").f();
	this.shape_2.setTransform(0.2,0.2,0.9,0.9);

	this.addChild(this.shape_2,this.shape_1,this.shape);
}).prototype = p = new Container();
p.nominalBounds = new Rectangle(-127.2,-41.2,255.5,83.5);
p.constructor = lib.Cloud;