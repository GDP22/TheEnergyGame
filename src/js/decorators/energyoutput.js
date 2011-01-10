(function(){
    EG.Energy = function(updateFn, output) {
        EG.Decorator.call(this,'Energy');
        this.updateFn = updateFn;
        this.output = output;
        this.taperPercent = 1;
    };

    $.extend(EG.Energy.prototype, EG.Decorator.prototype);

    EG.Energy.prototype.update = function (dt) {
        this.output = this.updateFn(dt, this);
    };

    EG.Energy.prototype.getEnergy = function () {
        return this.output;
    };

    EG.Energy.prototype.setTaper = function(val) {
        this.taperPercent = val < 0.4 ? 0.4 : val;
    };
})();
