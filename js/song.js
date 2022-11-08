import {activeKey, getNextKey} from "./key.js";
import {songdata} from "./songdata.js";
import {activeTempo} from "./tempo.js";

let songs = songdata;

export const resetSongs = () => {
    songs = songdata;
}

const getSongs = (key) => {
    const nextKey = getNextKey(key);
    let thisTempoSongs = songs.filter((item)=> item.bpm === activeTempo)
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    let thisKeySongs = [
        ...new Set(thisTempoSongs.filter((item)=> {
            if (item.computedKey) {
                return item.computedKey === activeKey + 1 || item.computedKey === nextKey + 1
            }
            return item.key === activeKey + 1 || item.key === nextKey + 1
        }))]
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
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
    const songIndex = Math.floor(Math.random() * array.length)
    const id = array[songIndex].id;
    console.log(activeKey, array[songIndex])
    songs = songs.filter((item)=>item.id !== id)
    return id;
}

export {getSong}