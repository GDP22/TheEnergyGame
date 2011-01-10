(function () {
    // Check EG is loaded
    if (typeof window.EG == 'undefined') {
        return;
    }

    var name = EG.GameObjectNames.HydroElectric;
    var type = EG.GameObjectTypes.BUILDING;
    var info = {
        fullName : "Hydroelectric Power Plant",
        floatImage: 'images/hydroelectricFloat.png', // the floating version
        ribbonImage: 'images/hydroelectricRibbon.png', // the thing on the ribbon
        infoImage: 'images/hydroelectricPanel.png', // the thing in the sidebar
        brokenImage: 'images/brokenbuilding.png', // when it's dead
        buildOn: [EG.CellTypes.GROUND],
        description: "",//"Produces electricity through the use of the gravitational force of falling or flowing water, producing no emissions. Relatively low cost and long life. Output is small.",
        buildCost: 105600000, // http://library.thinkquest.org/C004471/tep/en/traditional_energy/hydroelectric_power.html
        recurrCost: 220,
        output: 0.1,
        lifetime: 12 * 100 // 100 years
    };

    var fn = function(x, y, nobuild, output, lifeRemaining) {
        return new this.GenericGameObject(name, x, y, nobuild, output, lifeRemaining,'images/hydroelectric.png', 6, 1000);
    };

    EG.infoLibrary.add(name, fn, type, info);
})();
