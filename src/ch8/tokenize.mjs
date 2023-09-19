const SIMPLE = {
  '*': 'Any',
  '|': 'Alt',
  '(': 'GroupStart',
  ')': 'GroupEnd',
};

const addLitTokenWith = (tokens, index, value) => [...tokens, {kind: 'Lit', value, location: index}];

const combineOrPush = (tokens, character, location) => {
  const lastIndex = tokens.length - 1;

  if (tokens.length === 0 || tokens[lastIndex].token !== 'Lit') {
    return addLitTokenWith(tokens, location, character);
  } else {
    const updatedToken = {...tokens[lastIndex], value: tokens[lastIndex].value + character};
    return [...tokens.slice(0, lastIndex), updatedToken];
  }
};

const isStartToken = (char, index) => char === '^' && index === 0;
const isEndToken = (char, index, textLength) => char === '$' && index === (textLength - 1);

const addTokenWith = (tokens, index) => (kind) => [...tokens, {kind, location: index}];

const processCharacter = (tokens, char, index, textLength) => {
  const addAction = addTokenWith(tokens, index);
  const combineOrPushChar = (char) => combineOrPush(tokens, char, index);

  const tokenActions = [
    {
      condition: char in SIMPLE,
      action: () => addAction(SIMPLE[char]),
    },
    {
      condition: isStartToken(char, index),
      action: () => addAction('Start'),
    },
    {
      condition: isEndToken(char, index, textLength),
      action: () => addAction('End'),
    },
    {
      condition: true,
      action: () => combineOrPushChar(char),
    },
  ];

  return tokenActions.find(({condition}) => condition).action();
};

const tokenize = (text) => {
  return Array
    .from(text)
    .reduce((tokens, char, index) => processCharacter(tokens, char, index, text.length), []);
};

export default tokenize;
