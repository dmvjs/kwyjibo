import { activeKey, getNextKey } from "./key.js";
import { activeTempo } from "./tempo.js";
import { getId, resetSongs, songs } from "./song.js";

resetSongs();

export const getSongs = (key) => {
  let thisTempoSongs = songs.filter((item) => item.bpm === activeTempo);

  // Get songs in current key and adjacent keys (both forward and reverse)
  let thisKeySongs = thisTempoSongs.filter((item) => {
    const keyDiff = Math.abs(item.key - (key !== undefined ? key : activeKey));
    // Allow keys that are 1 step away in either direction
    return keyDiff === 0 || keyDiff === 1 || keyDiff === 11;
  });

  return { thisKeySongs, thisTempoSongs };
};

export const getSong = (key, artist) => {
  let { thisKeySongs, thisTempoSongs } = getSongs(key);
  if (thisKeySongs.length) {
    const choiceArray = thisKeySongs.filter((s) => s.artist !== artist);
    return getId(choiceArray);
  }
  if (thisTempoSongs.length) {
    return getId(thisTempoSongs.filter((s) => s.artist !== artist));
  }
};
