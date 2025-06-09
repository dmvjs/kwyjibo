import {BufferLoader} from "./BufferLoader.js";

let audioContext = null;

export const getContext = () => {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

// Initialize with empty buffer to ensure context is created
new BufferLoader(getContext(), [null], ()=>{});

