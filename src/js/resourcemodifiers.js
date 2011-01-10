(function() {

/**
 * This file initialises resource modifiers for certain positions in the map.
 */

// TODO: Refactor this into a list of places, not a whole bunch of for loops

    EG.initialiseResourceModifiers = function(map) {
        var x,y;
        // HYDROELECTRIC
        // Anywhere north of Y = 29 has a 1.4x modifier for hydroelectric
            for(y = 29; y > 0; y--){
                for(x = 0; x < map.gameMap.length - 1; x++) {
                    map.findCellByRowCol(y,x).outputModifiers[EG.GameObjectNames.HydroElectric] = 1.4;
                }
            }

        // Tidal lagoons are the best places for wave farms
        // See http://www.climateandfuel.com/pics/plan2050uk.JPG
        // WAVEFARMS
            // Below the I.O.W
            for(x = 41; x <= 43; x++) {
                for(y = 69; y <= 70; y++) {
                     map.findCellByRowCol(y,x).outputModifiers[EG.GameObjectNames.WaveFarm] = 1.4;
                }
            }

            // Near weston super-mare
            for(x = 33; x <= 35; x++) {
                for(y = 62; y <= 65; y++) {
                     map.findCellByRowCol(y,x).outputModifiers[EG.GameObjectNames.WaveFarm] = 1.4;
                }
            }

            // North East Wales
            for(x = 25; x <= 30; x++) {
                for(y = 45; y <= 49; y++) {
                     map.findCellByRowCol(y,x).outputModifiers[EG.GameObjectNames.WaveFarm] = 1.4;
                }
            }

            //
            for(x = 48; x <= 52; x++) {
                for(y = 48; y <= 52; y++) {
                     map.findCellByRowCol(y,x).outputModifiers[EG.GameObjectNames.WaveFarm] = 1.4;
                }
            }

            // Just above N. Ireland
            for(x = 16; x <= 22; x++) {
                for(y = 30; y <= 35; y++) {
                     map.findCellByRowCol(y,x).outputModifiers[EG.GameObjectNames.WaveFarm] = 1.4;
                }
            }

        // WIND
        // Anywhere north of Y = 29 has a 1.4x modifier for wind
            for(y = 29; y > 0; y--){
                for(x = 0; x < map.gameMap.length - 1; x++) {
                    map.findCellByRowCol(y,x).outputModifiers[EG.GameObjectNames.WindTurbine] = 1.4;
                }
            }

    };

})();
