import { quantumRandom } from './cryptoRandom.js';

/**
 * Shared Quantum State - Creates coherent patterns across all tracks
 * All tracks reference the same quantum numbers to create emergent musical relationships
 */
class QuantumMusicalState {
  constructor() {
    // Quantum seeds that create deterministic patterns when combined
    this.quantumSeeds = [];
    this.currentPhrase = 'intro';
    this.globalIntensity = 0;
    this.barCount = 0;
    
    // Musical relationships (which tracks play together)
    this.harmonicSet = null; // Which tracks are "in harmony" this cycle
    this.rhythmicPair = null; // Which tracks are rhythmically locked
    this.leader = null; // Which track is the "leader" this cycle
    
    // Collective intelligence - all tracks contribute
    this.trackVotes = []; // Each track votes on next phrase
    this.energyHistory = []; // Collective energy across all tracks
    this.spectralMap = new Map(); // Frequency usage by track
    
    // Groove parameters
    this.swingAmount = 0;
    this.microTiming = [];
    
    // HORSE RACE SYSTEM - 4 states over 64 beats, switching every 16 beats
    this.raceState = {
      currentLap: 0, // 0-3 (4 laps of 16 beats each)
      totalLaps: 4,
      lapDuration: 16, // beats per lap
      currentLeader: 0, // Which track is leading this lap
      lapLeaders: [], // Track who won each lap
      racePositions: [0, 1, 2, 3, 4, 5], // Current race positions
      lapStartBeat: 0, // Beat when current lap started
      raceIntensity: 0.5, // How intense the race is (0-1)
      momentum: [0, 0, 0, 0, 0, 0], // Each track's momentum
      
      // TRANSFORMATION SYSTEM - Gradual changes over 4 q6s cycles
      transformationPhase: 0, // 0-3 (which q6s cycle we're in)
      transformationIntensity: 0, // 0-1, how much transformation is active
      transformationParams: {
        harmonicShift: 0, // Gradual harmonic movement
        rhythmicComplexity: 0, // Increasing rhythmic density
        timbralEvolution: 0, // Timbral changes over time
        spatialMovement: 0, // Stereo field movement
        frequencyModulation: 0, // Subtle frequency shifts
        dynamicRange: 1.0 // Dynamic range compression/expansion
      }
    };
    
    this.regenerateSeeds();
  }
  
  regenerateSeeds() {
    // Generate quantum seeds for different time scales
    this.quantumSeeds = {
      // Micro patterns (per beat)
      beat: Array.from({length: 4}, () => quantumRandom()),
      
      // Bar patterns (4 beats)
      bar: Array.from({length: 4}, () => quantumRandom()),
      
      // 2-bar phrases
      phrase2: Array.from({length: 2}, () => quantumRandom()),
      
      // 4-bar phrases
      phrase4: quantumRandom(),
      
      // 8-bar sections
      section8: quantumRandom(),
      
      // 16-bar movements
      movement16: quantumRandom(),
      
      // Overall composition seed
      composition: quantumRandom()
    };
    
    // Decide which tracks work together this cycle
    this.harmonicSet = this.selectHarmonicSet();
    this.rhythmicPair = this.selectRhythmicPair();
    this.leader = Math.floor(this.quantumSeeds.movement16 * 6);
    
    // Quantum swing/groove
    this.swingAmount = 0.1 + (this.quantumSeeds.composition * 0.3); // 0.1-0.4
    
    // Micro-timing for human feel (slight variations per beat)
    this.microTiming = Array.from({length: 4}, () => 
      (quantumRandom() - 0.5) * 0.01 // ±10ms variation
    );
    
    // Clear votes for next cycle
    this.trackVotes = [];
    
    // Generate quantum rest patterns (which 4-bar phrases should be silent)
    this.restPatterns = this.generateRestPatterns();
    
    // Quantum state regenerated
  }
  
