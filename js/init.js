import "./shuffle.js";
import { songdata } from "./songdata.js";
import { setActiveTempo, tempos } from "./tempo.js";
import {
  deck1Select,
  deck2Select,
  deck3Select,
  deck4Select,
  deck5Select,
  deck6Select,
  initializeKeyListeners,
  initializeTempo,
  showElement,
} from "./dom.js";
import { file, parseTracks } from "./utils.js";
import { magicNumber, trackIndex } from "./tracks.js";
import { getSongById } from "./song.js";
import { setActiveKey, setInitialKey } from "./key.js";

/**
 * This checks if the not localhost page is being served over https and if not, redirects to https
 */
if (!location.host.includes("localhost") && location.protocol !== "https:") {
  location.replace(
    `https:${location.href.substring(location.protocol.length)}`,
  );
}
export let tracksFromURLIndex = 0;
export const setTracksFromUrlIndex = (value) => {
  tracksFromURLIndex = value;
};
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
export const tracksFromURL = params.tracks || null;
export const parsedTracks = parseTracks(tracksFromURL);

if (tracksFromURL && parseTracks(tracksFromURL).length > trackIndex) {
  let tracks;
  try {
    // if you just provide a number value for tracks it will repeat a single track
    if (typeof tracks === "number") {
      tracks = [[tracks]];
    } else {
      tracks = JSON.parse(tracksFromURL);
    }
  } catch (e) {
    if (!Array.isArray(tracks)) {
      // a string like this will also work: 1,2,3,4,5,6-7,8,9,10,11,12 and will evaluate to [[1,2,3,4,5,6],[7,8,9,10,11,12]]
      tracks = tracksFromURL
        .split("-")
        .filter(Boolean)
        .map((x) =>
          x
            .split(",")
            .filter(Boolean)
            .map((v) => parseInt(v, 10)),
        );
    }
  }
  showElement(document.getElementById("hurricane-container"));
  const song1 = getSongById(tracks[tracksFromURLIndex][0]);
  const song2 = getSongById(tracks[tracksFromURLIndex][1]);
  const song3 = getSongById(tracks[tracksFromURLIndex][2]);
  const song4 = getSongById(tracks[tracksFromURLIndex][3]);
  const song5 = getSongById(tracks[tracksFromURLIndex][4]);
  const song6 = getSongById(tracks[tracksFromURLIndex][5]);
  
  // Prefetch all 6 tracks
  fetch(file(tracks[tracksFromURLIndex][0], trackIndex % magicNumber === 0));
  fetch(file(tracks[tracksFromURLIndex][1], trackIndex % magicNumber === 0));
  fetch(file(tracks[tracksFromURLIndex][2], trackIndex % magicNumber === 0));
  fetch(file(tracks[tracksFromURLIndex][3], trackIndex % magicNumber === 0));
  fetch(file(tracks[tracksFromURLIndex][4], trackIndex % magicNumber === 0));
  fetch(file(tracks[tracksFromURLIndex][5], trackIndex % magicNumber === 0));
  
  // Set deck values
  deck1Select.value = song1.id;
  deck2Select.value = song2.id;
  deck3Select.value = song3.id;
  deck4Select.value = song4.id;
  deck5Select.value = song5.id;
  deck6Select.value = song6.id;
  
  // Disable all decks during URL playback
  deck1Select.disabled = true;
  deck2Select.disabled = true;
  deck3Select.disabled = true;
  deck4Select.disabled = true;
  deck5Select.disabled = true;
  deck6Select.disabled = true;
  
  setActiveKey(song1.key);
  setInitialKey(song1.key);
  setActiveTempo(song1.bpm);
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
