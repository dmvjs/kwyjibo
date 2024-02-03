/**
 * @jest-environment jsdom
 */
import '../js/key.js';
import {activeKey, getNextKey, initialKey, iterateActiveKey, keySort, setActiveKey, setInitialKey} from "../js/key.js";

test('initial key basics', () => {
    expect(initialKey).toBeGreaterThan(0);
    expect(initialKey).toBeLessThan(13);
    expect(initialKey).toBe(activeKey);
});

test('set initial key basics', () => {
    setInitialKey(2)
    expect(initialKey).toBe(2);
    setInitialKey(13)
    expect(initialKey).toBe(2);
});

test('initial key basics', () => {
    expect(activeKey).toBeGreaterThan(0);
    expect(activeKey).toBeLessThan(13);
});

test('set active key basics', () => {
    setActiveKey(2)
    expect(activeKey).toBe(2);
    setActiveKey(13)
    expect(activeKey).toBe(2);
});

test('iterate active key basics', () => {
    setActiveKey(11)
    iterateActiveKey()
    expect(activeKey).toBe(12);
    iterateActiveKey()
    expect(activeKey).toBe(1);
});

test('get next key basics', () => {
    setActiveKey(11)
    expect(activeKey).toBe(11);
    expect(getNextKey(activeKey)).toBe(12);
    expect(getNextKey(getNextKey(activeKey))).toBe(1);

    setActiveKey(1)
    expect(activeKey).toBe(1);
    expect(getNextKey(activeKey, true)).toBe(12);
    expect(getNextKey(getNextKey(activeKey, true), true)).toBe(11);
});

test('key sort basics', () => {
    setActiveKey(5)
    expect(activeKey).toBe(5);
    expect([{key: 11}, {key: 6}].sort(keySort)[0].key).toBe(6);
    expect([{key: 7}, {key: 6}].sort(keySort)[0].key).toBe(6);
    expect([{key: 6}, {key: 5}].sort(keySort)[0].key).toBe(5);
});




