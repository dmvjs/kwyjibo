import * as tf from '@tensorflow/tfjs';
import { getContext } from './context.js';
import { quantumRandom } from './cryptoRandom.js';
import { activeTempo } from './tempo.js';
import { quantumState } from './quantumState.js';
import { masterBus } from './masterBus.js';
import { sidechainCompressor } from './sidechainCompressor.js';
import { quantumProducer } from './quantumProducer.js';
import { HarmonicSculptor } from './harmonicSculptor.js';
import { updateIonState } from './quantumDisplay.js';

/**
 * QUANTUM GENERATIVE BEAT ENGINE
 * Uses TensorFlow to LEARN patterns from audio,
 * Quantum randomness for creative evolution,
 * Web Audio API for perfect timing and effects
 */
export class QuantumBeatEngine {
  constructor(trackIndex, totalTracks = 6) {
    this.context = getContext();
    this.trackIndex = trackIndex;
    this.totalTracks = totalTracks;

    // Assign role based on track
    this.role = this.assignRole(trackIndex);

    // TensorFlow pattern learning
    this.patternMemory = [];
    this.learnedRhythms = [];
    this.energySignature = [];

    // Quantum creative state
    this.creativityLevel = quantumRandom();
    this.evolution = 0;

    // Audio chain
    this.analyser = null;
    this.stemFilters = [];
    this.gainNode = null;
    this.effectNode = null;

    // Musical structure
    this.currentBar = 0;
    this.phrase = 'intro'; // intro, verse, chorus, drop, breakdown
    this.intensity = 0;

    // First track initializes the phrase
    if (trackIndex === 0) {
      quantumState.setPhrase('intro');
    }

    // Track initialized
  }

  assignRole(index) {
    const roles = [
      { name: 'kick', weight: 1.2 },
      { name: 'snare', weight: 1.1 },
      { name: 'bass', weight: 1.0 },
      { name: 'perc', weight: 0.85 },
      { name: 'melody', weight: 0.75 },
      { name: 'texture', weight: 0.65 }
    ];

    return roles[index] || { name: 'ambient', weight: 0.5 };
  }

  createStemFilters() {
    const ctx = this.context;

    // Much gentler filters - focus more on EQ than hard isolation
    switch (this.role.name) {
      case 'kick':
        // Boost lows, cut highs
        const k1 = ctx.createBiquadFilter();
        k1.type = 'lowshelf';
        k1.frequency.value = 100;
        k1.gain.value = 6; // Boost bass

        const k2 = ctx.createBiquadFilter();
        k2.type = 'lowpass';
        k2.frequency.value = 200;
        k2.Q.value = 0.7;

        this.stemFilters = [k1, k2];
        break;

      case 'snare':
        // Boost mids, cut lows
        const s1 = ctx.createBiquadFilter();
        s1.type = 'highpass';
        s1.frequency.value = 100;
        s1.Q.value = 0.7;

        const s2 = ctx.createBiquadFilter();
        s2.type = 'peaking';
        s2.frequency.value = 2000;
        s2.Q.value = 1.0;
        s2.gain.value = 4;

        this.stemFilters = [s1, s2];
        break;

      case 'bass':
        // Focus on bass frequencies
        const b1 = ctx.createBiquadFilter();
        b1.type = 'lowshelf';
        b1.frequency.value = 150;
        b1.gain.value = 5;

        const b2 = ctx.createBiquadFilter();
        b2.type = 'lowpass';
        b2.frequency.value = 500;
        b2.Q.value = 0.7;

        this.stemFilters = [b1, b2];
        break;

      case 'perc':
        // Boost highs
        const p1 = ctx.createBiquadFilter();
        p1.type = 'highshelf';
        p1.frequency.value = 6000;
        p1.gain.value = 4;

        const p2 = ctx.createBiquadFilter();
        p2.type = 'highpass';
        p2.frequency.value = 2000;
        p2.Q.value = 0.7;

        this.stemFilters = [p1, p2];
        break;

      case 'melody':
        // Boost mids
        const m1 = ctx.createBiquadFilter();
        m1.type = 'peaking';
        m1.frequency.value = 1500;
        m1.Q.value = 1.0;
        m1.gain.value = 3;

        this.stemFilters = [m1];
        break;

      case 'texture':
        // Boost presence
        const t1 = ctx.createBiquadFilter();
        t1.type = 'peaking';
        t1.frequency.value = 3000;
        t1.Q.value = 0.8;
        t1.gain.value = 3;

        this.stemFilters = [t1];
        break;
    }
  }

