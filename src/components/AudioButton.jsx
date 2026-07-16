import React from 'react';

export const speak = (text, lang = 'en-US') => {
  if (!window.speechSynthesis) {
    alert("К сожалению, ваш браузер не поддерживает озвучку.");
    return;
  }
  window.speechSynthesis.cancel(); // stop any current speech
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  // Slower rate for learning, but not too slow
  utterance.rate = 0.85;
  
  // Try to find a good English voice (preferably British or American female)
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Samantha') || v.name.includes('Daniel') || v.name.includes('Google UK') || v.name.includes('Google US')));
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }
  
  // Speak logic with repetition
  let count = 0;
  const maxRepeats = 2; // user requested 2-3 times, 2 is a good balance
  
  utterance.onend = () => {
    count++;
    if (count < maxRepeats) {
      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 500); // 0.5s pause between repeats
    }
  };

  window.speechSynthesis.speak(utterance);
};

export function AudioButton({ text, lang = 'en-US' }) {
  return (
    <button 
      className="audio-btn" 
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent triggering parent click events like card flip
        speak(text, lang);
      }}
      title="Listen"
      aria-label="Listen to pronunciation"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
      </svg>
    </button>
  );
}
