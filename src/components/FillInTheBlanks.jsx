import React, { useState } from 'react';

export function FillInTheBlanks({ question, answer, onCorrect }) {
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('idle'); // idle, correct, error
  const [errorCount, setErrorCount] = useState(0);

  const checkAnswer = () => {
    if (value.trim().toLowerCase() === answer.toLowerCase()) {
      setStatus('correct');
      if (onCorrect) onCorrect();
    } else {
      setStatus('error');
      setErrorCount(prev => prev + 1);
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
      {errorCount >= 3 && status !== 'correct' && (
        <div className="mt-4 p-3" style={{ backgroundColor: 'rgba(0, 113, 227, 0.1)', borderRadius: '8px', border: '1px solid var(--accent-color)' }}>
          <strong style={{ color: 'var(--accent-color)' }}>💡 Hint:</strong> Correct answer is <b>{answer}</b>
        </div>
      )}
    </div>
  );
}
