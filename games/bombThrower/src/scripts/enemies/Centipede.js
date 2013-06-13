(function(scope){

    var Centipede = function(){

    };

    //STATIC
    var CurrentGame = scope.currentGame;
    var Assets = CurrentGame.Assets;

    var LEFT = "left";
    var RIGHT = "right";
    var DOWN = "down";
    var UP = "up";

    //INSTANCE
    var p = Centipede.prototype;

    p.stage;
    p.bg;
    p.head;
    p.isDead;
    p.segmentList;
    p.speed;

    p.initialize = function(stage, bg){
        //Dependancies
        this.bg = bg;
        this.stage = stage;

	    this.segmentList = [];
        this.isDead = false;

	    this.horizonY = this.bg.rowHeight * 3;
	    this.segmentWidth = 31;
    };

    /**
     * MAIN TICK
     * @param elapsed
     */
    p.tick = function(tickFactor){
	    if(this.segmentList.length == 0){
		    this.head.setFastMode(true);
	    }
		var distance = this.head.speed * tickFactor;

	    //Tick head
        this.head.tick(tickFactor);
		if(this.head.display.y > this.horizonY && this.head.display.alpha == 0){
			Tween.get(this.head.display).to({alpha: 1}, 500);
		}

		var segment;
	    for(var i = 0, l = this.segmentList.length; i < l; i++){
		    segment = this.segmentList[i];

	        var currentDir = segment.currentDir;

		    //Advance
		    this.advanceSegment(segment, distance);

		    var targetReached = false;
		    var target;
		    if(this.head.turnHistory.length > segment.turnCount){
			    //Target Reached?
				target = this.head.turnHistory[segment.turnCount];
				if(target == null) {
					Atari.trace(segment.turnCount, ":", this.head.turnHistory);
				}
			    if(currentDir == LEFT && segment.x <= target.x){
                    targetReached = true;
                } else if(currentDir == RIGHT && segment.x >= target.x){
                    targetReached = true;
                } else if(currentDir == DOWN && segment.y >= target.y){
                    targetReached = true;
                } else if(currentDir == UP && segment.y <= target.y){
                    targetReached = true;
                }
		    }

		    if(targetReached){
			    segment.x = target.x;
			    segment.y = target.y;
				segment.hitBox.x = segment.x - (this.bg.rowWidth*.5);
				segment.hitBox.y = segment.y - (this.bg.rowHeight*.5);
			    segment.turnCount++;
			    this.setSegmentDir(segment, target.dir);
			    //Tweak exact position to keep segments aligned...
			    if((target.dir == LEFT || target.dir == RIGHT) && target.y == this.head.y){
				    var dir;
				    var display;
				    if(i == 0){
					    dir = this.head.currentDir;
					    display = this.head.display;
                    } else {
					    dir = this.segmentList[i - 1].currentDir;
					    display = this.segmentList[i - 1];
				    }
				    segment.x = display.x + (dir == LEFT?  this.segmentWidth : -this.segmentWidth);
			    }
		    }
		}
     };

	p.advanceSegment = function(segment, distance){
		if(segment.currentDir == LEFT){
		    segment.x -= distance;
        } else if(segment.currentDir == RIGHT){
		    segment.x += distance;
        } else if(segment.currentDir == DOWN){
		    segment.y += distance;
        } else {
		    segment.y -= distance;
        }
		if(segment.y > this.horizonY && segment.alpha == 0){
			Tween.get(segment).to({alpha: 1}, 500);
		}
		segment.hitBox.x = segment.x - (this.bg.rowWidth*.5);
		segment.hitBox.y = segment.y - (this.bg.rowHeight*.5);
	};

    /**
     * Create a new centipede, you can pass the initial position and number of segments
     * @param numSegments
     * @param x
     * @param y
     */
    p.createFromScratch = function(numSegments, x, y, positionAtTop){
        //Create head
        this.head = new CurrentGame.CentipedeHead(this.stage, this.bg);
	    this.head.display.alpha = 0;

        this.head.display.x = x;
        this.head.display.y = y;
		if(positionAtTop == true){
			this.head.positionAtTop();
		}
		this.head.numSegments = numSegments;
        if(numSegments > 0){
            this.addSegments(numSegments);
        } else {
            this.segmentList = [];
        }
    };

    /**
     * Add a number of segments to the current head.
     * @param segmentCount
     */
    p.addSegments = function(segmentCount){
        //Determine in which direction the segments should be added.
        var p = "x";
        var vector = -1;
        var size = this.head.display.width;
	    var headDir = this.head.currentDir;
        if(headDir == UP || headDir == DOWN){
            p = "y";
            size = this.head.display.height * .6;
            if(headDir == UP){ vector = 1; }
        } else if(headDir == RIGHT){ vector = 1; }

        //Add segments
        for(var i = 0; i < segmentCount; i++){
            var segment = Assets.getBitmapAnimation(Assets.TEX_CENTI_BODY, true);
	        segment.regY -= 4;//8;
            var pt = new Point(this.head.display.x, this.head.display.y);
            //Position segment in proper direction
	        if(i > 0){
                pt.x = this.segmentList[i - 1].x;
                pt.y = this.segmentList[i - 1].y;
	            segment.next = this.segmentList[i - 1];
            } else {
	            segment.next = this.head;
            }
	        if(this.segmentList.length > i + 1){
                segment.prev = this.segmentList[i + 1];
            }
	        segment.alpha = 0;
            segment.x = this.head.display.x;
            segment.y = this.head.display.y;
			segment.hitBox = new Rectangle(segment.x - (this.bg.rowWidth*.5), segment.y - (this.bg.rowHeight*.5), this.bg.rowWidth, this.bg.rowHeight);
            segment[p] += ((size) * (i + 1)) * vector;
	        //Turn count is zero to start...
	        segment.turnCount = 0;

	        this.stage.addChildAt(segment, 0);
            this.segmentList.push(segment);
            this.setSegmentDir(segment, headDir);
        }
    };


	/**
     * Create a new centipede from the bodyParts of another!
     * @param bodyParts
     */
    p.createFromCorpse = function(bodyParts, originalHead){
	    var part1 = bodyParts.shift();
	    this.stage.removeChild(part1);

		var oldHistory = originalHead.turnHistory;
	    this.head = new CurrentGame.CentipedeHead(this.stage, this.bg);
        this.head.display.x = part1.x;
        this.head.display.y = part1.y;
	    this.head.turnHistory = [];

		// Some pieces may still need to turn. We'll add the unused turnHistory to the new head and set the unturned pieces to it.
		var currentHistory = Math.max(0, part1.turnCount);
		var oldestHistory = Math.max(0, bodyParts.length ? bodyParts[bodyParts.length-1].turnCount : currentHistory);

		var i, l;
		for(i = 0; i < currentHistory; i++){
			if(oldHistory[i]) { this.head.turnHistory.push(oldHistory[i]); }
		}

	    this.head.numSegments = bodyParts.length;
	    this.segmentList = bodyParts;

	    var targetX, targetY;
		var gridspace = this.bg.getGridPoint(part1.x, part1.y);
	    targetX = gridspace.x;
	    targetY = gridspace.y;
	    switch(part1.currentDir){
		    case LEFT:
			    targetX -= this.bg.rowWidth;
			    break;
		    case RIGHT:
		        targetX += this.bg.rowWidth;
		        break;
	    }

		this.head.setCurrentDir(part1.currentDir);

	    this.head.nextPoint = {x: targetX, y: targetY};
	    this.head.turnHistory.push({x: this.head.display.x, y: this.head.display.y, dir: this.head.currentDir});

		if(part1.currentDir == LEFT || part1.currentDir == RIGHT){
			var pt1 = {dir: DOWN, x: targetX, y: targetY + this.bg.rowHeight};
	        //Left or Right
	        if(part1.currentDir == LEFT){
	            var pt2 = {dir: RIGHT, x: targetX + this.bg.rowWidth, y: pt1.y};
	        } else {
	            var pt2 = {dir: LEFT, x: targetX - this.bg.rowWidth, y: pt1.y};
	        }
		    this.head.turnPoints = [pt1, pt2];
		} else if(part1.currentDir == DOWN) {
			var pt1 = {dir: targetX > scope.currentGame.width ? RIGHT : LEFT, x: targetX, y: targetY};
			this.head.turnPoints = [pt1];
		}
    };

	/**
	* Set direction of any segment
	* @param dir
	*/
	p.setSegmentDir = function(segment, dir){
		segment.scaleX = segment.scaleY = 1;
		segment.currentDir = dir;
		if(dir == LEFT || dir == RIGHT){
			segment.scaleX = (dir == LEFT)? -1 : 1;
			if(segment.currentAnimation == Assets.TEX_CENTI_BODY_DOWN){
				segment.gotoAndPlay(Assets.TEX_CENTI_BODY);
			}
		} else {
			segment.scaleY = (dir == UP)? -1 : 1;
			if(segment.currentAnimation == Assets.TEX_CENTI_BODY){
				segment.gotoAndStop(Assets.TEX_CENTI_BODY_DOWN);
			}
		}
	};

    /**
     * Hit tests a sprite against all segments, and inflicts the appropriate damage if the shot hits
     * @param shot
     */
    p.hitTestShot = function(shot){
        this.headShot = false;
        this.deadSegments = [];

        var hit = false;
        var dx = Math.abs(shot.x+(shot.width>>1) - this.head.display.x - (this.head.display.width >> 2));
        var dy = Math.abs(shot.y - this.head.display.y);

        //HeadShot?
        if(dx < this.head.display.width * .4 && dy < this.head.display.height){
            this.headShot = true;
            hit = true;
            //The last head was hit, this guy is dead...
            if(this.segmentList.length == 0){
                this.isDead = true;
                this.deadSegments.push(this.head);
            }
            //Head was hit, but we still have segments left...
            else {
                //Swap head with the first segment...add segment to the deadSegments list
                var segment = this.segmentList.shift();
	            var headX = this.head.display.x;
	            var headY = this.head.display.y;
                this.head.display.x = segment.x;
                this.head.display.y = segment.y;
	            segment.x = headX;
	            segment.y = headY;
	            if(segment.currentDir != DOWN){
		            this.head.setCurrentDir(segment.currentDir);
	            }
	            this.deadSegments.push(segment);
	            this.stage.removeChild(segment);

            }
        }
        //Body Shot?
        else {
            var segment;
            var hitIndex;
            //Loop through all the segments and see if we hit one
            for(var i = 0, l = this.segmentList.length; i < l; i++){
                segment = this.segmentList[i];
                dx = Math.abs(shot.x + (shot.width>>1) - segment.x - (segment.width >> 2));
                dy = Math.abs(shot.y - segment.y);
				//Once we hit a segment, add it to deadSegments
                if(!hit && dx < segment.width * .4 && dy < segment.height && segment.alpha == 1){
                    hit = true;
                    hitIndex = i;
                    this.deadSegments = [];
                }
	            //Add the segemnt that was hit, and all segments after it, to deadSegments
                if(hitIndex <= i){
                    this.deadSegments.push(segment);
                }
            }
            if(hitIndex >= 0){
                this.segmentList.length = hitIndex;
            }
        }
        return hit;
    };

    p.kill = function(){
        this.head.destroy();
        for(var i = 0, l = this.segmentList.length; i < l; i++){
            segment = this.segmentList[i];
            this.stage.removeChild(segment);
        }
        this.isDead = true;
    };

    p.stop = function(){
        this.head.display.stop();
        for(var i = 0, l = this.segmentList.length; i < l; i++){
            segment = this.segmentList[i];
            segment.stop();
        }
    };

    p.play = function(){
        this.head.display.play();
        for(var i = 0, l = this.segmentList.length; i < l; i++){
            segment = this.segmentList[i];
            segment.play();
        }
    };

    /**
     * Set position of the centipede.
     * @param x
     * @param y
     */
    p.setPosition = function(x, y) {
        this.head.x = x;
        this.head.y = y;
    };

    p.destroy = function(){
        this.head.destroy();
        this.isDead = true;
        for(var i = 0, l = this.segmentList.length; i < l; i++){
            this.stage.removeChild(this.segmentList[i]);
        }
        this.segmentList.length = 0;
        this.onShotCallback = null;
    }

    scope.currentGame.Centipede = Centipede;

}(window.Atari))