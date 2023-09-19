const SIMPLE = {
  '*': 'Any',
  '|': 'Alt',
  '(': 'GroupStart',
  ')': 'GroupEnd',
};

const isStartToken = (char, index) => char === '^' && index === 0;
const isEndToken = (char, index, textLength) => char === '$' && index === (textLength - 1);

const processCharacter = (tokens, char, index, textLength) => {
  const addToken = (kind) => [...tokens, { kind, location: index }];
  const addLitToken = (char) => [...tokens, { kind: 'Lit', location: index, value: char }];

  const tokenActions = [
    {
      condition: char in SIMPLE,
      action: () => addToken(SIMPLE[char]),
    },
    {
      condition: isStartToken(char, index),
      action: () => addToken('Start'),
    },
    {
      condition: isEndToken(char, index, textLength),
      action: () => addToken('End'),
    },
    {
      condition: true,
      action: () => addLitToken(char),
    },
  ];

  return tokenActions.find(({ condition }) => condition).action();
};

const tokenize = (text) =>
  Array.from(text).reduce((tokens, char, index) =>
    processCharacter(tokens, char, index, text.length), []);

export default tokenize;
