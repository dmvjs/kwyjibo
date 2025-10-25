import { activeKey, keySort, setActiveKey } from "./key.js";
import { filetype } from "./filetype.js";
import { justStarTrekIntro, samples } from "./samples.js";
import { getSongById } from "./song.js";
import { activeTempo } from "./tempo.js";
import { quantumRandom } from "./cryptoRandom.js";
import { songdata } from "./songdata.js";
import { addTracks } from "./share.js";
import {
  deck1Select,
  deck2Select,
  firstSongLabel,
  fourthSongLabel,
  hideElement,
  secondSongLabel,
  showElement,
  thirdSongLabel,
  updateActiveKey,
} from "./dom.js";
import { getSong, getSongs } from "./getSongs.js";
import "./shuffle.js";
import { file } from "./utils.js";

let holder = {};
export const magicNumber = 5;

export let trackIndex = 0;
export let isMagicTime = trackIndex % magicNumber === 0;

export let fsID;
export let ssID;
export let nowPlayingIndex = 0;

// At the top of the file, ensure this is set (add if not present)
if (typeof window.firstMainPair === "undefined") {
  window.firstMainPair = null;
}

if (typeof window.firstPlayedPair === "undefined") {
  window.firstPlayedPair = null;
}

export const updateUI = (
  key,
  firstSongId,
  secondSongId,
  trackIndex,
  isFromCountdown = false,
) => {
  fsID = firstSongId;
  ssID = secondSongId;
  // Set the active key to the key of the first song in the now playing pair
  const firstSong = songdata.find((item) => item.id === firstSongId);
  if (firstSong) setActiveKey(firstSong.key);
  return () => {
    const params = new URLSearchParams(window.location.search);
    const urlTracks = params.get("tracks");
    window.playedSongs = window.playedSongs || [];
    window.playedSongs.push([firstSongId, secondSongId]);

    if (urlTracks && window.playedSongs && window.playedSongs.length > 0) {
      // --- Playback mode logic (new) ---
      if (!document.body.classList.contains("playback-mode")) {
        document.body.classList.add("playback-mode");
        const upNext = document.getElementById("up-next");
        if (upNext) upNext.style.display = "none";
      }
      document.body.className = `playback-mode color-${key}`;
      // Fix off-by-one: show the second-to-last entry as the current pair
      const idx = Math.max(0, window.playedSongs.length - 2);
      const currentPair = window.playedSongs[idx];
      const firstSongUI = songdata.find((item) => item.id === currentPair?.[0]);
      const secondSongUI = songdata.find(
        (item) => item.id === currentPair?.[1],
      );
      if (firstSongUI && secondSongUI) {
        firstSongLabel.innerText = `${firstSongUI.artist} - ${firstSongUI.title}`;
        secondSongLabel.innerText = `${secondSongUI.artist} - ${secondSongUI.title}`;
        firstSongLabel.className = `text-color-${firstSongUI.key}`;
        secondSongLabel.className = `text-color-${secondSongUI.key}`;
      }
      // For next songs, use the next index in playedSongs
      const nextIndex = window.playedSongs.length;
      const thirdSongUI = songdata.find(
        (item) => item.id === window.playedSongs?.[nextIndex]?.[0],
      );
      const fourthSongUI = songdata.find(
        (item) => item.id === window.playedSongs?.[nextIndex]?.[1],
      );
      thirdSongLabel.innerText = `${thirdSongUI?.artist || ""} - ${
        thirdSongUI?.title || ""
      }`;
      fourthSongLabel.innerText = `${fourthSongUI?.artist || ""} - ${
        fourthSongUI?.title || ""
      }`;
      thirdSongLabel.className = `text-color-${thirdSongUI?.key}`;
      fourthSongLabel.className = `text-color-${fourthSongUI?.key}`;
      document.body.className = `playback-mode color-${key}`;
      document.getElementById("play-button").className = `button-color-${key}`;
      document.getElementById(
        "contact-button",
      ).className = `button-color-${key}`;
      document.getElementById(
        "youtube-button",
      ).className = `button-color-${key}`;
      document.getElementById(
        "github-button",
      ).className = `button-color-${key}`;
      if (isFromCountdown) {
        showElement(document.getElementById("on-deck"));
      } else {
        hideElement(document.getElementById("on-deck"));
      }
      showElement(document.getElementById("now-playing"));
      const totalPairs = window.playlist ? window.playlist.length : 0;
      const remainingPairs = totalPairs - window.playedSongs.length;
      const upNext = document.getElementById("up-next");
      if (urlTracks && remainingPairs <= 1) {
        if (upNext) upNext.style.display = "block";
      }
    } else {
      // --- Normal mode logic (original, always update) ---
      document.body.className = `color-${key}`;
      const played = window.playedSongs;
      const idx = played.length - 1;
      const prevIdx = Math.max(0, idx - 1);
      const firstSongUI = songdata.find((item) => item.id === played[idx][0]);
      const secondSongUI = songdata.find((item) => item.id === played[idx][1]);
      const thirdSongUI = songdata.find(
        (item) => item.id === played[prevIdx][0],
      );
      const fourthSongUI = songdata.find(
        (item) => item.id === played[prevIdx][1],
      );
      firstSongLabel.innerText = `${thirdSongUI?.artist || ""} - ${
        thirdSongUI?.title || ""
      }`;
      secondSongLabel.innerText = `${fourthSongUI?.artist || ""} - ${
        fourthSongUI?.title || ""
      }`;
      thirdSongLabel.innerText = `${firstSongUI?.artist || ""} - ${
        firstSongUI?.title || ""
      }`;
      fourthSongLabel.innerText = `${secondSongUI?.artist || ""} - ${
        secondSongUI?.title || ""
      }`;
      firstSongLabel.className = `text-color-${thirdSongUI?.key}`;
      secondSongLabel.className = `text-color-${fourthSongUI?.key}`;
      thirdSongLabel.className = `text-color-${firstSongUI?.key}`;
      fourthSongLabel.className = `text-color-${secondSongUI?.key}`;
      loadSongsIntoSelect();
      document.getElementById("play-button").className = `button-color-${key}`;
      document.getElementById(
        "contact-button",
      ).className = `button-color-${key}`;
      document.getElementById(
        "youtube-button",
      ).className = `button-color-${key}`;
      document.getElementById(
        "github-button",
      ).className = `button-color-${key}`;
      if (isFromCountdown) {
        showElement(document.getElementById("on-deck"));
      } else {
        hideElement(document.getElementById("on-deck"));
      }
      showElement(document.getElementById("now-playing"));
    }
  };
};

