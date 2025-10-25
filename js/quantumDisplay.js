import { quantumState } from './quantumState.js';
import { activeTempo } from './tempo.js';
import { quantumProducer } from './quantumProducer.js';

/**
 * QUANTUM ION TRAP DISPLAY
 * Visualizes 6 tracks as ions in a quantum trap
 * Laser hits when tracks are being transformed
 */
class QuantumDisplay {
  constructor() {
    console.log('🎬 QuantumDisplay constructor called');

    this.canvas = document.getElementById('quantum-display');
    console.log('Canvas element:', this.canvas);

    if (!this.canvas) {
      console.error('❌ No canvas found!');
      return;
    }

    // Set canvas to full viewport
    this.resize();

    this.ctx = this.canvas.getContext('2d');

    // Handle window resize
    window.addEventListener('resize', () => this.resize());

    // Initialize ions after canvas setup
    this.initIons();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    console.log(`📺 Quantum display resized: ${this.width}x${this.height}`);
  }

  initIons() {
    // Track states
    this.ions = Array.from({length: 6}, (_, i) => ({
      index: i,
      x: 0,
      y: 0,
      active: false,
      energy: 0,
      laser: false,
      laserIntensity: 0,
      role: ['KICK', 'SNARE', 'BASS', 'PERC', 'MELODY', 'TEXTURE'][i],
      entangled: i === 4 || i === 5,
      phaseShift: (i / 6) * Math.PI * 2,
      // Ripple effect for state changes
      rippleRadius: 0,
      rippleAlpha: 0,
      rippleColor: null
    }));

    // Animation
    this.frame = 0;
    this.lastQuantumState = null;

    console.log(`🌌 Ions initialized:`, this.ions.map(i => i.role));

    this.start();
  }

  updateIonState(trackIndex, isPlaying, energy = 0, hasEffect = false) {
    if (this.ions[trackIndex]) {
      const ion = this.ions[trackIndex];
      const wasActive = ion.active;

      ion.active = isPlaying;
      ion.energy = energy;
      ion.laser = hasEffect;

      // ENHANCED Laser intensity pulses when active with frequency-based effects
      if (hasEffect) {
        ion.laserIntensity = 1.0;
        
        // Frequency-based excitation effects
        if (energy > 0.5) {
          // High energy - trigger multiple effects
          ion.rippleAlpha = 0.8;
          ion.rippleRadius = 0;
          ion.rippleColor = this.getFrequencyExcitationColor(trackIndex, energy);
        }
      }

      // Trigger ripple effect when ion state changes
      if (wasActive !== isPlaying) {
        this.triggerIonRipple(trackIndex);
      }
    }
  }
  
  getFrequencyExcitationColor(trackIndex, energy) {
    // Color based on track type and energy level
    const trackColors = {
      0: `rgba(255, 107, 107, ${energy})`,      // Kick - Red
      1: `rgba(78, 205, 196, ${energy})`,        // Snare - Teal  
      2: `rgba(69, 183, 209, ${energy})`,        // Bass - Blue
      3: `rgba(150, 206, 180, ${energy})`,       // Perc - Green
      4: `rgba(255, 234, 167, ${energy})`,       // Melody - Yellow
      5: `rgba(221, 160, 221, ${energy})`        // Texture - Purple
    };
    
    return trackColors[trackIndex] || `rgba(255, 255, 255, ${energy})`;
  }

  /**
   * Trigger a ripple effect from an ion when its state changes
   */
  triggerIonRipple(ionIndex) {
    const ion = this.ions[ionIndex];
    const ionKey = this.getIonKey(ionIndex);
    const ionColor = this.getKeyColor(ionKey);

    // Set up ripple effect
    ion.rippleRadius = 0;
    ion.rippleAlpha = 1.0;
    ion.rippleColor = ionColor;

    console.log(`🌊 Triggered ripple for ion ${ionIndex} with color ${ionColor}`);
  }

