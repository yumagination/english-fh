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

async function run() {
  const { lessons } = await import('file://' + path.resolve('src/data.js') + '?t=' + Date.now());

  // Remove the invitation from Lesson 5
  // We added it with " --- OFFICIAL INVITATION --- " string
  const indexOfInvitation = lessons['5'].theory.findIndex(t => t.includes('OFFICIAL INVITATION'));
  if (indexOfInvitation !== -1) {
    lessons['5'].theory = lessons['5'].theory.slice(0, indexOfInvitation);
  }

  // Add the invitation to Lesson 6 at the beginning
  // Make sure we don't duplicate it if it's already there
  const isAlreadyIn6 = lessons['6'].theory.some(t => t.includes('OFFICIAL INVITATION'));
  if (!isAlreadyIn6) {
    lessons['6'].theory = [
      ...newInvitation,
      " --- ",
      ...lessons['6'].theory
    ];
  }

  let finalContent = 'export const lessons = ' + JSON.stringify(lessons, null, 2) + ';\n';
  fs.writeFileSync('src/data.js', finalContent, 'utf8');
  console.log('Updated data.js with new text in Lesson 6.');

  // Regenerate audio for Lesson 5 and Lesson 6
  const audioDir = path.join(process.cwd(), 'public', 'audio');
  for (const id of ['5', '6']) {
    try {
      console.log(`Generating audio for lesson${id} at normal speed...`);
      // Filter out the separator for TTS
      const textForAudio = lessons[id].theory.filter(t => !t.includes('---')).join(' ');
      
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
    } catch (err) {
      console.error(`Error generating audio for lesson${id}:`, err);
    }
  }
}

run();
