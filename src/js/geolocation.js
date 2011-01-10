(function () {
    /*
     * Geolocation stuff.
     */
    EG.GeoSetup = function() {
        // Are we playing locally?
        if (typeof google == 'undefined') {
            EG.UI.showNoGeoError();
            return;
        } else {
            EG.UI.showLocationPanel();
        }
        // Can we use html5 geolocation?
        if (navigator.geolocation) {
            EG.UI.setupGeolocationButton();
        }
        
        EG.UI.showPostcodeEntry();

        this.MIN_ADDRESS_LENGTH = 2;

        this.mapEl = EG.UI.getGeolocMap().get(0);
        this.map = null;
        this.marker = null;
        this.initMap();
        
        this.hasGeolocated = false;
    };
    
    EG.GeoSetup.prototype.initMap = function() {
        var opt = {
            zoom : 4,
            center : new google.maps.LatLng(54.737308,-1.82373),
            draggable : true, //false,
            scrollwheel : false,
            navigationControl : false,
            disableDefaultUI : true,
            mapTypeId : google.maps.MapTypeId.ROADMAP
        };
        
        this.map = new google.maps.Map(this.mapEl, opt);
    };
    
    EG.GeoSetup.prototype.geoButtonPress = function() {
        EG.UI.showGoogleMap();
        var this_ref = this;
        navigator.geolocation.getCurrentPosition(function(position) {
            this_ref.initMap();
            var currLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
            this_ref.verifyLocation(currLocation);
        });
    };
    EG.GeoSetup.prototype.addressFieldChange = function (contents) {
        EG.UI.geoLocating();
        EG.UI.showGoogleMap();
        if (contents.length > this.MIN_ADDRESS_LENGTH) {
            this.googleAddressLookup(contents);
        } else {
            EG.UI.geoTypeMore();
            this.reset();
        }
    };
    EG.GeoSetup.prototype.googleAddressLookup = function(text) {
        var geocoder = new google.maps.Geocoder();
        var this_ref =  this;
        if (geocoder) {
            geocoder.geocode({
                'address': text
            }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var point = results[0].geometry.location;
                    this_ref.verifyLocation(point);
                } else {
                    EG.UI.geoError();
                    this_ref.reset();
                }
            });
        }
    };
    EG.GeoSetup.prototype.reset = function() {
        EG.player.resetLocation();
        EG.Weather.reset();
        this.hasGeolocated = false;
        if (this.marker) { 
            this.marker.setMap(null);
        }
    };
    EG.GeoSetup.prototype.verifyLocation = function(currLocation) {
        // clear all markers
        if (this.marker) {
            this.marker.setMap(null);
        }
        if (!currLocation) {
            this.reset();
            return;
        }

        this.marker = new google.maps.Marker({ 
            title: 'Current Location',
            map: this.map, 
            position: currLocation 
        });

        this.map.setCenter(currLocation);

        this.hasGeolocated = true;
        EG.player.setLocation(currLocation.lat(), currLocation.lng());

        EG.UI.geoFound();
        EG.Weather.initWeather();
    };
})();
