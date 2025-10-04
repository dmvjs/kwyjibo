import {QRNG} from "./qrng.js";

const q = new QRNG();

// Circuit breaker for QRNG failures
let qrngFailureCount = 0;
let qrngDisabled = false;
const MAX_QRNG_FAILURES = 20; // More tolerant

export const cryptoRandom = () => {
    const typedArray = new Uint32Array(1);
    const randomValue = crypto.getRandomValues(typedArray)[0];
    const randomFloat = randomValue / Math.pow(2, 32);
    return randomFloat;
}

export const quantumRandom = () => {
    // If QRNG is disabled due to repeated failures, use crypto directly
    if (qrngDisabled) {
        return cryptoRandom();
    }
    
    try {
        const quantumValue = q.getFloat()
        if (Number.isNaN(quantumValue) || quantumValue === undefined) {
            qrngFailureCount++;
            if (qrngFailureCount >= MAX_QRNG_FAILURES) {
                qrngDisabled = true;
                console.warn('🌊 QRNG disabled after repeated failures, using crypto fallback');
            }
            // Only warn on first few failures to reduce spam
            if (qrngFailureCount <= 3) {
                console.warn('🌊 QRNG failed, using crypto fallback');
            }
            return cryptoRandom();
        }
        
        // Reset failure count on successful QRNG call
        qrngFailureCount = 0;
        return quantumValue;
    } catch (error) {
        qrngFailureCount++;
        if (qrngFailureCount >= MAX_QRNG_FAILURES) {
            qrngDisabled = true;
            console.warn('🌊 QRNG disabled after repeated failures, using crypto fallback');
        }
        // Only warn on first few failures to reduce spam
        if (qrngFailureCount <= 3) {
            console.warn('🌊 QRNG error, using crypto fallback:', error);
        }
        return cryptoRandom();
    }
}
