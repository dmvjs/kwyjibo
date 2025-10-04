import { activeKey, keySort } from "./key.js";
import { filetype } from "./filetype.js";
import { justStarTrekIntro, samples, sampleVolumes } from "./samples.js";
import { getSongById } from "./song.js";
import { activeTempo, updateTempoUI } from "./tempo.js";
import { quantumRandom } from "./cryptoRandom.js";
import { songdata } from "./songdata.js";
import { addTracks } from "./share.js";
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
  seventhSongLabel,
  eighthSongLabel,
  ninthSongLabel,
  tenthSongLabel,
  eleventhSongLabel,
  twelfthSongLabel,
  hideElement,
  showElement,
  updateActiveKey,
} from "./dom.js";
import { getSong, getSongs } from "./getSongs.js";
import "./shuffle.js";
import { file } from "./utils.js";

let holder = {};
export const magicNumber = 5;

export let trackIndex = 0;
export let isMagicTime = trackIndex % magicNumber === 0;

export let songIDs = [];

export const updateUI = (
  key,
  songIds, // Now an array of 6 song IDs
  trackIndex,
  isFromCountdown = false,
) => {
  songIDs = songIds;
  return () => {
    document.body.className = `color-${key}`;
    window.playedSongs = window.playedSongs || [];
    window.playedSongs.push(songIds); // Store all 6 song IDs

    const currentIndex = trackIndex < 0 ? 0 : trackIndex;
    const previousIndex = trackIndex - 1 < 0 ? 0 : trackIndex - 1;

    // Get current 6 songs (for "on deck" display)
    const currentSongs = window.playedSongs[currentIndex];
    const song1UI = songdata.find(item => item.id === currentSongs[0]);
    const song2UI = songdata.find(item => item.id === currentSongs[1]);
    const song3UI = songdata.find(item => item.id === currentSongs[2]);
    const song4UI = songdata.find(item => item.id === currentSongs[3]);
    const song5UI = songdata.find(item => item.id === currentSongs[4]);
    const song6UI = songdata.find(item => item.id === currentSongs[5]);

    // Get previous 6 songs (for "now playing" display)
    const previousSongs = window.playedSongs[previousIndex];
    const song7UI = songdata.find(item => item.id === previousSongs[0]);
    const song8UI = songdata.find(item => item.id === previousSongs[1]);
    const song9UI = songdata.find(item => item.id === previousSongs[2]);
    const song10UI = songdata.find(item => item.id === previousSongs[3]);
    const song11UI = songdata.find(item => item.id === previousSongs[4]);
    const song12UI = songdata.find(item => item.id === previousSongs[5]);

    // Update "Now Playing" (previous 6)
    firstSongLabel.innerText = `${song7UI?.artist || ""} - ${song7UI?.title || ""}`;
    secondSongLabel.innerText = `${song8UI?.artist || ""} - ${song8UI?.title || ""}`;
    thirdSongLabel.innerText = `${song9UI?.artist || ""} - ${song9UI?.title || ""}`;
    fourthSongLabel.innerText = `${song10UI?.artist || ""} - ${song10UI?.title || ""}`;
    fifthSongLabel.innerText = `${song11UI?.artist || ""} - ${song11UI?.title || ""}`;
    sixthSongLabel.innerText = `${song12UI?.artist || ""} - ${song12UI?.title || ""}`;

    // Update "On Deck" (current 6)
    seventhSongLabel.innerText = `${song1UI?.artist || ""} - ${song1UI?.title || ""}`;
    eighthSongLabel.innerText = `${song2UI?.artist || ""} - ${song2UI?.title || ""}`;
    ninthSongLabel.innerText = `${song3UI?.artist || ""} - ${song3UI?.title || ""}`;
    tenthSongLabel.innerText = `${song4UI?.artist || ""} - ${song4UI?.title || ""}`;
    eleventhSongLabel.innerText = `${song5UI?.artist || ""} - ${song5UI?.title || ""}`;
    twelfthSongLabel.innerText = `${song6UI?.artist || ""} - ${song6UI?.title || ""}`;

    // Update label colors
    firstSongLabel.className = `text-color-${song7UI?.key || 1}`;
    secondSongLabel.className = `text-color-${song8UI?.key || 1}`;
    thirdSongLabel.className = `text-color-${song9UI?.key || 1}`;
    fourthSongLabel.className = `text-color-${song10UI?.key || 1}`;
    fifthSongLabel.className = `text-color-${song11UI?.key || 1}`;
    sixthSongLabel.className = `text-color-${song12UI?.key || 1}`;
    seventhSongLabel.className = `text-color-${song1UI?.key || 1}`;
    eighthSongLabel.className = `text-color-${song2UI?.key || 1}`;
    ninthSongLabel.className = `text-color-${song3UI?.key || 1}`;
    tenthSongLabel.className = `text-color-${song4UI?.key || 1}`;
    eleventhSongLabel.className = `text-color-${song5UI?.key || 1}`;
    twelfthSongLabel.className = `text-color-${song6UI?.key || 1}`;

    loadSongsIntoSelect();
    document.getElementById("play-button").className = `button-color-${key}`;
    document.getElementById("contact-button").className = `button-color-${key}`;
    document.getElementById("youtube-button").className = `button-color-${key}`;
    document.getElementById("github-button").className = `button-color-${key}`;
    if (isFromCountdown) {
      showElement(document.getElementById("on-deck"));
    } else {
      hideElement(document.getElementById("on-deck"));
    }
    showElement(document.getElementById("now-playing"));
  };
};

