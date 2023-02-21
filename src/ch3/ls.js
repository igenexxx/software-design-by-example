import { readFile } from 'node:fs/promises';
import { stat } from 'node:fs/promises';
import glob from 'glob-promise';

const srcDir = process.argv[2] || '.';

const files = await glob(`${srcDir}/**/*.*`, { ignore: ['*.bck', './node_modules/**'] })
const content = displayFn => async (fileName) => displayFn(fileName, await readFile(fileName, 'utf8').catch(e => console.log(e)));
const info = (fileName, content) => console.log(`File ${fileName} has ${content.length} characters, ${content.split('\n').length} lines and ${content.split(' ').length} words.`);

// await Promise
//   .allSettled(files
//     .flatMap(async (file) => await Promise.all(
//       [{ file, stats: await stat(file) }]
//       .filter(({ stats }) => { stats.isFile() })
//       .map(({ file }) => file)
//     ))
//     .map(content(info))
//   );
const result = await Promise.all(files.map(async file => ({ file, isFile: (await stat(file)).isFile() })));

console.log(result);
//
// const filteredResults = result.filter(({ isFile }) => isFile).map(({ file }) => file);
//
// const view = await Promise.all(filteredResults.map(content(info)))

// console.log(view);



// const view = await Promise.all(result.map(async (file) => await readFile(file, 'utf8') ));

// console.log(view);
