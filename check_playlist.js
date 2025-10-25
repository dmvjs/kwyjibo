#!/usr/bin/env node

import { songdata } from "./js/songdata.js";

const url = process.argv[2];
if (!url) {
  console.error("Usage: node check_playlist.js <url>");
  process.exit(1);
}

const urlObj = new URL(url);
const tracksParam = urlObj.searchParams.get("tracks");
if (!tracksParam) {
  console.error("No tracks parameter found in URL.");
  process.exit(1);
}

let playlist;
try {
  playlist = JSON.parse(tracksParam);
} catch (e) {
  console.error("Could not parse tracks parameter as JSON.");
  process.exit(1);
}

// Flatten pairs, but only count unique pairs (ignore intro/body duplicates)
const uniquePairs = [];
const seenPairs = new Set();
playlist.forEach((pair) => {
  const key = pair
    .slice()
    .sort((a, b) => a - b)
    .join(",");
  if (!seenPairs.has(key)) {
    uniquePairs.push(pair);
    seenPairs.add(key);
  }
});

const allSongIds = new Set(songdata.map((s) => s.id));
const usedSongIds = new Set();
const songIdToPairs = {};
uniquePairs.forEach((pair) => {
  pair.forEach((id) => {
    usedSongIds.add(id);
    songIdToPairs[id] = songIdToPairs[id] || [];
    songIdToPairs[id].push(pair);
  });
});

const repeatedIds = Object.entries(songIdToPairs)
  .filter(([_, pairs]) => pairs.length > 1)
  .map(([id]) => Number(id));
const missingIds = [...allSongIds].filter((id) => !usedSongIds.has(id));

console.log(`Total unique song IDs used: ${usedSongIds.size}`);
console.log(`Total unique pairs: ${uniquePairs.length}`);
if (repeatedIds.length) {
  console.log("Song IDs appearing in more than one unique pair:", repeatedIds);
} else {
  console.log("No song IDs appear in more than one unique pair.");
}
if (missingIds.length) {
  console.log("Song IDs missing from playlist:", missingIds);
} else {
  console.log("All song IDs are used in the playlist.");
}
