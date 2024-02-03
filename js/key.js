import {config} from "./config.js";
import {quantumRandom} from "./cryptoRandom.js";
export let initialKey = config.initialKey ?? parseInt(String(Math.floor(quantumRandom() * 12)), 10) + 1
export let activeKey = config.initialKey ?? (initialKey); // 1-12

export const setActiveKey = (key) => {
    if (key > 0 && key < 13 && key % 1 === 0) {
        activeKey = key;
    }
}

export const setInitialKey = (key) => {
    if (key >= 1 && key <= 12 && key % 1 === 0) {
        initialKey = key;
    }
}


export const  getNextKey = (inputKey, prevKey) => {
    let key = prevKey ? inputKey - 1 : inputKey + 1;
    if (key > 12) {
        key = 1;
    } else if (key < 1) {
        key = 12;
    }
    return key;
}

export const iterateActiveKey = () => {
    activeKey += 1
    if (activeKey > 12) {
        activeKey = 1;
    } else if (activeKey < 1) {
        activeKey = 12
    }
}


const getScore = (a) => {
    let score = 0;
    if (activeKey === a.key ) {
        score = 12/12
    } else if (activeKey === getNextKey(a.key)) {
        score = 11/12
    }else if (activeKey === getNextKey(a.key, true)) {
        score = 10/12
    } else if (activeKey === getNextKey(getNextKey(a.key))) {
        score = 9/12
    } else if (activeKey === getNextKey(getNextKey(a.key, true))) {
        score = 8/12
    } else if (activeKey === getNextKey(getNextKey(getNextKey(a.key)))) {
        score = 7/12
    } else if (activeKey === getNextKey(getNextKey(getNextKey(a.key, true)))) {
        score = 6/12
    } else if (activeKey === getNextKey(getNextKey(getNextKey(getNextKey(a.key))))) {
        score = 5/12
    } else if (activeKey === getNextKey(getNextKey(getNextKey(getNextKey(a.key, true))))) {
        score = 4/12
    } else if (activeKey === getNextKey(getNextKey(getNextKey(getNextKey(getNextKey(a.key)))))) {
        score = 3/12
    } else if (activeKey === getNextKey(getNextKey(getNextKey(getNextKey(getNextKey(a.key, true)))))) {
        score = 2/12
    } else if (activeKey === getNextKey(getNextKey(getNextKey(getNextKey(getNextKey(getNextKey(a.key))))))) {
        score = 1/12
    } else {
        score = 0;
    }
    return score;
}

export const keySort = (a,b) => {
    let aScore = getScore(a);
    let bScore = getScore(b);

    return aScore < bScore ? 1 : aScore > bScore ? -1 : 0;
}

