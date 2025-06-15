import { songdata } from "./songdata.js";
import { getNextKey } from "./key.js";
import { tempos } from "./tempo.js";
import { quantumRandom } from "./cryptoRandom.js";

// Helper: Calculate seconds for n beats at a given BPM
const beatsToSeconds = (beats, bpm) => (60 / bpm) * beats;

// Helper: Get next tempo in the cycle
const getNextTempo = (currentTempo) => {
  const idx = tempos.indexOf(currentTempo);
  return tempos[(idx + 1) % tempos.length];
};

const allowedTempos = [84, 94, 102];

// Main generator
export function generateOneHourMix({
  startKey,
  startTempo,
  durationSeconds = 3600,
  antiRepeatWindow = 90,
  useAllSongs = false,
}) {
  // Use quantum random for tempo and key if not provided
  let currentTempo =
    startTempo ||
    allowedTempos[Math.floor(quantumRandom() * allowedTempos.length)];
  let currentKey = startKey || Math.floor(quantumRandom() * 12) + 1;
  let playlist = [];
  let usedSongIds = new Set();
  let usageCount = {};
  let recentWindow = [];
  let totalSeconds = 0;
  let pairsAtTempo = 0;
  let keyHistory = [currentKey];
  let tempoHistory = [currentTempo];

  // Choose direction ONCE for the whole mix
  const moveDown = Math.random() < 0.5;

  // If using all songs, calculate how many songs we need to use
  const totalSongs = songdata.length;
  const songsNeeded = useAllSongs ? totalSongs : Infinity;

  while (
    ((!useAllSongs && totalSeconds < durationSeconds) || useAllSongs) &&
    usedSongIds.size < songsNeeded
  ) {
    let availableSongs = songdata.filter((s) => s.bpm === currentTempo);
    if (availableSongs.length < 2) {
      // For full library mix, try to reuse songs that haven't been played in a while
      if (useAllSongs) {
        // Get all songs at current tempo that haven't been played in the last 90 songs
        availableSongs = songdata.filter(
          (s) => s.bpm === currentTempo && !recentWindow.includes(s.id),
        );
        if (availableSongs.length < 2) {
          // Last resort: try songs within 2 BPM
          availableSongs = songdata.filter(
            (s) =>
              Math.abs(s.bpm - currentTempo) <= 2 &&
              !recentWindow.includes(s.id),
          );
          if (availableSongs.length < 2) break; // No more songs to use
        }
      } else {
        break; // For regular mix, stop if we run out at current tempo
      }
    }
    // Always advance the key
    currentKey = getNextKey(currentKey, moveDown);
    // Try to pick songA in currentKey or adjacent keys
    const prevKey = getNextKey(currentKey, true);
    const nextKey = getNextKey(currentKey, false);
    let candidatesA = availableSongs.filter(
      (s) =>
        [prevKey, currentKey, nextKey].includes(s.key) &&
        !usedSongIds.has(s.id),
    );
    if (!candidatesA.length) {
      // If no unused, allow used
      candidatesA = availableSongs.filter((s) =>
        [prevKey, currentKey, nextKey].includes(s.key),
      );
    }
    if (!candidatesA.length) {
      // If still none, allow any unused song
      candidatesA = availableSongs.filter((s) => !usedSongIds.has(s.id));
    }
    if (!candidatesA.length) {
      // Last resort: any song at this tempo
      candidatesA = availableSongs;
    }
    let songA = candidatesA[Math.floor(Math.random() * candidatesA.length)];
    if (!songA) break;
    // For songB, exclude songA, same logic
    let excludeForB = new Set([songA.id]);
    let candidatesB = availableSongs.filter(
      (s) =>
        [prevKey, currentKey, nextKey].includes(s.key) &&
        !excludeForB.has(s.id) &&
        !usedSongIds.has(s.id),
    );
    if (!candidatesB.length) {
      candidatesB = availableSongs.filter(
        (s) =>
          [prevKey, currentKey, nextKey].includes(s.key) &&
          !excludeForB.has(s.id),
      );
    }
    if (!candidatesB.length) {
      candidatesB = availableSongs.filter(
        (s) => !excludeForB.has(s.id) && !usedSongIds.has(s.id),
      );
    }
    if (!candidatesB.length) {
      candidatesB = availableSongs.filter((s) => !excludeForB.has(s.id));
    }
    let songB = candidatesB[Math.floor(Math.random() * candidatesB.length)];
    if (!songB) break;
    // Only add to playlist if both songs are picked
    playlist.push([songA.id, songB.id]);
    totalSeconds +=
      (beatsToSeconds(4, currentTempo) + beatsToSeconds(16, currentTempo)) * 2;
    // Track usage
    usageCount[songA.id] = (usageCount[songA.id] || 0) + 1;
    usageCount[songB.id] = (usageCount[songB.id] || 0) + 1;
    usedSongIds.add(songA.id);
    usedSongIds.add(songB.id);
    // Update recent window
    recentWindow.push(songA.id, songB.id);
    if (recentWindow.length > antiRepeatWindow)
      recentWindow = recentWindow.slice(-antiRepeatWindow);
    pairsAtTempo++;
    keyHistory.push(currentKey);
    if (pairsAtTempo >= 12) {
      // Check if next tempo has enough songs
      const nextTempo = getNextTempo(currentTempo);
      const nextTempoSongs = songdata.filter(
        (s) => s.bpm === nextTempo && !usedSongIds.has(s.id),
      );
      if (nextTempoSongs.length < 24) {
        // Can't complete a full cycle
        // Try to find a tempo with enough songs
        const availableTempos = allowedTempos.filter(
          (t) =>
            songdata.filter((s) => s.bpm === t && !usedSongIds.has(s.id))
              .length >= 24,
        );
        if (availableTempos.length) {
          currentTempo = availableTempos[0];
        } else {
          // If no tempo has enough songs, try the next one anyway
          currentTempo = nextTempo;
        }
      } else {
        currentTempo = nextTempo;
      }
      tempoHistory.push(currentTempo);
      pairsAtTempo = 0;
    }
  }
  return { playlist, totalSeconds, keyHistory, tempoHistory };
}

// For validation/testing
export function estimatePlaylistDuration(playlist, tempoSequence) {
  let total = 0;
  let tempoIdx = 0;
  let pairCount = 0;
  for (let i = 0; i < playlist.length; i++) {
    let tempo = tempoSequence[tempoIdx];
    // Each pair: two songs, each intro+body
    total += (beatsToSeconds(4, tempo) + beatsToSeconds(16, tempo)) * 2;
    pairCount++;
    if (pairCount >= 12) {
      tempoIdx = (tempoIdx + 1) % tempoSequence.length;
      pairCount = 0;
    }
  }
  return total;
}
