(function(scope) {

    var BG = function() {};

    //STATIC VARS
    var p = BG.prototype;
    var CurrentGame = scope.currentGame;
    var Assets = CurrentGame.Assets;
    var proximityManager;

    var mushroomList = [];
    var bgFill;

    //INSTANCE VARS
	p.MAX_SPEED = 14;

    p.game;
    p.mushroomGrid;
    p.rowWidth;
    p.rowHeight;
    p.rowCount;
    p.colCount;
    p.mushroomContainer;
	p.mushroomRowArray;
    p.playerRows;
    p.minPlayerY;

    p.startFrame;
    p.startFramePoisoned;

	p.repairTimeout;

    p.initialize = function(game){
        //Dependancies
        this.game = game;

        this.mushroomContainer = new Container();
        game.stage.addChild(this.mushroomContainer);

        //Determine grid size
        var mushroom = Assets.getBitmap(Assets.TEX_MUSHROOM);
	    mushroom.width = 28;
	    this.rowHeight = mushroom.width;
	    this.rowWidth = mushroom.width;

        this.startFrame = mushroom.currentFrame;
        mushroom.gotoAndStop(Assets.TEX_MUSHROOM_POISONED);
        this.startFramePoisoned = mushroom.currentFrame;

        this.rowCount = CurrentGame.height / this.rowHeight | 0;
        this.colCount = CurrentGame.width / this.rowHeight | 0;

		this.mushroomRowArray = [];
		for(var i=0; i<this.rowCount; i++) {
			var cont = new Container();
			this.mushroomContainer.addChild(cont);
			this.mushroomRowArray.push(cont);
		}

        p.mushroomGrid = [];

        this.playerRows = 5;
        this.minPlayerY = CurrentGame.height - this.rowHeight * this.playerRows;

        proximityManager = new GameLibs.ProximityManager(50);

	    setTimeout(Atari.proxy(this.wiggleMushroom, this), 1000);
    };

	p.wiggleMushroom = function(){
		var j = this.mushroomRowArray.length * Math.random()|0;
		var i = this.mushroomRowArray[j].getNumChildren() * Math.random()|0;
		var m = this.mushroomRowArray[j].getChildAt(i);

		if(!m || m.damage > 0){ return; }
		if(m.currentAnimation == Assets.TEX_MUSHROOM){
			m.gotoAndPlay(Assets.TEX_MUSHROOM_MOVE);
		}
		else if(m.currentAnimation == Assets.TEX_MUSHROOM_POISONED){
			m.gotoAndPlay(Assets.TEX_MUSHROOM_POISONED_MOVE);
		}
		m.onAnimationEnd = Atari.proxy(this.onWiggleComplete, m);

		setTimeout(Atari.proxy(this.wiggleMushroom, this), 100 + 100 * Math.random());

	};

	p.onWiggleComplete = function(){
		if(Math.random() > .75){ return; }
		if(this.currentAnimation == Assets.TEX_MUSHROOM_MOVE){
			this.gotoAndPlay(Assets.TEX_MUSHROOM);
		}
		else if(this.currentAnimation == Assets.TEX_MUSHROOM_POISONED_MOVE){
			this.gotoAndPlay(Assets.TEX_MUSHROOM_POISONED);
		}
	};


    p.reset = function(){
		var i,l;
		for(i=0, l=this.mushroomRowArray.length; i<l; i++) {
        	this.mushroomRowArray[i].removeAllChildren();
		}
		for(i = 0, l = this.mushroomGrid.length; i<l; i++) {
			if(!this.mushroomGrid[i]) { continue; }
			for(var j = 0, k = this.mushroomGrid[i].length; j<k; j++) {
				this.mushroomGrid[i][j] = null;
			}
		}
        proximityManager.removeAllItems();
    };

    p.repairMushrooms = function(onComplete){
        this.onMushroomRepairComplete = onComplete;
        var count = 0;
		for(var j = 0, k = this.mushroomRowArray.length; i < l; i++){
			for(var i = 0, l = this.mushroomRowArray[j].getNumChildren(); i < l; i++){
				var m = this.mushroomRowArray[j].getChildAt(i);
				var game = this.game;
				if(m.damage > 0 || m.isPoisoned){
					var f = function(m, game) {
						setTimeout(function(){
							m.gotoAndStop(Assets.TEX_MUSHROOM);
							m.isPoisoned = false;
							m.damage = 0;
							game.addToScore(5);
						}, ++count * 100);
					}(m, game);
				}
			}
		}
        var timeout = Math.max((++count * 100) + 750, 1000);
        var scope = this;
        setTimeout(function(){
            scope.onMushroomRepairComplete();
            scope.onMushroomRepairComplete = null;
        }, timeout)
    };

    p.createMushrooms = function(mushroomSeed){
        //Show mushrooms, top 2 and bottom 2 rows are always empty
        for(var row = 2; row < this.rowCount - 4; row++){
            for(var col = 0; col < this.colCount; col++){
                if(Math.random() > mushroomSeed){ continue; }
                this.addMushroomAt(col * this.rowWidth, row * this.rowHeight)
            }
        }
    };

    p.getGridPoint = function(x, y){
        return new Point(
            (x/this.rowWidth|0) * this.rowWidth + this.rowWidth/2,
            (y/this.rowHeight|0) * this.rowHeight + this.rowHeight/2);
    };

    p.getMushroomByPosition = function(x, y){
        var row = (y/this.rowHeight|0);
        var col = (x/this.rowWidth|0);

        if(this.mushroomGrid[row] != null){
            return this.mushroomGrid[row][col];
        }
        return null;
    };

     p.addMushroomAt = function(x, y){
	     var gridPoint = this.getGridPoint(x, y);

         var row = (y/this.rowHeight|0);
         var col = (x/this.rowWidth|0);

         //Can't add mushrooms in the bottom row... EVER!
         if(row < 5 || row >= this.rowCount - 3){ return; }

         //Make sure there's not already a mushroom in this location...
         if(this.mushroomGrid[row] != null && this.mushroomGrid[row][col] != null){
             return;
         }

         //Add new mushroom to grid
         var mushroom = Assets.getBitmap(Assets.TEX_MUSHROOM);
         mushroom.gridPoint = gridPoint;
         mushroom.x = gridPoint.x - this.rowWidth + 4;
         mushroom.y = gridPoint.y - this.rowHeight;
         mushroom.col = col;
         mushroom.row = row;
         mushroom.damage = 0;
         if(this.mushroomGrid[row] == null){
             this.mushroomGrid[row] = [];
         }
         this.mushroomGrid[row][col] = mushroom;
         this.mushroomRowArray[row].addChild(mushroom);
         proximityManager.addItem(mushroom);
         proximityManager.refresh();
         //Atari.trace("Add Mushroom: " + this.mushroomRowArray[row].getNumChildren());

		 mushroom.hitBox = new Rectangle(col*this.rowWidth+2, row*this.rowHeight+2, this.rowWidth, this.rowHeight);
     };

    p.getBottomMushroomCount = function(){
        var count = 0;
	    var bottomY = this.minPlayerY;
		for(var j = 0, k = this.mushroomRowArray.length; j < k; j++){
			for(var i = 0, l = this.mushroomRowArray[j].getNumChildren(); i < l; i++){
				m = this.mushroomRowArray[j].getChildAt(i);
				if(m.y > bottomY){
					count++;
				}
			}
		}
        return count;
    };

    p.poisonMushroom = function(mushroom){
        mushroom.isPoisoned = true;
	    if(mushroom.damage == 0){
		    mushroom.gotoAndStop(Assets.TEX_MUSHROOM_POISONED);
	    } else {
		    mushroom.gotoAndStop(Assets.TEX_MUSHROOM_POISONED_DAMAGE + (mushroom.damage + 1));
	    }


    }

    p.shootMushroom = function(shot){
        var mushroom = this.hitTest(shot);
        if(!mushroom){ return null; }

        if(mushroom.damage < 3){
	        mushroom.damage++;
	        if(mushroom.isPoisoned == true){
		        mushroom.gotoAndStop(Assets.TEX_MUSHROOM_POISONED_DAMAGE + (mushroom.damage + 1));
	        } else {
		        mushroom.gotoAndStop(Assets.TEX_MUSHROOM_DAMAGE + (mushroom.damage + 1));
	        }
            var scale = 1.35;
	        var offset = (mushroom.width * scale - mushroom.width) * .5;
	        Tween.get(mushroom).to({x: mushroom.x - offset, y: mushroom.y - offset * 2, scaleX: scale, scaleY: scale}, 200, Ease.quartOut).to({scaleX: 1, x: mushroom.gridPoint.x - this.rowWidth + 4, scaleY: 1, y: mushroom.gridPoint.y - this.rowHeight}, 100, Ease.quartOut);

        } else {
            this.removeMushroom(mushroom);
        }

	    SoundJS.play(CurrentGame.Assets.SND_MUSHROOM_HIT);

	    var explosion = Assets.getBitmapAnimation(Assets.TEX_EXPLOSION_PURPLE, true);
        explosion.x = mushroom.x + this.rowWidth;
        explosion.y = mushroom.y + this.rowHeight;
        explosion.scaleX = explosion.scaleY = .75 + Math.random() * .5;
        explosion.onAnimationEnd = Atari.proxy(this.onExplosionComplete, this, explosion);
        this.game.stage.addChild(explosion);

        return mushroom;

    };

	p.onExplosionComplete = function(explosion){
		this.game.stage.removeChild(explosion);
	};

    p.removeMushroom = function(mushroom){
        this.mushroomGrid[mushroom.row][mushroom.col] = null;
        this.mushroomRowArray[mushroom.row].removeChild(mushroom);
	    var index = mushroomList.indexOf(mushroom);
	    if (index > -1) {
            mushroomList.splice(index, 1);
	    }
        proximityManager.removeItem(mushroom);
        proximityManager.refresh();
    };

    p.hitTest = function(sprite){
        var neighbours = proximityManager.getNeighbours(sprite);
        var dx, dy, mushroom, hitBox;
        for(var i = 0, l = neighbours.length; i < l; i++){
            mushroom = neighbours[i];
			hitBox = mushroom.hitBox;
			dx = (sprite.x + sprite.width/2) - (hitBox.x + hitBox.width/2);
            dy = (sprite.y + sprite.height/2) - (hitBox.y + hitBox.height/2);
            if(Math.abs(dx) <= (hitBox.width + sprite.width)/2 && Math.abs(dy) <= (hitBox.height + sprite.height)/2){
                return mushroom;
            }
        }
    };

    p.getNeighbours = function(sprite){
        return proximityManager.getNeighbours(sprite);
    };

	p.getMushroomArray = function() {
		var array = [];
		var grid;
		for(var i= 0, l= this.mushroomGrid.length; i<l; i++) {
			grid = this.mushroomGrid[i];
			if(grid) {
				for(var j= 0, k= grid.length; j<k; j++) {
					if(grid[j]) { array.push(grid[j]); }
				}
			}
		}
		return array;
	};

    scope.currentGame.BG = BG;
}(window.Atari));