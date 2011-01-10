(function () {
    EG.Graph = function (ctx) {
        this.ctx = ctx;

        this.width = this.ctx.canvas.width;
        this.height = this.ctx.canvas.height;

        this.graphWidth = this.width / 2;
        this.graphHeight = this.height / 2;

        this.graphs = [];
        this.graphs[0] = graphInstanceHelper(ctx, 0, 0, this.graphWidth, this.graphHeight, [400.0, 50.0], ["Supply", "Demand"], ["green", "blue"], 2);
        this.graphs[1] = graphInstanceHelper(ctx, this.graphWidth, 0, this.graphWidth, this.graphHeight, [700.0, 50.0], ["Emissions", "Target"], ["white", "red"], 2);
        this.graphs[2] = graphInstanceHelper(ctx, 0, this.graphHeight, this.graphWidth, this.graphHeight, [100.0, 10.0], ["Money"], ["yellow"], 1);
        this.graphs[3] = graphInstanceHelper(ctx, this.graphWidth, this.graphHeight, this.graphWidth, this.graphHeight, [100.0, 20], ["Happiness"], ["pink"], 1);

        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Setup the sub graph grid lines/axis.
        this.initGridLines();
        this.drawDividingLines();
    };

    EG.Graph.prototype.drawPredictions = function () {
        if (EG.time.entryCount === 0){
            return;
        }
        this.removeProjectionLine(0);
        this.removeProjectionLine(1);

        var demandVals = EG.predictionCalc.predictDemand(EG.time.entryCount, 480);
        var emissionsVals = EG.predictionCalc.predictEmissions(EG.time.entryCount, 480, EG.time.data[EG.time.data.length-1].emissions);
        var targetEmissionVals = [];
        for (var i = EG.time.entryCount; i < 480; ++i) {
            targetEmissionVals.push((430 * ((480 - i) / 480)) + 170);
        }
        this.drawProjectionLine(0, 1, demandVals);
        this.drawProjectionLine(1, 0, emissionsVals);
        this.drawProjectionLine(1, 1, targetEmissionVals);
    };

    EG.Graph.prototype.drawProjectionLine = function (graphNum, valueOffset, values) {
        this.ctx.save();
        var graph = this.graphs[graphNum];
        var offset = graph.currentOffset;
        var valueCount = values.length;
        var yRange = graph.yRangeAndSteps[0];

        var widthPerMonth = graph.graphingWidth / graph.xSteps;

        if (offset !== undefined && valueCount > 2) {
            this.ctx.translate(graph.x, graph.y);
            this.ctx.translate(graph.xOffset, graph.yPadding);

            var past = graph.values[offset][valueOffset];
            this.ctx.strokeStyle = graph.colours[valueOffset] || "rgba(255, 0, 0, 0.5)";
            this.ctx.lineWidth = 2;

            for (var i = 0; i < valueCount; i += 4) {
                var current = values[i];
                var fromY = graph.graphingHeight - (graph.graphingHeight * (past / yRange));
                var toY = graph.graphingHeight - (graph.graphingHeight * (current / yRange));
                var fromX = (offset + i) * widthPerMonth;
                var toX = (offset + i + 2) * widthPerMonth;

                // Our x is 3/4 along the segment, so scale the y value.
                toY = fromY + (toY - fromY) * 0.75;

                graph.doDrawLine(fromX, fromY, toX, toY);

                past = current;
            }
        }
        this.ctx.restore();
    };

    EG.Graph.prototype.removeProjectionLine = function (graphNum) {
        this.ctx.save();
        this.ctx.translate(this.graphs[graphNum].x, this.graphs[graphNum].y);
        this.graphs[graphNum].redraw();
        this.ctx.restore();
    };

    EG.Graph.prototype.drawDividingLines = function () {
        this.ctx.strokeStyle = "rgba(255,255,255,0.1)";
        this.ctx.lineWidth = 1;

        this.ctx.beginPath();
        this.ctx.moveTo(this.graphWidth - 0.5, 0);
        this.ctx.lineTo(this.graphWidth - 0.5, this.height);
        this.ctx.moveTo(0, this.graphHeight - 0.5);
        this.ctx.lineTo(this.width, this.graphHeight - 0.5);
        this.ctx.stroke();
    };

    EG.Graph.prototype.initGridLines = function () {
        for (var i = 0; i < 4; ++i) {
            this.ctx.save();
            this.ctx.translate(this.graphs[i].x, this.graphs[i].y);
            this.graphs[i].initGridLines();
            this.ctx.restore();
        }
    };

    EG.Graph.prototype.drawStep = function () {
        for (var i = 0; i < 4; ++i) {
            this.ctx.save();
            this.ctx.translate(this.graphs[i].x, this.graphs[i].y);
            this.graphs[i].drawStep();
            this.ctx.restore();
        }
    };

    EG.Graph.prototype.addValue = function (i, vals) {
        if (vals.length != 6) {
            throw ("Invalid number of data points passed to Graph: " + vals);
        }

        this.graphs[0].addValue(i, vals.slice(0, 2));
        this.graphs[1].addValue(i, vals.slice(2, 4));
        this.graphs[2].addValue(i, vals.slice(4, 5));
        this.graphs[3].addValue(i, vals.slice(5, 6));
    };

    function graphInstanceHelper(ctx, x, y, width, height, yRangeAndSteps, yLabels, colours, valueCount) {
        return new EG.GraphInstance(ctx, x, y, width, height, 480.0, yRangeAndSteps, "Year", yLabels, colours, valueCount);
    }

    EG.GraphInstance = function (ctx, x, y, width, height, xSteps, yRangeAndSteps, xLabel, yLabels, colours, valueCount) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.xOffset = 50;
        this.xRightPadding = 15;
        this.yOffset = 60;
        // Space for labels and units.
        this.graphingWidth = this.width - this.xOffset - this.xRightPadding;
        this.graphingHeight = this.height - this.yOffset;
        this.xSteps = xSteps;
        // List of 2 elems [0] is range of values, [1] is stepsize
        this.yRangeAndSteps = yRangeAndSteps;
        this.xLabel = xLabel;
        this.yLabels = yLabels;
        this.values = [];
        this.colours = colours;
        this.valueCount = valueCount;
        this.yPadding = 10;
        this.pipHeight = 10;
        this.largePipFactor = 1.5;
        this.xNumberCenterOffset = 12;
        this.yNumberCenterOffset = 3;
        this.yLabelOffset = 30;
        this.yNumbersOffset = 22;
        this.axisWidth = 4;
    };

    EG.GraphInstance.prototype.initGridLines = function () {
        this.ctx.save();
        var i = 0;
        this.ctx.fillStyle = "white";
        this.ctx.strokeStyle = "white";

        this.ctx.translate(this.xOffset, this.yPadding);

        // show one mark per year (steps == the #months)
        var gridXStep = (this.graphingWidth / this.xSteps) * 12;
        var xSteps = Math.floor(this.graphingWidth / gridXStep);

        this.ctx.lineWidth = this.axisWidth;

        // Draw the axis.
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(0, this.graphingHeight);
        this.ctx.lineTo(this.graphingWidth, this.graphingHeight);
        this.ctx.stroke();

        this.ctx.lineWidth = 1;

        // X axis pips.
        for (i = 0; i <= xSteps; ++i) {
            this.ctx.beginPath();
            this.ctx.moveTo(Math.floor(i * gridXStep), this.graphingHeight);
            // 50% higher pips every 5th.
            this.ctx.lineTo(Math.floor(i * gridXStep), this.graphingHeight - (this.pipHeight * (i % 5 === 0 ? this.largePipFactor : 1)));
            this.ctx.stroke();
        }

        var gridYStep = this.graphingHeight / this.yRangeAndSteps[0];
        var ySteps = Math.floor(this.graphingHeight / gridYStep);

        // Y axis pips.
        for (i = 0; i <= ySteps; i += this.yRangeAndSteps[1]) {
            var y = Math.floor(i * gridYStep);
            this.ctx.beginPath();
            this.ctx.moveTo(0, this.graphingHeight - y);
            this.ctx.lineTo(this.pipHeight, this.graphingHeight - y);
            this.ctx.stroke();
        }

        this.ctx.save();

        // Translate so our x numbers are based 20px below the x axis.
        this.ctx.translate(0, 20);

        this.ctx.font = '10px sans-serif';
        this.ctx.textBaseline = 'bottom';

        // X axis numbers.
        for (i = 0; i <= xSteps; i += 5) {
            this.ctx.fillText(i + 2010, Math.floor(i * gridXStep) - this.xNumberCenterOffset, this.graphingHeight);
        }


        // X label
        this.ctx.font = '20px sans-serif';

        // Top align the label, so it doesn't cover the numbers
        this.ctx.textBaseline = 'top';

        this.ctx.fillText(this.xLabel, Math.floor(this.graphingWidth / 2) - this.ctx.measureText(this.xLabel).width / 2, this.graphingHeight);


        this.ctx.restore();

        this.ctx.font = '10px sans-serif';

        // Y axis numbers.
        for (i = 0; i <= ySteps; i += this.yRangeAndSteps[1]) {
            this.ctx.fillText(i, -this.yNumbersOffset, this.graphingHeight - Math.floor(i * gridYStep) + this.yNumberCenterOffset);
        }

        // Y label
        this.ctx.font = '20px sans-serif';

        this.ctx.textBaseline = 'bottom';

        // Translate the canvas so the y label is correctly offset from the y axis and the center of the graph is
        // at the origin to give easy rotation.
        this.ctx.translate(-this.yLabelOffset, this.height / 2 - (this.height - this.graphingHeight) / 2);
        this.ctx.rotate(-Math.PI / 2);

        var yLabelsHalfWidth = this.ctx.measureText(this.yLabels.join(" ")).width / 2;

        for (i = 0; i < this.yLabels.length; ++i) {
            this.ctx.fillStyle = this.colours[i];

            // if we're not on the first string, offset by the thus far printed strings' widths.
            this.ctx.fillText(this.yLabels[i], Math.round(((i > 0) ? this.ctx.measureText(this.yLabels.slice(0, i).join(" ") + " ").width : 0) - yLabelsHalfWidth), 0);
        }
        this.ctx.restore();
    };

    EG.GraphInstance.prototype.redraw = function () {
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.initGridLines();
        for (var i = 0; i < (this.values.length - 1); ++i) {
            this.drawAllLines(i, i + 1);
        }
    };

    EG.GraphInstance.prototype.drawLine = function (valueOffset, previousOffset, currentOffset) {
        var widthPerMonth = this.graphingWidth / this.xSteps;

        // Subtract height, to form the y axis from bottom-to-top.
        var fromY = this.graphingHeight - (this.graphingHeight * (this.values[previousOffset][valueOffset] / this.yRangeAndSteps[0]));
        var toY = this.graphingHeight - (this.graphingHeight * (this.values[currentOffset][valueOffset] / this.yRangeAndSteps[0]));
        var fromX = previousOffset * widthPerMonth;
        var toX = currentOffset * widthPerMonth;
        this.doDrawLine(fromX, fromY, toX, toY);
    };

    EG.GraphInstance.prototype.doDrawLine = function (fromX, fromY, toX, toY) {
        if (fromY < 0) {
            fromY = 0;
        }
        if (fromY > this.graphingHeight) {
            fromX = this.graphingHeight;
        }
        if (toY < 0) {
            toY = 0;
        }
        if (toY > this.graphingHeight) {
            toY = this.graphingHeight;
        }
        this.ctx.beginPath();
        this.ctx.moveTo(fromX, fromY);
        this.ctx.lineTo(toX, toY);
        this.ctx.stroke();
    };

    EG.GraphInstance.prototype.drawStep = function () {
        if (!this.previousOffset || !this.currentOffset) {
            return;
        }

        this.draw(this.previousOffset, this.currentOffset);
    };

    EG.GraphInstance.prototype.drawAllLines = function (previousOffset, currentOffset) {
        this.ctx.save();
        // Translate so the graph lines are drawn within the graphing area.
        this.ctx.translate(this.width - this.graphingWidth - this.xRightPadding, this.yPadding);

        this.ctx.lineWidth = 2;
        this.ctx.lineCap = "round";


        // Draw each individual line for these offsets.
        for (var i = 0; i < this.values[0].length; ++i) {
            this.ctx.strokeStyle = this.colours[i] || "white";
            this.drawLine(i, previousOffset, currentOffset);
        }
        this.ctx.restore();
    };

    EG.GraphInstance.prototype.draw = function (previousOffset, currentOffset) {
        this.drawAllLines(previousOffset, currentOffset);
    };

    EG.GraphInstance.prototype.addValue = function (offset, value) {
        this.values[offset] = value;

        // Update the data pointers.
        this.previousOffset = this.currentOffset;
        this.currentOffset = offset;
    };

})();
