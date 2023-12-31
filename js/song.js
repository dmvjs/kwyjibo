import {activeKey, getNextKey} from "./key.js";
import {songdata} from "./songdata.js";
import {activeTempo} from "./tempo.js";
import {quantumRandom} from "./cryptoRandom.js";

let songs;

export const resetSongs = () => {
    songs = songdata;
}

resetSongs();

Array.prototype._shuffle = function () {
    const value = this.map(value => ({ value, sort: quantumRandom() }))
        .sort((a, b) => a.sort - b.sort )
        .map(({ value }) => value)
    return value
}

export const getSongs = (key) => {
    const nextKey = getNextKey(key !== undefined ? key : activeKey);
    const previousKey = getNextKey(key !== undefined ? key : activeKey, true);
    let thisTempoSongs = songs.filter((item)=> item.bpm === activeTempo)
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
        }))]
    return {thisKeySongs, thisTempoSongs};
}

const getSong = (key, artist) => {
    let {thisKeySongs, thisTempoSongs} = getSongs(key)
    if (thisKeySongs.length) {
        const choiceArray = thisKeySongs.filter(s=>s.artist !== artist)
        return getId(choiceArray);
    }
    if (thisTempoSongs.length) {
        return getId(thisTempoSongs.filter(s=>s.artist !== artist)._shuffle())
    }
}

export const getSongById = (id) => {
    return songs.find((item)=>item.id === id)
}

const getId = (array)  => {
    const rando = quantumRandom()
    const songIndex = Math.floor(rando * array.length)
    const {id} = array[songIndex];
    const selectedSong = getSongById(id);
    songs = songs.filter((item)=>item.id !== id)
    return {artist: selectedSong.artist, id: selectedSong.id}
}

export {getSong}


