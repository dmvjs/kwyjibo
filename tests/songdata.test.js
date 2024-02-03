/**
 * @jest-environment jsdom
 */
import {songdata} from "../js/songdata.js";


test('non zero songs', () => {
    expect(songdata).not.toBeUndefined();
    expect(songdata.length).toBeGreaterThan(0)
    expect(songdata.filter(x=>x.bpm === 84).length).toBeGreaterThan(0)
    expect(songdata.filter(x=>x.bpm === 94).length).toBeGreaterThan(0)
    expect(songdata.filter(x=>x.bpm === 102).length).toBeGreaterThan(0)
    expect(songdata.filter(x=>x.bpm === 123).length).toBeGreaterThan(0)
    expect(songdata[0].id).toBe(1)
});
