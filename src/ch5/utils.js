import {stat} from "node:fs/promises";
import {readFile} from "node:fs/promises";

export const getStats = async path => ({ path, stat: await stat(path) });
export const isFile = ({ stat }) => stat.isFile();
export const readFileToObject = async ({ path }) =>
  ({ path, content: await readFile(path, 'utf-8') });
