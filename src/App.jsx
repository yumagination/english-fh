import React, { useState, useEffect } from 'react';
import { Flashcard } from './components/Flashcard';
import { TheoryBlock } from './components/TheoryBlock';
import { FillInTheBlanks } from './components/FillInTheBlanks';
import { OpenTask } from './components/OpenTask';
import { FullAudioPlayer } from './components/FullAudioPlayer';
import { TranslationExercise } from './components/TranslationExercise';
import { ReviewToday } from './components/ReviewToday';
import { lessons } from './data';

const lessonColors = {
  "1": { bg: '#c2ccd6', accent: '#3e546b' }, // Slate Blue
  "2": { bg: '#c4d1c4', accent: '#426f42' }, // Sage Green
  "3": { bg: '#cec4d1', accent: '#5c436f' }, // Lilac
  "4": { bg: '#d6c3bc', accent: '#784439' }, // Terracotta
  "5": { bg: '#d1ccba', accent: '#74653e' }, // Mustard
  "6": { bg: '#d6c2cb', accent: '#763e58' }, // Dusty Rose
  "7": { bg: '#c2d6cf', accent: '#3e7663' }, // Seafoam
  "8": { bg: '#d1cac4', accent: '#6f5d47' }, // Taupe
  "9": { bg: '#c4c4d1', accent: '#43436f' }, // Indigo
  "10": { bg: '#c2d2d6', accent: '#3e6874' }  // Cadet
};

export default function App() {
  const [currentLessonId, setCurrentLessonId] = useState("1.1");
  const lessonData = lessons[currentLessonId];
  
  const [openTasks, setOpenTasks] = useState({});

  useEffect(() => {
    const baseNum = currentLessonId.split('.')[0];
    const colors = lessonColors[baseNum] || lessonColors["1"];
    document.body.style.backgroundColor = colors.bg;
    document.documentElement.style.setProperty('--bg-primary', colors.bg);
    document.documentElement.style.setProperty('--accent-color', colors.accent);
    // Darken accent slightly for hover
    document.documentElement.style.setProperty('--accent-hover', colors.accent);
  }, [currentLessonId]);

  const handleOpenTaskChange = (id, val) => {
    setOpenTasks(prev => ({ ...prev, [id]: val }));
  };

  const copyToClipboard = () => {
    let textToCopy = `[Проверка Занятия ${currentLessonId}]\n\n`;
    lessonData.openTasks.forEach(t => {
      textToCopy += `Вопрос: ${t.question}\nМой ответ: ${openTasks[t.id] || ''}\n\n`;
    });
    
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Ответы скопированы! Теперь просто вставьте их в чат к ИИ-репетитору.");
    }).catch(() => {
      alert("Не удалось скопировать. Возможно, ваш браузер блокирует это действие.");
    });
  };
  return (
    <div className="app-container">
      <ReviewToday />



      {/* Navigation Menu */}
      <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px', paddingBottom: '8px' }}>
        {Object.values(lessons).map(l => {
          const btnBaseNum = l.id.split('.')[0];
          const btnColor = lessonColors[btnBaseNum] || lessonColors["1"];
          const isSelected = l.id === currentLessonId;

          return (
            <button 
              key={l.id}
              className={`btn ${isSelected ? 'btn-primary' : ''}`}
              style={{ 
                width: 'auto', 
                padding: '10px 16px', 
                fontSize: '14px',
                fontWeight: '600',
                lineHeight: '1.2',
                whiteSpace: 'normal',
                backgroundColor: isSelected ? btnColor.accent : btnColor.bg,
                color: isSelected ? 'white' : btnColor.accent,
                border: `2px solid ${btnColor.accent}`,
                boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.15)' : 'none'
              }}
              onClick={() => {
                setCurrentLessonId(l.id);
                setOpenTasks({}); // Reset tasks on lesson change
              }}
            >
              {l.title}
            </button>
          );
        })}
      </nav>

      <header>
        <p className="text-secondary" style={{ marginBottom: 4 }}>Fragile Homes English</p>
        <h1>{lessonData.title}</h1>
      </header>


      {lessonData.warmup && lessonData.warmup.length > 0 && (
        <>
          <h2>1. Warm-up (Повторение)</h2>
          <p className="text-secondary mb-4">Смахните карточки, чтобы вспомнить слова.</p>
          {lessonData.warmup.map((item, i) => (
            <Flashcard key={`w-${i}`} word={item.word} translation={item.translation} chunk={item.chunk} meaning={item.meaning} example={item.example} />
          ))}
        </>
      )}

      <h2>{lessonData.warmup && lessonData.warmup.length > 0 ? '2' : '1'}. Vocabulary (Новые слова)</h2>
      <p className="text-secondary mb-4">Нажимайте на значок динамика, чтобы послушать медленное произношение.</p>
      {lessonData.vocabulary.map((item, i) => (
        <Flashcard key={`v-${i}`} word={item.word} translation={item.translation} chunk={item.chunk} meaning={item.meaning} example={item.example} />
      ))}

      {/* Full Audio Player for Background Listening */}
      {lessonData.audioFile && (
        <FullAudioPlayer src={lessonData.audioFile} title={lessonData.title} />
      )}

      <h2>{lessonData.warmup && lessonData.warmup.length > 0 ? '3' : '2'}. Theory (Чтение и аудирование)</h2>
      <p className="text-secondary mb-4">Слушайте диктора (значок динамика) и повторяйте вслух с отставанием в 1-2 секунды (shadowing).</p>
      {lessonData.theory.map((text, i) => (
        <TheoryBlock key={`t-${i}`} text={text} />
      ))}

      {lessonData.blanks && lessonData.blanks.length > 0 && (
        <>
          <h2>{lessonData.warmup && lessonData.warmup.length > 0 ? '4' : '3'}. Practice (Тесты)</h2>
          {lessonData.blanks.map((blank, i) => (
            <FillInTheBlanks 
              key={`b-${i}`}
              question={blank.question}
              answer={blank.answer}
            />
          ))}
        </>
      )}

      {lessonData.translationSentences && lessonData.translationSentences.length > 0 && (
        <TranslationExercise sentences={lessonData.translationSentences} />
      )}

      {lessonData.openTasks && lessonData.openTasks.length > 0 && (
        <>
          <h2>{lessonData.warmup && lessonData.warmup.length > 0 ? '5' : '4'}. Open Tasks (На проверку)</h2>
          <p className="text-secondary mb-4">Напишите ответы своими словами. В конце нажмите кнопку "Скопировать ответы" и отправьте их в чат.</p>
          
          {lessonData.openTasks.map(task => (
            <OpenTask 
              key={task.id}
              id={task.id}
              question={task.question}
              value={openTasks[task.id] || ''}
              onChange={handleOpenTaskChange}
            />
          ))}

          <div className="mt-8 text-center">
            <button className="btn btn-primary" onClick={copyToClipboard}>
              Скопировать ответы для проверки
            </button>
            <p className="text-secondary mt-4" style={{ fontSize: '14px' }}>
              После копирования перейдите в чат и вставьте текст.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
