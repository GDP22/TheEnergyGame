(function () {
    // Weather types
    EG.WeatherTypes = {
        SUNNY : 0,
        RAINY : 1,
        WINDY : 2
    };


    /*
     * Weather:
     * 
     * The weatherMap is essentially a Hidden markov model describing 
     * transitions and their probabilities, the index into each
     * transition array describes which state to transition to, using
     * EG.WeatherTypes to map from positions to states.
     * 
     * InitWeather makes a cross domain request (via YQL, see the modified
     * jQuery.xdomainajax.js) to Google's undocumented weather API, it returns
     * XML, which is then parsed, and the 'current condition' which Google
     * return is mapped into one of our 3 weather states via 
     * googleConditionsMap.
     */
    EG.WeatherSetup = function() {

        // Objects so the effectsMap can reference them
        EG.WeatherFactory = {};
        EG.WeatherFactory[EG.WeatherTypes.SUNNY] = function(m) { this.modifier = m || 2.0; this.type="sunny"; };
        EG.WeatherFactory[EG.WeatherTypes.RAINY] = function(m) { this.modifier = m || 2.0; this.type="rainy";};
        EG.WeatherFactory[EG.WeatherTypes.WINDY] = function(m) { this.modifier = m || 2.0; this.type="windy";};

        // what variables affect what GO's
        this.effectsMap = {};
        this.effectsMap[EG.GameObjectNames.WindTurbine]     = [EG.WeatherTypes.WINDY];
        this.effectsMap[EG.GameObjectNames.CoalPowerStation]= [];
        this.effectsMap[EG.GameObjectNames.HydroElectric]   = [EG.WeatherTypes.RAINY];
        this.effectsMap[EG.GameObjectNames.Nuclear]         = [];
        this.effectsMap[EG.GameObjectNames.NaturalGas]      = [];
        this.effectsMap[EG.GameObjectNames.WaveFarm]        = [EG.WeatherTypes.RAINY, EG.WeatherTypes.WINDY];
        this.effectsMap[EG.GameObjectNames.CCGT]            = [];

        this.weatherMap = {};
        this.weatherMap[EG.Countries.ENGLAND] = {
            state : null,
            value : null,
            transitions : (function(){
                var ret = {};
                ret[EG.WeatherTypes.SUNNY] = [0.5, 0.25, 0.25];
                ret[EG.WeatherTypes.RAINY] = [0.2, 0.4, 0.4];
                ret[EG.WeatherTypes.WINDY] = [0.4, 0.4, 0.2];
                return ret;
            })()
        };
        this.weatherMap[EG.Countries.SCOTLAND] = {
            state : null,
            value : null,
            transitions : (function(){
                var ret = {};
                ret[EG.WeatherTypes.SUNNY] = [0.2, 0.4, 0.4];
                ret[EG.WeatherTypes.RAINY] = [0.25, 0.5, 0.25];
                ret[EG.WeatherTypes.WINDY] = [0.2, 0.2, 0.6];
                return ret;
            })()
        };
        this.weatherMap[EG.Countries.WALES] = {
            state : null,
            value : null,
            transitions : (function(){
                var ret = {};
                ret[EG.WeatherTypes.SUNNY] = [0.34, 0.34, 0.32];
                ret[EG.WeatherTypes.RAINY] = [0.15, 0.7, 0.15];
                ret[EG.WeatherTypes.WINDY] = [0.4, 0.4, 0.2];
                return ret;
            })()
        };
        this.weatherMap[EG.Countries.NORTHERN_IRELAND] = {
            state : null,
            value : null,
            transitions : (function(){
                var ret = {};
                ret[EG.WeatherTypes.SUNNY] = [0.34, 0.34, 0.32];
                ret[EG.WeatherTypes.RAINY] = [0.15, 0.7, 0.15];
                ret[EG.WeatherTypes.WINDY] = [0.4, 0.4, 0.2];
                return ret;
            })()
        };

        this.origWeatherMap = jQuery.extend(true, {}, this.weatherMap);

        this.elapsed = 0;
        this.defaultWeather();
    };

    EG.WeatherSetup.prototype.reset = function() {
        this.weatherMap = this.origWeatherMap;
        // generate another copy
        this.origWeatherMap = jQuery.extend(true, {}, this.weatherMap);
        this.defaultWeather();

        EG.UI.showWeatherError();
    };
    EG.WeatherSetup.prototype.initWeather = function(lat, lng) {
        var this_ref = this;

        lat = lat || EG.player.lat;
        lng = lng || EG.player.lng;

        EG.UI.showWeatherContainer();
        EG.UI.showWeatherFinding();

        // Google's undocumented weather API needs strings of length 8 without dots
        // (or 9 if the lat or lng is negative, as there's a - on the front)
        // BLARGH
        lat = lat.toString().replace('.','');
        lng = lng.toString().replace('.','');
        
        // Might be < 8, pad:
        while (lat.length < 8) { lat += '0'; }
        while (lng.length < 8) { lng += '0'; }

        // Might be longer originally, trim:
        lat = lat.substring(0,8);
        lng = lng.substring(0,8);

        $.weatherAjax({
            url: "http://www.google.com/ig/api?weather=,,," + lat + "," + lng,
            success: function(data, textStatus) {
                var currCond = $(data.responseText).find("current_conditions");
                var cond = currCond.find("condition");
                if (cond.length > 0) {
                    cond.each(function(){
                        var weatherCondition = $(this).attr('data');
                        if (weatherCondition && (typeof this_ref.googleConditionsMap[weatherCondition.toUpperCase()] != 'undefined')) {
                            // Translate google's weather condition into one of ours
                            var actualWeather = this_ref.googleConditionsMap[weatherCondition.toUpperCase()]; 

                            EG.UI.showWeatherFound(weatherCondition);

                            // Influence the game's weather probabilities
                            this_ref.influenceGameWeather(actualWeather);
                        } else {
                            EG.UI.showWeatherError();
                        }
                    });
                } else {
                    EG.UI.showWeatherError();
                }
            },
            error: function() {
                EG.UI.showWeatherError();
            },
            dataType: 'xml',
            type : 'get',
            cache:true
        });
    };
    EG.WeatherSetup.prototype.influenceGameWeather = function(weather) {
        /*0.6, 0.2, 0.2

        1.2 + 0.2 + 0.2 = 1.6

        1.2 / 1.6 = 0.75
        0.2 / 1.6 = 0.125
        0.2 / 1.6 = 0.125 */

        // only modify the likelihood of the user's weather
        for (var country in EG.Countries) {
            if (EG.Countries.hasOwnProperty(country)) {
                var thisCountry = EG.Countries[country],
                    trans = this.weatherMap[thisCountry].transitions[weather];

                // double the probability of whatever the current weather was
                trans[weather] *= 2;

                // Find new total
                var sum = 0;
                for (var i=0; i<trans.length; i++) {
                    sum += trans[i];
                }

                // Now divide through by the new total to normalise
                for (i=0; i<trans.length; i++) {
                    trans[i] /= sum;
                }
            }
        }
    };
    EG.WeatherSetup.prototype.defaultWeather = function() {
        this.weatherMap[EG.Countries.ENGLAND].state = EG.WeatherTypes.SUNNY;
        this.weatherMap[EG.Countries.ENGLAND].value = new (EG.WeatherFactory[EG.WeatherTypes.SUNNY])();

        this.weatherMap[EG.Countries.WALES].state = EG.WeatherTypes.RAINY;
        this.weatherMap[EG.Countries.WALES].value = new (EG.WeatherFactory[EG.WeatherTypes.RAINY])();

        this.weatherMap[EG.Countries.SCOTLAND].state = EG.WeatherTypes.RAINY;
        this.weatherMap[EG.Countries.SCOTLAND].value = new (EG.WeatherFactory[EG.WeatherTypes.RAINY])();

        this.weatherMap[EG.Countries.NORTHERN_IRELAND].state = EG.WeatherTypes.WINDY;
        this.weatherMap[EG.Countries.NORTHERN_IRELAND].value = new (EG.WeatherFactory[EG.WeatherTypes.WINDY])();
    };

    EG.WeatherSetup.prototype.getWeatherModifier = function(name, cell){
        // Find country of cell, and weather in the country
        var country = cell.country,
            weather = this.weatherMap[country].state,
            ret = 1.0;

        // If the building has an entry in effectMap, if it has any
        // weather that can modify its output, finally
        // if the weather in its location can affect it.
        if (this.effectsMap[name] && 
            this.effectsMap[name].length > 0 &&
            ($.inArray(weather, this.effectsMap[name]) > -1) ) {
            ret = this.weatherMap[country].value.modifier;
        }
        return ret;
    };

    EG.WeatherSetup.prototype.update = function(dt){
        this.elapsed += dt;
        if (this.elapsed > 12 * EG.config.timeStep) {
            // For each country, update the weather by transitioning (or not, it
            // might stay in the same state)
            for (var country in EG.Countries) {
                if (EG.Countries.hasOwnProperty(country)) {
                    var thisCountry = EG.Countries[country],
                        countryData = this.weatherMap[thisCountry],
                        curWeather = countryData.state,
                        p = Math.random(),
                        sum = 0;

                    // Random roll of dice of transitions for current state
                    for (var i = 0; i < countryData.transitions[curWeather].length; i++ ) {
                        sum += countryData.transitions[curWeather][i];
                        if (sum >= p) {
                            break;
                        }
                    }

                    // i will hold which state to transition too
                    countryData.state = i;
                    countryData.value = new (EG.WeatherFactory[i])();
                }
            }
            this.elapsed = 0;
        }
    };

    EG.WeatherSetup.prototype.googleConditionsMap = {
        "PARTLY SUNNY" :            EG.WeatherTypes.SUNNY,
        "SCATTERED THUNDERSTORMS" : EG.WeatherTypes.RAINY,
        "SHOWERS" :                 EG.WeatherTypes.RAINY,
        "SCATTERED SHOWERS" :       EG.WeatherTypes.RAINY,
        "RAIN AND SNOW" :           EG.WeatherTypes.RAINY,
        "OVERCAST" :                EG.WeatherTypes.RAINY,
        "LIGHT SNOW" :              EG.WeatherTypes.RAINY,
        "FREEZING DRIZZLE" :        EG.WeatherTypes.RAINY,
        "CHANCE OF RAIN" :          EG.WeatherTypes.RAINY,
        "SUNNY" :                   EG.WeatherTypes.SUNNY,
        "CLEAR" :                   EG.WeatherTypes.SUNNY,
        "MOSTLY SUNNY" :            EG.WeatherTypes.SUNNY,
        "PARTLY CLOUDY" :           EG.WeatherTypes.SUNNY,
        "MOSTLY CLOUDY" :           EG.WeatherTypes.SUNNY,
        "CHANCE OF STORM" :         EG.WeatherTypes.WINDY,
        "RAIN" :                    EG.WeatherTypes.RAINY,
        "CHANCE OF SNOW" :          EG.WeatherTypes.WINDY,
        "CLOUDY" :                  EG.WeatherTypes.WINDY,
        "MIST" :                    EG.WeatherTypes.RAINY,
        "STORM" :                   EG.WeatherTypes.RAINY,
        "THUNDERSTORM" :            EG.WeatherTypes.RAINY,
        "CHANCE OF TSTORM" :        EG.WeatherTypes.WINDY,
        "SLEET" :                   EG.WeatherTypes.WINDY,
        "SNOW" :                    EG.WeatherTypes.RAINY,
        "ICY" :                     EG.WeatherTypes.WINDY,
        "DUST" :                    EG.WeatherTypes.SUNNY,
        "FOG" :                     EG.WeatherTypes.RAINY,
        "SMOKE" :                   EG.WeatherTypes.SUNNY,
        "HAZE" :                    EG.WeatherTypes.SUNNY,
        "FLURRIES" :                EG.WeatherTypes.WINDY,
        "LIGHT RAIN" :              EG.WeatherTypes.RAINY
    };
})();
