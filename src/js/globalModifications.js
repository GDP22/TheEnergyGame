// from http://ejohn.org/blog/partial-functions-in-javascript/
// modified by us
Function.prototype.partial = function(){
    var fn = this, origArgs = Array.prototype.slice.call(arguments);
    return function(){
        var arg = 0;
        var args = origArgs.slice();
        for ( var i = 0; i < args.length && arg < arguments.length; i++ ) {
            if ( args[i] === undefined ) {
                args[i] = arguments[arg++];
            }
        }
        return fn.apply(this, args);
    };
};

Function.prototype.curry = function() {
    var fn = this, args = Array.prototype.slice.call(arguments);
    return function() {
        return fn.apply(this, args.concat(
          Array.prototype.slice.call(arguments)
        ));
    };
};

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

/** Thanks to: http://js-bits.blogspot.com/2010/07/canvas-rounded-corner-rectangles.html
 * Draws a rounded rectangle using the current state of the canvas. 
 * If you omit the last three params, it will draw a rectangle 
 * outline with a 5 pixel border radius 
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate 
 * @param {Number} width The width of the rectangle 
 * @param {Number} height The height of the rectangle
 * @param {Number} radius The corner radius. Defaults to 5;
 * @param {Boolean} fill Whether to fill the rectangle. Defaults to false.
 * @param {Boolean} stroke Whether to stroke the rectangle. Defaults to true.
 */
CanvasRenderingContext2D.prototype.roundRect = function(x, y, width, height, radius, fill, stroke) {

    if (typeof radius === "undefined") {
        radius = 5;  
    }
    this.beginPath();
    this.moveTo(x + radius, y);
    this.lineTo(x + width - radius, y);
    this.quadraticCurveTo(x + width, y, x + width, y + radius);
    this.lineTo(x + width, y + height - radius);
    this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    this.lineTo(x + radius, y + height);
    this.quadraticCurveTo(x, y + height, x, y + height - radius);
    this.lineTo(x, y + radius);
    this.quadraticCurveTo(x, y, x + radius, y);
    this.closePath();
    if (stroke) {
        this.stroke();
    }
    if (fill) {
        this.fill();
    }       
};
