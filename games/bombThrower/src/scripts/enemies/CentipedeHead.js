(function(scope){

	/*
	HEAD RULES
	* Centipede can never go down more than 1 space at a time until he must turn
	* Centipede Turn consists of one space vertical, and one horizontal (There's actually only 4 types of turn....DOWN>LEFT, DOWN>RIGHT, UP-LEFT, UP RIGHT)
	* When  centipede hits a mushroom or wall, he'll turn down (unless he's headed up)
	* When the centi reachs the bottom, he'll head back up... (centipede always had a direction... this is not influenced by his current turn state)
	* While turning the centipede ignores collisions.
	* If the centipede is poisoned he will constantly go down until he reached the player area
	* If he hits a side wall> +1 Vert> -1 Horz> CONTINUE
	* If he hitd a mushroom, +1 vert > -1 Horz > CONTINUE
	*/

	/*
	SEGMENT RULES
	* Segments follow all points that the head has hit.
	* When the head turns, pass it's turn point to segment 1, when segment 1 turns
	* Each segment goes to a targetPoint
	*/
	var CentipedeHead = function(stage, bg){
		this.initialize(stage, bg);
	};
	var UP = "up";
	var DOWN = "down";
	var LEFT = "left";
	var RIGHT = "right";

	var CurrentGame = scope.currentGame;
	var Assets = CurrentGame.Assets;

	var s = CentipedeHead;
	s.fastSpeed = 10;
	s.normalSpeed = 8;

	var p = CentipedeHead.prototype;
	p.display;
	p.vtDir;
	p.hzDir;
	p.currentDir;
	p.turnPoints;
	p.nextPoint;
	p.isPoisoned;
	p.bg;
	p.stage;
	p.speed;
	p.turnHistory;
	p.numSegments;

	p.hitBox;

	p.x; //Read Only
	p.y; //Read Only

	//Move to target > on target reached, if going down, or going up, initiate turn, if going side to side, initiate turn
	//Turn complete > move to next target, or initiate a new turn
	p.initialize = function(stage, bg){
		this.bg = bg;
		this.stage = stage;

		var moveSpeed = Math.min(bg.MAX_SPEED, (CurrentGame.globalLevel - 1) * 2);
		s.normalSpeed = 8 + moveSpeed;
		s.fastSpeed = 11 + moveSpeed;

		this.display = Assets.getBitmapAnimation(Assets.TEX_CENTI_HEAD, true);
		this.display.regY -= 0;//4;

		this.stage.addChild(this.display);

		this.vtDir = DOWN;
		this.hzDir = Math.random() > .5? LEFT : RIGHT;

		this.turnPoints = [];
		this.turnHistory = [];

		this.speed = s.normalSpeed;
		this.isPoisoned = false;
		this.setCurrentDir(DOWN);

		this.hitBox = new Rectangle(0, 0, bg.rowWidth, bg.rowHeight);
	};

	p.onAnimationComplete = function(){
		if(this.display.currentAnimation == Assets.TEX_CENTI_HEAD){
			this.display.gotoAndPlay(Assets.TEX_CENTI_HEAD);
		}
	}

	p.setFastMode = function(value){
		this.speed = (!value)? CentipedeHead.normalSpeed : CentipedeHead.fastSpeed;
	}

	p.positionAtTop = function(){
		var middle = this.bg.getGridPoint(CurrentGame.width/2, 0);
		this.display.x = middle.x;
		this.display.y = middle.y;
		this.hitBox.x = middle.x - (this.bg.rowHeight*0.5);
		this.hitBox.y = middle.x - (this.bg.rowHeight*0.5);

		//First target point
		this.nextPoint = new Point(middle.x, middle.y + this.bg.rowHeight * 4);
		this.nextPoint.dir = this.hzDir;

		//First Turn
		var pt1 = {dir: this.hzDir, x: this.nextPoint.x, y: this.nextPoint.y};
		pt1.x += (this.hzDir == LEFT? -this.bg.rowWidth : this.bg.rowWidth);
		this.turnPoints = [pt1];
		this.turnHistory = [];
	}

	p.setCurrentDir = function(dir){
		this.currentDir = dir;
		this.display.scaleX = this.display.scaleY = 1;
		if(dir == LEFT || dir == RIGHT){
			this.display.scaleX = (dir == LEFT)? -1 : 1;
			if(this.display.currentAnimation == Assets.TEX_CENTI_HEAD_DOWN){
				this.display.gotoAndPlay(Assets.TEX_CENTI_HEAD);
			}
		} else {
			this.display.scaleY = (dir == UP)? -1 : 1;
			if(this.display.currentAnimation == Assets.TEX_CENTI_HEAD){
				this.display.gotoAndStop(Assets.TEX_CENTI_HEAD_DOWN);
			}
		}
	}

	p.tick = function(tickFactor){
		var distance = this.speed * tickFactor;
		this.advance(distance);

		var targetReached = this.isTargetReached();
		if(targetReached){
			//Make sure we match the exact target point
			var dx = Math.abs(this.nextPoint.x - this.display.x);
			var dy = Math.abs(this.nextPoint.y - this.display.y);
			if(dx > 30 || dy > 30){
				//Atari.trace("Crazy Distance!");
			}
			var overshoot = dx + dy;

			this.display.x = this.nextPoint.x;
			this.display.y = this.nextPoint.y;

			var hasTurned;
			//If we have any active turn points, respect them.
			if(this.turnPoints && this.turnPoints.length > 0){
				var turnPoint = this.turnPoints.shift();
				if(this.turnPoints.length == 0){ this.turnPoints = null; }
				hasTurned = (turnPoint.dir != this.currentDir);
				this.setCurrentDir(turnPoint.dir);
				this.setNextPoint(turnPoint);
				this.isTurning = true;
			} else {
				this.isTurning = false;
			}

			if(!this.isTurning){
				//Check if we need to turn...
				this.turnPoints = this.checkForTurn();
				if(this.turnPoints){
					var nextPt = this.turnPoints.shift();
					hasTurned = (nextPt.dir != this.currentDir);
					this.setNextPoint(nextPt);
					this.setCurrentDir(this.nextPoint.dir);
				} else {
					//Continue in current direction
					if(this.currentDir == RIGHT){
						this.nextPoint.x += this.bg.rowWidth;
					} else {
						this.nextPoint.x -= this.bg.rowWidth;
					}
				}
			}

			//Apply overshoot values
			if(this.currentDir == RIGHT){
				this.display.x += overshoot;
			} else if(this.currentDir == LEFT){
				this.display.x -= overshoot;
			} else if(this.currentDir == DOWN){
				this.display.y += overshoot;
			} else if(this.currentDir == UP){
				this.display.y -= overshoot;
			}

			if(this.numSegments > 0 && hasTurned){
				this.turnHistory.push({x: this.display.x, y: this.display.y, dir: this.currentDir});
			}
		}
		//Store X/Y in read only variables, so the main centipede can easily query the x/y of the head.
		this.x = this.display.x;
		this.y = this.display.y;
		this.hitBox.x = this.display.x - (this.bg.rowWidth*.5);
		this.hitBox.y = this.display.y - (this.bg.rowHeight*.5);
	};

	p.getTurnByIndex = function(index){
		return this.turnHistory[index];
	};

	p.setNextPoint = function(pt){
		this.nextPoint = pt;
	};

	p.checkForTurn = function(){

		var turnRequired = this.isPoisoned;
		if(this.currentDir == RIGHT){
			var mushroom = this.bg.getMushroomByPosition(this.display.x + this.bg.rowWidth, this.display.y);
			if(mushroom && mushroom.isPoisoned){ this.isPoisoned = true; }
			if(mushroom || this.display.x + this.bg.rowWidth > CurrentGame.width - this.bg.rowWidth / 2){
				turnRequired = true;
			}
		} else if(this.currentDir == LEFT){
			var mushroom = this.bg.getMushroomByPosition(this.display.x - this.bg.rowWidth, this.display.y);
			if(mushroom && mushroom.isPoisoned){ this.isPoisoned = true; }
			if(mushroom || this.display.x - this.bg.rowWidth < 0){
				turnRequired = true;
			}
		}

		if(!turnRequired){
			return null;
		}

		//If we reach the bottom, head back up.
		if(this.vtDir == DOWN && this.display.y >= CurrentGame.height - this.bg.rowHeight){
			this.vtDir = UP;
		}
		//If we are heading up, and reach the top of player area, head back down.
		if(this.vtDir == UP && this.display.y <= this.bg.minPlayerY + this.bg.rowHeight){
			this.vtDir = DOWN;
		}
		//If we are poisoned, and reached the player area, turn off positioning
		if(this.isPoisoned && this.display.y >= this.bg.minPlayerY){
			this.isPoisoned = false;
		}

		//We now have all the info we need to determine which turns we need to make...
		var oldPt = this.nextPoint;
		var rowWidth = this.bg.rowWidth;
		var rowHeight = this.bg.rowHeight;

		//Down or Up?
		if(this.vtDir == DOWN){
			var pt1 = {dir: DOWN, x: oldPt.x, y: oldPt.y + rowHeight};
		} else {
			var pt1 = {dir: UP, x: oldPt.x, y: oldPt.y - rowHeight};
		}

		//Left or Right
		if(this.hzDir == LEFT){
			var pt2 = {dir: RIGHT, x: pt1.x + rowWidth, y: pt1.y};
		} else {
			var pt2 = {dir: LEFT, x: pt1.x - rowWidth, y: pt1.y};
		}
		this.hzDir = pt2.dir;

		//Return turnPoints
		return [pt1, pt2];
	};

	p.advance = function(distance){
		if(this.currentDir == LEFT){
			this.display.x -= distance;
		} else if(this.currentDir == RIGHT){
			this.display.x += distance;
		} else if(this.currentDir == DOWN){
			this.display.y += distance;
		} else {
			this.display.y -= distance;
		}

		this.hitBox.x = this.display.x - (this.bg.rowWidth*.5);
		this.hitBox.y = this.display.y - (this.bg.rowHeight*.5);
	};

	p.isTargetReached = function(){
		if(!this.nextPoint){ return false; }

		var reached = false;
		if(this.currentDir == LEFT && this.display.x <= this.nextPoint.x){
			reached = true;
		} else if(this.currentDir == RIGHT && this.display.x >= this.nextPoint.x){
			reached = true;
		} else if(this.currentDir == DOWN && this.display.y >= this.nextPoint.y){
			reached = true;
		} else if(this.currentDir == UP && this.display.y <= this.nextPoint.y){
			reached = true;
		}
/*
		if(this.currentDir != UP && this.display.y > this.nextPoint.y){
			this.display.y = this.nextPoint.y;
		}*/

		return reached;
	};

	p.destroy = function(){
		this.stage.removeChild(this.display);
		this.moveHistory = [];
	};

	scope.currentGame.CentipedeHead = CentipedeHead;
}(window.Atari));