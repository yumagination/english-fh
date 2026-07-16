import fs from 'fs';
import path from 'path';

async function run() {
  const { lessons } = await import('file://' + path.resolve('src/data.js') + '?t=' + Date.now());

  // Extract old lesson 1
  const l1 = lessons['1'];
  
  // Create Lesson 1.1 (Core)
  const lesson1_1 = {
    id: "1.1",
    title: "1.1 About me (Основа)",
    audioFile: "/audio/lesson1.1.mp3", // we will need to regenerate this
    warmup: l1.warmup,
    vocabulary: l1.vocabulary.slice(0, 3), // first half of vocab
    theory: [
      "My name is Yulia Mashkova. I am a multidisciplinary visual artist and spatial practitioner based in Serbia.",
      "My background is in architectural environment design, so I often explore the relationship between body and space, and between human presence and the spirit of place — what is sometimes called genius loci.",
      "I am interested in the emotional, ecological, material, and social connections between people and the environments they inhabit — and in the imprints of shared identity that emerge between them.",
      "In my practice, I work with humble, everyday materials: paper and cardboard waste, street plants, salt, and personal archives. I choose them because they are close to life. They carry memory, traces of everyday life, and ecological meaning."
    ],
    blanks: l1.blanks.slice(0, 3),
    openTasks: l1.openTasks,
    translationSentences: [
      { en: "My name is Yulia Mashkova. I am a multidisciplinary visual artist.", ru: "Меня зовут Юлия Машкова. Я междисциплинарная визуальная художница." },
      { en: "I work with humble, everyday materials: paper and cardboard waste.", ru: "Я работаю с простыми, повседневными материалами: бумажными и картонными отходами." },
      { en: "They carry memory, traces of everyday life, and ecological meaning.", ru: "Они несут в себе память, следы повседневной жизни и экологический смысл." }
    ]
  };

  // Create Lesson 1.2 (Details)
  const lesson1_2 = {
    id: "1.2",
    title: "1.2 About me (Детали)",
    audioFile: "/audio/lesson1.2.mp3", // we will need to regenerate this
    warmup: [],
    vocabulary: l1.vocabulary.slice(3), // remaining vocab
    theory: [
      "I am less interested in using luxury materials to give art a sense of status. Instead, I choose simple, accessible materials. In an age of overconsumption, I believe art should take responsibility for the resources it uses.",
      "For me, artistic value comes from this moment of recognition — when a simple material begins to reveal something unnoticed in my surroundings, my memory, and myself.",
      "Transforming discarded everyday materials into sculptures, installations, and temporary environments is both an ecological and ethical choice for me.",
      "Many of my works speak about migration, adaptation, memory, fragile habitation and the feeling of home. For me, home is not only a building. It can be a body, a city, a relationship, a state of mind, a memory, or a way of life. It can be anything that gives us a sense of belonging.",
      "I am interested in how fragile materials can speak about fragile lives — and how art can transform fragility into care, attention, and connection."
    ],
    blanks: l1.blanks.slice(3),
    openTasks: [],
    translationSentences: [
      { en: "Instead, I choose simple, accessible materials.", ru: "Вместо этого я выбираю простые, доступные материалы." },
      { en: "For me, home is not only a building. It can be a state of mind.", ru: "Для меня дом — это не только здание. Это может быть состояние ума." },
      { en: "I am interested in how fragile materials can speak about fragile lives.", ru: "Мне интересно, как хрупкие материалы могут говорить о хрупких жизнях." }
    ]
  };

  // Reconstruct lessons object with new keys
  const newLessons = {
    "1.1": lesson1_1,
    "1.2": lesson1_2,
  };

  // Copy the rest of the lessons
  for (const key of Object.keys(lessons)) {
    if (key !== '1') {
      newLessons[key] = lessons[key];
    }
  }

  let finalContent = 'export const lessons = ' + JSON.stringify(newLessons, null, 2) + ';\n';
  fs.writeFileSync('src/data.js', finalContent, 'utf8');
  console.log('Restructured data.js with 1.1 and 1.2');
}

run();
