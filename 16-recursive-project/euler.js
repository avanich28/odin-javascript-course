"use strict";

// 1
const sumMultipleNum = function (n) {
  if (n <= 0) return null;
  n--;
  return n % 3 === 0 || n % 5 === 0 ? n + sumMultipleNum(n) : sumMultipleNum(n);
};
const output = sumMultipleNum(1000);
console.log(output);

// 2
const sumEvenFibonacci = function (value) {
  let a = 1;
  let b = 2;
  let sum = 0;

  while (a <= value) {
    let temp = a;
    a = b;
    b += temp;
    if (temp % 2 === 0) {
      sum += temp;
    }
  }
  return sum;
};
console.log(sumEvenFibonacci(4e6)); // 4613732

// 3
const findLargestPrime = function (value) {
  let i = 2;

  while (i <= value) {
    if (value % i === 0) {
      value /= i;
    } else {
      i++;
    }
  }
  return i;
};
console.log(findLargestPrime(600851475143));

// 5
const isPalindrome = function (n) {
  let prime = [2];
  let notPrime = [];
  let splitNotPrime = [];

  for (let i = 3; i <= n; i++) {
    for (let j = 2; j < i; j++) {
      if (i % j === 0) {
        notPrime.push(i);
        break;
      }
      if (j === i - 1) {
        prime.push(i);
      }
    }
  }

  let result = 1;
  for (let num of prime) {
    result *= num;
  }

  for (let num of notPrime) {
    let i = 2;
    while (i <= num) {
      if (num % i === 0) {
        num /= i;
        splitNotPrime.push(i);
      } else {
        i++;
      }
    }
  }

  // let i = 2;
  // let k = n % 2 === 0 ? n - 1 : n;
  // while (i <= k) {
  //   console.log(k);
  //   if ((result * i) % n === 0) {
  //     result *= i;
  //     break;
  //   } else {
  //     i++;
  //     console.log(i);
  //   }
  // }
  return result;
};
isPalindrome(10);
