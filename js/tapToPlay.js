import { getContext } from "./context.js";
import { init } from "./preload.js";

const playButton = document.getElementById("play-button");
let userHasPressedPlay = false;
let wakeLock = null;
let playClicked = false;

const myEvent =
  "ontouchstart" in document.documentElement ? "touchend" : "click";
playButton.addEventListener(myEvent, function () {
  if (playClicked) return;
  playClicked = true;
  startApplication();
  setTimeout(() => {
    playClicked = false;
  }, 1000);
});

async function requestWakeLock() {
  try {
    if ("wakeLock" in navigator) {
      // Only request if we don't already have one
      if (wakeLock === null) {
        wakeLock = await navigator.wakeLock.request("screen");
      }
    }
  } catch (err) {
    wakeLock = null;
  }
}

async function releaseWakeLock() {
  if (wakeLock !== null) {
    try {
      await wakeLock.release();
      wakeLock = null;
    } catch (err) {}
  }
}

async function startApplication() {
  if (userHasPressedPlay === false) {
    userHasPressedPlay = true;
    init();
  }
  playButton.removeEventListener(myEvent, startApplication);
  playButton.innerText = "⏸️ PAUSE";
  playButton.addEventListener(myEvent, pauseApplication);

  // Resume audio context
  const context = getContext();
  if (context.state === "suspended") {
    context.resume();
  }

  // Request wake lock
  await requestWakeLock();
}

async function pauseApplication() {
  playButton.removeEventListener(myEvent, pauseApplication);
  playButton.innerText = "▶️ PLAY";
  getContext().suspend();

  // Release wake lock
  await releaseWakeLock();

  playButton.addEventListener(myEvent, startApplication);
}

// Handle visibility change
document.addEventListener("visibilitychange", async () => {
  if (document.visibilityState === "visible" && userHasPressedPlay) {
    await requestWakeLock();
  }
});

// Cleanup on page unload
window.addEventListener("beforeunload", async () => {
  await releaseWakeLock();
});