  generateRestPatterns() {
    // Each track gets a pattern of which 4-bar phrases to rest
    const patterns = {};
    
    for (let track = 0; track < 6; track++) {
      const isLeader = track === this.leader;
      const inHarmonic = this.harmonicSet.includes(track);
      
      // EXTREME rest probabilities - almost always silent
      const restProbability = isLeader ? 0.9 : inHarmonic ? 0.95 : 0.98;
      
      // Generate 4 rest decisions (for 4-bar phrases)
      const rests = [];
      for (let phrase = 0; phrase < 4; phrase++) {
        const shouldRest = quantumRandom() < restProbability;
        rests.push(shouldRest);
      }
      
      // Ensure at least SOME complete silence - force additional rests
      const forcedSilence = Math.floor(quantumRandom() * 2); // Force 0-1 additional rest
      if (forcedSilence > 0 && rests.filter(r => r).length < 4) {
        const activeIndices = rests.map((r, i) => r ? -1 : i).filter(i => i >= 0);
        if (activeIndices.length > 0) {
          const toSilence = activeIndices[Math.floor(quantumRandom() * activeIndices.length)];
          rests[toSilence] = true;
        }
      }
      
      patterns[track] = rests;
    }
    
    return patterns;
  }
  
  shouldRestForPhrase(trackIndex, phraseNumber) {
    // Check if this track should rest for this entire 4-bar phrase
    if (!this.restPatterns[trackIndex]) {
      return false;
    }
    
    return this.restPatterns[trackIndex][phraseNumber % 4] || false;
  }
  
  shouldCutEntireSection(trackIndex, sectionNumber) {
    // RICK RUBIN CHOPS - Cut entire 16-bar sections (or more)
    // Since 64 beats = 4 x 16-bar sections, we can cut 1-4 entire sections
    const quantum = quantumRandom();
    
    // Different tracks have different cutting probabilities - MORE AGGRESSIVE
    const cutProbabilities = {
      0: 0.6,  // Kick - often cut entire sections
      1: 0.7,  // Snare - very likely to be cut
      2: 0.8,  // Bass - almost always cut
      3: 0.85, // Lead - almost always cut
      4: 0.9,  // Pad - almost always cut
      5: 0.95  // Perc - almost always cut
    };
    
    const shouldCut = quantum < cutProbabilities[trackIndex] || false;
    
    if (shouldCut) {
      // Determine how many 16-bar sections to cut (1-4) - MORE DRAMATIC
      const sectionsToCut = 1 + Math.floor(quantumRandom() * 4);
      const startSection = Math.floor(quantumRandom() * (4 - sectionsToCut + 1));
      
      const chopTypes = ['BRUTAL CHOP', 'DRAMATIC EDIT', 'RUTHLESS CUT', 'COMPLETE DESTRUCTION'];
      const chopType = chopTypes[Math.floor(quantumRandom() * chopTypes.length)];
      
      console.log(`🎵 Rick Rubin ${chopType} Track ${trackIndex} sections ${startSection}-${startSection + sectionsToCut - 1} (${sectionsToCut} x 16-bar sections)`);
      
      return {
        cut: true,
        startSection,
        sectionsToCut,
        totalSections: 4,
        chopType: chopType
      };
    }
    
    return { cut: false };
  }
  
  selectHarmonicSet() {
    // Use quantum seed to pick 3-4 tracks that should play together
    const numTracks = 3 + Math.floor(this.quantumSeeds.composition * 2); // 3 or 4 tracks
    const tracks = [];
    
    for (let i = 0; i < numTracks; i++) {
      const trackIndex = Math.floor(quantumRandom() * 6);
      if (!tracks.includes(trackIndex)) {
        tracks.push(trackIndex);
      }
    }
    
    return tracks;
  }
  
  selectRhythmicPair() {
    // Pick 2 tracks that should be rhythmically locked (kick+bass, etc)
    const track1 = Math.floor(this.quantumSeeds.section8 * 6);
    let track2 = Math.floor(this.quantumSeeds.movement16 * 6);
    
    // Ensure they're different
    while (track2 === track1) {
      track2 = Math.floor(quantumRandom() * 6);
    }
    
    return [track1, track2];
  }
  
