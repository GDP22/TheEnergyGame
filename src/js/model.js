(function () {
    /**
     * model.js represents all of the runtime data in the game and is a simple
     * collection that makes it easy to serialise and deserialise (save and
     * load) the game.
     *
     * This does not store static data (generally the different libraries such
     * as texture and animation library)
     */
    var self = {
        map:    {},
        old_t:  0
        
    };

    EG.model = self;

})();
