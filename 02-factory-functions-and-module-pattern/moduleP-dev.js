"use strict";

// - DEV -
// Topic: Module pattern in JavaScript

// 3) For testing
const documentMock = (() => ({
  querySelector: (selector) => ({ innerHTML: null }),
}))();

// 1) Defining a module
const Formatter = (function (doc) {
  // Public property (arr, obj, primitives)
  let timesRun = 0; // After return, can't change bcs value is primitive
  const timesRun2 = []; // After return, can change bcs value is reference to memory address in the heap
  // Love you Jonas! ❤️‍🔥

  // private func
  // Can access within the module only
  const log = (msg) => console.log(`[${Date.now()}] Logger: ${msg}`);
  const setTimesRun = () => {
    log("setting times run");
    ++timesRun;
    // BUG Closure
    console.log(timesRun); // 1 2 3
  };

  const makeUppercase = (text) => {
    // TODO
    log("Making uppercase");
    // BUG Closure
    setTimesRun();
    console.log(timesRun); // 1 2 3
    // FIXME
    timesRun2.push(null);
    return text.toUpperCase();
  };
  console.log(timesRun, timesRun2);

  // 3) Declaring module dependencies
  // Normally, module is closed entities.
  // But, we may want to work with DOM or global obj.
  // So, module may have dependencies!
  const writeToDOM = (selector, msg) => {
    // Check DOM exist -> use mock instead
    // if (!doc && "querySelector" in doc) {
    doc.querySelector(selector).innerHTML = msg;
    // }
  };

  // 2) Exposing a module
  return {
    makeUppercase,
    timesRun, // BUG
    timesRun2,
    writeToDOM,
  };
})(document || documentMock); // 3)

// BUG module doesn't return anything
// Formatter.log("Hello"); // TypeError: Cannot read properties of undefined

console.log(Formatter.makeUppercase("tomek")); // TOMEK
console.log(Formatter.makeUppercase("tomek"));
console.log(Formatter.makeUppercase("tomek"));

// 2)
// BUG
console.log(Formatter.timesRun); // 0

// Can overwritten
Formatter.timesRun = 10;
console.log(Formatter.timesRun); // 10

// FIXME
console.log(Formatter.timesRun2.length); // 3

// 3)
// Formatter.writeToDOM("#target", "Hi there");
