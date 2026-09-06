/**
 * Procedural Web Audio API Sound & Background Music Manager
 * Zero external audio assets required - runs reliably in any browser.
 * Provides Clash of Clans style companion dialogue blips, victory fanfares,
 * coin dings, countdown ticks, and medieval village procedural background music.
 */

class AudioManager {
  private ctx: AudioContext | null = null;
  private isMusicPlaying = false;
  private musicInterval: number | null = null;

  public isMusicMuted = false;
  public isSfxMuted = false;
  public musicVolume = 0.3;
  public sfxVolume = 0.5;

  private listeners: (() => void)[] = [];

  constructor() {
    if (typeof window !== "undefined") {
      try {
        const savedMusicMuted = localStorage.getItem("racsr_music_muted");
        const savedSfxMuted = localStorage.getItem("racsr_sfx_muted");
        if (savedMusicMuted !== null) this.isMusicMuted = savedMusicMuted === "true";
        if (savedSfxMuted !== null) this.isSfxMuted = savedSfxMuted === "true";
      } catch (e) {
        // LocalStorage unavailable
      }

      const unlockAudio = () => {
        this.initContext();
        window.removeEventListener("pointerdown", unlockAudio);
        window.removeEventListener("keydown", unlockAudio);
      };
      window.addEventListener("pointerdown", unlockAudio, { passive: true });
      window.addEventListener("keydown", unlockAudio, { passive: true });
    }
  }

