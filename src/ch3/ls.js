import { readFile } from 'node:fs/promises';
import { stat } from 'node:fs/promises';
import glob from 'glob-promise';

const srcDir = process.argv[2] || '.';

const files = await glob(`${srcDir}/**/*.*`, { ignore: ['*.bck', './node_modules/**'] })
const content = displayFn => async (fileName) => displayFn(fileName, await readFile(fileName, 'utf8').catch(e => console.log(e)));
const info = (fileName, content) => console.log(`File ${fileName} has ${content.length} characters, ${content.split('\n').length} lines and ${content.split(' ').length} words.`);


const result = await Promise.all(files
  .map(async file => [{ file, isFile: (await stat(file)).isFile() }]
    .filter(({ isFile }) => isFile)
    .map(({ file }) => file)
  )
);

await Promise.all(result.flat().map(content(info)));

