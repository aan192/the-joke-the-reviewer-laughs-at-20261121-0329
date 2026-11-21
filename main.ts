import fs from 'node:fs';

const joke = fs.readFileSync('joke.txt', 'utf8').trim();
fs.mkdirSync('/output', { recursive: true });
fs.writeFileSync('/output/entry.txt', joke, 'utf8');
console.log('Wrote joke to /output/entry.txt');
