import RegexBase from "./base.mjs";

class RegexLit extends RegexBase {
  constructor(chars) {
    super();
    this.chars = chars;
  }

  #isNextIndexWithinBounds(text, start) {
    return start + this.chars.length <= text.length;
  }

  #isSubstringMatch(text, start) {
    return text.slice(start, start + this.chars.length) === this.chars;
  }

  #match(text, start) {
    if (!this.#isNextIndexWithinBounds(text, start)) {
      return undefined;
    }

    if (!this.#isSubstringMatch(text, start)) {
      return undefined;
    }

    return start + this.chars.length;
  }
}

export default chars => new RegexLit(chars);
