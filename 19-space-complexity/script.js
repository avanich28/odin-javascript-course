"use strict";

// - The Odin Project -

// Topic: Space complexity

// Big O notation (same as time complexity)
// O(1) - Constant Complexity
// O(log N) - Logarithmic Complexity
// O(N) - Linear Complexity
// O(N log N) - N x log N Complexity
// O(n²) - Quadratic Complexity
// O(n³) - Cubic Complexity
// O(2ⁿ) - Exponential Complexity
// O(N!) - Factorial Complexity

/////////////////////////////

// - DEV (Megan)

// Topic: Big O: SPace Complexity

// IMPT
// Space complexity is how much total space the algorithm take up

// Auxiliary space is how much space is used temporarily to run part of an algorithm

// Auxiliary space ignores the input size of the data structure

// IMPT But in the case of a recursive function or a function calling another function inside of itself, extra space is needed in order to hold the values that are waiting to be executed.

function getSum(x, y, z) {
  let sum = x + y + z;
  return sum;
}
// space complexity = O(1)

function getSum2(arr) {
  let sum = 0;
  let cloneArr = arr;
  for (let i in cloneArr) {
    sum += arr[i];
  }
  return sum;
}
// O(n)
// IMPT the data structure was created for use by many different methods, then the space complexity for all those methods is O(N) when they aren’t utilizing additional space.

function getSum3(arr) {
  let size = arr.length;
  if (size === 1) {
    return arr[0];
  } else {
    return arr[0] + getSum3(arr.slice(1));
  }
}
console.log(getSum3([1, 2, 3]));
// O(1)
// in each function, space needs to be made for the value to being stored on the stack.

///////////////////////////

// - DEV Marshall -

// Topic: Recursion and Space Complexity

// IMPT Space complexity in algorithm development is a metric for how much storage space the algorithm needs in relation to its inputs.
