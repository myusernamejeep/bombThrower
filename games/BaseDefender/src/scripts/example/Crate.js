(function(window) {
    function Crate() {
        this.initialize();
    }

Crate.prototype = new createjs.Container();
Crate.prototype.img = new Image();
Crate.prototype.Container_initialize =
Crate.prototype.initialize;
Crate.prototype.initialize = function() {

this.Container_initialize();
var bmp = new createjs.Bitmap("img/crate.jpg");
bmp.x=-20;
bmp.y=-20;
this.addChild(bmp);}
window.Crate = Crate;
}(window));