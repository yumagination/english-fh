import fs from 'fs';
import path from 'path';
import * as googleTTS from 'google-tts-api';

async function run() {
  const { lessons } = await import('file://' + path.resolve('src/data.js') + '?t=' + Date.now());
  const audioDir = path.join(process.cwd(), 'public', 'audio');
  
  const keys = Object.keys(lessons).filter(k => k !== '1.1' && k !== '1.2');

  for (const id of keys) {
    try {
      if (!lessons[id].theory || lessons[id].theory.length === 0) continue;
      console.log(`Generating audio for lesson ${id}...`);
      const textForAudio = lessons[id].theory.join(' ');
      
      const results = await googleTTS.getAllAudioBase64(textForAudio, {
        lang: 'en',
        slow: false,
        host: 'https://translate.google.com',
        timeout: 20000,
      });
      
      const filePath = path.join(audioDir, `lesson${id}.mp3`);
      const writeStream = fs.createWriteStream(filePath);
      for (const result of results) {
        const buffer = Buffer.from(result.base64, 'base64');
        writeStream.write(buffer);
      }
      writeStream.end();
      console.log('Saved ' + filePath);
      
      // sleep a bit to avoid rate limits
      await new Promise(r => setTimeout(r, 1000));
    } catch (err) {
      console.error(`Error generating audio for lesson${id}:`, err);
    }
  }
}

run();
