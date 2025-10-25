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
  durationSeconds = 1800,
  antiRepeatWindow = 1000,
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
    totalSeconds < durationSeconds && 
    usedSongIds.size < totalSongs
  ) {
    // Generate a complete block: intro + 4 main versions
    let blockSongs = [];
    
    // Get 5 pairs for the complete block (1 intro + 4 mains)
    for (let i = 0; i < 5; i++) {
      // First try: exact tempo match, not recently used
      let availableSongs = songdata.filter(
        (s) => s.bpm === currentTempo && !recentWindow.includes(s.id),
      );
      
      // Second try: exact tempo match, any song
      if (availableSongs.length < 2) {
        availableSongs = songdata.filter(
          (s) => s.bpm === currentTempo && !usedSongIds.has(s.id),
        );
      }
      
      // Third try: similar tempo (±2 BPM), not recently used
      if (availableSongs.length < 2) {
        availableSongs = songdata.filter(
          (s) => 
            Math.abs(s.bpm - currentTempo) <= 2 && 
            !recentWindow.includes(s.id) &&
            !usedSongIds.has(s.id),
        );
      }
      
      // Fourth try: any tempo, not recently used
      if (availableSongs.length < 2) {
        availableSongs = songdata.filter(
          (s) => !recentWindow.includes(s.id) && !usedSongIds.has(s.id),
        );
      }
      
      // Last resort: any unused song
      if (availableSongs.length < 2) {
        availableSongs = songdata.filter((s) => !usedSongIds.has(s.id));
        if (availableSongs.length < 2) break;
      }

      // Advance the key
      currentKey = getNextKey(currentKey, moveDown);
      const prevKey = getNextKey(currentKey, true);
      const nextKey = getNextKey(currentKey, false);
      
      // Try to find songs in compatible keys first
      let candidates = availableSongs.filter((s) =>
        [prevKey, currentKey, nextKey].includes(s.key),
      );
      
      // If not enough candidates, use all available songs
      if (candidates.length < 2) {
        candidates = availableSongs;
      }
      
      // Shuffle candidates for randomness
      candidates = candidates.sort(() => quantumRandom() - 0.5);
      let songA = candidates[0];
      let songB = candidates.find((s) => s.id !== songA.id);
      if (!songA || !songB) break;

      blockSongs.push([songA.id, songB.id]);
      
      // Track usage
      usedSongIds.add(songA.id);
      usedSongIds.add(songB.id);
      recentWindow.push(songA.id, songB.id);
      if (recentWindow.length > antiRepeatWindow)
        recentWindow = recentWindow.slice(-antiRepeatWindow);
    }
    
    if (blockSongs.length < 5) break;
    
    // Add the complete block to playlist
    playlist.push(...blockSongs);
    
    // Calculate time for complete block: intro (4 beats) + 4 main versions (16 beats each) = 68 beats
    const blockTime = beatsToSeconds(4, currentTempo) + (4 * beatsToSeconds(16, currentTempo));
    totalSeconds += blockTime;
    
    console.log(`Block ${Math.floor(playlist.length/5)}: ${blockTime.toFixed(1)}s block, ${totalSeconds.toFixed(1)}s total / ${durationSeconds}s target`);
    
    // Check if we've exceeded the time limit
    if (totalSeconds >= durationSeconds) {
      console.log(`Time limit reached! Stopping at ${totalSeconds.toFixed(1)}s`);
      break;
    }
    
    pairsAtTempo += 5; // Count as 5 pairs
    keyHistory.push(currentKey);
    
    // Change tempo less frequently to reduce constraints
    if (pairsAtTempo >= 20) { // Changed from 16 to 20 (4 complete blocks)
      const nextTempo = getNextTempo(currentTempo);
      const nextTempoSongs = songdata.filter(
        (s) => s.bpm === nextTempo && !usedSongIds.has(s.id),
      );
      if (nextTempoSongs.length < 20) { // Changed from 16 to 20
        const availableTempos = allowedTempos.filter(
          (t) =>
            songdata.filter((s) => s.bpm === t && !usedSongIds.has(s.id))
              .length >= 20, // Changed from 16 to 20
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
  
  // Post-process: repeatedly remove the last tempo block if it is less than 10 songs
  const minTempoBlockSize = 10;
  while (playlist.length > 0) {
    // Find the tempo of the last song in the playlist
    const lastPair = playlist[playlist.length - 1];
    const lastTempo = songdata.find(s => s.id === lastPair[0])?.bpm;
    // Find the start index of the last tempo block
    let blockStart = playlist.length - 1;
    while (blockStart > 0) {
      const prevTempo = songdata.find(s => s.id === playlist[blockStart - 1][0])?.bpm;
      if (prevTempo !== lastTempo) break;
      blockStart--;
    }
    const blockSize = playlist.length - blockStart;
    if (blockSize < minTempoBlockSize) {
      playlist.splice(blockStart);
      console.log(`Removed last tempo block of size ${blockSize} (tempo ${lastTempo}) because it was less than ${minTempoBlockSize}`);
    } else {
      break;
    }
  }
  
  return { playlist, totalSeconds, keyHistory, tempoHistory };
}

// Quantum Genius Full-Library Mix
export function generateQuantumGeniusMix() {
  // 1. Group songs by tempo
  const tempoGroups = {};
  for (const song of songdata) {
    if (!tempoGroups[song.bpm]) tempoGroups[song.bpm] = [];
    tempoGroups[song.bpm].push(song);
  }
  // 2. Shuffle each tempo group quantum randomly
  for (const bpm in tempoGroups) {
    tempoGroups[bpm] = tempoGroups[bpm].sort(() => quantumRandom() - 0.5);
  }
  // 3. Pick a random starting tempo and key
  const allTempos = Object.keys(tempoGroups).map(Number);
  let allKeys = Array.from({ length: 12 }, (_, i) => i + 1);
  let currentKey = allKeys[Math.floor(quantumRandom() * allKeys.length)];

  // Helper: Find best key match in a group for a given key
  function findBestKeyPair(group, key) {
    // Prefer exact match, then +/-1, then anything
    let exact = group.find((s) => s.key === key);
    if (exact) return exact;
    let near = group.find(
      (s) => Math.abs(s.key - key) === 1 || Math.abs(s.key - key) === 11,
    );
    if (near) return near;
    return group[0];
  }

  // 4. Build blocks of pairs for each tempo
  let playlist = [];
  let usedIds = new Set();
  let forcedPairs = [];
  let tempoOrder = [];
  let keyOrder = [];
  let temposLeft = new Set(allTempos);

  // Shuffle tempo order for chunkiness
  while (temposLeft.size) {
    let temposArr = Array.from(temposLeft);
    let t = temposArr[Math.floor(quantumRandom() * temposArr.length)];
    tempoOrder.push(t);
    temposLeft.delete(t);
  }

  for (let tIdx = 0; tIdx < tempoOrder.length; tIdx++) {
    let bpm = tempoOrder[tIdx];
    let group = tempoGroups[bpm].filter((s) => !usedIds.has(s.id));
    // Try to pair by best key progression
    while (group.length > 1) {
      // Always start with the current key for the first pair in the block
      let a = findBestKeyPair(group, currentKey);
      group = group.filter((s) => s.id !== a.id);
      let b = findBestKeyPair(group, a.key); // try to keep key progression
      if (!b) b = group[0];
      group = group.filter((s) => s.id !== b.id);
      playlist.push([a.id, b.id]);
      usedIds.add(a.id);
      usedIds.add(b.id);
      keyOrder.push(a.key);
      keyOrder.push(b.key);
      currentKey = b.key; // progress key
    }
    // If one song left, try to swap with another block
    if (group.length === 1) {
      let orphan = group[0];
      // Try to find a block with an odd song to swap
      let swapped = false;
      for (let otherBpm of tempoOrder) {
        if (otherBpm === bpm) continue;
        let otherGroup = tempoGroups[otherBpm].filter(
          (s) => !usedIds.has(s.id),
        );
        if (otherGroup.length % 2 === 1) {
          // Swap orphan with one from otherGroup
          let swapCandidate = otherGroup[0];
          playlist.push([orphan.id, swapCandidate.id]);
          usedIds.add(orphan.id);
          usedIds.add(swapCandidate.id);
          swapped = true;
          break;
        }
      }
      if (!swapped) {
        // As last resort, pair with any unused song from any tempo
        let unused = songdata.find(
          (s) => !usedIds.has(s.id) && s.id !== orphan.id,
        );
        if (unused) {
          playlist.push([orphan.id, unused.id]);
          usedIds.add(orphan.id);
          usedIds.add(unused.id);
          forcedPairs.push([orphan.id, unused.id]);
        }
      }
    }
  }

  // Final pass: if any songs are still unused, pair them arbitrarily
  let leftovers = songdata.filter((s) => !usedIds.has(s.id));
  while (leftovers.length > 1) {
    let a = leftovers[0];
    let b = leftovers[1];
    playlist.push([a.id, b.id]);
    forcedPairs.push([a.id, b.id]);
    usedIds.add(a.id);
    usedIds.add(b.id);
    leftovers = songdata.filter((s) => !usedIds.has(s.id));
  }

  return {
    playlist,
    forcedPairs,
    tempoOrder,
    keyOrder,
    totalUsed: usedIds.size,
    totalSongs: songdata.length,
    leftovers: songdata.filter((s) => !usedIds.has(s.id)),
  };
}
