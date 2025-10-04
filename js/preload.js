import {
  getSelectedSongIds,
  getTracks,
  isMagicTime,
  magicNumber,
  trackIndex,
} from "./tracks.js";
import { BufferLoader } from "./BufferLoader.js";
import { getContext } from "./context.js";
import {
  bufferPadding,
  getBuffer,
  replenishBuffers,
  setBufferPadding,
} from "./buffers.js";
import { activeTempo, setActiveTempo } from "./tempo.js";
import { removeSongFromListById, resetSongs } from "./song.js";
import { activeKey, getNextKey, initialKey } from "./key.js";
import {
  deck1Select,
  deck2Select,
  deck3Select,
  deck4Select,
  deck5Select,
  deck6Select,
  firstSongLabel,
  secondSongLabel,
  thirdSongLabel,
  fourthSongLabel,
  fifthSongLabel,
  sixthSongLabel,
  hideElement,
  showElement,
} from "./dom.js";
import { file, hasError } from "./utils.js";
import {
  parsedTracks,
  tracksFromURL,
  tracksFromURLIndex,
  setTracksFromUrlIndex,
} from "./init.js";
// Using simple Web Audio API like the original two-song system

let bufferLoader;
let isFirst = true;

let tempoChangeIndex = 0;
let usingTracksFromURL = false;

export const resetTempoIndex = () => {
  tempoChangeIndex = 0;
};

export const init = () => {
  if (tracksFromURL && (parsedTracks?.length || 0) > trackIndex) {
    usingTracksFromURL = true;
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
    if (!tracks?.[tracksFromURLIndex]?.[0]) {
      // Loop back to the beginning when we run out of tracks
      setTracksFromUrlIndex(0);
      if (!tracks?.[0]?.[0]) {
        console.error("track URL load error");
        return;
      }
    }
    hideElement(document.getElementById("up-next"));
    hideElement(document.getElementById("on-deck"));
    const hasError = () => (window.location = "/");

    Promise.all([
      fetch(file(tracks[tracksFromURLIndex][0], trackIndex % magicNumber === 0)),
      fetch(file(tracks[tracksFromURLIndex][1], trackIndex % magicNumber === 0)),
      fetch(file(tracks[tracksFromURLIndex][2], trackIndex % magicNumber === 0)),
      fetch(file(tracks[tracksFromURLIndex][3], trackIndex % magicNumber === 0)),
      fetch(file(tracks[tracksFromURLIndex][4], trackIndex % magicNumber === 0)),
      fetch(file(tracks[tracksFromURLIndex][5], trackIndex % magicNumber === 0))
    ])
      .then(() => {
        bufferLoader = new BufferLoader(
          getContext(),
          getTracks(
            tracks[tracksFromURLIndex][0],
            tracks[tracksFromURLIndex][1],
            tracks[tracksFromURLIndex][2],
            tracks[tracksFromURLIndex][3],
            tracks[tracksFromURLIndex][4],
            tracks[tracksFromURLIndex][5],
            true,
          ),
          finishedLoading,
        );
        removeSongFromListById(tracks[tracksFromURLIndex][0]);
        removeSongFromListById(tracks[tracksFromURLIndex][1]);
        removeSongFromListById(tracks[tracksFromURLIndex][2]);
        removeSongFromListById(tracks[tracksFromURLIndex][3]);
        removeSongFromListById(tracks[tracksFromURLIndex][4]);
        removeSongFromListById(tracks[tracksFromURLIndex][5]);
        setTracksFromUrlIndex(tracksFromURLIndex + 1);
        bufferLoader.load();
      })
      .catch(hasError);
  } else if (isFirst || isMagicTime) {
    loadTracks();
    hideElement(document.getElementById("up-next"));
    hideElement(document.getElementById("on-deck"));
  } else {
    hideElement(document.getElementById("hurricane-container"));
    deck1Select.disabled = false;
    deck2Select.disabled = false;
    deck3Select.disabled = false;
    deck4Select.disabled = false;
    deck5Select.disabled = false;
    deck6Select.disabled = false;
    const element = document.getElementById("counter-holder");
    const numberOfSeconds = 31;
    element.innerText = `${numberOfSeconds - 1}`;
    const interval = setInterval(() => {
      const value = parseInt(element.innerText, 10);
      element.innerText = `${value - 1}`;
      if (value - 1 < 7) {
        element.style.color = "lightyellow";
      }
      if (value - 1 < 3) {
        element.style.color = "pink";
      }
      if (value - 1 >= 7) {
        element.style.color = "white";
      }
    }, 1000);
    element.style.display = "inline-block";
    // Note: Labels are already updated by updateUI, no need to copy here
    hideElement(document.getElementById("on-deck"));
    setTimeout(() => {
      loadTracks(true);
      hideElement(element);
      hideElement(document.getElementById("up-next"));
      clearInterval(interval);
    }, numberOfSeconds * 1000);
  }
};

