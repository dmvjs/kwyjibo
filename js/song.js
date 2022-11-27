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
    const nextNextKey = getNextKey(nextKey);
    const previousKey = getNextKey(key, true);
    const previousPreviousKey = getNextKey(previousKey, true);
    let thisTempoSongs = songs.filter((item)=> item.bpm === activeTempo)._shuffle()
    let thisKeySongs = [
        ...new Set(thisTempoSongs.filter((item)=> {
            if (item.computedKey) {
                return item.computedKey === activeKey ||
                    item.computedKey === nextKey ||
                    item.computedKey === previousKey /*||
                    item.computedKey === nextNextKey ||
                    item.computedKey === previousPreviousKey*/
            }
            return item.key === activeKey ||
                item.key === nextKey ||
                item.key === previousKey /*||
                item.key === nextNextKey ||
                item.key === previousPreviousKey*/
        }))]._shuffle()
    return {thisKeySongs, thisTempoSongs};
}

const getSong = (key) => {
    let {thisKeySongs, thisTempoSongs} = getSongs(key)
    if (thisKeySongs.length) {
        return getId(thisKeySongs)
    }
    if (thisTempoSongs.length) {
        return getId(thisTempoSongs)
    }
}

const getId = (array) => {
    const songIndex = Math.floor(cryptoRandom() * array.length)
    const id = array[songIndex].id;
    console.log(activeKey, array[songIndex])
    songs = songs.filter((item)=>item.id !== id)._shuffle()
    return id;
}

export {getSong}