import assert from "assert";
import {writeFile} from "fs/promises";
import {calculateRatio, memory, time} from "../utils/index.mjs";
import {buildColumns, columnFilter, columnSelect} from "../column-major/index.mjs";
import yaml from "js-yaml";
import {buildRows, rowFilter, rowSelect} from "../row-major/index.mjs";

const RANGE = 3;

const main = async () => {
  const [nRows, nCols] = process.argv.slice(2, 4).map(num => parseInt(num, 10));
  const filterPerSelect = parseFloat(process.argv[4]);

  const labels = Array.from({ length: nCols }, (_, i) => `label_${i + 1}`);
  const someLabels = labels.slice(0, Math.floor(labels.length / 2));

  assert(someLabels.length > 0, 'Must have at least one label to keep');

  const [rowTable, rowSize, rowHeap] = memory(buildRows, nRows, labels);
  const [colTable, colSize, colHeap] = memory(buildColumns, nRows, labels);

  await writeFile('col-major.json', JSON.stringify(colTable, null, 2));

  const rowFilterTime = time(rowFilter, rowTable, row => (row['label_1'] % RANGE) === 0);
  const rowSelectTime = time(rowSelect, rowTable, someLabels);

  const colFilterTime = time(columnFilter, colTable, (table, i) => (table['label_1'][i] % RANGE) === 0);
  const colSelectTime = time(columnSelect, colTable, someLabels);

  const ratio = calculateRatio(filterPerSelect, rowFilterTime, rowSelectTime, colFilterTime, colSelectTime);

  const result = {
    nRows,
    nCols,
    filterPerSelect,
    rowSize,
    rowHeap,
    colSize,
    colHeap,
    rowFilterTime,
    rowSelectTime,
    colFilterTime,
    colSelectTime,
    ratio
  };

  console.log(yaml.dump(result));
}

main();
