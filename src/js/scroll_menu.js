/**
 * Horizontal scrolling script. Provides continuous scrolling when the mouse is
 * hovering over certain DOM elements.
 *
 * Requires:
 *  jQuery
 *
 * Usage:
 *  initialise(leftDOMElement, listElement, rightDOMElement);
 *  scroll(direction);
 *    @param direction
 *      left: 1, right: -1
 *  stopScrolling();
 */
var isAnimating = false;
var listElement;
var originalWidth = 0;
var stopScrollingTriggered = false;
var scrollOffset = 0;
var animateTimer = -1;
var prevFrameTime = -1;
var scrollPixelsPerSecond = 300;

function animate(direction) {

    // If the scroll has just started, 
    if (prevFrameTime == -1) {
        prevFrameTime = new Date().getTime();
    }

    // Interpolate the time difference between the previous call of this
    // function and this function, then scale the scroll amount accordingly
    var currentTime = new Date().getTime();
    var dT = currentTime - prevFrameTime;
    prevFrameTime = currentTime;
    var scrollDistance = scrollPixelsPerSecond * (dT / 1000);

    scrollOffset += direction * scrollDistance;

    // Clamp to within the size of the list (don't scroll off the edge)
    var childrenWidth = $(listElement).children().first().width();

    // If the left value reaches -(childwidth) or +(childwidth) then we can
    // swap out the first and last elements.
    if(scrollOffset <= -childrenWidth) {
        swapEnds(direction);
        scrollOffset += childrenWidth;
    } else {
        if(scrollOffset >= 0) {
            swapEnds(direction);
            scrollOffset -= childrenWidth ;
        }
    }
/*    // Apply the change
    if(isAnimating) return;

    isAnimating = true;

    $(listElement).animate({
        left: scrollOffset,
        callback: function () {
            console.log("animating complete", isAnimating);
            isAnimating = false;
        }
    }*/
    $(listElement).css("left", scrollOffset + "px");
}

function startScroll(direction) {
//    animate(direction);
    animateTimer = setInterval("animate(" + direction + ")", 30);
}

function stopScroll() {
    clearInterval(animateTimer);
    prevFrameTime = -1;
}

function initialiseScrolling(leftDOMElement, list, rightDOMElement) {
    listElement = list;
    originalWidth = $(listElement).width();
    $(leftDOMElement).hover(
        function(){
            startScroll(1);
        },
        function(){
            stopScroll();
        }
    );

    $(rightDOMElement).hover(
        function(){
            startScroll(-1);
        },
        function(){
            stopScroll();
        }
    );
}
