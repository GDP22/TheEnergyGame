(function(){
    /**
     * Countdown:
     * 
     * Counts down, does something at the end.
     * @param {Integer} time: the length of the countdown.
     * @param {Function} callback: what to do when done
     */
    EG.Countdown = function(time, type, callback) {
        EG.Decorator.call(this,'Countdown');
        // Convert time to real seconds
        this.buildTime = time;

        // What to do when done
        this.callback = callback;
    };
    $.extend(EG.Countdown.prototype, EG.Decorator.prototype);
    EG.Countdown.prototype.update = function (dt) {
        this.buildTime -= dt / EG.config.timeStep;

        if (this.buildTime <= 0) {
            this.finish();
        }
    };
    EG.Countdown.prototype.finish = function() {
        this.callback();
        this.remove();
    };

    /**
     * Builder:
     * 
     * A decorator to give buildings a 'build time' and a build cost
     */
    EG.Builder = function(months, cost, callback) {
        // Convert time to milliseconds
        this.buildTime = months;

        this.cost = cost;
        this.elapsed = 0.0;
        this.old_percent = 0.0;

        // What to do when done
        this.callback = callback;
    };

    $.extend(EG.Builder.prototype, EG.Decorator.prototype);

    EG.Builder.prototype.update = function (dt) {
        this.elapsed += dt / EG.config.timeStep;

        var percent = this.elapsed/this.buildTime;

        // it can go over 1, so to not overcharge, reset percent to 1.0
        if (percent > 1.0) {
            percent = 1.0;
        }

        var diff = percent - this.old_percent;
        var toRemove = -(diff * this.cost);
        EG.Effects.modifyMoney( toRemove );

        this.old_percent = percent;
        if (this.elapsed >= this.buildTime) {
            this.finishBuilding();
        }
    };

    EG.Builder.prototype.finishBuilding = function() {
        this.callback();
        this.remove();
    };



    /**
     * Lifetime - gives a building a lifetime, executes a function every month, and at the end.
     */
    EG.Lifetime = function(time, everyMonthFn) {
        EG.Decorator.call(this,'Lifetime');

        // Convert time to real seconds
        this.buildTime = time;

        // What to do every month
        this.everyMonthFn = everyMonthFn;

        // How long have we been in this game month
        this.month = 0;
    };
    $.extend(EG.Lifetime.prototype, EG.Decorator.prototype);

    EG.Lifetime.prototype.update = function(dt){
        this.buildTime -= dt / EG.config.timeStep;
        this.month += dt;

        if (this.month >= EG.config.timeStep) {
            this.everyMonth();
        }
        if (this.buildTime <= 0) {
            this.endOfLife();
        }
    };
    EG.Lifetime.prototype.everyMonth = function() {
        this.everyMonthFn();
        this.month = 0;
    };

    EG.Lifetime.prototype.endOfLife = function() {
        // What to do at the end of its life
        // If this building has emissions / output, remove them.
        if(this.parent.decorators.Emissions && this.parent.decorators.Lifetime.buildTime <= 0) {
            this.parent.decorators.Emissions.remove();
        }

        if(this.parent.decorators.Energy && this.parent.decorators.Lifetime.buildTime <= 0) {
            this.parent.decorators.Energy.remove();
        }

        if(this.parent.decorators.RecurringCost && this.parent.decorators.Lifetime.buildTime <= 0) {
            this.parent.decorators.RecurringCost.remove();
        }

        var pos = this.parent.decorators.Position;
        var obj = EG.infoLibrary.get(EG.GameObjectNames.DeadAnimation).fn(pos.x, pos.y);

        EG.model.map.findCellByXY(pos.x, pos.y).contents[1] = obj;

        this.remove();
    };
})();
