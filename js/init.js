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

/*tempos.map((tempo, index)=> {
    const option = document.createElement('option')
    option.value = tempo
    option.innerText = tempo
    if (index === 0) {
        option.selected = true
    }
    document.getElementById('tempos').appendChild(option)
})*/

// console.log(document.getElementById('tempos').value)

/*songdata.sort((a,b)=>a.artist > b.artist ? 1 : a.artist === b.artist ? a.title > b.title ? 1 : -1 : -1).map(song=>{
    console.log(song)
    if (parseInt(document.getElementById('tempos').value, 10) === song.bpm) {
        const option = document.createElement('option')
        option.value = `${song.artist} ${song.title}`
        option.innerText = `${song.artist} ${song.title}`
        document.getElementById('songs').appendChild(option)
    }
})*/


showSongMatrix(songdata)
