export const buildColumns = (nRows, labels) => labels.reduce((acc, label) => {
  acc[label] = Array.from({ length: nRows }, (_, i) => i);
  return acc;
}, {});

export const columnFilter = (table, predicate) => {
  const labels = Object.keys(table);
  const nRows = table[labels[0]].length;

  return Array.from({ length: nRows }).reduce((acc, _, i) => {
    if (predicate(table, i)) {
      labels.forEach(label => {
        acc[label].push(table[label][i]);
      });
    }

    return acc;
  }, labels.reduce((acc, label) => ({ ...acc, [label]: []}), {}))
}

export const columnSelect = (table, toKeep) => toKeep.reduce((acc, label) => {
  acc[label] = table[label];

  return acc;
}, {});