const loadTracks = (isFromCountdown = false, isStartingCountdown = false) => {
  const ids = getSelectedSongIds();
  // Check if we have at least some valid song IDs
  const hasValidIds = ids && ids.filter(id => id && typeof id.id === "number").length >= 6;
  
  if (hasValidIds) {
    Promise.all([
      fetch(file(ids[0].id, trackIndex % magicNumber === 0)),
      fetch(file(ids[1].id, trackIndex % magicNumber === 0)),
      fetch(file(ids[2].id, trackIndex % magicNumber === 0)),
      fetch(file(ids[3].id, trackIndex % magicNumber === 0)),
      fetch(file(ids[4].id, trackIndex % magicNumber === 0)),
      fetch(file(ids[5].id, trackIndex % magicNumber === 0))
    ])
      .then(() => {
        bufferLoader = new BufferLoader(
          getContext(),
          getTracks(
            ids[0].id, 
            ids[1].id, 
            ids[2].id,
            ids[3].id,
            ids[4].id,
            ids[5].id,
            undefined, 
            isFromCountdown
          ),
          finishedLoading,
        );
        bufferLoader.load();
      })
      .catch(hasError);
  } else {
    bufferLoader = new BufferLoader(
      getContext(),
      getTracks(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
            true, // skipSamples - completely removed
            isFromCountdown,
            isStartingCountdown,
      ),
      finishedLoading,
    );
  }
};

function getAndStartBuffer(bufferListItem, time, addListener, buffers) {
  let timestamp;
  let source = getBuffer();
  source.buffer = bufferListItem;
  source.connect(getContext().destination);
  source.start(time);
  source.stop(time + bufferListItem.duration);
  if (addListener) {
    source.addEventListener("ended", (event) => {
      (buffers || []).forEach((buffer) => {
        buffer = null;
      });
      showElement(document.getElementById("up-next"));
      if (event?.timeStamp && event.timeStamp - timestamp < 30) {
        return;
      }
      timestamp = event.timeStamp;
      init();
    });
  }
}

function finishedLoading(bufferList, tempo) {
  // Start all six main tracks simultaneously (like the original two-song system)
  getAndStartBuffer(bufferList[0], bufferPadding, true, [
    bufferList[0],
    bufferList[1],
    bufferList[2],
    bufferList[3],
    bufferList[4],
    bufferList[5],
  ]);
  
  // Start tracks 1-5 simultaneously
  if (bufferList[1]) {
    getAndStartBuffer(bufferList[1], bufferPadding);
  }
  if (bufferList[2]) {
    getAndStartBuffer(bufferList[2], bufferPadding);
  }
  if (bufferList[3]) {
    getAndStartBuffer(bufferList[3], bufferPadding);
  }
  if (bufferList[4]) {
    getAndStartBuffer(bufferList[4], bufferPadding);
  }
  if (bufferList[5]) {
    getAndStartBuffer(bufferList[5], bufferPadding);
  }
  
  // Handle DJ samples during magic time (like the original)
  if (!usingTracksFromURL && !isFirst) {
    if (bufferList[6]) {
      // delay the start until halfway through the bar
      getAndStartBuffer(
        bufferList[6],
        bufferPadding + ((60 / activeTempo) * 16) / 2,
      );
    }
    if (bufferList[7]) {
      getAndStartBuffer(bufferList[7], bufferPadding);
    }
  }

  const barDuration = 60 / tempo;
  const min =
    bufferList[0].duration < 32
      ? activeTempo === 123
        ? barDuration * 64
        : barDuration * 16
      : activeTempo === 123
      ? barDuration * 256
      : barDuration * 64;
  setBufferPadding(bufferPadding + min);
  if (!usingTracksFromURL) {
    if (activeKey === getNextKey(initialKey, true)) {
      tempoChangeIndex += 1;
      if (tempoChangeIndex % 9 === 0) {
        resetSongs();
        console.log("reset songs");
      }
      if (activeTempo === 84) {
        setActiveTempo(94);
      } else if (activeTempo === 94) {
        setActiveTempo(102);
      } else if (activeTempo === 102) {
        setActiveTempo(84);
      } else if (activeTempo === 123) {
        setActiveTempo(84);
      }
      console.log("tempo change", activeTempo);
    }
  }
  replenishBuffers(bufferList.length);
  if (isFirst) {
    isFirst = false;
    init();
  }
}

//window.onload = init;
