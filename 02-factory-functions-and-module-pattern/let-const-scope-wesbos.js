"use strict";

// - Wes Bos -

// Topic: How let and const are scoped in Javascript

// 1) var
// NOTE
// can be redefined/updated
// If var is declared in func, they are function scope.
// If var is not declared in func, they are global scope (available in the whole window)
// Scoping means where these variables available to me?

// Global scope
console.log(width); // undefined
var width = 100;
width = 200;
console.log(width); // 200

// Function scope
function setWidth() {
  console.log(width1); // undefined
  var width1 = 100; // IMPT local variable of setWidth function
  console.log(width1); // 100
}
setWidth();
// BUG need to move to global scope
// console.log(width1); // error

// FIXME
var width2;
function setWidth1() {
  width2 = 100;
  console.log(width2); // 100
}
setWidth1();
console.log(width2); // 100

// Other scopes
var age = 100;
if (age > 12) {
  // BUG Want dogYears to be temporary variable, not a global variable
  // If there are no function scoped, 'var' variables are going to be 'globally scoped' IMPT
  var dogYears = age * 7;
  console.log(`You are ${dogYears} dog years old!`);
}
console.log(dogYears); // 700

// let, const - block scope
// NOTE { curly brackets } is a block.
// Inside of that func or other elements will be scoped to the closest set of curly brackets.
var age1 = 100;
if (age1 > 12) {
  // FIXME 'let/const' or temporary variables can be accessed in this block scope only.
  let dogYears1 = age1 * 7;
  console.log(`You are ${dogYears1} dog years old!`);
}
// console.log(dogYears1); // error

// IMPT summary
// NOTE Declare variable in function
// var - function scope - local variable
// let/const - block scope (use strict) - local variable

// NOTE Declare variable in 'if' block
// var - global scope - global variable
// let/const - block scope - temporary variable
