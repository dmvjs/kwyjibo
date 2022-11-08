import {config} from "./config.js";
let initialKey = parseInt(String(Math.floor(Math.random() * 12)), 10)
let isBackwards = Math.random() > 0.5;
let activeKey = config.initialKey ?? initialKey; // 0-11

function getNextKey(inputKey, prevKey) {
    let key = prevKey ? (isBackwards ? (inputKey - 1) : (inputKey + 1)) : isBackwards ? (inputKey + 1) : (inputKey - 1);
    if (!isBackwards && key > 11) {
        key = 0;
    } else if (isBackwards && key < 0) {
        key = 11;
    }
    return key;
}

function updateActiveKey () {
    activeKey += 1 * (isBackwards ? -1 : 1);
    if (activeKey > 11) {
        activeKey = 0;
    } else if (activeKey < 0) {
        activeKey = 11
    }
}

export {
    activeKey,
    getNextKey,
    initialKey,
    isBackwards,
    updateActiveKey
}

