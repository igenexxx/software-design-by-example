import caller from "caller";
import assert from "assert";
import { parse } from "node:path";

class Hope {
  constructor() {
    this.todo = [];
    this.passes = [];
    this.fails = [];
    this.errors = [];
    this.initMap = new Map();
  }

  #cases() {
    return [
      ["Passes", this.passes],
      ["Fails", this.fails],
      ["Errors", this.errors]
    ]
  }

  terse() {
    return this.#cases().map(([title, results]) => `${title}: ${results.length}`).join(", ");
  }

  verbose() {
    const prefix = '\n';

    return this.#cases().map(([title, results]) => {
      const cases = results.map((result, i) => `${i + 1}. ${result}`);
      return `${title}: ${results.length}${prefix}${cases.join(prefix)}`;
    }).join(prefix);
  }

  setup(init) {
    const { base } = parse(caller());
    this.initMap.set(base, init);
  }

  test(comment, cb, tags = []) {
    this.todo.push([`${caller()}:: ${comment}`, cb, tags]);
  }

  run({ tags: userTags }) {
    const tests = userTags
      ? this.todo.filter(([,, testTags]) => testTags?.some(tag => userTags.includes(tag)))
      : this.todo;

    tests.forEach(([comment, test]) => {
      const { base } = parse(comment.split('::').at(0));
      try {
        this.initMap.get(base)?.();
        test();
        this.passes.push(comment);
      } catch (e) {
        if (e instanceof assert.AssertionError) {
          this.fails.push(comment);
        } else {
          this.errors.push(comment);
        }
      }
    });
  }
}

export default new Hope();
