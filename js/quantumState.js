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
    
    // Constructive interference bonus
    let adjustment = 0;
    
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
      isLeader: isLeader
    };
  }
  
  advanceBar() {
    this.barCount++;
    
    // Regenerate quantum state every 16 bars
    if (this.barCount % 16 === 0) {
      this.regenerateSeeds();
    }
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
  
  recordCollectiveEnergy(energy) {
    this.energyHistory.push(energy);
    if (this.energyHistory.length > 100) {
      this.energyHistory.shift();
    }
    
    // Update global intensity
    const avgEnergy = this.energyHistory.reduce((a, b) => a + b, 0) / this.energyHistory.length;
    this.globalIntensity = avgEnergy;
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
}

// Singleton - all tracks share the same quantum state
export const quantumState = new QuantumMusicalState();

