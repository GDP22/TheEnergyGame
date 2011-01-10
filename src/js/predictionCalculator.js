(function () {
    EG.predictionCalc = {
        base_emissions : 0,
        //calcuation scope;
        scope : 480, // 480 = monthly, 40 = yearly, 172800 = daily ...
        delay_rate : 1/172800, // rate of delay for implementation
        localSupplyDemandRatio : 1.0,
        localEmissionsDemandRatio : 1.0,
        localSupplyEmissionRatio : 1.0,
        calcEquation: function (y0, y1, y2, x0, x1, x2) {
            var a = 0;
            var b = 0;
            var c = 0;
            var numx0 = parseFloat(x0);
            var numx1 = parseFloat(x1);
            var numx2 = parseFloat(x2);
            var numy0 = parseFloat(y0);
            var numy1 = parseFloat(y1);
            var numy2 = parseFloat(y2);
            var x0sq = numx0 * numx0;
            var x1sq = numx1 * numx1;
            var x2sq = numx2 * numx2;
            var k0 = 0;
            var z1 = 0;
            var f0 = 0;
            var z0 = 0;
            if (numx0 !== 0) {
                k0 = (numx0 * x1sq) - (numx1 * x0sq);
                var m0 = (x1sq - x0sq);
                z0 = (numy0 * x1sq) - (numy1 * x0sq);
                var k1 = (numx0 * x2sq) - (numx2 * x0sq);
                var m1 = (x2sq - x0sq);
                z1 = (numy0 * x2sq) - (numy2 * x0sq);
                f0 = z0 * k1;
                var f1 = z1 * k0;
                c = (f0 - f1) / ((m0 * k1) - (m1 * k0));
                b = (z0 - (c * m0)) / k0;
                a = (numy1 - c - (b * numx1)) / x1sq;
            } else {
                c = numy0;
                k0 = (numx1 * x2sq) - (numx2 * x1sq);
                z0 = ((numy1 - c) * x2sq) - ((numy2 - c) * x1sq);
                b = z0 / k0;
                z1 = numy2 - c;
                a = (z1 - (b * numx2)) / x2sq;
            }
            return [a, b, c];
        },

        calcNewTrajEmissions: function (type, y0, y1, newPercent, time) {
            var baseVal = parseFloat(y0);
            var pivot = parseFloat(y1);
            var newp = parseFloat(newPercent);
            var curT = parseFloat(time);
            var newChangeRate = (((baseVal * newp) - baseVal) / this.scope);
            var newEndVal = pivot + (newChangeRate * (this.scope - curT));
            var newoffset;
            var offsetTime;
            if (curT > this.scope-1) {
                newoffset = (EG.demandData.demand_emission_eq[type][0] * (this.scope * this.scope)) + (EG.demandData.demand_emission_eq[type][1] * this.scope) + (EG.demandData.demand_emission_eq[type][2]);
                offsetTime = this.scope;
            } else {
                offsetTime = curT + (this.scope*this.delay_rate);
                newoffset = (EG.demandData.demand_emission_eq[type][0] * (offsetTime * offsetTime)) + (EG.demandData.demand_emission_eq[type][1] * offsetTime) + (EG.demandData.demand_emission_eq[type][2]);
            }
            if (newEndVal == pivot) {
                newEndVal = newoffset;
            }
            return this.calcEquation(pivot.toString(), newoffset.toString(), newEndVal.toString(), curT.toString(), offsetTime.toString(), this.scope.toString());
        },

        calcNewTrajEnergy: function (type, y0, y1, newPercent, time) {
            var baseVal = parseFloat(y0);
            var pivot = parseFloat(y1);
            var newp = parseFloat(newPercent);
            var curT = parseFloat(time);
            var newChangeRate = (((baseVal * newp) - baseVal) / this.scope);
            var newEndVal = pivot + (newChangeRate * (this.scope - curT));
            var newoffset;
            var offsetTime;
            if (curT > this.scope-1) {
                newoffset = (EG.demandData.demand_energy_eq[type][0] * (this.scope * this.scope)) + (EG.demandData.demand_energy_eq[type][1] * this.scope) + (EG.demandData.demand_energy_eq[type][2]);
                offsetTime = this.scope;
            }
            else {
                offsetTime = curT + (this.scope*this.delay_rate);
                newoffset = (EG.demandData.demand_energy_eq[type][0] * (offsetTime * offsetTime)) + (EG.demandData.demand_energy_eq[type][1] * offsetTime) + (EG.demandData.demand_energy_eq[type][2]);
            }
            if (newEndVal == pivot) {
                newEndVal = newoffset;
            }
            return this.calcEquation(pivot.toString(), newoffset.toString(), newEndVal.toString(), curT.toString(), offsetTime.toString(), this.scope.toString());
        },

        init: function () {
            this.init_trajectories();
            var val = this.init_demand_rate();
            var val2 = this.init_emissions_rate();
            this.setLocalSupplyDemandRatio(208, val);
            this.setLocalEmissionsDemandRatio(600, val2);
            return EG.demandData.demand_emission_eq;
        },


        init_trajectories: function () {
            for (var a = 0; a < 9; a++) {
                EG.demandData.demand_trajectories[EG.demandData.demand_categories[a]] = 1;
            }
        },

        setLocalSupplyDemandRatio: function(supplyVal, demandVal) {
            var baseRatio = parseFloat(EG.demandData.demand_supply_ratio);
            this.localSupplyDemandRatio = (parseFloat(supplyVal)/parseFloat(demandVal))*baseRatio;
            return this.localSupplyDemandRatio;
        },

        setLocalEmissionsDemandRatio: function(overallEmisVal, demandEmisVal){
            var baseRatio = parseFloat(EG.demandData.demand_emission_ratio);
            this.localEmissionsDemandRatio = (parseFloat(overallEmisVal)/parseFloat(demandEmisVal))*baseRatio;
            return this.localEmissionsDemandRatio;
        },

        setLocalEmissionsSupplyRatio: function(){
            this.localSupplyEmissionRatio = 3/5;
        },

        init_demand_rate: function () {
            var demand_rate = 0;
            for (var a = 0; a < 9; a++) {
                var base_rate = EG.demandData.jsondata[EG.demandData.demand_categories[a]].eng_base;
                var base_change =
                EG.demandData.jsondata[EG.demandData.demand_categories[a]].energy["1"].base_change;
                var end_rate = base_rate * base_change;
                var offset = base_rate + ((((base_rate * base_change) - base_rate) / this.scope) * (this.scope*this.delay_rate));
                var equation = this.calcEquation(base_rate.toString(), offset.toString(), end_rate.toString(), "0", (this.scope*this.delay_rate), this.scope);
                EG.demandData.demand_energy_eq[EG.demandData.demand_categories[a]][0] = equation[0];
                EG.demandData.demand_energy_eq[EG.demandData.demand_categories[a]][1] = equation[1];
                EG.demandData.demand_energy_eq[EG.demandData.demand_categories[a]][2] = equation[2];
                demand_rate += equation[2];
            }
            return (demand_rate);
        },

        init_emissions_rate: function () {
            this.base_emissions = 0;
            for (var a = 0; a < 9; a++) {
                var base_rate =
                EG.demandData.jsondata[EG.demandData.demand_categories[a]].base;
                var base_change =
                EG.demandData.jsondata[EG.demandData.demand_categories[a]].emissions["1"].base_change;
                var end_rate = base_rate * base_change;
                var offset = base_rate + ((((base_rate * base_change) - base_rate) / this.scope) * (this.scope*this.delay_rate));
                var equation = this.calcEquation(base_rate.toString(), offset.toString(), end_rate.toString(), "0", (this.scope*this.delay_rate), this.scope);
                EG.demandData.demand_emission_eq[EG.demandData.demand_categories[a]][0] = equation[0];
                EG.demandData.demand_emission_eq[EG.demandData.demand_categories[a]][1] = equation[1];
                EG.demandData.demand_emission_eq[EG.demandData.demand_categories[a]][2] = equation[2];
                this.base_emissions += equation[2];
            }
            return this.base_emissions;
        },

        decison_maker: function (type, traj_no, month) {
            EG.demandData.demand_trajectories[type] = traj_no;
            var currentVal = (EG.demandData.demand_emission_eq[type][0] * (month * month)) + (EG.demandData.demand_emission_eq[type][1] * month) + (EG.demandData.demand_emission_eq[type][2]);
            var beginVal = EG.demandData.jsondata[type].base;
            var newPercent = EG.demandData.jsondata[type].emissions[traj_no].base_change;
            EG.demandData.demand_emission_eq[type] = this.calcNewTrajEmissions(type, beginVal, currentVal, newPercent, month);
            currentVal = (EG.demandData.demand_energy_eq[type][0] * (month * month)) + (EG.demandData.demand_energy_eq[type][1] * month) + (EG.demandData.demand_energy_eq[type][2]);
            beginVal = EG.demandData.jsondata[type].eng_base;
            newPercent = EG.demandData.jsondata[type].energy[traj_no].base_change;
            EG.demandData.demand_energy_eq[type] = this.calcNewTrajEnergy(type, beginVal, currentVal, newPercent, month);
            return EG.demandData.demand_energy_eq[type];
        },

        getEmissionRatio: function (year) {
            var current_emission_rate = 0;
            for (var a = 0; a < 9; a++) {
                current_emission_rate += (EG.demandData.demand_emission_eq[EG.demandData.demand_categories[a]][0] * (year * year)) + (EG.demandData.demand_emission_eq[EG.demandData.demand_categories[a]][1] * year) + (EG.demandData.demand_emission_eq[EG.demandData.demand_categories[a]][2]);
            }
            return (current_emission_rate/this.base_emissions);
        },

        getEmission: function (year) {            
            var current_emission_rate = 0;
            for (var a = 0; a < 9; a++) {
                current_emission_rate += ((EG.demandData.demand_emission_eq[EG.demandData.demand_categories[a]][0] * (year * year)) + (EG.demandData.demand_emission_eq[EG.demandData.demand_categories[a]][1] * year) + (EG.demandData.demand_emission_eq[EG.demandData.demand_categories[a]][2])) * this.localEmissionsDemandRatio;
            }
            return current_emission_rate;
        },

        getDemand: function (year) {
            var demand_rate = 0;
            for (var a = 0; a < 9; a++) {
                demand_rate += ((EG.demandData.demand_energy_eq[EG.demandData.demand_categories[a]][0] * (year * year)) + (EG.demandData.demand_energy_eq[EG.demandData.demand_categories[a]][1] * year) + (EG.demandData.demand_energy_eq[EG.demandData.demand_categories[a]][2])) * this.localSupplyDemandRatio;
            }
            return demand_rate;
        },

        predictDemand: function(curMonth, EndMonth){
            var predictionArray = [];
            for (var a = curMonth; a < EndMonth; a++){
                var demand = this.getDemand(a);
                predictionArray[a - curMonth]=demand;
            }
            return predictionArray;
        },

        predictEmissions: function(curMonth, EndMonth, supplyEmissions){
            var predictionArray = [];
            for (var a = curMonth; a < EndMonth; a++){
                predictionArray[a - curMonth]= (supplyEmissions*EG.predictionCalc.getEmissionRatio(a)) * EG.config.emissionScale;
            }
            return predictionArray;
        },
        
        test : function () {
            this.init();
            this.setLocalSupplyDemandRatio("56700", "149.208");
            var a = this.predictDemand(475,480);
            var predictions = "";
            for (var k = 0; k < a.length; k++){
                predictions += a[k] + ",";
            }
            console.log(predictions);
        /*for (var a = 0; a < 480; a++){
                if(a == 0){
                    this.decison_maker("ind_proc","2","0");
                    console.log("Industrial processes, trajectory 2: " + EG.demandData.jsondata['ind_proc']['info']['2']['quote']);
                } else if (a == 12){
                    this.decison_maker("dom_heat","2","12");
                    console.log("Domestic Heating, trajectory 2: " + EG.demandData.jsondata['dom_heat']['info']['2']['quote']);
                } else if (a == 24){
                    this.decison_maker("ind_proc","3","24");
                    console.log("Industrial processes, trajectory 3: " + EG.demandData.jsondata['ind_proc']['info']['3']['quote']);
                    this.decison_maker("com_light","2","24")
                    console.log("Commercial Lighting, trajectory 2: " + EG.demandData.jsondata['com_light']['info']['3']['quote']);
                } else if (a == 48){
                    this.decison_maker("dom_heat","3","48");
                    console.log("Domestic Heating, trajectory 3: " + EG.demandData.jsondata['dom_heat']['info']['3']['quote']);
                    this.decison_maker("dom_trans","2","48")
                    console.log("Domestic Transport, trajectory 2: " + EG.demandData.jsondata['dom_trans']['info']['2']['quote']);
                    this.decison_maker("com_light","3","48")
                    console.log("Commercial Lighting, trajectory 3: " + EG.demandData.jsondata['com_heat']['info']['2']['quote']);
                } else if (a == 62){
                    this.decison_maker("dom_trans","4","62")
                    console.log("Domestric Transport, trajectory 4: " + EG.demandData.jsondata['dom_trans']['info']['4']['quote']);
                } else if (a == 128){
                    this.decison_maker("com_light","4","128")
                    console.log("Commercial Lighting, trajectory 4: " + EG.demandData.jsondata['com_light']['info']['4']['quote']);
                    this.decison_maker("dom_heat","4","128");
                    console.log("Domestic Heating, trajectory 4: " + EG.demandData.jsondata['dom_heat']['info']['4']['quote']);
                }
                else {
            //do nothing
            }
            //console.log(a + "," + this.getDemand(a) + "," + this.getEmission(a));
            }*/
        }
    };
})();
