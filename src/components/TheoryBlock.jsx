import React from 'react';
import { AudioButton } from './AudioButton';

export function TheoryBlock({ title, text }) {
  return (
    <div className="flashcard-container" style={{ height: 'auto', minHeight: '300px', cursor: 'default' }}>
      <div className="flashcard" style={{ transform: 'none' }}>
        <div className="flashcard-front" style={{ position: 'relative', height: '100%' }}>
          <div className="flashcard-badge">Reading & Listening</div>
          <div className="flashcard-content" style={{ marginTop: '20px', marginBottom: '20px' }}>
            <p style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: '18px', fontWeight: '500', color: '#1a202c', lineHeight: '1.5' }}>
              {text}
            </p>
          </div>
          <div style={{ marginTop: 'auto' }}>
            <AudioButton text={text} />
          </div>
        </div>
      </div>
    </div>
  );
}