  createAnalyzerChain(source) {
    // Create analyzer for learning and frequency excitation
    this.analyser = this.context.createAnalyser();
    this.analyser.fftSize = 4096;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.timeDomainArray = new Uint8Array(this.bufferLength);
    
    // Frequency excitation system for UI
    this.frequencyExcitation = {
      enabled: true,
      lastAnalysis: 0,
      excitationThreshold: 0.3,
      frequencyRanges: this.getTrackFrequencyRanges(),
      currentExcitation: 0
    };

    // Create stem filters
    this.createStemFilters();

    // Create effect node
    this.effectNode = this.createEffectChain();

    // Create gain node
    this.gainNode = this.context.createGain();
    this.gainNode.gain.value = 0;

    // Create harmonic sculptor (TensorFlow-driven EQ for key matching)
    const harmonicSculptor = new HarmonicSculptor(this.analyser);

    // Connect: source -> analyser -> stem filters -> harmonic EQ -> effects -> gain -> output
    source.connect(this.analyser);

    let node = this.analyser;
    for (const filter of this.stemFilters) {
      node.connect(filter);
      node = filter;
    }

    // Create intermediate node for harmonic sculptor
    const preSculptNode = this.context.createGain();
    preSculptNode.gain.value = 1.0;
    node.connect(preSculptNode);

    const postSculptNode = this.context.createGain();
    postSculptNode.gain.value = 1.0;

    // Insert harmonic sculptor
    harmonicSculptor.connectToChain(preSculptNode, postSculptNode);

    if (this.effectNode) {
      postSculptNode.connect(this.effectNode.input);
      this.effectNode.output.connect(this.gainNode);
    } else {
      postSculptNode.connect(this.gainNode);
    }

    // Set up sidechain compression
    const sidechainOutput = sidechainCompressor.createSidechainFor(this.gainNode, this.trackIndex);

    // Start frequency analysis for UI excitation
    this.startFrequencyAnalysis();

    // Route to master bus (either directly or through sidechain)
    if (sidechainOutput === this.gainNode) {
      // This is the kick - route directly and register as trigger
      this.gainNode.connect(masterBus.getInput());
      sidechainCompressor.setKickTrigger(this.gainNode);
      // Kick registered as trigger
    } else {
      // Other tracks - route through sidechain
      sidechainOutput.connect(masterBus.getInput());
    }

    // Register spectral usage for masking avoidance
    this.registerSpectralRange();

    // Learn from the audio
    this.startLearning();

    // Start composing
    this.startComposing();

    return this.gainNode;
  }

  registerSpectralRange() {
    // Tell the quantum state which frequencies we're using
    const ranges = {
      'kick': 'low',
      'snare': 'mid-high',
      'bass': 'low',
      'perc': 'high',
      'melody': 'mid',
      'texture': 'mid'
    };

    quantumState.registerSpectralUsage(this.trackIndex, ranges[this.role.name] || 'mid');
  }

  createEffectChain() {
    // Quantum decision: which effect?
    // DISABLED FOR NOW - keep it simple
    return null;
  }

  createDelayEffect() {
    const delay = this.context.createDelay(2.0);
    const feedback = this.context.createGain();
    const wet = this.context.createGain();
    const dry = this.context.createGain();
    const output = this.context.createGain();

    // Delay time synced to tempo
    const beatDuration = 60 / activeTempo;
    const delayTimes = [beatDuration / 4, beatDuration / 3, beatDuration / 2, beatDuration];
    delay.delayTime.value = delayTimes[Math.floor(quantumRandom() * delayTimes.length)];

    feedback.gain.value = 0.3 + quantumRandom() * 0.2;
    wet.gain.value = 0.3;
    dry.gain.value = 0.7;

    // Routing
    dry.connect(output);
    wet.connect(delay);
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(output);

    return { input: { connect: (node) => { dry.connect(node); wet.connect(node); }}, output };
  }

