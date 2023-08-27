"use strict";

// - The Odin Project -

// Topic: Efficiency basic

function oddNumbersLessThanTen() {
  let currentNumber = 1;

  while (currentNumber < 10) {
    if (currentNumber % 2 !== 0) {
      console.log(currentNumber);
    }
    currentNumber += 1;
  }
}
oddNumbersLessThanTen();

function oddNumbers(maxNumber) {
  let currentNumber = 1;

  while (currentNumber < maxNumber) {
    if (currentNumber % 2 !== 0) {
      console.log(currentNumber);
    }
    currentNumber += 1;
  }
}
oddNumbers(10);

// Topic: Asymptotic notations

// NOTE are used to describe the running time of an algorithm

// 1. Big O Notation
// represents the upper bound of an algorithm
// the worst case scenario for how the algorithm will perform

// 2. Omega notation
// represents the lower bound of an algorithm
// the best-case scenario.

// 3. Theta notation
// represents both the upper bound and lower bound
// the average case complexity of an algorithm

// Topic: What is Big O

// NOTE it gives a consistent way to measure the efficient of an algorithm

// It gives us a measurement for the time it takes for an algorithm to run as the input grows.

// measure how the number of steps changes as the data grows

// fastest to lowest
// O(1) - Constant Complexity
// O(log N) - Logarithmic Complexity
// O(N) - Linear Complexity
// O(N log N) - N x log N Complexity
// O(n²) - Quadratic Complexity
// O(n³) - Cubic Complexity
// O(2ⁿ) - Exponential Complexity
// O(N!) - Factorial Complexity

// O(1)
let arr = [1, 2, 3, 4, 5];
console.log(arr[2]); // single step O(1)
// O(1 + 2(steps)) -> O(1) drop bcs constant

// O(log n)
// Divide and conquer
// Binary Search

// O(n)
// the number of steps grow at the same rate of the number of items grows

// O(nlog n)
// merge sort
// Cartesian tree

// O(n^2)
// when loop over a data set and within each loop you loop over it again

// O(n^3)
// triple nested loop

// O(2^n)

// O(n!)
// permutations or combinations

// Topic: Alternative to Big O

// Big Ω (Omega notation)
function findValue(arr) {
  // O(n) item is not in the array
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i]; // O(1) first item in the array -> omega
    if (item === 1) {
      return item;
    }
  }
}
// theta - run in best case and worst case scenario

// Topic: Algorithm with the same complexity
function oddNumbers2(maxNumber) {
  let currentNumber = 1;

  while (currentNumber < maxNumber) {
    if (currentNumber % 2 !== 0) {
      console.log(currentNumber, ":D");
    }

    currentNumber += 1;
  }
}
oddNumbers2(10);
// time complexity = O(n)

function oddNumbers3(maxNumber) {
  let currentNumber = 1;

  while (currentNumber < maxNumber) {
    if (currentNumber % 2 !== 0) {
      console.log(currentNumber, ":)");
    }

    currentNumber += 2; // change here
  }
}
oddNumbers3(10);
// This is O(n/2), but Big O doesn't concern constants, so it will be O(n).
