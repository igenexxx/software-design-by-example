import { createHash } from 'node:crypto';
export const getHash = (data) => {
  const hash = createHash('sha1');
  hash.setEncoding('hex').write(data);
  hash.end();

  return hash.read();
};
