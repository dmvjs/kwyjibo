import './init.js'
import './tapToPlay.js';
import './preload.js';
import { initQuantumDisplay } from './quantumDisplay.js';

console.log('💿', 'for promotional use only.')

// Initialize quantum display when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Initializing quantum display...');
  const display = initQuantumDisplay();
  console.log('Display instance:', display);
});

// Backup - try after a delay too
setTimeout(() => {
  console.log('🚀 Backup init...');
  initQuantumDisplay();
}, 500);
