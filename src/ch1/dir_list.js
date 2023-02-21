import fs from 'node:fs/promises';

const srcDir = process.argv[2];
const listContents = await fs.readdir(srcDir, { withFileTypes: true });

listContents.forEach((item) => {
  console.log(item.name);
});
