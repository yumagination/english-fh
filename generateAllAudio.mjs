import fs from 'fs';
import path from 'path';
import * as googleTTS from 'google-tts-api';

async function generate() {
  const { lessons } = await import('file://' + path.resolve('src/data.js') + '?t=' + Date.now());
  const audioDir = path.join(process.cwd(), 'public', 'audio');

  for (const lessonId of ['5.1', '5.2', '6.1', '6.2']) {
    const lesson = lessons[lessonId];
    if (!lesson || !lesson.theory) continue;
    
    const fullText = lesson.theory.join(' ');
    const filename = `lesson${lessonId}.mp3`;
    const filePath = path.join(audioDir, filename);

    try {
      console.log(`Generating audio for ${lessonId}...`);
      const results = await googleTTS.getAllAudioBase64(fullText, {
        lang: 'en',
        slow: true, 
        host: 'https://translate.google.com',
        timeout: 10000,
      });
      
      const writeStream = fs.createWriteStream(filePath);
      for (const result of results) {
        const buffer = Buffer.from(result.base64, 'base64');
        writeStream.write(buffer);
      }
      writeStream.end();
      console.log(`Saved ${filePath}`);
    } catch (err) {
      console.error(`Error generating ${lessonId}:`, err);
    }
  }
}

generate();
