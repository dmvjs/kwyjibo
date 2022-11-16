import {config} from "./config.js";
let initialKey = config.initialKey ?? parseInt(String(Math.floor(Math.random() * 12)), 10) + 1
let isBackwards = false;
let activeKey = config.initialKey ?? (initialKey); // 1-12

function getNextKey(inputKey, prevKey) {
    let key = prevKey ? (isBackwards ? (inputKey - 1) : (inputKey + 1)) : isBackwards ? (inputKey + 1) : (inputKey - 1);
    if (key > 12) {
        key = 1;
    } else if (key < 1) {
        key = 12;
    }
    return key;
}

function updateActiveKey () {
    activeKey += 1 * (isBackwards ? -1 : 1);
    if (activeKey > 12) {
        activeKey = 1;
    } else if (activeKey < 1) {
        activeKey = 12
    }
}

export {
    activeKey,
    getNextKey,
    initialKey,
    isBackwards,
    updateActiveKey
}

