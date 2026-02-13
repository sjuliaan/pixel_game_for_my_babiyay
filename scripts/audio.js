// Sound effects and background music (placeholder URLs - replace with your actual audio files)
const SOUNDS = {
    click: 'assets/sounds/click.mp3',
    equip: 'assets/sounds/equip.mp3',
    collect: 'assets/sounds/collect.mp3',
    battle_start: 'assets/sounds/battle_start.mp3',
    attack: 'assets/sounds/attack.mp3',
    hit: 'assets/sounds/hit.mp3',
    victory: 'assets/sounds/victory.mp3',
    defeat: 'assets/sounds/defeat.mp3',
    walk: 'assets/sounds/footstep.mp3',
    dialogue: 'assets/sounds/dialogue.mp3',
    heal: 'assets/sounds/heal.mp3',
    powerup: 'assets/sounds/powerup.mp3',
    feed: 'assets/music/nom_nom.mp3',
    portal: 'assets/sounds/portal.mp3'
};

const MUSIC = {
    house: 'assets/background-music.mp3',
    world: 'assets/background-music.mp3',
    zootopia: 'assets/background-music.mp3',
    jungle: 'assets/background-music.mp3',
    battle: 'assets/music/battle_theme.mp3',
    boss: 'assets/music/boss_theme.mp3',
    victory: 'assets/music/victory_theme.mp3'
};

