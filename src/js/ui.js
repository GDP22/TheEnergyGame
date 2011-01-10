(function () {
    UI = function () {
        this.infoEl = $('#info');

        this.buildingEl = this.infoEl.children("#building");
        this.statsEl = this.buildingEl.children("#stats");
        this.cellEl = this.infoEl.children("#cell");

        this.ribbonEl = $('#ribbonList');

        // Status
        this.gameStatus = {
            control : $('#game_status'),
            energy_supply : $("#energy_supply"),
            energy_demand : $("#energy_demand"),
            happiness : $("#happiness"),
            emissions: $("#total_emissions"),
            money : $("#money"),
            date : $("#date"),
            score : $("#score")
        };

        // Info
        this.buildInfo = {
            control : $('#info'),
            title: this.infoEl.children("#title"),
            image: this.infoEl.children("#image"),
            building: {
                desc: this.buildingEl.children("#desc"),
                cost: this.statsEl.children("#cost").children('.value'),
                recurCost : this.statsEl.children("#recurCost").children('.value'),
                emissions: this.statsEl.children("#emissions").children('.value'),
                output: this.statsEl.children("#output").children('.value'),
                lifetime:this.statsEl.children("#lifetime").children('.value')
            },
            cell : {
                pop: this.cellEl.children("#population").children('.value'),
                happiness : this.cellEl.children("#happiness").children('.value'),
                miscinfo:this.cellEl.children("#miscinfo").children('.value')
            },
            helper : {
                buildCostTag : $("#cost"),
                recurCostTag : $("#recurCost"),
                buildCost : $("#buildCost"),
                recurCost : $("#recCost")
            }
        };

        this.populateRibbon();

        // Setup the jqModal for decisions
        this.decisionsEl = $('#decisions');
        this.decisionsEl.jqm({
            onHide:
            function (hash) {
                hash.w.fadeOut('500',function(){
                    hash.o.remove();
                    EG.UI.hideDecisions();
                });
            }
        });

        ///////////////////
        // Trajectories
        ///////////////////
        this.traj = {
            control : $('#trajectoryControl'),
            window : $('#trajectories'),
            points : $('#trajStatsPoints'),
            button : $('#trajButton'),
            buyTrajPointsButton : $('#buyTrajPoints'),
            moneyButton : $('#trajMoneyButton')
        };
        this.traj.window.jqm({
            onHide: function (hash) {
                hash.w.fadeOut('500',function(){
                    hash.o.remove();
                    EG.UI.hideDecisions();
                    EG.time.paused = false;
                });
            },
            onShow : function (hash) {
                EG.time.paused = true;
                hash.w.fadeIn();
            }
        });

        // make all the trajectory elements
        this.makeTrajectoriesElements();

        // Make the control button work
        EG.Handlers.UIHandlers.setupTrajectoryControlHandler(this.traj.control);

        // after setup, add to directory obj and setup handlers
        this.traj.trajectories = $('.trajDec');
        EG.Handlers.UIHandlers.setupTrajectoriesHandlers(this.traj.trajectories);

        EG.Handlers.UIHandlers.setupTrajectoriesButton(this.traj.button);
        EG.Handlers.UIHandlers.setupTrajectoriesPointsButton(this.traj.buyTrajPointsButton);
        EG.Handlers.UIHandlers.setupTrajectoriesBuyButton(this.traj.moneyButton);

        ///////////////////
        // Decisions
        ///////////////////
        this.dec = {
            title : $('#decTitle'),
            desc : $('#decDesc'),
            choiceDescBox : $('#choicesInfo'),
            choiceDesc : $('#choicesInfo').children('#choicesText'),
            choiceEls : [$('#firstChoice'),$('#secondChoice'),$('#thirdChoice'),$('#fourthChoice')],
            msg : $('#decisionMessage'),
            control : $('#decisionControl'), // the control to show/hide the dec window
            container : $('#newDecision'), // a container for a specific decision
            prevList : $('#prevDecList'), // the list of previous decisions
            button : $('#choiceButton')
        };

        this.decStatuses = {
            NONE : "There are no decisions to be made at this time.",
            NO_NEW : "There are no new decisions at this time, you can view previous decisions by clicking on the list below.",
            NEW : "There are new decisions waiting, click on an entry below to view and decide."
        };

        EG.Handlers.UIHandlers.setupDecisionHandlers(this.dec.control);

        ///////////////////
        // Canvases
        ///////////////////
        this.canvases = {
            main : $("#canvaswrapper"),
            mini : $("#minicanvaswrapper"),
            chart : $("#chartcanvaswrapper")
        };

        ///////////////////
        // Graph Controls
        ///////////////////
        this.graph = {
            control : $('#graph_control'),
            control_hide : $("#game_over_hide_chart"),
            control_show : $("#game_over_show_chart")
        };

        EG.Handlers.UIHandlers.setupGraphButton(this.graph.control, this.graph.control_hide, this.graph.control_show);

        ///////////////////
        // Overlay buttons
        ///////////////////
        this.overlay = {
            normal : $("#normalOverlay"),
            resources : $("#resourcesOverlay")
        };
        EG.Handlers.UIHandlers.setupOverlayButtons(
            this.overlay.normal,
            this.overlay.resources
            );

        ///////////////////
        // Time buttons
        ///////////////////
        this.time = {
            control : $('#time_controls')
        };
        EG.Handlers.UIHandlers.setupTimeButton(this.time.control);

        ///////////////////
        // Help
        ///////////////////
        this.help = {
            control : $('#ingameHelpControl'),
            window : $('#help'),
            windowClose : $('#hideHelpButton')
        };
        this.help.window.jqm({
            onHide:
            function (hash) {
                hash.w.fadeOut('500',function(){
                    hash.o.remove();
                });
            }
        });
        EG.Handlers.UIHandlers.setupHelpButtons(
            this.help.control,
            this.help.windowClose
            );

        ///////////////////
        // Social
        ///////////////////
        this.social = {
            control : $("#socialControls"),
            window : $("#social")
        };
        this.social.window.jqm({
            onHide:
            function (hash) {
                hash.w.fadeOut('500',function(){
                    hash.o.remove();
                    EG.UI.hideDecisions();
                });
            }
        });
        EG.Handlers.UIHandlers.setupSocialButton(this.social.control);

        ///////////////////
        // Start game stuff
        ///////////////////
        this.startGame = {
            loadingScreen : $("#loadingScreen"),
            progressBar : $('#progressBar'),
            mainMenu : $('#mainMenu'),
            startGameButton : $('#startGameButton'),
            hints: $("#hints"),
            gameOverScreen : $('#gameOverScreen'),
            mainMenuEntries : $('.mainMenuEntry')
        };

        //////////////////
        // geolocation & weather stuff
        //////////////////
        this.geo = {
            window : $('#geoLoc'),
            locContainer : $('#geoLocLocationFind'),
            mapContainer : $('#geoLocMapContainer'),
            weatherContainer : $('#weatherContainer'),
            map : $('#googleMap'),
            geoLocButton : $('#geoLocButton'),
            locatingInfo : $('#locatingInfo'),
            weatherInfo : $('#weatherInfo'),
            weatherDescription : $('#weatherDescription'),
            skipButton : $('#geoSkip'),
            startGameButton : $('#geoStart'),
            geoLocSep : $('#geoLocSepContainer'),
            postcodeContainer : $('#geoLocTextEntry'),
            postcodeField : $('#geoLocAddress'),
            noGeo : $('#noGeoError')
        };
        EG.Handlers.UIHandlers.setupStartGameButton(this.geo.skipButton);
        EG.Handlers.UIHandlers.setupStartGameButton(this.geo.startGameButton);

        //////////////////
        // demolision button
        //////////////////
        this.demolish = {
            button : $('#demolishbutton')
        };

        EG.Handlers.UIHandlers.setupDemolishButton(this.demolish.button);
    };

    /*
     * Geo & Weather stuff
     */
    UI.prototype.showNoGeoError = function() {
        this.geo.noGeo.slideDown();
    };
    UI.prototype.showGeo = function() {
        this.geo.window.jqmShow();
    };
    UI.prototype.getGeolocMap = function() {
        return this.geo.map;
    };
    UI.prototype.setupGeolocationButton = function() {
        this.geo.geoLocSep.show();
        this.geo.geoLocButton.show();
        EG.Handlers.UIHandlers.setupGeoLocButton(this.geo.geoLocButton);
    };
    UI.prototype.showLocationPanel = function() {
        this.geo.locContainer.show();
    };
    UI.prototype.showGoogleMap = function(callback) {
        if (! this.geo.mapContainer.is(":visible") ) {
            this.geo.mapContainer.show("slide", { direction: "left" }, 1000, ( callback ) ? callback : function(){});
        }
        this.geoLocating();
    };
    UI.prototype.showPostcodeEntry = function() {
        this.geo.postcodeContainer.show();
        EG.Handlers.UIHandlers.setupGeoPostcode(this.geo.postcodeField);
    };
    UI.prototype.geoLocating = function() {
        this.geo.locatingInfo.removeClass().addClass('geoInfoBox medChoice');
        this.geo.locatingInfo.html("Finding you<br/> <img src='images/ajax-loader.gif'></img>");
    };
    UI.prototype.geoFound = function() {
        this.geo.locatingInfo.removeClass().addClass('geoInfoBox goodChoice');
        this.geo.locatingInfo.text('Found you!');
    };
    UI.prototype.geoError = function() {
        this.geo.locatingInfo.removeClass().addClass('geoInfoBox badChoice');
        this.geo.locatingInfo.html("Couldn't find you! <br/> Click above to start game.");
    };
    UI.prototype.geoTypeMore = function() {
        this.geo.locatingInfo.removeClass().addClass('geoInfoBox badChoice');
        this.geo.locatingInfo.html("Please type more of your postcode.");
    };
    UI.prototype.showWeatherContainer = function(callback) {
        if (! this.geo.weatherContainer.is(":visible") ) {
            this.geo.weatherContainer.show("slide", { direction: "left" }, 1000, callback ? callback : function(){});
        }
    };
    UI.prototype.showWeatherError = function() {
        this.geo.weatherInfo.removeClass().addClass('geoInfoBox badChoice');
        this.geo.weatherInfo.html('No weather data found!');
        this.geo.weatherDescription.slideDown();
        this.geo.weatherDescription.text("Sorry, we can't find weather data at your location, click above to start the game anyway.");
        this.geo.startGameButton.slideUp();
    };
    UI.prototype.showWeatherFound = function(weather) {
        this.geo.weatherInfo.removeClass().addClass('geoInfoBox goodChoice');
        this.geo.weatherInfo.html("The weather is: <br/>" + weather);
        this.geo.weatherDescription.text("The weather where you are influences the weather you experience in game! Click below to begin...");
        this.geo.weatherDescription.slideDown();
        this.geo.startGameButton.slideDown();
    };
    UI.prototype.showWeatherFinding = function() {
        if (! this.geo.weatherInfo.is(":visible") ) {
            this.geo.weatherInfo.slideDown();
        }

        //this.geo.startGameButton.slideUp();
        this.geo.weatherInfo.removeClass().addClass('geoInfoBox medChoice');
        this.geo.weatherInfo.html("Looking up your weather<br/><img src='images/ajax-loader.gif'></img>");
    };


    /*
     * Start game stuff
     */
    UI.prototype.setupMainmenu = function() {
        // Setup the handlers on the start game button
        EG.Handlers.UIHandlers.setupShowGeoLocation(this.startGame.startGameButton);

        // Setup the handlers on the mainMenuEntries
        EG.Handlers.UIHandlers.setupMainMenuEntries(this.startGame.mainMenuEntries);

        // Setup the handlers on the load game button
        // TODO: this

        // Now show the main menu
        var this_ref = this;
        var fadeInMenu = function(){
            // this is retarded, the div containing the map needs to not be hidden
            // or else the 'center' will be at the top left of the map. Great.
            // http://markmail.org/message/vsbszvlyukvz6unb
            // so i hid it off the right of the screen
            this_ref.geo.mapContainer.hide();
            this_ref.geo.weatherContainer.hide();

            this_ref.geo.window.addClass('jqmWindow');
            this_ref.geo.window.css({'left':'50%'});
            this_ref.geo.window.jqm({onHide:
                function (hash) {
                    hash.w.fadeOut('500',function(){
                        hash.o.remove();
                    });
                }
            });
            this_ref.startGame.mainMenu.css({
                'left':'0',
                display:'none'
            });
            this_ref.startGame.mainMenu.fadeIn(1000, 'linear');
        };
        this.startGame.progressBar.fadeOut(1000, "linear", fadeInMenu);
        this.startGame.hints.html("Did you know? " + EG.hintLibrary.getRandom());
    };

    UI.prototype.showGame = function() {
        var this_ref = this;
        this.geo.window.jqmHide();
        this.startGame.loadingScreen.fadeOut('fast', function(){
            this_ref.canvases.main.fadeIn('slow');
        });
    };

    UI.prototype.hideGame = function() {
        var this_ref = this;
        this.canvases.chart.fadeOut('fast');
        this.canvases.main.fadeOut('fast', function(){
            this_ref.startGame.gameOverScreen.fadeIn('slow');
        });
    };

    /*
     * Social
     */
    UI.prototype.showSocial = function() {
        if(EG.time.entryCount >= EG.time.endMonth) {
            $("socialTwitterButton").attr("data-text", "I scored " + Math.round(EG.player.getScore()) + " in The Energy Game! Can you do better?");
        }
        this.social.window.jqmShow();
    };

    /*
     * Time
     */
    UI.prototype.updateTimeControl = function() {
        $(this.time.control.children()[0]).toggle();
        $(this.time.control.children()[1]).toggle();
    };

    /*
     * UI Controls
     */
    UI.prototype.restoreControls = function() {
        this.canvases.chart.hide();
        this.canvases.mini.show();
        this.dec.control.show();
        this.traj.control.show();
        this.gameStatus.control.show();
        this.buildInfo.control.show();
    };

    UI.prototype.showGraph = function() {
        this.canvases.chart.show();
        this.canvases.mini.hide();
        this.traj.control.show();
        this.gameStatus.control.hide();
        this.buildInfo.control.hide();
    };

    /*
     * Help controls
     */
    UI.prototype.showHelp = function() {
        this.help.window.jqmShow();
    };

    UI.prototype.hideHelp = function() {
        this.help.window.jqmHide();
    };

    /*
     * Trajectories stuff
     */
    UI.prototype.showTrajectories = function(){
        // Tell teh TM to update
        EG.TM.updateUI();

        // Preselect the correct trajectory values
        this.selectCorrectTrajValues();

        this.traj.window.jqmShow();
    };
    
    // Used to hold which choice is the 'selected' value
    UI.prototype.trajCorrectVal = null;

    UI.prototype.correctTrajHighlight = function(this_ref) {
        if (this_ref.trajCorrectVal === 0) {
            $(this).addClass('chosenTrajectory');
        } else {
            $(this).removeClass('chosenTrajectory');
        }
        this_ref.trajCorrectVal--;
    };
    
    UI.prototype.selectCorrectTrajValues = function(){
        // Reset to the correct number of traj points
        EG.TM.reset();

        // Loop through each trajectory, find its current value
        // set it's child trajectoryValue to have the correct style
        var trajEl, traj, val, choices;
        var this_ref = this;
        
        for (var i = 0 ; i < this.traj.trajectories.length; i++) {
            trajEl = $(this.traj.trajectories[i]);
            traj = trajEl.data('trajectory');

            // Key step: reset the trajectory choice back
            // to the stored (acutual) choice, ovewriting
            // any pending, unmade choices.
            traj.reset();

            this.trajCorrectVal = traj.chosen;

            choices = trajEl.find('.trajectoryChoice');
            choices.each(this_ref.correctTrajHighlight.partial(this_ref));
        }
    };
    UI.prototype.makeTrajectoriesElements = function(){
        var trajectories = EG.TM.getTrajectories();
        // Render templates
        var elements = $.tmpl( 'trajectory', trajectories);

        // Attach a trajectory object so UI changes update the object
        for (var i=0; i < elements.length; i++) {
            $(elements[i]).data('trajectory', trajectories[i]);
        }

        // Load into the DOM
        elements.appendTo( "#trajDecList" );
    };
    UI.prototype.updateTrajPoints = function(v) {
        this.traj.points.text(v);
    };
    UI.prototype.trajectoryError = function(){
        alert('You chose too many!');
    };

    UI.prototype.toggleTrajectoryBuyOptions = function () {
        var elem = $('#trajBuy');

        if (elem.is(':visible')) {
            elem.slideUp('fast');
        } else {
            this.populateTrajectoryBuyOptions();
            elem.slideDown('fast');
        }
    };

    UI.prototype.populateTrajectoryBuyOptions = function () {
        var thisVal = this;
        var moneyPerTrajPoint = EG.config.moneyPerTrajPoint;
        $('#trajPointCost').html(moneyPerTrajPoint);
        $('#trajPointCost').formatCurrency({roundToDecimalPlace : 0});
        var currentMoney = EG.player.getMoney();
        this.populateTrajectoryBuyMoney(currentMoney);
        var spinnerOpts = {start: 0, min: 0, max: Math.floor(currentMoney / moneyPerTrajPoint), change: function() {thisVal.populateTrajectoryBuyMoney(currentMoney - (moneyPerTrajPoint * $(this).val()));}};
        $('#trajMoneyBox').val(0);
        $('#trajMoneyBox').spinner(spinnerOpts);
    };

    UI.prototype.populateTrajectoryBuyMoney = function (currentMoney) {
        $('#trajMoneyStatus').html(currentMoney);
        $('#trajMoneyStatus').formatCurrency({roundToDecimalPlace : 0});
    };

    UI.prototype.trajectoryBuyAction = function () {
        var count = parseInt($('#trajMoneyBox').val(),10);
        EG.TM.setActualTrajPoints(count + EG.TM.getTrajPoints());
        EG.player.setMoney(EG.player.getMoney() - EG.config.moneyPerTrajPoint * count);
        this.toggleTrajectoryBuyOptions();
    };

    /*
     * Ribbon stuff
     */
    UI.prototype.populateRibbon = function () {
        var this_ref = this;
        EG.infoLibrary.fmap(function (name) {
            // Filter out anything but buildings
            var obj = EG.infoLibrary.get(name);
            if (obj.type == EG.GameObjectTypes.BUILDING) {
                this_ref.addToRibbon(name, obj); // passing name to save lookup
            }
        });

        // Finally, set up handlers on the ul itself
        EG.Handlers.UIHandlers.setupBuildParent(this.ribbonEl);
    };

    UI.prototype.addToRibbon = function (name, obj) {
        var info = obj.info;

        // Make li and append to UL
        var li = $('<li><img class="building" src="' + info.ribbonImage + '"></img></li>');
        var ul = this.ribbonEl.append(li);
        var img = li.children('img');

        function highlightMe() {
            li.addClass('highlightedBuilding');
        }

        function unhighlightAll() {
            ul.children('li').each(function () {
                $(this).removeClass('highlightedBuilding');
            });
        }

        EG.Handlers.UIHandlers.setupBuild(name, img, highlightMe, unhighlightAll);
    };

    /**
     * Given a building name, display all the info about it in the building
     * info pane.
     * @param {String} building
     */
    UI.prototype.displayBuildingInfo = function (building) {
        var data = this.getInfo(building);

        if (!data) {
            return;
        }

        var info = data.info;

        // Hide the cell and show the building div
        this.cellEl.hide();
        this.buildingEl.show();
        this.demolish.button.show();
        this._setTitle(info.fullName);
        var im = EG.textureLibrary.get(info.infoImage);
        this._setImage(im);
        this._setDesc(info.description);

        if (EG.config.supplyScale){
            var emissions = info.emissions ? info.emissions : 0;
            this._setEmissionInfo(emissions.toFixed(2));
            var scaledOutput = info.output * EG.config.supplyScale;
            this.buildInfo.helper.buildCostTag.show();
            this._setCostInfo(info.buildCost);
            this.buildInfo.helper.recurCostTag.show();
            var recurrCost = info.recurrCost ? info.recurrCost : 0;
            var scaledCost = recurrCost * EG.config.supplyScale;
            this._setRecurCostInfo(scaledCost);
            this._setOutputInfo(scaledOutput.toFixed(2));
            var scaledLifetime = info.lifetime;
            this._setLifetimeInfo(scaledLifetime);
        }else{
            this.buildInfo.helper.buildCostTag.show();
            this.buildInfo.helper.recurCostTag.show();
            this._setCostInfo("Calculating...");
            this._setRecurCostInfo("Calculating...");
            this._setOutputInfo("Calculating...");
            this._setEmissionInfo("Calculating...");
            this._setLifetimeInfo("Calculating...");
        }

    };

    UI.prototype.displayCellBuildingInfo = function(cell) {
        // If a cell contains a building, show the building information. If it
        // shows an area then show info about that.
        this.buildingEl.hide();
        this.cellEl.hide();
        var info = this.getInfo(cell.type).info;

        // If the building is still being built when you hover over it, it is
        // added to the cell but doesn't have emissions, so don't display it.
        if(cell.contents.length > 0){
            var isBuilding = cell.contents[0].decorators.Animation.img.src.match(/images\/building.png$/);
            if(!isBuilding) {
                // It's got a building
                // Hide the cell and show the building div
                this.buildingEl.show();
                this.demolish.button.show();
                var building = cell.contents[0];

                var emissions = 0;
                if(building.decorators.Emissions){
                    emissions = building.decorators.Emissions.getEmissions();
                }

                this._setEmissionInfo(emissions.toFixed(2));

                if(building.decorators.Lifetime) {
                    var lifetime = building.decorators.Lifetime.buildTime;
                    this._setLifetimeInfo(lifetime);
                    var cost = building.decorators.Cost ?  building.decorators.Cost.getCost() : 0;
                    if (cost === 0){
                        this.buildInfo.helper.buildCostTag.hide();
                    }else{
                        this.buildInfo.helper.buildCostTag.show();
                    }
                    this._setCostInfo(cost);
                    var recurCost = building.decorators.RecurringCost ? building.decorators.RecurringCost.getCost() : 0;
                    if (recurCost === 0){
                        this.buildInfo.helper.recurCostTag.hide();
                    }else{
                        this.buildInfo.helper.recurCostTag.show();
                    }
                    var energy = building.decorators.Energy ? building.decorators.Energy.getEnergy() : 0;
                    if(EG.config.supplyScale) {
                        energy *= EG.config.supplyScale;
                        this._setOutputInfo(energy.toFixed(2));
                        var scaledCost = recurCost * EG.config.supplyScale;
                        this._setRecurCostInfo(scaledCost);
                    } else {
                        this._setOutputInfo("Calculating...");
                        this._setRecurCostInfo("Calculating...");
                    }

                }
                else {
                    this.buildInfo.helper.buildCostTag.hide();
                    this.buildInfo.helper.recurCostTag.hide();
                    this._setLifetimeInfo("N/A");
                    this._setEmissionInfo("N/A");
                    this._setOutputInfo("N/A");
                }
                info = EG.infoLibrary.get(building.name).info;
                this._setImage(EG.textureLibrary.get(info.infoImage));
                this._setDesc(info.description);
                this._setTitle(info.fullName);
            }
        } else {
            // It's uninhabited
            if(cell.city) {
                this._setHappiness(cell.city.averageCitizen.happiness.toFixed(2));
                this._setImage(EG.textureLibrary.get('images/city.png'));
                this._setTitle(cell.city.name);
                this.cellEl.show();
                this._setPopulation(cell.population);
                // We only have a happiness value in populated areas.
            } else {
                this._setImage(EG.textureLibrary.get(info.image));
                info = EG.infoLibrary.get(cell.type).info;
                this._setTitle(info.fullName);
            }
        }

        this._setMiscInfo(); // TODO: need to make mapcell construct a string
    };

    UI.prototype.getInfo = function (name) {
        return EG.infoLibrary.get(name);
    };

    /*
     * Decision stuff
     */
    UI.prototype.showDecisions = function() {
        this.populatePrevDecisions();
        EG.togglePaused();
        this.decisionsEl.jqmShow();
    };
    UI.prototype.populatePrevDecisions = function() {
        // Get a list of all decisions (to populate the prev decisions)
        var allDecs = EG.DM.getDecisions();
        if (allDecs.length > 0) {
            // clear
            this.dec.prevList.empty();

            // populate lower window with the decisions
            var anyUndecided = false;
            for (var i = 0; i < allDecs.length; i++) {
                var entry = this.generatePrevDecisionEntry(allDecs[i]);
                entry.appendTo(this.dec.prevList);
                if ( !allDecs[i].isDecided() ){
                    anyUndecided = true;
                }
            }

            if (!anyUndecided) {
                this._setDecMsg(this.decStatuses.NO_NEW);
            } else {
                this._setDecMsg(this.decStatuses.NEW);
            }
        } else {
            // No decisions available
            this._setDecMsg(this.decStatuses.NONE);
        }
        this.dec.msg.show();
    };
    UI.prototype.generatePrevDecisionEntry = function (dec) {
        var entry = $('<div></div>');
        entry.text(dec.title);

        // Style appropriately
        this.styleDecisionEl(entry,dec);

        // setup the click handler to dislplay this decision
        var this_ref = this;
        entry.click(function(){
            this_ref.showSpecificDecision(dec);
        });

        // Reference inside the decision so we can get it later
        dec.el = entry;

        return entry;
    };
    UI.prototype.styleDecisionEl = function(el, dec) {
        // remove children & clear classes
        el.children('div').remove();
        el.removeClass();

        el.addClass('prevDec');
        var undec;
        if (!dec.isDecided()) {
            el.addClass('undecidedDec');
            undec = $('<div style="font-size:10px; float:right;">UNDECIDED</div>');
            el.append(undec);
        } else {
            undec = $('<div style="font-size:10px; float:right;">DECIDED</div>');
            el.append(undec);
        }
    };
    UI.prototype.setupDecisionButton = function(decision) {
        if (decision.isDecided()) {
            this.dec.button.text("You chose: " + decision.getChosenText());
            this.dec.button.attr('disabled', 'disabled');
        } else {
            this.dec.button.text("Do this");
            this.dec.button.attr('disabled', '');
        }
    };
    UI.prototype.decideDecision = function(decision, choice) {
        decision.decide(choice);
        this.setupDecisionButton(decision);
        this.styleDecisionEl(decision.el, decision);
        EG.DM.madeDecision();
    };
    UI.prototype.showSpecificDecision = function(decision) {
        var this_ref = this;
        this.dec.container.slideUp('fast', function() {
            if (!decision) {
                this.populatePrevDecisions();
                return;
            }

            this_ref.dec.msg.slideUp('fast');
            var choices = decision.getChoices();

            this_ref._setDecisionTitle(decision.getTitle());
            this_ref._setDecisionDesc(decision.getDesc());

            this_ref.setupDecisionButton(decision);

            for (var i = 0; i < choices.length; i++) {
                // Show this choice el
                this_ref.dec.choiceEls[i].show();

                // populate
                var c = choices[i];
                // Title
                this_ref._setChoiceTitle(i, c.getShortDesc());

                // Setup mouseover for the description text and button
                this_ref._setChoiceMouseOver(i, c.getFullDesc());

                // Style the button correctly.
                this_ref._styleChoice.apply(this_ref, [i, c.style]);
            }

            // Setup the click handler
            this_ref.dec.button.click(function(){
                this_ref.decideDecision(decision, this_ref.dec.button.data('choiceIndex'));
            });

            // Hide the rest of the choices
            for (i; i < 4; i++) {
                this_ref.dec.choiceEls[i].hide();
            }

            // Trigger the first choice, otherwise it'll have no style (lol).
            this_ref.dec.choiceEls[0].mouseover();

            // Show the container again
            this_ref.dec.container.slideDown('fast');
        });
    };
    UI.prototype.hideDecisions = function(){
        this.dec.container.hide();
        EG.togglePaused();
    };
    UI.prototype.decisionControlTimeout = null;
    UI.prototype.startDecisionFlash = function() {
        // only start flashing if we aren't currently.
        if (!this.decisionControlTimeout) {
            var this_ref = this;
            var flash = function(){
                this_ref.dec.control.glow('red', 1000);
                this_ref.decisionControlTimeout = setTimeout(flash, 1000);
            };
            flash();
        }
    };
    UI.prototype.stopDecisionFlash = function() {
        clearTimeout(this.decisionControlTimeout);
        this.decisionControlTimeout = null;
    };

    UI.prototype.setEnergySupply = function(val) {
        this.gameStatus.energy_supply.html("Supply: " + val + "TWh");
    };

    UI.prototype.setEnergyDemand = function(val) {
        this.gameStatus.energy_demand.html("Demand: " + val + "TWh");
    };

    UI.prototype.setEmissions = function(val) {
        this.gameStatus.emissions.html("Emissions " + val + "MtCO2");
    };

    UI.prototype.setHappiness = function(val) {
        var value, img, text;
        if (val <= 0.5){
            img = "vunhappy";
            text = "Very Unhappy!";
        }else if (val > 0.5 && val <= 1.5){
            img = "unhappy";
            text = "Unhappy!";
        }else if (val > 1.5 && val <= 2.5){
            img = "med";
            text = "Content!";
        }else if (val > 2.5 && val <= 3.5){
            img = "happy";
            text = "Quite Happy!";
        }else if (val > 3.5){
            img = "vhappy";
            text = "Very Happy!";
        }

        value = '<img src="images/' + img + '_24.png"/><span class="bad">' + text + '</span>';


        this.gameStatus.happiness.html(value);
    };

    UI.prototype.setMoney = function (val) {
        this.gameStatus.money.html(val);
        this.gameStatus.money.formatCurrency({roundToDecimalPlace : 0});
    };

    UI.prototype.setDate = function (val) {
        this.gameStatus.date.html(val);
    };

    UI.prototype.setScore = function (val) {
        this.gameStatus.score.html(val);
    };

    /*
     * BORING INTERNAL FUNCTIONS BELOW HERE
     *
     * Functions for modifying the build info box
     */
    UI.prototype._setTitle = function (val) {
        this.buildInfo.title.html(val);
    };

    UI.prototype._setImage = function (val) {
        this.buildInfo.image.html(val);
    };

    UI.prototype._setDesc = function (val) {
        this.buildInfo.building.desc.html(val);
    };

    // TODO: make these scale to �'s/stars
    UI.prototype._setCostInfo = function (val) {
        if (isNaN(val)){
            this.buildInfo.building.cost.html(val);
        }else{
            this.buildInfo.building.cost.html(val);
            this.buildInfo.helper.buildCost.formatCurrency();
        }
    };

    UI.prototype._setRecurCostInfo = function (val) {
        if (isNaN(val)){
            this.buildInfo.building.recurCost.html(val);
        }else{
            this.buildInfo.building.recurCost.html(val);
            this.buildInfo.helper.recurCost.formatCurrency();
        }
    };

    UI.prototype._setEmissionInfo = function (val) {
        this.buildInfo.building.emissions.html(val + " MtCO2e / month");
    };

    UI.prototype._setOutputInfo = function (val) {
        this.buildInfo.building.output.html(val + " TWh / month");
    };

    UI.prototype._setLifetimeInfo = function (val){
        var response = val;
        if(val < 12) {
            response = Math.round(val) + " months";
        }else if(val == "N/A"){
            response = "N/A";
        }else if (isNaN(val)){
            response = "Calculating...";
        } else {
            val /= 12;
            response = Math.round(val) + " years";
        }
        this.buildInfo.building.lifetime.html(response);
    };

    UI.prototype._setPopulation = function(val) {
        this.buildInfo.cell.pop.html(val * 1000);
    };
    UI.prototype._setHappiness = function(val) {
        this.buildInfo.cell.happiness.html(val);
    };
    UI.prototype._setMiscInfo = function(val) {
        this.buildInfo.cell.miscinfo.html(val);
    };

    // Decision stuff
    UI.prototype._setDecisionTitle = function(val){
        this.dec.title.html(val);
    };
    UI.prototype._setDecisionDesc = function(val){
        this.dec.desc.html(val);
    };

    UI.prototype._setChoiceTitle = function(index, val) {
        this.dec.choiceEls[index].html(val);
    };
    UI.prototype._setChoiceMouseOver = function(index, val) {
        var el = this.dec.choiceEls[index];
        var this_ref = this;
        el.mouseover(function() {
            // remove others borders
            for (var i = 0; i < this_ref.dec.choiceEls.length; i++) {
                this_ref.dec.choiceEls[i].css('border-width', 1);
            }
            el.css('border-width', 2);
            this_ref._setChoiceDesc(val);
            this_ref._highlightChoiceDescLike( $(this) );

            // Modify the button's data too
            this_ref.dec.button.data('choiceIndex',index);
        });
    };
    UI.prototype._highlightChoiceDescLike = function(el) {
        // highlight the choices desc box like the choice box itself

        // First, remove all classes
        this.dec.choiceDescBox.removeClass();

        // Add all the classes present in el
        this.dec.choiceDescBox.attr('class', el.attr('class'));
    };
    UI.prototype._setChoiceDesc = function(val) {
        this.dec.choiceDesc.html(val);
    };
    UI.prototype._styleChoice = function(index, style) {
        this.dec.choiceEls[index].removeClass()
        .addClass("choice")
        .addClass(style);
    };
    UI.prototype._setDecMsg = function(text) {
        this.dec.msg.html(text);
    };
    EG.UISetup = UI;

})();
