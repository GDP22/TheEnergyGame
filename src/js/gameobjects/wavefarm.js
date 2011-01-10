(function () {
    // Check EG is loaded
    if (typeof window.EG == 'undefined') {
        return;
    }

    var name = EG.GameObjectNames.WaveFarm;
    var type = EG.GameObjectTypes.BUILDING;
    var info = {
        fullName : "Wave/Tidal Barriers",
        floatImage: 'images/wave_farmFloat.png', // the floating version
        ribbonImage: 'images/wave_farmRibbon.png', // the thing on the ribbon
        infoImage: 'images/wave_farm.png', // the thing in the sidebar
        brokenImage: 'images/brokenbuilding.png', // when it's dead
        buildOn: [EG.CellTypes.WATER],
        description: "",//"Produces electricity by harnessing the movements of waves or tides in order to move accuators that will then create pressure to force air through turbines. Very low cost but low output.",
        buildCost: 4000000, // http://en.wikipedia.org/wiki/Wave_power
        recurrCost: 8,
        output: 0.01,
        lifetime: 100 * 12 // 100 years
    };

    var fn = function(x, y, nobuild, output, lifeRemaining) {
        return new this.GenericGameObject(name, x, y, nobuild, output, lifeRemaining,'images/wave_farm.png',  1, 1);
    };

    EG.infoLibrary.add(name, fn, type, info);
})();
