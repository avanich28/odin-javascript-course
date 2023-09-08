const sum = require("./sum");

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

// 1) Common Matchers
test("two plus two is four", () => {
  // Test value
  expect(2 + 2).toBe(4);
});

test("object assignment", () => {
  const data = { one: 1 };
  // data["two"] = 2;

  // Test object uses toEqual()
  expect(data).toEqual({ one: 1, two: undefined }); // need to use toStrictEqual() for undefined
});
// NOTE toEqual ignores object keys with undefined properties, undefined array items, array sparseness, or object type mismatch.
// Use toStrictEqual() instead
// {a: undefined, b: 2} !== {b: 2}
// [undefined, 1] !== [, 1]

test("adding positive numbers is not zero", () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      // Opposite matching not.toBe()
      expect(a + b).not.toBe(0);
    }
  }
});

// 2) Truthiness
// distinguish between undefined, null, false

test("null", () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined(); // match anything that is not undefined
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy(); // match when if statement treats as false
});

test("zero", () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});

// 3) Numbers
test("two plus two", () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});

// For floating point -> toBeCloseTo()
test("adding floating point numbers", () => {
  const value = 0.1 + 0.2;
  // expect(value).toBe(0.3); This won't work because of rounding error
  expect(value).toBeCloseTo(0.3);
});

// 4) Strings
// toMatch()

test("there is no I in team", () => {
  expect("team").not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect("Christoph").toMatch(/stop/);
});

// 5) Arrays and iterables
// toContain()

const shoppingList = [
  "diapers",
  "kleenex",
  "trash bags",
  "paper towels",
  "milk",
];

test("the shopping list has milk on it", () => {
  expect(shoppingList).toContain("milk");
  expect(new Set(shoppingList)).toContain("milk");
});

// 6) Exceptions
// test for function throws an error -> toThrow()

function compileAndroidCode() {
  throw new Error("you are using the wrong JDK!");
}

test("compiling android goes as expected", () => {
  expect(() => compileAndroidCode()).toThrow();
  expect(() => compileAndroidCode()).toThrow(Error);

  // String in error message
  expect(() => compileAndroidCode()).toThrow("you are using the wrong JDK");
  expect(() => compileAndroidCode()).toThrow(/JDK/);

  // match error message with regEx
  expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK!$/);
  expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK$/); // no '!' -> false
});

// 7) Asynchronous code
// In doc
