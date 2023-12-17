import {QRNG} from "./qrng.js";

const q = new QRNG();

export const cryptoRandom = () => {
    const typedArray = new Uint32Array(1);
    const randomValue = crypto.getRandomValues(typedArray)[0];
    const randomFloat = randomValue / Math.pow(2, 32);
    return randomFloat;
}

export const quantumRandom = () => {
    const quantumValue = q.getFloat()
    const cryptoRandomValue = cryptoRandom()
    return Number.isNaN(quantumValue) ? cryptoRandomValue : quantumValue
}
