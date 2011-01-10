(function () {
    // Check EG is loaded
    if (typeof window.EG == 'undefined') {
        return;
    }

    var name = EG.GameObjectNames.WindTurbine;
    var type = EG.GameObjectTypes.BUILDING;
    var info = {
        fullName : "Wind Farm",
        floatImage: 'images/windTurbineFloat.png', // the floating version
        ribbonImage: 'images/windTurbineRibbon.png', // the thing on the ribbon
        infoImage: 'images/windTurbinePanel.png', // the thing in the sidebar
        brokenImage: 'images/brokenbuilding.png', // when it's dead
        buildOn: [EG.CellTypes.WATER, EG.CellTypes.GROUND],
        description: "",//"Produces electricity by allowing wind to move turbines in order to create power, without producing any emissions. Average cost and low output.",
        buildCost: 450000000, // based on a "cheap" farm built in kent http://news.bbc.co.uk/1/hi/england/kent/6188133.stm
        recurrCost : 937,
        output: 0.1,
        lifetime: 25 * 12 // 25 years
    };

    var fn = function(x, y, nobuild, output, lifeRemaining) {
        return new this.GenericGameObject(name, x, y, nobuild, output, lifeRemaining,'images/windTurbine.png', 2, 200);
    };

    EG.infoLibrary.add(name, fn, type, info);
})();
