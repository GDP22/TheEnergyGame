// Initialise the game
var EG = (function (window){
    var config = {
        debugging : true,
        frameStep : 25, // Allow sleeping for 25 ms per between frames => ~30 FPS limit.
        timeStep : 1000, // num of milliseconds in 1 month of 'game time'.
        trajPoints : 10,
        trajChangePeriod : 24,
        trajChangeThreshold : 12,
        trajChangePoints : 2,
        moneyPerTrajPoint : 9900000000
    };
    config.decisionStep = (config.timeStep * 12 * 2); // a decision every 2 years

    var map;

    /**
     * Safe debugging, allow enabling or disabling of console messages at
     * runtime by editing EG.config.debugging.
     **/
    function log(args) {
        if(config.debugging) {
            console.log(args);
        }
    }

    function displayGameOverScreen() {
        // Display all the relevant info
        $("#finalScore").html(Math.round(EG.player.getScore()));
        if (window.loggedIn){
            var id = $("#savedGameLogged").attr("uid");
            var finalscore = Math.round(EG.player.getScore());
            $.post(
                "user/add/save/score",
                {
                    userID : id,
                    score : finalscore
                });
        }

        EG.UI.hideGame();

    }

    function tick() {
        // Stop ticking once the time reaches 2050. Show a screen saying the
        // user's score.
        if (EG.time.entryCount >= EG.time.endMonth) {
            displayGameOverScreen();
            return;
        }


        // If the game is paused then stop time from being updated
        if(this.time.paused) {
            return;
        }

        var t = new Date().getTime();
        var dt = t - this.model.old_t;
        this.model.map.clear.apply(this.model.map);
        this.model.map.updateAndRender.apply(this.model.map, [dt]);
        this.time.tick(dt);

        this.model.old_t = t;

        this.model.map.fpsReportTimer += dt;
        this.model.map.frameCount++;

        var this_ref = this;
        setTimeout(function() {
            tick.apply(this_ref,[]);
        }, config.frameStep);
    }

    /*  Generalised library for sound, texture, information
    */
    function library() {
        this.library =   {};
        this.get = function(key) {
            return this.library[key];
        };
        this.add = function(){
            return 'IMPLEMENT ME';
        };
        this.fmap = function(fn){
            for (var key in this.library) {
                if (this.library.hasOwnProperty(key)) {
                    fn(key);
                }
            }
        };
    }

    // TEXTURE LIBRARY
    function textureLibraryCtr() {
        this.add = function(image_path, image_obj) {
            this.library[image_path] = image_obj;
        };
        this.get = function(key) {
            var s = document.location.href;
            var i = s.lastIndexOf('/');
            var path = s.substr(0,i+1) + key;
            return this.library[path];
        };
    }
    textureLibraryCtr.prototype = new library();

    function infoLibraryCtr() {
        var this_ref = this;
        this.add = function (name, creatorFn, type, info) {
            // infoImagePath is the path to the image shown next to the stats
            // Which isn't on the canvas, so it doesn't get added to the textureLibrary

            // Add to internal library object the name, the creator function
            // Note, this isn't a constructor, using 'new creatorFn()' is wrong.
            this.library[name] = {
                "fn"            :   (function(){
                    return creatorFn.apply(window.EG, arguments);
                }),
                "type"          :   type,
                "info"          :   info
            /*  The info object holds all information about the object you're adding,
                    an example could be:
                    {
                        ribbonImage: <an image>,
                        infoImage: < a better image>,
                        infoText: "Some text to display in the floating window"
                        emissions: 123, // this should probably mean something really,
                        cost: 123001
                        output: 48181 // MW output
                        lifetime: 2 // years? months? seconds?
                    }
                */
            };
        };
    }
    infoLibraryCtr.prototype = new library();

    // AUDIO LIBRARY
    function soundLibraryCtr() {
    // TODO: write this
    }
    soundLibraryCtr.prototype = new library();

    var infoLibrary     = new infoLibraryCtr();
    var textureLibrary  = new textureLibraryCtr();
    var soundLibrary  = new soundLibraryCtr();

    var preloadImages = {
        // http://blog.152.org/2008/01/javascript-image-preloader.html
        count: 0,
        loaded: 0,
        onComplete: function () {},
        onLoaded: function () {},
        loaded_image: "",
        images: [] ,
        incoming: [] ,
        queue_images: function (images) {
            this.loaded = 0;
            this.images = [];
            this.count = images.length;
            this.incoming = images;
            this.process_queue();
        },
        process_queue: function () {
            this.load_image(this.incoming.shift());
        },
        load_image: function (image) {
            var this_ref = this;
            var preload_image = new Image();

            preload_image.onload = function () {
                this_ref.loaded_image = preload_image;
                this_ref.images.push(preload_image);
                this_ref.loaded += 1;
                (this_ref.onLoaded)();
                var percent = 100 * this_ref.loaded / (this_ref.count + 1);
                $("#loadingProgressBar").progressbar({
                    value: percent
                });

                if (this_ref.count == this_ref.loaded) {
                    (this_ref.onComplete)();
                } else {
                    this_ref.process_queue();
                }
            };
            preload_image.src = image;
        }
    };

    function donePreloading(done, needed, callback) {
        if (done == needed) {
            $("#loadingProgressBar").progressbar({ value: 100 });
            (callback)();
        }
    }

    function preloadScripts(scripts, callback) {
        var needed = scripts.length;
        var done = 0;
        var this_ref = this;
        for (i = 0; i < needed; i++) {
            $.ajax({
                url: scripts[i],
                datatype: 'script', // Get jQuery to execute the script on load
                success: donePreloading(++done, needed, callback),
                async: false
            });
        }
    }

    // Load everything needed by the game
    function preload(callback){
        $.ajaxSetup({
            cache : false
        });

        $.ajax({
            url     :   'preload_queue',
            type    :   'GET',
            cache   :   false,
            success :   function(data) {
                var toLoad = jQuery.parseJSON(data);

                var images = toLoad.images;
                var scripts = toLoad.scripts;
                scriptsNeeded = scripts.length;

                preloadImages.onComplete = function(images) {
                    // Images done, add to lib
                    for (var i = 0; i < preloadImages.images.length; i++) {
                        textureLibrary.add(preloadImages.images[i].src, preloadImages.images[i]);
                    }

                    // Continue with preload

                    // Sounds: TODO

                    // Scripts:
                    preloadScripts(scripts, callback);
                };
                preloadImages.queue_images(images);
            },
            error   :   function(XMLHttpRequest, textStatus, errorThrown) {
                alert(textStatus);
            }
        });
    }
    function init(mainMapCanvas, miniMapCanvas, chartCanvas) {
        var this_ref = this;
        preload(function () {
            // Various Contexts
            var mainMapCtx = mainMapCanvas.getContext('2d');
            var miniMapCtx = miniMapCanvas.getContext('2d');
            this_ref.graphCtx = chartCanvas.getContext('2d');
            mainMapCtx.font = "20pt Arial";

            // Weather
            EG.Weather = new EG.WeatherSetup();

            // Map setup
            this_ref.model.map = new EG.Map(mainMapCtx, miniMapCtx);
            EG.populateTerrainData();
            EG.addNationalParks(this_ref.model.map);
            EG.initialiseResourceModifiers(this_ref.model.map);
            EG.initialiseUKBuildings(this_ref.model.map.gameMap);
            EG.initialisePopulation(this_ref.model.map);
            EG.predictionCalc.init();

            // Time setup
            EG.time = new EG.Time();

            // Make a player
            EG.player = new EG.Player();

            //Template setup
            EG.Templates = new EG.TemplatesSetup();

            // Setup trajectories
            EG.TM = new EG.TrajectoriesManagerSetup();

            // Setup UI
            EG.UI = new EG.UISetup();

            // Setup Handlers
            EG.Handlers.init($('#canvas'), $('#minimapcanvas'), this_ref.model.map);

            // start the Decision Manager
            EG.DM = new EG.DecisionManager();

            //commented out so that it works without the scala
            //if ($("#savedGameLogged").text().toString().length > 0){

            //}

            EG.Geo = new EG.GeoSetup();

            // Everything is loaded, setup the main menu now
            EG.UI.setupMainmenu();
        });
    }

    function togglePaused() {
        // Toggle the game being paused
        this.time.togglePaused();

        // If it's become unpaused, restart the game's tick function
        if(!this.time.paused) {
            this.model.old_t = new Date().getTime();
            this.tick();
        }
    }

    function newGame(callback) {
        // Start the game
        this.model.old_t = new Date().getTime();
        this.tick();
        callback();
    }

    function getOverlayType() {
        return this.model.map.game_state.mapOverlay;
    }

    function setOverlayType(type) {
        this.model.map.game_state.mapOverlay = type;
        this.model.map.stopBuilding();
    }

    return {
        config  : config,
        init : init,
        newGame : newGame,
        tick    : tick,
        library : library,
        infoLibrary :   infoLibrary,
        textureLibrary  :textureLibrary,
        log : log,
        togglePaused: togglePaused,
        time : this.time,
        model : this.model,
        graphCtx : this.graphCtx,
        getOverlayType : getOverlayType,
        setOverlayType : setOverlayType
    };
})(window);
