import { getContext } from "./context.js";
import { init } from "./preload.js";

const playButton = document.getElementById("play-button");
let userHasPressedPlay = false;
let wakeLock = null;

const myEvent =
  "ontouchstart" in document.documentElement ? "touchend" : "click";
playButton.addEventListener(myEvent, startApplication);

async function requestWakeLock() {
  try {
    if ('wakeLock' in navigator) {
      // Only request if we don't already have one
      if (wakeLock === null) {
        wakeLock = await navigator.wakeLock.request('screen');
        console.log('Wake Lock is active');
        
        // Handle when wake lock is released by the system
        wakeLock.addEventListener('release', () => {
          console.log('Wake Lock was released by the system');
          wakeLock = null;
          // If we're still playing, try to reacquire
          if (userHasPressedPlay) {
            requestWakeLock();
          }
        });
      }
    }
  } catch (err) {
    console.error(`Wake Lock request failed: ${err.name}, ${err.message}`);
    wakeLock = null;
  }
}

async function releaseWakeLock() {
  if (wakeLock !== null) {
    try {
      await wakeLock.release();
      wakeLock = null;
      console.log('Wake Lock released');
    } catch (err) {
      console.error(`Wake Lock release failed: ${err.name}, ${err.message}`);
    }
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
  if (context.state === 'suspended') {
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
document.addEventListener('visibilitychange', async () => {
  if (document.visibilityState === 'visible' && userHasPressedPlay) {
    await requestWakeLock();
  }
});

// Cleanup on page unload
window.addEventListener('beforeunload', async () => {
  await releaseWakeLock();
});
