import {stat} from "node:fs/promises";
import {readFile, writeFile} from "node:fs/promises";
import glob from "glob-promise";
import {basename} from "node:path";

export const getStats = async path => ({ path, stat: await stat(path) });
export const isFile = ({ stat }) => stat.isFile();
export const readFileToObject = async ({ path }) =>
  ({ path, content: await readFile(path, 'utf-8') });

const getBasename = path => basename(path, '.bck');

export const findNew = async (rootDir, pathHashPairs) => {
  const pattern = `${rootDir}/*.bck`;
  const backedUpFiles = await glob(pattern);
  const backedUpFilesSet = new Set(backedUpFiles.map(getBasename));

  return pathHashPairs
    .filter(([, hash]) => !backedUpFilesSet.has(hash))
    .reduce((acc, [path, hash]) => {
    acc[hash] = path;
    return acc;
  }, {});
}

class Counter {
  async getCount() {
    return await readFile('./.counter/_counter', 'utf-8');
  }

  async increment() {
    const count = await this.getCount();
    const newCount = Number(count) + 1;
    await writeFile('./.counter/_counter', newCount.toString(), 'utf-8');
    return newCount;
  }
}

export const counter = new Counter();
