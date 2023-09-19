import hopeThat from '../hope.js';
import assert from "assert";

const sub = (a, b) => a - b;

hopeThat.test('Subtraction of 1 and 2 is -1', () => assert(sub(1, 2) === -1));
hopeThat.test('Subtraction of 2 and 2 is 0', () => assert(sub(2, 2) === 0), ['important']);
