import fs from 'fs';

const prependText = `export const lessons = {
  1: {
    id: 1,
    title: "Занятие 1. About me — рассказ о себе",
    audioFile: "/audio/lesson1.mp3",
    warmup: [],
    vocabulary: [
      { word: "multidisciplinary artist", translation: "междисциплинарная художница" },
      { word: "spatial practitioner", translation: "художница / практик, работающий с пространством" },
      { word: "fragile habitation", translation: "хрупкое обитание" },
      { word: "discarded everyday materials", translation: "выброшенные повседневные материалы" },
      { word: "site-specific installation", translation: "инсталляция, созданная для конкретного места" }
    ],
    theory: [
      "My name is Yulia Mashkova.",
      " I am a multidisciplinary visual artist and spatial practitioner based in Serbia.",
      " My background is in architectural environment design, so I often explore the relationship between body and space, and between human presence and the spirit of place — what is sometimes called genius loci.",
      " I am interested in the emotional, ecological, material, and social connections between people and the environments they inhabit — and in the imprints of shared identity that emerge between them.",
      " In my practice, I work with humble, everyday materials: paper and cardboard waste, street plants, salt, and personal archives.",
      " I choose them because they are close to life.",
      " They carry memory, traces of everyday life, and ecological meaning.",
      " I am less interested in using luxury materials to give art a sense of status.",
      " Instead, I choose simple, accessible materials.",
      " In an age of overconsumption, I believe art should take responsibility for the resources it uses.",
      " For me, artistic value comes from this moment of recognition — when a simple material begins to reveal something unnoticed in my surroundings, my memory, and myself.",
      " Transforming discarded everyday materials into sculptures, installations, and temporary environments is both an ecological and ethical choice for me.",
      " Many of my works speak about migration, adaptation, memory, fragile habitation and the feeling of home.",
      " For me, home is not only a building.",
      " It can be a body, a city, a relationship, a state of mind, a memory, or a way of life.",
      " It can be anything that gives us a sense of belonging.",
      " I am interested in how fragile materials can speak about fragile lives — and how art can transform fragility into care, attention, and connection."
    ],
    blanks: [
      { question: "My work ________ my personal experience of migration.", answer: "stems from" },
      { question: "The idea is ________ my long interest in fragile homes.", answer: "rooted in" },
      { question: "Documents often carry an ________.", answer: "emotional load" },
      { question: "In a new country, people can ________ from the city around them.", answer: "feel separate" },
      { question: "Art can help create a temporary ________.", answer: "supportive community" }
    ],
    openTasks: [
      { id: "task1_1", question: "Напиши 5 предложений о себе (используй rooted in, stems from, emotional load, fragile materials, supportive community)." }
    ]
  },
  2: {
    id: 2,
    title: "Занятие 2. Project core — рассказ о проекте",
    audioFile: "/audio/lesson2.mp3",
    warmup: [],
    vocabulary: [
      { word: "bureaucratic exhaustion", translation: "бюрократическое истощение" },
      { word: "administrative control", translation: "административный контроль" },
      { word: "paper skin", translation: "бумажная кожа" },
      { word: "ecological empathy", translation: "экологическая эмпатия" },
      { word: "ecosystem of belonging", translation: "экосистема принадлежности" }
    ],
    theory: [
      "Fragile Homes is a public art project about bureaucracy, paper, memory, and belonging.",
      " The project starts from a common experience: the tiredness people feel when they deal with documents, forms, permissions, copies, and control.",
      " But the project is not only about bureaucracy.",
      " It is about transformation.",
      " Paper can be a tool of control, but paper also comes from trees.",
      " It carries the memory of the forest.",
      " In Karlsruhe, we invite local residents to bring papers they no longer need.",
      " Together, we tear them, destroy personal data, mix the paper with pulp, and apply it as the final layer onto prepared sculptures.",
      " The project transforms paperwork into a shared sculptural skin.",
      " It asks whether something connected with pressure and control can become a material of care, connection, and belonging."
    ],
    blanks: [
      { question: "The project ________ bureaucratic exhaustion.", answer: "stems from" },
      { question: "The idea is ________ paper, memory, and belonging.", answer: "rooted in" },
      { question: "New connections can ________ during the workshop.", answer: "sprout up" },
      { question: "The ________ we use paper is its double nature.", answer: "reason" },
      { question: "We use old documents ________ they carry traces of control.", answer: "because" }
    ],
    openTasks: [
      { id: "task2_1", question: "Напиши мини-текст (80–100 слов) по схеме: First... The starting point is... During the workshop... Later, the sculptures... For me, the important question is..." }
    ]
  }`;

let dataJsContent = fs.readFileSync('src/data.js', 'utf8');

// The file currently starts with:
// ,\n  3: {
// or similar
// We just remove the leading comma and whitespace and add our prepend text.

if (dataJsContent.startsWith(',')) {
  dataJsContent = dataJsContent.substring(1);
}

fs.writeFileSync('src/data.js', prependText + ',' + dataJsContent, 'utf8');
console.log('Fixed data.js!');
