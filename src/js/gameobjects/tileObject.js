(function () {
    // Check EG is loaded
    if (typeof window.EG == 'undefined') {
        return;
    }
    
    /*  ******************************
        Base Tile
    */
    var baseTileName = "Base Tile";
    var baseTileCreator = function() {
        var tile = new GameObject();
        
        // Decorate
        tile.decorateWith(spriteAnimation);
        
        return tile;
    };
    var baseTileInfoImagePath = "";
    var baseTileNameStats = {};
    
    EG.infoLibrary.add(baseTileName, baseTileCreator, baseTileInfoImagePath,baseTileNameStats);
    
    /*  ******************************
        Ground, Coast and Sea Tiles
    */
    var names = ['Ground Tile', 'Coast Tile', 'Sea Tile'];
    var fns =   [   function(){
                        var groundTile = EG.infoLibrary.get('Base Tile').fn();
                        groundTile.decorateWith(canHaveLandStructures);
                        return groundTile;
                    }, 
                    function(){
                        var coastTile = EG.infoLibrary.get('Base Tile').fn();
                        coastTile.decorateWith(canHaveCoastStructures);
                        return coastTile;
                    }, 
                    function(){
                        var seaTile = EG.infoLibrary.get('Base Tile').fn();
                        seaTile.decorateWith(canHaveWaterStructures);
                        return seaTile;
                    }];
    
    for (var i = 0; i < 3; i++) {
        EG.infoLibrary.add(names[i], fns[i], '', {});
    }
})();
