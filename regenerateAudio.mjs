import fs from 'fs';
import path from 'path';
import * as googleTTS from 'google-tts-api';

const newInvitation = [
  "Hello everyone!",
  "I'm Yulia Mashkova a visual artist based in Serbia",
  "And I'm Grisha Mumrikov a multidisciplinary artist and composer based in Germany.",
  "We are happy to introduce our project, Fragile Homes, as a part of the UNESCO City of Media Arts Karlsruhe programme.",
  "Our project explores a universal experience: the feeling of bureaucratic exhaustion caused by increasing administrative control.",
  "And we would like to ask you a question.",
  "What if the papers that once made us feel small could become something that glows, sounds, and carries our collective touch?",
  "From August sixth to August ninth, from twelve noon until eight p.m., we invite you to join our open art workshop at Viktoriastraße 12 in Karlsruhe.",
  "Together, we will transform the unpleasant traces of bureaucracy into the living surface of future public sculptures.",
  "Participation is free.",
  "No registration is required.",
  "You can drop in at any time.",
  "Everyone is welcome.",
  "Please bring old receipts, instruction manuals, forms, letters, copies of applications, or any other papers that you are ready to destroy.",
  "Together, we will tear them, shred them, soak them, and reshape them into papier-mâché, pressing our hands, gestures, and emotions into the material.",
  "All personal data will be shredded, destroyed, and made completely unreadable during the process.",
  "We create sculptural forms, and you are invited to give them a skin — made from paper, gestures, pressure, fatigue, care, and touch.",
  "For us, paper is not only a bureaucratic material.",
  "It is also a memory of trees.",
  "Our project invites ecological empathy and explores fragility as the hidden underside of control.",
  "This workshop asks what kinds of connections we can grow instead of creating new layers of paper.",
  "The completed sculptures will later be installed in the park of the City Museum Karlsruhe as part of the UNESCO City of Media Arts Karlsruhe programme and the SCHLOSSLICHTSPIELE Light Festival.",
  "We would love to see you there.",
  "Thank you!"
];

// Read existing data.js
let dataJsContent = fs.readFileSync('src/data.js', 'utf8');

// The file is a module exporting `lessons`. We can eval it safely or regex it.
// To modify Lesson 5, it's safer to just require it, modify the object, and write it back.
// But wait, it's an ES module or a Node module depending on package.json.
// Wait, we can just use string replacement or rewrite it cleanly.

async function run() {
  const { lessons } = await import('file://' + path.resolve('src/data.js'));

  // Add the invitation to Lesson 5
  lessons['5'].theory = [
    ...lessons['5'].theory,
    " --- OFFICIAL INVITATION --- ",
    ...newInvitation
  ];

  // Write it back
  let finalContent = 'export const lessons = ' + JSON.stringify(lessons, null, 2) + ';\n';
  fs.writeFileSync('src/data.js', finalContent, 'utf8');
  console.log('Updated data.js with new text.');

  // Regenerate all audio with slow: false
  const audioDir = path.join(process.cwd(), 'public', 'audio');
  for (const [id, lesson] of Object.entries(lessons)) {
    try {
      console.log('Generating audio for lesson' + id + ' at normal speed...');
      // Filter out the separator for TTS
      const textForAudio = lesson.theory.filter(t => !t.includes('OFFICIAL INVITATION')).join(' ');
      
      const results = await googleTTS.getAllAudioBase64(textForAudio, {
        lang: 'en',
        slow: false, // Changed from true to false
        host: 'https://translate.google.com',
        timeout: 20000,
      });
      
      const filePath = path.join(audioDir, 'lesson' + id + '.mp3');
      const writeStream = fs.createWriteStream(filePath);
      for (const result of results) {
        const buffer = Buffer.from(result.base64, 'base64');
        writeStream.write(buffer);
      }
      writeStream.end();
      console.log('Saved ' + filePath);
    } catch (err) {
      console.error('Error generating audio for lesson' + id + ':', err);
    }
  }
}

run();
