import sizeOf from 'object-sizeof';

export const memory = (func, ...params) => {
  const before = process.memoryUsage();
  const result = func(...params);
  const after = process.memoryUsage();
  const heap = after.heapUsed - before.heapUsed;;
  const size = sizeOf(result);

  return [result, size, heap];
};

export const time = (func, ...params) => {
  const before = performance.now();
  func(...params);

  return performance.now() - before;
};

export const calculateRatio = (f2S, rFilterT, rSelectT, cFilterT, cSelectT) =>
  (f2S * rFilterT) + rSelectT / (f2S * cFilterT) + cSelectT;

export const getPercentElements = (arr, percent) => {
  const index = Math.floor(arr.length * percent);

  return arr.filter((_, i) => Math.floor(i % (100 / percent)) === 0);
}

export const generateString = (length) => {
  const [min, max] = [97, 122];

  return Array.from({ length }, () => String.fromCharCode(Math.floor(Math.random() * (max - min + 1)) + min)).join('');
}
