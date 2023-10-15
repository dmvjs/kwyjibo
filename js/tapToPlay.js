import {context} from "./context.js";
import {hideElement, showElement} from "./tracks.js";

const playButton = document.getElementById('play-button')
const message = document.getElementById('message')

const myEvent = ('ontouchstart' in document.documentElement) ? 'touchend' : 'click';
playButton.addEventListener(myEvent, startApplication);
let isFirst = null;

function startApplication () {
    if (isFirst === null) {
        showElement(document.getElementById('now-playing'))
        hideElement(document.getElementById('up-next'))
        isFirst = 1;
    }
    playButton.removeEventListener(myEvent, startApplication);
    message.innerText = "⚛ QUANTUM POWERED";
    playButton.innerText = '⏸️ PAUSE'
    playButton.addEventListener(myEvent, pauseApplication);
    context.resume();
}

function pauseApplication () {
    playButton.removeEventListener(myEvent, pauseApplication);
    playButton.innerText = '▶️ PLAY'
    context.suspend();
    playButton.addEventListener(myEvent, startApplication);
}
