import hopeThat from '../hope.js';
import assert from "assert";

export const mul = (a, b) => a * b;

hopeThat.test('Multiplication of 1 and 2 is 2', () => assert(mul(1, 2) === 2));
hopeThat.test('Multiplication of 2 and 2 is 4', () => assert(mul(2, 2) === 4));
