import assert from "assert";

const HopeTests = [];
const incrementer = { increment() { this.count += 1; } }
const createIncrementer = () => Object.create(incrementer, { count: { value: 0, writable: true } });
const HopePass = createIncrementer();
const HopeFail = createIncrementer();
const HopeError = createIncrementer();

// Record a single test for running later
export const hopeThat = (message, cb) => {
  HopeTests.push([message, cb]);
}

export const main = () => {
  HopeTests.forEach(([message, test]) => {
    try {
      test();
      HopePass.increment();
    } catch (e) {
      if (e instanceof assert.AssertionError) {
        HopeError.increment();
      } else {
        HopeFail.increment();
      }
      console.log(`Test failed: ${message}`);
      console.log(e);
    }
  });

  console.log(`Tests passed: ${HopePass.count}`);
  console.log(`Tests failed: ${HopeFail.count}`);
  console.log(`Tests errored: ${HopeError.count}`);
}
