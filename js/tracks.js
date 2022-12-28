import {activeKey, getNextKey, updateActiveKey} from "./key.js";
import {filetype} from "./filetype.js";
import {justStarTrekIntro, samples} from "./samples.js";
import {getSong} from "./song.js";
import {activeTempo} from "./tempo.js";
import {cryptoRandom} from "./cryptoRandom.js";

let holder = {}
const magicNumber = 5;

let trackIndex = 0;

const updateUIColors = (key, index) => {
    return () => {
        const colorKey = index % magicNumber > 1 ? getNextKey(getNextKey(key)) : getNextKey(key)
        document.body.className = `color-${colorKey}`
        document.getElementById('play-button').className = `button-color-${colorKey}`
        document.getElementById('contact-button').className = `button-color-${colorKey}`
        document.getElementById('pause-button').className = `button-color-${colorKey}`
    }
}

const file  = (int, isLead) => `../music/${String(int).padStart(8, '0')}-${isLead ? 'lead' : 'body'}${filetype}`

const getTracks = () => {
    const isMagicTime = trackIndex % magicNumber === 0;
    if (isMagicTime) {
        console.log('station identification…')
    }
    const firstSong = trackIndex % magicNumber === 1 ? null : getSong(activeKey)
    const firstSongId = trackIndex % magicNumber === 1 ? holder[trackIndex - 1][0] : firstSong.id;
    const secondSongId = trackIndex % magicNumber === 1 ? holder[trackIndex - 1][1] : getSong(activeKey, firstSong.artist).id;
    if (!isMagicTime) {
        console.log('followed by…')
    }
    const firstTrack = file(firstSongId, isMagicTime)
    const secondTrack = file(secondSongId, isMagicTime)
    const thirdTrack = isMagicTime ? `../music/${samples[Math.floor(cryptoRandom() * samples.length)]}${filetype}` : null;
    const fourthTrack = isMagicTime ? justStarTrekIntro[0] : null;
    const returnArray =  [firstTrack, secondTrack];
    if (thirdTrack) {
        returnArray.push(thirdTrack)
        returnArray.push(fourthTrack)
    }
    if (isMagicTime) {
        holder[trackIndex] = [firstSongId, secondSongId]
    } else {
        updateActiveKey();
    }
    if (trackIndex % magicNumber !== 2) {
        requestAnimationFrame(updateUIColors(activeKey, trackIndex))
    }
    trackIndex += 1;
    return {
        bpm: activeTempo,
        list: returnArray
    };
}

export {getTracks, trackIndex}