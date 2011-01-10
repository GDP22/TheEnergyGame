(function () {
    /*
     * Abstract constructor for a Decorator, guarantees that a decorator has
     * a name, draw and update function.
     */
    EG.Decorator = function (name) {
        this.name = name;
    };
    EG.Decorator.prototype.update = function () {};
    EG.Decorator.prototype.draw = function () {};
    EG.Decorator.prototype.remove = function () {};
    EG.Decorator.prototype.parent = null;
})();