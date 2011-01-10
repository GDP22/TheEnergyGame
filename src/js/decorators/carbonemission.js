(function(){
    EG.Emissions = function(updateFn) {
        EG.Decorator.call(this,'Emissions');
        this.updateFn = updateFn;
        this.emissions = 0;
        this.multiplier = 1.0;
    };

    $.extend(EG.Emissions.prototype, EG.Decorator.prototype);

    EG.Emissions.prototype.update = function (dt) {
        this.emissions = this.multiplier * this.updateFn(dt, this);
    };

    EG.Emissions.prototype.getEmissions = function () {
        return this.emissions;
    };

    EG.Emissions.prototype.modifyMultiplier = function (val) {
        this.multiplier *= val;
    };
})();
