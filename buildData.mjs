import fs from 'fs';
import path from 'path';
import * as googleTTS from 'google-tts-api';

const newLessons = {
  3: {
    id: 3,
    title: "Занятие 3: The sculptures — форма, материал, место",
    text: "The sculptures are prepared before and during the workshop process. Their shape is not realistic. They look like distorted, melted human figures. They are slightly bent, as if they are carrying an invisible weight. The lower part is long and heavy, almost like a coat that reaches the ground. The forms can also remind us of flattened bells with a head, or of a bowed Madonna-like figure in old clothes. During the workshop, residents help us create the final surface. They apply paper pulp and torn documents collected in Karlsruhe or brought by themselves. In this way, the city becomes part of the sculpture. The final group will include three responsive sculptures with light and sound, and one or two ruined paper bodies without electronics. These silent ruins are also important. They show fragility, incompleteness, and the traces of transformation. After the paper surface dries, we will seal it with several layers of polyurethane boat varnish to protect it from rain.",
    vocabulary: [
      { word: "distorted human figure", translation: "искажённая человеческая фигура" },
      { word: "melted shape", translation: "оплывшая форма" },
      { word: "stooped body", translation: "ссутуленное тело" },
      { word: "ruined form", translation: "руинированная форма" },
      { word: "polyurethane boat varnish", translation: "полиуретановый лодочный лак" }
    ],
    blanks: [
      { question: "The sculptures look like ________ human figures.", answer: "stooped" },
      { question: "During the workshop, new conversations can ________.", answer: "sprout up" },
      { question: "Visitors can gently ________ the sculptures.", answer: "touch" }
    ],
    openTasks: [
      { id: "task3_1", question: "Опиши скульптуру в 5 предложениях (looks like, reminds me of, surface is made from...)" }
    ]
  },
  4: {
    id: 4,
    title: "Занятие 4: Technical explanation — простая техника для прессы",
    text: "The technical part is hidden inside the sculptures. For the visitor, the experience is very simple. When a person comes closer, a sensor activates soft light and a quiet local soundscape. The system is low-voltage and autonomous. The sound is not loud. It is designed for close listening in public space, not for a concert situation. The light also appears gradually. It does not flash suddenly. It slowly fades in and fades out, so the sculpture feels almost alive, as if it is breathing or waking up. The interaction is based on proximity, not on touch. People can touch the sculptures gently, but the sound and light are activated by approaching the object. For me, the technology should not dominate the work. It should support a poetic experience: a quiet meeting between the visitor, the sculpture, the city, and the material memory of paper.",
    vocabulary: [
      { word: "low-voltage electronics", translation: "низковольтная электроника" },
      { word: "proximity", translation: "приближение" },
      { word: "quiet local soundscape", translation: "тихий локальный звуковой ландшафт" },
      { word: "fade in / fade out", translation: "плавное появление / затухание" }
    ],
    blanks: [
      { question: "The interaction is based on ________, not touch.", answer: "proximity" },
      { question: "When a visitor comes closer, sensors ________ soft light and sound.", answer: "activate" },
      { question: "The installation may be ________ if there is heavy rain.", answer: "put on hold" }
    ],
    openTasks: [
      { id: "task4_1", question: "How does the sculpture react to visitors? Is it based on touch?" }
    ]
  },
  5: {
    id: 5,
    title: "Занятие 5: Workshop opening — начало воркшопа",
    text: "Hello, welcome to V12. My name is Yulia, and I am one of the artists of Fragile Homes. We are working here on a group of public sculptures that will later be installed in the park of the City Museum Karlsruhe. You are very welcome to join the process. You do not need any artistic experience. You can stay for a short time or for several hours. We will show you what to do step by step. Today we work with paper, paper pulp, and documents that people are ready to destroy. We tear the paper, make the text unreadable, mix it with pulp, and apply it as the final skin of the sculptures. This is not about making a perfect surface. It is about gestures, pressure, texture, and shared work. Your hands and your paper will become part of the artwork. If you have any questions, please ask me, Grisha, or one of the volunteers.",
    vocabulary: [
      { word: "shared process", translation: "совместный процесс" },
      { word: "unreadable", translation: "нечитаемый" },
      { word: "supportive community", translation: "поддерживающее сообщество" }
    ],
    blanks: [
      { question: "We are very happy you are here and ________.", answer: "up for it" },
      { question: "In a new place, people can ________ from others.", answer: "feel separate" },
      { question: "Through shared work, new connections can ________.", answer: "sprout up" }
    ],
    openTasks: [
      { id: "task5_1", question: "Напиши welcome speech на 100 слов." }
    ]
  },
  6: {
    id: 6,
    title: "Занятие 6: Workshop instructions",
    text: "First, please choose some paper. It can be a receipt, a form, a letter, a copy, an old instruction, or any document you are ready to destroy. Please do not use documents you still need. Now tear the paper into small pieces. If there is personal data, we make sure it becomes unreadable. Then we soak the paper and mix it with paper pulp. Take a small amount of pulp and press it gently onto the sculpture. You can use your fingers, a brush, or a small tool. Please do not worry about making it perfect. We need texture, pressure, and traces of hands. This layer is the collective skin of the sculpture. It is made from paper, gestures, fatigue, care, and touch.",
    vocabulary: [
      { word: "to tear", translation: "рвать" },
      { word: "to shred", translation: "измельчать" },
      { word: "to soak", translation: "замачивать" },
      { word: "to squeeze", translation: "отжимать" },
      { word: "to smooth", translation: "разглаживать" }
    ],
    blanks: [
      { question: "Please use gloves ________ the material is wet.", answer: "because" },
      { question: "The reason ________ we shred the paper is privacy.", answer: "why" }
    ],
    openTasks: [
      { id: "task6_1", question: "Напиши инструкцию из 8 предложений (How to create the final paper skin)." }
    ]
  },
  7: {
    id: 7,
    title: "Занятие 7: Press interview — ответы для прессы",
    text: "For me, Fragile Homes is not only an artwork, but also a situation of shared transformation. We take papers that often make people feel small: receipts, forms, applications, copies, and letters. These papers usually belong to systems of control and confirmation. During the workshop, we destroy their readable function. Personal data becomes unreadable. The paper loses its administrative power and becomes material again: wet, soft, tactile, open to transformation. Residents of Karlsruhe help us apply this material onto the sculptures. Their hands, pressure, and gestures become part of the final paper skin. This is very important, because the city enters the artwork through real participation, not only through representation. Later, the sculptures will stand in the park of the City Museum Karlsruhe. Three of them will respond to visitors with soft light and quiet sound when people come closer. One or two forms will remain silent, like ruins or traces. For me, the project asks a simple but important question: can the papers that usually control us become a shared surface of care and belonging?",
    vocabulary: [
      { word: "transformation", translation: "трансформация" },
      { word: "administrative power", translation: "административная власть" },
      { word: "co-authors", translation: "соавторы" }
    ],
    blanks: [
      { question: "The project ________ migration and paperwork.", answer: "stems from" },
      { question: "Paper carries an ________.", answer: "emotional load" },
      { question: "People can feel ________ the system.", answer: "excluded from" }
    ],
    openTasks: [
      { id: "task7_1", question: "Ответь письменно на вопрос: Is the project political?" }
    ]
  },
  8: {
    id: 8,
    title: "Занятие 8: Full rehearsal — полный прогон",
    text: "Hello, my name is Yulia Mashkova, and I work as Yu-Ma. I am a multidisciplinary artist and spatial practitioner based in Serbia. My background is in architectural environment design, and my artistic practice explores fragile habitation, migration, memory, and the relationship between body and place. Together with Grisha Mumrikov, I am creating Fragile Homes, a site-specific public art project in Karlsruhe. The project connects sculpture, sound, light, and a participatory workshop with local residents. The starting point of the project is bureaucratic exhaustion — the tiredness many people feel when they deal with documents, forms, permissions, copies, and administrative control. But the project is not only about bureaucracy. It is about transformation. Paper can be a tool of control, but paper also comes from trees. It carries the memory of the forest. At V12, on Viktoriastraße 12, we are working on the sculptures and inviting residents to join us. People can bring documents they no longer need: receipts, letters, forms, copies, or old instructions. Together, we tear them, destroy personal data, mix the paper with pulp, and apply it as the final skin of the sculptures. The sculptural forms look like distorted, melted human figures. They are slightly bent, almost like people in long coats. They can also remind us of flattened bells with a head, or bowed Madonna-like figures in old clothes. Later, the sculptures will be installed in the park of the City Museum Karlsruhe. The final group will include three responsive light-and-sound sculptures and one or two ruined silent forms without electronics. When visitors come closer, the responsive sculptures activate soft light and a quiet local soundscape. People can touch them gently, but the interaction works through proximity, not through touch. After the workshop and drying process, we will protect the paper surface with several layers of polyurethane boat varnish, so the sculptures can stand outdoors. For me, Fragile Homes asks whether the papers that usually control us can become something else: a shared skin, a collective memory, and a fragile image of belonging.",
    vocabulary: [
      { word: "participatory", translation: "партиципаторный / с участием зрителей" },
      { word: "collective surface", translation: "коллективная поверхность" },
      { word: "bureaucratic exhaustion", translation: "бюрократическое истощение" }
    ],
    blanks: [],
    openTasks: [
      { id: "task8_1", question: "Who are you? What is Fragile Homes? (Self-introduction)" }
    ]
  },
  9: {
    id: 9,
    title: "Занятие 9: Philosophical background / Ecosystems / Video metaphors",
    text: "Fragile Homes is not only about bureaucracy. It is also about ecosystems of connection. We think about ecology broadly — as a network of relations between people, documents, institutions, trees, memory, and place. Paper is central for us because it belongs to bureaucracy, but it also comes from trees. So it connects human systems and living ecosystems. In the video, we use metaphorical images — text-clouds, root-like or mycelial networks, lichen-covered human silhouettes, and a breathing ocean of leaves with blurred names of people and trees. These images help us think about fragility not only as weakness, but as openness, relation, and belonging.",
    vocabulary: [
      { word: "ecosystem", translation: "экосистема" },
      { word: "interdependence", translation: "взаимозависимость" },
      { word: "entanglement", translation: "переплетённость" },
      { word: "mycelium", translation: "мицелий" },
      { word: "blurred names", translation: "размытые имена" }
    ],
    blanks: [
      { question: "Fragile Homes is not only about bureaucracy. It is also a reflection on ecosystems of ________.", answer: "interdependence" },
      { question: "The moving leaf-surface feels almost like a breathing ________.", answer: "ocean" },
      { question: "Fragility is not only weakness, but also ________.", answer: "openness" }
    ],
    openTasks: [
      { id: "task9_1", question: "What do ecosystems mean in Fragile Homes? (120-150 words)" }
    ]
  },
  10: {
    id: 10,
    title: "Занятие 10: Award speech — благодарность за dm Award",
    text: "Thank you very much for the dm Award. We are deeply grateful to the jury, the festival team, the organizers, the workshop participants, and everyone who supported Fragile Homes. This recognition means a lot to us. As artists with migrant experience, it is especially meaningful for us to be part of the European art field — not only as guests, but as active participants. We are still learning the spoken languages of the places where we live and work. But art gives us another language: the language of images, metaphors, materials, sound, light, and shared gestures. This language allows us to speak even when our words are not yet perfect. It allows us to meet people through attention, feeling, and resonance. For us, one of the most precious gifts of this project has been the possibility to feel connected with the local community. Instead of feeling separate or isolated, we felt a shared mental space, support, and trust. Having grown up in Russia, we were prepared for criticism, corrections, and control. But instead, we received openness and support from the organizing team. This trust is a very precious gift for us. Thank you for believing in us, for supporting Fragile Homes, and for helping this project take root here in Karlsruhe.",
    vocabulary: [
      { word: "award", translation: "премия" },
      { word: "recognition", translation: "признание" },
      { word: "to be deeply grateful", translation: "быть глубоко благодарными" },
      { word: "resonance", translation: "резонанс" },
      { word: "precious gift", translation: "драгоценный дар" },
      { word: "take root", translation: "укорениться" }
    ],
    blanks: [
      { question: "We are deeply ________ to the jury and the festival team.", answer: "grateful" },
      { question: "As artists with ________ experience, this award means a lot to us.", answer: "migrant" },
      { question: "Art gives us another ________.", answer: "language" },
      { question: "Thank you for helping Fragile Homes ________ here in Karlsruhe.", answer: "take root" }
    ],
    openTasks: [
      { id: "task10_1", question: "Напиши свою благодарность (100–130 слов)." }
    ]
  }
};

