/**
 * @jest-environment jsdom
 */
import '../js/shuffle.js';

test('tests for existence of _shuffle', () => {
    expect(typeof []._shuffle).not.toBe('undefined');
});

test('tests that one in ten is shuffled', () => {
    expect(Array.from({length: 10}).some(()=> {
        return [0,1]._shuffle().join('') !== '01'
    })).toBe(true);
});
