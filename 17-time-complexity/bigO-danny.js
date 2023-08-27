"use strict";

// - Doable Danny -

// Topic: Big O Notation in JavaScript | The Ultimate Beginners Guide with Examples

// Big O tells us how long a function will take to execute or how much space the function takes up as the input to that function approaches infinity.

// The scalability of an algorithm refers to how much the algorithm slows down when we increase the size of the input to the algorithm.

// IMPT “Time complexity”: analyzing how the runtime of an algorithm changes as the input increases.

// Example 3: O(n^2)
function multiplyAll(arr1, arr2) {
  if (arr1.length !== arr2.length) return undefined;

  let total = 0;
  for (let i of arr1) {
    for (let j of arr2) {
      total += i * j;
    }
  }
  return total;
}

let result1 = multiplyAll([1, 2], [5, 6]);
console.log(result1); // 33
// O(3 * n^2) -> O(n^2) (n is infinity)

// Example 4: O(log n)
function logTime(arr) {
  let numberOfLoops = 0;

  for (let i = 1; i < arr.length; i *= 2) {
    numberOfLoops++;
  }
  return numberOfLoops;
}
let loopsA = logTime([1]); // 0 loops
let loopsB = logTime([1, 2]); // 1 loop
let loopsC = logTime([1, 2, 3, 4]); // 2 loops
let loopsD = logTime([1, 2, 3, 4, 5, 6, 7, 8]); // 3 loops
let loopsE = logTime(Array(16)); // 4 loops

// Example 5: O(nlog n)
// Linearithmic time complexity
function lineararithmic(n) {
  for (let i = 0; i < n; i++) {
    for (let j = 1; j < n; j *= 2) {
      console.log("Hello");
    }
  }
}
lineararithmic(4); // 8 times

// Example 6: O(2^n)
function fibonacci(num) {
  // Base case
  if (num <= 1) return num;

  // Recursive case
  return fibonacci(num - 1) + fibonacci(num - 2);
}
console.log(fibonacci(3)); // 2

// Example 7: O(n!)
// permutations abc 3 * 2 * 1 = 6