  createReverbEffect() {
    // Simple reverb using multiple delays
    const output = this.context.createGain();
    const dry = this.context.createGain();
    dry.gain.value = 0.8;

    const delays = [];
    const delayTimes = [0.013, 0.021, 0.034, 0.055];

    delayTimes.forEach(time => {
      const delay = this.context.createDelay(1.0);
      const gain = this.context.createGain();
      delay.delayTime.value = time;
      gain.gain.value = 0.2;

      gain.connect(delay);
      delay.connect(output);
      delays.push(gain);
    });

    dry.connect(output);

    return {
      input: {
        connect: (node) => {
          dry.connect(node);
          delays.forEach(d => d.connect(node));
        }
      },
      output
    };
  }

  startLearning() {
    // Analyze the audio to learn patterns
    const learn = () => {
      if (!this.analyser) return;

      this.analyser.getByteFrequencyData(this.dataArray);
      this.analyser.getByteTimeDomainData(this.timeDomainArray);

      // Extract features
      const freqTensor = tf.tensor1d(Array.from(this.dataArray));
      const rms = tf.sqrt(tf.mean(tf.square(freqTensor)));
      const rmsValue = rms.dataSync()[0] / 255;

      // Build energy signature
      this.energySignature.push(rmsValue);
      if (this.energySignature.length > 256) {
        this.energySignature.shift();
      }

      // Contribute to collective energy for group decision making
      quantumState.recordCollectiveEnergy(rmsValue);

      // If this is the kick, trigger sidechain pumping
      if (this.role.name === 'kick' && rmsValue > 0.5) {
        sidechainCompressor.pumpOnKick(rmsValue);
      }

      // Detect patterns using autocorrelation
      if (this.energySignature.length >= 64) {
        const pattern = this.detectRhythmicPattern();
        if (pattern) {
          this.learnedRhythms.push(pattern);
          if (this.learnedRhythms.length > 10) {
            this.learnedRhythms.shift();
          }
        }
      }

      freqTensor.dispose();
      rms.dispose();

      requestAnimationFrame(learn);
    };

    learn();
  }

  detectRhythmicPattern() {
    // Use TensorFlow autocorrelation to find repeating patterns
    const signal = tf.tensor1d(this.energySignature.slice(-64));

    // Simple peak detection
    const threshold = tf.mean(signal).mul(tf.scalar(1.5));
    const peaks = tf.greater(signal, threshold);
    const peakIndices = [];

    const peaksArray = peaks.dataSync();
    for (let i = 1; i < peaksArray.length - 1; i++) {
      if (peaksArray[i] && !peaksArray[i-1]) {
        peakIndices.push(i);
      }
    }

    signal.dispose();
    threshold.dispose();
    peaks.dispose();

    if (peakIndices.length >= 3) {
      // Calculate intervals between peaks
      const intervals = [];
      for (let i = 1; i < peakIndices.length; i++) {
        intervals.push(peakIndices[i] - peakIndices[i-1]);
      }

      return {
        intervals,
        confidence: this.creativityLevel
      };
    }

    return null;
  }

