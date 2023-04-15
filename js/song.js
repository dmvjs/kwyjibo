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

const getSongs = () => {
    let thisTempoSongs = songs.filter((item)=> item.bpm === activeTempo)._shuffle()
    return {thisTempoSongs};
}

const getSong = (key, artist) => {
    let {thisTempoSongs} = getSongs(key)
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
