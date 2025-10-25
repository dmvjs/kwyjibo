import fs from 'fs';

// Key compatibility mapping
const keyCompatibility = {
  1: [4, 8, 5, 9, 2, 6, 10, 3],    // C works with 8 keys
  2: [8, 10, 6, 12, 1, 5, 9, 3],   // D works with 8 keys  
  3: [10, 12, 7, 1, 2, 6, 8, 4],   // E works with 8 keys
  4: [1, 8, 5, 9, 2, 6, 10, 3],    // F works with 8 keys
  5: [9, 1, 6, 10, 2, 7, 11, 4],   // F# works with 8 keys
  6: [10, 2, 7, 11, 3, 8, 12, 5],  // G works with 8 keys
  7: [11, 3, 8, 12, 4, 9, 1, 6],   // G# works with 8 keys
  8: [1, 5, 10, 2, 6, 11, 3, 7],   // A works with 8 keys
  9: [2, 6, 11, 3, 7, 12, 4, 8],   // A# works with 8 keys
  10: [2, 6, 8, 12, 4, 9, 1, 5],   // B works with 8 keys
  11: [3, 7, 9, 1, 5, 10, 2, 6],   // C# works with 8 keys
  12: [4, 8, 10, 2, 6, 11, 3, 7]   // D# works with 8 keys
};

// Read the songdata.js file
let content = fs.readFileSync('js/songdata.js', 'utf8');

// Find all track objects and add compatibleKeys
const trackRegex = /\{\s*id:\s*(\d+),\s*artist:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*key:\s*(\d+),\s*bpm:\s*(\d+),?\s*\}/g;

content = content.replace(trackRegex, (match, id, artist, title, key, bpm) => {
  const compatibleKeys = keyCompatibility[parseInt(key)];
  return `  {
    id: ${id},
    artist: "${artist}",
    title: "${title}",
    key: ${key},
    bpm: ${bpm},
    compatibleKeys: [${compatibleKeys.join(', ')}],
  }`;
});

// Write the updated content back
fs.writeFileSync('js/songdata.js', content);

console.log('Added compatibleKeys to all tracks!'); 