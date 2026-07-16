import React, { useState } from 'react';

export function TranslationExercise({ sentences }) {
  const [stage, setStage] = useState(1);
  const [ruTranslations, setRuTranslations] = useState(sentences.map(() => ''));
  const [enTranslations, setEnTranslations] = useState(sentences.map(() => ''));

  if (!sentences || sentences.length === 0) return null;

  const handleRuChange = (index, value) => {
    const newRu = [...ruTranslations];
    newRu[index] = value;
    setRuTranslations(newRu);
  };

  const handleEnChange = (index, value) => {
    const newEn = [...enTranslations];
    newEn[index] = value;
    setEnTranslations(newEn);
  };

  return (
    <div className="flashcard-container translation-exercise" style={{ height: 'auto', minHeight: '300px', cursor: 'default' }}>
      <div className="flashcard" style={{ transform: 'none' }}>
        <div className="flashcard-front" style={{ position: 'relative', height: '100%', alignItems: 'stretch', textAlign: 'left' }}>
          <div className="flashcard-badge" style={{ alignSelf: 'flex-start', marginBottom: '20px' }}>Translation Training</div>
          <p className="subtitle" style={{ color: '#5b6b74', marginBottom: '20px', fontWeight: '500', textAlign: 'center' }}>
        {stage === 1 && "Шаг 1 из 3: Переведите английские фразы на русский."}
        {stage === 2 && "Шаг 2 из 3: Теперь переведите ВАШ русский текст обратно на английский (оригинал скрыт)."}
        {stage === 3 && "Шаг 3 из 3: Сравните свой обратный перевод с оригиналом."}
      </p>

      {stage === 1 && (
        <div className="stage-1">
          {sentences.map((s, i) => (
            <div key={i} className="translation-row" style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #eee' }}>
              <div style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase' }}>English</div>
              <div style={{ fontWeight: '500', marginBottom: '8px' }}>{s.en}</div>
              <textarea
                value={ruTranslations[i]}
                onChange={(e) => handleRuChange(i, e.target.value)}
                placeholder="Ваш перевод на русский..."
                style={{ width: '100%', minHeight: '60px', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', fontFamily: 'inherit' }}
              />
            </div>
          ))}
          <button onClick={() => setStage(2)} style={{ marginTop: '10px' }} className="btn">
            Завершить перевод на русский →
          </button>
        </div>
      )}

      {stage === 2 && (
        <div className="stage-2">
          {ruTranslations.map((ru, i) => (
            <div key={i} className="translation-row" style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #eee' }}>
              <div style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase' }}>Ваш русский перевод</div>
              <div style={{ fontWeight: '500', marginBottom: '8px' }}>{ru || '(нет перевода)'}</div>
              <textarea
                value={enTranslations[i]}
                onChange={(e) => handleEnChange(i, e.target.value)}
                placeholder="Translate this back into English..."
                style={{ width: '100%', minHeight: '60px', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', fontFamily: 'inherit' }}
              />
            </div>
          ))}
          <button onClick={() => setStage(3)} style={{ marginTop: '10px' }} className="btn">
            Завершить обратный перевод →
          </button>
        </div>
      )}

      {stage === 3 && (
        <div className="stage-3">
          {sentences.map((s, i) => (
            <div key={i} className="translation-row" style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
              <div style={{ display: 'flex', gap: '15px', flexDirection: 'column' }}>
                <div style={{ padding: '12px', background: '#f4f6f4', borderRadius: '8px', borderLeft: '3px solid #2f7a5f' }}>
                  <div style={{ fontSize: '0.8rem', color: '#5b6b74', textTransform: 'uppercase', marginBottom: '4px' }}>Original English</div>
                  <div style={{ fontWeight: '500' }}>{s.en}</div>
                </div>
                <div style={{ padding: '12px', background: '#fcfaf2', borderRadius: '8px', borderLeft: '3px solid #a5622f' }}>
                  <div style={{ fontSize: '0.8rem', color: '#5b6b74', textTransform: 'uppercase', marginBottom: '4px' }}>Your back-translation</div>
                  <div style={{ fontWeight: '500' }}>{enTranslations[i] || '(нет перевода)'}</div>
                </div>
              </div>
            </div>
          ))}
          <button onClick={() => { setStage(1); setRuTranslations(sentences.map(()=>'')); setEnTranslations(sentences.map(()=>'')); }} style={{ marginTop: '10px' }} className="btn btn-secondary">
            Начать заново ↺
          </button>
        </div>
      )}
        </div>
      </div>
    </div>
  );
}
