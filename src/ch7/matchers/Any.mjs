import RegexBase from "./base.mjs";

class RegexAny extends RegexBase {
  constructor(child, rest) {
    super(rest);
    this.child = child;
  }

  #matchChildMultipleTimes(text, start, num) {
    let currentStart = start;

    for (let i = 0; i < num; i += 1) {
      currentStart = this.child.#match(text, currentStart);
      if (currentStart === undefined) {
        return undefined;
      }
    }

    return currentStart;
  }

  #matchConditions(text, start, num) {
    const afterMany = this.#matchChildMultipleTimes(text, start, num);

    if (afterMany !== undefined) {
      if (this.rest !== null) {
        return this.rest.#match(text, afterMany);
      }
      return afterMany;
    }

    return undefined;
  }

  #match(text, start) {
    const maxPossible = text.length - start;

    for (let num = maxPossible; num >= 0; num -= 1) {
      const afterConditions = this.#matchConditions(text, start, num);
      if (afterConditions !== undefined) {
        return afterConditions;
      }
    }

    return undefined;
  }
}

const create = (child, rest = null) => {
  return new RegexAny(child, rest);
};

export default create;
