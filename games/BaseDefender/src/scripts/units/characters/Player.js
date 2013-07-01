(function(scope) {
 
	var ns = scope;
	var game = ns.game ;

 
	Player = function(scene, gameInfo, mainGame)
	{
		this.scene = scene;
		this.mainGame = mainGame;
		this.stage = scene.getStage();
		this.id = UID.get(); 
		this.gameInfo = gameInfo;
		
		//tile map properties
		this.startPoint = [105, 140];
		this.tileWidth = 60;
		this.tileHeight = 60;
		this.mapWidth = 18;
		this.mapHeight = 7;

		this.fastForward = 1;
		
		//reset game
		this.reset();
		
		/*/add initial gatlings
		Soldier.levels[0].maxHealth = 2000;
		var t=[[5,2]];	
		t=[[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],
			   [0,2],                  [4,2],                  [8,2],
						   [2,3],      [4,3],      [6,3],      [8,3],
			   [0,4],      [2,4],                  [6,4],
			   [0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[7,5],[8,5]];	
		for(var i = 0; i < t.length; i++)
		{		
			var gatling = new Gatling();
			gatling.x = this.startPoint[0] + t[i][0] * this.tileWidth;
			gatling.y = this.startPoint[1] + t[i][1] * this.tileHeight;
			gatling.tx = t[i][0];
			gatling.ty = t[i][1];
			this.scene.addChild(gatling);
			this.weapons.push(gatling);
		}
		this.path = this.buildPath();
		//*/
	}

	Player.prototype.reset = function()
	{
		this.money = 100;
		this.life = 20;
		this.score = 0;
		this.round = 1;
		this.weapons = [];
		this.targets = [];	
		this.path = this.buildPath();
	}

	Player.prototype.buildPathToTarget = function(tx, ty, start, end)
	{
		var map = [];
		var s = start;
		if(!s || s[0] < 0) s = [0, 3];
		var to ;
		for(var i = 0; i < this.mapHeight; i++)
		{
			map[i] = [];
			for(var j = 0; j < this.mapWidth; j++)
			{
				map[i][j] = this.getWeaponAt(j, i) ? 1 : 0;
				// is target at?
				var target_at = this.getWeaponAt(j, i);
				// find around target to move 
				if(target_at && end[0] == j && end[1] == i ){
					if( j-1 >= 0 ){
						//check left 
						var empty_at = this.getWeaponAt(j-1, i);
						if(!empty_at){
							to = [j-1, i];
						}
					}
					if( j+1 < this.mapWidth && !to){
						//check right 
						var empty_at = this.getWeaponAt(j+1, i);
						if(!empty_at){
							to = [j+1, i];
						}
					}
					if( i-1 >= 0 && !to){
						//check top 
						var empty_at = this.getWeaponAt(j, i-1);
						if(!empty_at){
							to = [j, i-1];
						}
					}
					if( i+1 < this.mapHeight && !to){
						//check bottom 
						var empty_at = this.getWeaponAt(j, i+1);
						if(!empty_at){
							to = [j, i+1];
						}
					}
				}
			}
		}
		//if(tx || ty) map[ty][tx] = 0;
		//console.log('Astar.findPath', tx, ty, s, to );
		var path = scope.Astar.findPath(map, s, to);
		//console.log('buildPathToTarget', path);
		return path;
	}
	
	Player.prototype.buildPath = function(tx, ty, start, end)
	{
		var map = [];
		var s = start;
		if(!s || s[0] < 0) s = [0, 3];
		if(!end) end = [17, 3];		
		
		for(var i = 0; i < this.mapHeight; i++)
		{
			map[i] = [];
			for(var j = 0; j < this.mapWidth; j++)
			{
				map[i][j] = this.getWeaponAt(j, i) ? 1 : 0;
			}
		}
		if(tx || ty) map[ty][tx] = 1;
		var path = scope.Astar.findPath(map, s, end);
		if(path.length > 0)
		{
			path.push([18, 3],[19, 3]); //add end points
			if(start && start[0] < 0) path.unshift(start); //add start point
			return path;
		}else 
		{
			return null;
		}
	}

	Player.prototype.buidAllPaths = function()
	{
		//build a default path for new enemies
		this.path = this.buildPath();
		//build a single path for each enemy existed
		for(i = 0; i < this.targets.length; i++)
		{
			var t = this.targets[i];
			//if(t.tx < 0 || t.ty < 0 || t.tx >= this.mapWidth || t.ty >= this.mapHeight) continue;
			if(t.tx >= this.mapWidth || t.ty >= this.mapHeight) continue;
			if(t.target){
				/*var _path = this.buildPath(null, null, [t.tx, t.ty], [t.target.tx, t.target.ty]);
				if(_path){
					t.path = _path;
				}else{
					t.path = 
				}*/
			}else{
				t.path = this.buildPath(null, null, [t.tx, t.ty]);
			}
		}
	}

	Player.prototype.addWeapon = function(weapon)
	{
		this.weapons.push(weapon);
		this.buidAllPaths();
	}

	Player.prototype.removeWeapon = function(weapon)
	{
		var index = this.weapons.indexOf(weapon);
		console.log('weapons', this.weapons, weapon);
		if(index >= 0) this.weapons.splice(index, 1);
		this.buidAllPaths();
	}

	Player.prototype.getWeaponAt = function(tx, ty)
	{
		for(var i = 0; i < this.weapons.length; i++)
		{
			var w = this.weapons[i];
			if(w.tx == tx && w.ty == ty) return w;
		}
		return null;
	}

	Player.prototype.addTarget = function(target)
	{	
		target.path = this.path;
		this.targets.push(target);
	}

	Player.prototype.findTarget = function(g, targets)
	{
		for(var i = 0; i < targets.length; i++)
		{
			var target = targets[i];
			if(!target.isDead() && this.checkInAttackRadius(g, target))
			{
				return target;
			}
		}
		return null;
	}
	
	Player.prototype.findNearestTarget = function(g, targets)
	{
		var min_distances = 1000000;
		var _target_index = null;
		for(var i = 0; i < targets.length; i++)
		{
			var target = targets[i];
			if( target.isDead() ){
				continue;
			}
			var distance = this.getDistanceFromTarget(g, target);
			if(distance < min_distances){
				min_distances = distance;
				_target_index = i;
			}
		}
		return targets[_target_index] || null;
	}
	
	Player.prototype.getDistanceFromTarget = function(g, target)
	{
		var dx = target.x - g.x;
		var dy = target.y - g.y;
		var distance = Math.sqrt(dx*dx + dy*dy);
		return distance;
	}
	
	Player.prototype.checkInAttackRadius = function(g, target)
	{
		var dx = target.x - g.x;
		var dy = target.y - g.y;
		var distance = Math.sqrt(dx*dx + dy*dy);
		return g.isInAttackRadius(distance);
	}

	Player.prototype.autoAttack = function()
	{
		//check status for queued enemies
		for(var i = 0; i < this.targets.length; i++)
		{
			var target = this.targets[i];

			if(target.isDeadFinished() && target._avatar.alpha <= 0.1)
			{
				//over... remove target entirely
				this.scene.removeChild(target);
				this.targets.splice(i, 1);
				i--;
			}else if(target.isDead())
			{
				//killed... get money and score, but don't remove because the death isn't finished...
				if(target.money > 0)
				{
					this.money += target.money;
					this.score += target.score;
					target.money = 0;
				}
			}else if(target.x >= this.gameInfo.width + target.width) {	
				console.log('life--'  );
				//escaped... lose life, remove target
				this.life--;
				this.scene.removeChild(target);
				this.targets.splice(i, 1);
				this.mainGame.scoreBar.updateLife();
				i--;
			}else
			{
				//console.log('target '  , target.x, this.gameInfo.width + target.width);
				
				//alive... move target
				if(target.target){
					this.moveTarget(target);
				}else{
					this.moveTarget(target);
				}
			}
		}
		
		//check weapons for auto attacking
		for(var i = 0; i < this.weapons.length; i++)
		{
			var gatling = this.weapons[i];

			//correct real turn speed according the fastForward parameter
			gatling.realTurnSpeed = Math.round(gatling.turnSpeed/this.fastForward);

			//find target for gatling, if target is null or out of attack radius or escaped...
			var needChangeTarget = gatling.target == null || !this.checkInAttackRadius(gatling, gatling.target)
								   || (gatling.target.x >= this.gameInfo.width + gatling.target.width);
			if(needChangeTarget)
			{		
				var newTarget = this.findTarget(gatling, this.targets);
				gatling.target = newTarget;
			}		
			
			//aim and fire to target
			if(gatling.target)
			{
				//hit: means can get shot for target
				var hit = gatling.aim(gatling.target, true);
				if(hit)
				{	
					if (gatling.canFire) {
						gatling.fire(gatling.target);
					}
					/*
					var damage = gatling.getDamange();
					gatling.target.getShot(damage);
					var _enemy = gatling.target;
					// counter attack
					if(_enemy.isAggressive() && !_enemy.target){
						_enemy.target = gatling;
					}
					this.counterAttack(_enemy);*/
				}
				
				//is dead?
				if(gatling.target.isDead()) 
				{
					gatling.stop();
					gatling.target = null;
				}
			}else
			{
				gatling.stop();
			}
		}	
		
		this.enemyAttack();
	}
	
	
	Player.prototype.counterAttack = function(_enemy){	
		if(!_enemy.isAttackAble()){
			//console.log('_enemy.is not AttackAble'  , _enemy );
			return;
		} 
		if(_enemy.target)
		{
			//hit: means can get shot for target
			var hit = _enemy.aim(_enemy.target, true);
			if(hit)
			{			
				var damage = _enemy.getDamange();
				_enemy.target.getShot(damage);
				console.log('enemy counterAttack with damage '  , damage);
			}else{
				this.moveTarget(_enemy);
			}
			
			//is dead?
			if(_enemy.target.isDead()) 
			{
				_enemy.setDirection([0,1]);
				console.log('enemy.target isDead ' );
				_enemy.target = null;
			 
				this.enemySearchToHitTower(_enemy);
			 
			}
		}
	}
	
	Player.prototype.enemyAttack = function(){	
		//check enemy for auto attacking
		for(var i = 0; i < this.targets.length; i++){
			var enemy = this.targets[i];
			if(!enemy.isAttackAble()){
				continue;
			}
			// filter aggressive to not toward to finish
			//if( enemy.isAggressive() && !enemy.isMovingToTarget() ){
 			//	return;
			//} 
			//correct real turn speed according the fastForward parameter
			//gatling.realTurnSpeed = Math.round(gatling.turnSpeed/this.fastForward);

			//find target for gatling, if target is null or out of attack radius or escaped...
			var needChangeTarget = enemy.target == null || (enemy.target.x >= this.gameInfo.width + enemy.target.width);
		    //if(_enemy.isAggressive() && !_enemy.target){
			// !this.checkInAttackRadius(enemy, enemy.target)
			if(needChangeTarget){		
				var newTarget = this.findTarget(enemy, this.weapons);
				enemy.target = newTarget;
			}		
			
			//console.log('enemy.enemyAttack  target '  , enemy.target );
				
			//aim and fire to target
			if(enemy.target){
				this.enemyHit(enemy);
			}else{
				//search target Tower
				this.enemySearchToHitTower(enemy);
 			}
		}	
	},
	
	Player.prototype.enemySearchToHitTower = function(enemy){
		//search target Tower
		if( enemy.isAntiTower() ){
			var newTarget = this.findNearestTarget(enemy, this.weapons);
			enemy.target = newTarget;
			console.log('enemy.enemySearchToHitTower '  , enemy.target );
			
			if(enemy.target){
				var end = this.getTile(enemy.target);
				var start = this.getTile(enemy);
				enemy.path = this.buildPathToTarget(enemy.tx, enemy.ty, start , end );
				console.log('enemy.path  '  , enemy.path   );
				/*var self = this;
				var cb = function(){
					self.enemyHit(enemy); 
				}*/
				//this.enemyHit(enemy );
			}
		}
	},
	
	Player.prototype.enemyHit = function(enemy){
		//hit: means can get shot for target
		var hit = enemy.aim(enemy.target, true);
		if(hit)
		{			
			var damage = enemy.getDamange();
			enemy.target.getShot(damage);
			enemy.setMovingToTarget(false);
			console.log('enemy.enemyHit take damage '  , damage);
	
		}else{
			// move toward to target
 			this.moveTarget(enemy);
		}
		
		//is dead?
		if(enemy.target.isDead()) 
		{
 			console.log('enemy.enemyHit target.isDead and animateIdle ' );
			enemy.target = null;
			enemy.animateIdle();
		}
	},
	
	Player.prototype.moveTarget = function(target)
	{
		target.animateMove();
		if(target.x < this.startPoint[0])
		{
			var x = target.x + target.speed;
			if(x < this.startPoint[0]) target.x = x;
			else 
			{
				target.x = this.startPoint[0];
				target.tx = 0;
				target.ty = 3;
			}
		}else 
		{
			var t= this.getTile(target);
			var length = target.path.length - 1;
			var target_to = target.path[length];
			// check is in range to attack
			var in_range_to_attack = this.isInPsitionToAttack(target, target.target);
			if( target_to[0] == target.tx && target_to[1] == target.ty && in_range_to_attack){
				target.setMovingToTarget(false);
				return;
			}
			target.setMovingToTarget(true);
					
			if(target.direction[0] != 0) 
			{
				var dx = target.x - (this.startPoint[0] + t[0] * this.tileWidth);
				if(dx == 0) 
				{			
					target.setDirection(this.getNextDirection(target));
					target.tx += target.direction[0];
					target.ty += target.direction[1];
				}
				this.moveByDirection(target);
			}else if(target.direction[1] != 0)
			{
				var dy = target.y - (this.startPoint[1] + t[1] * this.tileHeight);
				if(dy == -5) 
				{
					target.setDirection(this.getNextDirection(target));	
					target.tx += target.direction[0];
					target.ty += target.direction[1];
				}
				this.moveByDirection(target);
			}	
			
		}
		//console.log('target at '  , target.x, target.y , target.tx, target.ty);
			
	}
	Player.prototype.isInPsitionToAttack = function(actor, target)
	{		
		if(!target)
			return false;
		var dx = target.x - actor.x;
		var dy = target.y - actor.y;
		var distance = Math.sqrt(dx*dx + dy*dy);
		var inRadius = actor.isInAttackRadius(distance);
		return inRadius;
	}
	Player.prototype.moveByDirection = function(target)
	{
		if(!target.direction) return;
		if(target.direction[0] != 0) target.x += target.speed*target.direction[0];
		else if(target.direction[1] != 0) target.y += target.speed*target.direction[1];
	}

	Player.prototype.getTile = function(target)
	{
		var tx = Math.round((target.x - this.startPoint[0]) / this.tileWidth);
		var ty = Math.round((target.y - this.startPoint[1]) / this.tileHeight);
		return [tx, ty];
	}

	Player.prototype.getNextDirection = function(target)
	{
 		for(var i = 0; i < target.path.length - 1; i++)
		{
			var p = target.path[i];
			 
			var s_x =  (target.tx < 0)? 0 : target.tx;
			var s_y =  (target.ty < 0)? 0 : target.ty;
	 
			if(p[0] == s_x && p[1] == s_y)
			{
				var next = target.path[i+1];
				return [next[0]-target.tx, next[1]-target.ty];
			}
		}	
		return null;
	}
	
	Player.prototype.moveToTarget = function(actor)
	{
 
		//for(var i = 0; i < actor.path.length - 1; i++)
		//{
		//	var p = actor.path[i];
		//	if(p[0] == actor.tx && p[1] == actor.ty)
		//	{
				//var end = this.getTile(actor.target);
				//var start = this.getTile(actor);
				//actor.path = this.buildPathToTarget(actor.tx, actor.ty, start , end );
				var nextDirection = this.getNextDirection(actor);
				if(nextDirection){
					console.log('moving To Target ', nextDirection );
					actor.setDirection(nextDirection);
					actor.tx += actor.direction[0];
					actor.ty += actor.direction[1];
					console.log('actor tile ', actor.tx, actor.ty , actor.direction );
					actor.setMovingToTarget(true);
					this.moveByDirection(actor);
					console.log('actor pos ', actor.x, actor.y );
				}else{
					console.log('moveTo Near Target finish ', actor.tx, actor.ty , actor.path );
				}
				//break;
				//var next = target.path[i+1];
				//return [next[0]-target.tx, next[1]-target.ty];
			//}
		//}	
		//return null;
	}
	
	
	scope.Player = Player;

}(window.Atari.currentGame))	