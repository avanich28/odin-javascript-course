"use strict";

// - A Drip of Javascript
// Topic: An Introduction to IIFEs - Immediately Invoked Function Expressions

// NOTE
// Anything within the parentheses is part of an expression
(function () {
  /* logic here */
});

// Anything after the not operator is part of an expression
!function () {
  /* logic here */
};

// IMPT The key thing about JavaScript expressions is that they return values. In both cases above the return value of the expression is the function.

// expression -> return func -> call ()
(function () {
  // logic here
})();

// NOTE IIFE obtain data privacy.
// cannot access from the outside
(function () {
  var foo = "bar";

  // Outputs: "bar"
  console.log(foo);
})();

// ReferenceError: foo is not defined
// console.log(foo);

// pass arg
var foo = "foo";

(function (innerFoo) {
    // Outputs: "foo"
    console.log(innerFoo);
})(foo);