(function(){
    /**
     * Builder:
     * 
     * A decorator to give buildings a 'build time'
     * @param {Integer} time: the time to build in _MONTHS_
     * @param {EG.Animation} anim: the animation to use once done building
     */
    EG.Builder = function(time, callback) {
        // Convert time to real seconds
        this.buildTime = time * EG.config.timeStep;

        // What to do when done
        this.callback = callback;
    };

    $.extend(EG.Builder.prototype, EG.Decorator.prototype);

    EG.Builder.prototype.update = function (dt) {
        this.buildTime -= dt;
        if (this.buildTime <= 0) {
            this.finishBuilding();
        }
    };

    EG.Builder.prototype.finishBuilding = function() {
        this.callback();
    };
})();