  shouldPlayBeat(trackIndex, beatNumber, beatInBar, barNumber) {
    // Debug: Log all calls to shouldPlayBeat
    if (trackIndex === 4 || trackIndex === 5) {
      console.log(`🔊 shouldPlayBeat called: track=${trackIndex}, beat=${beatNumber}, beatInBar=${beatInBar}, bar=${barNumber}`);
    }
    
    // QUANTUM INTERFERENCE - tracks interfere constructively or destructively
    
    // Get deterministic quantum values for this moment
    const beatSeed = this.quantumSeeds.beat[beatInBar];
    const barSeed = this.quantumSeeds.bar[barNumber % 4];
    const phraseSeed = this.quantumSeeds.phrase2[Math.floor(barNumber / 2) % 2];
    const section8Seed = this.quantumSeeds.section8;
    
    // Create quantum wave for this track at this moment
    const trackPhase = (trackIndex / 6) * Math.PI * 2; // Each track has a phase offset
    const timePhase = (beatNumber / 64) * Math.PI * 2; // Time evolution
    
    // Quantum wave interference
    const wave1 = Math.sin(trackPhase + timePhase);
    const wave2 = Math.cos(trackPhase * beatSeed + timePhase * barSeed);
    const interference = (wave1 + wave2) / 2; // Ranges from -1 to 1
    
    // Convert interference to play/silence decision
    // DESTRUCTIVE interference (near -1) = silence
    // CONSTRUCTIVE interference (near +1) = play
    const interferenceValue = (interference + 1) / 2; // Normalize to 0-1
    
    // Only 2-3 tracks should play at any given beat (sparse arrangement)
    const densityControl = this.quantumSeeds.phrase4;
    const maxSimultaneousTracks = 2 + Math.floor(densityControl * 2); // 2-3 tracks max
    
    // Check if this track is in the current harmonic set
    const inHarmonicSet = this.harmonicSet.includes(trackIndex);
    
    // Check if this track is rhythmically paired
    const isRhythmicPair = this.rhythmicPair.includes(trackIndex);
    const isLeader = trackIndex === this.leader;
    
    // HORSE RACE DYNAMICS - Race position affects play probability
    const raceState = this.getRaceState();
    const isRaceLeader = trackIndex === raceState.currentLeader;
    const racePosition = raceState.racePositions.indexOf(trackIndex);
    const trackMomentum = raceState.momentum[trackIndex];
    
    // SPECIAL TRADING RULE: Tracks 5 and 6 (4,5 indexed) are controlled by entanglement patterns
    // These tracks use volume-based alternating, not quantum state control
    const isTradingTrack = (trackIndex === 4 || trackIndex === 5);
    
    // Constructive interference bonus
    let adjustment = 0;
    
    // TRADING CONTROL: Tracks 5 & 6 are controlled by entanglement patterns in preload.js
    // Skip quantum state control for these tracks - they use volume-based alternating
    if (isTradingTrack) {
      // These tracks are controlled by entanglement patterns, not quantum state
      // Return neutral adjustment to let entanglement patterns handle volume
      adjustment = 0;
    } else {
      // Normal race position logic for non-trading tracks
      // RACE LEADER gets massive priority boost
      if (isRaceLeader) {
        adjustment += 0.6; // Race leader dominates
      }
      
      // Race position affects probability (leaders play more, followers less)
      const positionBonus = (6 - racePosition) * 0.1; // 0.1 to 0.6 bonus
      adjustment += positionBonus;
      
      // Momentum affects play probability
      adjustment += trackMomentum * 0.3;
    }
    
    // Race intensity affects overall density
    const raceIntensityMultiplier = 0.5 + (raceState.raceIntensity * 0.5); // 0.5 to 1.0
    adjustment *= raceIntensityMultiplier;
    
    // Leader always gets priority (constructive interference)
    if (isLeader && beatInBar === 0) {
      adjustment += 0.4; // Leader on downbeats
    }
    
    // Harmonic set creates constructive interference
    if (inHarmonicSet) {
      adjustment += 0.15;
    }
    
    // Rhythmic pairs alternate (destructive interference when paired track should play)
    if (isRhythmicPair) {
      const pairIndex = this.rhythmicPair.indexOf(trackIndex);
      const otherShouldPlay = (barNumber % 2 === (1 - pairIndex));
      
      if (otherShouldPlay) {
        // Destructive interference - back off when pair is playing
        adjustment -= 0.35;
      } else {
        // Constructive - your turn
        adjustment += 0.25;
      }
    }
    
    // Tracks NOT in harmonic set experience destructive interference
    if (!inHarmonicSet && interferenceValue < 0.6) {
      adjustment -= 0.3; // Strong suppression
    }
    
    return {
      quantumValue: interferenceValue,
      adjustment: adjustment,
      interference: interference, // Raw interference value
      inHarmonicSet: inHarmonicSet,
      isRhythmicPair: isRhythmicPair,
      isLeader: isLeader,
      // Race information
      isRaceLeader: isRaceLeader,
      racePosition: racePosition,
      trackMomentum: trackMomentum,
      raceIntensity: raceState.raceIntensity,
      // Trading information
      isTradingTrack: isTradingTrack,
      isTrack5Turn: isTrack5Turn,
      isTrack6Turn: isTrack6Turn,
      tradingPhase: tradingPhase
    };
  }
  