  startComposing() {
    const beatDuration = 60 / activeTempo;
    const barDuration = beatDuration * 4;

    // Work with the actual file structure: 16-beat intros, 64-beat mains
    const introLength = 16; // beats (4 bars)
    const mainLength = 64; // beats (16 bars)

    const baseGain = 1.2 * this.role.weight; // Boosted for better volume
    let isIntro = true;
    let cycleCount = 0;

    const composeSection = () => {
      if (!this.gainNode) return;

      const now = this.context.currentTime;
      const numBeats = isIntro ? introLength : mainLength;
      const sectionDuration = numBeats * beatDuration;

      // RICK RUBIN DECISION: Should this track even play in this section?
      const productionDecision = quantumProducer.shouldTrackPlay(this.role.name);

      if (!productionDecision.play) {
        // COMPLETELY CUT - quantum producer says "this doesn't serve the song"
        // Track CUT by producer
        this.gainNode.gain.setValueAtTime(0.02, now);

        // Update display - ion inactive
        updateIonState(this.trackIndex, false, 0, false);

        // Don't schedule anything, just silence
      } else {
        // Generate pattern for this section
        const pattern = this.generateMusicalPattern(numBeats, isIntro);

        // Section scheduled

      // Apply transformation parameters
      const transformationParams = quantumState.getTransformationParams();
      const transformationIntensity = quantumState.getTransformationIntensity();
      
      // Schedule with production level and transformation
      const productionGain = baseGain * productionDecision.level;
      this.scheduleMusicalPattern(now, pattern, beatDuration, productionGain, transformationParams, transformationIntensity);
      }

      // Advance the global quantum state
      const barsInSection = numBeats / 4;
      for (let b = 0; b < barsInSection; b++) {
        quantumState.advanceBar();
      }

      // Alternate between intro and main sections
      isIntro = !isIntro;
      cycleCount++;

      // Update musical phrase every 4 cycles (matches original song changes)
      if (cycleCount % 4 === 0) {
        this.evolution++;

        // Vote for next phrase based on learned patterns
        const preferredPhrase = this.voteForNextPhrase();
        quantumState.voteForPhrase(this.trackIndex, preferredPhrase, this.currentEnergy || 0.5);

        // Only track 0 (leader) actually sets the phrase based on collective vote
        if (this.trackIndex === 0) {
          const collectivePhrase = quantumState.getCollectivePhrase();
          this.phrase = collectivePhrase;
          quantumState.setPhrase(collectivePhrase);

          // RICK RUBIN MAKES PRODUCTION DECISIONS for next cycle
          const songKeys = []; // TODO: get actual song keys if needed
          quantumProducer.makeProductionDecisions(songKeys, collectivePhrase, this.currentBar);
        } else {
          // Other tracks follow the quantum state
          this.phrase = quantumState.currentPhrase;
        }
      }

      // Schedule next section
      setTimeout(composeSection, sectionDuration * 1000 - 50);
    };

    // Start
    composeSection();
  }

  generateMusicalPattern(numBeats, isIntro) {
    const pattern = [];
    const barsInSection = numBeats / 4;

    // PRODUCTION CHECK - if this track is CUT, return empty pattern
    const productionDecision = quantumProducer.shouldTrackPlay(this.role.name);
    if (!productionDecision.play) {
      // Completely silent - don't even generate pattern
      for (let i = 0; i < numBeats; i++) {
        pattern.push({ play: false, velocity: 0, effect: null, rest: true });
      }
      return pattern;
    }

    for (let i = 0; i < numBeats; i++) {
      const beatInBar = i % 4;
      const currentBar = Math.floor(i / 4);

      // QUANTUM REST CHECK - entire 4-bar phrases can be silent
      const phraseNumber = Math.floor(currentBar / 4);
      const isRestingPhrase = quantumState.shouldRestForPhrase(this.trackIndex, phraseNumber);

      if (isRestingPhrase) {
        // This entire 4-bar phrase is a REST - complete silence
        pattern.push({
          play: false,
          velocity: 0,
          effect: null,
          rest: true // Mark as deliberate rest
        });
        continue;
      }

      // Get quantum state for this specific moment
      const quantumMoment = quantumState.shouldPlayBeat(
        this.trackIndex,
        i,
        beatInBar,
        currentBar
      );

      // Get base probability
      let probability = this.getMusicalProbability(beatInBar, currentBar, barsInSection, isIntro);

      // Apply quantum adjustments (creates relationships between tracks)
      probability += quantumMoment.adjustment;

      // Apply production level (focus = 1.0, support = 0.6)
      probability *= productionDecision.level;

      // Use the shared quantum value for this moment
      const shouldPlay = quantumMoment.quantumValue < probability;

      // Effects only on beat 4 of every 4th bar (very methodical)
      let effect = null;
      if (shouldPlay && beatInBar === 3 && currentBar % 4 === 3) {
        if (quantumRandom() < 0.2) {
          effect = quantumRandom() < 0.7 ? 'roll' : 'stutter';
        }
      }

      pattern.push({
        play: shouldPlay,
        velocity: shouldPlay ? 0.88 + quantumMoment.quantumValue * 0.12 : 0,
        effect: effect,
        emergent: quantumMoment.inHarmonicSet,
        rest: false
      });
    }

    // Pattern generated

    return pattern;
  }

