// Replaces the image used for the frog face emoji with a more appropriate one.

//     Copyright (C) 2017  Ricardo Bánffy

//     This program is free software: you can redistribute it and/or modify
//     it under the terms of the GNU General Public License as published by
//     the Free Software Foundation, either version 3 of the License, or
//     (at your option) any later version.

//     This program is distributed in the hope that it will be useful,
//     but WITHOUT ANY WARRANTY; without even the implied warranty of
//     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//     GNU General Public License for more details.

//     You should have received a copy of the GNU General Public License
//     along with this program.  If not, see <http://www.gnu.org/licenses/>.

// Injected in the page, runs from there

var PEPE_EMOJI = "https://abs.twimg.com/emoji/v2/72x72/1f438.png";
var TWEETDECK_EMOJI = "https://ton.twimg.com/tweetdeck-web/web/assets/emoji"
    + "/1f438.d0b91522fe.png";
var CORRECT_EMOJI = "https://abs.twimg.com/emoji/v2/72x72/1f4a9.png";

var unPepefy = function() {
    if (window.location.host == "twitter.com") {
        var spans = document.getElementsByClassName('Emoji--forLinks');
        for (var i = 0; i < spans.length; i++) {
            if (spans[i].style["background-image"]
                == "url(\"" + PEPE_EMOJI + "\")")
            {
                spans[i].style["background-image"] =
                    "url(\"" + CORRECT_EMOJI + "\")";
            }
        }
        var imgs = document.getElementsByClassName('Emoji--forText')
        for (var i = 0; i < imgs.length; i++) {
            if (imgs[i].src == PEPE_EMOJI) {
                imgs[i].src = CORRECT_EMOJI;
            }
        }
    } else if (window.location.host == "tweetdeck.twitter.com") {
        var imgs = document.getElementsByClassName('emoji')
        for (var i = 0; i < imgs.length; i++) {
            if (imgs[i].src == TWEETDECK_EMOJI) {
                imgs[i].src = CORRECT_EMOJI;
            }
        }
    }
}

window.addEventListener('load', unPepefy);
window.addEventListener('DOMSubtreeModified', unPepefy);
