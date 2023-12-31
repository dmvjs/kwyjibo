import {activeKey, keySort, updateActiveKey} from "./key.js";
import {filetype} from "./filetype.js";
import {justStarTrekIntro, samples} from "./samples.js";
import {getSong, getSongById, getSongs} from "./song.js";
import {activeTempo} from "./tempo.js";
import {quantumRandom} from "./cryptoRandom.js";
import {songdata} from "./songdata.js";
import {addTracks} from "./share.js";

let holder = {}
const magicNumber = 5;

export let trackIndex = 0;
export let  isMagicTime = trackIndex % magicNumber === 0;

export const hideElement = (element) => {
    element.style.display = 'none'
}

export const showElement = (element) => {
    element.style.display = 'block'
}

const deck1Select = document.getElementById('deck-1')
const deck2Select = document.getElementById('deck-2')

export let fsID;
export let ssID;


export const updateUI = (key, firstSongId, secondSongId) => {
    if (trackIndex === 3) {
        showElement(document.getElementById('share-button'));
    }
    fsID = firstSongId;
    ssID = secondSongId;
    return () => {
        document.body.className = `color-${key}`
        const keyEnumeration = document.getElementById('key-enumeration')
        const tempoCount = document.getElementById('tempo-count')
        tempoCount.innerText = songdata.filter(item=> item.id === firstSongId)[0].bpm;

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
        firstSongLabel.innerText = `${firstSongUI.artist || ''} - ${firstSongUI.title || ''}`
        secondSongLabel.innerText = `${secondSongUI?.artist || ''} - ${secondSongUI?.title || ''}`
        /*thirdSongLabel.innerText = `${firstSongUI.artist || ''} - ${firstSongUI.title || ''}`
        fourthSongLabel.innerText = `${secondSongUI?.artist || ''} - ${secondSongUI?.title || ''}`*/
        firstSongLabel.className = `text-color-${thirdSongUI?.computedKey || thirdSongUI?.key}`
        secondSongLabel.className = `text-color-${fourthSongUI?.computedKey || fourthSongUI?.key}`
        thirdSongLabel.className = `text-color-${firstSongUI.computedKey || firstSongUI.key}`
        fourthSongLabel.className = `text-color-${secondSongUI?.computedKey || secondSongUI?.key}`
        loadSongsIntoSelect(firstSongUI, secondSongUI)
        tempoCount.innerText = firstSongUI.bpm;
        keyEnumeration.innerText = key;
        keyEnumeration.className = `text-color-${key}`
        document.getElementById('play-button').className = `button-color-${key}`
        document.getElementById('contact-button').className = `button-color-${key}`
        document.getElementById('youtube-button').className = `button-color-${key}`
        document.getElementById('github-button').className = `button-color-${key}`
        showElement(document.getElementById('now-playing'))
    }
}

export const getSelectedSongIds =  () => {
    const songs = getSongs()
    const firstSong = deck1Select.value === '-1' ? null : songs.thisTempoSongs.find(s=>{
        return s.id === parseInt(deck1Select.value, 10)
    })
    const secondSong =  deck2Select.value === '-1' ? null : songs.thisTempoSongs.find(s=>{
        return s.id === parseInt(deck2Select.value, 10)
    })
    return [firstSong, secondSong]
}
export const loadSongsIntoSelect = (firstSong, secondSong) => {
    const songs = getSongs()
    deck1Select.length = 0
    deck2Select.length = 0;
    const optionDefault1 = document.createElement('option')
    optionDefault1.value = '-1';
    optionDefault1.innerText = `Pick next deck 1 song ${activeTempo}bpm`
    deck1Select.appendChild(optionDefault1)
    deck1Select.value = '-1';

    const optionDefault2 = document.createElement('option')
    optionDefault2.value = '-1';
    optionDefault2.innerText = `Pick next deck 2 song ${activeTempo}bpm`
    deck2Select.appendChild(optionDefault2)
    deck2Select.value = '-1';

    [...new Set(songs.thisTempoSongs.concat([firstSong, secondSong])
        .filter(Boolean)
        .sort((a,b)=>a.title > b.title)
        .sort((a,b)=>a.artist < b.artist)
        .sort(keySort))]
        .map((item)=> {
        const option1 = document.createElement('option')
        option1.value = `${item.id}`
        option1.innerText = `${item.key} : ${item.artist} - ${item.title} #${item.id}`
        const option2 = document.createElement('option')
        option2.value = `${item.id}`
        option2.innerText = `${item.key} : ${item.artist} - ${item.title} #${item.id}`
        deck1Select.appendChild(option1)
        deck2Select.appendChild(option2)
    })
}

export const file  = (int, isLead) => `../music/${String(int).padStart(8, '0')}-${isLead ? 'lead' : 'body'}${filetype}`
//TODO see if you can delete the played songs from picker
export const getTracks = (track1, track2, skipSamples = false) => {
    const isUsingTracksFromURL = track1 !== undefined;
    isMagicTime = trackIndex % magicNumber === 0;
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
    addTracks([firstSongId, secondSongId]);
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