  getMusicalProbability(beatInBar, bar, totalBars, isIntro) {
    // ULTRA-SPARSE COMPOSITIONAL APPROACH - 1 element at a time, maximum 2

    let prob = 0;

    switch (this.role.name) {
      case 'kick':
        if (beatInBar === 0) prob = 0.15;
        else if (beatInBar === 2) prob = 0.08;
        else prob = 0.005;
        break;

      case 'snare':
        if (beatInBar === 1 || beatInBar === 3) prob = 0.1;
        else prob = 0.002;
        break;

      case 'bass':
        if (beatInBar === 0) prob = 0.1;
        else if (beatInBar === 2) prob = 0.12;
        else prob = 0.03;
        break;

      case 'perc':
        prob = 0.05;
        break;

      case 'melody':
        prob = 0.02;
        break;

      case 'texture':
        prob = 0.03;
        break;
    }

    // Intro sections MINIMAL (often solo)
    if (isIntro) {
      prob *= 0.25; // Dramatic reduction
    }

    // Phrase-based composition
    switch (this.phrase) {
      case 'intro':
        prob *= 0.2; // Almost nothing
        break;
      case 'buildup':
        // Slow progressive layering
        const buildProgress = bar / totalBars;
        prob *= (0.25 + buildProgress * 1.0);
        break;
      case 'drop':
        prob *= 2.0; // Full power
        break;
      case 'breakdown':
        // Dramatic shift
        if (this.role.name === 'kick' || this.role.name === 'snare' || this.role.name === 'bass') {
          prob *= 0.1; // Almost no rhythm
        } else {
          prob *= 3.0; // Melody dominates
        }
        break;
      case 'verse':
        prob *= 0.5; // Very lean
        break;
    }

    // Micro quantum variation
    prob += (quantumRandom() - 0.5) * 0.015;

    return Math.max(0, Math.min(1, prob));
  }

