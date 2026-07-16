import React, { useState } from 'react';
import { Flashcard } from './components/Flashcard';
import { TheoryBlock } from './components/TheoryBlock';
import { FillInTheBlanks } from './components/FillInTheBlanks';
import { OpenTask } from './components/OpenTask';

const lessonData = {
  title: "Занятие 2: Project Core — рассказ о проекте",
  warmup: [
    { word: "migration and adaptation", translation: "миграция и адаптация" },
    { word: "discarded everyday materials", translation: "выброшенные материалы" },
  ],
  vocabulary: [
    { word: "bureaucratic exhaustion", translation: "бюрократическое истощение" },
    { word: "administrative control", translation: "административный контроль" },
    { word: "paperwork", translation: "бумажная бюрократия" },
    { word: "shared sculptural skin", translation: "общая скульптурная кожа" },
    { word: "ecological empathy", translation: "экологическая эмпатия" },
    { word: "ecosystem of belonging", translation: "экосистема принадлежности" }
  ],
  theory: [
    "Fragile Homes is a public art project about bureaucracy, paper, memory, and belonging. The project starts from a common experience: the tiredness people feel when they deal with documents, forms, permissions, copies, and control.",
    "But the project is not only about bureaucracy. It is about transformation. Paper can be a tool of control, but paper also comes from trees. It carries the memory of the forest.",
    "In Karlsruhe, we invite local residents to bring papers they no longer need. Together, we tear them, destroy personal data, mix the paper with pulp, and apply it as the final layer onto prepared sculptures.",
    "The project transforms paperwork into a shared sculptural skin. It asks whether something connected with pressure and control can become a material of care, connection, and belonging."
  ]
};

export default function App() {
  const [openTasks, setOpenTasks] = useState({
    task1: '',
    task2: ''
  });

  const handleOpenTaskChange = (id, val) => {
    setOpenTasks(prev => ({ ...prev, [id]: val }));
  };

  const copyToClipboard = () => {
    const textToCopy = `[Проверка Занятия 2]\n\nВопрос: Why is paper important in Fragile Homes?\nМой ответ: ${openTasks.task1}\n\nВопрос: 3-minute pitch structure\nМой ответ: ${openTasks.task2}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Ответы скопированы! Теперь просто вставьте их в чат к ИИ-репетитору.");
    });
  };

  return (
    <div className="app-container">
      <header>
        <p className="text-secondary" style={{ marginBottom: 4 }}>Fragile Homes English</p>
        <h1>{lessonData.title}</h1>
      </header>

      <h2>1. Warm-up (Повторение)</h2>
      <p className="text-secondary mb-4">Смахните карточки, чтобы вспомнить слова с прошлого урока.</p>
      {lessonData.warmup.map((item, i) => (
        <Flashcard key={`w-${i}`} word={item.word} translation={item.translation} />
      ))}

      <h2>2. Vocabulary (Новые слова)</h2>
      <p className="text-secondary mb-4">Нажимайте на значок динамика, чтобы послушать произношение.</p>
      {lessonData.vocabulary.map((item, i) => (
        <Flashcard key={`v-${i}`} word={item.word} translation={item.translation} />
      ))}

      <h2>3. Theory (Чтение и аудирование)</h2>
      <p className="text-secondary mb-4">Слушайте диктора и повторяйте вслух с отставанием в 1-2 секунды (shadowing).</p>
      {lessonData.theory.map((text, i) => (
        <TheoryBlock key={`t-${i}`} text={text} />
      ))}

      <h2>4. Practice (Тесты)</h2>
      <FillInTheBlanks 
        question="Fragile Homes is a public art project about ________, paper, and belonging."
        answer="bureaucracy"
      />
      <FillInTheBlanks 
        question="Paper can be a tool of control, but it also comes from ________."
        answer="trees"
      />
      <FillInTheBlanks 
        question="During the workshop, residents create the final ________ of the sculptures."
        answer="paper skin"
      />

      <h2>5. Open Tasks (На проверку)</h2>
      <p className="text-secondary mb-4">Напишите ответы своими словами. В конце нажмите кнопку "Скопировать ответы" и отправьте их в чат.</p>
      
      <OpenTask 
        id="task1"
        question="Напишите 4-5 предложений: Why is paper important in Fragile Homes? Используйте слова: stems from, rooted in, emotional load, because."
        value={openTasks.task1}
        onChange={handleOpenTaskChange}
      />

      <OpenTask 
        id="task2"
        question="Кратко расскажите о проекте по схеме: First... The starting point is... During the workshop... Later, the sculptures..."
        value={openTasks.task2}
        onChange={handleOpenTaskChange}
      />

      <div className="mt-8 text-center">
        <button className="btn btn-primary" onClick={copyToClipboard}>
          Скопировать ответы для проверки
        </button>
        <p className="text-secondary mt-4" style={{ fontSize: '14px' }}>
          После копирования перейдите в чат и вставьте текст.
        </p>
      </div>
    </div>
  );
}
