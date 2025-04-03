// Sound utility class for managing game sound effects
class SoundManager {
  constructor() {
    this.sounds = {};
    this.muted = false;
  }

  // Preload a sound with a given name and URL
  preload(name, url) {
    this.sounds[name] = new Audio(url);
    return this; // For chaining
  }

  // Play a sound by name
  play(name) {
    if (this.muted || !this.sounds[name]) return;
    
    // Reset sound to beginning (in case it's already playing)
    this.sounds[name].currentTime = 0;
    
    // Create a promise to play the sound
    const playPromise = this.sounds[name].play();
    
    // Handle play promise (some browsers return a promise)
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.error("Sound play error:", error);
      });
    }
  }

  // Toggle mute status
  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  // Set mute status
  setMute(value) {
    this.muted = Boolean(value);
    return this.muted;
  }
}

// Create and export a singleton instance
const soundManager = new SoundManager();

// Pre-load sounds
soundManager
  .preload('victory', '/sounds/victory.mp3')
  .preload('click', '/sounds/click.mp3')
  .preload('draw', '/sounds/draw.mp3');

export default soundManager; 