  advanceBar() {
    this.barCount++;
    
    // HORSE RACE: Check if we need to advance to next lap (every 16 beats = 4 bars)
    this.updateRaceState();
    
    // Update transformation system every 16 bars (4 q6s cycles)
    if (this.barCount % 16 === 0) {
      this.updateTransformationSystem();
    }
    
    // Regenerate quantum state every 16 bars
    if (this.barCount % 16 === 0) {
      this.regenerateSeeds();
    }
  }
  
  updateRaceState() {
    const currentBeat = this.barCount * 4; // Convert bars to beats
    const beatsInCurrentLap = currentBeat - this.raceState.lapStartBeat;
    
    // Check if we've completed a lap (16 beats)
    if (beatsInCurrentLap >= this.raceState.lapDuration) {
      this.advanceRaceLap();
    }
  }
  
  advanceRaceLap() {
    // Record the winner of the current lap
    this.raceState.lapLeaders.push(this.raceState.currentLeader);
    
    // Advance to next lap
    this.raceState.currentLap++;
    this.raceState.lapStartBeat = this.barCount * 4;
    
    // Determine new leader for this lap based on race dynamics
    this.raceState.currentLeader = this.determineNewLeader();
    
    // Update race positions based on momentum and quantum factors
    this.updateRacePositions();
    
    // Update race intensity (gets more intense as race progresses)
    this.raceState.raceIntensity = Math.min(1.0, 0.3 + (this.raceState.currentLap / this.raceState.totalLaps) * 0.7);
    
    // Race logging removed for cleaner console output
  }
  
  determineNewLeader() {
    // Race dynamics: early leaders can lose position, new leaders emerge
    const quantum = quantumRandom();
    
    // Different strategies for different laps
    switch (this.raceState.currentLap) {
      case 0: // First lap - anyone can lead
        return Math.floor(quantum * 6);
        
      case 1: // Second lap - momentum matters
        return this.selectLeaderByMomentum();
        
      case 2: // Third lap - dramatic changes possible
        return this.selectLeaderByDrama();
        
      case 3: // Final lap - previous winners have advantage but can still lose
        return this.selectLeaderByHistory();
        
      default:
        return Math.floor(quantum * 6);
    }
  }
  
  selectLeaderByMomentum() {
    // Leader is determined by momentum built up so far
    const maxMomentum = Math.max(...this.raceState.momentum);
    const leaders = this.raceState.momentum.map((m, i) => ({ track: i, momentum: m }))
      .filter(l => l.momentum === maxMomentum);
    
    if (leaders.length === 1) {
      return leaders[0].track;
    }
    
    // Tie-breaker with quantum randomness
    return leaders[Math.floor(quantumRandom() * leaders.length)].track;
  }
  
  selectLeaderByDrama() {
    // Dramatic lap - anything can happen!
    const quantum = quantumRandom();
    
    if (quantum < 0.3) {
      // 30% chance: previous leader keeps position
      return this.raceState.currentLeader;
    } else if (quantum < 0.6) {
      // 30% chance: underdog comes from behind
      return this.selectUnderdog();
    } else {
      // 40% chance: completely new leader
      return Math.floor(quantumRandom() * 6);
    }
  }
  
  selectLeaderByHistory() {
    // Final lap - previous winners have advantage but can still lose
    const quantum = quantumRandom();
    
    if (quantum < 0.4) {
      // 40% chance: previous leader maintains
      return this.raceState.currentLeader;
    } else if (quantum < 0.7) {
      // 30% chance: previous lap winner
      if (this.raceState.lapLeaders.length > 0) {
        return this.raceState.lapLeaders[this.raceState.lapLeaders.length - 1];
      }
    }
    
    // 30% chance: surprise winner
    return Math.floor(quantumRandom() * 6);
  }
  
  selectUnderdog() {
    // Find tracks that haven't led yet
    const allTracks = [0, 1, 2, 3, 4, 5];
    const underdogs = allTracks.filter(track => 
      !this.raceState.lapLeaders.includes(track) && track !== this.raceState.currentLeader
    );
    
    if (underdogs.length > 0) {
      return underdogs[Math.floor(quantumRandom() * underdogs.length)];
    }
    
    // Fallback to any track
    return Math.floor(quantumRandom() * 6);
  }
  
