(function(scope) {

    function Zombie(imgZombie, act) {
		this.initialize(imgZombie, act);
	}

	Zombie.prototype = new createjs.BitmapAnimation();
	Zombie.prototype.Animation_initialize = Zombie.prototype.initialize;
	
	Zombie.prototype.initialize = function(imgZombie, act) {
		var spriteSheet = new createjs.SpriteSheet({
			images: [imgZombie], 
			//frames: {width: 60, height: 108, regX: 30, regY: 54}, 
			frames: [
				[ 15, 12 , 38, 80 ],
				[ 75, 12 , 36, 80 ],
				[ 141, 12 , 35, 80 ],
				[ 205, 14 , 38, 82 ],
				[ 267, 12 , 37, 83 ],
				[ 332, 12 , 37, 85 ],
				
				[ 6, 126 , 41, 78 ],
				[ 64, 128 , 41, 79 ],
				[ 125, 125 , 41, 81 ],
				[ 195, 125 , 47, 80 ],
				[ 263, 129 , 52, 75 ],
				[ 338, 124 , 48, 77 ],
				[ 403, 125 , 44, 76 ],
				[ 468, 124 , 42, 79 ],
				
				[ 9, 237 , 39, 81 ],
				[ 67, 238 , 39, 82 ],
				[ 136, 235 , 39, 83 ],
				[ 200, 234 , 42, 92 ],
				[ 264, 238 , 42, 87 ],
				[ 329, 240 , 41, 88 ],
				[ 392, 240 , 39, 88 ],
				[ 459, 240 , 41, 88 ],
			 
				[ 13, 355 , 42, 87 ],
				[ 81, 351 , 41, 82 ],
				[ 145, 353 , 42, 79 ],
				[ 210, 356 , 43, 78 ],
				[ 280, 361 , 43, 80 ],
				[ 348, 367 , 51, 68 ],
				[ 419, 372 , 51, 65 ],
			 
				[ 6, 464 , 39, 80 ],
				[ 69, 465 , 45, 84 ],
				[ 136, 466 , 47, 82 ],
				[ 204, 466 , 48, 82 ],
				[ 277, 465 , 48, 83 ],
				[ 352, 468 , 51, 77 ],
				[ 425, 463 , 51, 76 ],
				
				[ 13, 582 , 51, 66 ],
				[ 83, 585 , 48, 61 ],
				[ 158, 595 , 48, 39 ],
				
				[ 235, 576 , 39, 80 ],
				[ 297, 578 , 41, 73 ],
				[ 366, 590 , 51, 50 ],
	
			], 
			animations: {
				stand: [0, 5, "stand"],
				walk_left: [6, 13, "walk_left"],
				walk_up: [14, 21, "walk_up"],
				atk_left: [22, 28, "atk_left"],
				atk_up: [29, 35, "atk_up"],
				die_left: [36, 41, false],
				die_up: [36, 41, false]
			} 
		});
		SpriteSheetUtils.addFlippedFrames(spriteSheet, true, false, false);
		this.Animation_initialize(spriteSheet);
		if(act){
			this.gotoAndPlay(act);
		}else{
			this.gotoAndPlay("stand");
		}
		
		this.regX = 22;
		this.regY = 42;
	}
	scope.Zombie = Zombie;
}(window.Atari.currentGame));