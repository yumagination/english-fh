import React from 'react';
import { AudioButton } from './AudioButton';

export function TheoryBlock({ title, text }) {
  return (
    <div className="card theory-block">
      <div className="theory-text">
        {title && <h3 className="mb-2">{title}</h3>}
        <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{text}</p>
      </div>
      <div>
        <AudioButton text={text} />
      </div>
    </div>
  );
}
