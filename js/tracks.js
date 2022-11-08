import {activeKey, getNextKey, initialKey, updateActiveKey} from "./key.js";
import {filetype} from "./filetype.js";
import {justStarTrekIntro, samples} from "./samples.js";
import {getSong, resetSongs} from "./song.js";
import {activeTempo, setActiveTempo} from "./tempo.js";
import {replenishBuffers} from "./buffers.js";

let holder = {}
const magicNumber = 5;

let trackIndex = 0;

const file  = (int, isLead) => `../music/${String(int).padStart(8, '0')}-${isLead ? 'lead' : 'body'}${filetype}`

const getTracks = () => {
    const isMagicTime = trackIndex % magicNumber === 0;
    if (isMagicTime) {
        console.log('station identification…')
    }
    const firstSongId = trackIndex % magicNumber === 1 ? holder[trackIndex - 1][0] : getSong(activeKey);
    const secondSongId = trackIndex % magicNumber === 1 ? holder[trackIndex - 1][1] : getSong(activeKey);
    if (!isMagicTime) {
        console.log('followed by…')
    }
    const firstTrack = file(firstSongId, isMagicTime)
    const secondTrack = file(secondSongId, isMagicTime)
    const thirdTrack = isMagicTime ? `../music/${samples[Math.floor(Math.random() * samples.length)]}${filetype}` : null;
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
    // change tempo
    if (activeKey === getNextKey(initialKey)) {
        if (activeTempo === 84) {
            setActiveTempo(94)
        } else if (activeTempo === 94) {
            setActiveTempo(102)
        } else if (activeTempo === 102) {
            resetSongs();
            setActiveTempo(84)
        }
        console.log('tempo change', activeTempo)
    }
    trackIndex += 1;
    replenishBuffers(returnArray.length)
    return returnArray;
}

export {getTracks, trackIndex}