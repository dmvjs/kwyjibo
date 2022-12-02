import {activeKey, getNextKey} from "./key.js";
import {songdata} from "./songdata.js";
import {activeTempo} from "./tempo.js";
import {cryptoRandom} from "./cryptoRandom.js";

let songs;

export const resetSongs = () => {
    songs = songdata;
    console.log(songs)
}

resetSongs();

Array.prototype._shuffle = function () {
    return this.map(value => ({ value, sort: cryptoRandom() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
}

const getSongs = (key) => {
    const nextKey = getNextKey(key);
    const previousKey = getNextKey(key, true);
    let thisTempoSongs = songs.filter((item)=> item.bpm === activeTempo)._shuffle()
    let thisKeySongs = [
        ...new Set(thisTempoSongs.filter((item)=> {
            if (item.computedKey) {
                return item.computedKey === activeKey ||
                    item.computedKey === nextKey ||
                    item.computedKey === previousKey
            }
            return item.key === activeKey ||
                item.key === nextKey ||
                item.key === previousKey
        }))]._shuffle()
    return {thisKeySongs, thisTempoSongs};
}

const getSong = (key, artist) => {
    let {thisKeySongs, thisTempoSongs} = getSongs(key)
    if (thisKeySongs.length) {
        return getId(thisKeySongs.filter(s=>s.artist !== artist))
    }
    if (thisTempoSongs.length) {
        return getId(thisTempoSongs.filter(s=>s.artist !== artist))
    }
}

const getId = (array) => {
    const songIndex = Math.floor(cryptoRandom() * array.length)
    const {artist, id} = array[songIndex];
    console.log(activeKey, array[songIndex])
    songs = songs.filter((item)=>item.id !== id)._shuffle()
    return {artist, id};
}

export {getSong}