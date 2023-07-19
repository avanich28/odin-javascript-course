"use strict";

// - coryrylan -
// Topic:JavaScript Module Pattern Basics

// Modules are commonly used as singleton style objects where only one instance exists.
// IMPT '_' for private method & property

const myModule = (function () {
  const _privateProperty = "Hello World";
  const publicProperty = "I am a public property";

  function _privateMethod() {
    console.log(_privateProperty);
  }

  function publicMethod() {
    _privateMethod();
  }

  return {
    publicMethod: publicMethod,
    publicProperty: publicProperty,
  };
})();

myModule.publicMethod(); // Hello World
console.log(myModule.publicProperty); // I am a public property
console.log(myModule._privateProperty); // undefined
// myModule._privateMethod(); // Uncaught TypeError: myModule._privateMethod is not a function

// Module Pattern + Prototype Inheritance/ES6 Classes
