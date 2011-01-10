(function () {
    Logo = function () {
        // Status
        this.logo = {
            frontOn : $('#logoFrontOn'),
            frontOff: $("#logoFrontOff"),
            glow: $("#logoGlow"),
            back : $("#logoBack")
        };
        
        // anim queue and timing
        var this_ref = this;
        this.q = [
            {   
                fn: function(){
                        this_ref.flickerOn();
                        setTimeout(function(){
                            this_ref.flickerOff();
                        },100);
                    },
                t:  1000
            },
            {   
                fn: function(){
                        this_ref.flickerOn();
                        setTimeout(function(){
                            this_ref.flickerOff();
                        },100);
                    },
                t:  200
            },
            {   
                fn: function(){
                        this_ref.flickerOn();
                        setTimeout(function(){
                            this_ref.flickerOff();
                        },100);
                    },
                t:  500
            },
            {   
                fn: function(){
                        this_ref.flickerOn();
                    },
                t:  500
            },
            {   
                fn: function(){
                        this_ref.logo.glow.css('display', 'inline-block');
                        this_ref.logo.glow.animate({'opacity':'0.6'},3000);
                    },
                t:  500
            }
        ];
    };
    
    Logo.prototype.flickerOn = function() {
        this.logo.frontOff.css('display', 'none');
        this.logo.frontOn.css('display', 'inline-block');
    };
    Logo.prototype.flickerOff = function() {
        this.logo.frontOff.css('display', 'inline-block');
        this.logo.frontOn.css('display', 'none');
    };
    
    Logo.prototype.flickerEffect = function() {
        var pos = 0;
        var this_ref = this;
        setTimeout( function() {
            this_ref.q[pos++].fn();
            if (pos<this_ref.q.length) {
                setTimeout( arguments.callee, this_ref.q[pos-1].t );
            } else {
                this_ref.setupEnd();
            }
        }, 500 );
    };
    Logo.prototype.setupEnd = function() {
        var this_ref = this;
        var f1 = function(){
            this_ref.logo.glow.animate({'opacity':'0.2'},3000);
            setTimeout(function(){ f2(); },100);
        };
        
        var f2 = function(){
            this_ref.logo.glow.animate({'opacity':'0.6'},3000);
            setTimeout(function(){ f1(); },100);
        };
        
        f1();
    };
    
    EG.logo = new Logo();
    EG.logo.flickerEffect();
})();
