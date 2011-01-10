(function () {
    EG.GenericGameObject = function (name, x, y, nobuild, output, lifeRemaining, imageName, numFrames, duration, recurrCost) {
        var go = new EG.GameObject(name);

        // If no output was defined (it's a manually constructed building, use
        // the default
        var info = EG.infoLibrary.get(name).info;
        output = output || info.output;
        numFrames = numFrames || 1;
        duration = duration || 1;
        recurrCost = recurrCost || info.recurrCost;
        // Decorate
        var pos = new EG.Position(x,y);
        var cell = EG.model.map.findCellByXY(x,y);
        var img = EG.textureLibrary.get(imageName);
        var anim = new EG.Animation(img,pos,numFrames,duration,EG.model.map.tileWidth,EG.model.map.tileHeight);
        var reccurringCost = new EG.RecurringCost(function(dt,decorator){
            return recurrCost;
        }, recurrCost);

        var lifetimeMonths = lifeRemaining || info.lifetime;

        if (!nobuild) {

            var buildTime = 0.1;
            var builder = new EG.Builder(buildTime, info.buildCost, function() {
                this.parent.decorateWith(anim);

                // If it's an object that's being built, add a countdown timer
                // to add a warning animation above it 10 years before it dies.
                var time = (lifetimeMonths - 120);

                var countdown = new EG.Countdown(time, undefined, function() {
                    // This should be called when the object is nearly dead.
                    var pos = this.parent.decorators.Position;
                    var obj = EG.infoLibrary.get(EG.GameObjectNames.WarningAnimation).fn(pos.x, pos.y);

                    EG.model.map.findCellByXY(pos.x, pos.y).contents.push(obj);
                });

                this.parent.decorateWith(countdown);
            });

            // Img and anim to use in the meantime
            var buildingImg = EG.textureLibrary.get('images/building.png');
            var buildingAnim = new EG.Animation(buildingImg,pos,8, buildTime*EG.config.timeStep ,EG.model.map.tileWidth,EG.model.map.tileHeight);
            go.decorateWith(buildingAnim);
            go.decorateWith(builder);
        } else {
            go.decorateWith(anim);
            // If it's an object that's being built, add a countdown timer
            // to add a warning animation above it 10 years before it dies.
            var time = lifetimeMonths - 120;

            var callback = function() {
                // This should be called when the object is nearly dead.
                var pos = this.parent.decorators.Position;
                var obj = EG.infoLibrary.get(EG.GameObjectNames.WarningAnimation).fn(pos.x, pos.y);

                EG.model.map.findCellByXY(pos.x, pos.y).contents.push(obj);

            };

            var countdown = new EG.Countdown(time, undefined, callback);
            go.decorateWith(countdown);
        }

        lifetimeMonths = lifeRemaining || info.lifetime;

        var taperPercent = 1;
        var dropPercent = 1 / lifetimeMonths;
        var dropCount = 0;
        var monthsUntilDrop = lifetimeMonths / 4;

        var lifetime = new EG.Lifetime(lifetimeMonths,
            // Every Month
            //
            function(){
                if(this.parent.decorators.Energy){
                    monthsUntilDrop--;

                    if(monthsUntilDrop <= 0){
                        taperPercent -= dropCount * dropPercent;
                        dropCount++;
                        this.parent.decorators.Energy.setTaper(taperPercent);
                    }
                }
            },
            // End of life
            function(){
            });


      // Outputfactor can change over time, so need to request it each time
        var outputFactor = function() { return cell.getOutputModifier(name); };
        var energy = new EG.Energy(function (dt, decorator) {
            // TODO: There should be some measure of degradation here as a building
            // ages.
            return output * outputFactor() * this.taperPercent;
        }, output * outputFactor());


        go.decorateWith(lifetime);
        go.decorateWith(pos);
        go.decorateWith(reccurringCost);
        go.decorateWith(energy);
        return go;

    };
})();
