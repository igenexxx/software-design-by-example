import { readFile } from 'fs/promises';
import sizeOf from "object-sizeof";

const asBinary = table => {
  const labels = Object.keys(table);

  const nCols = labels.length;
  const nRows = table[labels[0]].length;
  const dimensions = new Uint32Array([nRows, nCols]);

  const allLabels = labels.join('\n');
  const encoder = new TextEncoder();
  const encodedLabels = encoder.encode(allLabels);

  const dataSize = sizeOf(0) * nCols * nRows;
  const totalSize = dimensions.byteLength + encodedLabels.byteLength + dataSize;

  const buffer = new ArrayBuffer(totalSize);
  const result = new Uint8Array(buffer);

  result.set(dimensions, 0);
  result.set(encodedLabels, dimensions.byteLength);

  let current = dimensions.byteLength + encodedLabels.byteLength;
  labels.forEach(label => {
    const temp = new Float64Array(table[label]);
    result.set(temp, current);
    current += temp.byteLength;
  });

  return result;
}

const table = await readFile('col-major.json', 'utf8').then(JSON.parse);

asBinary(table);
