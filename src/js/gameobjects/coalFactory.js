(function () {
    // Check EG is loaded
    if (typeof window.EG == 'undefined') {
        return;
    }

    var name = EG.GameObjectNames.CoalPowerStation;
    var type = EG.GameObjectTypes.BUILDING;
    var info = {
        fullName : "Coal Power Station",
        floatImage: 'images/coalPowerPlantFloat.png', // the floating version
        ribbonImage: 'images/coalPowerPlantRibbon.png', // the thing on the ribbon
        infoImage: 'images/coalPowerPlantPanel.png', // the thing in the sidebar
        brokenImage: 'images/brokenbuilding.png', // when it's dead
        buildOn: [EG.CellTypes.GROUND],
        description: "",//"Produces electricity by burning coal to generate steam, and has the side-effect of producing a large amount of carbon dioxide, which is released from the burning of the coal. High cost but good output.",
        buildCost: 11500000000, // http://business.timesonline.co.uk/tol/business/industry_sectors/natural_resources/article4138295.ece
        recurrCost: 23958,
        emissions: 200,
        output: 1.19,
        lifetime: 12 * 40 // 40 years
    };

    var fn = function(x, y, nobuild, output, lifeRemaining) {
        var ggo = new this.GenericGameObject(name, x, y, nobuild, output, lifeRemaining,'images/coalPowerPlant.png', 5, 800);

        var emissions = new this.Emissions(function (dt, decorator) {
            return this.parent.decorators.Energy.getEnergy() * info.emissions;
        });

        ggo.decorateWith(emissions);
        return ggo;

    };

    EG.infoLibrary.add(name, fn, type, info);
})();
