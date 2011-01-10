(function () {
    // Check EG is loaded
    if (typeof window.EG == 'undefined') {
        return;
    }

    var name = EG.GameObjectNames.CCGT;
    var type = EG.GameObjectTypes.BUILDING;
    var info = {
        fullName : "Carbon Capture and Storage",
        floatImage: 'images/CCGTFloat.png', // the floating version
        ribbonImage: 'images/CCGT.png', // the thing on the ribbon
        infoImage: 'images/CCGT.png', // the thing in the sidebar
        brokenImage: 'images/brokenbuilding.png', // when it's dead
        buildOn: [EG.CellTypes.GROUND],
        description: "",//"Capturing carbon dioxide from sources such as fossil fuel power plants, and storing it underground or in the water. This will reduce emissions but have no effect of output of energy.",
        buildCost: 1000000000, //http://www.ft.com/cms/s/0/90a5f908-dc3c-11df-a9a4-00144feabdc0.html#axzz16blQTo49
        recurrCost: 2083,//(this.buildCost * 0.001)/480,
        emissions: -0.065, // given from DECC pathway 3 - 31Mtco2 by 2050, pathways 4 gives -111Mtco2 so potentially 0.23
        output: 0,
        lifetime: 12 * 100 // 40 years
    };

    var fn = function(x, y, nobuild, output, lifeRemaining) {
        var coal = new this.GameObject(name);

        // If no output was defined (it's a manually constructed building, use
        // the default
        output = output || info.output;
        var recurrCost = info.recurrCost;
        // Decorate
        var pos = new this.Position(x,y);

        var cell = EG.model.map.findCellByXY(x,y);
        var outputFactor = cell.getOutputModifier(name);

        // Completed building image
        var img = EG.textureLibrary.get('images/CCGT.png');
        var anim = new this.Animation(img,pos,1,1,EG.model.map.tileWidth,EG.model.map.tileHeight);
        var recurringCost = new EG.RecurringCost(function(dt,decorator){
            return recurrCost;
        }, recurrCost);
        var energy = new this.Energy(function (dt, decorator) {
            // TODO: There should be some measure of degradation here as a building
            // ages.
            return output * outputFactor;
        }, output * outputFactor);
        var emissions = new this.Emissions(function (dt, decorator) {
            return info.emissions;
        });
        var lifetimeMonths = lifeRemaining || info.lifetime;
        var lifetime = new this.Lifetime(lifetimeMonths,
            // Every Month
            function(){
            },
            // End of life
            function(){
            });

        if(!nobuild) {
            var buildTime = 1; // 1 month build time
            var builder = new this.Builder(buildTime, info.buildCost, function() {
                this.parent.decorateWith(anim);
            });

            // Img and anim to use in hte meantime
            var buildingImg = EG.textureLibrary.get('images/building.png');
            var buildingAnim = new this.Animation(buildingImg,pos,8, buildTime*EG.config.timeStep ,EG.model.map.tileWidth,EG.model.map.tileHeight);
            coal.decorateWith(buildingAnim);
            coal.decorateWith(builder);
        } else {
            coal.decorateWith(anim);
        }

        coal.decorateWith(pos);
        coal.decorateWith(recurringCost);
        coal.decorateWith(energy);
        coal.decorateWith(emissions);
        coal.decorateWith(lifetime);
        return coal;
    };

    EG.infoLibrary.add(name, fn, type, info);
})();
