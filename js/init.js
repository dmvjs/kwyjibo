import {songdata} from "./songdata.js";
import {tempos} from "./tempo.js";

if (!location.host.includes('localhost') && location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}

const counterSpan = document.getElementById('song-counter')
counterSpan.innerHTML = String(songdata.length)

export const showSongMatrix = (array) => {
    for (const tempo of tempos.filter(Boolean)) {
        const rv = (Array.from({length: 12}, (int, index)=> {
            return array.filter((item)=> {
                if (item.bpm !== Number(tempo)) {
                    return false;
                }
                if (item.computedKey) {
                    return item.computedKey === index + 1
                }
                return item.key === index + 1
            })
        }))
        console.log(tempo, rv)
    }
}

showSongMatrix(songdata)
