(function(scope) {
 
	var ns = scope;
 
	var game = ns.game ;

	var Player = ns.Player = function(props)
	{
		this.initialize(props);
		this.id = null;
		this.coin = 0;
		this.numCapturedFishes = 0;
		
		this.cannon = null;
		this.cannonMinus = null;
		this.cannonPlus = null;
		this.coinNum = null;
		
		props = props || {};
		Q.merge(this, props, true);
		this.sheet = props.sheet;
		
		this.init();
	};
 
	Player.prototype = new createjs.Container(); // inherit from Container
	Player.prototype.Container_initialize = Player.prototype.initialize;
	Player.prototype.Container_tick = Player.prototype._tick; 
	var p = Player.prototype;
   
	p.init = function()
	{
		var me = this, power = 1;
		
		this.cannon = new ns.Cannon(ns.R.bullet_sprites[power-1]);
		this.cannon.id = "cannon";
		this.cannon.sprite.x = game.bottom.x + 425;
		this.cannon.sprite.y = game.bottom.y + 50;
		//this.cannon.sprite.y = game.height - 10;
  		game.stage.enableMouseOver(50);
       
		this.cannonMinus = new ns.Button(this.sheet.bottom,"cannonMinusup","cannonMinusdown");
 		this.cannonMinus.id = "cannonMinus";
		this.cannonMinus.button.x = game.bottom.x + 340;
		this.cannonMinus.button.y = game.bottom.y + 36;
		this.cannonMinus.button.onClick = function(e) {
			me.cannon.setPower(-1, true);
			this.gotoAndStop("cannonMinusdown");
		};
 	 
		this.cannonPlus = new ns.Button(this.sheet.bottom,"cannonPlusup","cannonPlusdown");
		this.cannonPlus.id = "cannonPlus";
		this.cannonPlus.button.x = this.cannonMinus.button.x + 140;
		this.cannonPlus.button.y = this.cannonMinus.button.y;
 		
		this.cannonPlus.button.onClick = function(e) {
			me.cannon.setPower(1, true);
			this.gotoAndStop("cannonPlusdown");
		};
 	 
		this.coinNum = new ns.Num({id:"coinNum", sheet:this.sheet.number_black, max:6, gap:3, autoAddZero:true});
		this.coinNum.x = game.bottom.x + 20;
		this.coinNum.y = game.bottom.y + 44;
		this.updateCoin(this.coin);
		//console.debug(this.cannon.sprite);
		
		game.stage.addChild(this.cannon.sprite, this.cannonMinus.button, this.cannonPlus.button , this.coinNum );
	};

	p.fire = function(targetPoint)
	{	
		var cannon = this.cannon, power = cannon.power, speed = 5;
		if(this.coin < power) return;
		
		//cannon fire
		var dir = ns.Utils.calcDirection(cannon.sprite, targetPoint), degree = dir.degree;
		if(degree == -90) degree = 0;
		else if(degree < 0 && degree > -90) degree = -degree;
		else if(degree >= 180 && degree <= 270) degree = 180 - degree;
		cannon.fire(degree);
		
		//console.debug(targetPoint, power, degree);
		
		//fire a bullet
		var sin = Math.sin(degree*Q.DEG_TO_RAD), cos = Math.cos(degree*Q.DEG_TO_RAD);
		var bullet = new ns.Bullet(ns.R.bullet_sprites[power - 1]);
		bullet.sprite.x = cannon.sprite.x + (cannon.sprite.regY + 20) * sin;
		bullet.sprite.y = cannon.sprite.y - (cannon.sprite.regY + 20) * cos;
		bullet.sprite.rotation = degree;
		bullet.power = power;
		bullet.speedX = speed * sin;
		bullet.speedY = speed * cos;
		game.stage.addChild(bullet.sprite);
		game.bullets.push(bullet);
		//console.debug(bullet.sprite, bullet );
		bullet.parent = game.stage;
		//deduct coin
		this.updateCoin(-power, true);
	}

	p.captureFish = function(fish)
	{
		this.updateCoin(fish.coin, true);
		this.numCapturedFishes++;
	};

	p.updateCoin = function(coin, increase)
	{
		if(increase) this.coin += coin;
		else this.coin = coin;
		if(this.coin > 999999) this.coin = 999999;
		this.coinNum.setValue(this.coin);
		
		//console.debug(this.coin);
		
	};
	scope.Player = Player;

}(window.Atari.currentGame))