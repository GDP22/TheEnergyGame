(function () {
    // Check EG is loaded
    if (typeof window.EG == 'undefined') {
        return;
    }

    var name = EG.GameObjectNames.NaturalGas;
    var type = EG.GameObjectTypes.BUILDING;
    var info = {
        fullName : "Natural Gas",
        floatImage: 'images/naturalGasFloat.png', // the floating version
        ribbonImage: 'images/naturalGasRibbon.png', // the thing on the ribbon
        infoImage: 'images/naturalGas.png', // the thing in the sidebar
        brokenImage: 'images/brokenbuilding.png', // when it's dead
        buildOn: [EG.CellTypes.GROUND],
        description: "",//"Produces electricity through heating water to produce steam that then turns turbines, creating carbon dioxide in the process. Average cost but lower output than others.",
        buildCost: 91500000, // http://www.power-technology.com/projects/laverton/
        recurrCost: 190, //(this.buildCost * 0.001)/480,
        emissions: 140,
        output: 0.07,
        lifetime: 50 * 12 // 50 years
    };

    var fn = function(x, y, nobuild, output, lifeRemaining) {
        var ggo = new this.GenericGameObject(name, x, y, nobuild, output, lifeRemaining,'images/naturalGas.png', 1, 1);

        var emissions = new this.Emissions(function (dt, decorator) {
            return this.parent.decorators.Energy.getEnergy() * info.emissions;
        });

        ggo.decorateWith(emissions);
        return ggo;
    };

    EG.infoLibrary.add(name, fn, type, info);
})();
