import {config} from "./config.js";
import {songdata} from "./songdata.js";

const tempos = [...new Set(songdata.map(s=>s.bpm))].sort((a,b)=>a-b);
const seed = parseInt(String(Math.floor(Math.random() * tempos.length)), 10);

let activeTempo = config.initialTempo ?? tempos[seed];

function setActiveTempo (x) {
    if (x > 50 && x < 200) {
        activeTempo = x;
    }
}

export {activeTempo, setActiveTempo, tempos}