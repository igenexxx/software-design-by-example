import {match} from "../utils/index.mjs";

const main = () => {
  const tests = [
    ['a', 'a', true],
    ['b', 'a', false],
    ['a', 'ab', true],
    ['b', 'ab', true],
    ['ab', 'ba', false],
    ['^a', 'ab', true],
    ['^b', 'ab', false],
    ['a$', 'ab', false],
    ['a$', 'ba', true],
    ['a*', '', true],
    ['a*', 'baac', true],
    ['ab*c', 'ac', true],
    ['ab*c', 'abc', true],
    ['ab*c', 'abbbc', true],
    ['ab*c', 'abxc', false],
  ];

  tests.forEach(([pattern, text, expected]) => {
    const actual = match(pattern, text);
    const result = (actual === expected) ? 'PASS' : 'FAIL';
    console.log(`"${pattern}" "${text}": ${result}`);
  });
}

main();
