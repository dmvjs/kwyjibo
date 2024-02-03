import { activeKey, keySort } from "./key.js";
import { filetype } from "./filetype.js";
import { justStarTrekIntro, samples } from "./samples.js";
import { getSongById } from "./song.js";
import { activeTempo, updateTempoUI } from "./tempo.js";
import { quantumRandom } from "./cryptoRandom.js";
import { songdata } from "./songdata.js";
import { addTracks } from "./share.js";
import { showElement, updateActiveKey } from "./dom.js";
import { getSong, getSongs } from "./getSongs.js";
import "./shuffle.js";

let holder = {};
const magicNumber = 5;

export let trackIndex = 0;
export let isMagicTime = trackIndex % magicNumber === 0;

export const deck1Select = document.getElementById("deck-1");
export const deck2Select = document.getElementById("deck-2");
export const keyEnumeration = document.getElementById("key-enumeration");
export const tempoCount = document.getElementById("tempo-count");
export const firstSongLabel = document.getElementById("first-song-label");
export const secondSongLabel = document.getElementById("second-song-label");
export const thirdSongLabel = document.getElementById("third-song-label");
export const fourthSongLabel = document.getElementById("fourth-song-label");

export let fsID;
export let ssID;

export const updateUI = (key, firstSongId, secondSongId) => {
  /*if (trackIndex >= 3) {
        showElement(document.getElementById('share-button'));
    }*/
  fsID = firstSongId;
  ssID = secondSongId;
  return () => {
    document.body.className = `color-${key}`;
    tempoCount.innerText = songdata.filter(
      (item) => item.id === firstSongId,
    )[0].bpm;
    window.playedSongs = window.playedSongs || [];
    window.playedSongs.push([firstSongId, secondSongId]);
    const firstSongUI = songdata.filter(
      (item) =>
        item.id ===
        window.playedSongs[trackIndex - 1 < 0 ? 0 : trackIndex - 1][0],
    )[0];
    const secondSongUI = songdata.filter(
      (item) =>
        item.id ===
        window.playedSongs[trackIndex - 1 < 0 ? 0 : trackIndex - 1][1],
    )[0];
    const thirdSongUI = songdata.filter(
      (item) =>
        item.id ===
        window.playedSongs[trackIndex - 2 < 0 ? 0 : trackIndex - 2][0],
    )[0];
    const fourthSongUI = songdata.filter(
      (item) =>
        item.id ===
        window.playedSongs[trackIndex - 2 < 0 ? 0 : trackIndex - 2][1],
    )[0];
    firstSongLabel.innerText = `${firstSongUI.artist || ""} - ${
      firstSongUI.title || ""
    }`;
    secondSongLabel.innerText = `${secondSongUI?.artist || ""} - ${
      secondSongUI?.title || ""
    }`;
    firstSongLabel.className = `text-color-${thirdSongUI?.key}`;
    secondSongLabel.className = `text-color-${fourthSongUI?.key}`;
    thirdSongLabel.className = `text-color-${firstSongUI.key}`;
    fourthSongLabel.className = `text-color-${secondSongUI?.key}`;
    loadSongsIntoSelect();
    tempoCount.innerText = firstSongUI.bpm;
    keyEnumeration.innerText = key;
    keyEnumeration.className = `text-color-${key}`;
    document.getElementById("play-button").className = `button-color-${key}`;
    document.getElementById("contact-button").className = `button-color-${key}`;
    document.getElementById("youtube-button").className = `button-color-${key}`;
    document.getElementById("github-button").className = `button-color-${key}`;
    showElement(document.getElementById("now-playing"));
  };
};

export const getSelectedSongIds = () => {
  const songs = getSongs();
  const firstSong =
    deck1Select.value === "-1"
      ? null
      : songs.thisKeySongs.find((s) => {
          return s.id === parseInt(deck1Select.value, 10);
        });
  const secondSong =
    deck2Select.value === "-1"
      ? null
      : songs.thisKeySongs.find((s) => {
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

  const firstID = [...new Set(songs.thisTempoSongs)]
    .filter(Boolean)
    ._shuffle()[0];
  const secondID = [...new Set(songs.thisTempoSongs)]
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

export const file = (int, isLead) =>
  `../music/${String(int).padStart(8, "0")}-${
    isLead ? "lead" : "body"
  }${filetype}`;
export const getTracks = (track1, track2, skipSamples = false) => {
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
    updateUI(activeKey, firstSongId, secondSongId, trackIndex),
  );
  if (isMagicTime) {
    holder[trackIndex] = [firstSongId, secondSongId];
  } else {
    updateTempoUI(firstSongId.bpm);
    updateActiveKey();
  }
  trackIndex += 1;
  return {
    bpm: firstSongFromURL?.bpm || activeTempo,
    list: returnArray,
  };
};
