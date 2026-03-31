export type Breed =
  | "golden-retriever"
  | "chihuahua"
  | "husky"
  | "german-shepherd";

// Audio file registry per breed
const audioFiles: Record<Breed, string[]> = {
  "golden-retriever": [
    "/audio/golden-retriever/bark1.mp3",
    "/audio/golden-retriever/bark2.mp3",
    "/audio/golden-retriever/bark3.mp3",
    "/audio/golden-retriever/bark4.mp3",
  ],
  chihuahua: [
    "/audio/chihuahua/bark1.mp3",
    "/audio/chihuahua/bark2.mp3",
    "/audio/chihuahua/bark3.mp3",
  ],
  husky: [
    "/audio/husky/bark1.mp3",
    "/audio/husky/bark2.mp3",
    "/audio/husky/bark3.mp3",
  ],
  "german-shepherd": [
    "/audio/german-shepherd/bark1.mp3",
    "/audio/german-shepherd/bark2.mp3",
  ],
};

let lastPlayedIndex: Record<Breed, number> = {
  "golden-retriever": -1,
  chihuahua: -1,
  husky: -1,
  "german-shepherd": -1,
};

export function playBark(breed: Breed): HTMLAudioElement {
  const files = audioFiles[breed];

  // Pick a random clip different from last played
  let idx = Math.floor(Math.random() * files.length);
  if (idx === lastPlayedIndex[breed] && files.length > 1) {
    idx = (idx + 1) % files.length;
  }
  lastPlayedIndex[breed] = idx;

  const audio = new Audio(files[idx]);
  audio.volume = 0.8;
  audio.play();
  return audio;
}

// Fake transcription outputs (German)
const transcripts: Record<Breed, string[]> = {
  "golden-retriever": [
    "Wuff wuff! Bell bell! *freudig schwanzwedelnd*",
    "Wau wau wuff! Woff woff! *aufgeregt hechelnd*",
    "Wuff! Wuff wuff bell! *fröhlich herumspringend*",
  ],
  chihuahua: [
    "Kläff kläff kläff! Jiff jiff! *aggressiv zitternd*",
    "Kläff! Kläffkläffkläff! Yip! *winziges Knurren*",
    "Jiff kläff jiff kläff kläff! *dreht sich im Kreis*",
  ],
  husky: [
    "Auuuuuuu! Wuu wuu wuff! *dramatisches Seufzen*",
    "Aruuuu! Woff auuu! *Heulen intensiviert sich*",
    "Wuu wuu! Auuuuuuu! *widerspricht lautstark*",
  ],
  "german-shepherd": [
    "WUFF! Bell bell! WUFF! *aufmerksame Haltung*",
    "Bell! BELL BELL! Grrrr wuff! *Beschützermodus*",
    "WUFF WUFF! Bell! *Ohren aufgestellt*",
  ],
};

export function getTranscript(breed: Breed): string {
  const options = transcripts[breed];
  return options[Math.floor(Math.random() * options.length)];
}
