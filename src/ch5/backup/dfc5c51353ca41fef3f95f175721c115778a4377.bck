import { getHash } from './hash.js';
import { readFile } from 'node:fs/promises';

const data = await readFile(process.argv[2], 'utf-8');

console.log(getHash(data));
