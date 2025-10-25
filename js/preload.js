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

    Promise.all([
      fetch(file(tracks[tracksFromURLIndex][0], trackIndex % magicNumber === 0)),
      fetch(file(tracks[tracksFromURLIndex][1], trackIndex % magicNumber === 0))
    ])
      .then(() => {
        bufferLoader = new BufferLoader(
          getContext(),
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
    // Preload the first song to ensure it's fully loaded before playback
    const firstSongUrl = file(ids[0].id, trackIndex % magicNumber === 0);
    const secondSongUrl = file(ids[1].id, trackIndex % magicNumber === 0);
    
    // Show loading indicator for first song preload
    if (isFirst) {
      const playButton = document.getElementById("play-button");
      if (playButton) {
        playButton.innerText = "⏳ LOADING...";
        playButton.disabled = true;
      }
    }
    
    Promise.all([
      fetch(firstSongUrl),
      fetch(secondSongUrl)
    ])
      .then(() => {
        // Additional preload step: decode the first song's audio data
        if (isFirst) {
          const context = getContext();
          const request = new XMLHttpRequest();
          request.open("GET", firstSongUrl, true);
          request.responseType = "arraybuffer";
          
          request.onload = function() {
            context.decodeAudioData(
              request.response,
              function(buffer) {
                if (!buffer) {
                  console.error('Error preloading first song');
                  startPlayback();
                  return;
                }
                console.log('First song preloaded successfully');
                startPlayback();
              },
              function(error) {
                console.error('Preload decode error:', error);
                startPlayback(); // Continue anyway
              }
            );
          };
          
          request.onerror = function() {
            console.error('Preload fetch error');
            startPlayback(); // Continue anyway
          };
          
          request.send();
        } else {
          startPlayback();
        }
      })
      .catch(hasError);
      
    function startPlayback() {
      // Restore play button
      if (isFirst) {
        const playButton = document.getElementById("play-button");
        if (playButton) {
          playButton.innerText = "⏸️ PAUSE";
          playButton.disabled = false;
        }
      }
      
      bufferLoader = new BufferLoader(
        getContext(),
        getTracks(ids[0].id, ids[1].id, undefined, isFromCountdown),
        finishedLoading,
      );
      bufferLoader.load();
    }
  } else {
    bufferLoader = new BufferLoader(
      getContext(),
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

// Create master processing chain that will be shared across all tracks
const masterCompressor = getContext().createDynamicsCompressor();
masterCompressor.threshold.value = -20;
masterCompressor.knee.value = 20;
masterCompressor.ratio.value = 6;
masterCompressor.attack.value = 0.005;
masterCompressor.release.value = 0.2;

// Add limiter for club systems
const limiter = getContext().createDynamicsCompressor();
limiter.threshold.value = -1;
limiter.knee.value = 0;
limiter.ratio.value = 20;
limiter.attack.value = 0.001;
limiter.release.value = 0.1;

// Add multi-band compression for better control
const lowComp = getContext().createDynamicsCompressor();
lowComp.threshold.value = -24;
lowComp.ratio.value = 4;
lowComp.attack.value = 0.01;
lowComp.release.value = 0.2;

const midComp = getContext().createDynamicsCompressor();
midComp.threshold.value = -20;
midComp.ratio.value = 3;
midComp.attack.value = 0.005;
midComp.release.value = 0.15;

const highComp = getContext().createDynamicsCompressor();
highComp.threshold.value = -18;
highComp.ratio.value = 2;
highComp.attack.value = 0.003;
highComp.release.value = 0.1;

// Create crossover filters
const lowPass = getContext().createBiquadFilter();
lowPass.type = 'lowpass';
lowPass.frequency.value = 200;
lowPass.Q.value = 0.7;

const highPass = getContext().createBiquadFilter();
highPass.type = 'highpass';
highPass.frequency.value = 200;
highPass.Q.value = 0.7;

const midPass = getContext().createBiquadFilter();
midPass.type = 'bandpass';
midPass.frequency.value = 2000;
midPass.Q.value = 1;

// Add sub-bass management
const subFilter = getContext().createBiquadFilter();
subFilter.type = 'lowshelf';
subFilter.frequency.value = 60;
subFilter.gain.value = 1;

// Add high-frequency air control
const airFilter = getContext().createBiquadFilter();
airFilter.type = 'highshelf';
airFilter.frequency.value = 12000;
airFilter.gain.value = 1.5;

// Add phase correlation monitoring
const analyser = getContext().createAnalyser();
analyser.fftSize = 2048;

const masterEQ = getContext().createBiquadFilter();
masterEQ.type = 'highshelf';
masterEQ.frequency.value = 4000;
masterEQ.gain.value = 1.5;

const masterStereo = getContext().createStereoPanner();
masterStereo.pan.value = 0;

// Connect multi-band processing chain
masterCompressor.connect(lowPass);
masterCompressor.connect(midPass);
masterCompressor.connect(highPass);

lowPass.connect(lowComp);
midPass.connect(midComp);
highPass.connect(highComp);

// Mix bands back together
const lowGain = getContext().createGain();
const midGain = getContext().createGain();
const highGain = getContext().createGain();

lowComp.connect(lowGain);
midComp.connect(midGain);
highComp.connect(highGain);

// Connect final processing chain
lowGain.connect(subFilter);
midGain.connect(subFilter);
highGain.connect(subFilter);

subFilter.connect(masterEQ);
masterEQ.connect(airFilter);
airFilter.connect(analyser);
analyser.connect(limiter);
limiter.connect(masterStereo);
masterStereo.connect(getContext().destination);

// Monitor phase correlation
const correlationData = new Float32Array(analyser.fftSize);
function checkPhaseCorrelation() {
  analyser.getFloatTimeDomainData(correlationData);
  let correlation = 0;
  for (let i = 0; i < correlationData.length; i++) {
    correlation += correlationData[i];
  }
  correlation /= correlationData.length;
  
  // If correlation is too low (indicating phase issues), reduce stereo width
  if (correlation < 0.3) {
    masterStereo.pan.value = 0;
  }
}

// Check phase correlation periodically
setInterval(checkPhaseCorrelation, 1000);

function getAndStartBuffer(bufferListItem, time, addListener, buffers) {
  let timestamp;
  let source = getBuffer();
  source.buffer = bufferListItem;
  
  // Create gain nodes for volume control
  const gainNode = getContext().createGain();
  
  // Create per-track processing chain
  const compressor = getContext().createDynamicsCompressor();
  compressor.threshold.value = -24;
  compressor.knee.value = 30;
  compressor.ratio.value = 8;
  compressor.attack.value = 0.003;
  compressor.release.value = 0.25;
  
  // Create per-track EQ for sparkle
  const eq = getContext().createBiquadFilter();
  eq.type = 'highshelf';
  eq.frequency.value = 3000;
  eq.gain.value = 2;
  
  // Connect per-track processing chain
  source.connect(gainNode);
  gainNode.connect(compressor);
  compressor.connect(eq);
  eq.connect(masterCompressor);
  
  // Set initial volume
  gainNode.gain.setValueAtTime(1, time);
  
  // Only fade out if it's not an intro version (trackIndex % magicNumber === 0)
  if (addListener && trackIndex % magicNumber !== 0) {
    const fadeDuration = (60 / activeTempo) * 4;
    const fadeStartTime = time + bufferListItem.duration - fadeDuration;
    
    // For arena systems, we want clean, quick transitions
    // No special key processing - let the natural harmonics work
    gainNode.gain.setValueAtTime(1, fadeStartTime);
    gainNode.gain.linearRampToValueAtTime(0, time + bufferListItem.duration);
  }
  
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