  updateRacePositions() {
    // Shuffle positions based on current leader and momentum
    const positions = [0, 1, 2, 3, 4, 5];
    
    // Current leader gets position 0
    const leader = this.raceState.currentLeader;
    const leaderIndex = positions.indexOf(leader);
    if (leaderIndex > 0) {
      // Move leader to front
      positions.splice(leaderIndex, 1);
      positions.unshift(leader);
    }
    
    // SPECIAL RULE: Tracks 5 and 6 trade every 8 bars
    const currentBar = this.barCount;
    const shouldTrade = (Math.floor(currentBar / 8) % 2) === 1;
    
    if (shouldTrade) {
      // Find tracks 4 and 5 (0-indexed) and swap them
      const track4Index = positions.indexOf(4);
      const track5Index = positions.indexOf(5);
      
      if (track4Index !== -1 && track5Index !== -1) {
        // Swap positions
        [positions[track4Index], positions[track5Index]] = [positions[track5Index], positions[track4Index]];
        // Trading positions logging removed for cleaner console output
      }
    }
    
    // Shuffle remaining positions based on momentum
    const remaining = positions.slice(1);
    remaining.sort((a, b) => this.raceState.momentum[b] - this.raceState.momentum[a]);
    
    this.raceState.racePositions = [leader, ...remaining];
  }
  
  updateTrackMomentum(trackIndex, energy) {
    // Update momentum based on track's energy contribution
    const momentumChange = energy * 0.1;
    this.raceState.momentum[trackIndex] = Math.max(0, 
      Math.min(1.0, this.raceState.momentum[trackIndex] + momentumChange)
    );
  }
  
  getRaceState() {
    return {
      currentLap: this.raceState.currentLap,
      totalLaps: this.raceState.totalLaps,
      currentLeader: this.raceState.currentLeader,
      lapLeaders: [...this.raceState.lapLeaders],
      racePositions: [...this.raceState.racePositions],
      raceIntensity: this.raceState.raceIntensity,
      momentum: [...this.raceState.momentum]
    };
  }
  
  getMicroTiming(beatInBar) {
    // Add swing to off-beats (beats 2 and 4)
    if (beatInBar === 1 || beatInBar === 3) {
      return this.swingAmount * 0.02; // Delay off-beats slightly
    }
    // Add micro-variations
    return this.microTiming[beatInBar] || 0;
  }
  
  voteForPhrase(trackIndex, preferredPhrase, energy) {
    // Each track votes on what the next phrase should be
    this.trackVotes.push({
      track: trackIndex,
      phrase: preferredPhrase,
      energy: energy,
      weight: trackIndex === this.leader ? 2.0 : 1.0 // Leader's vote counts more
    });
  }
  
  getCollectivePhrase() {
    // Use collective intelligence to determine next phrase
    if (this.trackVotes.length < 3) {
      return this.currentPhrase; // Not enough votes yet
    }
    
    // Tally weighted votes
    const phraseCounts = {};
    this.trackVotes.forEach(vote => {
      phraseCounts[vote.phrase] = (phraseCounts[vote.phrase] || 0) + vote.weight;
    });
    
    // Find winner
    let winner = this.currentPhrase;
    let maxVotes = 0;
    
    for (const [phrase, count] of Object.entries(phraseCounts)) {
      if (count > maxVotes) {
        maxVotes = count;
        winner = phrase;
      }
    }
    
    // Collective vote tallied
    
    return winner;
  }
  
  registerSpectralUsage(trackIndex, frequencyRange) {
    // Track which frequencies each track is using
    this.spectralMap.set(trackIndex, frequencyRange);
  }
  
  getSpectralGuidance(trackIndex) {
    // Suggest EQ adjustments to avoid masking
    // If another track is using your frequency range, back off
    const myRange = this.spectralMap.get(trackIndex);
    if (!myRange) return { adjustment: 0 };
    
    let conflicts = 0;
    this.spectralMap.forEach((range, otherTrack) => {
      if (otherTrack !== trackIndex && range === myRange) {
        conflicts++;
      }
    });
    
    return {
      conflicts: conflicts,
      adjustment: conflicts > 0 ? -0.15 : 0 // Duck if frequency conflict
    };
  }
  
