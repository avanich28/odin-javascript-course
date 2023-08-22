// - DevSage -

// Topic: Best Javascript Recursion Explanation on YouTube

// We don't know how many doll. So, we can't use for loop.

function factorial(n) {
  // 1) Base case (stopping condition)
  if (n === 1) return 1;
  // 2) Recursive case (call to itself)
  else return n * factorial(n - 1);
}
console.log(factorial(4)); // 24

// - CS50 -

// Topic: Recursion - CS50 Shorts
function collatz(n) {
  // 1) Base case
  if (n === 1) return 0;
  // 2) Recursive case
  // even number
  else if (n % 2 === 0) return 1 + collatz(n / 2);
  // odd number
  else return 1 + collatz(3 * n + 1);
}
console.log(collatz(3)); // 7 steps
// 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1

// 1 + collatz(3 * n + 1)
// 1 + 1 + collatz(n / 2)
// 1 + 1 + 1 + collatz(3 * n + 1)
// ...
