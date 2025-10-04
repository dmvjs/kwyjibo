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
import { QuantumBeatEngine } from "./quantumBeatEngine.js";
import { masterBus } from "./masterBus.js";
import { sampleVolumes } from "./samples.js";

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

  // Show loading indicator
  const loadingElement = document.getElementById('loading-indicator');
  if (loadingElement) {
    loadingElement.style.display = 'block';
  }

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
        undefined,
        isFromCountdown,
        isStartingCountdown,
      ),
      finishedLoading,
    );
  }
};

function getAndStartBuffer(bufferListItem, time, addListener, buffers, entanglementPattern = null, useAnalyzer = false, trackIndex = 0, sampleVolume = null) {
  let timestamp;
  let source = getBuffer();
  source.buffer = bufferListItem;
  let gainNode;

  // Handle DJ samples (trackIndex = -1)
  if (trackIndex === -1) {
    // DJ sample - COMPLETELY MUTED
    gainNode = getContext().createGain();
    gainNode.gain.value = 0; // COMPLETELY SILENT

    // Set source volume to 0 as well
    if (source.gain) {
      source.gain.value = 0;
    }

    // Connect but with zero volume
    source.connect(gainNode);
    gainNode.connect(getContext().destination); // Direct to output with zero volume

  } else if (useAnalyzer) {
    // Quantum beat engine for main tracks
    try {
      const engine = new QuantumBeatEngine(trackIndex);
      const analyzerGain = engine.createAnalyzerChain(source);

      // If entanglement is needed, add a separate gain node for it
      if (entanglementPattern) {
        // Disconnect analyzer from master bus and add entanglement gain
        analyzerGain.disconnect();

        const entanglementGain = getContext().createGain();
        analyzerGain.connect(entanglementGain);
        entanglementGain.connect(masterBus.getInput()); // Route to master bus

        gainNode = entanglementGain;

        const beatDuration = 60 / activeTempo;
        const cycleDuration = beatDuration * 8;
        const numCycles = Math.ceil(bufferListItem.duration / cycleDuration);

        // console.log(`🔗 Entangled track ${entanglementPattern}`); // Removed spam

        for (let i = 0; i < numCycles; i++) {
          const cycleStart = time + (i * cycleDuration);

          if (entanglementPattern === 'A') {
            if (i % 2 === 0) {
              entanglementGain.gain.setValueAtTime(1, cycleStart);
            } else {
              entanglementGain.gain.setValueAtTime(0, cycleStart);
            }
          } else if (entanglementPattern === 'B') {
            if (i % 2 === 0) {
              entanglementGain.gain.setValueAtTime(0, cycleStart);
            } else {
              entanglementGain.gain.setValueAtTime(1, cycleStart);
            }
          }
        }
      } else {
        gainNode = analyzerGain;
      }
      // Engine created
    } catch (error) {
      console.error(`Engine error track ${trackIndex}:`, error);
      // Fallback to standard processing
      useAnalyzer = false;
    }
  }

  if (!useAnalyzer) {
    // Standard processing chain
    // Create gain nodes for volume control
    gainNode = getContext().createGain();

    // Create audio processing chain
    const compressor = getContext().createDynamicsCompressor();
    compressor.threshold.value = -24;
    compressor.knee.value = 30;
    compressor.ratio.value = 12;
    compressor.attack.value = 0.003;
    compressor.release.value = 0.25;

    // Create stereo enhancement
    const stereoEnhancer = getContext().createStereoPanner();
    stereoEnhancer.pan.value = 0; // Center position

    // Create EQ for sparkle
    const eq = getContext().createBiquadFilter();
    eq.type = 'highshelf';
    eq.frequency.value = 3000; // 3kHz shelf
    eq.gain.value = 3; // Subtle boost

    // Connect main processing chain
    source.connect(gainNode);
    gainNode.connect(compressor);
    compressor.connect(eq);
    eq.connect(stereoEnhancer);
    stereoEnhancer.connect(masterBus.getInput()); // Route to master bus

    // Set initial volume
    gainNode.gain.setValueAtTime(1, time);

    // Apply entanglement pattern if specified (for alternating songs)
    if (entanglementPattern) {
      const beatDuration = 60 / activeTempo; // Duration of one beat in seconds
      const cycleDuration = beatDuration * 8; // 8 beats
      const numCycles = Math.ceil(bufferListItem.duration / cycleDuration);

      // Schedule gain changes for each 8-beat cycle
      for (let i = 0; i < numCycles; i++) {
        const cycleStart = time + (i * cycleDuration);

        if (entanglementPattern === 'A') {
          // Pattern A: ON for first 8 beats, OFF for next 8 beats
          if (i % 2 === 0) {
            gainNode.gain.setValueAtTime(1, cycleStart);
          } else {
            gainNode.gain.setValueAtTime(0, cycleStart);
          }
        } else if (entanglementPattern === 'B') {
          // Pattern B: OFF for first 8 beats, ON for next 8 beats
          if (i % 2 === 0) {
            gainNode.gain.setValueAtTime(0, cycleStart);
          } else {
            gainNode.gain.setValueAtTime(1, cycleStart);
          }
        }
      }
    }

    // If this is a transition, fade out the previous track
    if (addListener) {
      const fadeDuration = (60 / activeTempo) * 4;
      const fadeStartTime = time + bufferListItem.duration - fadeDuration;

      // Fade out main track (only if not using entanglement)
      if (!entanglementPattern) {
        gainNode.gain.setValueAtTime(1, fadeStartTime);
        gainNode.gain.linearRampToValueAtTime(0, time + bufferListItem.duration);
      }
    }
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
  // QUANTUM GENERATIVE BEAT ENGINE
  // Fractures 6 songs into stems and sequences them into ONE evolving beat

  // Hide loading indicator
  const loadingElement = document.getElementById('loading-indicator');
  if (loadingElement) {
    loadingElement.style.display = 'none';
  }

  // Use bufferPadding for proper timing alignment
  // Track 1: Kick
  getAndStartBuffer(bufferList[0], bufferPadding, true, bufferList.slice(0, 6), null, true, 0);

  // Track 2: Snare
  if (bufferList[1]) {
    getAndStartBuffer(bufferList[1], bufferPadding, false, null, null, true, 1);
  }

  // Track 3: Bass
  if (bufferList[2]) {
    getAndStartBuffer(bufferList[2], bufferPadding, false, null, null, true, 2);
  }

  // Track 4: Percussion
  if (bufferList[3]) {
    getAndStartBuffer(bufferList[3], bufferPadding, false, null, null, true, 3);
  }

  // Track 5: Melody (entangled)
  if (bufferList[4]) {
    getAndStartBuffer(bufferList[4], bufferPadding, false, null, 'A', true, 4);
  }

  // Track 6: Texture (entangled)
  if (bufferList[5]) {
    getAndStartBuffer(bufferList[5], bufferPadding, false, null, 'B', true, 5);
  }

  // DJ samples completely removed - no sample loading at all
  // This prevents crashes during song transitions

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
  replenishBuffers(6); // Only 6 main tracks, no samples
  if (isFirst) {
    isFirst = false;
    init();
  }
}

//window.onload = init;
