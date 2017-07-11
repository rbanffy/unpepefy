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
        'https://abs.twimg.com/emoji/v2/72x72/1f438.png', // Pepe
        'https://abs.twimg.com/emoji/v2/72x72/1f95b.png', // Milk glass
        'https://abs.twimg.com/emoji/v2/72x72/1f44c.png',  // OK
        'https://abs.twimg.com/emoji/v2/72x72/1f44c-1f3fb.png', // OK, white
        'https://abs.twimg.com/emoji/v2/72x72/1f44c-1f3fc.png'  // OK, medium
    ];

    const TWEETDECK_PEPE_EMOJIS = [
        'https://ton.twimg.com/tweetdeck-web/web/assets/emoji' // Pepe
            + '/1f438.d0b91522fe.png',
        'https://ton.twimg.com/tweetdeck-web/web/assets/emoji' // Milk glass
            + '/1f95b.c0e770ed7f.png',
        'https://ton.twimg.com/tweetdeck-web/web/assets/emoji' // OK
            + '/1f44c.473b805d64.png',
        'https://ton.twimg.com/tweetdeck-web/web/assets/emoji' // Small OK
            + '/1f44c-1f3fb.2cedf2cf1d.png'
    ];

    const CORRECT_EMOJI = 'https://abs.twimg.com/emoji/v2/72x72/1f4a9.png';

    const host = window.location.host;

    var unpepefyLinks;

    if (host === 'twitter.com') {
        unpepefyLinks = Array.prototype.slice.call(
            document.getElementsByClassName(
                'ProfileHeaderCard-nameLink u-textInheritColor js-nav'), 0);
        unpepefyLinks.concat(Array.prototype.slice.call(
            document.getElementsByClassName(
                'fullname ProfileNameTruncated-link u-textInheritColor js-nav'), 0));
        unpepefyLinks.concat(Array.prototype.slice.call(
            document.getElementsByClassName('fullname show-popup-with-id'), 0));
        unpepefyLinks.concat(Array.prototype.slice.call(
            document.getElementsByClassName('twitter-atreply pretty-link js-nav'), 0));
    } else if (host === 'tweetdeck.twitter.com') {
        unpepefyLinks = Array.prototype.slice.call(
            document.getElementsByClassName('account-link'), 0);
        unpepefyLinks.concat(Array.prototype.slice.call(
            document.getElementsByClassName('js-user-profile-link'), 0));
        unpepefyLinks.concat(Array.prototype.slice.call(
            document.getElementsByClassName('link-complex-target'), 0));
        unpepefyLinks.concat(Array.prototype.slice.call(
            document.getElementsByClassName('js-action-url'), 0));
    }

    for (var i = 0; i < unpepefyLinks.length; i++) {
        if (unpepefyLinks[i].unpepefied !== true) {  // Avoid doing it more than once.
            unpepefyLinks[i].addEventListener('mouseover', Naziscore.enablePopUp);
            unpepefyLinks[i].addEventListener('mouseout', Naziscore.disableAndClosePopUp);
            unpepefyLinks[i].unpepefied = true;
        }
    }

    if (host === 'twitter.com') {
        var spans = document.getElementsByClassName('Emoji Emoji--forLinks');

        for (i = 0; i < spans.length; i++) {
            for (var pepe in TWITTER_PEPE_EMOJIS) {
                if (spans[i].style['background-image']
                    == 'url(\'' + TWITTER_PEPE_EMOJIS[pepe] + '\')')
                {
                    spans[i].style['background-image'] =
                        'url(\'' + CORRECT_EMOJI + '\')';
                }
            }
        }

        var imgs = document.getElementsByClassName('Emoji Emoji--forText');

        for (i = 0; i < imgs.length; i++) {
            if (imgs[i].tagName === 'IMG'
                && TWITTER_PEPE_EMOJIS.includes(imgs[i].src)) {
                imgs[i].src = CORRECT_EMOJI;
            }
        }
    } else if (host === 'tweetdeck.twitter.com') {
        imgs = document.getElementsByClassName('emoji');

        for (i = 0; i < imgs.length; i++) {
            if (TWEETDECK_PEPE_EMOJIS.includes(imgs[i].src)) {
                imgs[i].src = CORRECT_EMOJI;
            }
        }
    }
};

