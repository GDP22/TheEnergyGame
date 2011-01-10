(function(){
    /*
     * Effects are the result of a decisions.
     *
     * This file stores a variety of useful effect functions that
     * DecisionChoices can combine and use without having to specify
     * the implementation details themselves.
     *
     * Effects can also be used when adding a power source.
     *
     */

    EG.Effects = {
        /*
         * Happiness modifiers
         */
        modifyHappiness: function(percent, cell) {
            var f = this._modifyHappiness.partial(percent, undefined, []);
            this._modify(f, cell);
        },
        _modifyHappiness:function(percent, cell, cities) {
            // if there's a city, and if the city hasn't been seen before
            if (cell.city && ($.inArray(cell.city, cities) == -1)) {
                // only push if it's a real city
                if (cell.city.isRealCity) {
                    cities.push( cell.city );
                }
                cell.city.averageCitizen.happiness *= percent;
            }
        },

        modifyPopulationsAverageHappiness:function(map, val) {
            for(var y = 0; y < map.gameMap.length; y++) {
                for(var x = 0; x < map.gameMap[0].length; x++) {
                    var cell = map.gameMap[y][x];
                    if(cell.city){
                        var avCitizen = cell.city.averageCitizen;
                        avCitizen.happiness *= val;
                        if (avCitizen.happiness < 0.1){
                            avCitizen.happiness = 0.1;
                        }else if (avCitizen.happiness > 1.5){
                            avCitizen.happiness = 1.5;
                        }
                    }
                }
            }
        },

        /*
         * Population modifiers
         */
        modifyPopulation: function(percent, cell){
            var f = this._modifyPopulation.partial(percent, undefined);
            this._modify(f,cell);
        },
        _modifyPopulation : function(percent,cell) {
            if (cell.city) {
                cell.city.averageCitizen.population *= percent;
            }
        },

        /*
         * Emissions modifiers
         */
        modifyEmissions : function(percent, cell) {
            var f = this._modifyEmissions.partial(percent, undefined);
            this._modify(f, cell);
        },
        _modifyEmissions : function(percent, cell) {
            if (cell && cell.contents && cell.contents.length > 0) {
                var go = cell.contents[0];
                if (go.decorators.Emissions) {
                    go.decorators.Emissions.modifyMultiplier(percent);
                }
            }
        },

        /*
         * Money modifier
         */
        modifyMoney : function(amount) {
            var old = EG.player.getMoney();
            var newMoney = old + amount;
            if (newMoney > 0){
                EG.player.setMoney(newMoney);
            }else{
                EG.player.setMoney(0);
            }
        },

        areaOfEffect : function(centre, radius, fn) {
            // performs fn on all cells with the radius of centre cell
            // Since our map is a grid, the radius is in cells
            /*
             *  r=2, c=3,3,
             *    1 2 3 4 5 col
             *  1 # # # # #
             *  2 # # # # #
             *  3 # # # # #
             *  4 # # # # #
             *  5 # # # # #
             * row
             *
             */

            var centreRow = centre.row;
            var centreCol = centre.col;
            var dropoffPercent = 1.0;
            var cells;

            for (var r = 0; r <= radius;r++) {
                // Clear previous cells
                cells = [];

                // find cells with this radius
                var i,j;

                //Top
                for (i = (centreRow - r), j = (centreCol - r); i <= (centreRow + r); i++ ) {
                    this._checkAddCell(i,j,cells);
                }

                //Bottom
                for (i = (centreRow - r), j = (centreCol + r); i <= (centreRow + r); i++ ) {
                    this._checkAddCell(i,j,cells);
                }

                //left
                for (i = (centreRow - r), j = (centreCol - r + 1); j <= (centreCol + r - 1); j++ ) {
                    this._checkAddCell(i,j,cells);
                }

                //Right
                for (i = (centreRow + r), j = (centreCol - r + 1); j <= (centreCol + r - 1); j++ ) {
                    this._checkAddCell(i,j,cells);
                }

                /*
                 * At r=0, with total radius=4: 5/5 = 100%
                 * At r=1, ...                  4/5 = 80%
                 * At r=2                       3/5 = 60%
                 * At r=3                       2/5 = 40%
                 * At r=4                       1/5 = 20%
                 */
                dropoffPercent = (radius + 1 - r)/(radius+1);
                for (var c = 0; c < cells.length; c++) {
                    fn.apply(EG, [cells[c], dropoffPercent]);
                }
            }

        },
        /*
         * Utility fn, keeps 'cells' from containing duplicates
         */
        _checkAddCell : function(i,j, cells) {
            var cell = EG.model.map.findCellByRowCol(i,j);
            if (cell && ($.inArray(cell, cells) == -1)) {
                cells.push( cell );
            }
        },

        /*
         * Utility fn. Applies a given function to either a specified cell,
         * or if that arg is missing, applies to all cells.
         */
        _modify : function(fn, c) {
            if (c) {
                fn.call(EG, c);
            } else {
                EG.model.map.fmap(function(cell, col, row){
                    fn.call(EG, cell);
                });
            }
        }
    };
})();
