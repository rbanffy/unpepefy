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

var PEPE_EMOJI = "url(\"https://abs.twimg.com/emoji/v2/72x72/1f438.png\")";
var CORRECT_EMOJI = "url(\"https://abs.twimg.com/emoji/v2/72x72/1f4a9.png\")";

var dePepeFy = function() {
    console.log('load triggered');
    var occurences = document.getElementsByClassName('Emoji--forLinks');
    for (var i = 0; i < occurences.length; i++) {
        if (occurences[i].style["background-image"] == PEPE_EMOJI) {
            occurences[i].style["background-image"] = CORRECT_EMOJI;
        }
    }
}

window.addEventListener('load', dePepeFy);
window.addEventListener('scroll', dePepeFy);
