import React, { useState } from 'react';
import { AudioButton } from './AudioButton';

export function Flashcard({ word, translation }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flashcard-container" onClick={() => setFlipped(!flipped)}>
      <div className={`flashcard ${flipped ? 'flipped' : ''}`}>
        <div className="flashcard-front">
          <div className="flashcard-word">{word}</div>
          <AudioButton text={word} />
          <div className="text-secondary mt-4" style={{ fontSize: '12px' }}>Tap to flip</div>
        </div>
        <div className="flashcard-back">
          <div className="flashcard-translation">{translation}</div>
        </div>
      </div>
    </div>
  );
}
