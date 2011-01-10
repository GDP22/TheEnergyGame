(function(){
    EG.RecurringCost = function(updateFn, recurringCost) {
        EG.Decorator.call(this,'RecurringCost');
        this.updateFn = updateFn;
        this.recurringCost = recurringCost;
        this.isScaled = false;
    };

    $.extend(EG.RecurringCost.prototype, EG.Decorator.prototype);

    EG.RecurringCost.prototype.update = function (dt) {
        this.recurringCost = this.updateFn(dt, this);
    };

    EG.RecurringCost.prototype.getCost = function () {
        return this.recurringCost;
    };
    EG.RecurringCost.prototype.applyCost = function () {
        EG.Effects.modifyMoney(-this.recurringCost);
    };
    EG.RecurringCost.prototype.setCost = function (val) {
        this.recurringCost = val ? val : this.recurringCost;
    };
})();
