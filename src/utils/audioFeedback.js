// Audio feedback utilities
export const playSound = (type = "click") => {
  // Create audio context for sound effects
  if (typeof window !== "undefined" && window.AudioContext) {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();

    const frequencies = {
      click: [800, 1000],
      success: [523, 659, 784], // C, E, G chord
      error: [200, 150],
      hover: [600],
    };

    const freq = frequencies[type] || frequencies.click;

    freq.forEach((frequency, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(
        0.1,
        audioContext.currentTime + 0.01
      );
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.1
      );

      oscillator.start(audioContext.currentTime + index * 0.05);
      oscillator.stop(audioContext.currentTime + 0.1 + index * 0.05);
    });
  }
};

// Haptic feedback for mobile devices
export const vibrate = (pattern = [100]) => {
  if (typeof window !== "undefined" && navigator.vibrate) {
    navigator.vibrate(pattern);
  }
};

// Combined feedback function
export const provideFeedback = (type = "click") => {
  playSound(type);
  vibrate(type === "success" ? [100, 50, 100] : [50]);
};
