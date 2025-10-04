import { getContext } from './context.js';

/**
 * Sidechain Compressor - Kick ducks everything else (classic DJ technique)
 */
class SidechainCompressor {
  constructor() {
    this.context = getContext();
    this.kickTrigger = null;
    this.compressors = [];
  }
  
  setKickTrigger(kickGainNode) {
    // Use the kick's gain node as a sidechain trigger
    this.kickTrigger = kickGainNode;
  }
  
  createSidechainFor(trackGainNode, trackIndex) {
    if (trackIndex === 0 || !this.kickTrigger) {
      // Track 0 is the kick, doesn't duck itself
      return trackGainNode;
    }
    
    // Create a sidechain compressor
    const sidechain = this.context.createDynamicsCompressor();
    sidechain.threshold.setValueAtTime(-24, this.context.currentTime);
    sidechain.knee.setValueAtTime(10, this.context.currentTime);
    sidechain.ratio.setValueAtTime(6, this.context.currentTime);
    sidechain.attack.setValueAtTime(0.001, this.context.currentTime);
    sidechain.release.setValueAtTime(0.05, this.context.currentTime);
    
    // Connect: track -> compressor -> output
    // (We can't directly sidechain in Web Audio, so we'll simulate it)
    trackGainNode.connect(sidechain);
    
    this.compressors.push({
      trackIndex,
      compressor: sidechain,
      trackGain: trackGainNode
    });
    
    // Sidechain enabled
    
    return sidechain;
  }
  
  // Simulate sidechain by analyzing kick energy and ducking other tracks
  pumpOnKick(kickEnergy) {
    // When kick is loud, duck other tracks slightly
    const duckAmount = Math.min(0.3, kickEnergy * 0.4);
    
    this.compressors.forEach(({ trackGain, trackIndex }) => {
      const now = this.context.currentTime;
      const currentGain = trackGain.gain.value;
      const targetGain = currentGain * (1 - duckAmount);
      
      // Quick duck and release
      trackGain.gain.cancelScheduledValues(now);
      trackGain.gain.setValueAtTime(currentGain, now);
      trackGain.gain.linearRampToValueAtTime(Math.max(0.02, targetGain), now + 0.005);
      trackGain.gain.linearRampToValueAtTime(currentGain, now + 0.08);
    });
  }
}

export const sidechainCompressor = new SidechainCompressor();

