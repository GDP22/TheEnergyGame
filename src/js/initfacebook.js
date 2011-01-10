function publish() {
    var attachment = {
        'name':'The Energy Game',
        'href':'http://gdp.owst.staxapps.net/play',
        'caption':'{*actor*} ',
        'media':[{
            'type'  :   'image',
            'src'   :   'http://gdp.owst.staxapps.net/images/TheEnergyGameLogo.png',
            'href'  :   'http://gdp.owst.staxapps.net/play'
        }]
    };

    // If the game has ended, add the player's score to the caption.
    if(EG.time.entryCount >= EG.time.endMonth) {
        attachment.caption += "scored " + Math.round(EG.player.getScore()) + " on The Energy Game! Can you do better?";
    } else {
        attachment.caption += "played The Energy Game";
    }

    var action_links = [
        {
            'text'  :   'Play!',
            'href'  :   'http://gdp.owst.staxapps.net/play'
        }
    ];

    FB_RequireFeatures(["Connect"], function() {
        FB.init('c93dca6ebfb22ac074db14d7d13ad9d0', 'xd_receiver.htm');
        FB.ensureInit(function() {
            FB.Connect.streamPublish('', attachment, action_links);
        });
    });
}

