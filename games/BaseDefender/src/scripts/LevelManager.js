(function(scope) {

	function LevelManager() {
		this.initialize();
	}
	s = LevelManager;
	s.START_LIVES = 20,
	s.START_FETUS_SPAWN = 1100,
	s.FETUS_DECAY = 0.01,
	s.FETUS_MIN = 800,

	//Rate of pursuit
	s.BADDY_SPAWN = 300,
	s.BADDY_DECAY = 0.08,
	s.BADDY_MIN = 30,

	//Number to launch Baddy
	s.BADDY_TIMER = 1200,
	s.BADDY_TIMER_MIN = 600,

	s.CHANGE_MAX = 10,
	s.HIT_MAX = 25,
	s.MAX_SWIRL_SPEED = 80,
	s.MIN_SWIRL_SPEED = 25

	var p = LevelManager.prototype =  {
		currentLevel:null,
		lives:null,
		fetusFactor:null,
		hits:null,
		charge:null,

		initialize: function() {
			this.hits = 0;
			this.currentLevel = 1;
			this.lives = s.START_LIVES;
			this.calculateCharge();
		},

		getSwirlSpeed: function () {
			return Math.min(80, 25+Math.ceil(((this.currentLevel/2)*5)))
		},

		getLevelType: function () {
			var allowRotation = (this.currentLevel % 2 == 0) ? true : false;
			var allowUpDown = (this.currentLevel % 3 == 0) ? true : false;
			return {rotation:allowRotation, oscillate:allowUpDown }
		},

		getEnergyNeedToFill: function () {
			return Math.min(10, this.currentLevel+1);
		},

		getQotileHitTotal: function () {
			return Math.min(s.HIT_MAX, this.hits);
		},

		getCannonChargeTotal: function () {
			return this.charge;
		},

		getFetusSpawnTime: function () {
			//Coming back
			var value = Math.max(s.FETUS_MIN, s.START_FETUS_SPAWN - (s.FETUS_DECAY * (this.currentLevel *s.START_FETUS_SPAWN)));
			return value;
		},

		getBaddySpawnTime: function () {
			//Rate of pursuit
			var value = Math.max(s.BADDY_MIN, s.BADDY_SPAWN - (s.BADDY_DECAY * (this.currentLevel *s.BADDY_SPAWN)));
			return value;
		},

		getBaddyTimer: function () {
			//Number to launch Baddy
			var value = Math.max(s.BADDY_TIMER_MIN, s.BADDY_TIMER - (s.BADDY_DECAY * (this.currentLevel *s.BADDY_TIMER)));
			return value;
		},

		calculateCharge: function () {
			var count = (this.currentLevel % 2) ? 1 : 0;
			this.hits += count;
			this.charge = Math.min(s.CHANGE_MAX, this.currentLevel);
		},

		levelComplete: function () {
			this.currentLevel++;
			this.calculateCharge();
		},

		reset: function () {
			this.currentLevel = 1;
			this.change = 1;
			this.hits = 0;
			this.lives = s.START_LIVES;
			this.calculateCharge();
		}
	}

	scope.currentGame.LevelManager = LevelManager;

}(window.Atari));