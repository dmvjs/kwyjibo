import "./shuffle.js";
import { songdata } from "./songdata.js";
import { tempos } from "./tempo.js";
import { initializeKeyListeners, initializeTempo } from "./dom.js";

/**
 * This checks if the not localhost page is being served over https and if not, redirects to https
 */
if (!location.host.includes("localhost") && location.protocol !== "https:") {
  location.replace(
    `https:${location.href.substring(location.protocol.length)}`,
  );
}

/**
 * this sets the number of songs in the songdata array to the version number in the page
 */
const counterSpan = document.getElementById("song-counter");
counterSpan.innerHTML = String(songdata.length);

/**
 * This prints the songs by tempo, by key to the console
 */
export const showSongMatrix = (array) => {
  for (const tempo of tempos.filter(Boolean)) {
    const rv = Array.from({ length: 12 }, (int, index) => {
      return array.filter((item) => {
        if (item.bpm !== Number(tempo)) {
          return false;
        }
        if (item.computedKey) {
          return item.computedKey === index + 1;
        }
        return item.key === index + 1;
      });
    });
    console.log(tempo, rv);
  }
};

showSongMatrix(songdata);
initializeKeyListeners();
initializeTempo();
