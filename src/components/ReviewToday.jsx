import React, { useState, useEffect } from 'react';
import { getDueCards, reviewCard } from '../srs';
import { Flashcard } from './Flashcard';
import { lessons } from '../data';

export function ReviewToday() {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Gather all vocabulary
    let allVocab = [];
    Object.values(lessons).forEach(l => {
      if (l.vocabulary) {
        allVocab = allVocab.concat(l.vocabulary);
      }
    });
    
    // Deduplicate
    const uniqueVocab = [];
    const seen = new Set();
    for (const v of allVocab) {
      if (!seen.has(v.word)) {
        seen.add(v.word);
        uniqueVocab.push(v);
      }
    }

    const due = getDueCards(uniqueVocab);
    setCards(due);
  }, []);

  const handleRate = (rating) => {
    const currentCard = cards[currentIndex];
    reviewCard(currentCard.word, rating);

    if (currentIndex + 1 < cards.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (cards.length === 0) {
    return null;
  }

  return (
    <div className="card review-today" style={{ border: '2px solid var(--accent-color)' }}>
      <h2>Тренировка на сегодня</h2>
      
      {isFinished ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h3>🎉 Отлично! Вы повторили все карточки на сегодня.</h3>
          <p className="text-secondary">Возвращайтесь завтра, чтобы закрепить материал.</p>
        </div>
      ) : (
        <>
          <p className="text-secondary mb-4">
            Карточка {currentIndex + 1} из {cards.length}. Оцените, насколько легко было вспомнить перевод.
          </p>
          <Flashcard 
            key={cards[currentIndex].word} // force remount on new card so it unflipps
            word={cards[currentIndex].word} 
            chunk={cards[currentIndex].chunk}
            meaning={cards[currentIndex].meaning}
            example={cards[currentIndex].example}
            translation={cards[currentIndex].translation} 
            onRate={handleRate}
          />
        </>
      )}
    </div>
  );
}
