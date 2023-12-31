import {config} from "./config.js";
import {quantumRandom} from "./cryptoRandom.js";
import {loadSongsIntoSelect} from "./tracks.js";
let initialKey = config.initialKey ?? parseInt(String(Math.floor(quantumRandom() * 12)), 10) + 1
let activeKey = config.initialKey ?? (initialKey); // 1-12

const setKey = (e) => {
    activeKey = parseInt(e.target.value, 10);
    const keyEnumeration = document.getElementById('key-enumeration')
    keyEnumeration.innerText = activeKey;
    keyEnumeration.className = `text-color-${activeKey}`
    loadSongsIntoSelect()
    initialKey = activeKey;
}

const key1 = document.getElementById('key-1')
const key2 = document.getElementById('key-2')
const key3 = document.getElementById('key-3')
const key4 = document.getElementById('key-4')
const key5 = document.getElementById('key-5')
const key6 = document.getElementById('key-6')
const key7 = document.getElementById('key-7')
const key8 = document.getElementById('key-8')
const key9 = document.getElementById('key-9')
const key10 = document.getElementById('key-10')
const key11 = document.getElementById('key-11')
const key12 = document.getElementById('key-12')

key1.addEventListener('change', setKey);
key2.addEventListener('change', setKey);
key3.addEventListener('change', setKey);
key4.addEventListener('change', setKey);
key5.addEventListener('change', setKey);
key6.addEventListener('change', setKey);
key7.addEventListener('change', setKey);
key8.addEventListener('change', setKey);
key9.addEventListener('change', setKey);
key10.addEventListener('change', setKey);
key11.addEventListener('change', setKey);
key12.addEventListener('change', setKey);


function getNextKey(inputKey, prevKey) {
    let key = prevKey ? inputKey + 1 : inputKey - 1;
    if (key > 12) {
        key = 1;
    } else if (key < 1) {
        key = 12;
    }
    return key;
}
const keyLabel = document.getElementById('key-enumeration')
keyLabel.innerText = activeKey;
const el = document.getElementById(`key-${activeKey}`)
el.checked = true

function updateActiveKey () {
    activeKey += 1
    if (activeKey > 12) {
        activeKey = 1;
    } else if (activeKey < 1) {
        activeKey = 12
    }
    const element = document.getElementById(`key-${getNextKey(activeKey)}`)
    element.checked = true;
}


const getScore = (a) => {
    let score = 0;
    if (activeKey === a.key ) {
        score = 1
    } else if (activeKey === getNextKey(a.key)) {
        score = 0.9
    }else if (activeKey === getNextKey(a.key, true)) {
        score = 0.85
    } else if (activeKey === getNextKey(getNextKey(a.key))) {
        score = 0.8
    } else if (activeKey === getNextKey(getNextKey(a.key, true))) {
        score = 0.75
    } else if (activeKey === getNextKey(getNextKey(getNextKey(a.key)))) {
        score = 0.7
    } else if (activeKey === getNextKey(getNextKey(getNextKey(a.key, true)))) {
        score = 0.65
    } else if (activeKey === getNextKey(getNextKey(getNextKey(getNextKey(a.key))))) {
        score = 0.6
    } else if (activeKey === getNextKey(getNextKey(getNextKey(getNextKey(a.key, true))))) {
        score = 0.55
    } else if (activeKey === getNextKey(getNextKey(getNextKey(getNextKey(getNextKey(a.key)))))) {
        score = 0.2
    } else if (activeKey === getNextKey(getNextKey(getNextKey(getNextKey(getNextKey(a.key, true)))))) {
        score = 0.15
    } else if (activeKey === getNextKey(getNextKey(getNextKey(getNextKey(getNextKey(getNextKey(a.key))))))) {
        score = 0.1
    } else {
        score = 0;
    }
    return score;
}

export const keySort = (a,b) => {
    let aScore = getScore(a);
    let bScore = getScore(b);

    return aScore < bScore
}

export {
    activeKey,
    getNextKey,
    initialKey,
    updateActiveKey
}

