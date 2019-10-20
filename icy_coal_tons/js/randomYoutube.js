var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        playerVars: {
            'autoplay': 1,
            'controls': 0,
            'disablekb': 1,
            'fs': 0,
            'modestbranding': 1,
            'rel': 0,
            'showinfo': 0,
            'iv_load_policy': 3,
            'loop': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
        }
    });
}

var playlistArray;
var playListArrayLength;
var maxNumber;

function onPlayerReady(event) {
    player.loadPlaylist({
        'listType': 'playlist',
        'list': 'PLwqMUQlKzNnpQdfy5dCNSKAaE0MIOAo9X'
    });
}

function next() {
    player.loadPlaylist({
        'listType': 'playlist',
        'list': 'PLwqMUQlKzNnpQdfy5dCNSKAaE0MIOAo9X',
        'index': newIndexRandomNumber(),
        'startSeconds': newStartRandomNumber(),
        'endSeconds': newEndRandomNumber(),
    });
    player.setPlaybackRate(randomSpeed());
    player.setShuffle({
        'shufflePlaylist': 'true'
    });
    player.setPlaybackQuality({
        'suggestedQuality': 'small'
    });
}

// create random index number
var oldIndexNumber = 0;
var NewIndexNumber = 0;

function newIndexRandomNumber() {
    oldIndexNumber = NewIndexNumber;
    NewIndexNumber = Math.floor(Math.random() * maxNumber);
    if (NewIndexNumber == oldIndexNumber) {
        return newIndexRandomNumber();
    } else {
        return NewIndexNumber;
    }
}

// create random start number
var oldStartNumber = 0;
var NewStartNumber = 0;

function newStartRandomNumber() {
    oldStartNumber = NewStartNumber;
    NewStartNumber = Math.floor(Math.random() * (player.getDuration() - 0)) + 0;
    if (NewStartNumber == oldStartNumber) {
        return newStartRandomNumber();
    } else {
        return NewStartNumber;
    }
}

// create random end number
var oldEndNumber = 0;
var NewEndNumber = 0;

function newEndRandomNumber() {
    oldEndNumber = NewEndNumber;
    NewEndNumber = Math.floor(Math.random() * (player.getDuration() - newStartRandomNumber())) + newStartRandomNumber();
    if (NewEndNumber == oldEndNumber) {
        return newEndRandomNumber();
    } else {
        return NewEndNumber;
    }
}

// pick random speed 0.25 (no sound), 0.5, 1 (normal), 1.5, and 2.
var array = [0.25, 0.5, 1.5, 2];

function randomSpeed() {
    function shuffle(a) {
        for (let i = a.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [a[i - 1], a[j]] = [a[j], a[i - 1]];
        }
    }
    shuffle(array);
    return array.slice(0, 1);
}

var firstLoad = true;

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        next();
    } else {
        if (firstLoad && event.data == YT.PlayerState.PLAYING) {
            firstLoad = false;
            playlistArray = player.getPlaylist();
            playListArrayLength = playlistArray.length;
            maxNumber = playListArrayLength;
            next();
        }
        player.playVideo();
    }
}

function onPlayerError() {
    next();
}
