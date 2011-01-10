(function () {
    // Check EG is loaded
    if (typeof window.EG == 'undefined') {
        return;
    }

    var name = EG.GameObjectNames.Nuclear;
    var type = EG.GameObjectTypes.BUILDING;
    var info = {
        fullName : "Nuclear Power Plant",
        floatImage: 'images/nuclearPowerPlantFloat.png', // the floating version
        ribbonImage: 'images/nuclearPowerPlantRibbon.png', // the thing on the ribbon
        infoImage: 'images/nuclearPowerPlantPanel.png', // the thing in the sidebar
        brokenImage: 'images/brokenbuilding.png', // when it's dead
        buildOn: [EG.CellTypes.COAST],
        description: "",//"Produces electricity through the heating of water to turn turbines, using the heat produced during nuclear reactions, producing very low levels of emissions. High cost but relatively high output.",
        buildCost: 1500000000, //http://news.bbc.co.uk/1/hi/business/7180539.stm
        recurrCost: 3125,
        emissions: 8,
        output: 0.72,
        lifetime: 12 * 60 // 60 years
    };

    var fn = function(x, y, nobuild, output, lifeRemaining) {
        var ggo = new this.GenericGameObject(name, x, y, nobuild, output, lifeRemaining,'images/nuclearPowerPlant.png', 6, 2000);

        var emissions = new this.Emissions(function (dt, decorator) {
            return this.parent.decorators.Energy.getEnergy() * info.emissions;
        });

        ggo.decorateWith(emissions);

        var row = Math.floor(x / EG.model.map.tileWidth);
        var col = Math.floor(y / EG.model.map.tileHeight);

        var radius = 3;

        var cities = [];

        EG.Effects.areaOfEffect({row: col, col: row}, radius,
            function(cell, dropOffPercent) {
                if(cell.city) {
                    if($.inArray(cell.city, cities) < 0) {
                        cell.city.averageCitizen.happiness *= 1 - dropOffPercent;
                        cities.push(cell.city);
                    }
                }
           }
        );

        return ggo;
    };

    EG.infoLibrary.add(name, fn, type, info);
})();