  /**
   * Test method to manually trigger ripples for all ions
   */
  testRipples() {
    console.log('🌊 Testing ripples for all ions...');
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        console.log(`🌊 Triggering ripple for ion ${i}`);
        this.triggerIonRipple(i);
      }, i * 200); // Stagger ripples
    }
  }

  /**
   * Force trigger a ripple for a specific ion (for testing)
   */
  forceRipple(ionIndex) {
    console.log(`🌊 Force triggering ripple for ion ${ionIndex}`);
    this.triggerIonRipple(ionIndex);
  }

  start() {
    const render = () => {
      this.frame++;
      this.render();
      requestAnimationFrame(render);
    };

    render();
  }

  render() {
    if (!this.ctx || !this.canvas) return;

    // Use time-based animation for smooth motion
    const time = this.frame * 0.016; // ~60fps timing

    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    // BERSERK BACKGROUND - Chaotic energy field
    const chaosIntensity = Math.sin(time * 0.3) * 0.5 + 0.5;
    const chaosHue = (time * 50) % 360;
    
    // Create gradient background with chaotic colors
    const gradient = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, Math.max(w, h));
    gradient.addColorStop(0, `hsla(${chaosHue}, 80%, 5%, 1)`);
    gradient.addColorStop(0.5, `hsla(${(chaosHue + 120) % 360}, 60%, 2%, 1)`);
    gradient.addColorStop(1, '#000');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
    
    // Add chaotic energy particles
    for (let i = 0; i < 20; i++) {
      const particleX = (Math.sin(time * 0.1 + i) * 0.5 + 0.5) * w;
      const particleY = (Math.cos(time * 0.15 + i * 0.7) * 0.5 + 0.5) * h;
      const particleSize = Math.sin(time * 2 + i) * 2 + 3;
      const particleAlpha = Math.sin(time * 3 + i) * 0.3 + 0.1;
      
      ctx.fillStyle = `hsla(${(chaosHue + i * 20) % 360}, 100%, 70%, ${particleAlpha})`;
      ctx.beginPath();
      ctx.arc(particleX, particleY, particleSize, 0, Math.PI * 2);
      ctx.fill();
    }

    // Subtle grid (just center lines)
    ctx.strokeStyle = '#0A0A0A';
    ctx.lineWidth = 1;

    // Horizontal center
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();

    // Vertical center
    ctx.beginPath();
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2, h);
    ctx.stroke();

    // Get quantum state for entanglement visualization
    const harmonicSet = quantumState.harmonicSet || [];
    const rhythmicPair = quantumState.rhythmicPair || [];
    const leader = quantumState.leader;

    // Interference patterns disabled - no more ripples between ions

    // Draw rhythmic pair connections
    if (rhythmicPair.length === 2) {
      const ion1 = this.ions[rhythmicPair[0]];
      const ion2 = this.ions[rhythmicPair[1]];

      if (ion1 && ion2) {
        // Pulsing connection showing call-response
        const pulse = Math.sin(this.frame * 0.1) * 0.5 + 0.5;
        ctx.strokeStyle = `rgba(100, 100, 255, ${pulse * 0.8})`;
        ctx.lineWidth = 3;
        ctx.setLineDash([4, 4]);
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#66F';

        ctx.beginPath();
        ctx.moveTo(ion1.x, ion1.y);
        ctx.lineTo(ion2.x, ion2.y);
        ctx.stroke();

        ctx.setLineDash([]);
        ctx.shadowBlur = 0;
      }
    }

    // Draw each ion in its quantum trap
    // Position ions centered across the screen
    this.ions.forEach((ion, i) => {
      // Position ions to fill the space better - spread them out more
      const columnWidth = w * 0.4; // Each column takes 40% of screen width
      const leftColumnX = w * 0.15; // Left column at 15% from left edge
      const rightColumnX = w * 0.85; // Right column at 85% from left edge
      const verticalSpacing = h * 0.2; // More vertical spacing between ions
      const startY = h * 0.15; // Start higher up to use more space

      // Determine position based on ion index (1-6 display, odds left, evens right)
      let baseX, baseY;
      const displayNumber = i + 1; // Show 1-6 instead of 0-5
      const isOdd = displayNumber % 2 === 1;

      if (isOdd) {
        // Left column (ions 1, 3, 5)
        const leftIndex = Math.floor(displayNumber / 2); // 0, 1, 2 for positions
        baseX = leftColumnX;
        baseY = startY + (leftIndex * verticalSpacing);
      } else {
        // Right column (ions 2, 4, 6)
        const rightIndex = Math.floor((displayNumber - 1) / 2); // 0, 1, 2 for positions
        baseX = rightColumnX;
        baseY = startY + (rightIndex * verticalSpacing);
      }

      // BERSERK QUANTUM OSCILLATION - Chaotic motion
      const tempo = activeTempo || 94; // Get current tempo
      const beatPhase = (time * 0.05) % (60 / tempo * 4); // Very smooth 4-beat cycle
      const isOnBeat = beatPhase < 0.2; // Longer, smoother beat detection

      // CHAOTIC oscillation patterns for berserk motion
      const chaosFactor = Math.sin(time * 0.7 + i * 0.5) * 0.3 + 0.7;
      const baseSpeed = ion.active ? (0.12 * chaosFactor) : (0.05 * chaosFactor);
      const speedMultiplier = 1.0 + (isOnBeat ? 0.8 : 0.0) + Math.sin(time * 2 + i) * 0.2;
      const oscillationSpeed = baseSpeed * speedMultiplier;

      // BERSERK PRIMARY OSCILLATION - Chaotic amplitude
      const chaosAmp = Math.sin(time * 0.4 + i * 0.3) * 0.5 + 0.5;
      const primaryAmp = ion.active ? 
        Math.min(50, w * 0.05 * chaosAmp) : 
        Math.min(25, w * 0.02 * chaosAmp);
      const primaryOsc = Math.sin(time * oscillationSpeed + ion.phaseShift) * primaryAmp;

      // BERSERK SECONDARY OSCILLATION - Multiple chaotic frequencies
      const secondaryAmp = ion.active ? 
        Math.min(30, w * 0.03 * chaosAmp) : 
        Math.min(15, w * 0.015 * chaosAmp);
      const secondaryOsc = Math.cos(time * oscillationSpeed * (1.3 + Math.sin(time * 0.2) * 0.3) + ion.phaseShift + Math.PI/3) * secondaryAmp;

      // BERSERK BEAT PULSE - Chaotic energy bursts
      const beatPulse = isOnBeat ? 
        Math.sin(time * 0.2) * 15 + Math.sin(time * 0.7) * 5 : 
        Math.sin(time * 0.1 + i) * 3;

      // BERSERK COMBINED OSCILLATION - Chaotic dance
      const chaosX = Math.sin(time * 0.3 + i * 0.4) * 10;
      const chaosY = Math.cos(time * 0.25 + i * 0.6) * 8;
      
      ion.x = baseX + primaryOsc + secondaryOsc * 0.3 + beatPulse + chaosX;
      ion.y = baseY + Math.cos(time * oscillationSpeed * 0.7 + ion.phaseShift) * (primaryAmp * 0.4) +
              Math.sin(time * oscillationSpeed * 0.9 + ion.phaseShift) * (secondaryAmp * 0.2) + beatPulse * 0.5 + chaosY;

      // ENHANCED LASER INTENSITY - More dramatic decay
      if (ion.laserIntensity > 0) {
        ion.laserIntensity *= 0.88; // Slower decay for more visible lasers
      }

      // ENHANCED RIPPLE EFFECT - Tempo-synced with natural easing
      if (ion.rippleAlpha > 0) {
        // Get current tempo from quantum state
        const currentTempo = quantumState.tempo || 120;
        const tempoMultiplier = currentTempo / 120; // Normalize to 120 BPM
        
        // Tempo-synced ripple growth with easing
        const easeOut = 1 - Math.pow(1 - (ion.rippleRadius / 100), 3); // Cubic ease-out
        const baseGrowth = 2 * tempoMultiplier; // Scale with tempo
        ion.rippleRadius += baseGrowth * (1 - easeOut * 0.5); // Tempo-synced growth with easing
        
        // Tempo-synced fade with easing
        const fadeEase = Math.pow(ion.rippleRadius / 100, 2); // Quadratic fade
        const fadeRate = 0.95 * (1 / tempoMultiplier); // Slower fade for faster tempo
        ion.rippleAlpha *= fadeRate * (1 - fadeEase * 0.3); // Tempo-synced fade with easing

        // Stop ripple when it fades completely
        if (ion.rippleAlpha < 0.01) {
          ion.rippleAlpha = 0;
          ion.rippleRadius = 0;
        }
      }

      // Draw ENHANCED DRAMATIC laser when being transformed
      if (ion.laser || ion.laserIntensity > 0.1) {
        const intensity = Math.max(ion.laserIntensity, ion.laser ? 1.0 : 0);

        // White laser beams - thin and bright
        for (let beam = 0; beam < 2; beam++) {
          const offset = beam === 0 ? -1 : 1;

          ctx.strokeStyle = '#FFFFFF'; // Pure white
          ctx.lineWidth = 1; // Ultra-thin lasers
          ctx.shadowBlur = 50; // Very bright white glow
          ctx.shadowColor = '#FFFFFF';
          ctx.globalAlpha = 1.0; // Full opacity for maximum brightness

          // Single bright white laser from top
          ctx.beginPath();
          ctx.moveTo(ion.x + offset, 0);
          ctx.lineTo(ion.x + offset, ion.y);
          ctx.stroke();
        }
        
        ctx.globalAlpha = 1.0; // Reset alpha

        // No impact flash - just the outline
      }

      // Draw ion
      const isLeader = i === leader;
      const inHarmonic = harmonicSet.includes(i);

      // LARGER size calculation - ions are the star now
      const chaosSize = Math.sin(time * 0.3 + i * 0.4) * 2 + 2;
      const energyBoost = ion.active ? (ion.energy * 8) : 0;
      const size = Math.min(20, 8 + energyBoost + chaosSize);

      // Calculate entanglement strength once for both active and inactive ions
      const entanglementStrength = this.calculateEntanglementStrength(i);

      // Get ion's key color from the key chart
      const ionKey = this.getIonKey(i);
      const ionColor = this.getKeyColor(ionKey);

      // Ion orbital shells - 5 shells showing connection strength to other ions
      const shellCount = 5;
      const baseShellSpeed = 0.8; // Much slower for smooth orbital motion
      const shellPhase = (time * baseShellSpeed) % 360; // Full 360 degree cycle

      // Tracks 5 and 6 show shells based on their actual audio volume, not quantum state
      let shouldShowEffects = ion.active && ion.energy > 0.1;
      
      // For tracks 5 and 6, show shells even if quantum state says they're not active
      // because they have entanglement patterns that control their actual audio
      if (i === 4 || i === 5) {
        // Check if this track should be playing based on the 8-beat alternating pattern
        const currentBar = quantumState.barCount || 0;
        const tradingPhase = Math.floor(currentBar / 8) % 2;
        const isTrack5Turn = (i === 4 && tradingPhase === 0) || (i === 5 && tradingPhase === 1);
        
        if (isTrack5Turn) {
          // This track should be playing - show effects
          shouldShowEffects = true;
        } else {
          // This track should be silent - don't show effects
          shouldShowEffects = false;
        }
        
      }
      
      // Only show ion effects when there's actual energy/activity
      if (shouldShowEffects) {
        // Active ion - TEMPO-SYNCED DAZZLING EFFECTS

        // ENHANCED Beat-synced color changes for dazzling effect
        const isOnBeat = beatPhase < 0.1;
        const colorIntensity = isOnBeat ? 1.2 : 0.9;
        const chaosColor = Math.sin(time * 0.5 + i * 0.2) * 0.3 + 0.7;

        // ENHANCED Use ion's key color with beat-synced intensity and chaos
        const baseColor = ionColor;
        const enhancedColor = isOnBeat ? 
          baseColor.replace('1)', `${colorIntensity})`) : 
          baseColor.replace('1)', `${colorIntensity * chaosColor})`);
        const color = enhancedColor;

        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = isLeader ? (isOnBeat ? 40 : 25) : (isOnBeat ? 35 : 20);

        // Draw core with tempo-synced rotation
        ctx.save();
        ctx.translate(ion.x, ion.y);

        // Rotate on beats for dazzling effect
        const rotationAngle = isOnBeat ? (time * 0.2) : (time * 0.05);
        ctx.rotate(rotationAngle);

        // Draw just a thin outline instead of filled circle
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.3; // Subtle outline
        ctx.beginPath();
        ctx.arc(0, 0, size, 0, Math.PI * 2);
        ctx.stroke();

        // Add tiny inner dot for beat
        if (isOnBeat) {
          ctx.fillStyle = color;
          ctx.globalAlpha = 0.5;
          ctx.beginPath();
          ctx.arc(0, 0, 1, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.globalAlpha = 1.0; // Reset alpha

        // Draw MAGICAL WIZARD LASER ripples in the translated coordinate system
        if (ion.rippleAlpha > 0) {
          const maxRippleRadius = size + 8 + (4 * 15); // Beyond outermost shell
          const rippleProgress = ion.rippleRadius / maxRippleRadius;
          const rippleOpacity = ion.rippleAlpha * (1 - rippleProgress) * 0.8; // More visible for magic effect

          if (rippleOpacity > 0.01) {
            // MAGICAL WIZARD LASER EFFECT - Multiple layers with different blend modes
            
            // Layer 1: Magical core with multiply blend
            ctx.globalCompositeOperation = 'multiply';
            ctx.globalAlpha = rippleOpacity * 0.6;
            ctx.strokeStyle = ion.rippleColor;
            ctx.lineWidth = 4; // Thicker for wizard effect
            ctx.shadowBlur = 30; // Intense magical glow
            ctx.shadowColor = ion.rippleColor;
            ctx.beginPath();
            ctx.arc(0, 0, ion.rippleRadius, 0, Math.PI * 2);
            ctx.stroke();
            
            // Layer 2: Magical aura with screen blend
            ctx.globalCompositeOperation = 'screen';
            ctx.globalAlpha = rippleOpacity * 0.4;
            ctx.strokeStyle = `hsl(${(time * 100) % 360}, 100%, 80%)`; // Color-shifting magic
            ctx.lineWidth = 2;
            ctx.shadowBlur = 50; // Massive magical aura
            ctx.shadowColor = '#FFF';
            ctx.beginPath();
            ctx.arc(0, 0, ion.rippleRadius * 1.2, 0, Math.PI * 2);
            ctx.stroke();
            
            // Layer 3: Wizard energy with overlay blend
            ctx.globalCompositeOperation = 'overlay';
            ctx.globalAlpha = rippleOpacity * 0.3;
            ctx.strokeStyle = `rgba(255, 255, 255, 0.8)`;
            ctx.lineWidth = 1;
            ctx.shadowBlur = 25;
            ctx.shadowColor = '#FFF';
            ctx.beginPath();
            ctx.arc(0, 0, ion.rippleRadius * 0.8, 0, Math.PI * 2);
            ctx.stroke();
            
            // Reset all effects
            ctx.globalAlpha = 1.0;
            ctx.globalCompositeOperation = 'source-over';
            ctx.shadowBlur = 0;
          }
        }

        ctx.restore();

        // No outer glow layer - just the outline

        ctx.shadowBlur = 0;

        // Moderate energy waves (pulsing outward)
        ctx.strokeStyle = '#FFF';
        ctx.lineWidth = 1;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#FFF';

        // Larger shell reflecting audio levels
        const shellRadius = size + 15;
        const audioLevel = Math.min(1, (ion.energy || 0) * 0.5);
        const shellAlpha = 0.1 + (audioLevel * 0.4);
        const glowIntensity = 15 + (audioLevel * 20);

        if (shellAlpha > 0.01) {
          ctx.globalAlpha = shellAlpha;
          ctx.lineWidth = 1;
          ctx.strokeStyle = ionColor;
          ctx.shadowBlur = glowIntensity;
          ctx.shadowColor = ionColor;
          ctx.beginPath();
          ctx.arc(ion.x, ion.y, shellRadius, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;

        // Ripple effect now drawn inside the translated coordinate system above

        // Draw ion number right next to active ion core (1-6) - larger font
        ctx.fillStyle = '#FFF';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.shadowBlur = 5;
        ctx.shadowColor = '#000';
        ctx.fillText((i + 1).toString(), ion.x + size + 25, ion.y);
        
        // No special indicators for tracks 5 and 6 - just let their shells show their volume
        
        ctx.shadowBlur = 0;

      } else {
        // Inactive ion - use key color but dimmer
        const pulse = Math.sin(time * 0.03 + ion.phaseShift) * 0.3 + 0.7;
        const brightness = isLeader ? 0.6 : inHarmonic ? 0.4 : 0.2;

        // Use ion's key color but dimmer
        const baseColor = ionColor;
        const dimmedColor = baseColor.replace('1)', `${brightness})`);

        ctx.fillStyle = dimmedColor;
        ctx.shadowColor = dimmedColor;
        ctx.shadowBlur = 5;

        ctx.beginPath();
        ctx.arc(ion.x, ion.y, 3, 0, Math.PI * 2);
        ctx.stroke();

        // Larger single ring for inactive ions
        const shellRadius = size + 15;
        const shellAlpha = 0.05;

        ctx.globalAlpha = shellAlpha;
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = ionColor;
        ctx.shadowBlur = 4;
        ctx.shadowColor = ionColor;
        ctx.beginPath();
        ctx.arc(ion.x, ion.y, shellRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;

        // Inactive ions don't have ripples - only active ions do

        // Draw ion number right next to inactive ion core (1-6) - larger font
        ctx.fillStyle = '#999';
        ctx.font = '18px Arial';
        ctx.textAlign = 'center';
        ctx.shadowBlur = 3;
        ctx.shadowColor = '#000';
        ctx.fillText((i + 1).toString(), ion.x + size + 20, ion.y);
        ctx.shadowBlur = 0;
      }

      // Static entanglement (tracks 5 & 6)
      if (ion.entangled && i === 4) {
        const otherIon = this.ions[5];
        const bothActive = ion.active && otherIon.active;
        const oneActive = ion.active || otherIon.active;

        // Animated dashed line
        const dashPhase = (this.frame * 0.5) % 10;
        ctx.setLineDash([4, 4]);
        ctx.lineDashOffset = -dashPhase;

        ctx.strokeStyle = bothActive ? '#F00' : oneActive ? '#FFF' : '#444';
        ctx.lineWidth = oneActive ? 4 : 2;

        if (oneActive) {
          ctx.shadowBlur = 25;
          ctx.shadowColor = '#FFF';
        } else {
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#666';
        }

        ctx.beginPath();
        ctx.moveTo(ion.x, ion.y);
        ctx.lineTo(otherIon.x, otherIon.y);
        ctx.stroke();

        ctx.shadowBlur = 0;
        ctx.setLineDash([]);
      }

      // Old role labels removed - now using ion numbers next to cores

      // ENHANCED Leader crown with multiple stars - only when active with energy
      if (isLeader && ion.active && ion.energy > 0.1) {
        const starCount = 3;
        for (let star = 0; star < starCount; star++) {
          const starOffset = (star - 1) * 8;
          const starSize = star === 1 ? 1.2 : 0.8; // Center star is bigger
          const starAlpha = star === 1 ? 1.0 : 0.7;
          
          ctx.fillStyle = `rgba(255, 255, 255, ${starAlpha})`;
          const fontSize = Math.min(20, w * 0.02) * starSize;
          ctx.font = `${fontSize}px monospace`;
          ctx.shadowBlur = 25;
          ctx.shadowColor = '#FFF';
          ctx.fillText('★', ion.x + starOffset, ion.y - size - 20);
        }
        ctx.shadowBlur = 0;
      }
    });

    // ENHANCED DRAMATIC CONNECTION LINES between ions
    ctx.strokeStyle = `rgba(255, 255, 255, 0.3)`;
    ctx.lineWidth = 2;
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#FFF';
    
    // Draw connections between all active ions
    for (let i = 0; i < this.ions.length; i++) {
      for (let j = i + 1; j < this.ions.length; j++) {
        const ion1 = this.ions[i];
        const ion2 = this.ions[j];
        
        if (ion1.active && ion2.active) {
          // Calculate connection strength based on distance
          const dx = ion2.x - ion1.x;
          const dy = ion2.y - ion1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = Math.max(w, h) * 0.6;
          
          if (distance < maxDistance) {
            const connectionStrength = 1 - (distance / maxDistance);
            const alpha = connectionStrength * 0.5;
            const lineColor = `rgba(255, 255, 255, ${alpha})`;
            
            ctx.strokeStyle = lineColor;
            ctx.beginPath();
            ctx.moveTo(ion1.x, ion1.y);
            ctx.lineTo(ion2.x, ion2.y);
            ctx.stroke();
            
            // Add pulsing effect
            if (Math.sin(time * 2 + i + j) > 0.5) {
              ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.3})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(ion1.x, ion1.y);
              ctx.lineTo(ion2.x, ion2.y);
              ctx.stroke();
            }
          }
        }
      }
    }
    
    ctx.shadowBlur = 0;

    // Status text (scaled)
    const statusFontSize = Math.max(10, Math.min(16, w / 60));
    ctx.font = `bold ${statusFontSize}px monospace`;
    ctx.textAlign = 'left';

    const activeCount = this.ions.filter(i => i.active).length;
    const laserCount = this.ions.filter(i => i.laser || i.laserIntensity > 0.1).length;

    // Top left: Active ions
    ctx.fillStyle = '#EEE';
    ctx.shadowBlur = 8;
    ctx.shadowColor = '#FFF';
    ctx.fillText(`IONS:${activeCount}`, 10, statusFontSize + 10);
    ctx.shadowBlur = 0;

    // Laser indicator (BRIGHT pulsing when firing)
    if (laserCount > 0) {
      const laserPulse = Math.sin(this.frame * 0.3) * 0.4 + 0.6;
      ctx.fillStyle = '#FFF';
      ctx.shadowBlur = 20 * laserPulse;
      ctx.shadowColor = '#FFF';
      ctx.fillText(`⚡×${laserCount}`, 90, statusFontSize + 10);
      ctx.shadowBlur = 0;
    }

    // Top right: Quantum state
    ctx.textAlign = 'right';

    if (activeCount >= 2) {
      ctx.fillStyle = '#FFF';
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#FFF';
      ctx.fillText('INTERFERENCE', w - 10, statusFontSize + 10);
      ctx.shadowBlur = 0;
    } else if (activeCount === 1) {
      ctx.fillStyle = '#DDD';
      ctx.fillText('SOLO', w - 10, statusFontSize + 10);
    } else {
      ctx.fillStyle = '#888';
      ctx.fillText('REST', w - 10, statusFontSize + 10);
    }

    // Bottom indicators (smaller font)
    const labelFontSize = Math.max(9, Math.min(14, w / 70));
    ctx.font = `${labelFontSize}px monospace`;

    // Bottom left: Harmonic set
    if (harmonicSet.length > 0) {
      ctx.textAlign = 'left';
      ctx.fillStyle = '#999';
      ctx.shadowBlur = 5;
      ctx.shadowColor = '#999';
      const harmonicLabels = harmonicSet.map(i => this.ions[i].role.substring(0, 1)).join('');
      ctx.fillText(`HARMONIC:${harmonicLabels}`, 10, h - 10);
      ctx.shadowBlur = 0;
    }

    // Bottom right: Rhythmic pair
    if (rhythmicPair.length === 2) {
      ctx.textAlign = 'right';
      ctx.fillStyle = '#999';
      ctx.shadowBlur = 5;
      ctx.shadowColor = '#999';
      const pairLabels = rhythmicPair.map(i => this.ions[i].role.substring(0, 1)).join('↔');
      ctx.fillText(`RHYTHMIC:${pairLabels}`, w - 10, h - 10);
      ctx.shadowBlur = 0;
    }
  }

  /**
   * Calculate entanglement strength between this ion and the other 5 ions
   * Returns array of 5 strength values (0.0 to 1.0) for each other ion
   */
  calculateEntanglementStrength(ionIndex) {
    const strengths = [];

    for (let otherIndex = 0; otherIndex < 6; otherIndex++) {
      if (otherIndex === ionIndex) continue; // Skip self

      const thisIon = this.ions[ionIndex];
      const otherIon = this.ions[otherIndex];

      // Calculate distance-based entanglement
      const distance = Math.sqrt(
        Math.pow(thisIon.x - otherIon.x, 2) +
        Math.pow(thisIon.y - otherIon.y, 2)
      );

      // Closer ions have stronger entanglement
      const maxDistance = Math.sqrt(Math.pow(this.canvas.width, 2) + Math.pow(this.canvas.height, 2));
      const distanceStrength = Math.max(0, 1 - (distance / (maxDistance * 0.3)));

      // Energy-based entanglement (both ions active = stronger)
      const energyStrength = (thisIon.energy + otherIon.energy) / 2;

      // Quantum state entanglement (if both are in harmonic set)
      const harmonicSet = quantumState.harmonicSet || [];
      const quantumStrength = (harmonicSet.includes(ionIndex) && harmonicSet.includes(otherIndex)) ? 0.8 : 0.2;

      // Combine all factors
      const totalStrength = (distanceStrength * 0.4 + energyStrength * 0.3 + quantumStrength * 0.3);
      strengths.push(Math.min(1.0, totalStrength));
    }

    return strengths;
  }

  /**
   * Get the musical key for a specific ion based on its current track
   */
  getIonKey(ionIndex) {
    // Try to get from quantum state first
    const currentTracks = quantumState.currentTracks || [];
    if (currentTracks[ionIndex] && currentTracks[ionIndex].key) {
      return currentTracks[ionIndex].key;
    }

    // Fallback: use ion index to create variety
    // Each ion gets a different key for visual variety
    const defaultKeys = [1, 3, 5, 7, 9, 11]; // Different keys for each ion
    return defaultKeys[ionIndex] || 1;
  }

  /**
   * Convert musical key number to CSS color from the key chart
   */
  getKeyColor(keyNumber) {
    const keyColors = {
      1: 'rgba(86,241,218,1)',    // Key 1 - Cyan
      2: 'rgba(125,242,170,1)',   // Key 2 - Green
      3: 'rgba(174,245,137,1)',   // Key 3 - Light Green
      4: 'rgba(232,218,161,1)',   // Key 4 - Yellow
      5: 'rgba(253,191,167,1)',   // Key 5 - Orange
      6: 'rgba(253,175,183,1)',   // Key 6 - Pink
      7: 'rgba(253,170,204,1)',   // Key 7 - Magenta
      8: 'rgba(242,171,228,1)',   // Key 8 - Purple
      9: 'rgba(221,180,253,1)',   // Key 9 - Light Purple
      10: 'rgba(190,205,253,1)',  // Key 10 - Light Blue
      11: 'rgba(142,228,249,1)',  // Key 11 - Cyan Blue
      12: 'rgba(85,240,240,1)'    // Key 12 - Turquoise
    };

    return keyColors[keyNumber] || 'rgba(86,241,218,1)'; // Default to key 1 color
  }
}

// Singleton display
let displayInstance = null;

export function initQuantumDisplay() {
  if (!displayInstance) {
    displayInstance = new QuantumDisplay();
  }
  return displayInstance;
}

// Test function to trigger ripples manually
export function testRipples() {
  if (displayInstance) {
    displayInstance.testRipples();
  }
}

// Force trigger a ripple for a specific ion
export function forceRipple(ionIndex) {
  if (displayInstance) {
    displayInstance.forceRipple(ionIndex);
  }
}

export function updateIonState(trackIndex, isPlaying, energy = 0, hasEffect = false) {
  if (displayInstance) {
    displayInstance.updateIonState(trackIndex, isPlaying, energy, hasEffect);
  }
}

// Make display functions globally available for frequency excitation
window.updateIonState = updateIonState;
window.triggerIonRipple = (trackIndex) => {
  if (displayInstance) {
    displayInstance.triggerIonRipple(trackIndex);
  }
};

