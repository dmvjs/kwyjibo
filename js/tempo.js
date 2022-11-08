import {config} from "./config.js";

const seed = Math.random();

let activeTempo = config.initialTempo ?? seed > 2/3 ? 102 : seed > 1/3 ? 94 : 84;

function setActiveTempo (x) {
    if (x > 50 && x < 200) {
        activeTempo = x;
    }
}

const tempos = {
    84: {
        leadBuffer: 11.410136054421768,
        bodyBuffer: 45.71487528344671
    },
    94: {
        leadBuffer: 10.202947845804989,
        bodyBuffer: 40.848458049886624
    },
    102: {
        leadBuffer: 9.394263038548752,
        bodyBuffer: 37.648321995464855
    }
}

function getTempo (duration) {
    if ((duration > 11 && duration < 30) || duration > 44) {
        return 84
    }
    if ((duration > 20 && duration < 40) || duration < 10) {
        return 102
    }
    return 94
}

export {activeTempo, getTempo, setActiveTempo, tempos}