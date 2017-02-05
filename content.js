// Injected in the page, runs from there

var PEPE_EMOJI = "url(\"https://abs.twimg.com/emoji/v2/72x72/1f438.png\")";
var CORRECT_EMOJI = "url(\"https://abs.twimg.com/emoji/v2/72x72/1f4a9.png\")";

window.addEventListener('load', function() {
    console.log('load triggered');
    var occurences = document.getElementsByClassName('Emoji--forLinks');
    for (var i = 0; i < occurences.length; i++) {
        if (occurences[i].style["background-image"] == PEPE_EMOJI) {
            occurences[i].style["background-image"] = CORRECT_EMOJI;
        }
    }
});
