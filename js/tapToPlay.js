import { context } from "./context.js";
import { init } from "./preload.js";

const playButton = document.getElementById("play-button");

const myEvent =
  "ontouchstart" in document.documentElement ? "touchend" : "click";
playButton.addEventListener(myEvent, startApplication);
export let userHasPressedPlay = false;

function startApplication() {
  if (userHasPressedPlay === false) {
    userHasPressedPlay = true;
    init();
  }
  playButton.removeEventListener(myEvent, startApplication);
  playButton.innerText = "⏸️ PAUSE";
  playButton.addEventListener(myEvent, pauseApplication);
  setTimeout(() => {
    context.resume();
  }, 500);
}

function pauseApplication() {
  playButton.removeEventListener(myEvent, pauseApplication);
  playButton.innerText = "▶️ PLAY";
  context.suspend();
  playButton.addEventListener(myEvent, startApplication);
}
