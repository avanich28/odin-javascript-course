"use strict";
// - Khan Academy -

// Topic: Stepping Through Recursive Fibonacci Function

function fibonacci(n) {
  if (n < 2) return n;
  else return fibonacci(n - 1) + fibonacci(n - 2);
}
const output = fibonacci(8);
console.log(output);

// - Medium -

// Topic: Recursive Fibonacci Method

function fibonacci2(n) {
  if (n < 2) return Number;
  else return fibonacci2(n - 1) + fibonacci2(n - 2);
}
