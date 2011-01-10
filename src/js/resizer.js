(function () {
    /*
     * Ensure everything fits on screen;
     */ 
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();

    var canvas = $('#canvas');
    var info = $('#info');
    var ribbon = $('#ribbon');
    var chart = $('#chartcanvas');

    /*
     * WIDTH
     */
    // Find width of container 
    var containerWidth = $('#container').width();

    // Store original width of canvas
    var origCanvasWidth = $('#canvas').attr('width');

    // Change the canvas width attribute (not css!)
    canvas.attr('width', containerWidth - 10);
    var newCanvasWidth = canvas.attr('width');

    // Move the info box over
    var origInfoLeft = parseInt( info.css("left"), 10);
    info.css("left", origInfoLeft - (origCanvasWidth - newCanvasWidth));

    /*
     * HEIGHT
     */
    // padding between the elements
    var pad = 50; 

    // height of ribbon
    var ribHeight = parseInt( ribbon.css("height"), 10);

    // The new height for the info box and info pane
    var newInfoCanvasHeight = windowHeight - ribHeight;
    // Set the height of info
    info.css("height", newInfoCanvasHeight - pad);
    canvas.attr('height', newInfoCanvasHeight - pad);

    ribbon.css("top", newInfoCanvasHeight - pad/2);

    // Change the chart canvas to match
    chart.attr('width', canvas.attr('width'));
    chart.attr('height', canvas.attr('height'));
})();
