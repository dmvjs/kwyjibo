import {activeKey, updateActiveKey} from "./key.js";
import {filetype} from "./filetype.js";
import {justStarTrekIntro, samples} from "./samples.js";
import {getSong, getSongById} from "./song.js";
import {activeTempo} from "./tempo.js";
import {quantumRandom} from "./cryptoRandom.js";
import {songdata} from "./songdata.js";

let holder = {}
const magicNumber = 5;

let trackIndex = 0;

export const hideElement = (element) => {
    element.style.display = 'none'
}

export const showElement = (element) => {
    element.style.display = 'block'
}


export const updateUI = (key, firstSongId, secondSongId) => {
    return () => {
        if (trackIndex === 1) {
            hideElement(document.getElementById('now-playing'))
        }
        if (trackIndex === 2) {
            hideElement(document.getElementById('now-playing'))
            showElement(document.getElementById('up-next'))
        }
        if (trackIndex === 3) {
            showElement(document.getElementById('up-next'))
        }
        document.body.className = `color-${key}`
        const keyEnumeration = document.getElementById('key-enumeration')
        const tempoCount = document.getElementById('tempo-count')
        tempoCount.innerText = songdata.filter(item=>item.id === firstSongId)[0].bpm;

        const firstSongLabel = document.getElementById('first-song-label')
        const secondSongLabel = document.getElementById('second-song-label')
        const thirdSongLabel = document.getElementById('third-song-label')
        const fourthSongLabel = document.getElementById('fourth-song-label')
        window.playedSongs = window.playedSongs || [];
        window.playedSongs.push([firstSongId, secondSongId])
        const firstSongUI = songdata.filter(item=>item.id === (window.playedSongs[(trackIndex - 1) < 0 ? 0 : trackIndex - 1][0]))[0]
        const secondSongUI = songdata.filter(item=>item.id === (window.playedSongs[(trackIndex - 1) < 0 ? 0 : trackIndex - 1][1]))[0]
        const thirdSongUI = songdata.filter(item=>item.id === (window.playedSongs[(trackIndex - 2) < 0 ? 0 : trackIndex - 2][0]))[0]
        const fourthSongUI = songdata.filter(item=>item.id === (window.playedSongs[(trackIndex - 2) < 0 ? 0 : trackIndex - 2][1]))[0]
        firstSongLabel.innerText = `${thirdSongUI.artist} - ${thirdSongUI.title}`
        secondSongLabel.innerText = `${fourthSongUI?.artist || ''} - ${fourthSongUI?.title || ''}`
        thirdSongLabel.innerText = `${firstSongUI.artist || ''} - ${firstSongUI.title || ''}`
        fourthSongLabel.innerText = `${secondSongUI?.artist || ''} - ${secondSongUI?.title || ''}`
        firstSongLabel.className = `text-color-${thirdSongUI?.computedKey || thirdSongUI?.key}`
        secondSongLabel.className = `text-color-${fourthSongUI?.computedKey || fourthSongUI?.key}`
        thirdSongLabel.className = `text-color-${firstSongUI.computedKey || firstSongUI.key}`
        fourthSongLabel.className = `text-color-${secondSongUI?.computedKey || secondSongUI?.key}`
        tempoCount.innerText = firstSongUI.bpm;
        keyEnumeration.innerText = key;
        keyEnumeration.className = `text-color-${key}`
        document.getElementById('play-button').className = `button-color-${key}`
        document.getElementById('contact-button').className = `button-color-${key}`
        document.getElementById('youtube-button').className = `button-color-${key}`
        document.getElementById('github-button').className = `button-color-${key}`
    }
}

export const file  = (int, isLead) => `../music/${String(int).padStart(8, '0')}-${isLead ? 'lead' : 'body'}${filetype}`

const getTracks = (track1, track2, skipSamples = false) => {
    const isUsingTracksFromURL = track1 !== undefined;
    const isMagicTime = trackIndex % magicNumber === 0;
    if (isMagicTime) {
        // console.log('station identification…')
    }
    const firstSongFromURL = track1 && getSongById(track1);
    const secondSongFromURL = track2 ? getSongById(track2) : null;
    const firstSong = firstSongFromURL || trackIndex % magicNumber === 1 ? null : getSong()
    const firstSongId = trackIndex % magicNumber === 1 ? holder[trackIndex - 1][0] : firstSongFromURL?.id || firstSong.id;
    const secondSongId = trackIndex % magicNumber === 1 ? holder[trackIndex - 1][1] : isUsingTracksFromURL ? track2 ? secondSongFromURL?.id : null : getSong(firstSong.key, firstSong.artist).id;
    if (!isMagicTime) {
        // console.log('followed by…')
    }
    const firstTrack = file(firstSongId, isMagicTime)
    let secondTrack;
    if (secondSongId) {
        secondTrack = file(secondSongId, isMagicTime)
    }
    let thirdTrack;
    let fourthTrack;
    if (!skipSamples) {
        thirdTrack = isMagicTime ? `../music/${samples[Math.floor(quantumRandom() * samples.length)]}${filetype}` : null;
        fourthTrack = isMagicTime ? justStarTrekIntro[0] : null;
    }
    const returnArray =  [firstTrack];
    if (secondTrack) {
        returnArray.push(secondTrack)
    }
    if (!skipSamples && thirdTrack) {
        returnArray.push(thirdTrack)
        returnArray.push(fourthTrack)
    }
    requestAnimationFrame(updateUI(activeKey, firstSongId, secondSongId, trackIndex))
    if (isMagicTime) {
        holder[trackIndex] = [firstSongId, secondSongId]
    } else {
        updateActiveKey();
    }
    trackIndex += 1;
    return {
        bpm: firstSongFromURL?.bpm || activeTempo,
        list: returnArray
    };
}

export {getTracks, trackIndex}