export const getSelectedSongIds = () => {
  const songs = getSongs();
  const firstSong =
    deck1Select.value === "-1"
      ? null
      : songs.thisTempoSongs.find((s) => {
          return s.id === parseInt(deck1Select.value, 10);
        });
  const secondSong =
    deck2Select.value === "-1"
      ? null
      : songs.thisTempoSongs.find((s) => {
          return s.id === parseInt(deck2Select.value, 10);
        });
  return [firstSong, secondSong];
};
export const loadSongsIntoSelect = () => {
  const songs = getSongs();
  deck1Select.length = 0;
  deck2Select.length = 0;
  const optionDefault1 = document.createElement("option");
  optionDefault1.value = "-1";
  optionDefault1.innerText = `Pick next deck 1 song ${activeTempo}bpm`;
  deck1Select.appendChild(optionDefault1);
  deck1Select.value = "-1";

  const optionDefault2 = document.createElement("option");
  optionDefault2.value = "-1";
  optionDefault2.innerText = `Pick next deck 2 song ${activeTempo}bpm`;
  deck2Select.appendChild(optionDefault2);
  deck2Select.value = "-1";

  let playedSongs = [];
  if (window.playedSongs?.length) {
    playedSongs = [...new Set(window.playedSongs.flat())];
    playedSongs = playedSongs.slice(
      playedSongs.length - Math.min(90, playedSongs.length),
      playedSongs.length,
    );
  }

  const firstID = [...new Set(songs.thisKeySongs)]
    .filter((song) => !playedSongs.includes(song.id))
    .filter(Boolean)
    ._shuffle()[0];
  const secondID = [...new Set(songs.thisKeySongs)]
    .filter((song) => !playedSongs.includes(song.id))
    .filter(Boolean)
    .filter((x) => x.artist !== firstID.artist)
    ._shuffle()[0];

  [
    ...new Set(
      songs.thisTempoSongs
        .filter(Boolean)
        .sort((a, b) => a.title < b.title)
        .sort((a, b) => a.artist > b.artist)
        .sort(keySort),
    ),
  ].map((item) => {
    const option1 = document.createElement("option");
    option1.value = `${item.id}`;
    option1.innerText = `${item.artist} - ${item.title} [${item.key}]`;
    const option2 = document.createElement("option");
    option2.value = `${item.id}`;
    option2.innerText = `${item.artist} - ${item.title} [${item.key}]`;
    deck1Select.appendChild(option1);
    deck2Select.appendChild(option2);
  });
  deck1Select.value = firstID.id;
  deck2Select.value = secondID.id;
};
export const getTracks = (
  track1,
  track2,
  skipSamples = false,
  isFromCountdown = false,
) => {
  const isUsingTracksFromURL = track1 !== undefined;
  isMagicTime = trackIndex % magicNumber === 0;
  if (isMagicTime) {
    // console.log('station identification…')
  }
  const firstSongFromURL = track1 && getSongById(track1);
  const secondSongFromURL = track2 ? getSongById(track2) : null;
  const firstSong =
    firstSongFromURL || trackIndex % magicNumber === 1 ? null : getSong();
  const firstSongId =
    trackIndex % magicNumber === 1
      ? holder[trackIndex - 1][0]
      : firstSongFromURL?.id || firstSong.id;
  const secondSongId =
    trackIndex % magicNumber === 1
      ? holder[trackIndex - 1][1]
      : isUsingTracksFromURL
      ? track2
        ? secondSongFromURL?.id
        : null
      : getSong(firstSong.key, firstSong.artist).id;
  if (!isMagicTime) {
    // console.log('followed by…')
  }
  const firstTrack = file(firstSongId, isMagicTime);
  let secondTrack;
  if (secondSongId) {
    secondTrack = file(secondSongId, isMagicTime);
  }
  addTracks([firstSongId, secondSongId]);
  let thirdTrack;
  let fourthTrack;
  if (!skipSamples) {
    thirdTrack = isMagicTime
      ? `../music/${
          samples[Math.floor(quantumRandom() * samples.length)]
        }${filetype}`
      : null;
    fourthTrack = isMagicTime ? justStarTrekIntro[0] : null;
  }
  const returnArray = [firstTrack];
  if (secondTrack) {
    returnArray.push(secondTrack);
  }
  if (!skipSamples && thirdTrack) {
    returnArray.push(thirdTrack);
    returnArray.push(fourthTrack);
  }
  requestAnimationFrame(
    updateUI(activeKey, firstSongId, secondSongId, trackIndex, isFromCountdown),
  );
  if (isMagicTime) {
    holder[trackIndex] = [firstSongId, secondSongId];
  } else {
    updateActiveKey();
  }
  trackIndex += 1;
  return {
    bpm: firstSongFromURL?.bpm || activeTempo,
    list: returnArray,
  };
};
