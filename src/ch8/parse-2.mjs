import assert from "assert";
import tokenize from "./tokenize-2.mjs";

const handleLit = (result, token) => [...result, token];

const handleStart = (result, token) => {
  assert(result.length === 0, 'Should not have start token after other tokens');
  return [...result, token];
};

const handleEnd = (result, token, last) => {
  assert(last, 'Should not have end token before other tokens');
  return [...result, token];
};

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

const handleGroupStart = (result, token) => [...result, token];

const handleGroupEnd = (result, token) => [...result.slice(0, -1), groupEnd(result, token)];

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

class Handlers {
  constructor() {
    this.handlers = {};
  }

  add(kind, handler) {
    this.handlers[kind] = handler;
  }

  handle(result, token, last) {
    const handler = this.handlers[token.kind];
    assert(handler, 'UNIMPLEMENTED');
    return handler(result, token, last);
  }
}

class Parser {
  constructor(handlers) {
    this.handlers = handlers;
  }

  static compress(raw) {
    return raw.reduce((cooked, token) => {
      if (token.kind === 'Alt') {
        assert(cooked.length > 0, `No right operand for alt ( location ${token.loc})`);
        const right = cooked.shift();
        return [{...token, right}, ...cooked];
      } else {
        return [token, ...cooked];
      }
    }, []);
  }

  parse(text) {
    const allTokens = tokenize(text);

    const result = allTokens.reduce((acc, token, i) => {
      const last = i === allTokens.length - 1;
      return this.handlers.handle(acc, token, last);
    }, []);

    return Parser.compress(result);
  }
}

const handlers = new Handlers();
handlers.add('Lit', handleLit);
handlers.add('Start', handleStart);
handlers.add('End', handleEnd);
handlers.add('GroupStart', handleGroupStart);
handlers.add('GroupEnd', handleGroupEnd);
handlers.add('Any', handleAny);
handlers.add('Alt', handleAlt);

const parser = new Parser(handlers);

export default parser.parse;
