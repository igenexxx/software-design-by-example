import { open } from 'node:fs/promises';

const fileName = process.argv[2];

const fd = await open(fileName, 'r');
const buffer = Buffer.alloc(10);
const { bytesRead } = await fd.read(buffer, 0, 10, 0);
await fd.close();
console.log(buffer.toString('utf8', 0, bytesRead));
