import { mock } from "node:test";
import { forEach } from "./forEach";

// 1) Using a mock function
const mockCallback = jest.fn((x) => 42 + x);

test("forEach mock function", () => {
  forEach([0, 1], mockCallback);

  console.log(mockCallback);
  // The mock function was called twice
  expect(mockCallback.mock.calls).toHaveLength(2);

  // The first argument of the first call to the function was 0
  expect(mockCallback.mock.calls[0][0]).toBe(0);

  // The first argument of the second call to the function was 1
  expect(mockCallback.mock.calls[1][0]).toBe(1);

  // The return value of the first call to the function was 42
  expect(mockCallback.mock.results[0].value).toBe(42);
});

function greetWorld(greetingFn) {
  return greetingFn("world");
}

test("greetWorld calls the greeting function properly", () => {
  // Want to test greetWord function
  const greetImplementation = (name) => `Hey, ${name}!`;
  const mockFn = jest.fn(greetImplementation);
  const value = greetWorld(mockFn);

  expect(mockFn).toHaveBeenCalled();
  expect(mockFn).toHaveBeenCalledWith("world");
  expect(value).toBe("Hey, world!");
});

// 2) .mock property
const myMock1 = jest.fn();
const a = new myMock1();
console.log(myMock1.mock.instances); // [mockConstructor {}] -> a instance

// track the value of this
const myMock2 = jest.fn();
const b = {};
const bound = myMock2.bind(b);
bound();
console.log(myMock2.mock.contexts); // [{}] -> b this

// 3) Mock Return Values
const myMock = jest.fn();
console.log(myMock()); // undefined

myMock.mockReturnValueOnce(10).mockReturnValueOnce("x").mockReturnValue(true);
console.log(myMock(), myMock(), myMock(), myMock()); // 10, 'x', true, true

const filterTestFn = jest.fn();
filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);
// console.log(filterTestFn(), filterTestFn()); // true false

const result = [11, 12].filter((num) => filterTestFn(num));

console.log(result); // [11]
console.log(filterTestFn.mock.calls[0][0]); // 11
console.log(filterTestFn.mock.calls[1][0]); // 12
