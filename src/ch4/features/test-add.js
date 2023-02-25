import assert from "assert";
import hope from "../hope.js";
export const add = (a, b) => a + b;
hope.test('Addition of 1 and 2 is 3', () => assert(add(1, 2) === 3));
hope.test('Addition of 2 and 2 is 4', () => assert(add(2, 2) === 4));