var Naziscore = new Object();

Naziscore.cache = new Object();

Naziscore.tip = document.createElement('div');
Naziscore.tip.id = 'naziscore_tip';

Naziscore.tip.innerHTML = '<p><span id="unpepefy_score"></p>';
document.body.insertBefore(Naziscore.tip, document.body.childNodes[0]);

Naziscore.unpepefyScore = document.getElementById('unpepefy_score');

Naziscore.nearestLink = function (element) {
    if (element.tagName === 'A') {
        return element;
    }
    while ((element = element.parentElement) && element.tagName !== 'A');
    return element;
};

Naziscore.enablePopUp = function (e) {
    // Move the pop-up to its new place (it's hidden now).
    var r = e.target.getBoundingClientRect();
    Naziscore.tip.style.left = (r.left + r.right) / 2 + 'px';
    Naziscore.tip.style.top = r.bottom + 'px';

    // Start an async fetch.
    var target = Naziscore.nearestLink(e.target);
    var target_url = target.href;
    var screenName = target_url.substr(target_url.lastIndexOf('/') + 1);
    if (Naziscore.cache[screenName] === undefined) {  // The score is not cached yet.
        var xhr = new XMLHttpRequest();
        var url = 'https://naziscore.appspot.com/v1/screen_name/' + screenName + '/score.json';
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE &&
                xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.score === undefined) {
                    Naziscore.unpepefyScore.innerHTML = '<img alt="🐸" class="naziscore_pepe" src="https://ton.twimg.com/tweetdeck-web/web/assets/global/backgrounds/spinner_small_trans.de7dc51b0d.gif">';
                    Naziscore.unpepefyTipTimeout = setTimeout(function () { Naziscore.disableAndClosePopUp(e); }, 3000);
                } else {
                    Naziscore.cache[screenName] = response.score;
                    Naziscore.unpepefyScore.innerHTML = Naziscore.scoreToShits(response.score);
                }
            }
        };
        xhr.send();
    } else {
        Naziscore.unpepefyScore.innerHTML = Naziscore.scoreToShits(Naziscore.cache[screenName]);
    }
    Naziscore.unpepefyTipTimeout = setTimeout(function () { Naziscore.openPopUp(e); }, 1000);
};

Naziscore.openPopUp = function () {
    // Just make the popup visible - it's moved when the fetch is triggered.
    Naziscore.tip.style.visibility = 'visible';
};

Naziscore.disableAndClosePopUp = function () {
    clearTimeout(Naziscore.unpepefyTipTimeout);
    Naziscore.tip.style.visibility = 'hidden';
    Naziscore.unpepefyScore.innerHTML = '';
};

Naziscore.scoreToShits = function (score) {
    const host = window.location.host;
    var shits = '';
    var shit;
    var unshit;
    if (host === 'twitter.com') {
        // Probably something different will be needed here - maybe
        // something with
        // document.getElementById("profile-hover-container")
        shit = '<span class="Emoji Emoji--forLinks" style="background-image:url(\'https://abs.twimg.com/emoji/v2/72x72/1f438.png\')" title="Frog face" aria-label="Emoji: Frog face">&nbsp;</span>';
    } else if (host === 'tweetdeck.twitter.com') {
        shit = '<img alt="🐸" class="naziscore_pepe" src="https://abs.twimg.com/emoji/v2/72x72/1f4a9.png">';
        unshit = '<img alt="🐸" class="naziscore_pepe" src="' + chrome.extension.getURL('unpepe.png') + '">';
    }
    for (var i = 1; i <= 5; i++) {
        shits += i <= score - 1 ? shit : unshit;
    }
    return shits + '<!-- ' + score + ' -->';
};

// These have to be the last things we do here. They set everything else in motion.
window.addEventListener('load', unPepefy);
window.addEventListener('DOMSubtreeModified', unPepefy);
