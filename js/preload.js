import {getTracks} from "./tracks.js";
import {BufferLoader} from "./BufferLoader.js";
import {context} from "./context.js";
import {bufferPadding, getBuffer, setBufferPadding} from "./buffers.js";
import {activeTempo} from "./tempo.js";

let bufferLoader;
let isFirst = true;

function init() {
    bufferLoader = new BufferLoader(
        context,
        getTracks(),
        finishedLoading
    );
    bufferLoader.load();
}

function getAndStartBuffer(bufferListItem, time, addListener) {
    const source = getBuffer()
    source.buffer = bufferListItem;
    source.connect(context.destination);
    source.start(time);
    source.stop(time + bufferListItem.duration)
    if (addListener) {
        source.addEventListener('ended', init)
    }
}

function finishedLoading(bufferList) {
    getAndStartBuffer(bufferList[0], bufferPadding, true)
    getAndStartBuffer(bufferList[1], bufferPadding)
    if (bufferList[2]) {
        getAndStartBuffer(bufferList[2], bufferPadding + ((60 / activeTempo) * 16) / 2)
    }
    if (bufferList[3]) {
        getAndStartBuffer(bufferList[3], bufferPadding)
    }

    const barDuration = 60 / activeTempo;

    const min = bufferList[0].duration < 15 ? barDuration * 16 : barDuration * 64;
    setBufferPadding(bufferPadding + min);
    if (isFirst) {
        isFirst = false;
        init();
    }
}

window.onload = init;