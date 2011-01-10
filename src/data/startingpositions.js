(function () {
var x = 0; var y = 0, thisPos = {};
EG.initialiseUKBuildings = function(map) {
    thisPos = EG.latlngToIndex(54.179089,-7.312155,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.3796, 536);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(50.392482,-4.931883,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.1022, 441);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(55.643326,-4.811922,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.WindTurbine).fn(thisX * 60, thisY * 60, true,0.01752, 246);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(54.597269,-5.930109,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.WindTurbine).fn(thisX * 60, thisY * 60, true,0.0146, 285);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(55.213821,-1.542343,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.3066, 436);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(56.818798,-5.109657,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.04526, 1124);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(56.712990,-4.965301,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.0219, 1188);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(51.616171,-3.818321,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.41975, 377);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(51.536279,0.081478,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CCGT).fn(thisX * 60, thisY * 60, true,0.73, 1105);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(54.245400,-3.138630,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.WindTurbine).fn(thisX * 60, thisY * 60, true,0.00365, 252);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(51.508019,-3.229536,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.WindTurbine).fn(thisX * 60, thisY * 60, true,0.00657, 265);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(52.555565,-3.530456,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.WindTurbine).fn(thisX * 60, thisY * 60, true,0.02482, 366);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(57.671856,-4.318015,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.WindTurbine).fn(thisX * 60, thisY * 60, true,0.01241, 381);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(53.353546,-4.417900,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.WindTurbine).fn(thisX * 60, thisY * 60, true,0.0146, 335);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(56.535430,-4.237430,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.WindTurbine).fn(thisX * 60, thisY * 60, true,0.00584, 320);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(54.356677,-2.634301,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.WindTurbine).fn(thisX * 60, thisY * 60, true,0.00511, 362);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(54.748795,-1.815122,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.WindTurbine).fn(thisX * 60, thisY * 60, true,0.00146, 406);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(50.919325,0.965280,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.Nuclear).fn(thisX * 60, thisY * 60, true,0.8103, 706);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(54.682492,-1.216697,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.Nuclear).fn(thisX * 60, thisY * 60, true,0.8833, 689);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(54.046000,-2.894000,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.Nuclear).fn(thisX * 60, thisY * 60, true,0.8395, 636);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(54.046000,-2.894000,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.Nuclear).fn(thisX * 60, thisY * 60, true,0.9125, 617);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(51.205848,-3.138485,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.Nuclear).fn(thisX * 60, thisY * 60, true,0.8906, 700);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(52.207010,1.621664,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.Nuclear).fn(thisX * 60, thisY * 60, true,0.86724, 793);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(55.722808,-4.878220,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.Nuclear).fn(thisX * 60, thisY * 60, true,0.8687, 592);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(57.311227,-4.359545,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.Nuclear).fn(thisX * 60, thisY * 60, true,0.9125, 693);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(53.704044,-1.149976,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,1.4308, 519);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(40.623139,-74.599067,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.NaturalGas).fn(thisX * 60, thisY * 60, true,0.0073, 642);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(51.129457,0.907044,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.NaturalGas).fn(thisX * 60, thisY * 60, true,0.0073, 636);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(51.713673,-3.445089,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.NaturalGas).fn(thisX * 60, thisY * 60, true,0.0073, 557);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(50.919325,0.965280,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.Nuclear).fn(thisX * 60, thisY * 60, true,0.3285, 760);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(52.501212,-2.015496,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.Nuclear).fn(thisX * 60, thisY * 60, true,0.31682, 635);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(52.207010,1.621664,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.Nuclear).fn(thisX * 60, thisY * 60, true,0.3066, 637);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(53.167672,-3.117033,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.Nuclear).fn(thisX * 60, thisY * 60, true,0.7154, 689);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(52.947873,-3.988934,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.02044, 1046);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(53.743239,-0.234822,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CCGT).fn(thisX * 60, thisY * 60, true,0.876, 1141);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(52.639190,-3.717663,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.WindTurbine).fn(thisX * 60, thisY * 60, true,0.01095, 246);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(56.980884,-7.456796,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CCGT).fn(thisX * 60, thisY * 60, true,0.1825, 1214);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(53.552087,-0.484859,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CCGT).fn(thisX * 60, thisY * 60, true,0.1752, 1303);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(53.616510,-0.257315,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CCGT).fn(thisX * 60, thisY * 60, true,0.4745, 1093);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(52.751961,0.395357,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CCGT).fn(thisX * 60, thisY * 60, true,0.2482, 1210);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(52.570246,-0.243734,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CCGT).fn(thisX * 60, thisY * 60, true,0.2774, 1198);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(54.113843,-3.188191,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CCGT).fn(thisX * 60, thisY * 60, true,0.16717, 1118);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(50.649780,-4.538880,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.WindTurbine).fn(thisX * 60, thisY * 60, true,0.00511, 367);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(51.519053,-0.103761,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.02263, 394);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(54.596556,-7.412562,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CCGT).fn(thisX * 60, thisY * 60, true,0.3066, 1246);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(52.489201,-0.679601,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CCGT).fn(thisX * 60, thisY * 60, true,0.29273, 1238);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(51.525244,-3.239561,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CCGT).fn(thisX * 60, thisY * 60, true,0.54969, 1202);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(53.389377,-1.696756,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.17228, 506);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(53.729205,-0.977105,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,2.8251, 421);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(53.729205,-0.977105,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.05475, 432);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(52.769002,0.188640,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CCGT).fn(thisX * 60, thisY * 60, true,0.584, 1096);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(54.068375,-0.481665,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,1.46584, 460);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(54.277418,-1.976350,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,1.43956, 468);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(53.428993,-2.240050,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.0292, 416);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(53.567368,-2.460093,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.02774, 496);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(51.118707,0.858412,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,1.4162, 540);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(52.628583,-2.485118,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.7081, 482);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(52.725161,-1.067990,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,1.46, 455);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(51.342043,0.583525,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.4745, 446);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(53.476587,-2.282477,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.04015, 352);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(51.118707,0.858412,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.02482, 422);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(52.725161,-1.067990,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.02482, 499);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(53.455853,-2.301377,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.09636, 474);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(53.215961,-3.049152,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CCGT).fn(thisX * 60, thisY * 60, true,1.0074, 1258);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(54.068375,-0.481665,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CCGT).fn(thisX * 60, thisY * 60, true,0.28835, 1305);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(51.655124,-0.028937,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CCGT).fn(thisX * 60, thisY * 60, true,0.28616, 1238);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(53.616510,-0.257315,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CCGT).fn(thisX * 60, thisY * 60, true,0.657, 1183);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(51.662877,-3.947174,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.03577, 1214);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(54.188300,-3.191628,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.WindTurbine).fn(thisX * 60, thisY * 60, true,0.00365, 382);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(54.683333,-7.383333,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.WindTurbine).fn(thisX * 60, thisY * 60, true,0.00365, 173);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(52.095883,1.027590,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.WindTurbine).fn(thisX * 60, thisY * 60, true,0.00146, 226);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(54.843402,-1.468105,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.WindTurbine).fn(thisX * 60, thisY * 60, true,0.00219, 188);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(53.285337,-2.188951,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.WindTurbine).fn(thisX * 60, thisY * 60, true,0.00365, 258);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(51.530746,-0.258001,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.WindTurbine).fn(thisX * 60, thisY * 60, true,0.00584, 308);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(54.835744,-1.661910,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.WindTurbine).fn(thisX * 60, thisY * 60, true,0.00365, 388);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(54.581939,-3.575110,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.WindTurbine).fn(thisX * 60, thisY * 60, true,0.00365, 197);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(53.876831,-1.846111,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.WindTurbine).fn(thisX * 60, thisY * 60, true,0.00365, 266);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(53.673321,0.090751,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.WindTurbine).fn(thisX * 60, thisY * 60, true,0.00657, 319);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(51.662877,-3.947174,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.WindTurbine).fn(thisX * 60, thisY * 60, true,0.00146, 403);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(56.106053,-3.158116,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.WindTurbine).fn(thisX * 60, thisY * 60, true,0.0438, 269);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(54.665575,-3.549987,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.WindTurbine).fn(thisX * 60, thisY * 60, true,0.00292, 238);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(50.506105,-4.882971,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.WindTurbine).fn(thisX * 60, thisY * 60, true,0.00365, 217);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(54.961149,-2.083233,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.12264, 565);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(53.552087,-0.484859,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.00949, 577);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(52.321794,1.145957,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.00949, 530);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(52.414569,0.752958,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.02847, 534);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(54.749524,-1.359966,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.1314, 467);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(54.878706,-3.047953,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.WindTurbine).fn(thisX * 60, thisY * 60, true,0.00292, 407);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(52.607693,1.732991,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CCGT).fn(thisX * 60, thisY * 60, true,0.3066, 1229);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(53.576464,-0.064732,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CCGT).fn(thisX * 60, thisY * 60, true,0.57305, 1172);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(53.576464,-0.064732,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CCGT).fn(thisX * 60, thisY * 60, true,0.38471, 1085);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(53.615610,-0.211272,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.53582, 494);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(53.202661,-3.030351,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CCGT).fn(thisX * 60, thisY * 60, true,0.365, 1068);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(52.757038,-1.934610,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.73438, 475);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(53.496299,-2.278721,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.0365, 347);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(53.132527,-4.114295,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,1.26144, 533);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(52.958802,-3.936329,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.2628, 416);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(52.315899,-4.056468,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.WindTurbine).fn(thisX * 60, thisY * 60, true,0.00657, 386);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(53.387905,-1.478326,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.WindTurbine).fn(thisX * 60, thisY * 60, true,0.0438, 185);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(51.127698,0.260051,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.0073, 355);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(54.844231,-5.779598,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CCGT).fn(thisX * 60, thisY * 60, true,0.72708, 1305);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(53.317271,-2.712553,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CCGT).fn(thisX * 60, thisY * 60, true,0.5475, 1206);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(56.980884,-7.456796,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,1.06215, 323);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(51.462295,0.355076,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.75117, 445);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(51.606207,-1.240215,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,1.4162, 356);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(50.762371,-1.298609,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.0511, 335);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(53.371833,-2.265223,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.073, 399);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(40.049253,-82.817666,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.02482, 401);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(41.462584,-74.142291,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.07665, 499);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(50.874218,-1.354730,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.35332, 409);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(51.309649,-2.498082,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,1.50015, 543);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(51.606207,-1.240215,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CCGT).fn(thisX * 60, thisY * 60, true,1.0001, 1246);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(52.198998,-0.272862,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CCGT).fn(thisX * 60, thisY * 60, true,0.48545, 1252);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(51.575643,-3.062681,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.0073, 1152);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(53.185325,-3.840608,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.01314, 1106);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(57.315914,-4.810662,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.05037, 1097);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(51.042230,-1.634810,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.02774, 1108);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(57.428377,-4.698883,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.01387, 1070);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(57.438868,-4.564827,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.0146, 1200);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(57.464219,-4.513110,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.0146, 1109);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(56.543921,-4.532696,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.00292, 1028);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(56.543786,-4.457691,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.00803, 1055);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(56.374252,-3.980270,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.03431, 1225);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(56.475339,-4.315923,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.01241, 1034);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(55.887780,-4.156613,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.00219, 1179);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(56.390580,-4.112153,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.01241, 1033);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(57.610269,-4.917859,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.00219, 1056);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(55.867140,-4.123887,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.01387, 1215);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(51.594077,0.078373,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.01387, 1260);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(56.382359,-2.886830,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.02482, 1099);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(53.934528,-1.132294,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.01314, 1197);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(57.252138,-4.490823,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.219, 541);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(57.248620,-4.492690,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.00365, 1153);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(56.910290,-4.986520,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.00146, 1226);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(57.158540,-4.931390,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.0146, 1042);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(57.194109,-4.811630,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.02701, 1202);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(57.066002,-5.288829,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.01387, 1228);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(57.068923,-4.800793,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.0146, 1157);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(56.818798,-5.109657,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.00292, 1136);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(57.982684,-4.588858,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.0073, 1212);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(58.026463,-4.401506,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.00292, 1171);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(58.110809,-4.557469,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.01387, 1059);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(55.883773,-4.246873,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.11169, 1050);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(56.335048,-4.978577,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.00365, 1095);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(57.349300,-6.065135,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.0292, 1216);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(53.128622,-3.220057,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.01095, 1036);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(56.429962,-5.202953,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.01825, 1183);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(56.260699,-5.474738,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.00146, 1222);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(56.061652,-5.339185,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.00438, 1037);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(55.513494,-5.628073,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.00146, 1255);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(55.877672,-4.277759,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.00584, 1058);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(56.676878,-4.444628,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.00584, 1179);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(56.962960,-4.147351,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.00219, 1069);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(56.777663,-4.436298,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.00146, 1243);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(56.698392,-4.462763,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.03212, 1108);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(56.709767,-3.945111,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.02482, 1033);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(56.403874,-3.483503,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.05475, 1102);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(57.540131,-2.607724,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.04453, 1227);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(56.705136,-3.733074,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.01095, 1215);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(59.166667,-2.683333,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.WindTurbine).fn(thisX * 60, thisY * 60, true,0.00584, 379);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(55.478296,-5.677697,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.WindTurbine).fn(thisX * 60, thisY * 60, true,0.00949, 317);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(56.783333,-5.416667,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.00073, 1061);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(57.276110,-5.514100,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.00073, 1102);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(57.476875,-6.170668,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.00146, 1084);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(38.031627,-84.509255,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.00219, 1163);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(52.635449,-1.666756,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,1.1242, 372);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(51.408492,0.587846,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CCGT).fn(thisX * 60, thisY * 60, true,0.50224, 1169);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(56.208208,-3.149517,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CCGT).fn(thisX * 60, thisY * 60, true,0.0876, 1123);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(53.593981,-0.739770,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CCGT).fn(thisX * 60, thisY * 60, true,0.54385, 1253);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(53.711805,-1.274464,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,1.42715, 545);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(53.367439,-2.713841,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,1.43153, 515);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(53.711805,-1.274464,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.02482, 485);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(53.367439,-2.713841,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.02482, 361);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(50.624401,-2.502715,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.NaturalGas).fn(thisX * 60, thisY * 60, true,0.03285, 486);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(51.411281,-1.042234,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.NaturalGas).fn(thisX * 60, thisY * 60, true,0.03285, 688);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(51.403657,-1.260506,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.00657, 358);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(51.044822,-0.435314,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.00657, 428);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(51.461059,-2.119499,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.NaturalGas).fn(thisX * 60, thisY * 60, true,0.0073, 683);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(53.735941,-1.302457,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.NaturalGas).fn(thisX * 60, thisY * 60, true,0.0073, 473);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(58.216001,-6.385931,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.01752, 535);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(60.155581,-1.150037,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.04891, 468);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(57.396959,-6.048078,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.00219, 557);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(58.980370,-2.956315,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.01168, 528);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(57.362707,-7.257717,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.00876, 383);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(55.756946,-6.288278,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.00438, 329);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(56.493238,-6.906971,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.00219, 316);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(56.980884,-7.456796,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.00146, 485);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(55.246724,-4.320228,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.00146, 1285);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(55.128122,-4.173389,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.01022, 1219);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(55.097799,-4.180521,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.01752, 1140);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(55.162500,-4.195420,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.01752, 1019);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(54.862815,-4.032223,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.02409, 1202);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(55.909497,-3.406953,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.00803, 1235);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(55.677085,-3.839598,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.HydroElectric).fn(thisX * 60, thisY * 60, true,0.00365, 1085);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(56.428422,-5.144114,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.29127, 462);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(55.967168,-2.960395,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.84096, 504);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(56.109626,-3.745693,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,1.68192, 503);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(52.170578,-2.808704,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.NaturalGas).fn(thisX * 60, thisY * 60, true,0.0292, 576);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(51.769420,0.005640,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CCGT).fn(thisX * 60, thisY * 60, true,0.52195, 1138);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(54.494621,-6.160886,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CCGT).fn(thisX * 60, thisY * 60, true,0.57816, 1253);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(50.835678,-0.280956,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CCGT).fn(thisX * 60, thisY * 60, true,0.292, 1245);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(55.565999,-5.565210,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.WindTurbine).fn(thisX * 60, thisY * 60, true,0.0219, 292);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(53.285337,-2.188951,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.WindTurbine).fn(thisX * 60, thisY * 60, true,0.00949, 353);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(55.553177,-3.842639,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.WindTurbine).fn(thisX * 60, thisY * 60, true,0.01168, 285);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(55.742701,-6.261699,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.WindTurbine).fn(thisX * 60, thisY * 60, true,0.0219, 308);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(53.781844,-2.259578,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.WindTurbine).fn(thisX * 60, thisY * 60, true,0.0073, 369);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(50.346434,-5.026572,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.WindTurbine).fn(thisX * 60, thisY * 60, true,0.00438, 257);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(50.354115,-3.579383,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.WindTurbine).fn(thisX * 60, thisY * 60, true,0.00365, 326);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(55.041393,-6.300906,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.WindTurbine).fn(thisX * 60, thisY * 60, true,0.00365, 389);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(50.547419,-3.805064,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.WindTurbine).fn(thisX * 60, thisY * 60, true,0.00365, 216);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(57.657871,-4.151575,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CCGT).fn(thisX * 60, thisY * 60, true,0.59276, 1281);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(57.657871,-4.151575,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CCGT).fn(thisX * 60, thisY * 60, true,0.2993, 1158);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(52.585728,-2.129251,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.0146, 506);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(51.485079,-0.046015,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.02336, 548);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(52.786085,-0.150293,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CCGT).fn(thisX * 60, thisY * 60, true,0.65919, 1185);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(54.557940,-1.290760,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CCGT).fn(thisX * 60, thisY * 60, true,1.36875, 1243);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(51.546117,-2.956785,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.28689, 386);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(49.925002,-6.298672,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.00438, 376);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(50.544119,-3.990432,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.00219, 447);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(51.229833,-3.837267,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.00146, 533);
        map[thisX][thisY].addItem(obj);
    }

    thisPos = EG.latlngToIndex(50.444107,-4.432189,map);
    thisX = thisPos.x;
    thisY = thisPos.y;
    if(thisX >= 0 && thisX < map.length && thisY >= 0 && thisY < map[0].length) {
        obj = EG.infoLibrary.get(EG.GameObjectNames.CoalPowerStation).fn(thisX * 60, thisY * 60, true,0.00365, 399);
        map[thisX][thisY].addItem(obj);
    }

}
}) ();