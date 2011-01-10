(function () {
    /*
     * The values is an array of 4 TrajectoryValues, which hold the text and
     * function assoicated with that value
     */

    function Trajectory(id, title, desc, values) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.values = values;
        this.chosen = 0; // which value are we currently on
        this.pendingChoice = 0; // a tentative choice made by the user on clicking a choice
    }
    Trajectory.prototype.reset = function () {
        this.pendingChoice = this.chosen;
    };
    Trajectory.prototype.use = function () {
        this.chosen = this.pendingChoice;
        this.values[this.chosen].use();
    };

    Trajectory.prototype.updateChoice = function (index) {
        this.pendingChoice = index;
    };

    function TrajectoryValue(text, fn) {
        this.text = text;
        this.fn = fn;
    }

    TrajectoryValue.prototype.use = function () {
        this.fn(EG.time.entryCount);
    };

    EG.TrajectoriesManagerSetup = function () {
        this.trajectories = [];
        this.trajPoints = EG.config.trajPoints;
        this.pendingTrajPoints = this.trajPoints;
        this.load();
    };
    EG.TrajectoriesManagerSetup.prototype.reset = function () {
        this.pendingTrajPoints = this.trajPoints;
        this.updateUI();
    };
    EG.TrajectoriesManagerSetup.prototype.getTrajPoints = function () {
        return this.pendingTrajPoints == this.trajPoints ? this.trajPoints : this.pendingTrajPoints;
    };

    EG.TrajectoriesManagerSetup.prototype.setActualTrajPoints = function (points) {
        // Points is the new _pending_ total, however we need to add the 
        // difference onto the actual traj points
        var diff = points - this.pendingTrajPoints;
        if (points > 0) {
            this.pendingTrajPoints = points;
            this.trajPoints += diff;
            this.updateUI();
        }
    };
    EG.TrajectoriesManagerSetup.prototype.setTrajPoints = function (points) {
        if (points > 0) {
            this.pendingTrajPoints = points;
            this.updateUI();
        }
    };

    EG.TrajectoriesManagerSetup.prototype.getTrajectories = function () {
        return this.trajectories;
    };
    EG.TrajectoriesManagerSetup.prototype.trajValueFunction = function (type, traj_no) {
        var retFn = function(type, traj_no, month) {
            var thisValue = EG.demandData.jsondata[type].info[traj_no];

            // Change the graph trajectories
            EG.predictionCalc.decison_maker(type, traj_no, month);
    
            // Modify the happiness and the cost
            EG.Effects.modifyHappiness(thisValue.happiness);
            EG.Effects.modifyMoney(-thisValue.cost);
        };
        
        return retFn.partial(type, traj_no, undefined);
    };

    EG.TrajectoriesManagerSetup.prototype.load = function () {
        var dataSrc = EG.demandData.jsondata;

        // dear anyone reading this: I apologise.
        for (var id in dataSrc) {
            if (dataSrc.hasOwnProperty(id)) {
                var choices = [];
                for (var num in dataSrc[id].info) {
                    if (dataSrc[id].info.hasOwnProperty(num)) {
                        var thisValue = dataSrc[id].info[num];
                        choices.push(new TrajectoryValue(thisValue.quote, this.trajValueFunction(id, num)));
                    }
                }

                this.trajectories.push(
                new Trajectory(id, dataSrc[id].title, dataSrc[id].desc, choices));
            }
        }
    };

    EG.TrajectoriesManagerSetup.prototype.doTrajectoryEffects = function () {
        this.trajPoints = this.pendingTrajPoints;
        for (var i = 0; i < this.trajectories.length; i++) {
            this.trajectories[i].use();
        }
    };

    EG.TrajectoriesManagerSetup.prototype.increasePoints = function (amnt) {
        this.pendingTrajPoints += amnt;
        this.updateUI();
    };

    EG.TrajectoriesManagerSetup.prototype.decreasePoints = function (amnt) {
        this.pendingTrajPoints -= amnt;
        this.updateUI();
    };

    EG.TrajectoriesManagerSetup.prototype.getChoiceTextFor = function (trajectory, value) {
        if (trajectory && trajectory.values[value]) {
            return trajectory.values[value].text;
        }
    };

    EG.TrajectoriesManagerSetup.prototype.updateUI = function () {
        EG.UI.updateTrajPoints(this.pendingTrajPoints);
    };

    EG.TrajectoriesManagerSetup.prototype.acceptTrajectoryChoices = function () {
        return (this.pendingTrajPoints >= 0);
    };
})();
