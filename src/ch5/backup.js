import { copyFile, writeFile } from "node:fs/promises";
import {findNew} from "./utils.js";
import {hashExisting} from "./git_proto.js";
import { counter } from "./utils.js";

const backup = async (src, dst, count = counter) => {
  const currentCount = (await count.getCount()).padStart(10, '0')

  const existing = await hashExisting(src)
  const needToCopy = await findNew(dst, existing)
  await copyFiles(dst, needToCopy)
  await safeJSONManifest(dst, currentCount, existing)

  await count.increment();
}

const copyFiles = async (dst, needToCopy) => {
  const promises = Object.keys(needToCopy).map(async hash => {
    const srcPath = needToCopy[hash]
    const dstPath = `${dst}/${hash}.bck`
    await copyFile(srcPath, dstPath)
  });

  return Promise.all(promises)
}

const saveCSVManifest = async (dst, timestamp, pathHash) => {
  pathHash = pathHash.sort()
  const content = pathHash.map(
    ([path, hash]) => `${path},${hash}`).join('\n')
  const manifest = `${dst}/${timestamp}.csv`
  await writeFile(manifest, content, 'utf-8')
}

const safeJSONManifest = async (dst, timestamp, pathHash) => {
  const manifest = `${dst}/${timestamp}.json`;
  const content = [...pathHash].sort().reduce((acc, [path, hash]) => ({...acc, [hash]: path }), {});
  const stringifiedContent = JSON.stringify(content, null, 2);

  await writeFile(manifest, stringifiedContent, 'utf-8');
}

export default backup;
