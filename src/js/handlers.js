(function () {
    // Check EG is loaded
    if (typeof window.EG == 'undefined') {
        return;
    }

    var currentlySelectedCell = false;

    var init = function(mainCanv, miniCanv, map){
        this.mainCanvasHandlers.doBind($('#canvas'), map);
        this.miniCanvasHandlers.doBind($('#minimapcanvas'), map);

        // Ensure bubbled mouse events fire the mouseup on canvas
        // to stop dragging
        $('body').mouseup(function(){
            $('#canvas').mouseup();
        });
    };

    var UIHandlers = {
        /**
         * This called by the UI upon population of the ribbon, for each li.
         * hi = fn to highlight the img when clicked
         * unHiAll = fn to clear all highlights
         */
        setupBuild : function(name, el, hi, unHiAll) {
            el.name = name;

            // Building
            el.click(function() {
                EG.setOverlayType(0);
                unHiAll();
                if (EG.model.map.isBuilding(name)) {
                    // if we clicked on the same one
                    EG.model.map.stopBuilding();
                } else {
                    // if we clicked on a new one
                    hi();
                    EG.model.map.startBuilding(name, unHiAll);
                }
            });

            // Show info
            el.mouseover(function() {
                EG.UI.displayBuildingInfo(name);
            });
        },
        setupBuildParent : function(el) {
            // If we're in a building mode, make sure to show the building
            // after mouseing out
            el.mouseleave(function(){
                if ( EG.model.map.isBuilding() ) {
                    EG.UI.displayBuildingInfo(EG.model.map.getBuildingSelected().name);
                }
            });
        },
        setupDecisionHandlers : function(el) {
            el.click(function(){
                EG.UI.showDecisions();
            });
        },
        setupTrajectoryControlHandler : function(el) {
            el.click(function(){
                EG.UI.showTrajectories();
            });
        },
        showHideDescription : function(element) {
            var desc = element.children('.trajDecDesc');
            if ( desc.is(":visible") ) {
                desc.slideUp('fast');
            } else {
                desc.slideDown('fast');
            }
        },
        clearTrajValues : function(valsList)  {
            valsList.each(function(){
                var self = $(this);
                if (self.hasClass('chosenTrajectory')) {
                    EG.TM.increasePoints(this.cost);
                }
                self.removeClass('chosenTrajectory');
            });
        },
        choiceHandler : function(clearTrajValuesWithChoices, el, choices, this_ref) {
            var thisVal = $(this);
            var this_choice = this;

            // Setup cost
            this_choice.cost = this_ref.trajChoiceValueCost;
            this_ref.trajChoiceValueCost++;

            // Clear ticks, restore points, tick this one, update trajectory with choice
            var clearAndTick = function(clickedValue, clearTrajValuesFn, trajectory, choiceIndex){
                // If the thing clicked was any other choice but this
                if ( !clickedValue.hasClass('chosenTrajectory') ) {
                    // There is always one choice, so this is safe.
                    var existingVal = thisVal.siblings('.chosenTrajectory')[0].cost;
    
                    // Only allow this choice if there are enough points.
                    if (EG.TM.getTrajPoints() + existingVal - this_choice.cost >= 0) {
                        clearTrajValuesFn();
    
                        clickedValue.addClass('chosenTrajectory');
                        EG.TM.decreasePoints(this_choice.cost);
    
                        // Update the Trajectory object with which one was picked as a potential choice
                        trajectory.updateChoice(choiceIndex);
                    }
                }
            }.partial(thisVal, clearTrajValuesWithChoices, el.data('trajectory'), $.inArray(this_choice, choices) );

            thisVal.click(clearAndTick);
        },
        choiceHover : function(el, choices) {
            var this_choice = this;
            $(this).qtip({
                prerender: true,
                style : {
                    name : 'dark',
                    tip: 'topLeft'
                },
                content: EG.TM.getChoiceTextFor(el.data('trajectory'), $.inArray(this_choice, choices)),
                show: {
                    delay : 0,
                    when : {event : 'mouseover'},
                    effect: { length: 0 }
                },
                hide: {
                    delay : 0,
                    when : {event : 'mouseout'},
                    effect: { length: 0 }
                }
            });
        },
        trajChoiceValueCost : null, // the cost of the current traj value choice
        setupTrajectoriesHandlers : function(list) {
            var el;
            for (var i=0; i< list.length; i++) {
                el = $(list[i]);

                /*
                 * Expand/Contract Setup
                 */
                var text = el.children('.trajText');
                // Partial'd to ensure the value of el is stored.
                var showHideDesc = this.showHideDescription.partial(el);
                text.click(showHideDesc);

                /*
                 * Value clicking setup
                 */
                var choices = el.find('.trajectoryChoice');
                var clearTrajValuesWithChoices = this.clearTrajValues.partial(choices);

                this.trajChoiceValueCost = 0;
                choices.each(this.choiceHandler.partial(clearTrajValuesWithChoices, el, choices, this));

                /*
                 * last but not least: set up the hover tips
                 */
                choices.each(this.choiceHover.partial(el, choices));
            }
        },
        setupTrajectoriesButton : function (el) {
            el.click(function(){
                if ( EG.TM.acceptTrajectoryChoices() ) {
                    EG.TM.doTrajectoryEffects();
                    EG.UI.traj.window.jqmHide();
                } else {
                    EG.UI.trajectoryError();
                }
            });
        },
        setupTrajectoriesPointsButton : function(el) {
            el.click(function(){
                EG.UI.toggleTrajectoryBuyOptions();
            });
        },
        setupTrajectoriesBuyButton : function (el) {
            el.click(function () {
                EG.UI.trajectoryBuyAction();
            });
        },
        setupOverlayButtons : function(normal, resources) {
            normal.click(function(){
                EG.setOverlayType(0);
                EG.UI.restoreControls();
            });
            resources.click(function(){
                EG.setOverlayType(1);
                EG.UI.restoreControls();
            });
        },
        setupGraphButton : function(button, hidechartbutton, showchartbutton) {
            button.click(function(){
                if (EG.UI.canvases.chart.is(":visible")) {
                    EG.UI.restoreControls();
                } else {
                    EG.time.graph.drawPredictions();
                    EG.UI.showGraph();
                }
                $(this).children().toggle();
            });

            hidechartbutton.click(function(){
                EG.UI.graph.control_hide.fadeOut();
                EG.UI.canvases.chart.fadeOut('fast');
            });

            showchartbutton.click(function(){
                EG.UI.graph.control_hide.fadeIn();
                EG.UI.canvases.chart.fadeIn();
            });

        },
        setupTimeButton : function(button) {
            button.click(function(){
                EG.togglePaused();
            });
        },
        setupHelpButtons : function(UIButton, windowCloseButton) {
            UIButton.click(function(){
                EG.UI.showHelp();
            });
            windowCloseButton.click(function(){
                EG.UI.hideHelp();
            });
        },
        setupStartGameButton : function (button) {
            button.removeAttr("disabled");
            button.click(function(){
                EG.newGame(function() {
                    EG.UI.showGame();
                    if(!window.loggedIn){
                        $("#notLoggedInDialog").dialog({title: "You're not logged in!"});
                        $("#notLoggedInDialog").html("It looks like you're not " +
                        "logged in. If you want be able to save the game or your " +
                        "high score, please log in by clicking the Log In button in " +
                        "the top right.").dialog("open");
                    }
                });
            });
        },
        setupShowGeoLocation : function(button) {
            button.click(function(){
                EG.UI.showGeo();
            });
        },
        setupMainMenuEntries : function (els) {
            els.each(function(){
                var button = $(this);
                var glow = button.siblings('.mainMenuGlow');

                button.mouseover(function(){
                    glow.fadeIn('slow');
                });
                button.mouseleave(function(){
                    glow.fadeOut('slow');
                });
            });
        },
        setupSocialButton : function(button){
            button.click(function() {
                EG.UI.showSocial();
                EG.togglePaused();
            });
        },
        setupGeoLocButton : function(button) {
            button.click(function(){
                EG.Geo.geoButtonPress();
            });
        },
        setupGeoPostcode : function(field) {
            field.keyup(function() {
                EG.Geo.addressFieldChange( field.val() );
            });
        },
        setupDemolishButton : function(button) {
            button.click(function() {
                if(currentlySelectedCell) {
                    currentlySelectedCell.startDemolishing();
                }
            });
        }
    };

    var mainCanvasHandlers = {
        doBind : function (domElem, this_ref) {
            var handlerObj = this;
            domElem.bind("mouseup", function(e) { return handlerObj.onMouseUp.apply(this_ref, [e]); });
            domElem.bind("mousedown", function(e) { return handlerObj.onMouseDown.apply(this_ref, [e]); });
            domElem.bind("mousemove", function(e) { return handlerObj.onMouseMove.apply(this_ref, [e]); });
            domElem.bind("mouseleave", function(e) { return handlerObj.onMouseLeave.apply(this_ref, [e]); });
            domElem.bind("click", function(e) { return handlerObj.onMouseClick.apply(this_ref, [e]); });
        },
        onMouseDown : function(e) {
            this.mouseStartX = e.offsetX;
            this.mouseStartY = e.offsetY;
            this.isMoving = false;
        },
        onMouseUp : function(e) {
            this.mouseStartX = -1;
            this.mouseStartY = -1;
            return false;
        },
        onMouseClick : function(e) {
            var xLoc = e.layerX;
            var yLoc = e.layerY;

            var p = this.decodeWorldXY(xLoc, yLoc);

            // if we're not dragging:
            if (!this.isMoving) {
                // If we're in building mode
                if (this.game_state.building) {
                    EG.model.map.build();
                } else {
                    // Select an object in the map
                    EG.model.map.selectObjectAt(p.x,p.y);

                    // Set the currently selected object so we can display the
                    // demolish button if necessary
                    currentlySelectedCell = EG.model.map.findCellByXY(p.x,p.y);
                }
            }

            this.isMoving = false;
        },

        onMouseMove : function(e) {
            var xLoc = e.layerX;
            var yLoc = e.layerY;

            // If we're in building mode
            if (this.game_state.building) {
                // Find in-game coords
                var p = this.decodeWorldXY(xLoc, yLoc);
                this.updateBuildingPos(p.x, p.y);
            }
            // Panning through mouse drag
            if (this.mouseStartX > -1 && this.mouseStartY > -1) {
                var xDiff = e.offsetX - this.mouseStartX;
                var yDiff = e.offsetY - this.mouseStartY;

                this.setTranslation(
                    this.mapScrollXOffset + xDiff,
                    this.mapScrollYOffset + yDiff
                );

                this.mouseStartX = e.offsetX;
                this.mouseStartY = e.offsetY;

                this.isMoving = true;
            }

            return false;
        },

        onMouseLeave : function(e) {
            // Stop panning when the mouse leaves the canvas.
            this.xPan = 0;
            this.yPan = 0;
        }
    };


    var miniCanvasHandlers = {
        doBind : function (domElem, this_ref) {
            var handlerObj = this;
            domElem.bind("mousemove", function(e) { return handlerObj.onMouseMove.apply(this_ref, [e]); });
            domElem.bind("mouseup", function(e) { return handlerObj.onMouseUp.apply(this_ref, [e]); });
            domElem.bind("mousedown", function(e) { return handlerObj.onMouseDown.apply(this_ref, [e]); });
            domElem.bind("mouseleave", function(e) { return handlerObj.onMouseLeave.apply(this_ref, [e]); });
        },

        onMouseMove: function (e) {
            var xLoc = e.layerX;
            var yLoc = e.layerY;

            if (this.isMiniMapPanning) {
                miniMapPositionChange.apply(this, [xLoc, yLoc]);
            }

            return false;
        },

        onMouseUp: function (e) {
            this.isMiniMapPanning = false;
        },

        onMouseLeave: function (e) {
            this.isMiniMapPanning = false;
        },

        onMouseDown: function (e) {
            var xLoc = e.layerX;
            var yLoc = e.layerY;

            this.isMiniMapPanning = true;
            miniMapPositionChange.apply(this, [xLoc, yLoc]);

            return false;
        }
    };

    function miniMapPositionChange(xLoc, yLoc) {
        // When the minimap is clicked, translate to a real world
        // position and change the translation offset => move the map to the
        // place they clicked. Make the mouse pointer be the center of the
        // view, when translated.

        var miniMapImg = EG.textureLibrary.get('images/minimap.png');
        var mainImageWidth = this.width * this.tileWidth;
        var mainImageHeight = this.height * this.tileHeight;
        var miniImageWidth = miniMapImg.width;
        var miniImageHeight = miniMapImg.height;

        // Scale of mini -> main maps
        var xScale = mainImageWidth / miniImageWidth;
        var yScale = mainImageHeight / miniImageHeight;

        // Center the view around the mouse pointer
        this.setTranslation.apply(this, [(xLoc  * -xScale) + (this.mainMapCtx.canvas.clientWidth / 2), yLoc * -yScale + (this.mainMapCtx.canvas.clientHeight / 2)]);
    }
    EG.Handlers = {
        init  : init,
        miniCanvasHandlers : miniCanvasHandlers,
        mainCanvasHandlers : mainCanvasHandlers,
        UIHandlers : UIHandlers
    };
})();
