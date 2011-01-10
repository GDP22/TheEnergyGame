(function () {
    EG.Time = function () {
        // array indexed by offset in months from start date of 2010-01-01
        // i.e. offset 14 = 2010-03-01.
        this.data = [];
        this.elapsed = 0;
        this.paused = false;
        this.entryCount = 0;
        this.endMonth = 480;
        this.graph = new EG.Graph(EG.graphCtx);
    };

    EG.Time.prototype.getDataForDate = function (offset) {
        return this.data[offset];
    };

    EG.Time.prototype.tick = function (dt) {

        this.elapsed += dt;
        if (this.elapsed >= EG.config.timeStep) {
            this.elapsed -= EG.config.timeStep;

            var happiness = EG.model.map.getAverageHappiness();
            var totals = EG.model.map.getMapCellsData();
            totals.demand = EG.predictionCalc.getDemand(this.entryCount);
            if (!EG.config.emissionScale){
                EG.config.emissionScale = 646/totals.emissions;
            }
            var scaledEmissions = (totals.emissions*EG.predictionCalc.getEmissionRatio(this.entryCount)) * EG.config.emissionScale;
            totals.happiness = happiness;
            this.data.push(totals);

            if(!EG.config.supplyScale) {
                var targetSupply = 208;
                EG.config.supplyScale = targetSupply / totals.energy_produced;
            }
            var scaledCost = totals.cost * EG.config.supplyScale;
            EG.Effects.modifyMoney(-scaledCost);
            // Change the colour of the information in the left panel if supply
            // is lower than demand.
            var scaledProduction = totals.energy_produced * EG.config.supplyScale;
            if(scaledProduction <= (totals.demand * 0.9)) {
                EG.Effects.modifyPopulationsAverageHappiness(EG.model.map, 0.9);
                EG.UI.gameStatus.energy_supply.removeClass("medium");
                EG.UI.gameStatus.energy_supply.addClass("bad");
            } else if (scaledProduction <= totals.demand * 1.1) {
                EG.Effects.modifyPopulationsAverageHappiness(EG.model.map, 0.999);
                EG.UI.gameStatus.energy_supply.removeClass("bad");
                EG.UI.gameStatus.energy_supply.removeClass("good");
                EG.UI.gameStatus.energy_supply.addClass("medium");
            } else {
                EG.Effects.modifyPopulationsAverageHappiness(EG.model.map, 1.001);
                EG.UI.gameStatus.energy_supply.removeClass("medium");
                EG.UI.gameStatus.energy_supply.addClass("good");
            }

            EG.UI.setEnergySupply(Math.round(scaledProduction));
            EG.UI.setEnergyDemand(Math.round(totals.demand));
            EG.UI.setEmissions(Math.round(scaledEmissions));
            EG.UI.setHappiness(happiness);
            EG.UI.setMoney(EG.player.getMoney());
            //EG.UI.setScore(EG.player.getScore());
            var targetLevel = (430 * ((EG.time.endMonth - this.entryCount) / EG.time.endMonth)) + 170;

            this.graph.addValue(this.entryCount, [scaledProduction, totals.demand, scaledEmissions, targetLevel,  EG.player.getMoney() / 2000000000, happiness / 4 * 100]);
            this.graph.drawStep();

            var dateObj = new Date(2010, 0 + this.entryCount, 1);
            var dateString = sprintf("%02d/%4d", dateObj.getMonth() + 1, dateObj.getFullYear());
            EG.UI.setDate(dateString);

            // Now that we have calculated all of the values needed for
            // scoring, update the player's score.

            // Start with previous turn's score
            var score = EG.player.getScore();

            // Score is a function taking into account:
            // * points gained from building stuff
            // * difference between supply and demand
            // * difference between target emissions and actual emissions

            var netSupply = scaledProduction - totals.demand;
            var netEmissions = scaledEmissions - 180 < 0;

            //if supply and emissions is good (should only occur later in the game)
            if(netSupply > 0 && netEmissions < 0) {
                score += 500;
            //if supply bad and emissions is good
            }else if (netSupply < 0 && netEmissions < 0){
                score -= 10;
            //if supply 'good' and emissions is bad
            }else if (netSupply > 0 && netEmissions > 0){
                score += 10;
            //if supply bad and emissions is bad
            }else if (netSupply < 0 && netEmissions > 0){
                score -= 250;
            }

            /*var happinessScoreWeighting = 0;
            //if people are unhappy do not add to score
            if (happiness > 1.5 && happiness <= 2.5){
                //if they are content have low weighting
                happinessScoreWeighting = 1;
            }else if (happiness > 2.5 && happiness <= 3.5){
                //if they are happy have higher weighting
                happinessScoreWeighting = 2;
            }else if (happiness > 3.5){
                //if they are very happt have the highest weighting
                happinessScoreWeighting = 3;
            }else if (happiness < 1.5 && happiness > 0){
                happinessScoreWeighting = -100000;
            }else{
                happinessScoreWeighting = 0.25;
            }
            //finally add in a happiness factor to score
            score += (10*((happiness) * happinessScoreWeighting));*/
            if (happiness > 1.5 && happiness <= 2.5){
                //if they are content have low weighting
                score += 10;
            }else if (happiness > 2.5 && happiness <= 3.5){
                //if they are happy have higher weighting
                score += 50;
            }else if (happiness > 3.5){
                //if they are very happy have the highest weighting
                score += 100;
            }else if (happiness < 1.5 && happiness > 0){
                score -= 50;
            }else{
            }

            if (EG.player.getMoney() <= 0){
                score -= 1000;
            }else{
                score += 10;
            }
            if(score < 0){
                score = 0;
            }
            EG.player.setScore(score);
            EG.UI.setScore(Math.round(score));

            // Every X months, check if the population has been > 2.5 avg
            // happiness for at least Y months. If it has, then the player
            // gains another Z trajectory points, else they lose that many.
            if (this.entryCount > 0 && this.entryCount % EG.config.trajChangePeriod === 0){
                var count = 0;

                for (var i = 0; i < EG.config.trajChangePeriod; ++i) {
                    if (this.data[this.entryCount - i].happiness >= 2.5) {
                        ++count;
                    }
                }

                if (count >= EG.config.trajChangeThreshold) {
                    EG.TM.setActualTrajPoints(EG.TM.getTrajPoints() + EG.config.trajChangePoints);
                } else {
                    EG.TM.setActualTrajPoints(EG.TM.getTrajPoints() - EG.config.trajChangePoints);
                }
            }

            this.entryCount++;
        }
    };

    EG.Time.prototype.togglePaused = function() {
        this.paused = !this.paused;
        EG.UI.updateTimeControl();
    };
})();
