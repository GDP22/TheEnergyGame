(function () {
    // Check EG is loaded
    if (typeof window.EG == 'undefined') {
        return;
    }

    EG.Countries = {
        ENGLAND : 0,
        SCOTLAND : 1,
        WALES : 2,
        NORTHERN_IRELAND : 3
    };

    // Tile width and height
    var twidth = 60;
    var theight = 60;

    // When passed a latitude and longitude, this returns an object in the form
    // {x: <grid cell x coord>, y: <grid cell y coord>}.
    EG.latlngToIndex = function(lat, lng, map) {
        var topLeftLatLong = {
            // This data is from google maps and may need tweaking. Visit
            // http://maps.google.com/maps?showlabs=1
            // and set the LatLong marker to enabled to tweak.
            lat: 59.25,
            lng: -10.35
        };

        var bottomRightLatLong = {
            lat: 49.2,
            lng: 2.70
        };

        // Find out how the scale between a latitude and longitude unit to a
        // height and width unit so that we can calculate which grid space each
        // city is centered in.
        var numMapXTiles = map.length;
        var numMapYTiles = map[0].length;

        // Calculate the width and height of the UK in lat and long coordinates
        // Note: This is completely ignoring curvature of the Earth's surface,
        // hopefully it will still be accurate enough.
        // lngDifference is the wrong way round as the UK crosses longitude = 0
        // line and has values either side (i.e. Grenwich Mean Line).
        // Note: lat values are multiplied by two due to being in the range +90
        // to -90, while longitude values are in the range -180 to +180.

        // Source coordinate type is in lat/long
        var sourceType = new Proj4js.Proj('EPSG:4326');
        // Destination type is in meters
        var destType = new Proj4js.Proj('EPSG:3785');

        // Perform the conversion for the top left and bottom right coordinates
        var topLeftInMeters = new Proj4js.Point(topLeftLatLong.lng, topLeftLatLong.lat);

        Proj4js.transform(sourceType, destType, topLeftInMeters);

        var bottomRightInMeters = new Proj4js.Point(bottomRightLatLong.lng, bottomRightLatLong.lat);
        Proj4js.transform(sourceType, destType, bottomRightInMeters);

        // Now perform the same transformation for our coordinate.
        var mapHeight = topLeftInMeters.y - bottomRightInMeters.y;
        var mapWidth = bottomRightInMeters.x - topLeftInMeters.x;

        var location = new Proj4js.Point(lng, lat);
        Proj4js.transform(sourceType, destType, location);

        // Calculate the change in longitude and latitude per tile.
        var latPerTile = mapHeight / numMapYTiles;
        var lngPerTile = mapWidth / numMapXTiles;

        var relativeCityX = location.x - topLeftInMeters.x;

        var relativeCityY = topLeftInMeters.y - location.y;

        // Convert the city's X and Y to grid coordinates
        var cityX = Math.round(relativeCityX / lngPerTile);
        var cityY = Math.round(relativeCityY / latPerTile);

        return {
            x: cityX,
            y: cityY
        };
    };

    var map = EG.textureLibrary.get('images/map.jpg');

    // Create a base GameObject that has a single animation that represents the
    // map that's drawn in the background. This is the first thing that's drawn
    // every frame (unless we have some water / wave animations).
    var gameMapObject = new EG.GameObject(EG.GameObjectNames.Base);
    var gameMapAnimation = new EG.Animation('images/map.jpg', 0, 0, 1);

    // Override the draw function for the map's animation so that when we call
    // mapAnimation.draw() we can specify the offset of the crop region -> so
    // that we don't have to draw a huge image every frame.
    gameMapAnimation.draw = function (ctx, x, y, width, height) {
        ctx.drawImage(this.img, x, y, width, height, x, y, width, height);
    };

    gameMapObject.decorateWith(gameMapAnimation);

    var gameMap = [];
    var cityToCellMap = {}; //maps cities to cells

    var this_ref = this;
    var row, col, x, y;

    for (x = 0; x < map.width; x += twidth) {
        col = [];
        for (y = 0; y < map.height; y += theight) {
            col.push(new EG.MapCell(x, y, twidth, theight));
        }
        gameMap.push(col);
    }

    /**
     * TODO: Add floating clouds etc to this array.
     *
     * Generate some weather. Weather objects are objects that have animations
     * and movement but they aren't bound to the world grid.
     **/
    var overlayObjects = [];

    // Make a new test cloud object that's at (300,300)
    /*var testCloud = new EG.GameObject(EG.GameObjectNames.Cloud);
    var pos = new EG.Position(300, 300);
    var cloudAnim = new EG.Animation('images/cloudsmall.png', pos, 1, 1);
    var e = new EG.Motion.elliptical(cloudAnim, 3000, 100, 100, 100, 40);
    testCloud.decorateWith(e);
    testCloud.decorateWith(cloudAnim);
    overlayObjects.push(testCloud); */

    EG.Map = function (mainCtx, miniCtx) {
        this.mainMapCtx = mainCtx;
        this.miniMapCtx = miniCtx;
        this.game_state = {
            mapOverlay: 0,
            // 0 == normal
            // 1 == weather
            // 2 == resources
            building: null,
            // null == not building
            // <anything> == currently building an anything
            selected: null
            // null == not selected
            // <a cell> == currently selected a cell
        };

        this.totalPopulation = 0;
        this.tileWidth = twidth;
        this.tileHeight = theight;
        // NB: these are the number of tiles, not the px height
        this.width = gameMap.length;
        this.height = gameMap[0].length;

        // The image representing the map
        this.mapImage = gameMapObject;

        this.winterMapObject = winterMapObject;

        // Different maps for the tabs at the top
        this.gameMap = gameMap;

        // Map of cities to cells
        this.cityToCellMap = cityToCellMap;

        // Building which has been selected from ribbon, but not yet built
        // this should snap to tiles
        this.toBuild = null;

        // Weather Overlay for the normal game
        this.weatherOverlay = overlayObjects;

        // Variables to track the current offset of the world map in the game. This
        // is used to track the current scroll position for drawing and is also
        // used in dragging and dropping to calculate the correct grid square that
        // an item has been dropped onto.
        this.mapScrollXOffset = 0;
        this.mapScrollYOffset = 0;
        this.isMiniMapPanning = false;
        this.fpsReportTimer = 0;
        this.frameCount = 0;
        this.meanFPS = 0;
        this.mouseStartX = -1;
        this.mouseStartY = -1;
        this.isMoving = false;
        
        // Calculate country boundaries
        this.assignCountriesToCells();
    };

    EG.Map.prototype.clear = function () {
        this.mainMapCtx.clearRect(0, 0, this.mainMapCtx.canvas.clientWidth, this.mainMapCtx.canvas.clientHeight);
    };

    /*
     * Given a x and y relative to top left corner of the canvas, figure
     * out the in game coordinates.
     */
    EG.Map.prototype.decodeWorldXY = function (x, y) {
        var relativeXLoc = x - this.mapScrollXOffset;
        var relativeYLoc = y - this.mapScrollYOffset;
        return {
            x: relativeXLoc,
            y: relativeYLoc
        };
    };

    EG.Map.prototype.findCellByXY = function (x, y) {
        var col = Math.floor(x / this.tileWidth);
        var row = Math.floor(y / this.tileWidth);
        return this.gameMap[col][row];
    };

    EG.Map.prototype.findCellByRowCol = function(r, c) {
        if (this.gameMap[c]) {
            return this.gameMap[c][r];
        }
    };
    // This returns the city centre
    EG.Map.prototype.findCellByCityName = function(name) {
        return this.cityToCellMap[name];
    };

    /**
     * Iterate over all rows and columns, applying the
     * given function to each cell.
     *
     * @param fn, a function to map over the map.
     */
    EG.Map.prototype.fmap = function (fn) {
        var returnMap = [];
        for (var col = 0; col < this.width; ++col) {
            returnMap.push([]);
            for (var row = 0; row < this.height; ++row) {
                // Using apply so fn gets the correct context
                returnMap[col][row] = fn.apply(this, [this.gameMap[col][row], col, row]);
            }
        }

        return returnMap;
    };

    EG.Map.prototype.getMapCellsData = function () {
        var totals = {
            emissions : 0,
            energy_produced : 0,
            cost : 0,
            demand : 0
        };

        // Loop over the map, grabbing the current data.
        var mapData = EG.model.map.fmap(function(cell, row, col) {
            var cellData = cell.getData();

            for (var key in totals) {
                if (totals.hasOwnProperty(key)) {
                    totals[key] += cellData[key];
                }
            }

            return cellData;
        });

        totals.tile_data = mapData;
        return totals;
    };

    /**
     * Overlay iterate, same as above, except for the weather overlay
     */
    EG.Map.prototype.iterateWeatherOverlay = function (fn) {
        for (var i = 0; i < this.weatherOverlay.length; i++) {
            fn.apply(this, [this.weatherOverlay[i]]);
        }
    };

    /**
     * Same as the others, only called iterate since other code
     * doesn't need to know you can only have one building
     */
    EG.Map.prototype.iterateToBuild = function (fn) {
        if (this.game_state.building) {
            fn.apply(this, [this.game_state.building]);
        }
    };

    EG.Map.prototype.makeFloatingBuilding = function (name, x, y) {
        var o = new EG.GameObject(name);

        var pos = new EG.Position(x, y);
        var img = EG.infoLibrary.get(name).info.floatImage;
        var anim = new EG.Animation(img, pos, 1, 1, this.tileHeight, this.tileWidth);
        var this_ref = this;
        o.decorateWith(pos);
        o.decorateWith(anim);
        o.cell = null;
        return o;
    };

    EG.Map.prototype.doneBuilding = null;

    /*
     * Name is optional
     */
    EG.Map.prototype.isBuilding = function (name) {
        if (name) {
            return (this.game_state.building) && (this.game_state.building.name == name);
        } else {
            return !!(this.game_state.building);
        }
    };

    EG.Map.prototype.getBuildingSelected = function() {
        return this.game_state.building;
    };

    EG.Map.prototype.clearBuildingHighlight = function () {
        // Remove any existing highlights
        var building = this.game_state.building;
        if (building && building.cell) {
            building.cell.removeHighlight();
        }
    };

    EG.Map.prototype.startBuilding = function (name, callback) {
        this.clearBuildingHighlight();
        this.clearSelectedCell();

        // Make an floating building (have to start drawing it off screen)
        var b = this.makeFloatingBuilding(name, -1000, -1000);

        // Set the callback for when we're done building (normally clear the UI)
        this.doneBuilding = callback;

        this.game_state.building = b;
    };

    EG.Map.prototype.updateBuildingPos = function (x, y) {
        var position = this.game_state.building.decorators.Position;

        // Find cell
        var cell = this.findCellByXY(x, y);
        position.x = cell.x;
        position.y = cell.y;
        var oldCell = this.game_state.building.cell;

        // only remove if there was an old cell
        if (oldCell != cell) {
            if (oldCell) {
                oldCell.removeHighlight();
            }

            // Update whether we can build or not
            // the mapcell draws the highlight
            var name = this.game_state.building.name;
            this.game_state.building.cell = cell;
            cell.canBuild(name);
        }
    };

    EG.Map.prototype.build = function () {
        // You have to have mouseover'd a cell to build there
        var cell = this.game_state.building.cell;

        // make building and add
        var name = this.game_state.building.name;
        if (cell.canBuild(name)) {
            var b = EG.infoLibrary.get(name).fn(cell.x, cell.y);
            cell.addItem(b);
            cell.removeHighlight();
            this.stopBuilding();
        }
    };

    EG.Map.prototype.stopBuilding = function () {
        this.clearBuildingHighlight();
        this.game_state.building = null;
        if (this.doneBuilding) {
            this.doneBuilding();
        }
    };
    EG.Map.prototype.CountryBorders = (function(){
        var ret = {};
        ret[EG.Countries.WALES] = {
            top : 43,
            bottom : 62,
            left : 12,
            right: 34
        };
        ret[EG.Countries.SCOTLAND] = {
            top: 0,
            bottom: 34,
            left: 0, 
            right: 59
        };
        ret[EG.Countries.NORTHERN_IRELAND] = {
            top : 33,
            bottom : 42,
            left : 0, 
            right: 23
        };
        return ret;
    })();
    EG.Map.prototype.assignCountriesToCells = function() {
        for (var country in this.CountryBorders) {
            if (this.CountryBorders.hasOwnProperty(country)) {
                var thisCountry = this.CountryBorders[country];
                
                for (var i = thisCountry.left; i <= thisCountry.right; i++) {
                    for (var j = thisCountry.top; j <= thisCountry.bottom; j++) {
                        this.gameMap[i][j].setCountry(country);
                    }
                }
            }
        }
    };

    // SELECTION STUFF
    EG.Map.prototype.clearSelectedCell = function () {
        if (this.game_state.selected) {
            this.game_state.selected.removeHighlight();
        }
    };

    EG.Map.prototype.selectObjectAt = function (x, y) {
        this.clearSelectedCell();
        var cell = this.findCellByXY(x, y);
        this.game_state.selected = cell;
        cell.select();
    };

    EG.Map.prototype.getAverageHappiness = function() {
        var total = 0.0;

        this.fmap(function (cell, i) {
            if (cell.type == EG.CellTypes.GROUND) {
                // All populated areas are represented by a City object.
                if(cell.city) {
                    total += (cell.city.averageCitizen.happiness * cell.city.population) ;
                }
            }
        });
        total /= this.totalPopulation

        return total;
    };

    EG.Map.prototype.showHideCells = function (xOffset, yOffset) {
        // Variables holding the min/max visible row/col indices.
        var rMin = 0,
        cMin = 0,
        rMax = this.width,
        cMax = this.height;

        cMin = Math.floor(xOffset / this.tileWidth);
        cMax = cMin + Math.ceil(this.mainMapCtx.canvas.clientWidth / this.tileWidth);
        rMin = Math.floor(yOffset / this.tileHeight);
        rMax = rMin + Math.ceil(this.mainMapCtx.canvas.clientHeight / this.tileHeight);

        // Don't try and set indices outside of the bounds.
        cMin = cMin < 0 ? 0 : cMin;
        cMax = cMax > this.width ? this.width : cMax;
        rMin = rMin < 0 ? 0 : rMin;
        rMax = rMax > this.height ? this.height : rMax;

        // Update the visibilty of cell objects.
        this.fmap(function (cell, col, row) {
            var visible = !(col < cMin || col > cMax || row < rMin || row > rMax);

            cell.setVisible(visible);
        });
    };

    EG.Map.prototype.centreViewOn = function (x,y) {
        if (this.gameMap[x] && this.gameMap[x][y]) {
            var cell = this.gameMap[x][y];
            var w = this.mainMapCtx.canvas.width;
            var h = this.mainMapCtx.canvas.height;
            var centreX = cell.x - (w/2);
            var centreY = cell.y - (h/2);

            this.setTranslation(-centreX, -centreY);
        }
    };
    EG.Map.prototype.setTranslation = function (newXTranslation, newYTranslation) {
        var imageWidth = this.width * this.tileWidth;
        var imageHeight = this.height * this.tileHeight;

        var minY = -(imageHeight - this.mainMapCtx.canvas.height);
        var maxY = 0;

        var minX = -(imageWidth - this.mainMapCtx.canvas.width);
        var maxX = 0;

        // Don't let the view stray outside our bounding box.
        if (newXTranslation < minX) {
            newXTranslation = minX;
        }

        if (newXTranslation > maxX) {
            newXTranslation = maxX;
        }

        if (newYTranslation < minY) {
            newYTranslation = minY;
        }

        if (newYTranslation > maxY) {
            newYTranslation = maxY;
        }
        this.mapScrollXOffset = newXTranslation;
        this.mapScrollYOffset = newYTranslation;

        this.showHideCells(-this.mapScrollXOffset, -this.mapScrollYOffset);
    };

    EG.Map.prototype.updateTranslation = function (dt) {
        this.setTranslation(this.mapScrollXOffset, this.mapScrollYOffset);
    };

    EG.Map.prototype.drawMiniMap = function () {
        var miniMapImg = EG.textureLibrary.get('images/minimap.png');
        var mainImageWidth = this.width * this.tileWidth;
        var mainImageHeight = this.height * this.tileHeight;
        var miniImageWidth = miniMapImg.width;
        var miniImageHeight = miniMapImg.height;
        var widthRatio = miniImageWidth / mainImageWidth;
        var heightRatio = miniImageHeight / mainImageHeight;

        // Clear and then re-draw the minimap
        this.miniMapCtx.clearRect(0, 0, this.miniMapCtx.canvas.clientWidth, this.miniMapCtx.canvas.clientHeight);
        this.miniMapCtx.drawImage(miniMapImg, 0, 0, miniImageWidth, miniImageHeight);

        // Add markers to indicate which objects are on each tile
        this.fmap(function (cell, col, row) {
            if(cell.contents.length > 0) {
                var contentType = cell.contents[0].name;

                var x = cell.x * widthRatio;
                var y = cell.y * heightRatio;
                var width = cell.width * widthRatio;
                var height = cell.height * heightRatio;

                var centerX = x + width/2;
                var centerY = y + height/2;

                var colour = null;

                switch (contentType) {
                    case EG.GameObjectNames.WindTurbine:
                        colour = "yellow";
                        break;
                    case EG.GameObjectNames.CoalPowerStation:
                        colour = "blue";
                        break;
                    case EG.GameObjectNames.HydroElectric:
                        colour = "red";
                        break;
                    case EG.GameObjectNames.Nuclear:
                        colour = "green";
                        break;
                    case EG.GameObjectNames.NaturalGas:
                        colour = "purple";
                        break;
                    case EG.GameObjectNames.WaveFarm:
                        colour = "black";
                        break;
                    case EG.GameObjectNames.CCGT:
                        colour = "brown";
                        break;
                    case EG.GameObjectNames.Geothermal:
                        colour = "orange";
                        break;
                    case EG.GameObjectNames.Solar:
                        colour = "indigo";
                        break;
                }
                if(colour) {
                    this.miniMapCtx.fillStyle = colour;
                    this.miniMapCtx.fillRect(centerX - 2, centerY - 2, 4, 4);
                }
            }
        });

        // Calculate the main view port's relative position on the mini map.
        var miniMapOffsetX = -this.mapScrollXOffset * widthRatio;
        var miniMapOffsetY = -this.mapScrollYOffset * heightRatio;
        var miniMapViewWindowHeight = this.mainMapCtx.canvas.clientHeight * heightRatio;
        var miniMapViewWindowWidth = this.mainMapCtx.canvas.clientWidth * widthRatio;

        this.miniMapCtx.strokeStyle = "red";
        this.miniMapCtx.lineWidth = 3;

        // Take into account stroke width so that it doesn't get truncated.
        this.miniMapCtx.roundRect(miniMapOffsetX + 1.5, miniMapOffsetY + 1.5, miniMapViewWindowWidth - 3, miniMapViewWindowHeight - 3, 5, false, true);
    };

    // Create another GameObject that represents the map in winter and give it
    // an animation just like mapObject.
    var winterMapObject = new EG.GameObject(EG.GameObjectNames.Base);
    var winterMapAnimation = new EG.Animation('images/wintermap.jpg', 0, 0, 1);
    winterMapObject.decorateWith(winterMapAnimation);

    // Override the draw function for the map's animation so that when we call
    // mapAnimation.draw() we can specify the offset of the crop region -> so
    // that we don't have to draw a huge image every frame.
    winterMapAnimation.draw = function (ctx, x, y, width, height) {
        ctx.drawImage(this.img, x, y, width, height, x, y, width, height);
    };
    var alphaHelper = 0;
    var fadePeriod = 5000;
    var fadeLim = fadePeriod * Math.PI;
    EG.Map.prototype.updateAndRender = function (dt) {
        this.updateTranslation(dt);
        this.mainMapCtx.save();

        this.mainMapCtx.translate(this.mapScrollXOffset, this.mapScrollYOffset);

        this.mapImage.decorators.Animation.draw(this.mainMapCtx, -this.mapScrollXOffset, -this.mapScrollYOffset, this.mainMapCtx.canvas.width, this.mainMapCtx.canvas.height);

        // Draw the map image
        // Calculate the transparency of the winter image based on the time
        // that has passed.
        alphaHelper += dt;
        alphaHelper %= fadeLim;
        var alpha = Math.abs(Math.sin(alphaHelper/fadePeriod));
        this.mainMapCtx.globalAlpha = alpha;

        // Render the winter image.
        this.winterMapObject.decorators.Animation.draw(this.mainMapCtx, -this.mapScrollXOffset, -this.mapScrollYOffset, this.mainMapCtx.canvas.width, this.mainMapCtx.canvas.height);

        // Reset the transparency of the canvas.
        this.mainMapCtx.globalAlpha = 1.0;

        this.drawMiniMap();

        // Update the decision manager
        EG.DM.update(dt);

        // RENDER
        var this_ref = this;

        /**
         * Depending on which overlay we're showing, draw the correct things.
         * If we are on the normal overlay, draw the buildings that are being
         * build. If we're on the resources overlay, show which tiles are
         * better for certain resources.
         */

        // Then iterate over drawing any other type of object
        this.fmap(function (cell, col, row) {
            cell.update(dt);
            cell.draw(this_ref.mainMapCtx);
        });

        // Normal
        // Any buildings that are being built?
        this.iterateToBuild(function (o) {
            o.update(dt);
            o.draw(this_ref.mainMapCtx);
        });

        this.mainMapCtx.restore();

        // Render the weather overlay objects (floating clouds etc)
        this.iterateWeatherOverlay(function (o) {
            o.update(dt);
            o.draw(this.mainMapCtx);
        });

        // Update the weater
        EG.Weather.update(dt);

    // POST-RENDER
    /*
        if (this.fpsReportTimer > 1000) {
            // Update the average FPS on the screen in the top left.
            this.meanFPS = this.frameCount;
            this.frameCount = 0;
            this.fpsReportTimer = 0;
        }

        // Only show the FPS if we are debugging.
        if (EG.config.debugging) {
            this.mainMapCtx.save();
            this.mainMapCtx.fillStyle = "black";
            // Render the FPS in the top left
            this.mainMapCtx.fillText("FPS: " + this.meanFPS, 30, 50);
            this.mainMapCtx.restore();
        } */
    };
})();
