export const SRS_KEY = 'fragile_homes_srs';

// Load SRS data from local storage
export function loadSRSData() {
  try {
    const data = localStorage.getItem(SRS_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error("Could not load SRS data", e);
  }
  return {};
}

// Save SRS data
export function saveSRSData(data) {
  try {
    localStorage.setItem(SRS_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Could not save SRS data", e);
  }
}

// Get cards due today
export function getDueCards(allVocabulary) {
  const data = loadSRSData();
  const now = Date.now();
  const due = [];
  const newCards = [];

  // Iterate over all available vocabulary to find what's due
  allVocabulary.forEach(card => {
    const record = data[card.word];
    if (!record) {
      // New card, never reviewed
      newCards.push(card);
    } else if (record.nextReview <= now) {
      // Card is due for review
      due.push({ ...card, ...record });
    }
  });

  // We can return a mix: e.g., 10 due cards and 5 new cards, 
  // but for simplicity let's just return all due, and if empty, some new ones.
  if (due.length === 0) {
    return newCards.slice(0, 10); // introduce 10 new words if nothing is due
  }
  return due;
}

// Process a review
// rating: 'hard' | 'normal' | 'easy'
export function reviewCard(word, rating) {
  const data = loadSRSData();
  let record = data[word];

  if (!record) {
    record = {
      interval: 0,
      repetition: 0,
      efactor: 2.5,
    };
  }

  if (rating === 'hard') {
    record.repetition = 0;
    record.interval = 1;
    record.efactor = Math.max(1.3, record.efactor - 0.2);
  } else if (rating === 'normal') {
    if (record.repetition === 0) {
      record.interval = 1;
    } else if (record.repetition === 1) {
      record.interval = 6;
    } else {
      record.interval = Math.round(record.interval * record.efactor);
    }
    record.repetition += 1;
  } else if (rating === 'easy') {
    if (record.repetition === 0) {
      record.interval = 1;
    } else if (record.repetition === 1) {
      record.interval = 6;
    } else {
      record.interval = Math.round(record.interval * record.efactor * 1.3);
    }
    record.repetition += 1;
    record.efactor += 0.15;
  }

  // Calculate next review date
  const now = new Date();
  now.setDate(now.getDate() + record.interval);
  record.nextReview = now.getTime();

  data[word] = record;
  saveSRSData(data);
}
