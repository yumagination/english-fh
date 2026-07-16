import fs from 'fs';
import path from 'path';
import * as googleTTS from 'google-tts-api';

const texts = {
  lesson1: `My name is Yulia Mashkova. I am a multidisciplinary visual artist and spatial practitioner based in Serbia. My background is in architectural environment design, so I often explore the relationship between body and space, and between human presence and the spirit of place. I am interested in the emotional, ecological, material, and social connections between people and the environments they inhabit. In my practice, I work with humble, everyday materials: paper and cardboard waste, street plants, salt, and personal archives. I choose them because they are close to life. They carry memory, traces of everyday life, and ecological meaning. Transforming discarded everyday materials into sculptures, installations, and temporary environments is both an ecological and ethical choice for me. Many of my works speak about migration, adaptation, memory, fragile habitation and the feeling of home. For me, home is not only a building. It can be a body, a city, a relationship, a state of mind, a memory, or a way of life. It can be anything that gives us a sense of belonging.`,
  lesson2: `Fragile Homes is a public art project about bureaucracy, paper, memory, and belonging. The project starts from a common experience: the tiredness people feel when they deal with documents, forms, permissions, copies, and control. But the project is not only about bureaucracy. It is about transformation. Paper can be a tool of control, but paper also comes from trees. It carries the memory of the forest. In Karlsruhe, we invite local residents to bring papers they no longer need. Together, we tear them, destroy personal data, mix the paper with pulp, and apply it as the final layer onto prepared sculptures. The project transforms paperwork into a shared sculptural skin. It asks whether something connected with pressure and control can become a material of care, connection, and belonging.`
};

async function generate() {
  const audioDir = path.join(process.cwd(), 'public', 'audio');
  if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
  }

  for (const [key, text] of Object.entries(texts)) {
    try {
      console.log(`Generating audio for ${key}...`);
      const results = await googleTTS.getAllAudioBase64(text, {
        lang: 'en',
        slow: true, 
        host: 'https://translate.google.com',
        timeout: 10000,
      });
      
      const filePath = path.join(audioDir, `${key}.mp3`);
      const writeStream = fs.createWriteStream(filePath);
      
      for (const result of results) {
        const buffer = Buffer.from(result.base64, 'base64');
        writeStream.write(buffer);
      }
      
      writeStream.end();
      console.log(`Saved ${filePath}`);
    } catch (err) {
      console.error(`Error generating ${key}:`, err);
    }
  }
}

generate();
