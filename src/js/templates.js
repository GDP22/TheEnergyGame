(function () {
    
    // This sucks, but inserting them into the dom sucks more.
    rawTemplates = {
        "trajectory" : "<div id='${id}' class='trajDec'>" +
                "<div class='trajText'>${title}</div>" +
                "<div class='trajValues'>" +
                    "<div class='trajectoryChoice chosenTrajectory'></div>" +
                    "<div class='trajectoryChoice'></div>" +
                    "<div class='trajectoryChoice'></div>" +
                    "<div class='trajectoryChoice'></div>" +
                    "<div style='clear:both;'></div>" +
                "</div>" +
                "<div style='clear:both;'></div>" +
                "<div class='trajDecDesc'>${desc}</div>" +
            "</div>"
    };
    EG.TemplatesSetup = function() {
        this.templates = [];
        
        for (var name in rawTemplates) {
            if (rawTemplates.hasOwnProperty(name)){
                
                $.template( name, rawTemplates[name] );
                
            }
        }
    };
})();
