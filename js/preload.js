import {
    getSelectedSongIds,
    getTracks,
    hideElement,
    isMagicTime,
    showElement,
} from "./tracks.js";
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

export const resetTempoIndex = () => {
    tempoChangeIndex  = 0;
}

export const init = () => {
    setTimeout(() => {
        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        });
        const tracksFromURL = params.tracks || null;
        if (tracksFromURL) {
            usingTracksFromURL = true;
            let tracks
            try {
                // if you just provide a number value for tracks it will repeat a single track
                if (typeof tracks === 'number') {
                    tracks = [[tracks]]
                } else {
                    tracks = JSON.parse(tracksFromURL);
                }
            } catch (e) {
                if (!Array.isArray(tracks)) {
                    // a string like this will also work: 1,2-3,4-5,6 and will evaluate to [[1,2],[3,4],[5,6]]
                    tracks = tracksFromURL.split('-').filter(Boolean).map(x => x.split(',').filter(Boolean).map(v => parseInt(v, 10)))
                    console.log(tracks)
                }
            }
            bufferLoader = new BufferLoader(
                context,
                getTracks(tracks[tracksFromURLIndex][0], tracks[tracksFromURLIndex][1], true),
                finishedLoading
            );
            if (tracks[tracksFromURLIndex + 1]) {
                tracksFromURLIndex += 1;
            } else {
                tracksFromURLIndex = 0;
            }
            bufferLoader.load();
        } else if (isFirst || isMagicTime) {
            setTimeout(() => {
                const ids = getSelectedSongIds();
                if (ids && typeof ids[0]?.id === 'number' && typeof ids[1]?.id === 'number') {
                    bufferLoader = new BufferLoader(
                        context,
                        getTracks(ids[0].id, ids[1].id),
                        finishedLoading
                    );
                } else {
                    bufferLoader = new BufferLoader(
                        context,
                        getTracks(),
                        finishedLoading
                    );
                }
                hideElement(document.getElementById('up-next'))
                bufferLoader.load();
            })
        } else {
            const element = document.getElementById('counter-holder')
            const numberOfSeconds = 32;
            element.innerText = `${numberOfSeconds - 1}`;
            const interval = setInterval(() => {
                const value = parseInt(element.innerText, 10)
                element.innerText = `${value - 1}`
                if (value - 1 < 7) {
                    element.style.color = 'lightyellow'
                }
                if (value - 1 < 3) {
                    element.style.color = 'pink'
                }
                if (value - 1 >= 7) {
                    element.style.color = 'white'
                }

            }, 1000);
            element.style.display = 'inline-block'
            setTimeout(() => {
                const ids = getSelectedSongIds();
                if (ids && typeof ids[0]?.id === 'number' && typeof ids[1]?.id === 'number') {
                    bufferLoader = new BufferLoader(
                        context,
                        getTracks(ids[0].id, ids[1].id),
                        finishedLoading
                    );
                } else {
                    bufferLoader = new BufferLoader(
                        context,
                        getTracks(),
                        finishedLoading
                    );
                }
                hideElement(element)
                hideElement(document.getElementById('up-next'))
                clearInterval(interval)
                bufferLoader.load();
            }, numberOfSeconds * 1000)
        }
    })

}

function getAndStartBuffer(bufferListItem, time, addListener, buffers) {
    let timestamp;
    let source = getBuffer()
    source.buffer = bufferListItem;
    source.connect(context.destination);
    source.start(time);
    source.stop(time + bufferListItem.duration)
    if (addListener) {
        source.addEventListener('ended', (event) => {
            (buffers || []).forEach((buffer)=> {
                buffer = null;
            })
            showElement(document.getElementById('up-next'))
            if (event?.timeStamp && event.timeStamp - timestamp < 30) {
                return;
            }
            timestamp = event.timeStamp;
            init()
        })
    }
}

function finishedLoading(bufferList, tempo) {
    getAndStartBuffer(bufferList[0], bufferPadding, true, [bufferList[0], bufferList[1], bufferList[2], bufferList[3]])
    if (bufferList[1]) {
        getAndStartBuffer(bufferList[1], bufferPadding)
    }
    if (!usingTracksFromURL) {
        if (bufferList[2]) {
            // delay the start until halfway through the bar
            getAndStartBuffer(bufferList[2], bufferPadding + ((60 / activeTempo) * 16) / 2)
        }
        if (bufferList[3]) {
            getAndStartBuffer(bufferList[3], bufferPadding)
        }
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

// window.onload = init;
