import backup from './backup.js';

const [src, dst] = process.argv.slice(2);
if (!src || !dst) {
  console.error('Usage: node backup.js <source> <destination>');
  process.exit(1);
}

await backup(src, dst);
