import {songdata} from "./songdata.js";
import {tempos} from "./tempo.js";

if (!location.host.includes('localhost') && location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}

export const showSongMatrix = (array) => {
    for (const tempo of tempos) {
        const rv = (Array.from({length: 12}, (int, index)=> {
            return array.filter((item)=> {
                return item.bpm === Number(tempo) && item.key === index + 1
            })
        }))
        console.log(tempo, rv.flat().length, rv)
    }
}

showSongMatrix(songdata)