  recordCollectiveEnergy(energy, trackIndex = null) {
    this.energyHistory.push(energy);
    if (this.energyHistory.length > 100) {
      this.energyHistory.shift();
    }
    
    // Update global intensity
    const avgEnergy = this.energyHistory.reduce((a, b) => a + b, 0) / this.energyHistory.length;
    this.globalIntensity = avgEnergy;
    
    // HORSE RACE: Update track momentum if track index provided
    if (trackIndex !== null) {
      this.updateTrackMomentum(trackIndex, energy);
    }
  }
  
  setPhrase(phrase) {
    this.currentPhrase = phrase;
  }
  
  findEmergentKey(songIds, getSongById) {
    // Use TensorFlow + quantum voting to find the harmonic center
    if (!songIds || songIds.length === 0) {
      return null; // No change
    }
    
    const songs = songIds.map(id => getSongById(id)).filter(Boolean);
    if (songs.length < 3) {
      return null;
    }
    
    // Get the keys of all selected songs
    const keys = songs.map(s => s.key);
    
    // Calculate harmonic distance matrix using TensorFlow
    const keyTensor = tf.tensor1d(keys);
    
    // Find the key that minimizes total harmonic distance to all songs
    let bestKey = keys[0];
    let minDistance = Infinity;
    
    for (let candidateKey = 1; candidateKey <= 12; candidateKey++) {
      let totalDistance = 0;
      
      for (const songKey of keys) {
        // Calculate circular distance
        let dist = Math.abs(candidateKey - songKey);
        if (dist > 6) {
          dist = 12 - dist; // Shorter path around circle
        }
        totalDistance += dist;
      }
      
      if (totalDistance < minDistance) {
        minDistance = totalDistance;
        bestKey = candidateKey;
      }
    }
    
    keyTensor.dispose();
    
    // Quantum voting: weight by track position in harmonic set
    const keyVotes = {};
    songs.forEach((song, index) => {
      const weight = this.harmonicSet.includes(index) ? 2.0 : 1.0;
      keyVotes[song.key] = (keyVotes[song.key] || 0) + weight;
    });
    
    // Find most voted key
    let votedKey = bestKey;
    let maxVotes = 0;
    for (const [key, votes] of Object.entries(keyVotes)) {
      if (votes > maxVotes) {
        maxVotes = votes;
        votedKey = parseInt(key);
      }
    }
    
    // Combine geometric center and democratic vote with quantum decision
    const useVoted = quantumRandom() < 0.6;
    const emergentKey = useVoted ? votedKey : bestKey;
    
    console.log(`🎹 Emergent Key Analysis:`);
    console.log(`  Keys: [${keys.join(', ')}]`);
    console.log(`  Harmonic center: ${bestKey} (distance: ${minDistance})`);
    console.log(`  Democratic vote: ${votedKey}`);
    console.log(`  ✨ EMERGENT KEY: ${emergentKey}`);
    
    return emergentKey;
  }
  
  updateTransformationSystem() {
    // Advance transformation phase (0-3 cycles)
    this.raceState.transformationPhase = (this.raceState.transformationPhase + 1) % 4;
    
    // Calculate transformation intensity based on phase
    const phase = this.raceState.transformationPhase;
    this.raceState.transformationIntensity = phase / 3; // 0, 0.33, 0.66, 1.0
    
    // Update transformation parameters with gradual changes
    const params = this.raceState.transformationParams;
    
    // Harmonic shift - subtle key changes over time
    params.harmonicShift = Math.sin(phase * Math.PI / 2) * 0.3;
    
    // Rhythmic complexity - increasing density
    params.rhythmicComplexity = phase * 0.25;
    
    // Timbral evolution - subtle filter changes
    params.timbralEvolution = Math.sin(phase * Math.PI / 3) * 0.4;
    
    // Spatial movement - stereo field changes
    params.spatialMovement = Math.cos(phase * Math.PI / 4) * 0.5;
    
    // Frequency modulation - subtle pitch variations
    params.frequencyModulation = phase * 0.15;
    
    // Dynamic range - compression/expansion
    params.dynamicRange = 0.8 + (phase * 0.2);
  }
  
  getTransformationParams() {
    return this.raceState.transformationParams;
  }
  
  getTransformationIntensity() {
    return this.raceState.transformationIntensity;
  }
}

// Singleton - all tracks share the same quantum state
export const quantumState = new QuantumMusicalState();


