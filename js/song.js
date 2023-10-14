import {activeKey, getNextKey} from "./key.js";
import {songdata} from "./songdata.js";
import {activeTempo} from "./tempo.js";
import {quantumRandom} from "./cryptoRandom.js";

let songs;

export const resetSongs = () => {
    songs = songdata;
    console.log('🏁', songs)
}

resetSongs();

Array.prototype._shuffle = function () {
    const value = this.map(value => ({ value, sort: quantumRandom() }))
        .sort((a, b) => a.sort > b.sort ? -1 : b.sort > a.sort ? 1 : 0)
        .map(({ value }) => value)
    return value
}

const getSongs = (key) => {
    const nextKey = getNextKey(key !== undefined ? key : activeKey);
    const previousKey = getNextKey(key !== undefined ? key : activeKey, true);
    console.log('🇨🇭', activeTempo, songs)
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
        const choiceArray = thisKeySongs.filter(s=>s.artist !== artist)._shuffle()
        return getId(choiceArray);
    }
    console.log('🔪', thisTempoSongs.length)
    if (thisTempoSongs.length) {
        return getId(thisTempoSongs.filter(s=>s.artist !== artist)._shuffle())
    }
}

export const getSongById = (id) => {
    return songs.find((item)=>item.id === id)
}

const getId = (array) => {
    const songIndex = Math.floor(quantumRandom() * array.length)
    const {artist, computedKey, id, title, key} = array[songIndex];
    console.log(computedKey !== undefined ?  computedKey : key, artist, title)
    const selectedSong = getSongById(id);
    return {artist: selectedSong.artist, id: selectedSong.id}
}

export {getSong}