  scheduleMusicalPattern(startTime, pattern, beatDuration, baseGain, transformationParams = null, transformationIntensity = 0) {
    // Get spectral guidance (avoid masking)
    const spectralGuidance = quantumState.getSpectralGuidance(this.trackIndex);
    const adjustedBaseGain = Math.max(0.02, baseGain * (1 + spectralGuidance.adjustment));

    const minGain = 0.02; // TRUE silence when not playing

    // Think in 4-bar phrases for smoother composition
    for (let bar = 0; bar < pattern.length / 4; bar++) {
      const barStartBeat = bar * 4;
      const barTime = startTime + (barStartBeat * beatDuration);

      // Check if this bar should be active based on pattern
      const barBeats = pattern.slice(barStartBeat, barStartBeat + 4);
      const barActive = barBeats.some(b => b.play);
      const isRestBar = barBeats.every(b => b.rest); // Check for deliberate rest

      if (isRestBar) {
        // COMPLETE REST - entire 4-bar phrase is silent
        const currentGain = Math.max(0.02, this.gainNode.gain.value);
        this.gainNode.gain.setValueAtTime(currentGain, barTime);
        this.gainNode.gain.exponentialRampToValueAtTime(0.02, barTime + beatDuration);
        continue;
      }

      if (barActive) {
        // Schedule each beat in this bar
        for (let b = 0; b < 4; b++) {
          const beat = barBeats[b];

          // Apply micro-timing and swing for groove
          const microTiming = quantumState.getMicroTiming(b);
          const beatTime = barTime + (b * beatDuration) + microTiming;

          if (beat.play) {
            let velocity = Math.max(0.02, adjustedBaseGain * beat.velocity);
            
            // Apply transformation effects
            if (transformationParams && transformationIntensity > 0) {
              // Harmonic shift affects velocity
              velocity *= (1 + transformationParams.harmonicShift * transformationIntensity * 0.1);
              
              // Rhythmic complexity affects timing
              const complexityOffset = transformationParams.rhythmicComplexity * transformationIntensity * 0.01;
              const transformedBeatTime = beatTime + complexityOffset;
              
              // Timbral evolution affects gain curve
              const timbralEffect = 1 + (transformationParams.timbralEvolution * transformationIntensity * 0.05);
              velocity *= timbralEffect;
              
              // Dynamic range compression/expansion
              velocity = Math.pow(velocity, transformationParams.dynamicRange);
            }

            // Update quantum display - ion is active
            updateIonState(this.trackIndex, true, velocity, beat.effect !== null);

            // Schedule display off at end of beat
            setTimeout(() => {
              updateIonState(this.trackIndex, false, 0, false);
            }, beatDuration * 1000);

            // Smooth envelope (no clicks) using exponential ramps
            const currentGain = Math.max(0.02, this.gainNode.gain.value);
            const finalBeatTime = transformationParams && transformedBeatTime ? transformedBeatTime : beatTime;

            this.gainNode.gain.cancelAndHoldAtTime(finalBeatTime);
            this.gainNode.gain.setValueAtTime(currentGain, beatTime);

            // Attack
            this.gainNode.gain.exponentialRampToValueAtTime(
              velocity,
              beatTime + 0.005
            );

            // Sustain
            this.gainNode.gain.exponentialRampToValueAtTime(
              velocity * 0.88,
              beatTime + beatDuration * 0.75
            );

            // Release
            this.gainNode.gain.exponentialRampToValueAtTime(
              minGain,
              beatTime + beatDuration * 0.99
            );

            // Effects (clean implementation)
            if (beat.effect === 'roll') {
              // 4-hit roll on last 1/4 beat
              for (let r = 0; r < 4; r++) {
                const rollTime = beatTime + beatDuration * 0.75 + (r * beatDuration / 16);
                this.gainNode.gain.setValueAtTime(velocity * 0.7, rollTime);
                this.gainNode.gain.exponentialRampToValueAtTime(
                  Math.max(0.02, velocity * 0.3),
                  rollTime + beatDuration / 20
                );
              }
            } else if (beat.effect === 'stutter') {
              // Clean stutter
              const stutterTime = beatTime + beatDuration * 0.5;
              this.gainNode.gain.setValueAtTime(velocity * 0.65, stutterTime);
              this.gainNode.gain.exponentialRampToValueAtTime(
                minGain,
                stutterTime + beatDuration * 0.2
              );
            }
          } else {
            // OFF beat but in active bar: go to true silence
            const currentGain = Math.max(0.02, this.gainNode.gain.value);
            this.gainNode.gain.setValueAtTime(currentGain, beatTime);
            this.gainNode.gain.exponentialRampToValueAtTime(
              0.02, // TRUE silence
              beatTime + beatDuration * 0.3
            );
          }
        }
      } else {
        // Entire bar is OFF: fade to silence quickly
        const currentGain = Math.max(0.02, this.gainNode.gain.value);
        this.gainNode.gain.setValueAtTime(currentGain, barTime);
        this.gainNode.gain.exponentialRampToValueAtTime(
          0.02, // TRUE silence
          barTime + beatDuration
        );
      }
    }
  }


  voteForNextPhrase() {
    // Analyze learned patterns and energy to vote for next phrase
    const phrases = ['intro', 'verse', 'buildup', 'drop', 'breakdown'];

    // Base decision on current energy and learned patterns
    const avgEnergy = this.energySignature.length > 0
      ? this.energySignature.reduce((a, b) => a + b, 0) / this.energySignature.length
      : 0.5;

    this.currentEnergy = avgEnergy;

    // Vote based on energy level
    if (avgEnergy < 0.3) {
      return 'intro'; // Low energy → intro or breakdown
    } else if (avgEnergy < 0.5) {
      return 'verse'; // Medium → verse
    } else if (avgEnergy < 0.7) {
      return 'buildup'; // Rising → buildup
    } else {
      return 'drop'; // High energy → drop!
    }
  }

