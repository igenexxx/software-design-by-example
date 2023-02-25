import { hopeThat, main } from "./test-fr.js";
import assert from "assert";
const sign = value => value < 0 ? -1 : 1;

hopeThat('Sign of negative is -1', () => assert(sign(-3) === -1));
hopeThat('Sign of positive is 1', () => assert(sign(19) === 1));

hopeThat('Sign of zero is 0', () => assert(sign(0) === 0));

hopeThat('Sign misspelled is error', () => assert(sgn(1) === 1));

main();
