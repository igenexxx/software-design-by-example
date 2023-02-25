import hopeThat from '../hope.js';
import assert from "assert";

export const div = (a, b) => a / b;

hopeThat.test('Division of 1 and 2 is 0.5', () => assert(div(1, 2) === 0.5));
hopeThat.test('Division of 2 and 2 is 1', () => assert(div(2, 2) === 2), ['important']);
hopeThat.test('Division of 2 and 0 is Infinity', () => assert(div(2, 0) === Infinity));
