import { loadSongsIntoSelect } from "./tracks.js";
import {
  activeKey,
  getNextKey,
  iterateActiveKey,
  setActiveKey,
  setInitialKey,
} from "./key.js";
import {
  activeTempo,
  onTempoChange,
  setActiveTempo,
  tempo1Input,
  tempo2Input,
  tempo3Input,
  tempo4Input,
  updateTempoUI,
} from "./tempo.js";

export const hideElement = (element) => {
  element.style.display = "none";
};

export const showElement = (element) => {
  element.style.display = "block";
};

export const setKey = (e) => {
  setActiveKey(parseInt(e.target.value, 10));
  const keyEnumeration = document.getElementById("key-enumeration");
  keyEnumeration.innerText = activeKey;
  keyEnumeration.className = `text-color-${activeKey}`;
  loadSongsIntoSelect();
  setInitialKey(activeKey);
};

export const initializeKeyListeners = () => {
  const key1 = document.getElementById("key-1");
  const key2 = document.getElementById("key-2");
  const key3 = document.getElementById("key-3");
  const key4 = document.getElementById("key-4");
  const key5 = document.getElementById("key-5");
  const key6 = document.getElementById("key-6");
  const key7 = document.getElementById("key-7");
  const key8 = document.getElementById("key-8");
  const key9 = document.getElementById("key-9");
  const key10 = document.getElementById("key-10");
  const key11 = document.getElementById("key-11");
  const key12 = document.getElementById("key-12");

  key1.addEventListener("change", setKey);
  key2.addEventListener("change", setKey);
  key3.addEventListener("change", setKey);
  key4.addEventListener("change", setKey);
  key5.addEventListener("change", setKey);
  key6.addEventListener("change", setKey);
  key7.addEventListener("change", setKey);
  key8.addEventListener("change", setKey);
  key9.addEventListener("change", setKey);
  key10.addEventListener("change", setKey);
  key11.addEventListener("change", setKey);
  key12.addEventListener("change", setKey);

  const keyLabel = document.getElementById("key-enumeration");
  keyLabel.innerText = activeKey;
  const el = document.getElementById(`key-${activeKey}`);
  el.checked = true;
};

export const initializeTempo = () => {
  tempo1Input.addEventListener("change", onTempoChange);
  tempo2Input.addEventListener("change", onTempoChange);
  tempo3Input.addEventListener("change", onTempoChange);
  tempo4Input.addEventListener("change", onTempoChange);
  setActiveTempo(activeTempo);
  updateTempoUI(activeTempo);
  loadSongsIntoSelect();
};

export const updateActiveKey = () => {
  iterateActiveKey();
  const element = document.getElementById(`key-${getNextKey(activeKey, true)}`);
  element.checked = true;
};
