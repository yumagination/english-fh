import fs from 'fs';
import path from 'path';

const vocabDict = {
  "multidisciplinary artist": {
    chunk: "be a multidisciplinary artist",
    meaning: "an artist who works with different media and materials (like sound, video, sculpture)",
    example: "Grisha is a multidisciplinary artist who combines sound and objects."
  },
  "spatial practitioner": {
    chunk: "work as a spatial practitioner",
    meaning: "someone who explores and changes how space is used and felt",
    example: "As a spatial practitioner, she thinks about how bodies move around the sculptures."
  },
  "fragile habitation": {
    chunk: "explore fragile habitation",
    meaning: "the idea of living in a delicate, unstable, or temporary way",
    example: "The sculptures reflect the feeling of fragile habitation in modern cities."
  },
  "discarded everyday materials": {
    chunk: "use discarded everyday materials",
    meaning: "things that people throw away every day, like old receipts",
    example: "We build our art using discarded everyday materials."
  },
  "site-specific installation": {
    chunk: "create a site-specific installation",
    meaning: "art designed specifically for a particular location",
    example: "Our project in the park is a site-specific installation."
  },
  "bureaucratic exhaustion": {
    chunk: "feel bureaucratic exhaustion",
    meaning: "extreme tiredness caused by dealing with too many documents and rules",
    example: "Many immigrants suffer from bureaucratic exhaustion."
  },
  "administrative control": {
    chunk: "resist administrative control",
    meaning: "the power that officials use to regulate people's lives through paperwork",
    example: "The project questions the limits of administrative control."
  },
  "paper skin": {
    chunk: "make a paper skin",
    meaning: "a protective or outer layer made entirely of paper pulp",
    example: "We invite people to build the paper skin of the sculpture."
  },
  "ecological empathy": {
    chunk: "invite ecological empathy",
    meaning: "the ability to feel a deep connection and care for the environment",
    example: "Reusing paper helps us practice ecological empathy."
  },
  "ecosystem of belonging": {
    chunk: "grow an ecosystem of belonging",
    meaning: "a community where everyone feels connected and safe",
    example: "The workshop creates a new ecosystem of belonging."
  },
  "distorted human figure": {
    chunk: "look like a distorted human figure",
    meaning: "a shape that resembles a human but is bent, twisted, or unnatural",
    example: "The sculpture resembles a distorted human figure in a long coat."
  },
  "melted shape": {
    chunk: "have a melted shape",
    meaning: "a form that looks like it has lost its solid structure",
    example: "It looks like a bell with a melted shape."
  },
  "stooped body": {
    chunk: "resemble a stooped body",
    meaning: "a body posture that is bent forward and down, often from tiredness",
    example: "The heavy coat hides a stooped body."
  },
  "ruined form": {
    chunk: "stay in a ruined form",
    meaning: "a shape that looks broken, decayed, or destroyed",
    example: "Two of the sculptures will stay in a ruined form without electronics."
  },
  "polyurethane boat varnish": {
    chunk: "cover with polyurethane boat varnish",
    meaning: "a strong, waterproof coating used to protect boats from water",
    example: "We use polyurethane boat varnish to protect the paper from the rain."
  },
  "low-voltage electronics": {
    chunk: "install low-voltage electronics",
    meaning: "safe electrical components that don't use much power",
    example: "The glowing sculptures contain low-voltage electronics."
  },
  "proximity": {
    chunk: "react to proximity",
    meaning: "how close someone or something is",
    example: "The sound changes depending on your proximity."
  },
  "quiet local soundscape": {
    chunk: "blend into the quiet local soundscape",
    meaning: "the soft, natural background noises of a specific place",
    example: "The installation adds to the quiet local soundscape of the park."
  },
  "fade in / fade out": {
    chunk: "fade in and fade out",
    meaning: "to gradually become louder/brighter, and then softer/darker",
    example: "The light will fade in and fade out as you walk away."
  },
  "shared process": {
    chunk: "join the shared process",
    meaning: "an activity where many people work together",
    example: "Making papier-mâché is a shared process."
  },
  "unreadable": {
    chunk: "make personal data unreadable",
    meaning: "impossible to read or understand",
    example: "We tear the documents until they are completely unreadable."
  },
  "supportive community": {
    chunk: "build a supportive community",
    meaning: "a group of people who help and care for each other",
    example: "The workshop aims to build a supportive community."
  },
  "to tear": {
    chunk: "tear the paper",
    meaning: "to rip something into pieces using your hands",
    example: "First, you need to tear the documents into small pieces."
  },
  "to shred": {
    chunk: "shred the documents",
    meaning: "to cut or tear something into very thin strips",
    example: "We will shred all personal data to protect privacy."
  },
  "to soak": {
    chunk: "soak the paper",
    meaning: "to leave something in water until it is completely wet",
    example: "Then we soak the paper in water to make pulp."
  },
  "to squeeze": {
    chunk: "squeeze the water out",
    meaning: "to press something firmly to remove liquid",
    example: "You should squeeze the water out of the pulp."
  },
  "to smooth": {
    chunk: "smooth the surface",
    meaning: "to make something flat and even by pressing or rubbing it",
    example: "Use your hands to smooth the paper skin."
  },
  "transformation": {
    chunk: "the transformation of bureaucracy",
    meaning: "a complete change in form, appearance, or character",
    example: "The workshop is about the transformation of negative feelings into art."
  },
  "administrative power": {
    chunk: "the weight of administrative power",
    meaning: "the control exerted by governments or institutions",
    example: "Paper is a symbol of administrative power."
  },
  "co-authors": {
    chunk: "become co-authors",
    meaning: "people who create something together",
    example: "All the participants become co-authors of the sculpture."
  },
  "participatory": {
    chunk: "a participatory artwork",
    meaning: "something that involves the active involvement of the audience",
    example: "Fragile Homes is a participatory project."
  },
  "collective surface": {
    chunk: "create a collective surface",
    meaning: "an outer layer made by the combined effort of many people",
    example: "Our fingerprints are left on the collective surface."
  },
  "ecosystem": {
    chunk: "a complex ecosystem",
    meaning: "a network of interacting parts or living things",
    example: "The city park is a complex ecosystem."
  },
  "interdependence": {
    chunk: "our deep interdependence",
    meaning: "the state of needing and relying on each other",
    example: "The project highlights the interdependence of humans and nature."
  },
  "entanglement": {
    chunk: "social entanglement",
    meaning: "a situation where things are closely connected or twisted together",
    example: "We explore the entanglement of bureaucracy and daily life."
  },
  "mycelium": {
    chunk: "grow like mycelium",
    meaning: "the hidden, root-like network of a fungus",
    example: "Connections between people grow underground, like mycelium."
  },
  "blurred names": {
    chunk: "leave blurred names",
    meaning: "names that are difficult to read or distinguish clearly",
    example: "The papers leave only blurred names on the surface."
  },
  "award": {
    chunk: "receive an award",
    meaning: "a prize given for an achievement",
    example: "We are honored to receive the dm-award."
  },
  "recognition": {
    chunk: "thank you for the recognition",
    meaning: "appreciation or acknowledgment of someone's work",
    example: "This recognition means a lot to our team."
  },
  "to be deeply grateful": {
    chunk: "to be deeply grateful",
    meaning: "to feel very thankful",
    example: "I am deeply grateful for this opportunity."
  },
  "resonance": {
    chunk: "find resonance",
    meaning: "the quality of being meaningful and important to people",
    example: "Our project found resonance with the local community."
  },
  "precious gift": {
    chunk: "a precious gift",
    meaning: "something very valuable or special given to someone",
    example: "Your participation is a precious gift to us."
  },
  "take root": {
    chunk: "take root in the city",
    meaning: "to become established and start to grow",
    example: "We hope this project will take root in Karlsruhe."
  }
};

