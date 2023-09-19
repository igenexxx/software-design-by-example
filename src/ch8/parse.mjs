import assert from "assert";
import tokenize from "./tokenize-2.mjs";

const groupEnd = (result, token) => {
  const group = {
    kind: 'Group',
    loc: null,
    end: token.loc,
    children: [],
  };

  const [children, groupLoc] = result.reduceRight(
    ([children, groupLoc], child) => {
      if (groupLoc) {
        return [[child, ...children], groupLoc];
      }
      if (child.kind === 'GroupStart') {
        return [children, child.loc];
      }
      return [[child, ...children], null];
    },
    [[], null]
  );

  assert(groupLoc !== null, `Unmatched end parenthesis (location ${token.loc})`);

  return {
    ...group,
    loc: groupLoc,
    children,
  };
};


const compress = (raw) =>
  raw.reduce((cooked, token) => {
    if (token.kind === 'Alt') {
      assert(cooked.length > 0, `No right operand for alt (location ${token.loc})`);
      const [right, ...rest] = cooked;
      return [{...token, right}, ...rest];
    }
    return [token, ...cooked];
  }, []);


const handleLit = (result, token) => [...result, token];

const handleStart = (result, token) => {
  assert(result.length === 0, 'Should not have start token after other tokens');
  return [...result, token];
};

const handleEnd = (result, token, last) => {
  assert(last, 'Should not have end token before other tokens');
  return [...result, token];
};

const handleGroupStart = (result, token) => [...result, token];

const handleGroupEnd = (result, token) => [...result.slice(0, -1), handleGroupEnd(result, token)];

const handleAny = (result, token) => {
  assert(result.length > 0, `No operand for '*' (location ${token.loc})`);
  const lastToken = result[result.length - 1];
  return [...result.slice(0, -1), { ...token, child: lastToken }];
};

const handleAlt = (result, token) => {
  assert(result.length > 0, `No operand for '*' (location ${token.loc})`);
  const leftToken = result[result.length - 1];
  return [...result.slice(0, -1), { ...token, left: leftToken, right: null }];
};

const handleToken = (result, token, last) => {
  const handlers = {
    Lit: () => handleLit(result, token),
    Start: () => handleStart(result, token),
    End: () => handleEnd(result, token, last),
    GroupStart: () => handleGroupStart(result, token),
    GroupEnd: () => handleGroupEnd(result, token),
    Any: () => handleAny(result, token),
    Alt: () => handleAlt(result, token),
  };

  const handler = handlers[token.kind];
  assert(handler, 'UNIMPLEMENTED');
  return handler();
};

const parse = (text) => {
  const allTokens = tokenize(text);

  const result = allTokens.reduce((acc, token, i) => {
    const last = i === allTokens.length - 1;
    return handleToken(acc, token, last);
  }, []);

  return compress(result);
};

export default parse;
