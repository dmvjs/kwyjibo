import { songdata } from "./songdata.js";
import { quantumRandom } from "./cryptoRandom.js";
import "./shuffle.js";

export let songs;

export const resetSongs = () => {
  songs = songdata;
};

export const getSongById = (id) => {
  return songs.find((item) => item.id === id);
};

export const removeSongFromListById = (id) => {
  songs = songs.filter((item) => item.id !== id);
};

export const getId = (array) => {
  const rando = quantumRandom();
  const songIndex = Math.floor(rando * array.length);
  const { id } = array._shuffle()[songIndex];
  const selectedSong = getSongById(id);
  removeSongFromListById(id);
  return { artist: selectedSong.artist, id: selectedSong.id };
};
