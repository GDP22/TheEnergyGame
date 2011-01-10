(function () {
    EG.Player = function () {
        this.money = 50000000000; //http://www.renewableenergyfocus.com/view/10440/uk-june-2010-budget/
        this.score = 0;
        this.lat = null;
        this.lng = null;

        this.resetLocation();
    };

    EG.Player.prototype.setMoney = function (amount) {
        this.money = amount;
    };

    EG.Player.prototype.getMoney = function () {
        return this.money;
    };

    EG.Player.prototype.setScore = function (amount) {
        this.score = amount;
    };

    EG.Player.prototype.getScore = function () {
        return this.score;
    };

    EG.Player.prototype.setLocation = function(lat, lng) {
        this.lat = lat;
        this.lng = lng;
        var gameLoc = EG.latlngToIndex(lat,lng, EG.model.map.gameMap);
        EG.model.map.centreViewOn(gameLoc.x, gameLoc.y);
    };
    EG.Player.prototype.resetLocation = function() {
        // By default, set the player's location to be Soton.
        this.setLocation(50.9371344, -1.397747);
    };
})();
