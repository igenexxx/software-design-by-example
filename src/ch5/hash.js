import { createHash } from 'node:crypto';
import {createReadStream} from "node:fs";
export const getHash = (data) => {
  const hash = createHash('sha1');
  hash.setEncoding('hex').write(data);
  hash.end();

  return hash.read();
};

const hash = createHash('sha1').setEncoding('hex');
createReadStream('./package.json', {encoding: 'utf8', highWaterMark: 16 }).pipe(hash);
const result = await new Promise((res, rej) => hash.on('finish', () => res(hash.read())));
console.log('end');
console.log(result);
