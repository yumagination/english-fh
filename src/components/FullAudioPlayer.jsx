import React from 'react';

export function FullAudioPlayer({ src, title }) {
  if (!src) return null;

  return (
    <div className="card mb-6" style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
      <h3 className="mb-4">🎧 Слушать весь текст целиком</h3>
      <p className="text-secondary mb-4" style={{ fontSize: '14px' }}>
        Вы можете запустить этот плеер и заблокировать экран телефона. Звук продолжит играть в фоне (удобно для наушников).
      </p>
      <audio 
        controls 
        playsInline 
        src={src} 
        title={title}
        style={{ width: '100%', borderRadius: '8px' }}
      >
        Ваш браузер не поддерживает аудио элемент.
      </audio>
    </div>
  );
}
