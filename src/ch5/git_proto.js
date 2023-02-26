import {readFile, stat} from 'node:fs/promises';
import { } from 'node:crypto';
import glob from 'glob-promise';
import {getHash} from "./hash.js";
import {getStats, isFile, readFileToObject} from "./utils.js";

export const hashExisting = async rootDir => {
  const matches = await glob(`${rootDir}/**/*`);
  const pairs = await Promise.all(matches.map(getStats));
  const filesPairs = pairs.filter(isFile);
  const readFiles = await Promise.all(filesPairs.map(readFileToObject));

  return readFiles.map(({ path, content }) => [path, getHash(content)]);
}
