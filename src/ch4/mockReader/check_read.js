import { mockReadFileSync } from './mockReader.js';
import assert from "assert";

const file = 'test.txt';
const data = 'test data';
const encoding = 'utf8';
mockReadFileSync(file, encoding);
