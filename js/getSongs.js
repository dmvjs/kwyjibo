import {activeKey, getNextKey} from "./key.js";
import {activeTempo} from "./tempo.js";
import {getId, resetSongs, songs} from "./song.js";

resetSongs()

export const getSongs = (key) => {
    const nextKey = getNextKey(key !== undefined ? key : activeKey);
    const previousKey = getNextKey(key !== undefined ? key : activeKey, true);
    let thisTempoSongs = songs.filter((item)=> item.bpm === activeTempo)
    
    // Prefer matching keys, but be flexible if not enough songs
    let thisKeySongs =
        thisTempoSongs.filter((item)=> {
            return item.key === activeKey ||
                item.key === nextKey ||
                item.key === previousKey
        })
    
    // If we don't have enough, expand to all tempo songs
    // (Will sound less harmonic but quantum interference will make it work)
    if (thisKeySongs.length < 6) {
        // Expanding song pool
        thisKeySongs = thisTempoSongs;
    }
    
    return {thisKeySongs, thisTempoSongs};
}

export const getSong = (key, artist) => {
    let {thisKeySongs, thisTempoSongs} = getSongs(key)
    if (thisKeySongs.length) {
        const choiceArray = thisKeySongs.filter(s=>s.artist !== artist)
        return getId(choiceArray);
    }
    if (thisTempoSongs.length) {
        return getId(thisTempoSongs.filter(s=>s.artist !== artist))
    }
}
