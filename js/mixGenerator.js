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
  let currentTempo =
    startTempo ||
    allowedTempos[Math.floor(quantumRandom() * allowedTempos.length)];
  let currentKey = startKey || Math.floor(quantumRandom() * 12) + 1;
  let playlist = [];
  let usedSongIds = new Set();
  let recentWindow = [];
  let totalSeconds = 0;
  let pairsAtTempo = 0;
  let keyHistory = [currentKey];
  let tempoHistory = [currentTempo];

  const moveDown = Math.random() < 0.5;
  const totalSongs = songdata.length;
  const songsNeeded = useAllSongs ? totalSongs : Infinity;

  let lastIntroPair = null;
  let isFirst = true;

  while (
    ((!useAllSongs && totalSeconds < durationSeconds) || useAllSongs) &&
    usedSongIds.size < songsNeeded
  ) {
    let availableSongs = songdata.filter(
      (s) => s.bpm === currentTempo && !usedSongIds.has(s.id)
    );
    if (availableSongs.length < 2) {
      if (useAllSongs) {
        availableSongs = songdata.filter(
          (s) => s.bpm === currentTempo && !recentWindow.includes(s.id)
        );
        if (availableSongs.length < 2) {
          availableSongs = songdata.filter(
            (s) => Math.abs(s.bpm - currentTempo) <= 2 && !recentWindow.includes(s.id)
          );
          if (availableSongs.length < 2) break;
        }
      } else {
        break;
      }
    }
    // Advance the key
    currentKey = getNextKey(currentKey, moveDown);
    const prevKey = getNextKey(currentKey, true);
    const nextKey = getNextKey(currentKey, false);
    let candidates = availableSongs.filter(
      (s) => [prevKey, currentKey, nextKey].includes(s.key)
    );
    if (candidates.length < 2) {
      candidates = availableSongs;
    }
    // Shuffle candidates for randomness
    candidates = candidates.sort(() => quantumRandom() - 0.5);
    let songA = candidates[0];
    let songB = candidates.find((s) => s.id !== songA.id);
    if (!songA || !songB) break;

    if (isFirst || playlist.length % 6 === 0) { // every 6th block is a new intro
      // Add intro (lead) pair
      playlist.push([songA.id, songB.id]);
      lastIntroPair = [songA.id, songB.id];
      isFirst = false;
    } else {
      // Add body (main) pair
      playlist.push([songA.id, songB.id]);
    }
    // Always add the body for the last intro pair after the intro
    if (lastIntroPair && playlist[playlist.length - 1] !== lastIntroPair) {
      playlist.push([...lastIntroPair]);
      lastIntroPair = null;
    }
    // Track usage
    usedSongIds.add(songA.id);
    usedSongIds.add(songB.id);
    recentWindow.push(songA.id, songB.id);
    if (recentWindow.length > antiRepeatWindow)
      recentWindow = recentWindow.slice(-antiRepeatWindow);
    totalSeconds +=
      (beatsToSeconds(4, currentTempo) + beatsToSeconds(16, currentTempo));
    pairsAtTempo++;
    keyHistory.push(currentKey);
    if (pairsAtTempo >= 12) {
      const nextTempo = getNextTempo(currentTempo);
      const nextTempoSongs = songdata.filter(
        (s) => s.bpm === nextTempo && !usedSongIds.has(s.id)
      );
      if (nextTempoSongs.length < 24) {
        const availableTempos = allowedTempos.filter(
          (t) =>
            songdata.filter((s) => s.bpm === t && !usedSongIds.has(s.id)).length >= 24
        );
        if (availableTempos.length) {
          currentTempo = availableTempos[0];
        } else {
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