class AudioManager {
    constructor() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.sfxVolume = 1.0;  // Max volume for SFX
        this.musicVolume = 0.2; // 20% for background music
        this.currentMusic = null;
        this.musicEnabled = true;
        this.sfxEnabled = true;
        this.loadedSounds = {}; // Still support loaded files if needed
        this.loadedMusic = {};
    }

    // --- PROCEDURAL SOUND GENERATORS ---

    // Typewriter effect for dialogue
    playTypewriter() {
        if (!this.sfxEnabled) return;
        const oscillator = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();

        oscillator.type = 'square';
        // Random pitch for variety
        oscillator.frequency.value = 800 + Math.random() * 200;

        gainNode.gain.setValueAtTime(0.05 * this.sfxVolume, this.ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

        oscillator.connect(gainNode);
        gainNode.connect(this.ctx.destination);

        oscillator.start();
        oscillator.stop(this.ctx.currentTime + 0.05);
    }

    // Cute bark for Chippoy
    playBark() {
        if (!this.sfxEnabled) return;
        const oscillator = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();

        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(600, this.ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.15);

        gainNode.gain.setValueAtTime(0.1 * this.sfxVolume, this.ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

        oscillator.connect(gainNode);
        gainNode.connect(this.ctx.destination);

        oscillator.start();
        oscillator.stop(this.ctx.currentTime + 0.15);
    }

    // Cute hopping sound for Jasmine
    playHop() {
        if (!this.sfxEnabled) return;
        const oscillator = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(400, this.ctx.currentTime);
        oscillator.frequency.linearRampToValueAtTime(800, this.ctx.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0.05 * this.sfxVolume, this.ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.1);

        oscillator.connect(gainNode);
        gainNode.connect(this.ctx.destination);

        oscillator.start();
        oscillator.stop(this.ctx.currentTime + 0.1);
    }

    // Item pickup sound (retro coin/bling style)
    playPickup() {
        if (!this.sfxEnabled) return;
        const oscillator = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();

        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(1200, this.ctx.currentTime);
        oscillator.frequency.setValueAtTime(1600, this.ctx.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0.05 * this.sfxVolume, this.ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

        oscillator.connect(gainNode);
        gainNode.connect(this.ctx.destination);

        oscillator.start();
        oscillator.stop(this.ctx.currentTime + 0.3);
    }

    // Generic fallback for named sounds that don't have specific generators yet
    playSound(name) {
        if (!this.sfxEnabled) return;

        // Route specific names to generators
        if (name === 'dialogue') { this.playTypewriter(); return; }
        if (name === 'bark') { this.playBark(); return; }
        if (name === 'hop') { this.playHop(); return; }
        if (name === 'collect' || name === 'equip') { this.playPickup(); return; }

        // Existing file-based logic as fallback
        try {
            const sound = this.loadedSounds[name];
            if (sound) {
                const clone = sound.cloneNode();
                clone.volume = this.sfxVolume;

                // Force reload if needed for some browsers
                if (clone.readyState === 0) {
                    clone.load();
                }

                clone.play()
                    .then(() => console.log(`Playing sound: ${name}`))
                    .catch(err => {
                        console.log(`Sound play failed for ${name}:`, err);
                        // Fallback: Try direct URL play if clone failed
                        this.playDirect(name);
                    });
            } else {
                console.log(`Sound ${name} not preloaded, trying direct play...`);
                this.playDirect(name);
            }
        } catch (err) {
            console.log('Error playing sound:', err);
            this.playDirect(name);
        }
    }

    // New helper for direct playback
    playDirect(name) {
        if (SOUNDS[name]) {
            const audio = new Audio(SOUNDS[name]);
            audio.volume = this.sfxVolume;
            audio.play().catch(e => console.error(`Direct play failed for ${name}:`, e));
        }
    }

    // Play background music
    playMusic(name) {
        if (!this.musicEnabled) return;

        try {
            const url = MUSIC[name];
            if (!url) return;

            // Stop current music ONLY if different track
            if (this.currentMusic) {
                // Check if already playing this file (handle relative paths)
                const currentSrc = this.currentMusic.src; // Full URL
                if (currentSrc.includes(url) || currentSrc.endsWith(url)) {
                    // Update volume in case it changed
                    if (this.currentMusic) this.currentMusic.volume = this.musicVolume;
                    return;
                }

                this.currentMusic.pause();
                this.currentMusic.currentTime = 0;
            }

            // Create or get music
            if (!this.loadedMusic[name]) {
                const audio = new Audio(url);
                audio.loop = true;
                audio.volume = this.musicVolume;
                audio.preload = 'auto';
                this.loadedMusic[name] = audio;
            }

            this.currentMusic = this.loadedMusic[name];
            this.currentMusic.play().catch(err => console.log('Music play failed:', err));
        } catch (err) {
            console.log('Error playing music:', err);
        }
    }

    // Stop music
    stopMusic() {
        if (this.currentMusic) {
            this.currentMusic.pause();
            this.currentMusic.currentTime = 0;
        }
    }

    // Fade out current music
    fadeOutMusic(duration = 1000) {
        if (!this.currentMusic) return;

        const audio = this.currentMusic;
        const startVolume = audio.volume;
        const step = startVolume / (duration / 50);

        const fadeInterval = setInterval(() => {
            if (audio.volume > step) {
                audio.volume -= step;
            } else {
                audio.volume = 0;
                audio.pause();
                clearInterval(fadeInterval);
            }
        }, 50);
    }

    // Set volumes
    setSFXVolume(volume) {
        this.sfxVolume = Math.max(0, Math.min(1, volume));
        Object.values(this.loadedSounds).forEach(sound => {
            sound.volume = this.sfxVolume;
        });
    }

    setMusicVolume(volume) {
        this.musicVolume = Math.max(0, Math.min(1, volume));
        if (this.currentMusic) {
            this.currentMusic.volume = this.musicVolume;
        }
        Object.values(this.loadedMusic).forEach(music => {
            music.volume = this.musicVolume;
        });
    }

    // Toggle audio
    toggleSFX() {
        this.sfxEnabled = !this.sfxEnabled;
        return this.sfxEnabled;
    }

    toggleMusic() {
        this.musicEnabled = !this.musicEnabled;
        if (!this.musicEnabled && this.currentMusic) {
            this.currentMusic.pause();
        }
        return this.musicEnabled;
    }

    // Initialize - preload all sounds
    init() {
        // Preload sound effects
        Object.entries(SOUNDS).forEach(([name, url]) => {
            this.preloadSound(name, url);
        });
    }
}

// Initialize global audio manager
const audioManager = new AudioManager();

// Export for use in game.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { audioManager, SOUNDS, MUSIC };
}
