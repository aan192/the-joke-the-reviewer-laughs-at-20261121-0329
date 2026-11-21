import fs from 'node:fs';
import path from 'node:path';

const jokePath = 'joke.txt';
if (!fs.existsSync(jokePath)) {
  console.error('Error: joke.txt does not exist');
  process.exit(1);
}

const joke = fs.readFileSync(jokePath, 'utf8').trim();

if (!joke || joke.length === 0 || joke.length > 280 || /^\s*$/.test(joke)) {
  console.error(`Error: Joke length (${joke.length}) is invalid or joke is whitespace only (must be 1-280 chars)`);
  process.exit(1);
}

fs.mkdirSync('/output', { recursive: true });
const tempPath = path.join('/output', `entry-${Date.now()}-${Math.random().toString(36).slice(2)}.tmp`);
const targetPath = '/output/entry.txt';

fs.writeFileSync(tempPath, joke, 'utf8');
fs.renameSync(tempPath, targetPath);

console.log('Successfully wrote joke to /output/entry.txt atomically');
