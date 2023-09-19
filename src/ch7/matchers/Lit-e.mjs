import RegexBase from "./base.mjs";

class RegexLit extends RegexBase {
  constructor(chars, rest) {
    super(rest);
    this.chars = chars;
  }

  #isNextIndexWithinBounds(text, start) {
    const nextIndex = start + this.chars.length;
    return nextIndex <= text.length;
  }

  #isSubstringMatch(text, start) {
    const nextIndex = start + this.chars.length;
    return text.slice(start, nextIndex) === this.chars;
  }

  #match(text, start) {
    const conditions = [
      () => !this.#isNextIndexWithinBounds(text, start),
      () => !this.#isSubstringMatch(text, start),
    ];

    if (conditions.some(condition => condition())) {
      return undefined;
    }

    const nextIndex = start + this.chars.length;
    return this.rest === undefined ? nextIndex : this.rest.#match(text, nextIndex);
  }
}

export default (chars, rest) => new RegexLit(chars, rest);
