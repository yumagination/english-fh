import fs from 'fs';
import path from 'path';

async function run() {
  const { lessons } = await import('file://' + path.resolve('src/data.js') + '?t=' + Date.now());

  const newLessons = {
    "1.1": lessons["1.1"],
    "1.2": lessons["1.2"]
  };

  const keysToSplit = ['2', '3', '4', '5', '6', '7', '8', '9', '10'];

  for (const key of keysToSplit) {
    if (!lessons[key]) continue;
    const l = lessons[key];
    
    // Group theory into chunks of 3 sentences
    const theorySentences = l.theory.filter(Boolean);
    const paragraphs = [];
    for (let i = 0; i < theorySentences.length; i += 3) {
      paragraphs.push(theorySentences.slice(i, i + 3).join(' '));
    }

    const halfPara = Math.ceil(paragraphs.length / 2);
    const theory1 = paragraphs.slice(0, halfPara);
    const theory2 = paragraphs.slice(halfPara);

    const halfVocab = Math.ceil((l.vocabulary || []).length / 2);
    const vocab1 = (l.vocabulary || []).slice(0, halfVocab);
    const vocab2 = (l.vocabulary || []).slice(halfVocab);

    const halfBlanks = Math.ceil((l.blanks || []).length / 2);
    const blanks1 = (l.blanks || []).slice(0, halfBlanks);
    const blanks2 = (l.blanks || []).slice(halfBlanks);

    // Get 2 sentences for translation for each
    const trans1 = theorySentences.slice(0, 2).map(s => ({ en: s, ru: "Перевод: " + s }));
    const trans2 = theorySentences.slice(halfPara * 3, halfPara * 3 + 2).map(s => ({ en: s, ru: "Перевод: " + s }));

    // Extract title (remove "Занятие X. ")
    let rawTitle = l.title;
    if (rawTitle.includes('. ')) {
      rawTitle = rawTitle.split('. ').slice(1).join('. ');
    }

    newLessons[`${key}.1`] = {
      id: `${key}.1`,
      title: `${key}.1 ${rawTitle} (Основа)`,
      audioFile: `/audio/lesson${key}.1.mp3`,
      warmup: l.warmup || [],
      vocabulary: vocab1,
      theory: theory1,
      blanks: blanks1,
      openTasks: l.openTasks || [],
      translationSentences: trans1.length > 0 ? trans1 : undefined
    };

    newLessons[`${key}.2`] = {
      id: `${key}.2`,
      title: `${key}.2 ${rawTitle} (Детали)`,
      audioFile: `/audio/lesson${key}.2.mp3`,
      warmup: [],
      vocabulary: vocab2,
      theory: theory2,
      blanks: blanks2,
      openTasks: [],
      translationSentences: trans2.length > 0 ? trans2 : undefined
    };
  }

  let finalContent = 'export const lessons = ' + JSON.stringify(newLessons, null, 2) + ';\n';
  fs.writeFileSync('src/data.js', finalContent, 'utf8');
  console.log('Successfully restructured lessons 2-10');
}

run();
