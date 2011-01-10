(function () {
    // Check EG is loaded
    if (typeof window.EG == 'undefined') {
        return;
    }

    var name = EG.GameObjectNames.DeadAnimation;
    var type = EG.GameObjectTypes.DECAYING;
    var info = {
        brokenImage: 'images/brokenbuilding.png' // when it's dead
    };

    var fn = function(x, y) {
        var obj = new this.GameObject(name);

        // Decorate
        var pos = new this.Position(x,y);
        
        // Completed building image
        var img = EG.textureLibrary.get('images/brokenbuilding.png');
        var anim = new  this.Animation(img,pos,1,1,EG.model.map.tileWidth/2,EG.model.map.tileHeight/2);

        obj.decorateWith(anim);
        obj.decorateWith(pos);
        return obj;
    }; 
    
    EG.infoLibrary.add(name, fn, type, info);
})();