  private initContext(): AudioContext | null {
    if (typeof window === "undefined") return null;

    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }

    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }

    return this.ctx;
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  // --- Sound Effects (SFX) ---

  /** Snappy wooden/stone button tap (Clash of Clans UI tap) */
  public playTap() {
    if (this.isSfxMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(420, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.35 * this.sfxVolume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch (e) {
      // Ignore audio synthesis errors
    }
  }

  /** CoC Villager / Animal Crossing procedural cute speech blips */
  public playDialogueBlip(pitchOffset = 0) {
    if (this.isSfxMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const baseFreq = 540 + Math.random() * 180 + pitchOffset;
      osc.type = "sine";
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.85, ctx.currentTime + 0.045);

      gain.gain.setValueAtTime(0.2 * this.sfxVolume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      // Ignore
    }
  }

  /** Companion-specific procedural speech vocalizations (Nova, Raya, Kai) */
  public playCompanionBlip(companionId: "nova" | "raya" | "kai" | string = "nova") {
    if (this.isSfxMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (companionId === "raya") {
        // Raya: Playful swift fox chirp with double-pitch leap (580Hz up to 880Hz)
        osc.type = "triangle";
        osc.frequency.setValueAtTime(580 + Math.random() * 50, now);
        osc.frequency.exponentialRampToValueAtTime(860 + Math.random() * 60, now + 0.035);
        gain.gain.setValueAtTime(0.22 * this.sfxVolume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.048);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (companionId === "kai") {
        // Kai: Deep warm resonant grounding chime (320Hz - 420Hz)
        osc.type = "sine";
        osc.frequency.setValueAtTime(320 + Math.random() * 30, now);
        osc.frequency.linearRampToValueAtTime(380, now + 0.05);
        gain.gain.setValueAtTime(0.25 * this.sfxVolume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.065);
      } else {
        // Nova: High celestial starlight bell / woodwind flute (740Hz - 960Hz)
        osc.type = "sine";
        osc.frequency.setValueAtTime(740 + Math.random() * 60, now);
        osc.frequency.exponentialRampToValueAtTime(940 + Math.random() * 40, now + 0.04);
        gain.gain.setValueAtTime(0.19 * this.sfxVolume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.055);
      }
    } catch (e) {
      // Ignore
    }
  }

  /** Major chord arpeggio chime for correct answer */
  public playSuccessChime() {
    if (this.isSfxMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = ctx.currentTime + idx * 0.07;

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.25 * this.sfxVolume, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.28);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.3);
      });
    } catch (e) {
      // Ignore
    }
  }

  /** Gentle low buzz for incorrect answer */
  public playErrorBuzz() {
    if (this.isSfxMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(160, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.22);

      gain.gain.setValueAtTime(0.18 * this.sfxVolume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.23);
    } catch (e) {
      // Ignore
    }
  }

  /** Crystal high ding for collecting Gold / XP */
  public playCoinDing() {
    if (this.isSfxMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      [987.77, 1318.51].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = ctx.currentTime + idx * 0.06;

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.3 * this.sfxVolume, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.36);
      });
    } catch (e) {
      // Ignore
    }
  }

  /** Triumphant CoC-style victory fanfare */
  public playFanfare() {
    if (this.isSfxMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const fanfareTones = [
        { freq: 392.0, time: 0.0, dur: 0.12 },
        { freq: 523.25, time: 0.14, dur: 0.12 },
        { freq: 659.25, time: 0.28, dur: 0.14 },
        { freq: 783.99, time: 0.44, dur: 0.55 },
        { freq: 1046.5, time: 0.44, dur: 0.55 },
      ];

      fanfareTones.forEach((tone) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = ctx.currentTime + tone.time;

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(tone.freq, startTime);

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1400, startTime);

        gain.gain.setValueAtTime(0.22 * this.sfxVolume, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + tone.dur);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + tone.dur + 0.05);
      });
    } catch (e) {
      // Ignore
    }
  }

  /** Countdown clock tick */
  public playCountdownTick() {
    if (this.isSfxMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.18 * this.sfxVolume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.035);
    } catch (e) {
      // Ignore
    }
  }

  /** Transition whoosh */
  public playWhoosh() {
    if (this.isSfxMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(260, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(750, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.12 * this.sfxVolume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {
      // Ignore
    }
  }

  // --- Procedural 16-Bit Location Background Music (BGM) ---

  private currentTheme = "default";

  private static THEME_CONFIGS: Record<string, { progression: Array<{ bass: number; arps: number[]; lead?: number }>; stepDuration: number }> = {
    default: {
      stepDuration: 550,
      progression: [
        { bass: 130.81, arps: [261.63, 329.63, 392.0, 523.25], lead: 523.25 },
        { bass: 98.0, arps: [196.0, 246.94, 293.66, 392.0], lead: 587.33 },
        { bass: 110.0, arps: [220.0, 261.63, 329.63, 440.0], lead: 659.25 },
        { bass: 87.31, arps: [174.61, 220.0, 261.63, 349.23], lead: 523.25 },
      ],
    },
    "loc-gateway": {
      stepDuration: 600,
      progression: [
        { bass: 130.81, arps: [261.63, 329.63, 392.0, 523.25], lead: 659.25 },
        { bass: 110.0, arps: [220.0, 261.63, 329.63, 440.0], lead: 587.33 },
        { bass: 146.83, arps: [220.0, 293.66, 349.23, 440.0], lead: 523.25 },
        { bass: 98.0, arps: [196.0, 246.94, 293.66, 392.0], lead: 493.88 },
      ],
    },
    "loc-rotaract-harbor": {
      stepDuration: 480,
      progression: [
        { bass: 146.83, arps: [293.66, 369.99, 440.0, 587.33], lead: 587.33 },
        { bass: 98.0, arps: [196.0, 246.94, 293.66, 392.0], lead: 493.88 },
        { bass: 110.0, arps: [220.0, 277.18, 329.63, 440.0], lead: 554.37 },
        { bass: 146.83, arps: [220.0, 293.66, 369.99, 440.0], lead: 587.33 },
      ],
    },
    "loc-regent-keep": {
      stepDuration: 580,
      progression: [
        { bass: 174.61, arps: [261.63, 329.63, 349.23, 440.0], lead: 440.0 },
        { bass: 130.81, arps: [261.63, 329.63, 392.0, 523.25], lead: 523.25 },
        { bass: 146.83, arps: [220.0, 261.63, 293.66, 349.23], lead: 349.23 },
        { bass: 116.54, arps: [233.08, 293.66, 349.23, 466.16], lead: 466.16 },
      ],
    },
    "loc-seven-realms": {
      stepDuration: 520,
      progression: [
        { bass: 82.41, arps: [329.63, 392.0, 493.88, 659.25], lead: 783.99 },
        { bass: 110.0, arps: [277.18, 329.63, 440.0, 554.37], lead: 659.25 },
        { bass: 123.47, arps: [293.66, 369.99, 493.88, 587.33], lead: 739.99 },
        { bass: 82.41, arps: [246.94, 329.63, 392.0, 493.88], lead: 659.25 },
      ],
    },
    "loc-project-forge": {
      stepDuration: 420,
      progression: [
        { bass: 98.0, arps: [196.0, 233.08, 293.66, 392.0], lead: 587.33 },
        { bass: 116.54, arps: [233.08, 293.66, 349.23, 466.16], lead: 698.46 },
        { bass: 130.81, arps: [261.63, 311.13, 392.0, 523.25], lead: 622.25 },
        { bass: 146.83, arps: [220.0, 293.66, 369.99, 440.0], lead: 587.33 },
      ],
    },
    "loc-grand-archive": {
      stepDuration: 640,
      progression: [
        { bass: 110.0, arps: [220.0, 261.63, 329.63, 440.0], lead: 523.25 },
        { bass: 87.31, arps: [174.61, 220.0, 261.63, 349.23], lead: 440.0 },
        { bass: 130.81, arps: [261.63, 329.63, 392.0, 523.25], lead: 493.88 },
        { bass: 82.41, arps: [164.81, 207.65, 246.94, 329.63], lead: 415.3 },
      ],
    },
    "loc-impact-frontier": {
      stepDuration: 460,
      progression: [
        { bass: 116.54, arps: [233.08, 293.66, 349.23, 466.16], lead: 466.16 },
        { bass: 155.56, arps: [233.08, 311.13, 349.23, 466.16], lead: 523.25 },
        { bass: 130.81, arps: [261.63, 311.13, 392.0, 523.25], lead: 587.33 },
        { bass: 174.61, arps: [261.63, 349.23, 392.0, 523.25], lead: 466.16 },
      ],
    },
    "loc-membership-citadel": {
      stepDuration: 520,
      progression: [
        { bass: 130.81, arps: [261.63, 329.63, 392.0, 523.25], lead: 523.25 },
        { bass: 146.83, arps: [293.66, 349.23, 440.0, 587.33], lead: 587.33 },
        { bass: 164.81, arps: [329.63, 392.0, 493.88, 659.25], lead: 659.25 },
        { bass: 174.61, arps: [349.23, 440.0, 523.25, 698.46], lead: 783.99 },
      ],
    },
  };

  /** Resolves theme alias (handles both location IDs and audioTheme names) */
  private resolveThemeKey(themeOrLocId?: string): string {
    if (!themeOrLocId) return "default";
    if (AudioManager.THEME_CONFIGS[themeOrLocId]) return themeOrLocId;
    // Map theme- names to loc-
    if (themeOrLocId.startsWith("theme-")) {
      const locKey = themeOrLocId.replace("theme-", "loc-");
      if (AudioManager.THEME_CONFIGS[locKey]) return locKey;
    }
    return "default";
  }

  /** Starts the background music using the current or requested theme */
  public startMusic(themeId?: string) {
    const targetTheme = this.resolveThemeKey(themeId || this.currentTheme);
    if (this.isMusicPlaying && this.currentTheme === targetTheme) return;

    this.currentTheme = targetTheme;
    const ctx = this.initContext();
    if (!ctx) return;

    if (this.musicInterval !== null) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }

    this.isMusicPlaying = true;
    this.notify();

    const config = AudioManager.THEME_CONFIGS[targetTheme] || AudioManager.THEME_CONFIGS.default;
    const progression = config.progression;
    let step = 0;

    const playMeasure = () => {
      if (!this.isMusicPlaying || this.isMusicMuted) return;
      const currentCtx = this.initContext();
      if (!currentCtx) return;

      const measure = progression[step % progression.length];
      const now = currentCtx.currentTime;

      try {
        const bassOsc = currentCtx.createOscillator();
        const bassGain = currentCtx.createGain();
        bassOsc.type = "triangle";
        bassOsc.frequency.setValueAtTime(measure.bass, now);
        bassGain.gain.setValueAtTime(0.12 * this.musicVolume, now);
        bassGain.gain.linearRampToValueAtTime(0.001, now + (config.stepDuration / 1000) * 0.95);
        bassOsc.connect(bassGain);
        bassGain.connect(currentCtx.destination);
        bassOsc.start(now);
        bassOsc.stop(now + (config.stepDuration / 1000) * 0.98);

        measure.arps.forEach((freq, idx) => {
          const arpOsc = currentCtx.createOscillator();
          const arpGain = currentCtx.createGain();
          const noteTime = now + idx * 0.11;

          arpOsc.type = "sine";
          arpOsc.frequency.setValueAtTime(freq, noteTime);
          arpGain.gain.setValueAtTime(0.08 * this.musicVolume, noteTime);
          arpGain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.2);

          arpOsc.connect(arpGain);
          arpGain.connect(currentCtx.destination);
          arpOsc.start(noteTime);
          arpOsc.stop(noteTime + 0.22);
        });

        if (measure.lead) {
          const leadOsc = currentCtx.createOscillator();
          const leadGain = currentCtx.createGain();
          leadOsc.type = "sine";
          leadOsc.frequency.setValueAtTime(measure.lead, now + 0.08);
          leadOsc.frequency.linearRampToValueAtTime(measure.lead * 1.015, now + 0.35);

          leadGain.gain.setValueAtTime(0.09 * this.musicVolume, now + 0.08);
          leadGain.gain.linearRampToValueAtTime(0.001, now + (config.stepDuration / 1000) * 0.9);

          leadOsc.connect(leadGain);
          leadGain.connect(currentCtx.destination);
          leadOsc.start(now + 0.08);
          leadOsc.stop(now + config.stepDuration / 1000);
        }
      } catch (e) {
        // Ignore synthesis errors
      }

      step++;
    };

    playMeasure();
    this.musicInterval = window.setInterval(playMeasure, config.stepDuration);
  }

  /** Switches or starts background music for a specific location */
  public startLocationTheme(locationIdOrTheme: string) {
    const resolved = this.resolveThemeKey(locationIdOrTheme);
    this.currentTheme = resolved;
    if (this.isMusicPlaying) {
      this.startMusic(resolved);
    }
  }

  public stopMusic() {
    this.isMusicPlaying = false;
    if (this.musicInterval !== null) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
    this.notify();
  }

  public toggleMusic(): boolean {
    if (this.isMusicPlaying) {
      this.stopMusic();
      this.isMusicMuted = true;
    } else {
      this.isMusicMuted = false;
      this.startMusic();
    }
    try {
      localStorage.setItem("racsr_music_muted", String(this.isMusicMuted));
    } catch (e) {}
    this.notify();
    return this.isMusicPlaying;
  }

  public toggleSfx(): boolean {
    this.isSfxMuted = !this.isSfxMuted;
    try {
      localStorage.setItem("racsr_sfx_muted", String(this.isSfxMuted));
    } catch (e) {}
    if (!this.isSfxMuted) {
      this.playTap();
    }
    this.notify();
    return !this.isSfxMuted;
  }

  public setMusicVolume(vol: number) {
    this.musicVolume = Math.max(0, Math.min(1, vol));
    this.notify();
  }

  public setSfxVolume(vol: number) {
    this.sfxVolume = Math.max(0, Math.min(1, vol));
    this.notify();
  }

  public isMusicActive(): boolean {
    return this.isMusicPlaying && !this.isMusicMuted;
  }
}

export const audioManager = new AudioManager();
