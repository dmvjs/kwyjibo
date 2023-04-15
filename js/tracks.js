import {activeKey, updateActiveKey} from "./key.js";
import {filetype} from "./filetype.js";
import {justStarTrekIntro, samples} from "./samples.js";
import {getSong} from "./song.js";
import {activeTempo} from "./tempo.js";
import {cryptoRandom} from "./cryptoRandom.js";
import {songdata} from "./songdata.js";

let holder = {}
const magicNumber = 5;

let trackIndex = 0;

export const updateUI = (key, firstSongId, secondSongId) => {
    return () => {
        document.body.className = `color-${key}`
        const keyEnumeration = document.getElementById('key-enumeration')
        keyEnumeration.innerText = key;
        const tempoCount = document.getElementById('tempo-count')
        tempoCount.innerText = songdata[firstSongId].bpm;
        tempoCount.className = `text-color-${key}`
        keyEnumeration.className = `text-color-${key}`
        document.getElementById('play-button').className = `button-color-${key}`
        document.getElementById('contact-button').className = `button-color-${key}`
        document.getElementById('youtube-button').className = `button-color-${key}`
        document.getElementById('github-button').className = `button-color-${key}`
        document.getElementById('pause-button').className = `button-color-${key}`
    }
}

const file  = (int, isLead) => `../music/${String(int).padStart(8, '0')}-${isLead ? 'lead' : 'body'}${filetype}`

const getTracks = () => {
    const isMagicTime = trackIndex % magicNumber === 0;
    if (isMagicTime) {
        console.log('station identification…')
    }
    const firstSong = trackIndex % magicNumber === 1 ? null : getSong()
    const firstSongId = trackIndex % magicNumber === 1 ? holder[trackIndex - 1][0] : firstSong.id;
    const secondSongId = trackIndex % magicNumber === 1 ? holder[trackIndex - 1][1] : getSong(firstSong.artist).id;
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
    if (trackIndex % magicNumber !== 2) {
        requestAnimationFrame(updateUI(activeKey, trackIndex, firstSongId, secondSongId))
    }
    if (isMagicTime) {
        holder[trackIndex] = [firstSongId, secondSongId]
    } else {
        updateActiveKey();
    }
    trackIndex += 1;
    return {
        bpm: activeTempo,
        list: returnArray
    };
}

export {getTracks, trackIndex}
