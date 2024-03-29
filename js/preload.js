import {
  getSelectedSongIds,
  getTracks,
  isMagicTime,
  magicNumber,
  trackIndex,
} from "./tracks.js";
import { BufferLoader } from "./BufferLoader.js";
import { context } from "./context.js";
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
  firstSongLabel,
  fourthSongLabel,
  hideElement,
  secondSongLabel,
  showElement,
  thirdSongLabel,
} from "./dom.js";
import { file, hasError } from "./utils.js";
import {
  parsedTracks,
  tracksFromURL,
  tracksFromURLIndex,
  setTracksFromUrlIndex,
} from "./init.js";

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
        // a string like this will also work: 1,2-3,4-5,6 and will evaluate to [[1,2],[3,4],[5,6]]
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
      console.error("track URL load error");
      return;
    }
    hideElement(document.getElementById("up-next"));
    hideElement(document.getElementById("on-deck"));
    const hasError = () => (window.location = "/");

    fetch(file(tracks[tracksFromURLIndex][0], trackIndex % magicNumber === 0))
      .then(
        fetch(
          file(tracks[tracksFromURLIndex][1], trackIndex % magicNumber === 0),
        ),
      )
      .then(() => {
        bufferLoader = new BufferLoader(
          context,
          getTracks(
            tracks[tracksFromURLIndex][0],
            tracks[tracksFromURLIndex][1],
            true,
          ),
          finishedLoading,
        );
        removeSongFromListById(tracks[tracksFromURLIndex][0].id);
        removeSongFromListById(tracks[tracksFromURLIndex][1].id);
        setTracksFromUrlIndex(tracksFromURLIndex + 1);
        bufferLoader.load();
      }, hasError);
  } else if (isFirst || isMagicTime) {
    loadTracks();
    hideElement(document.getElementById("up-next"));
    hideElement(document.getElementById("on-deck"));
  } else {
    hideElement(document.getElementById("hurricane-container"));
    deck1Select.disabled = false;
    deck2Select.disabled = false;
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
    firstSongLabel.innerText = thirdSongLabel.innerText;
    secondSongLabel.innerText = fourthSongLabel.innerText;
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
  if (ids && typeof ids[0]?.id === "number" && typeof ids[1]?.id === "number") {
    fetch(file(ids[0].id, trackIndex % magicNumber === 0))
      .then(fetch(file(ids[1].id, trackIndex % magicNumber === 0)))
      .then(() => {
        bufferLoader = new BufferLoader(
          context,
          getTracks(ids[0].id, ids[1].id, undefined, isFromCountdown),
          finishedLoading,
        );
        bufferLoader.load();
      }, hasError);
  } else {
    bufferLoader = new BufferLoader(
      context,
      getTracks(
        undefined,
        undefined,
        undefined,
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
  source.connect(context.destination);
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
  getAndStartBuffer(bufferList[0], bufferPadding, true, [
    bufferList[0],
    bufferList[1],
    bufferList[2],
    bufferList[3],
  ]);
  if (bufferList[1]) {
    getAndStartBuffer(bufferList[1], bufferPadding);
  }
  if (!usingTracksFromURL && !isFirst) {
    if (bufferList[2]) {
      // delay the start until halfway through the bar
      getAndStartBuffer(
        bufferList[2],
        bufferPadding + ((60 / activeTempo) * 16) / 2,
      );
    }
    if (bufferList[3]) {
      getAndStartBuffer(bufferList[3], bufferPadding);
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
        setActiveTempo(123);
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
