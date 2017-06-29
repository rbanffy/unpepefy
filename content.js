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

var unPepefy = function() {

    const TWITTER_PEPE_EMOJIS = [
        "https://abs.twimg.com/emoji/v2/72x72/1f438.png", // Pepe
        "https://abs.twimg.com/emoji/v2/72x72/1f95b.png", // Milk glass
        "https://abs.twimg.com/emoji/v2/72x72/1f44c.png",  // OK
        "https://abs.twimg.com/emoji/v2/72x72/1f44c-1f3fb.png", // OK, white
        "https://abs.twimg.com/emoji/v2/72x72/1f44c-1f3fc.png"  // OK, medium
    ];

    const TWEETDECK_PEPE_EMOJIS = [
        "https://ton.twimg.com/tweetdeck-web/web/assets/emoji" // Pepe
            + "/1f438.d0b91522fe.png",
        "https://ton.twimg.com/tweetdeck-web/web/assets/emoji" // Milk glass
            + "/1f95b.c0e770ed7f.png",
        "https://ton.twimg.com/tweetdeck-web/web/assets/emoji" // OK
            + "/1f44c.473b805d64.png",
        "https://ton.twimg.com/tweetdeck-web/web/assets/emoji" // Small OK
            + "/1f44c-1f3fb.2cedf2cf1d.png"
    ];

    const CORRECT_EMOJI = "https://abs.twimg.com/emoji/v2/72x72/1f4a9.png";

    const host = window.location.host;

    var nearestLink = function (element) {
        if (element.tagName === 'A') {
            return element;
        }
        while ((element = element.parentElement) && element.tagName !== 'A');
        return element;
    };

    var unpepefyTipTimeout;  // Will be the timeout.

    var unpepefyEnablePopUp = function (e) {
        var target = nearestLink(e.target);
        var url = target.href;
        var screenName = url.substr(url.lastIndexOf('/') + 1);
        var xhr = new XMLHttpRequest();
        var url = 'https://naziscore.appspot.com/v1/screen_name/' + screenName + '/score.json';
        console.log(url);
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE &&
                xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.score === undefined) {
                    document.getElementById('unpepefyScore').innerHTML = 'calculating';
                } else {
                    document.getElementById('unpepefyScore').innerHTML = response.score;
                }
                console.log(response.screen_name + ': ' + response.score);
            }
        };
        xhr.send();
        unpepefyTipTimeout = setTimeout(function () { unpepefyOpenPopUp(e); }, 1000);
    };

    var unpepefyOpenPopUp = function (e) {
        UnpepefyTip.style.left = e.clientX + 'px';
        UnpepefyTip.style.top = e.clientY + 'px';
        // Position popup div and make it visible
        UnpepefyTip.style.visibility = 'visible';
    };

    var unpepefyDisableAndClosePopUp = function (e) {
        clearTimeout(unpepefyTipTimeout);
        document.getElementById('unpepefyScore').innerHTML = '';
        UnpepefyTip.style.visibility = 'hidden';
    };

    var unpepefyLinks = document.getElementsByClassName("account-link");

    for (var i = 0; i < unpepefyLinks.length; i++) {
        if (unpepefyLinks[i].unpepefied !== true) {  // Avoid doing it more than once.
            unpepefyLinks[i].addEventListener('mouseover', unpepefyEnablePopUp);
            unpepefyLinks[i].addEventListener('mouseout', unpepefyDisableAndClosePopUp);
            unpepefyLinks[i].unpepefied = true;
        }
    }

    if (host === "twitter.com") {
        var spans = document.getElementsByClassName('Emoji Emoji--forLinks');

        for (var i = 0; i < spans.length; i++) {
            for (var pepe in TWITTER_PEPE_EMOJIS) {
                if (spans[i].style["background-image"]
                    == "url(\"" + TWITTER_PEPE_EMOJIS[pepe] + "\")")
                {
                    spans[i].style["background-image"] =
                        "url(\"" + CORRECT_EMOJI + "\")";
                }
            }
        }

        var imgs = document.getElementsByClassName('Emoji Emoji--forText');

        for (var i = 0; i < imgs.length; i++) {
            if (imgs[i].tagName === "IMG"
                && TWITTER_PEPE_EMOJIS.includes(imgs[i].src)) {
                imgs[i].src = CORRECT_EMOJI;
            }
        }
    } else if (host === "tweetdeck.twitter.com") {
        var imgs = document.getElementsByClassName('emoji')

        for (var i = 0; i < imgs.length; i++) {
            if (TWEETDECK_PEPE_EMOJIS.includes(imgs[i].src)) {
                imgs[i].src = CORRECT_EMOJI;
            }
        }
    }
}

window.addEventListener('load', unPepefy);
window.addEventListener('DOMSubtreeModified', unPepefy);

var UnpepefyTip;  // Holds the tool tip

UnpepefyTip = document.createElement('div');
UnpepefyTip.id = "unpepefyTip";
UnpepefyTip.innerHTML = '<p>Naziscore</p><p><span id="unpepefyScore">1234</p>';
document.body.insertBefore(UnpepefyTip, document.body.childNodes[0]);
// This should be moved into a CSS
UnpepefyTip.style.visibility = 'hidden';
UnpepefyTip.style.position = 'fixed';
UnpepefyTip.style.display = 'block';
UnpepefyTip.style.top = '150pt';
UnpepefyTip.style.left = '15pt';
UnpepefyTip.style.width = '100pt';
UnpepefyTip.style.height = '60pt';
UnpepefyTip.style.zIndex = 1000;
UnpepefyTip.style.background = '#ffffa5';
UnpepefyTip.style.foreground = 'black';
UnpepefyTip.style.borderRadius = '5pt';
UnpepefyTip.style.boxShadow = '10px 10px 50px -2px rgba(0,0,0,0.75)';
