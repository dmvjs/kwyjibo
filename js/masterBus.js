import { getContext } from './context.js';

/**
 * Master Bus - Glues all tracks together with compression and limiting
 */
class MasterBus {
  constructor() {
    this.context = getContext();
    this.input = null;
    this.output = null;
    this.chain = [];

    this.initialize();
  }

  initialize() {
    // Create the master processing chain

    // 1. Multi-band compression for glue
    const lowComp = this.context.createDynamicsCompressor();
    lowComp.threshold.setValueAtTime(-30, this.context.currentTime);
    lowComp.knee.setValueAtTime(15, this.context.currentTime);
    lowComp.ratio.setValueAtTime(4, this.context.currentTime);
    lowComp.attack.setValueAtTime(0.01, this.context.currentTime);
    lowComp.release.setValueAtTime(0.15, this.context.currentTime);

    // 2. Main glue compressor
    const glueComp = this.context.createDynamicsCompressor();
    glueComp.threshold.setValueAtTime(-18, this.context.currentTime);
    glueComp.knee.setValueAtTime(20, this.context.currentTime);
    glueComp.ratio.setValueAtTime(3, this.context.currentTime);
    glueComp.attack.setValueAtTime(0.003, this.context.currentTime);
    glueComp.release.setValueAtTime(0.2, this.context.currentTime);

    // 3. Gentle EQ for clarity
    const lowShelf = this.context.createBiquadFilter();
    lowShelf.type = 'lowshelf';
    lowShelf.frequency.value = 80;
    lowShelf.gain.value = 2; // Slight bass boost

    const presence = this.context.createBiquadFilter();
    presence.type = 'peaking';
    presence.frequency.value = 3000;
    presence.Q.value = 0.7;
    presence.gain.value = 2; // Presence boost

    const airShelf = this.context.createBiquadFilter();
    airShelf.type = 'highshelf';
    airShelf.frequency.value = 10000;
    airShelf.gain.value = 1.5; // Air

    // 4. Brick wall limiter (final safety)
    const limiter = this.context.createDynamicsCompressor();
    limiter.threshold.setValueAtTime(-3, this.context.currentTime);
    limiter.knee.setValueAtTime(0, this.context.currentTime);
    limiter.ratio.setValueAtTime(20, this.context.currentTime);
    limiter.attack.setValueAtTime(0.001, this.context.currentTime);
    limiter.release.setValueAtTime(0.1, this.context.currentTime);

    // 5. Output gain
    const outputGain = this.context.createGain();
    outputGain.gain.value = 1.5; // Boosted for better volume

    // Connect the chain
    this.input = this.context.createGain();
    this.input.gain.value = 1.0;

    this.input.connect(lowComp);
    lowComp.connect(glueComp);
    glueComp.connect(lowShelf);
    lowShelf.connect(presence);
    presence.connect(airShelf);
    airShelf.connect(limiter);
    limiter.connect(outputGain);
    outputGain.connect(this.context.destination);

    this.output = outputGain;

    this.chain = [lowComp, glueComp, lowShelf, presence, airShelf, limiter, outputGain];

    // Master bus initialized
  }

  getInput() {
    return this.input;
  }

  getOutput() {
    return this.output;
  }

  disconnect() {
    this.chain.forEach(node => {
      if (node && node.disconnect) {
        node.disconnect();
      }
    });

    if (this.input) {
      this.input.disconnect();
    }
  }
}

// Singleton master bus
export const masterBus = new MasterBus();

