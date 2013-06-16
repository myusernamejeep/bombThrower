(function Assets(scope){

    /**
     * Audio
     */
    Assets.SND_CENTIPEDE = "SoundCentipede";
    Assets.SND_CENTIPEDE_MULTIPLE = "SoundCentipedeMultiple";
    Assets.SND_CENTIPEDE_CRAZY = "SoundCentipedeCrazy";
    Assets.SND_EXPLOSION = "SoundExplosion";
    Assets.SND_SHOOT = "SoundShoot";

	Assets.SND_PLAYER_HIT = "PlayerHit";
	Assets.SND_MUSHROOM_HIT = "MushroomHit";

    Assets.SND_EXTRA_LIFE = "SoundExtraLife";
    Assets.SND_FLEA = "SoundFlea";
    Assets.SND_REPAIR = "SoundRepair";
    Assets.SND_SCORPION = "SoundScorpion";
    Assets.SND_SPIDER = "SoundSpider";

	Assets.SND_GAMESTART = "StartGame";
	Assets.SND_GAMEOVER = "GameOver";
	Assets.SND_LEVELCOMPLETE = "LevelComplete";

    /**
     * Textures
     */
    Assets.TEX_SHOT = "Projectile";
    Assets.TEX_EXPLOSION = "Explosion2";
	Assets.TEX_EXPLOSION_PURPLE = "ExplosionPurple";
	Assets.TEX_DEATH_SMOKE = "DeathSmoke";

	Assets.HUD_GNOME= "hudGnome";

    Assets.TEX_300 = "Floaty300";
    Assets.TEX_600 = "Floaty600";
    Assets.TEX_900 = "Floaty900";

    Assets.TEX_MUSHROOM = "MushroomIdle";
	Assets.TEX_MUSHROOM_MOVE = "MushroomMove";
	Assets.TEX_MUSHROOM_DAMAGE = "MushroomDmg";

	Assets.TEX_MUSHROOM_POISONED = "MushroomPoisonIdle";
	Assets.TEX_MUSHROOM_POISONED_MOVE = "MushroomMove";
	Assets.TEX_MUSHROOM_POISONED_DAMAGE = "MushroomPoisonDmg";

    Assets.TEX_PLAYER_IDLE = "GnomeIdle";
    Assets.TEX_PLAYER_WALK_RIGHT = "GnomeWalkRight";
	Assets.TEX_PLAYER_WALK_LEFT = "GnomeWalkLeft";
    Assets.TEX_PLAYER_ATTACK = "GnomeAttack";
    Assets.TEX_PLAYER_DEATH = "GnomeDeath";

    Assets.TEX_FLEA = "FleaMove";
    Assets.TEX_SPIDER_LEFT = "SpiderWalkLeft";
	Assets.TEX_SPIDER_RIGHT = "SpiderWalkRight";
    Assets.TEX_SCORPION = "Scorpion";
    Assets.TEX_CENTI_HEAD = "CentipedeWalk";
	Assets.TEX_CENTI_HEAD_DOWN = "CentipedeHeadDown";
    Assets.TEX_CENTI_BODY = "CentipedeBodyWalk";
	Assets.TEX_CENTI_BODY_DOWN = "CentipedeBodyDown";

    Assets.textureSheet; //An Easel SpriteSheet which is injected externally by the main game class, it holds all texturePacker assets for the game.

    Assets.getBitmap = function(name, center, play){

        var spriteSheet = Assets.textureSheet;
		console.debug('spriteSheet', spriteSheet );
        var bmp = new BitmapAnimation(spriteSheet);
        if(play){
            bmp.gotoAndPlay(name);
        } else {
            bmp.gotoAndStop(name);
        }

        //Inject type
        bmp.type = name;

        //Inject width/height
        if(bmp.spriteSheet._frameWidth != 0){
            bmp.width = bmp.spriteSheet._frameWidth;
            bmp.height = bmp.spriteSheet._frameHeight;
        } else {
            try {
	            //Atari.trace("Getting Bitmap: ", name);
                var frame = bmp.spriteSheet._frames[bmp.currentFrame];
                bmp.width = frame.rect.width;
                bmp.height = frame.rect.height;
            } catch(e){
                throw(e);
            }

        }

        //Center registration point?
        if(center){
            bmp.regX = bmp.width/2;
            bmp.regY = bmp.height/2;
        } else {
	        bmp.regX = 0;
            bmp.regY = 0;
        }

        return bmp;
    }

    Assets.getBitmapAnimation = function(name, center){
        var bmp = Assets.getBitmap(name, center, true);
        console.debug('getBitmapAnimation bmp', bmp, name, center  );
		bmp.gotoAndPlay(name);
        return bmp;
    }

    /**
    SOUNDS
    */
    Assets.SND_BG1 = "sounds/sound.mp3";

    scope.currentGame.Assets = Assets;
}
)(window.Atari)