async function run() {
  const { lessons } = await import('file://' + path.resolve('src/data.js') + '?t=' + Date.now());

  for (const lessonId of Object.keys(lessons)) {
    const lesson = lessons[lessonId];
    if (lesson.vocabulary) {
      for (const item of lesson.vocabulary) {
        const word = item.word.toLowerCase();
        
        // Exact match or fallback to a default
        let dictEntry = vocabDict[word] || vocabDict[item.word];
        
        if (dictEntry) {
          item.chunk = dictEntry.chunk;
          item.meaning = dictEntry.meaning;
          item.example = dictEntry.example;
        } else {
          item.chunk = `use ${word}`;
          item.meaning = "related to the workshop";
          item.example = `We use ${word} in our project.`;
          console.warn(`No dictionary entry for: ${word}`);
        }
      }
    }
  }

  // RESTRUCTURE LESSONS 5 AND 6
  const l5_1 = lessons['5.1'];
  const l5_2 = lessons['5.2'];
  const l6_1 = lessons['6.1'];
  const l6_2 = lessons['6.2'];

  // Lesson 5 (Workshop instructions) Text Pool
  l5_1.theory = [
    "Hello, welcome to V12. My name is Yulia, and I am one of the artists of Fragile Homes. We are working here on a group of public sculptures that will later be installed in the park of the City Museum Karlsruhe.",
    "You are very welcome to join the process. You do not need any artistic experience. You can stay for a short time or for several hours.",
    "We will show you what to do step by step. First, please choose some paper. It can be a receipt, a form, a letter, a copy, an old instruction, or any document you are ready to destroy.",
    "Please do not use documents you still need. Now tear the paper into small pieces. If there is personal data, we make sure it becomes unreadable."
  ];

  l5_2.theory = [
    "Then we soak the paper and mix it with paper pulp. Take a small amount of pulp and press it gently onto the sculpture. You can use your fingers, a brush, or a small tool.",
    "This is not about making a perfect surface. We need texture, pressure, and traces of hands.",
    "It is about gestures, pressure, texture, and shared work. Your hands and your paper will become part of the artwork. This layer is the collective skin of the sculpture.",
    "If you have any questions, please ask me, Grisha, or one of the volunteers."
  ];

  // Lesson 6 (Invitation & Philosophy) Text Pool
  l6_1.theory = [
    "Hello everyone! I'm Yulia Mashkova a visual artist based in Serbia And I'm Grisha Mumrikov a multidisciplinary artist and composer based in Germany.",
    "We are happy to introduce our project, Fragile Homes, as a part of the UNESCO City of Media Arts Karlsruhe programme. Our project explores a universal experience: the feeling of bureaucratic exhaustion caused by increasing administrative control.",
    "And we would like to ask you a question: What if the papers that once made us feel small could become something that glows, sounds, and carries our collective touch?",
    "From August sixth to August ninth, from twelve noon until eight p.m., we invite you to join our open art workshop at Viktoriastraße 12 in Karlsruhe. Together, we will transform the unpleasant traces of bureaucracy into the living surface of future public sculptures. Participation is free. No registration is required. You can drop in at any time."
  ];

  l6_2.theory = [
    "Everyone is welcome. Please bring old receipts, instruction manuals, forms, letters, copies of applications, or any other papers that you are ready to destroy. All personal data will be shredded, destroyed, and made completely unreadable during the process.",
    "We create sculptural forms, and you are invited to give them a skin — made from paper, gestures, fatigue, care, and touch. For us, paper is not only a bureaucratic material.",
    "It is also a memory of trees. Our project invites ecological empathy and explores fragility as the hidden underside of control. This workshop asks what kinds of connections we can grow instead of creating new layers of paper.",
    "The completed sculptures will later be installed in the park of the City Museum Karlsruhe as part of the UNESCO City of Media Arts Karlsruhe programme and the SCHLOSSLICHTSPIELE Light Festival. We would love to see you there. Thank you!"
  ];

  let finalContent = 'export const lessons = ' + JSON.stringify(lessons, null, 2) + ';\n';
  fs.writeFileSync('src/data.js', finalContent, 'utf8');
  console.log('Successfully updated vocabulary and restructured lessons 5 and 6.');
}

run();
