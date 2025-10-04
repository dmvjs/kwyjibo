import { quantumRandom } from './cryptoRandom.js';
import * as tf from '@tensorflow/tfjs';

/**
 * QUANTUM PRODUCER - Rick Rubin-style minimalist production
 * Makes ruthless decisions about what to CUT
 * "What can we remove and make it better?"
 */
class QuantumProducer {
  constructor() {
    // Production philosophy - BRUTAL minimalism
    this.minimalismLevel = 0.95 + quantumRandom() * 0.05; // 0.95-1.0 (almost always solo)
    this.focusElement = null; // What's the star of this section?
    this.supportingCast = []; // What supports the star?
    this.currentVibe = 'space'; // space, tension, release, impact
    
    // Producer initialized
  }
  
  makeProductionDecisions(songKeys, phrase, barNumber) {
    // Rick Rubin question: "What's this section about?"
    this.analyzeSectionPurpose(phrase, barNumber);
    
    // Decide which ONE element is the star
    this.focusElement = this.selectFocusElement(songKeys);
    
    // Pick 0-2 supporting elements (usually 0-1)
    this.supportingCast = this.selectSupportingElements(this.focusElement);
    
    // Production decisions made
    
    return {
      focus: this.focusElement,
      support: this.supportingCast,
      vibe: this.currentVibe
    };
  }
  
  analyzeSectionPurpose(phrase, barNumber) {
    // What should this section feel like?
    const quantum = quantumRandom();
    
    switch (phrase) {
      case 'intro':
        this.currentVibe = 'space'; // Lots of emptiness
        break;
      case 'verse':
        this.currentVibe = quantum < 0.5 ? 'space' : 'tension';
        break;
      case 'buildup':
        this.currentVibe = 'tension'; // Building
        break;
      case 'drop':
        this.currentVibe = 'impact'; // Hit hard
        break;
      case 'breakdown':
        this.currentVibe = 'release'; // Breathe
        break;
    }
  }
  
  selectFocusElement(songKeys) {
    // Quantum decision: Which element is the STAR of this section?
    const elements = ['kick', 'snare', 'bass', 'perc', 'melody', 'texture'];
    
    // Weight by vibe
    let weights;
    switch (this.currentVibe) {
      case 'space':
        // One element alone
        weights = [0.15, 0.1, 0.15, 0.05, 0.3, 0.25]; // Prefer melody/texture
        break;
      case 'tension':
        // Rhythm elements
        weights = [0.25, 0.25, 0.25, 0.15, 0.05, 0.05]; // Kick/snare/bass
        break;
      case 'release':
        // Melodic elements
        weights = [0.05, 0.05, 0.1, 0.05, 0.4, 0.35]; // Melody/texture
        break;
      case 'impact':
        // Everything can be focus
        weights = [0.3, 0.25, 0.2, 0.1, 0.1, 0.05]; // Kick first
        break;
      default:
        weights = [0.2, 0.2, 0.2, 0.15, 0.15, 0.1];
    }
    
    // Quantum weighted selection
    const rand = quantumRandom();
    let cumulative = 0;
    
    for (let i = 0; i < elements.length; i++) {
      cumulative += weights[i];
      if (rand <= cumulative) {
        return elements[i];
      }
    }
    
    return elements[0];
  }
  
  selectSupportingElements(focus) {
    // Rick Rubin: "Does it NEED support, or is it better alone?"
    const needsSupport = quantumRandom() > this.minimalismLevel; // High minimalism = less support
    
    if (!needsSupport) {
      return []; // Solo element - maximum impact (most common!)
    }
    
    // Only pick 1 supporting element (never 2)
    const allElements = ['kick', 'snare', 'bass', 'perc', 'melody', 'texture'];
    const available = allElements.filter(e => e !== focus);
    
    // Pick ONE complementary element
    const complement = this.getComplement(focus, available);
    
    return [complement];
  }
  
  getComplement(focus, available) {
    // What complements the focus element?
    const complements = {
      'kick': ['bass', 'texture'],
      'snare': ['kick', 'perc'],
      'bass': ['kick', 'melody'],
      'perc': ['snare', 'texture'],
      'melody': ['bass', 'texture'],
      'texture': ['melody', 'perc']
    };
    
    const preferred = complements[focus] || [];
    const options = available.filter(e => preferred.includes(e));
    
    if (options.length > 0) {
      return options[Math.floor(quantumRandom() * options.length)];
    }
    
    return available[Math.floor(quantumRandom() * available.length)];
  }
  
  shouldTrackPlay(trackRole) {
    // Rick Rubin's ultimate question: "Does this serve the song?"
    
    // For now, allow all tracks to play with full level
    // This ensures all 6 tracks get quantum treatment
    return { 
      play: true, 
      level: 1.0, 
      role: 'focus' // All tracks are focus elements for now
    };
  }
}

export const quantumProducer = new QuantumProducer();

