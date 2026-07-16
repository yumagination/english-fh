import fs from 'fs';
import path from 'path';

async function run() {
  const { lessons } = await import('file://' + path.resolve('src/data.js') + '?t=' + Date.now());

  for (const key of Object.keys(lessons)) {
    let title = lessons[key].title;
    
    // Replace " (Основа)" with ""
    title = title.replace(' (Основа)', '');
    
    // Replace " (Детали)" with " +"
    title = title.replace(' (Детали)', ' +');

    lessons[key].title = title;
  }

  let finalContent = 'export const lessons = ' + JSON.stringify(lessons, null, 2) + ';\n';
  fs.writeFileSync('src/data.js', finalContent, 'utf8');
  console.log('Successfully cleaned up titles again in data.js');
}

run();
