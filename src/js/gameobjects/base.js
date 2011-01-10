(function () {

    var GameObjectStates = {
        IDLE        :   0,
        BUILDING    :   1,
        DECAYING    :   2,
        DEMOLISHING :   3
    };

    EG.GameObjectNames = {
        Base             :  10,
        Weather          :  11,
        Cloud            :  12,
        WindTurbine      :  13,
        CoalPowerStation :  14,
        HydroElectric    :  15,
        Nuclear          :  16,
        NaturalGas       :  17,
        WaveFarm         :  18,
        CCGT             :  19,
        Geothermal       :  20,
        Solar            :  21,

        WarningAnimation :  29,
        DeadAnimation    :  30,
        City             :  31
    };

    EG.GameObjectTypes = {
        BUILDING:1,
        CELL:2,
        WEATHER:2,
        IGNORE:3, // so you can make objects which arent clickable,
        ABSTRACT:4 //  or abstract
    };

    //A GameObject is a tile, or anything that can be built.
    EG.GameObject = function (name) {
        return {
            // Initial object state is at idle.
            state : GameObjectStates.IDLE,

            // Every GO has a name, so it doesnt need to be a decorator
            name: name,

            /*  A map containing decorator names to their object
             *  Decorators can have update and draw functions which are guaranteed
             *  to be called every tick, if they exist.
             *
             *  Only one type of decorator may exist per GameObject.
             *
             *  Other decorators may add properties to a GameObject, e.g adding
             *  carbon emission to a building.
             */
            decorators : {},
            update :
            function() {
                for (var i in this.decorators) {
                    if (this.decorators.hasOwnProperty(i)) {
                        this.decorators[i].update.apply(this.decorators[i], arguments);
                    }
                }
            },
            draw :
            function() {
                for (var i in this.decorators) {
                    if (this.decorators.hasOwnProperty(i)) {
                        this.decorators[i].draw.apply(this.decorators[i], arguments);
                    }
                }
            },
            decorateWith :
            function(d){
                var this_ref = this;
                this.decorators[d.name] = d;
                d.remove = function(){
                    delete this_ref.decorators[d.name];
                };
                d.parent = this_ref;
            }
        };
    };
})();
