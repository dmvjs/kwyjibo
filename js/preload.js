import {getTracks} from "./tracks.js";
import {BufferLoader} from "./BufferLoader.js";
import {context} from "./context.js";
import {bufferPadding, getBuffer, replenishBuffers, setBufferPadding} from "./buffers.js";
import {activeTempo, setActiveTempo} from "./tempo.js";
import {resetSongs} from "./song.js";
import {activeKey, getNextKey, initialKey} from "./key.js";

let bufferLoader;
let isFirst = true;

let tempoChangeIndex = 0;
let tracksFromURLIndex = 0
let usingTracksFromURL = false;

function init() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    const tracksFromURL = params.tracks || null;
    if (tracksFromURL) {
        usingTracksFromURL = true;
        const tracks = JSON.parse(tracksFromURL);
        if (Array.isArray(tracks)) {
            bufferLoader = new BufferLoader(
                context,
                getTracks(tracks[tracksFromURLIndex][0], tracks[tracksFromURLIndex][1]),
                finishedLoading
            );
            if (tracks[tracksFromURLIndex + 1]) {
                tracksFromURLIndex += 1;
            } else {
                tracksFromURLIndex = 0;
            }
        }
    } else {
        bufferLoader = new BufferLoader(
            context,
            getTracks(),
            finishedLoading
        );
    }

    bufferLoader.load();
}

function getAndStartBuffer(bufferListItem, time, addListener) {
    let timestamp;
    let source = getBuffer()
    source.buffer = bufferListItem;
    source.connect(context.destination);
    source.start(time);
    source.stop(time + bufferListItem.duration)
    if (addListener) {
        source.addEventListener('ended', (event) => {
            if (event?.timeStamp && event.timeStamp - timestamp < 30) {
                return;
            }
            timestamp = event.timeStamp;
            init()
        })
    }
}

function finishedLoading(bufferList, tempo) {
    getAndStartBuffer(bufferList[0], bufferPadding, true)
    if (bufferList[1]) {
        getAndStartBuffer(bufferList[1], bufferPadding)
    }
    if (bufferList[2]) {
        // delay the start until halfway through the bar
        getAndStartBuffer(bufferList[2], bufferPadding + ((60 / activeTempo) * 16) / 2)
    }
    if (bufferList[3]) {
        getAndStartBuffer(bufferList[3], bufferPadding)
    }

    const barDuration = 60 / tempo;
    const min = bufferList[0].duration < 15 ? barDuration * 16 : barDuration * 64;
    setBufferPadding(bufferPadding + min);
    if (!usingTracksFromURL) {
        if (activeKey === getNextKey(initialKey)) {
            tempoChangeIndex += 1;
            if (tempoChangeIndex % 9 === 0) {
                resetSongs()
                console.log('reset songs')
            }
            if (activeTempo === 84) {
                setActiveTempo(94)
            } else if (activeTempo === 94) {
                setActiveTempo(102)
            } else if (activeTempo === 102) {
                setActiveTempo(84)
            }
            console.log('tempo change', activeTempo)
        }
    }
    replenishBuffers(bufferList.length)
    if (isFirst) {
        isFirst = false;
        init();
    }
}

window.onload = init;
