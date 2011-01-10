(function(){
    EG.Cost = function(updateFn, cost) {
        EG.Decorator.call(this,'Cost');
        this.updateFn = updateFn;
        this.buildCost = cost;
    };

    $.extend(EG.Cost.prototype, EG.Decorator.prototype);

    EG.Cost.prototype.update = function (dt) {
        this.updateFn(dt, this);
    };

    EG.Cost.prototype.getCost = function () {
        return this.buildCost;
    };

})();
