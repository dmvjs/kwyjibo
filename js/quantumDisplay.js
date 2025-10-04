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

      // Laser intensity pulses when active
      if (hasEffect) {
        ion.laserIntensity = 1.0;
      }

      // Trigger ripple effect when ion state changes
      if (wasActive !== isPlaying) {
        console.log(`🌊 Ion ${trackIndex} state changed: ${wasActive} → ${isPlaying}`);
        this.triggerIonRipple(trackIndex);
      }
    }
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

    // Pure black background (high contrast)
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h);

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

    // Draw PROMINENT interference patterns when multiple ions active
    const activeIons = this.ions.filter(i => i.active);

    if (activeIons.length >= 2) {
      // Draw interference fringes between active ions
      for (let i = 0; i < activeIons.length; i++) {
        for (let j = i + 1; j < activeIons.length; j++) {
          const ion1 = activeIons[i];
          const ion2 = activeIons[j];

          // Calculate midpoint
          const midX = (ion1.x + ion2.x) / 2;
          const midY = (ion1.y + ion2.y) / 2;

          // Draw BRIGHT interference pattern (constructive/destructive)
          const wavePhase = this.frame * 0.15;

          // Multiple interference rings
          for (let r = 0; r < 6; r++) {
            const radius = 8 + (wavePhase % 30) + (r * 10);
            const alpha = 0.6 - (wavePhase % 30) / 30 - (r * 0.08);

            if (alpha > 0) {
              // Alternating bright/dim for interference fringes
              const brightness = r % 2 === 0 ? 1.0 : 0.7;
              ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * brightness})`;
              ctx.lineWidth = 2;
              ctx.shadowBlur = 25 * alpha;
              ctx.shadowColor = '#FFF';

              ctx.beginPath();
              ctx.arc(midX, midY, radius, 0, Math.PI * 2);
              ctx.stroke();
            }
          }
          ctx.shadowBlur = 0;

          // Draw connecting line showing wave interaction
          ctx.strokeStyle = `rgba(255, 255, 255, 0.7)`;
          ctx.lineWidth = 2;
          ctx.setLineDash([2, 2]);
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#FFF';
          ctx.beginPath();
          ctx.moveTo(ion1.x, ion1.y);
          ctx.lineTo(ion2.x, ion2.y);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.shadowBlur = 0;
        }
      }
    }

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
      // Position ions in two columns (3 left, 3 right) for cooler cooling connections
      const columnWidth = w * 0.3; // Each column takes 30% of screen width
      const leftColumnX = w * 0.2; // Left column at 20% from left edge
      const rightColumnX = w * 0.8; // Right column at 80% from left edge
      const verticalSpacing = h * 0.15; // Vertical spacing between ions
      const startY = h * 0.25; // Start higher up

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

      // Smooth quantum oscillation with continuous motion
      const tempo = activeTempo || 94; // Get current tempo
      const beatPhase = (time * 0.05) % (60 / tempo * 4); // Very smooth 4-beat cycle
      const isOnBeat = beatPhase < 0.2; // Longer, smoother beat detection

      // Continuous oscillation patterns for smooth motion
      const baseSpeed = ion.active ? 0.12 : 0.05; // Very smooth base speeds
      const speedMultiplier = 1.0 + (isOnBeat ? 0.3 : 0.0); // Gentle speed variation
      const oscillationSpeed = baseSpeed * speedMultiplier;

      // Primary oscillation (tempo-synced)
      const primaryAmp = ion.active ? Math.min(35, w * 0.03) : Math.min(15, w * 0.012);
      const primaryOsc = Math.sin(time * oscillationSpeed + ion.phaseShift) * primaryAmp;

      // Secondary oscillation (counter-rhythm)
      const secondaryAmp = ion.active ? Math.min(20, w * 0.018) : Math.min(8, w * 0.006);
      const secondaryOsc = Math.cos(time * oscillationSpeed * 1.3 + ion.phaseShift + Math.PI/3) * secondaryAmp;

      // Smooth beat-synced pulse (dazzling effect)
      const beatPulse = isOnBeat ? Math.sin(time * 0.2) * 8 : 0;

      // Combine all oscillations for complex dance
      ion.x = baseX + primaryOsc + secondaryOsc * 0.3 + beatPulse;
      ion.y = baseY + Math.cos(time * oscillationSpeed * 0.7 + ion.phaseShift) * (primaryAmp * 0.4) +
              Math.sin(time * oscillationSpeed * 0.9 + ion.phaseShift) * (secondaryAmp * 0.2) + beatPulse * 0.5;

      // Decay laser intensity
      if (ion.laserIntensity > 0) {
        ion.laserIntensity *= 0.92;
      }

      // Update ripple effect
      if (ion.rippleAlpha > 0) {
        ion.rippleRadius += 2; // Ripple grows outward
        ion.rippleAlpha *= 0.95; // Fade out gradually

        // Stop ripple when it fades completely
        if (ion.rippleAlpha < 0.01) {
          ion.rippleAlpha = 0;
          ion.rippleRadius = 0;
        }
      }

      // Draw DRAMATIC BRIGHT laser when being transformed
      if (ion.laser || ion.laserIntensity > 0.1) {
        const intensity = Math.max(ion.laserIntensity, ion.laser ? 1.0 : 0);

        // Multiple laser beams for MAXIMUM intensity
        for (let beam = 0; beam < 5; beam++) {
          const offset = (beam - 2) * 2;
          const alpha = intensity * (1 - beam * 0.15);

          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.lineWidth = 5 - beam;
          ctx.shadowBlur = 40 * intensity;
          ctx.shadowColor = '#FFF';

          // Laser from top with slight variation
          ctx.beginPath();
          ctx.moveTo(ion.x + offset, 0);
          ctx.lineTo(ion.x + offset, ion.y);
          ctx.stroke();
        }

        // BRIGHT impact flash at ion
        ctx.fillStyle = `rgba(255, 255, 255, ${intensity})`;
        ctx.shadowBlur = 50 * intensity;
        ctx.shadowColor = '#FFF';
        ctx.beginPath();
        ctx.arc(ion.x, ion.y, 6 + intensity * 10, 0, Math.PI * 2);
        ctx.fill();

        // Additional glow layer
        ctx.fillStyle = `rgba(255, 255, 255, ${intensity * 0.5})`;
        ctx.shadowBlur = 70 * intensity;
        ctx.beginPath();
        ctx.arc(ion.x, ion.y, 10 + intensity * 15, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
      }

      // Draw ion
      const isLeader = i === leader;
      const inHarmonic = harmonicSet.includes(i);

      // Calculate size for both active and inactive ions
      const size = Math.min(30, 10 + ion.energy * Math.min(40, w * 0.03));

      // Calculate entanglement strength once for both active and inactive ions
      const entanglementStrength = this.calculateEntanglementStrength(i);

      // Get ion's key color from the key chart
      const ionKey = this.getIonKey(i);
      const ionColor = this.getKeyColor(ionKey);

      // Ion orbital shells - 5 shells showing connection strength to other ions
      const shellCount = 5;
      const baseShellSpeed = 0.8; // Much slower for smooth orbital motion
      const shellPhase = (time * baseShellSpeed) % 360; // Full 360 degree cycle

      if (ion.active) {
        // Active ion - TEMPO-SYNCED DAZZLING EFFECTS

        // Beat-synced color changes for dazzling effect
        const isOnBeat = beatPhase < 0.1;
        const colorIntensity = isOnBeat ? 1.0 : 0.8;

        // Use ion's key color with beat-synced intensity
        const baseColor = ionColor;
        const color = isOnBeat ? baseColor : baseColor.replace('1)', '0.8)'); // Dimmer when not on beat

        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = isLeader ? (isOnBeat ? 25 : 15) : (isOnBeat ? 20 : 10);

        // Draw core with tempo-synced rotation
        ctx.save();
        ctx.translate(ion.x, ion.y);

        // Rotate on beats for dazzling effect
        const rotationAngle = isOnBeat ? (time * 0.2) : (time * 0.05);
        ctx.rotate(rotationAngle);

        // Draw rotating core
        ctx.beginPath();
        ctx.arc(0, 0, size, 0, Math.PI * 2);
        ctx.fill();

        // Add rotating inner glow
        if (isOnBeat) {
          ctx.fillStyle = `rgba(255, 255, 255, 0.6)`;
          ctx.beginPath();
          ctx.arc(0, 0, size * 0.6, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();

        // Outer glow layer - reduced to prevent flash
        ctx.shadowBlur = isLeader ? 20 : 15;
        ctx.globalAlpha = 0.4;
        ctx.beginPath();
        ctx.arc(ion.x, ion.y, size + 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;

        ctx.shadowBlur = 0;

        // Moderate energy waves (pulsing outward)
        ctx.strokeStyle = '#FFF';
        ctx.lineWidth = 1;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#FFF';

        // Draw active ion orbital shells with smoky, translucent effect
        for (let r = 0; r < shellCount; r++) {
          const shellDelay = r * 72; // 72 degrees apart for smooth orbital motion
          const shellPhaseOffset = (shellPhase + shellDelay) % 360;
          const shellRadius = size + 8 + (r * 15); // Smaller orbital radii
          const shellAlpha = (entanglementStrength[r] || 0) * 0.15 * (isOnBeat ? 1.2 : 1.0); // Much dimmer

          if (shellAlpha > 0.005) {
            // Get the color of the ion this shell represents (based on entanglement strength)
            // Each shell represents connection to a specific other ion
            const targetIonIndex = r; // Shell r represents connection to ion r
            const targetIonKey = this.getIonKey(targetIonIndex);
            const shellColor = this.getKeyColor(targetIonKey);

            // Create smoky, translucent effect
            ctx.globalAlpha = shellAlpha;
            ctx.lineWidth = 1; // Thinner lines
            ctx.strokeStyle = shellColor;
            ctx.shadowBlur = 15; // More diffuse glow
            ctx.shadowColor = shellColor;

            // Draw multiple overlapping rings for smoky effect
            for (let layer = 0; layer < 3; layer++) {
              const layerAlpha = shellAlpha * (0.6 - layer * 0.2);
              const layerRadius = shellRadius + (layer * 2);
              ctx.globalAlpha = layerAlpha;
              ctx.beginPath();
              ctx.arc(ion.x, ion.y, layerRadius, 0, Math.PI * 2);
              ctx.stroke();
            }
          }
        }
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;

        // Draw state change ripple effect
        if (ion.rippleAlpha > 0) {
          const maxRippleRadius = size + 8 + (4 * 15); // Beyond outermost shell
          const rippleProgress = ion.rippleRadius / maxRippleRadius;
          const rippleOpacity = ion.rippleAlpha * (1 - rippleProgress);

          if (rippleOpacity > 0.01) {
            console.log(`🌊 Drawing ripple for ion ${i}: radius=${ion.rippleRadius}, alpha=${rippleOpacity}, color=${ion.rippleColor}`);
            ctx.globalAlpha = rippleOpacity;
            ctx.strokeStyle = ion.rippleColor;
            ctx.lineWidth = 4; // Thicker for visibility
            ctx.shadowBlur = 20; // More glow
            ctx.shadowColor = ion.rippleColor;
            ctx.beginPath();
            ctx.arc(ion.x, ion.y, ion.rippleRadius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.globalAlpha = 1.0;
            ctx.shadowBlur = 0;
          }
        }

        // Draw ion number right next to active ion core (1-6)
        ctx.fillStyle = '#FFF';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.shadowBlur = 3;
        ctx.shadowColor = '#000';
        ctx.fillText((i + 1).toString(), ion.x + size + 15, ion.y);
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
        ctx.fill();

        // Draw inactive ion ripples (dimmer)
        ctx.strokeStyle = '#FFF';
        ctx.lineWidth = 1;
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#FFF';

        for (let r = 0; r < shellCount; r++) {
          const shellDelay = r * 72; // 72 degrees apart for smooth orbital motion
          const shellPhaseOffset = (shellPhase + shellDelay) % 360;
          const shellRadius = size + 8 + (r * 15); // Smaller orbital radii
          const shellAlpha = (entanglementStrength[r] || 0) * 0.08; // Much dimmer for inactive

          if (shellAlpha > 0.002) {
            // Get the color of the ion this shell represents (based on entanglement strength)
            // Each shell represents connection to a specific other ion
            const targetIonIndex = r; // Shell r represents connection to ion r
            const targetIonKey = this.getIonKey(targetIonIndex);
            const shellColor = this.getKeyColor(targetIonKey);

            // Create very subtle smoky effect for inactive ions
            ctx.globalAlpha = shellAlpha;
            ctx.lineWidth = 0.5; // Very thin lines
            ctx.strokeStyle = shellColor;
            ctx.shadowBlur = 8; // Soft glow
            ctx.shadowColor = shellColor;

            // Draw single subtle ring
            ctx.beginPath();
            ctx.arc(ion.x, ion.y, shellRadius, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;

        // Draw state change ripple effect for inactive ions too
        if (ion.rippleAlpha > 0) {
          const maxRippleRadius = size + 8 + (4 * 15); // Beyond outermost shell
          const rippleProgress = ion.rippleRadius / maxRippleRadius;
          const rippleOpacity = ion.rippleAlpha * (1 - rippleProgress) * 0.8; // Less dim for inactive

          if (rippleOpacity > 0.01) {
            ctx.globalAlpha = rippleOpacity;
            ctx.strokeStyle = ion.rippleColor;
            ctx.lineWidth = 3; // Thicker for visibility
            ctx.shadowBlur = 15; // More glow
            ctx.shadowColor = ion.rippleColor;
            ctx.beginPath();
            ctx.arc(ion.x, ion.y, ion.rippleRadius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.globalAlpha = 1.0;
            ctx.shadowBlur = 0;
          }
        }

        // Draw ion number right next to inactive ion core (1-6)
        ctx.fillStyle = '#999';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.shadowBlur = 2;
        ctx.shadowColor = '#000';
        ctx.fillText((i + 1).toString(), ion.x + 8, ion.y);
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

      // Leader crown
      if (isLeader && ion.active) {
        ctx.fillStyle = '#FFF';
        ctx.font = `${fontSize + 4}px monospace`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#FFF';
        ctx.fillText('★', ion.x, ion.y - size - 15);
        ctx.shadowBlur = 0;
      }
    });

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

