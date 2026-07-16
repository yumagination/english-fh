import React, { useState } from 'react';
import { AudioButton } from './AudioButton';

export function Flashcard({ word, chunk, meaning, example, translation, onRate }) {
  const [flipped, setFlipped] = useState(false);

  const handleRate = (e, rating) => {
    e.stopPropagation(); // prevent flipping back
    if (onRate) onRate(rating);
    setFlipped(false); // auto unflip on rate
  };

  return (
    <div className="flashcard-container" onClick={() => setFlipped(!flipped)}>
      <div className={`flashcard ${flipped ? 'flipped' : ''}`}>
        
        {/* FRONT */}
        <div className="flashcard-front">
          <div className="flashcard-badge">Term</div>
          <div className="flashcard-content">
            <div className="flashcard-word" style={{ color: '#1a4331' }}>{word}</div>
            
            {chunk && (
              <div style={{ backgroundColor: '#e2f0e9', padding: '6px 16px', borderRadius: '20px', marginTop: '16px', fontStyle: 'italic', color: '#1a4331', fontSize: '18px' }}>
                {chunk}
              </div>
            )}
            
            <div onClick={(e) => e.stopPropagation()} style={{ marginTop: '24px' }}>
              <AudioButton text={word} />
            </div>
          </div>
          <div className="flashcard-hint">
            tap to see meaning & examples
          </div>
        </div>

        {/* BACK */}
        <div className="flashcard-back" style={{ justifyContent: 'space-between' }}>
          <div className="flashcard-badge">Meaning & use</div>
          
          <div className="flashcard-content" style={{ flex: 1, padding: '10px 0' }}>
            {meaning && (
              <div style={{ color: '#1a4331', fontWeight: '600', fontSize: '20px', marginBottom: '16px' }}>
                {meaning}
              </div>
            )}
            
            {example && (
              <div style={{ fontStyle: 'italic', color: '#4a5568', fontSize: '16px', marginBottom: '16px', lineHeight: '1.4' }}>
                "{example}"
              </div>
            )}
            
            <div className="flashcard-translation" style={{ fontSize: '16px', color: '#888' }}>
              ({translation})
            </div>
          </div>
          
          {onRate && flipped ? (
            <div className="srs-buttons" onClick={(e) => e.stopPropagation()}>
              <button onClick={(e) => handleRate(e, 'hard')} className="btn srs-btn hard">Тяжело</button>
              <button onClick={(e) => handleRate(e, 'normal')} className="btn srs-btn normal">Нормально</button>
              <button onClick={(e) => handleRate(e, 'easy')} className="btn srs-btn easy">Легко</button>
            </div>
          ) : (
            <div className="flashcard-hint" style={{ marginTop: 'auto' }}>
              tap to flip back
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
