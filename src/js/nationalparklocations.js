(function () {
    EG.addNationalParks = function(map) {
         var nationalParks = [
            // Format:
            // [top left, bottom right]
            [{x: 16, y: 30}, {x:18, y:34}], // Cairngorms
            [{x: 19, y: 23}, {x:21, y:24}], // Lock Lomond and the Trossachs
            [{x: 33, y: 36}, {x:35, y:37}], // Northumberland
            [{x: 37, y: 33}, {x:39, y:34}], // Lake District
            [{x: 40, y: 35}, {x:41, y:35}], // Yorkshire Dales
            [{x: 40, y: 42}, {x:41, y:44}], // North Yorks Moors
            [{x: 39, y: 37}, {x:41, y:38}], // Peak District
            [{x: 53, y: 55}, {x:54, y:55}], // Broads Authority
            [{x: 50, y: 27}, {x:52, y:28}], // Snowdonia
            [{x: 58, y: 29}, {x:59, y:32}], // Brecon Beacons
            [{x: 59, y: 24}, {x:61, y:24}], // Pembrokeshire Coast
            [{x: 65, y: 31}, {x:65, y:32}], // Exmoor
            [{x: 68, y: 29}, {x:70, y:30}], // Dartmoor
            [{x: 66, y: 39}, {x:67, y:40}] // New Forest
        ];

        for(var i = 0; i < nationalParks.length; i++) {
            var park = nationalParks[i];

            // For each cell that falls under the area of a national park,
            // don't let the person build.
            for(var x = park[0].x; x <= park[1].x; x++) {
                for(var y = park[0].y; y <= park[1].y; y++) {
                    var workingCell = map.findCellByRowCol(x, y);
                    workingCell.type = EG.CellTypes.NOBUILDNATIONALPARK;
                }
            }
        }
   };
})();
