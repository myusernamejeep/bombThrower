(function(window) {
    function Hero(imgHero) {
        this.initialize(imgHero);
    }

Hero.prototype = new createjs.BitmapAnimation();
Hero.prototype.Animation_initialize = Hero.prototype.initialize;
Hero.prototype.initialize = function(imgHero) {
    var spriteSheet = new createjs.SpriteSheet({

images: [imgHero], 
frames: {width: 60, height: 85, regX: 29, regY: 80}, animations: {
    walk: [0, 19, "walk"],
    idle: [20, 20],
    jump: [21, 21] } });

SpriteSheetUtils
.addFlippedFrames(spriteSheet, true, false, 
false);
this.Animation_initialize(spriteSheet);
this.gotoAndStop("idle");
}
window.Hero = Hero;
}(window));