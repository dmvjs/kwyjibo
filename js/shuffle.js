import {quantumRandom} from "./cryptoRandom.js";

/**
 * This shuffles an array of songs
 * @returns {*[]}
 * @private
 */
Array.prototype._shuffle = function () {
    const value = this.map(value => ({ value, sort: quantumRandom() }))
        .sort((a, b) => a.sort - b.sort )
        .map(({ value }) => value)
    return value
}
