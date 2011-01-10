(function(){

    // The Hint Library is simply a list of hints that can be shown ingame. A
    // random index can be chosen and the hint can be displayed.
    // Hints can be shown every few seconds during the loading screen for
    // instance.
    EG.hintLibrary = {
        hints : [
                    "You can post your high scores to Facebook and Twitter.",
                    "You can track your progress through the game using the graphs dialog.",
                    "You should try and make sure that your supply exceeds " +
                    "your demand or your population will get very unhappy!",
                    "You can't build on national parks.",
                    "You can pan around the map by dragging your mouse.",
                    "Certain areas of the map are better for certain things, for instance wind based power is best placed in the North.",
                    "The output of certain systems is modified by the current weather.",
                    "If you are not aggressive on your stances you may never meet the target."
                ],
        getRandom:  function () {
                        var index = Math.floor(Math.random() * this.hints.length);
                        return this.hints[index];
                    }
    };

})();
