import {config} from "./config.js";
import {songdata} from "./songdata.js";
import {quantumRandom} from "./cryptoRandom.js";
import {loadSongsIntoSelect} from "./tracks.js";
import {resetTempoIndex} from "./preload.js";

const tempos = [...new Set(songdata.map(s=>s.bpm))].sort((a,b)=>a-b)
const seed = parseInt(String(Math.floor(quantumRandom() * tempos.length)), 10);
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
const bpmFromUrl = params.bpm || null;
const allUrl = params.lock || null;
let activeTempo = bpmFromUrl ?? config.initialTempo ?? tempos[seed];
const tempo1Input = document.getElementById('tempo-1')
const tempo2Input = document.getElementById('tempo-2')
const tempo3Input = document.getElementById('tempo-3')
const tempoCount = document.getElementById('tempo-count')

const onTempoChange = (e) => {
    // if the user hasnt clicked play for the first time yet,load the new tempo of songs into the UI and set active tempo
    setActiveTempo(tempos[e.target.value])
    loadSongsIntoSelect()
}

tempo1Input.addEventListener('change', onTempoChange)
tempo2Input.addEventListener('change', onTempoChange)
tempo3Input.addEventListener('change', onTempoChange)

export const updateTempoUI = (tempo) => {
    if (tempo === 84) {
        tempo1Input.checked = true;
    } else if (tempo === 94) {
        tempo2Input.checked = true;
    } else if (tempo === 102) {
        tempo3Input.checked = true;
    }
}

setActiveTempo(activeTempo);
updateTempoUI(activeTempo);
loadSongsIntoSelect();

function setActiveTempo (x) {
    if (bpmFromUrl && allUrl) {
        activeTempo = bpmFromUrl;
    }
    if (x > 50 && x < 200) {
        activeTempo = x;
    }
    resetTempoIndex()
    tempoCount.innerText = activeTempo;
}

export {activeTempo, setActiveTempo, tempos}
