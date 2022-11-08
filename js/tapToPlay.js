import {context} from "./context.js";

const playButton = document.getElementById('play-button')
const pauseButton = document.getElementById('pause-button')
pauseButton.hidden = true;

const myEvent = ('ontouchstart' in document.documentElement) ? 'touchend' : 'click';
playButton.addEventListener(myEvent, startApplication);
pauseButton.addEventListener(myEvent, pauseApplication);

function startApplication () {
    pauseButton.hidden = false;
    playButton.hidden = true;
    context.resume();
}

function pauseApplication () {
    pauseButton.hidden = true;
    playButton.hidden = false;
    context.suspend();
}