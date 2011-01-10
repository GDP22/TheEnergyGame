(function () {
    EG.CellTypes = {
        GROUND : 0,
        WATER : 1,
        COAST : 2,
        NOBUILDIRELAND : 3,
        NOBUILDNATIONALPARK : 4

    };
    // Populate information library with info about each Cell Type
    EG.infoLibrary.add(EG.CellTypes.GROUND,
        null, EG.GameObjectTypes.CELL,
        {
            image: 'images/ground.jpg',
            fullName: "Land"
        });
    EG.infoLibrary.add(EG.CellTypes.WATER,
        null, EG.GameObjectTypes.CELL,
        {
            image: 'images/ocean.png',
            fullName: "Ocean"
        });
    EG.infoLibrary.add(EG.CellTypes.COAST,
        null, EG.GameObjectTypes.CELL,
        {
            image: 'images/coast.jpg',
            fullName: "Coastline"
        });
    EG.infoLibrary.add(EG.CellTypes.NOBUILDNATIONALPARK,
        null, EG.GameObjectTypes.CELL,
        {
            image: 'images/nationalpark.jpg',
            fullName: "National Park"
        });
    EG.infoLibrary.add(EG.CellTypes.NOBUILDIRELAND,
        null, EG.GameObjectTypes.CELL,
        {
            image: 'images/nationalpark.jpg',
            fullName: "Ireland"
        });

    var CONTENTS_LIMIT = 1;
    EG.MapCell = function (x, y, width, height, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.row = y/height;
        this.col = x/width;

        this.visible = true;
        this.contents = [];
        this.contentTypes = null;
        this.type = type || EG.CellTypes.GROUND; // default to ground
        this.highlight = null;
        this.highlightTypes = {
            GOOD : this.goodHighlight,
            BAD  : this.badHighlight,
            LIGHT: this.lightHighlight
        };
        this.outputModifiers = {};
        this.isDemolishing = false;
        this.demolishTime = 500;
        
        // Cells defualt to being in england, 
        // Cells which are in Wales, NI and Scotland have this var modified. 
        this.country = EG.Countries.ENGLAND;
    };
    
    EG.MapCell.prototype.setCountry = function(c) {
        this.country = c;
    };

    EG.MapCell.prototype.canBuildType = function(types) {
        // If something is already built here, don't let them build
        if (this.contents.length >= CONTENTS_LIMIT || (this.city && this.city.isRealCity)) {
            this.addHighlight(this.highlightTypes.BAD);
            return false;
        }

        // If something isn't built here, check that this map cell type is one
        // of the types that the building can be built on.
        var ret = false;
        for(var i = 0; i < types.length; i++) {
            var type = types[i];
            ret = type == this.type;
            if (ret) {
                this.addHighlight(this.highlightTypes.GOOD);
                return ret;
            }
        }

        // If it isn't, then draw a BAD marker on the cell
        this.addHighlight(this.highlightTypes.BAD);
        return ret;
    };

    /**
     * If this cell contains contents, demolish it.
     */
    EG.MapCell.prototype.demolish = function() {
        if(this.contents && this.contents[0]) {
            // For now, demolish instantly.

            // Give the user back 30% of the cost of the item.
            var obj = this.contents[0];
            var cost = EG.infoLibrary.get(obj.name).info.buildCost;

            var currMoney = EG.player.getMoney();
            EG.player.setMoney(currMoney + cost * 0.3);

            // Ensure to kill the status object that might be on contents[1]
            this.contents = [];
        }
    };

    EG.MapCell.prototype.startDemolishing = function() {
        this.isDemolishing = true;
    };

    EG.MapCell.prototype.canBuild = function(name) {
        var types = EG.infoLibrary.get(name).info.buildOn;
        return this.canBuildType(types);
    };

    EG.MapCell.prototype.setVisible = function (v) {
        this.visible = v;
    };

    EG.MapCell.prototype.addItem = function (item) {
        if (this.contents.length < CONTENTS_LIMIT) {
            this.contents.push(item);
            this.updateContentTypes();
            return true;
        }
        return false;
    };

    EG.MapCell.prototype.goodHighlight = function(ctx){
        ctx.fillStyle = 'rgba(0,255,0,0.5)';
        ctx.roundRect(this.x, this.y,this.width, this.height, 10, true);
    };
    EG.MapCell.prototype.badHighlight = function(ctx){
        ctx.fillStyle = 'rgba(255,0,0,0.5)';
        ctx.roundRect(this.x, this.y, this.width, this.height, 10, true);
    };
    EG.MapCell.prototype.lightHighlight = function(ctx){
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.roundRect(this.x, this.y, this.width, this.height, 10, true);
    };

    EG.MapCell.prototype.addHighlight = function(hl) {
        // Save the function, not the type to avoid a lookup every draw
        this.highlight = hl;
    };
    EG.MapCell.prototype.removeHighlight = function() {
        this.highlight = null;
    };

    EG.MapCell.prototype.select = function() {
        this.addHighlight(this.highlightTypes.LIGHT);
        EG.UI.displayCellBuildingInfo(this);
    };

    EG.MapCell.prototype.fmap = function (fn) {
        var returnCell = [];

        for (var i = 0; i < this.contents.length; i++) {
            returnCell.push(fn.apply(this, [this.contents[i], i]));
        }

        return returnCell;
    };

    EG.MapCell.prototype.draw = function (ctx) {
        // Only draw if we're on the "normal" pane
        switch(EG.getOverlayType()) {
            // Normal
            case 0:
                if (this.visible) {
                    if (this.highlight) {
                        ctx.save();
                        this.highlight.call(this, ctx);
                        ctx.restore();
                    }
                    if(this.isDemolishing) {
                        ctx.save();
                        ctx.globalAlpha = this.demolishTime / 500;
                    }

                    this.fmap(function (obj, i) {
                        obj.draw(ctx);
                    });

                    if(this.isDemolishing) {
                        ctx.restore();
                    }

                    if(this.cityAnimation) {
                        this.cityAnimation.draw(ctx);
                    }
                }
                break;
            // Resource view
            case 1:
                if(this.visible){
                    // If we're on the resource overlay, render the population
                    ctx.font = "12pt Arial";
                    if (this.city) {
                        ctx.fillText(this.city.population, this.x, this.y + 30);
                    }
                    ctx.fillText("(" + this.row + "," + this.col + ")", this.x, this.y + 10);
                    // Temporarily draw a red square on the places with a nonzero
                    // population. TODO: Have hard coded the width and height of a
                    // tile, need to take into account influence radius perhaps, or
                    // give the tile a notion of width and height?
                    if(this.city) {
                        ctx.drawImage(EG.textureLibrary.get("images/TODOpopulationImage.png"), this.x, this.y);
                    }
                }
                break;
        }
        if(this.type == EG.CellTypes.NOBUILDNATIONALPARK) {
            ctx.save();
            ctx.globalAlpha = 0.4;
            ctx.drawImage(EG.textureLibrary.get("images/TODOnationalParks.png"), this.x, this.y);
            ctx.restore();

        }
    };

    EG.MapCell.prototype.update = function (dt) {
        this.fmap(function (obj, i) {
            obj.update(dt);
        });

        if(this.cityAnimation) {
            this.cityAnimation.update(dt);
        }

        if(this.isDemolishing) {
            this.demolishTime -= dt;
            if(this.demolishTime < 0) {
                this.isDemolishing = false;
                this.demolishTime = 1000;
                this.demolish();
                EG.UI.displayCellBuildingInfo(this);
            }
        }
    };

    EG.MapCell.prototype.updateContentTypes = function () {
        var names = {};

        this.fmap(function (obj, i) {
            ++names[obj.name];
        });

        var returnList = [];

        // Ensure only unique keys are returned.
        for (var key in names) {
            if (names.hasOwnProperty(key)) {
                returnList.push(parseInt(key, 10));
            }
        }

        this.contentTypes = returnList;
    };

    function reduceR(objectList, base, fn) {
        var len = objectList.length;

        if (len === 0) {
            return base;
        } else {
            return fn(objectList[0], reduceR(objectList.slice(1), base, fn));
        }
    }

    function add (a,b) {
        return {
            emissions: a.emissions + b.emissions,
            energy_produced: a.energy_produced + b.energy_produced,
            cost: a.cost + b.cost,
            demand: a.demand + b.demand
        };
    }

    // Get the output modifier of this cell for the given type of power, based
    // this is based on any location based modifiers and the weather effects.
    EG.MapCell.prototype.getOutputModifier = function (type) {
        var locationBasedModifier = this.outputModifiers[type] ? this.outputModifiers[type] : 1;
        var weatherModifier = EG.Weather.getWeatherModifier(type, this);
        return locationBasedModifier * weatherModifier;
    };

    EG.MapCell.prototype.getData = function () {
        var mapped = this.fmap(function (obj, i) {
            // Get the demand for the item that is being built here if there is
            // one
            var demand = obj.decorators.Demand ? obj.decorators.Demand.getDemand() : 0;

            // Add to the demand the demand of the average citizen * the
            // population
            if(this.city) {
                // Population is measured in thousands
                demand += this.city.population * 1000 * this.city.averageCitizen.demand;
            }

            return {
                cost: obj.decorators.RecurringCost ? obj.decorators.RecurringCost.getCost(): 0,
                energy_produced: obj.decorators.Energy ? obj.decorators.Energy.getEnergy() : 0,
                emissions: obj.decorators.Emissions ? obj.decorators.Emissions.getEmissions() : 0,
                demand: demand || 0
            };
        });

        var reduced = reduceR(mapped, {
            emissions: 0,
            energy_produced: 0,
            cost: 0,
            demand: 0
        }, add);

        return reduced;
    };
})();
