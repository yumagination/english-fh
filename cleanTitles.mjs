import fs from 'fs';
import path from 'path';

async function run() {
  const { lessons } = await import('file://' + path.resolve('src/data.js') + '?t=' + Date.now());

  for (const key of Object.keys(lessons)) {
    let title = lessons[key].title;
    
    // Example old: "10.1 Занятие 10: Award speech — благодарность за dm Award (Основа)"
    // Example old: "1.1 About me (Основа)"

    // Remove "Занятие X: " or "Занятие X. "
    title = title.replace(/Занятие \d+[:.]? /g, '');
    
    // Remove the Russian explanation after "—" but before "(Основа)"
    // Match " — [anything] (" and replace with " ("
    title = title.replace(/ —[^(]+ \(/g, ' (');

    lessons[key].title = title;
  }

  let finalContent = 'export const lessons = ' + JSON.stringify(lessons, null, 2) + ';\n';
  fs.writeFileSync('src/data.js', finalContent, 'utf8');
  console.log('Successfully cleaned up titles in data.js');
}

run();
