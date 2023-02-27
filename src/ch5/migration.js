import glob from 'glob-promise';
import {readFile, writeFile} from "node:fs/promises";
import {basename, join} from "node:path";

const transformCSVtoJSON = (csv, sep = ',') => {
  return csv.split('\n').reduce((acc, line) => {
    const [path, hash] = line.split(sep);
    acc[hash] = path;

    return acc;
  }, {});
}
export const convertCSVtoJSON = async (src, dst) => {
  const CSVs = await glob(`${src}/*.csv`);

  if (CSVs.length === 0) {
    throw new Error('No CSVs found');
  }

  try {
    await Promise.all(CSVs.map(async path => {
      const file = await readFile(path, 'utf-8');
      await writeFile(
        join(dst, `${basename(path, '.csv')}_migrated.json`),
          JSON.stringify(transformCSVtoJSON(file), null, 2),
        'utf-8'
      );
    }))
  } catch (e) {
    throw new Error(`Error converting CSVs to JSON: ${e.message}`);
  }
}
