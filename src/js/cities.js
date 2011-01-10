(function () {

    // Store a list of cities with a position, radius, name, and population. At
    // runtime we can calculate which cells are wrapped in each city's
    // population radius and add the population to those areas. This assumes
    // all cities are circular.
    function City(name, lat, lng, population, SWLat, SWLng, NELat, NELng, popGrowth) {
        this.name = name;
        this.lng = lng;
        this.lat = lat;
        this.population = population;
        this.SWLat = SWLat;
        this.SWLng = SWLng;
        this.NELat = NELat;
        this.NELng = NELng;
        this.popGrowth = popGrowth;
        this.radius = null; // not known
        this.isRealCity = true;
    }

    var populationData = [
    new City("London",51.5001524,-0.1262362,7172091.0,51.3493528,-0.378358,51.7040647,0.1502295,0.1),
    new City("Birmingham",52.4829614,-1.893592,970892.0,52.381063,-2.033651,52.60687,-1.74763,0.1),
    new City("Glasgow",55.8656274,-4.2572227,629501.0,55.796184,-4.393145,55.920384,-4.0902182,0.1),
    new City("Liverpool",53.4107766,-2.9778383,469017.0,53.36489,-3.008791,53.474867,-2.822063,0.1),
    new City("Leeds",53.7996388,-1.5491221,443247.0,53.698999,-1.800359,53.896898,-1.34885,0.1),
    new City("Sheffield",53.3830548,-1.4647953,439866.0,53.309898,-1.573648,53.456431,-1.325576,0.1),
    new City("Edinburgh",55.9501755,-3.1875359,430082.0,55.894729,-3.3285119,55.991662,-3.077505,0.1),
    new City("Bristol",51.4553129,-2.5919023,420556.0,51.397279,-2.72358,51.54442,-2.510429,0.1),
    new City("Manchester",53.4807125,-2.2343765,394269.0,53.3588929,-2.319934,53.544603,-2.147026,0.1),
    new City("Leicester",52.6347704,-1.1295191,330574.0,52.580667,-1.215979,52.691522,-1.046205,0.1),
    new City("Coventry",52.4058375,-1.512661,303475.0,52.363887,-1.605886,52.458581,-1.42394,0.1),
    new City("Kingston upon Hull",53.7443412,-0.3324433,301416.0,53.710582,-0.422572,53.813266,-0.241393,0.1),
    new City("Bradford",53.793853,-1.7524422,293717.0,53.763591,-1.837304,53.858452,-1.696336,0.1),
    new City("Cardiff",51.4813069,-3.1804979,292150.0,51.447362,-3.278624,51.5465853,-3.082587,0.1),
    new City("Belfast",54.5972686,-5.9301088,276459.0,54.543241,-6.0361161,54.6484968,-5.8207101,0.1),
    new City("Stoke-on-Trent",53.0265029,-2.176636,259252.0,52.946305,-2.238801,53.092722,-2.079241,0.1),
    new City("Wolverhampton",52.5857278,-2.1292507,251462.0,52.543947,-2.206829,52.616322,-2.089101,0.1),
    new City("Nottingham",52.9551147,-1.1491718,249584.0,52.88903,-1.246954,53.018695,-1.086116,0.1),
    new City("Plymouth",50.3703805,-4.142653,243795.0,50.3320883,-4.209496,50.444179,-4.019643,0.1),
    new City("Southampton",50.904966,-1.403234,234224.0,50.871498,-1.479036,50.956169,-1.3221,0.1),
    new City("Reading",51.455041,-0.9690884,232662.0,51.409779,-1.052995,51.49313,-0.928323,0.1),
    new City("Derby",52.9218993,-1.475642,229407.0,52.861056,-1.556856,52.968184,-1.383076,0.1),
    new City("Dudley",52.508672,-2.0873354,194919.0,52.429765,-2.191695,52.557702,-2.057189,0.1),
    new City("Newcastle upon Tyne",54.9778404,-1.6129165,189863.0,54.959033,-1.6977239,55.025058,-1.596931,0.1),
    new City("Northampton",52.2368744,-0.8973906,189474.0,52.204098,-0.960966,52.282776,-0.791367,0.1),
    new City("Portsmouth",50.7989137,-1.0911627,187056.0,50.777147,-1.17497,50.8593,-1.018493,0.1),
    new City("Luton",51.879652,-0.417558,185543.0,51.854329,-0.5050518,51.927803,-0.349838,0.1),
    new City("Preston",53.7577292,-2.7034403,184836.0,53.74809,-2.765664,53.800848,-2.621143,0.1),
    new City("Aberdeen",57.1474915,-2.095397,184788.0,57.107695,-2.1899763,57.2134174,-2.0641046,0.1),
    new City("Milton Keynes",52.0422,-0.7047,184506.0,52.02472,-0.724648,52.063362,-0.674491,0.1),
    new City("Sunderland",54.9044493,-1.3814533,177739.0,54.85762,-1.41661,54.944173,-1.345665,0.1),
    new City("Norwich",52.6281014,1.2993494,174047.0,52.598032,1.20388,52.684934,1.342283,0.1),
    new City("Walsall",52.5859475,-1.9822895,170994.0,52.551586,-2.068054,52.640933,-1.930464,0.1),
    new City("Swansea",51.6204415,-3.9466286,169880.0,51.598834,-4.029331,51.68983,-3.8621388,0.1),
    new City("Bournemouth",50.7216814,-1.8785266,167527.0,50.708381,-1.93759,50.780377,-1.7401247,0.1),
    new City("Southend-on-Sea",51.540905,0.71149,160257.0,51.504466,0.622825,51.576801,0.848965,0.1),
    new City("Swindon",51.5584185,-1.7819851,155432.0,51.530333,-1.865142,51.597891,-1.719477,0.1),
    new City("Dundee",56.4614282,-2.9681109,154674.0,56.451371,-3.07452,56.502533,-2.8355701,0.1),
    new City("Huddersfield",53.6451559,-1.7849275,146234.0,53.554638,-2.009471,53.694449,-1.725224,0.1),
    new City("Poole",50.7194116,-1.9811296,144800.0,50.6810562,-2.042679,50.79888,-1.891233,0.1),
    new City("Oxford",51.7522792,-1.2558838,143016.0,51.724341,-1.304457,51.796305,-1.144593,0.1),
    new City("Middlesbrough",54.5730073,-1.2379106,142691.0,54.506179,-1.285384,54.591523,-1.166542,0.1),
    new City("Blackpool",53.814165,-3.0535135,142283.0,53.773114,-3.076422,53.875914,-2.983541,0.1),
    new City("Bolton",53.5784742,-2.4299152,139403.0,53.526268,-2.552062,53.646042,-2.337043,0.1),
    new City("Ipswich",52.0593085,1.1556722,138718.0,52.023536,1.106876,52.087565,1.21645,0.1),
    new City("Telford",52.6777266,-2.449284,138241.0,52.645995,-2.49326,52.6883144,-2.409088,0.1),
    new City("York",53.9577018,-1.0822855,137505.0,53.923807,-1.147268,53.981535,-1.0315009,0.1),
    new City("West Bromwich",52.519288,-1.99987,136940.0,52.460709,-2.0971002,52.569037,-1.921566,0.1),
    new City("Peterborough",52.5702461,-0.2437337,136292.0,52.528114,-0.307098,52.633957,-0.173104,0.1),
    new City("Stockport",53.4084881,-2.1492931,136082.0,53.374446,-2.215529,53.454771,-2.095752,0.1),
    new City("Brighton",50.819522,-0.13642,134293.0,50.7979886,-0.245071,50.892367,-0.016023,0.1),
    new City("Slough",51.5093466,-0.5954477,126276.0,51.4904842,-0.660061,51.538905,-0.5251377,0.1),
    new City("Gloucester",51.8667425,-2.2486699,123205.0,51.82086,-2.288445,51.884927,-2.177611,0.1),
    new City("Watford",51.6548556,-0.3982031,120960.0,51.637105,-0.43135,51.701973,-0.340092,0.1),
    new City("Rotherham",53.4301709,-1.3568967,117262.0,53.4025,-1.4479809,53.515279,-1.289711,0.1),
    new City("Newport",51.5877406,-2.9983431,116143.0,51.549936,-3.07195,51.621386,-2.970463,0.1),
    new City("Cambridge",52.2025441,0.1312368,113442.0,52.164513,0.087296,52.237704,0.18453,0.1),
    new City("Cheltenham",51.8979906,-2.0713084,110013.0,51.858278,-2.143021,51.91945,-2.010228,0.1),
    new City("Exeter",50.7218,-3.533617,106772.0,50.673168,-3.57023,50.761455,-3.451115,0.1),
    new City("Eastbourne",50.7668678,0.2848044,106562.0,50.750758,0.244138,50.8132927,0.3280998,0.1),
    new City("Sutton Coldfield",52.558828,-1.802954,105452.0,52.4645447,-1.926727,52.6251693,-1.5967555,0.1),
    new City("Blackburn",53.7500998,-2.4847106,105085.0,53.675324,-2.53001,53.781816,-2.439372,0.1),
    new City("Colchester",51.8898042,0.9012348,104390.0,51.844767,0.844586,51.929022,0.962624,0.1),
    new City("Oldham",53.541277,-2.117662,103544.0,53.491138,-2.185708,53.58647,-2.048593,0.1)

    ];

    // Define an average citizen. This is given to every city initially and
    // modified throughout the course of the game.
    function AverageCitizen() {
        this.happiness = 0.5;

        // The 'typical affluent person's' energy demands are 195kWh per day
        // (see book page 116).

        // 195 kWh per day = 5931.25 kWH per month
        // Convert from kWh/day to tWh/month
        this.demand = 125 * ((365 / 1000000000) / 12);
    }

    // Function to, when given the map, iterate over the list of cities and add
    // a population to each of the grid cells based on the map's grid cell
    // width and height.
    generatePopulations = function(map, cityToCell) {
        // Before adding the city data to the map, generate some random 'noise'
        // in order to make the map look more complicated.

        // For each map cell of CellTypes.GROUND, generate a random value. If
        // it's above a certain value, add a random (low) population.
        for(var x = 0; x < EG.model.map.gameMap.length; x++) {
            for(var y = 0; y < EG.model.map.gameMap[0].length; y++) {
                var cell = EG.model.map.gameMap[x][y];
                if(cell.type == EG.CellTypes.GROUND) {
                    // Create a random city

                    // Add a random population to the area.
                    var population = Math.round(Math.random() * 800);

                    var city = new City("Populated Area", 0, 0, population, 0, 0, 0, 0, 0.1);
                    city.averageCitizen = new AverageCitizen();
                    city.isRealCity = false;

                    cell.city = city;
                    cell.population = population;
                }
            }
        }

        // Fn applied to each cell within an AoE.
        function addCityToCell(cell, dropOffPercent) {
            cell.city = thisCity;

            var obj = new EG.GameObject(EG.GameObjectNames.City);
            var pos = new EG.Position(cell.x, cell.y);
            var img = EG.textureLibrary.get('images/city.png');
            var animation = new EG.Animation(img, pos, 1, 1, EG.model.map.tileWidth, EG.model.map.tileHeight);
            obj.decorateWith(pos);
            obj.decorateWith(animation);
            cell.cityAnimation = obj;

            cell.population = thisCity.population / 100 * dropOffPercent;

            // If there's already a building on this cell, kill it.
            cell.contents = [];
        }
        // Loop over the population structure adding population of the city to
        // the tiles that fall within it's radius.
        for (var i = 0; i < populationData.length; i++) {
            var thisCity = populationData[i];

            // Convert the city's X and Y to grid coordinates
            var cityX = EG.latlngToIndex(thisCity.lat, thisCity.lng, map).x;
            var cityY = EG.latlngToIndex(thisCity.lat, thisCity.lng, map).y;

            if (cityX > 0 && cityX < map.length && cityY < map[0].length && cityY > 0) {
                map[cityX][cityY].population = thisCity.population;
                EG.model.map.totalPopulation += thisCity.population;

                EG.model.map.cityToCellMap[thisCity.name] = map[cityX][cityY];
            }

            // Calculate the radius of the city so that we can calculate an
            // area of effect. Height and width are both stored as latitude and
            // longitude units, so convert these into meters, find the average
            // of width and height, then use that value as the radius of the
            // city.

            // Perform the conversion for the top left and bottom right coordinates
            var bottomLeft = EG.latlngToIndex(thisCity.SWLat, thisCity.SWLng, map);
            var topRight = EG.latlngToIndex(thisCity.NELat, thisCity.NELng, map);

            // Now perform the same transformation for our coordinate.
            var cityHeight = bottomLeft.y - topRight.y;
            var cityWidth = topRight.x - bottomLeft.x;

            // Note, divide by two gives by diameter, 4 is radius
            var radius = Math.floor((cityHeight + cityWidth) / 4);

            thisCity.radius = radius;
            thisCity.averageCitizen = new AverageCitizen();

            // Now that we have a radius for the city and it's positions, set
            // all areas within it's radius to hold the same city.
            EG.Effects.areaOfEffect({row: cityY, col: cityX}, radius, addCityToCell);
        }
    };

    EG.initialisePopulation = function(map) {
        generatePopulations(map.gameMap);
    };

})();
