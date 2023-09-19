import { readFile } from 'fs/promises';
import { join } from 'path';
import { JSDOM } from 'jsdom';
import select from "../utils/index.mjs";

const getText = node => {
  if (!node) {
    return 'MISSING NODE';
  }

  if (!'children' in node) {
    return 'MISSING CHILDREN';
  }

  if (node.children.length !== 1) {
    return 'WRONG NUMBER OF CHILDREN';
  }

  if (node.children[0].type !== 'text') {
    return 'NOT A TEXT NODE';
  }

  return node.children[0].data;
}
const main = async () => {
  const document = await readFile(join('mocks', 'index.html'), 'utf8');
  const doc = new JSDOM(document);

  [
    ['p', 'text of first p'],
    ['p#id-01', 'text of p#id-01'],
    ['p#id-02', 'text of p#id-02'],
    ['p.class-03', 'text of p.class-03'],
    ['div p', 'text of div / p'],
    ['div p#id-04', 'text of div / p#id-04'],
    ['div#id-07 p', 'text of div#id-07 / p'],
    ['div#id-07 p#id-06', 'text of div#id-07 / p#id-06'],
  ].forEach(([selector, expected]) => {
    const node = select(doc, selector);
    const actual = getText(node);
    const result = (actual === expected) ? 'PASS' : 'FAIL';
    console.log(`"${selector}": ${result}`);
  })
}

await main();
