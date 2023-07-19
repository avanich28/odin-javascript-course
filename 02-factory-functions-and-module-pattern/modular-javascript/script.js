"use strict";

// Topic: Javascript Tutorial on the Object Literal Pattern

// - Rules -
// 1. Self-contained module
// Everything to do with module is in my module
// No global variable
// If a module manages  more than ont thing it should be split up.
// 2. Separation of concerns
// 3. DRY code
// 4. efficient DOM usage
// very few$(selections)
// 5. no memory leaks
// all event can be unbound

// Object literal
const myModule = {
  name: "Will",
  age: 34,
  sayName: function () {
    console.log(this.name);
  },
  setName: function (newName) {
    this.name = newName;
  },
};
myModule.setName("Willis");
myModule.sayName(); // Willis

// Topic: Revealing Module Pattern
// 1.toString() // error
// (1).toString // not error
const people = (function () {
  const name = "Will";

  function sayName() {
    console.log(name);
  }

  return {
    sayName,
    name: "bob",
  };
})();
