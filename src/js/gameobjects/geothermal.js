(function () {
    // Check EG is loaded
    if (typeof window.EG == 'undefined') {
        return;
    }

    var name = EG.GameObjectNames.Geothermal;
    var type = EG.GameObjectTypes.BUILDING;
    var info = {
        fullName : "Geothermal",
        floatImage: 'images/geothermalPlantFloat.png', // the floating version
        ribbonImage: 'images/geothermalPlantRibbon.png', // the thing on the ribbon
        infoImage: 'images/geothermalPlantPanel.png', // the thing in the sidebar
        brokenImage: 'images/brokenbuilding.png', // when it's dead
        buildOn: [EG.CellTypes.GROUND],
        description: "",//"Produces electricity by drilling holes down to a hot region under the earth, which produces steam that then turns turbines to produce electricity. Relatively low cost but small output.",
        buildCost: 32000000, // ?? http://wiki.answers.com/Q/How_much_does_it_cost_to_build_a_geothermal_power_plant
        recurrCost: 66.6,
        output: 0.01, // TODO: Find a proper output
        lifetime: 30 * 12 // 30 years
    };

    var fn = function(x, y, nobuild, output, lifeRemaining) {
        return new this.GenericGameObject(name, x, y, nobuild, output, lifeRemaining,'images/geothermalPlant.png', 6, 1000);
    };


    EG.infoLibrary.add(name, fn, type, info);
})();