  updatePhrase() {
    // This is only called by track 0 after collecting votes
    // Kept for backwards compatibility
    const phrases = ['intro', 'verse', 'buildup', 'drop', 'breakdown'];

    // Small chance for quantum jump
    if (quantumRandom() < 0.10) {
      this.phrase = phrases[Math.floor(quantumRandom() * phrases.length)];
      // Quantum phase jump
    } else {
      // Natural progression
      const currentIndex = phrases.indexOf(this.phrase);
      const nextIndex = (currentIndex + 1) % phrases.length;
      this.phrase = phrases[nextIndex];
      // Phrase progression
    }
  }

  stop() {
    if (this.analyser) {
      this.analyser.disconnect();
      this.analyser = null;
    }
    this.stemFilters.forEach(f => f.disconnect());
    this.stemFilters = [];
    if (this.gainNode) {
      this.gainNode.disconnect();
      this.gainNode = null;
    }
    if (this.effectNode) {
      if (this.effectNode.input) this.effectNode.input.disconnect();
      if (this.effectNode.output) this.effectNode.output.disconnect();
    }
    if (this.previousSpectrum) {
      this.previousSpectrum.dispose();
    }
    this.dataArray = null;
    this.timeDomainArray = null;
  }
  
  getTrackFrequencyRanges() {
    // Define NARROW frequency ranges for more precise triggering
    const ranges = {
      0: { name: 'kick', low: 40, high: 120, color: '#FF6B6B' },      // Kick - narrow sub bass
      1: { name: 'snare', low: 500, high: 1500, color: '#4ECDC4' },   // Snare - narrow mid range
      2: { name: 'bass', low: 80, high: 300, color: '#45B7D1' },      // Bass - narrow low mid
      3: { name: 'perc', low: 2000, high: 6000, color: '#96CEB4' },   // Percussion - narrow high mid
      4: { name: 'melody', low: 400, high: 2000, color: '#FFEAA7' },  // Melody - narrow range
      5: { name: 'texture', low: 300, high: 3000, color: '#DDA0DD' }  // Texture - narrow spectrum
    };
    
    return ranges[this.trackIndex] || ranges[0];
  }
  
  startFrequencyAnalysis() {
    if (!this.frequencyExcitation.enabled) return;
    
    let lastAnalysisTime = 0;
    const analysisInterval = 0.25; // Only analyze every quarter beat
    
    const analyze = () => {
      if (!this.analyser) return;
      
      // Only analyze on beat intervals to reduce constant triggering
      const currentTime = this.context.currentTime;
      if (currentTime - lastAnalysisTime < analysisInterval) {
        requestAnimationFrame(analyze);
        return;
      }
      
      // Get frequency data
      this.analyser.getByteFrequencyData(this.dataArray);
      
      // Calculate frequency bin width
      const sampleRate = this.context.sampleRate;
      const binWidth = sampleRate / (2 * this.dataArray.length);
      
      // Analyze the track's specific frequency range
      const range = this.frequencyExcitation.frequencyRanges;
      const startBin = Math.floor(range.low / binWidth);
      const endBin = Math.floor(range.high / binWidth);
      
      // Calculate PEAK energy instead of average for more dramatic triggering
      let peakEnergy = 0;
      
      for (let i = startBin; i < endBin && i < this.dataArray.length; i++) {
        peakEnergy = Math.max(peakEnergy, this.dataArray[i]);
      }
      
      const normalizedEnergy = peakEnergy / 255;
      
      // Update excitation level
      this.frequencyExcitation.currentExcitation = normalizedEnergy;
      
      // Much higher threshold - only trigger on very significant peaks
      if (normalizedEnergy > 0.85) {
        this.triggerIonExcitation(normalizedEnergy);
        lastAnalysisTime = currentTime;
      }
      
      // Continue analysis
      requestAnimationFrame(analyze);
    };
    
    analyze();
  }
  
  triggerIonExcitation(energy) {
    // Trigger laser effect and ripple
    if (typeof updateIonState === 'function') {
      updateIonState(this.trackIndex, true, energy * 2, true);
    }
    
    if (typeof triggerIonRipple === 'function') {
      triggerIonRipple(this.trackIndex);
    }
  }
  
  getExcitationLevel() {
    return this.frequencyExcitation.currentExcitation;
  }
}

