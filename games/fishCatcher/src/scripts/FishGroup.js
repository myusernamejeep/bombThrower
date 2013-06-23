(function(scope) {
 
	var FishGroup = { pattens:[] };

	FishGroup.setRandomPatten = function(fishes, startX, startY)
	{
		var pattens = this.pattens, len = pattens.length;
		var patten = pattens[Math.random()*len >> 0];
		patten(fishes, startX, startY);
	};

	var HLinePatten = function(fishes, startX, startY)
	{
		var len = fishes.length, prev = {x:startX, y:startY, width:0, height:0}, dir = startX > 0 ? 1 : -1;
		for(var i = 0; i < len; i++)
		{
			var fish = fishes[i];
			var dx = Math.random()*fish.width + 20 >> 0;
			var dy = Math.random()*fish.height + 20 >> 0;
			if(Math.random() > 0.5) dy *= -1;
			fish.sprite.x = fish.x = Math.abs(prev.x + dx * dir);
			fish.sprite.y = fish.y = Math.abs(prev.y + dy);
			prev = fish;
			//console.debug('Fish sprite', fish.sprite.x, fish.sprite.y);
		}
	};

	FishGroup.pattens.push(HLinePatten);

    scope.FishGroup = FishGroup;

}(window.Atari.currentGame))