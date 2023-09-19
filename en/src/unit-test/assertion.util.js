export const assertApproxEqual = (actual, expected, tolerance = 0.0001) => {
  if (Math.abs(actual - expected) > tolerance) {
    throw new Error(`Expected ${actual} to be approximately equal to ${expected}`);
  }
}

export const assertRelativeApproxEqual = (actual, expected, tolerance = 0.0001) => {
  if (Math.abs(actual - expected) / Math.abs(expected) > tolerance) {
    throw new Error(`Expected ${actual} to be approximately equal to ${expected}`);
  }
}
