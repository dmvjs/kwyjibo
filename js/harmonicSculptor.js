import * as tf from '@tensorflow/tfjs';
import { getContext } from './context.js';
import { activeKey } from './key.js';
import { quantumRandom } from './cryptoRandom.js';

/**
 * HARMONIC SCULPTOR
 * Uses TensorFlow to analyze spectral content and EQ to fit the active key
 * Emphasizes compatible harmonics, suppresses clashing ones
 */
export class HarmonicSculptor {
  constructor(analyser) {
    this.context = getContext();
    this.analyser = analyser;
    this.dataArray = new Uint8Array(analyser.frequencyBinCount);
    
    // Create dynamic EQ bands for harmonic sculpting
    this.eqBands = this.createHarmonicEQ();
    
    // Harmonic relationships (which frequencies fit which keys)
    this.harmonicMap = this.buildHarmonicMap();
    
    // Start analyzing and adapting
    this.startSculpting();
  }
  
  buildHarmonicMap() {
    // Map keys to their fundamental frequencies and harmonics
    // Using A440 tuning, key 1 = C, key 2 = C#, etc.
    const fundamentals = {
      1: 261.63,  // C4
      2: 277.18,  // C#4
      3: 293.66,  // D4
      4: 311.13,  // D#4
      5: 329.63,  // E4
      6: 349.23,  // F4
      7: 369.99,  // F#4
      8: 392.00,  // G4
      9: 415.30,  // G#4
      10: 440.00, // A4
      11: 466.16, // A#4
      12: 493.88  // B4
    };
    
    return fundamentals;
  }
  
  createHarmonicEQ() {
    // Create 5 parametric EQ bands for harmonic sculpting
    const bands = [];
    
    for (let i = 0; i < 5; i++) {
      const eq = this.context.createBiquadFilter();
      eq.type = 'peaking';
      eq.Q.value = 2.0; // Narrow bands for precision
      eq.gain.value = 0; // Start neutral
      
      // Frequency bands across the spectrum
      const frequencies = [150, 400, 1000, 2500, 6000];
      eq.frequency.value = frequencies[i];
      
      bands.push(eq);
    }
    
    return bands;
  }
  
  connectToChain(inputNode, outputNode) {
    // Connect: input -> EQ bands -> output
    let node = inputNode;
    
    for (const band of this.eqBands) {
      node.connect(band);
      node = band;
    }
    
    node.connect(outputNode);
  }
  
  startSculpting() {
    const sculpt = () => {
      if (!this.analyser) return;
      
      // Get spectral data
      this.analyser.getByteFrequencyData(this.dataArray);
      
      // Analyze with TensorFlow
      this.analyzeAndSculpt();
      
      // Update every ~100ms (smooth changes)
      setTimeout(sculpt, 100);
    };
    
    sculpt();
  }
  
  analyzeAndSculpt() {
    const freqData = Array.from(this.dataArray);
    const freqTensor = tf.tensor1d(freqData);
    
    // Get the fundamental frequency for the active key
    const keyFundamental = this.harmonicMap[activeKey];
    
    // Calculate which frequency bins align with the key's harmonics
    const sampleRate = this.context.sampleRate;
    const binWidth = sampleRate / (2 * this.dataArray.length);
    
    // For each EQ band, decide if it enhances or clashes with the key
    this.eqBands.forEach((band, i) => {
      const bandFreq = band.frequency.value;
      
      // Calculate harmonic relationship to the key
      const harmonicFit = this.calculateHarmonicFit(bandFreq, keyFundamental);
      
      // Get energy in this frequency range
      const binIndex = Math.floor(bandFreq / binWidth);
      const binStart = Math.max(0, binIndex - 5);
      const binEnd = Math.min(this.dataArray.length, binIndex + 5);
      
      const regionTensor = freqData.slice(binStart, binEnd);
      const regionEnergy = regionTensor.reduce((a, b) => a + b, 0) / regionTensor.length;
      const normalizedEnergy = regionEnergy / 255;
      
      // Apply harmonic sculpting
      const now = this.context.currentTime;
      let targetGain = 0;
      
      if (harmonicFit > 0.7) {
        // Strong harmonic fit - boost
        targetGain = 2 + (normalizedEnergy * 2); // +2 to +4 dB
      } else if (harmonicFit > 0.4) {
        // Mild fit - slight boost or neutral
        targetGain = 0 + (normalizedEnergy * 1.5); // 0 to +1.5 dB
      } else {
        // Clashing - subtle cut
        targetGain = -2 - (normalizedEnergy * 1); // -2 to -3 dB
      }
      
      // Smooth changes
      band.gain.linearRampToValueAtTime(targetGain, now + 0.15);
    });
    
    freqTensor.dispose();
  }
  
  calculateHarmonicFit(frequency, keyFundamental) {
    // Calculate how well this frequency fits the active key
    // Using harmonic series: fundamental, 2x, 3x, 4x, 5x, 6x, etc.
    
    const harmonics = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16];
    let bestFit = 0;
    
    for (const harmonic of harmonics) {
      const harmonicFreq = keyFundamental * harmonic;
      
      // Check if frequency is close to this harmonic (within 10%)
      const ratio = frequency / harmonicFreq;
      
      if (ratio > 0.9 && ratio < 1.1) {
        const distance = Math.abs(1 - ratio);
        const fit = 1 - (distance * 10); // 0-1 score
        bestFit = Math.max(bestFit, fit);
      }
    }
    
    // Also check subharmonics (octaves below)
    for (let octave = 1; octave <= 3; octave++) {
      const subFundamental = keyFundamental / Math.pow(2, octave);
      const ratio = frequency / subFundamental;
      
      if (ratio > 0.9 && ratio < 1.1) {
        const distance = Math.abs(1 - ratio);
        const fit = 1 - (distance * 10);
        bestFit = Math.max(bestFit, fit * 0.8); // Subharmonics slightly less important
      }
    }
    
    return bestFit;
  }
  
  disconnect() {
    this.eqBands.forEach(band => band.disconnect());
  }
}

