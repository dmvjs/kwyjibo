/**
 * @jest-environment jsdom
 */
import {getId, getSongById, removeSongFromListById, resetSongs, songs} from "../js/song.js";

test('non zero songs, reset songs', () => {
    expect(songs).toBeUndefined();
    resetSongs()
    expect(songs).not.toBeUndefined();
    expect(songs.length).not.toBe(0);
    expect(songs.length).toBeGreaterThan(0)
});

test('get song by id', () => {
    const song = getSongById(songs[0].id)
    expect(song.id).toBe(songs[0].id);
    expect(song.id).toBe(1);
});

test('remove song by id, reset songs', () => {
    removeSongFromListById(1)
    const songBefore = getSongById(1)
    expect(songBefore).toBeUndefined()
    resetSongs()
    const songAfter = getSongById(1)
    expect(songAfter).not.toBeUndefined();
});

test('get id test', () => {
    const songsArray = [songs[0], songs[1]]
    const array = Array.from({length: 1000}, () => {
        resetSongs() // getId removes the song from songs
        return getId(songsArray)
    })
    expect(array.some((item)=>item.id === 1)).toBe(true)
    expect(array.some((item)=>item.id === 2)).toBe(true)
});
