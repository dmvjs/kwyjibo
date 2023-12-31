import {quantumRandom} from "./cryptoRandom.js";

Array.prototype._shuffle = function () {
    const value = this.map(value => ({ value, sort: quantumRandom() }))
        .sort((a, b) => a.sort - b.sort )
        .map(({ value }) => value)
    return value
}
