export const buildRows = (nRows, labels) => {
  return Array.from({ length: nRows }, (_, i) => {
    return labels.reduce((acc, label) => {
      acc[label] = i;
      return acc;
    }, {})
  });
}

export const rowFilter = (table, predicate) => table.filter(predicate);

export const rowSelect = (table, toKeep) => table.map(row => {
  return toKeep.reduce((acc, label) => {
    acc[label] = row[label];
    return acc;
  }, {});
})
