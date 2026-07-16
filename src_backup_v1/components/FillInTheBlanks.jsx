import React, { useState } from 'react';

export function FillInTheBlanks({ question, answer, onCorrect }) {
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('idle'); // idle, correct, error

  const checkAnswer = () => {
    if (value.trim().toLowerCase() === answer.toLowerCase()) {
      setStatus('correct');
      if (onCorrect) onCorrect();
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="card">
      <p className="mb-4">{question}</p>
      <div className="flex gap-4">
        <input 
          type="text" 
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setStatus('idle');
          }}
          className={status === 'correct' ? 'input-success' : status === 'error' ? 'input-error' : ''}
          placeholder="Type missing word..."
        />
        <button className="btn btn-primary" style={{ width: 'auto', padding: '14px 24px' }} onClick={checkAnswer}>
          Check
        </button>
      </div>
      {status === 'correct' && <div className="text-success mt-2">Correct! 🎉</div>}
      {status === 'error' && <div className="text-error mt-2">Try again!</div>}
    </div>
  );
}
