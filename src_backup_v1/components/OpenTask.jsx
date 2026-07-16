import React from 'react';

export function OpenTask({ id, question, value, onChange }) {
  return (
    <div className="card">
      <h3 className="mb-2">Open Task</h3>
      <p className="mb-4">{question}</p>
      <textarea 
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        placeholder="Type your answer here..."
      />
    </div>
  );
}
