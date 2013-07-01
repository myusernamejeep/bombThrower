 (function(window) {
    function Platform(w,h) {
        this.width = w;
        this.height = h;
        this.initialize();
    }

Platform.prototype = new createjs.Container ();
Platform.prototype.platformBody = null;
Platform.prototype.Container_initialize = Platform.prototype.initialize;

Platform.prototype.initialize = function() {
    this.Container_initialize();
    this.platformBody = new createjs.Shape();
    this.addChild(this.platformBody);
    this.makeShape();
}

Platform.prototype.makeShape = function() {
    var g = this.platformBody.graphics;
    g.drawRect(0,0,this.width,this.height);
}
window.Platform = Platform;
}(window));