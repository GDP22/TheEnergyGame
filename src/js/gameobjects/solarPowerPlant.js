(function () {
    // Check EG is loaded
    if (typeof window.EG == 'undefined') {
        return;
    }

    var name = EG.GameObjectNames.Solar;
    var type = EG.GameObjectTypes.BUILDING;
    var info = {
        fullName : "Solar Power Farm",
        floatImage: 'images/solarPowerPlantFloat.png', // the floating version
        ribbonImage: 'images/solarPowerPlantRibbon.png', // the thing on the ribbon
        infoImage: 'images/solarPowerPlantPanel.png', // the thing in the sidebar
        brokenImage: 'images/brokenbuilding.png', // when it's dead
        buildOn: [EG.CellTypes.GROUND],
        description: "",//"The solar power plant converts sunlight into electricity using photovoltaic cells. Mirror systems can be used to reflect light onto the cells for as much of the day as is possible.",
        buildCost: 150000000, // http://www.businessweek.com/magazine/content/04_36/b3898119_mz018.htm
        recurrCost: 312.5,
        output: 0.07,
        lifetime: 25 * 12 // 25 years
    };

    var fn = function(x, y, nobuild, output, lifeRemaining) {
        return new this.GenericGameObject(name, x, y, nobuild, output, lifeRemaining,'images/solarPowerPlant.png', 5, 500);
    };

    EG.infoLibrary.add(name, fn, type, info);
})();
