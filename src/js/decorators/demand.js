(function(){
    EG.Demand = function(updateFn) {
        EG.Decorator.call(this,'Demand');
        this.updateFn = updateFn;
    };

    $.extend(EG.Demand.prototype, EG.Decorator.prototype);

    EG.Demand.prototype.update = function (dt) {
        this.updateFn(dt, this);
    };

    EG.Demand.prototype.getDemand = function () {
        return 0.15 * Math.random();
    };
})();
