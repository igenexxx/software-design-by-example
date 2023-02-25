import minimist from 'minimist';
import glob from 'glob';
import hope from './hope.js';

const main = async (args) => {
  const { _: filenames, verbose, tags, rootPath='.' } = minimist(args, {
    boolean: ['v'],
    array: ['t'],
    string: ['r'],
    alias: { v: 'verbose', t: 'tags', r: 'rootPath' },
  });

  const files = filenames.length ? filenames : glob.sync(`${rootPath}/**/test-*.js`);
  const trimmedTags = tags?.split(',').map(item => item.trim());

  await Promise.all(files.map(filename => import(filename)));
  hope.run({ tags: trimmedTags });

  const result = verbose ? hope.verbose() : hope.terse();

  console.log(result);
}

await main(process.argv.slice(2));
