import {getContext} from "./context.js";

let bufferPadding = 0;

function setBufferPadding (x) {
    if (x >= 0 && x <= Number.MAX_VALUE) {
        bufferPadding = x;
    }
}

const buffers = Array.from({length: 44}, ()=> {
    return getContext().createBufferSource();
})

const getBuffer = () => {
    return buffers.pop()
}

const replenishBuffers = (howMany) => {
    Array.from({length: howMany}, ()=> {
        buffers.push(getContext().createBufferSource());
    })
}

export {bufferPadding, buffers, getBuffer, setBufferPadding, replenishBuffers}