export const getSelectedSongIds = () => {
  const songs = getSongs();
  const song1 =
    deck1Select.value === "-1"
      ? null
      : songs.thisTempoSongs.find((s) => {
          return s.id === parseInt(deck1Select.value, 10);
        });
  const song2 =
    deck2Select.value === "-1"
      ? null
      : songs.thisTempoSongs.find((s) => {
          return s.id === parseInt(deck2Select.value, 10);
        });
  const song3 =
    deck3Select.value === "-1"
      ? null
      : songs.thisTempoSongs.find((s) => {
          return s.id === parseInt(deck3Select.value, 10);
        });
  const song4 =
    deck4Select.value === "-1"
      ? null
      : songs.thisTempoSongs.find((s) => {
          return s.id === parseInt(deck4Select.value, 10);
        });
  const song5 =
    deck5Select.value === "-1"
      ? null
      : songs.thisTempoSongs.find((s) => {
          return s.id === parseInt(deck5Select.value, 10);
        });
  const song6 =
    deck6Select.value === "-1"
      ? null
      : songs.thisTempoSongs.find((s) => {
          return s.id === parseInt(deck6Select.value, 10);
        });
  return [song1, song2, song3, song4, song5, song6];
};
export const loadSongsIntoSelect = () => {
  const songs = getSongs();

  // Clear all deck selectors
  deck1Select.length = 0;
  deck2Select.length = 0;
  deck3Select.length = 0;
  deck4Select.length = 0;
  deck5Select.length = 0;
  deck6Select.length = 0;

  // Add default options to each deck
  const decks = [deck1Select, deck2Select, deck3Select, deck4Select, deck5Select, deck6Select];
  decks.forEach((deck, index) => {
    const optionDefault = document.createElement("option");
    optionDefault.value = "-1";
    optionDefault.innerText = `Pick next deck ${index + 1} song ${activeTempo}bpm`;
    deck.appendChild(optionDefault);
    deck.value = "-1";
  });

  let playedSongs = [];
  if (window.playedSongs?.length) {
    playedSongs = [...new Set(window.playedSongs.flat())];
    playedSongs = playedSongs.slice(
      playedSongs.length - Math.min(90, playedSongs.length),
      playedSongs.length,
    );
  }

  // Select 6 different songs with varied artists
  // Start with key-matching songs, but be flexible
  let availableSongs = songs.thisKeySongs
    .filter((song) => !playedSongs.includes(song.id))
    .filter(Boolean)
    ._shuffle();

  // If we don't have enough songs in the key, add all tempo songs
  if (availableSongs.length < 6) {
    const additionalSongs = songs.thisTempoSongs
      .filter((song) => !playedSongs.includes(song.id))
      .filter(song => !availableSongs.find(s => s.id === song.id))
      .filter(Boolean)
      ._shuffle();
    availableSongs = [...availableSongs, ...additionalSongs];
  }

  // If STILL not enough, ignore the played songs filter
  if (availableSongs.length < 6) {
    const moreSongs = songs.thisTempoSongs
      .filter(song => !availableSongs.find(s => s.id === song.id))
      .filter(Boolean)
      ._shuffle();
    availableSongs = [...availableSongs, ...moreSongs];
  }

  const selectedSongs = [];
  const usedArtists = new Set();

  // First pass: select songs with unique artists
  for (const song of availableSongs) {
    if (selectedSongs.length >= 6) break;
    if (!usedArtists.has(song.artist)) {
      selectedSongs.push(song);
      usedArtists.add(song.artist);
    }
  }

  // Second pass: add any remaining songs even if artist repeats
  if (selectedSongs.length < 6) {
    for (const song of availableSongs) {
      if (selectedSongs.length >= 6) break;
      if (!selectedSongs.find(s => s.id === song.id)) {
        selectedSongs.push(song);
      }
    }
  }

  // Populate all deck selectors with all available songs
  [
    ...new Set(
      songs.thisTempoSongs
        .filter(Boolean)
        .sort((a, b) => a.title < b.title)
        .sort((a, b) => a.artist > b.artist)
        .sort(keySort),
    ),
  ].map((item) => {
    decks.forEach(deck => {
      const option = document.createElement("option");
      option.value = `${item.id}`;
      option.innerText = `${item.artist} - ${item.title} [${item.key}]`;
      deck.appendChild(option);
    });
  });

  // Set default selections
  selectedSongs.forEach((song, index) => {
    if (song && decks[index]) {
      decks[index].value = song.id;
    }
  });
};
export const getTracks = (
  track1,
  track2,
  track3,
  track4,
  track5,
  track6,
  skipSamples = false,
  isFromCountdown = false,
) => {
  const isUsingTracksFromURL = track1 !== undefined;
  isMagicTime = trackIndex % magicNumber === 0;
  if (isMagicTime) {
    // console.log('station identification…')
  }

  // Get songs from URL or generate new ones
  const songsFromURL = [
    track1 && getSongById(track1),
    track2 && getSongById(track2),
    track3 && getSongById(track3),
    track4 && getSongById(track4),
    track5 && getSongById(track5),
    track6 && getSongById(track6),
  ];

  let songIds = [];

  if (trackIndex % magicNumber === 1) {
    // Reuse songs from previous holder
    songIds = holder[trackIndex - 1];
  } else if (isUsingTracksFromURL) {
    // Use songs from URL
    songIds = songsFromURL.map(song => song?.id).filter(Boolean);
  } else {
    // Generate 6 new songs with unique artists
    const { thisKeySongs, thisTempoSongs } = getSongs();

    // Try to get songs from the matching key first
    let availableSongs = [...thisKeySongs]._shuffle();

    // If we don't have enough in the key, add all tempo songs
    if (availableSongs.length < 6) {
      const additionalSongs = thisTempoSongs
        .filter(song => !availableSongs.find(s => s.id === song.id))
        ._shuffle();
      availableSongs = [...availableSongs, ...additionalSongs];
    }

    const selectedSongs = [];
    const usedArtists = new Set();

    // First pass: select songs with unique artists
    for (const song of availableSongs) {
      if (selectedSongs.length >= 6) break;
      if (!usedArtists.has(song.artist)) {
        selectedSongs.push(song);
        usedArtists.add(song.artist);
      }
    }

    // Second pass: add any remaining songs even if artist repeats
    if (selectedSongs.length < 6) {
      for (const song of availableSongs) {
        if (selectedSongs.length >= 6) break;
        if (!selectedSongs.find(s => s.id === song.id)) {
          selectedSongs.push(song);
        }
      }
    }

    songIds = selectedSongs.map(song => song.id);
  }

  if (!isMagicTime) {
    // console.log('followed by…')
  }

  // Create file paths for all tracks
  const returnArray = songIds.map(id => file(id, isMagicTime));

  // DJ samples completely removed - no sample loading at all
  // This prevents crashes during song transitions

  addTracks(songIds);

  requestAnimationFrame(
    updateUI(activeKey, songIds, trackIndex, isFromCountdown),
  );

  if (isMagicTime) {
    holder[trackIndex] = songIds;
  } else {
    const firstSong = getSongById(songIds[0]);
    if (firstSong) {
      updateTempoUI(firstSong.bpm);
    }
    updateActiveKey();
  }

  trackIndex += 1;
  return {
    bpm: songsFromURL[0]?.bpm || activeTempo,
    list: returnArray,
  };
};
