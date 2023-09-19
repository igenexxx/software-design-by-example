import RegexBase from "./base.mjs";

class RegexAlt extends RegexBase {
  constructor(left, right, rest) {
    super(rest);
    this.left = left;
    this.right = right;
  }

  #matchLeftOrRight(text, start) {
    return [this.left, this.right].find(pat => pat.#match(text, start) !== undefined);
  }

  #matchRest(text, afterPattern) {
    return this.rest === null ? afterPattern : this.rest.#match(text, afterPattern);
  }

  #matchConditions(text, start) {
    const matchedPattern = this.#matchLeftOrRight(text, start);

    if (matchedPattern) {
      const afterPattern = matchedPattern.#match(text, start);
      const afterRest = this.#matchRest(text, afterPattern);

      if (afterRest !== undefined) {
        return afterRest;
      }
    }

    return undefined;
  }

  #match(text, start) {
    return this.#matchConditions(text, start);
  }
}

const create = (left, right, rest = null) => {
  return new RegexAlt(left, right, rest);
};

export default create;
