import {BufferLoader} from "./BufferLoader.js";


export const context = new AudioContext();
context.suspend();
new BufferLoader( context, [null], ()=>{} );