async function build() {
  const audioDir = path.join(process.cwd(), 'public', 'audio');
  if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
  }

  const dataJsPath = path.join(process.cwd(), 'src', 'data.js');
  let dataJsContent = fs.readFileSync(dataJsPath, 'utf8');

  // Generate MP3s
  for (const [id, lesson] of Object.entries(newLessons)) {
    try {
      console.log('Generating audio for lesson' + id + '...');
      const results = await googleTTS.getAllAudioBase64(lesson.text, {
        lang: 'en',
        slow: true,
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

  // Update data.js
  let lines = dataJsContent.split('\\n');
  let lastBracketIndex = lines.length - 1;
  while(lastBracketIndex >= 0 && !lines[lastBracketIndex].includes('};')) {
    lastBracketIndex--;
  }
  
  if (lastBracketIndex >= 0) {
    let before = lines.slice(0, lastBracketIndex).join('\\n');
    let toAppend = '';
    
    if (!before.trim().endsWith(',')) {
      before += ',\\n';
    }
    
    for (const [id, lesson] of Object.entries(newLessons)) {
      const theoryArray = lesson.text.match(/[^.!?]+[.!?]+/g) || [lesson.text];
      
      toAppend += '  ' + id + ': {\\n';
      toAppend += '    id: ' + id + ',\\n';
      toAppend += '    title: "' + lesson.title + '",\\n';
      toAppend += '    audioFile: "/audio/lesson' + id + '.mp3",\\n';
      toAppend += '    warmup: [],\\n';
      toAppend += '    vocabulary: ' + JSON.stringify(lesson.vocabulary, null, 4) + ',\\n';
      toAppend += '    theory: ' + JSON.stringify(theoryArray, null, 4) + ',\\n';
      toAppend += '    blanks: ' + JSON.stringify(lesson.blanks, null, 4) + ',\\n';
      toAppend += '    openTasks: ' + JSON.stringify(lesson.openTasks, null, 4) + '\\n';
      toAppend += '  },\\n';
    }
    
    let finalContent = before + toAppend + '};\\n';
    fs.writeFileSync(dataJsPath, finalContent, 'utf8');
    console.log('Updated data.js');
  }
}

build();
