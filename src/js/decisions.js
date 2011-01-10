(function(){
    EG.ChoiceStyles = {
        GOOD: "goodChoice",
        BAD: "badChoice",
        OK: "okChoice",
        NORMAL: "normalChoice"
    };

    EG.DecisionChoice = function(shortDesc, fullDesc, fn, style) {
        this.shortDesc = shortDesc;
        this.fullDesc = fullDesc;
        this.fn = fn;
        this.style = style || EG.ChoiceStyles.NORMAL;
    };
    
    EG.DecisionChoice.prototype.getStyle = function() { return this.style;};
    EG.DecisionChoice.prototype.getShortDesc = function() { return this.shortDesc;};
    EG.DecisionChoice.prototype.getFullDesc = function() { return this.fullDesc;};
    
    EG.Decision = function(title, desc, choices) {
        this.id = new Date().getTime();
        this.title = title;
        this.desc = desc;
        this.choices = (choices && choices.length > 0) ? choices : [];
        /*
         * False if undecided, a index into this.choices if decided.
         * Dear anyone reading this, don't compare with this directly
         * , use the isDecided() method.
         */
        this.decided = false;
        
        // The div in the decision list
        this.el = null;
    };
    EG.Decision.prototype.isDecided = function() { return this.decided !== false;};
    EG.Decision.prototype.getChoices = function() { return this.choices;};
    EG.Decision.prototype.getTitle = function() { return this.title;};
    EG.Decision.prototype.getDesc = function() { return this.desc;};
    EG.Decision.prototype.decide = function (choice) {
        if (!this.isDecided()) {
            this.decided = choice;

            if (this.choices[choice].fn) {
                this.choices[choice].fn.call(EG);
            }
        }
    };
    EG.Decision.prototype.getChosenText = function() { 
        if (this.isDecided()) {
            return this.choices[this.decided].getShortDesc();
        }
    };

    var choices = [];
    choices.push( new EG.DecisionChoice('One','Oneoneoneone') );
    choices.push( new EG.DecisionChoice('Two','twtowtowo', null, EG.ChoiceStyles.BAD) );
    EG.testDec = new EG.Decision("Title", "Desc", choices);
    EG.testDec.decided = 1;

    var choices2 = [];
    choices2.push( new EG.DecisionChoice('Do something','This describes what this button does', null, EG.ChoiceStyles.GOOD) );
    choices2.push( new EG.DecisionChoice('Or this','thissn alasndlo sal jnad') );
    choices2.push( new EG.DecisionChoice('Orr?','blah blash', null, EG.ChoiceStyles.BAD) );
    EG.testDec2 = new EG.Decision("Another dec", "kasjdk jasndkl ", choices2);

    /*
     * WIP:
     *  The DM holds past decisions, and is responsible for carrying out
     *  the a decisions consequences. It also highlights the div on the UI
     *  when there's a new deicision awaiting
     */
    EG.DecisionManager = function() {
        this.decisions = [];
        this.controlTimeout = 0;
        this.elapsed = 0.0;
        this.decisionStep = EG.config.decisionStep;
    };
    EG.DecisionManager.prototype.update = function(dt) {
        this.elapsed += dt;

        if (this.elapsed > this.decisionStep) {
            this.doDecision();
            this.elapsed = 0.0;
        }
    };
    EG.DecisionManager.prototype.doDecision = function() {
        var d = this.pickDecision();
        if (d) {
            this.newDecision(d);
        }
    };
    EG.DecisionManager.prototype.pickDecision = function() {
        var p = Math.random();
        var sum = 0.0;
        var decision = null, decLibEntry = null;

        EG.DecisionLibrary.fmap(function(decLibEntryKey){
            decLibEntry = EG.DecisionLibrary.get(decLibEntryKey);

            if (!decLibEntry.used) {
                sum += decLibEntry.prob;
            }

            if (!decision && sum >= p) {
                decision = decLibEntry.decision;
                decLibEntry.used = true;
            }
        });

        return decision;
    };
    EG.DecisionManager.prototype.getDecisions = function () {
        return this.decisions;
    };
    EG.DecisionManager.prototype.getNewestUndecided = function(){
        for (var i = 0; i < this.decisions.length; i++) {
            if ( !this.decisions[i].isDecided() ) {
                return this.decisions[i];
            }
        }
    };
    EG.DecisionManager.prototype.newDecision = function(d) {
        this.decisions.push(d);
        this.startFlash();
    };
    EG.DecisionManager.prototype.test = function() {
        var test = [EG.testDec, EG.testDec2];
        for (var i = 0; i < test.length; i++ ) {
            this.newDecision(test[i]);
        }
    };

    EG.DecisionManager.prototype.madeDecision = function() {
        // Check whether there's any undecided decisions left
        var shouldStop = true;
        for (var i =0 ; i < this.decisions.length; i++ ) {
            if (!this.decisions[i].isDecided()) {
                shouldStop = false;
                // once we've found a reason to keep flashing, break early
                break; 
            }
        }
        if (shouldStop) {
            this.stopFlash();
        }
    };
    EG.DecisionManager.prototype.startFlash = function() {
        EG.UI.startDecisionFlash();
    };
    EG.DecisionManager.prototype.stopFlash = function() {
        EG.UI.stopDecisionFlash();
    };

    /*
     * Decision library stuff below here.
     * 
     * Do we want something that checks requirements?
     */
    function DecisionLibraryCtr() {
        this.add = function (Decision, prob) {
            this.library[Decision.title] = {
                decision : Decision,
                prob : prob, // probability
                used : false // has this decision already been used
            };
        };
    }
    DecisionLibraryCtr.prototype = new EG.library();
    EG.DecisionLibrary = new DecisionLibraryCtr();

    EG.DecisionLibrary.add(
        new EG.Decision("Should the UK ban cars?",
            "Some groups have been calling for the UK to ban cars for private citizens, what should we do?",
            [
                new EG.DecisionChoice(
                    "Yes, ban cars",
                    "The only transport options of private citizens will be public transport, or 'sustainable transport'" +
                    " , this will greatly reduce the average carbon emission of each citizen, but, recent polls and focus" +
                    " groups have indicated that this move would greatly reduce population happiness.",
                    function(){
                        this.Effects.modifyHappiness(0.5);
                        this.Effects.modifyEmissions(0.75);
                    }
                ),
                new EG.DecisionChoice(
                    "No, don't",
                    "Sticking with the status quo would keep population happiness at its current levels, but it will also" +
                    " keep carbon emissions at their current (rising!) level.",
                    function(){}
                ),
                new EG.DecisionChoice(
                    "Only in London",
                    "Only ban cars in London - it has the highest concentration of cars in the UK, this will partly reduce" +
                    "emissions, but also make London citizens quite unhappy as they're being singled out.",
                    function(){
                        var L = EG.model.map.findCellByCityName("London");
                        this.Effects.areaOfEffect(L, L.radius, function(cell, dropoff) {
                            this.Effects.modifyHappiness(0.2, cell);
                            this.Effects.modifyEmissions(0.75, cell);
                        });
                    }
                )
            ]
        ), 1.0);
})();
