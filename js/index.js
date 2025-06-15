import "./init.js";
import "./tapToPlay.js";
import "./preload.js";
import { activeKey } from "./key.js";
import { activeTempo } from "./tempo.js";
import { generateOneHourMix } from "./mixGenerator.js";
import { parseTracks } from "./utils.js";
import { songdata } from "./songdata.js";
import { getKeyName } from "./key.js";

console.log("💿", "for promotional use only.");

function getBaseUrl() {
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    return "http://localhost:5173";
  }
  return "https://cappinkirk.com";
}

function getSongLabel(id) {
  const song = songdata.find((s) => s.id === id);
  return song ? `${song.artist} - ${song.title}` : `Song ${id}`;
}

window.addEventListener("DOMContentLoaded", () => {
  // Handle deck-1 and deck-2 select population and disabling if tracks in URL
  const params = new URLSearchParams(window.location.search);
  let urlTracks = params.get("tracks");
  if (urlTracks) {
    const parsed = parseTracks(urlTracks);
    if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].length === 2) {
      const [id1, id2] = parsed[0];
      const deck1 = document.getElementById("deck-1");
      const deck2 = document.getElementById("deck-2");
      if (deck1 && deck2) {
        // Clear existing options
        deck1.innerHTML = "";
        deck2.innerHTML = "";
        // Add the option for the first song
        const opt1 = document.createElement("option");
        opt1.value = id1;
        opt1.innerText = getSongLabel(id1);
        deck1.appendChild(opt1);
        deck1.value = id1;
        // Add the option for the second song
        const opt2 = document.createElement("option");
        opt2.value = id2;
        opt2.innerText = getSongLabel(id2);
        deck2.appendChild(opt2);
        deck2.value = id2;
        // Disable both selects
        deck1.disabled = true;
        deck2.disabled = true;
        // Disable all tempo radio buttons
        const tempoRadios = [
          document.getElementById("tempo-1"),
          document.getElementById("tempo-2"),
          document.getElementById("tempo-3"),
        ];
        tempoRadios.forEach((r) => {
          if (r) r.disabled = true;
        });
        // Disable all key radio buttons
        for (let i = 1; i <= 12; i++) {
          const keyRadio = document.getElementById(`key-${i}`);
          if (keyRadio) keyRadio.disabled = true;
        }
      }
    }
    document.body.classList.add("playback-mode");
    // Hide the One Hour Mix button
    const btn = document.getElementById("generate-mix-button");
    if (btn) btn.style.display = "none";
    // Hide the Three Hour Mix button
    const threeHourBtn = document.getElementById("three-hour-mix-button");
    if (threeHourBtn) threeHourBtn.style.display = "none";

    // Animate the play button to pulse neon glow ONCE and gently fade out
    const playBtn = document.getElementById("play-button");
    if (playBtn) {
      playBtn.classList.add("alien-glow");
      // No need to remove the class, as the animation ends with a gentle fade-out
    }

    // Print the full playlist into the browser
    const playlistDisplay = document.createElement("div");
    playlistDisplay.id = "playlist-display";
    playlistDisplay.style.marginTop = "20px";
    playlistDisplay.style.padding = "10px";
    playlistDisplay.style.backgroundColor = "rgba(0,0,0,0.8)";
    playlistDisplay.style.borderRadius = "8px";
    playlistDisplay.style.color = "white";
    playlistDisplay.style.textAlign = "left";
    playlistDisplay.style.maxWidth = "600px";
    playlistDisplay.style.marginLeft = "auto";
    playlistDisplay.style.marginRight = "auto";

    const emojis = ["🎵", "🎶", "🎧", "🎸", "🎹", "🎺", "🎻", "🎼", "🎤", "🎷"];

    let lastTempo = null;
    playlistDisplay.innerHTML = `<h3>Full Playlist:</h3><ul style="list-style-type: none; padding: 0;">`;
    let displayIndex = 1;
    for (let i = 0; i < parsed.length; i++) {
      const pair = parsed[i];
      const song1 = songdata.find((s) => s.id === pair[0]);
      const song2 = songdata.find((s) => s.id === pair[1]);
      // Pick a new random emoji for each line
      const lineEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      // Detect tempo change
      let tempoHeading = "";
      if (song1 && song2 && song1.bpm !== lastTempo) {
        tempoHeading = `<li style=\"margin:16px 0 4px 0;font-weight:bold;color:#ffd600;\">Tempo: ${song1.bpm} BPM</li>`;
        lastTempo = song1.bpm;
      }
      // Omit duplicate if this pair is the same as the previous (i.e., main after intro)
      if (i > 0 && parsed[i][0] === parsed[i-1][0] && parsed[i][1] === parsed[i-1][1]) {
        continue; // skip duplicate (main)
      }
      if (song1 && song2) {
        const key1 = getKeyName(song1.key);
        const key2 = getKeyName(song2.key);
        playlistDisplay.innerHTML += `${tempoHeading}<li style=\"margin-bottom: 10px;\">${displayIndex}. ${song1.artist} - ${song1.title} (<b>${key1}</b>) x ${song2.artist} - ${song2.title} (<b>${key2}</b>)</li>`;
        console.log(
          `${lineEmoji} ${displayIndex}. ${song1.artist} - ${song1.title} (${key1}) x ${song2.artist} - ${song2.title} (${key2})`,
        );
        displayIndex++;
      } else {
        playlistDisplay.innerHTML += `${tempoHeading}<li style=\"margin-bottom: 10px;\">${displayIndex}. Track ID not found in song data</li>`;
        console.log(
          `${lineEmoji} ${displayIndex}. Track ID not found in song data`,
        );
        displayIndex++;
      }
    }
    playlistDisplay.innerHTML += "</ul>";

    document.body.appendChild(playlistDisplay);
  }

  const btn = document.getElementById("generate-mix-button");
  if (btn) {
    btn.addEventListener("click", async () => {
      btn.disabled = true;
      btn.innerText = "Generating...";
      // Check for tracks in the URL
      let firstPair = null;
      if (urlTracks) {
        const parsed = parseTracks(urlTracks);
        if (
          Array.isArray(parsed) &&
          parsed.length > 0 &&
          parsed[0].length === 2
        ) {
          firstPair = parsed[0];
          // Show the first pair as label
          btn.innerText = `Generating: ${getSongLabel(
            firstPair[0],
          )} + ${getSongLabel(firstPair[1])}...`;
        }
      }
      // Generate the mix using full library approach
      const { playlist } = generateOneHourMix({
        startKey: activeKey,
        startTempo: activeTempo,
        durationSeconds: 3600,
        useAllSongs: true,
      });
      // If firstPair is available, replace the first entry
      if (firstPair) {
        playlist[0] = firstPair;
      }
      // Map playlist to integer IDs only for the URL
      const intPlaylist = playlist.map(pair => pair.map(id => parseInt(id, 10)));
      // Build the share URL
      const url = new URL(getBaseUrl());
      url.searchParams.set("tracks", JSON.stringify(intPlaylist));
      // Redirect
      window.location.href = url.href;
    });
  }

  const threeHourBtn = document.getElementById("three-hour-mix-button");
  if (threeHourBtn) {
    threeHourBtn.addEventListener("click", async () => {
      threeHourBtn.disabled = true;
      threeHourBtn.innerText = "Generating...";
      // Generate the three hour mix (using a new function or duration override)
      const { playlist } = generateOneHourMix({ durationSeconds: 3 * 3600 });
      // Map playlist to integer IDs only for the URL
      const intPlaylist = playlist.map(pair => pair.map(id => parseInt(id, 10)));
      // Build the share URL
      const url = new URL(getBaseUrl());
      url.searchParams.set("tracks", JSON.stringify(intPlaylist));
      // Redirect
      window.location.href = url.href;
    });
  }

  const fullLibraryBtn = document.getElementById("full-library-mix-button");
  if (fullLibraryBtn) {
    fullLibraryBtn.addEventListener("click", async () => {
      fullLibraryBtn.disabled = true;
      fullLibraryBtn.innerText = "Generating...";
      // Generate a mix that uses all songs in the library
      const { playlist } = generateOneHourMix({
        durationSeconds: Infinity, // No time limit
        useAllSongs: true, // New flag to use all songs
      });
      // Map playlist to integer IDs only for the URL
      const intPlaylist = playlist.map(pair => pair.map(id => parseInt(id, 10)));
      // Build the share URL
      const url = new URL(getBaseUrl());
      url.searchParams.set("tracks", JSON.stringify(intPlaylist));
      // Redirect
      window.location.href = url.href;
    });
  }
});
