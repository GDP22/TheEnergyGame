/*
    General library functions for animations, sprites and images.
    
    Thanks to http://29a.ch/jswars/game2.js for inspiration.
    
    To convert a gif to a sprite sheet (on the ecs machines anyway)
    montage input.gif -tile x1 -geometry '1x1+0+0<' -background "rgba(0,0,0,0.0)" -quality 100  output.png
    You might want:
    montage input.gif -tile x1 -geometry '1x1+0+0<' -alpha On -background "rgba(0,0,0,0.0)" -quality 100  output.png
*/

(function () {
    // Check EG is loaded
    if (typeof window.EG == 'undefined') {
        return;
    }

    // Basic position decorator, separates out position from animation
    EG.Position = function(x,y) {
        EG.Decorator.call(this,'Position');
        this.x = x || 0;
        this.y = y || 0 ;
    };
    $.extend(EG.Position.prototype, EG.Decorator.prototype);

    // Animation (or Sprite) decorator
    EG.Animation = function(img_or_path, pos, nframes, duration,w,h) {
        EG.Decorator.call(this,'Animation');
        this.pos = pos;
        if (typeof img_or_path === 'string') {
            // is a path
            this.img = EG.textureLibrary.get(img_or_path);
        } else {
            // is an image object
            this.img = img_or_path;
        }

        this.nframes = nframes || 1;
        this.duration = duration;
        this.timePerFrame = duration/this.nframes;
        this.elapsed = Math.floor(Math.random() * duration);
        this.frameWidth = Math.floor(this.img.width / this.nframes);

        // NB: these are the w/h of what to draw, not of the source
        this.w = w || this.frameWidth;
        this.h = h || this.img.height;

        this.x_offset = 0; // initial x offset to draw from
        this.repeating = true;
    };
    $.extend(EG.Animation.prototype, EG.Decorator.prototype);
    EG.Animation.prototype.update = function (dt) {
        if (this.nframes == 1) {
            // set empty function
            this.update = function() {};
        } else {
            // set proper update function
            this.update = function(dt) {
                this.elapsed += dt;
                if (this.elapsed > this.timePerFrame) {
                    var numFramesToSkip = Math.floor(this.elapsed / this.timePerFrame);

                    // move onto the next frame (shift by the width)
                    this.x_offset += numFramesToSkip * this.frameWidth;

                    if(this.repeating) {
                        // constraint to the width of the entire image, so make sure it loops
                        this.x_offset = this.x_offset % this.img.width;
                    }
                    this.elapsed = 0; // and reset the elapsed time on this frame
                }
            };
        }

        // execute the now-assigned fn
        this.update(dt);
    };
    EG.Animation.prototype.setX = function (x) { this.pos.x = x; };
    EG.Animation.prototype.setY = function (y) { this.pos.y = y; };
    EG.Animation.prototype.getX = function () { return this.pos.x; };
    EG.Animation.prototype.getY = function () { return this.pos.y; };

    EG.Animation.prototype.draw = function(ctx) {
        if (this.nframes == 1) {
            // Non animated draw
            this.draw = function(ctx) {
                ctx.drawImage(this.img, this.getX(), this.getY(), this.w, this.h);
            };
        } else {
            this.draw = function(ctx) {
                // When setting an Animation as non-repeating the draw function is
                // still called until the object is removed by the GC.
                if(this.repeating || this.x_offset < this.w - this.frameWidth) {
                    ctx.drawImage(this.img, this.x_offset, 0, this.frameWidth, this.img.height, this.getX(), this.getY(), this.w, this.h);
                }
            };
        }
        this.draw(ctx);
    };

    EG.Animation.prototype.setRepeating = function(isRepeating) {
        this.repeating = isRepeating;
    };

    // Module for generic motion
    EG.Motion = {};
    EG.Motion.linear = function(anim, duration, x1, y1, x2, y2) {
        EG.Decorator.call(this,'LinearMotion');
        this.anim = anim;
        this.anim.setX(x1);
        this.anim.setY(y1);

        this.movementDuration = duration;
        this.movementProgress = 0;

        this.P1 = {x: x1, y: y1};
        this.P2 = {x: x2, y: y2};
    };
    $.extend(EG.Motion.linear.prototype, EG.Decorator.prototype);
    EG.Motion.linear.prototype.update = function(dt) {
        // Perform linear interpolation from P1 to P2.
        var percentage = this.movementProgress / this.movementDuration;
        var newX = this.P1.x + ((this.P2.x - this.P1.x) / this.movementDuration) * this.movementProgress;
        var newY = this.P1.y + ((this.P2.y - this.P1.y) / this.movementDuration) * this.movementProgress;
        this.movementProgress += dt;
        this.anim.setX(Math.floor(newX));
        this.anim.setY(Math.floor(newY));

        // When this has reached it's final destination, remove it from the parent object's list
        // of updateFns. 
        var xDir = this.P2.x > this.P1.x ? 1 : -1;
        var yDir = this.P2.y > this.P1.y ? 1 : -1;

        if(this.anim.x >= xDir * this.P2.x && this.anim.y >= yDir * this.P2.y){
            this.remove();
        }
    };

    /**
     * Define a bezier movement path for the object to follow. An object that is being given a
     * bezier path must already have an Animation object added to it.
     *
     * Note: This needs to be properly tested!
     *
     * @param o
     *      The object to add the movement to.
     * @param duration
     *      The number of milliseconds that it should take to traverse the path.
     * @param x1...
     *      The four control points of the 2D bezier spline.
     */
    EG.Motion.bezier = function(anim, duration, x1, y1, x2, y2, x3, y3, x4, y4) {
        EG.Decorator.call(this,'BezierMotion');
        this.anim = anim;
        // Define four coordinates as simple objects with both an x and a y
        // value. Cx define the control points of the bezier function.
        this.C1={}; 
        this.C2={}; 
        this.C3={}; 
        this.C4={};

        this.C1.x = x1;
        this.C1.y = y1;
        this.C2.x = x2;
        this.C2.y = y2;
        this.C3.x = x3;
        this.C3.y = y3;
        this.C4.x = x4;
        this.C4.y = y4;

        // Define the four bezier movement functions:
        // Source:
        // http://13thparallel.com/archive/bezier-curves/
        this.B1 = function(t) { return t*t*t; };
        this.B2 = function(t) { return 3*t*t*(1-t); };
        this.B3 = function(t) { return 3*t*(1-t)*(1-t); };
        this.B4 = function(t) { return (1-t)*(1-t)*(1-t); };

        this.movementDuration = duration;
        this.movementProgress = 0;
    };
    $.extend(EG.Motion.bezier.prototype, EG.Decorator.prototype);
    EG.Motion.bezier.prototype.update = function(dt) {
        var percent = this.movementProgress / this.movementDuration;
        var x = this.C1.x*this.B1(percent) + this.C2.x*this.B2(percent) + this.C3.x*this.B3(percent) + this.C4.x*this.B4(percent);
        var y = this.C1.y*this.B1(percent) + this.C2.y*this.B2(percent) + this.C3.y*this.B3(percent) + this.C4.y*this.B4(percent);
        this.anim.setX(x);
        this.anim.setY(y);
        this.movementProgress += dt;
    };

    /**
     * Follow an elliptical path with center x1, y1, horizontal axis length a
     * and vertical axis length b.
     *
     * Elliptical path calculation function taken from the Wikipedia
     * page for the Ellipse.
     * Rotate at a constant speed around an elliptical orbit.
     * TODO: Make this travel at a constant velocity, don't rotate
     * based on angle but rather on distance travelled.
     */
    EG.Motion.elliptical = function(anim, duration, x1, y1, a, b) {
        EG.Decorator.call(this,'EllipticalMotion');
        this.anim = anim;
        this.anim.setX(x1);
        this.anim.setY(y1);
        this.movementDuration = duration;
        this.movementProgress = 0;

        this.P1 = {x: x1, y: y1};
        this.ellipsevalues = {a: a, b: b};
    };
    $.extend(EG.Motion.elliptical.prototype, EG.Decorator.prototype);
    EG.Motion.elliptical.prototype.update = function(dt) {
        var percentage = this.movementProgress / this.movementDuration;
        var angle = (this.movementProgress / this.movementDuration) * 360;
        var alpha = angle * (Math.PI / 180);
        var beta = -angle * (Math.PI / 180);
        var sinalpha = Math.sin(alpha);
        var cosalpha = Math.cos(alpha);
        var sinbeta = Math.sin(beta);
        var cosbeta = Math.sin(beta);

        var newX = this.P1.x + (this.ellipsevalues.a * cosalpha * cosbeta - this.ellipsevalues.b * sinalpha * sinbeta);
        var newY = this.P1.y + (this.ellipsevalues.a * cosalpha * sinbeta + this.ellipsevalues.b * sinalpha * cosbeta);

        this.movementProgress += dt;
        this.anim.setX(Math.floor(newX));
        this.anim.setY(Math.floor(newY));

        // If the animation is finished, remove the movement function from
        // the parent object.
        if(this.movementProgress >= this.movementDuration){
            this.remove();
        }
    };
})();
