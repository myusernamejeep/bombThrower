(function(scope){

	function BackgroundSound() {}
	var s = BackgroundSound;

	s.game = null;

	s.centipedeNormal = null;
	s.centipedePoisoned = null;
	s.centipedeMultiple = null;
	s.scorpion = null;
	s.spider = null;

	s.VOLUME = 0.25;

	s.allSounds = [];

	s.init = function(game){
		s.game = game;

		//createjs.SoundJS.setMasterVolume(0.25);

		var sound = s.centipedeNormal = SoundJS.play(Assets.SND_CENTIPEDE, null, 0, 0, -1, 1, s.VOLUME);
		sound.pause();
		sound._active = false;
		s.allSounds.push(sound);

		sound = s.centipedePoisoned = SoundJS.play(Assets.SND_CENTIPEDE_CRAZY, null, 0, 0, -1, 1, s.VOLUME);
		sound.pause();
		sound._active = false;
		s.allSounds.push(sound);

		sound = s.centipedeMultiple = SoundJS.play(Assets.SND_CENTIPEDE_MULTIPLE, null, 0, 0, -1, 1, s.VOLUME);
		sound.pause();
		sound._active = false;
		s.allSounds.push(sound);

		sound = s.scorpion = SoundJS.play(Assets.SND_SCORPION, null, 0, 0, -1, 1, s.VOLUME);
		sound.pause();
		sound._active = false;
		s.allSounds.push(sound);

		sound = s.spider =  SoundJS.play(Assets.SND_SPIDER, null, 0, 0, -1, 1, s.VOLUME);
		sound.pause();
		sound._active = false;
		s.allSounds.push(sound);
	};

	s.pause = function(){
		for(var i = 0, l = s.allSounds.length; i < l; i++){
			var sound = s.allSounds[i];
			if (sound._active) { sound.pause(); }
		}
	};

	s.resume = function(){
		for(var i = 0, l = s.allSounds.length; i < l; i++){
			var sound = s.allSounds[i];
			if (sound._active) { sound.resume(); }
		}
	};

	s.stop = function(){
		Atari.trace("[BackgroundSound] Stop All");
		for(var i = 0, l = s.allSounds.length; i < l; i++){
			var sound = s.allSounds[i];
			sound._active = false;
			sound.stop();
			//sound.setPosition(0);
		}
		this.allSounds.length = 0;
	};

	s.update = function(){
		//Atari.trace("[BackgroundSound] Update");

		var centipedeList = s.game.centipedeList;
		var isPoisoned = false;
		for(var i = 0, l = centipedeList.length; i < l; i++){
			var centipede = centipedeList[i];
			if(centipede.head.isPoisoned){
				isPoisoned = true;
				break;
			}
		}

		if(isPoisoned){
			s.centipedeMultiple._active && s.centipedeMultiple.pause();
			s.centipedeMultiple._active = false;
			s.centipedeNormal._active && s.centipedeNormal.pause();
			s.centipedeNormal._active = false;
			!s.centipedePoisoned && s.centipedePoisoned.resume();
			s.centipedePoisoned._active = true;
		} else if(centipedeList.length > 1){
			s.centipedePoisoned._active && s.centipedePoisoned.pause();
			s.centipedePoisoned._active = false;
			s.centipedeNormal._active && s.centipedeNormal.pause();
			s.centipedeNormal._active = false;
			!s.centipedeMultiple._active && s.centipedeMultiple.resume();
			s.centipedeMultiple._active = true;
		} else if(centipedeList.length == 1){
			s.centipedePoisoned._active && s.centipedePoisoned.pause();
			s.centipedePoisoned._active = false;
			s.centipedeMultiple._active && s.centipedeMultiple.pause();
			s.centipedeMultiple._active = false;
			!s.centipedeNormal._active && s.centipedeNormal.resume();
			s.centipedeNormal._active = true;
		} else {
			s.centipedeNormal._active && s.centipedeNormal.pause();
			s.centipedeNormal._active = false;
			s.centipedePoisoned._active && s.centipedePoisoned.pause();
			s.centipedePoisoned._active = false;
			!s.centipedeMultiple._active && s.centipedeMultiple.pause();
			s.centipedeMultiple._active = true;
		}

		if(s.game.currentScorpion != null) {
			if (!s.scorpion._active) {
				s.scorpion.setPosition(0);
				s.scorpion.resume();
				s.scorpion._active = true
			}
		} else if (s.scorpion._active) {
			s.scorpion.pause();
			s.scorpion._active = false;
		}

		if(s.game.currentSpider != null) {
			if (!s.spider._active) {
				s.spider.setPosition(0);
				s.spider.resume();
				s.spider._active = true;
			}
		} else if (s.spider._active) {
			s.spider.pause();
			s.spider._active = false;
		}
	};

	s.onFleaComplete = function(){
		s.isFleaPlaying = false;
	}

	scope.BackgroundSound = BackgroundSound;

}(window.Atari.currentGame))