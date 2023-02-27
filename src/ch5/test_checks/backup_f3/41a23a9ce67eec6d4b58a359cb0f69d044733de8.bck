import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";

const filePath = process.argv[2];
const hash = createHash('sha1').setEncoding('hex');
createReadStream(filePath).pipe(hash).pipe(process.stdout);
console.log('Program finished');
// createReadStream(filePath).pipe(hash)
//
// hash.on('finish', () => {
//   console.log(hash.read());
// });
