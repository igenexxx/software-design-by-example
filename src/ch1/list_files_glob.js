import globOriginal from 'glob';
import path from 'node:path';
import { stat, mkdir, copyFile } from 'node:fs/promises';

const [srcRoot, dstRoot] = process.argv.slice(2);
const glob = (pattern, options) =>
  new Promise((res, rej) =>
    globOriginal(pattern, options, (err, files) => err ? rej(err) : res(files)));


const files = await glob(`${srcRoot}/**/*.*`, { ignore: ['*.bck', '../node_modules/**'] });

for (const srcName of files) {
  const dstName = srcName.replace(srcRoot, dstRoot);
  const dstDir = path.dirname(dstName);
  // check that directory exists
  const srcStats = await stat(srcName).catch(() => false);
  const dstStats = await stat(dstDir).catch(() => false);

  if (!srcStats || !srcStats.isFile()) {
    console.log(`File ${srcName} does not exist or it is not a file. Skipping...`);
    continue;
  }

  if (!dstStats || !dstStats.isDirectory()) {
    console.log(`Directory ${dstDir} does not exist. Creating...`);
    await mkdir(dstDir, { recursive: true });
  }

  await copyFile(srcName, dstName);

  console.log(`${srcName} -> ${dstName}`);
}
