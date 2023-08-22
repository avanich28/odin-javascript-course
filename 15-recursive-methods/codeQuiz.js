// - CodeinGame -

// 1) Sum all numbers
function sumRange(n) {
  if (n === 1) return 1;
  else return n + sumRange(n - 1);
}
console.log(sumRange(3));

// 2) Power function
function power(b, n) {
  if (n === 0) return 1;
  return b * power(b, n - 1);
}
console.log(power(2, 4));

// 3) Calculate factorial
function factorial(n) {
  if (n === 1) return 1;
  else return n * factorial(n - 1);
}
console.log(factorial(5)); // 120

// 4) Check all values in an array
function all(arr) {
  if (arr.length === 0) return true;
  if (arr[arr.length - 1] > 7) return false;
  else {
    arr.pop();
    return all(arr);
  }
}
console.log(all([1, 9, 3]));

// 5) Product of an array
function productOfArray(arr) {
  if (arr.length === 0) return 1;
  return arr.pop() * productOfArray(arr);
}
console.log(productOfArray([1, 2, 3, 10])); // 60

// 6) Search JS Object
let nestedObject = {
  data: {
    info: {
      stuff: {
        thing: {
          moreStuff: {
            magicNumber: 44,
            something: "foo2",
          },
        },
      },
    },
  },
};

// 🔥
function contains(obj, value) {
  for (let key in obj) {
    if (obj[key] === value) return true;
    if (typeof obj[key] === "object") return contains(obj[key], value);
  }
  return false;
}
console.log(contains(nestedObject, "xx"));

// 7) Parse a multi-dimensional array
function totalInteger(arr) {
  let count = 0;
  for (let el of arr) {
    if (Number.isInteger(el)) count++;
    if (Array.isArray(el)) count += totalInteger(el);
  }
  return count;
}
console.log(totalInteger([[[5], 3], 0, 2, ["foo"], [], [4, [5, 6]]])); // 7

// Solution 🔥
function totalInteger2(arr) {
  if (arr.length === 0) return 0;

  let total = 0;
  let first = arr.shift();

  if (Array.isArray(first)) total += totalInteger2(first);
  else if (Number.isInteger(first)) total += 1;

  return total + totalInteger2(arr);
}
console.log(totalInteger2([[[5], 3], 0, 2, ["foo"], [], [4, [5, 6]]])); // 7
// t = 0 + 0 + 1

// 8)
function sumSquare(arr) {
  let square = 0;
  for (let el of arr) {
    if (Array.isArray(el)) square += sumSquare(el);
    else square += Math.pow(el, 2);
  }
  return square;
}
console.log(sumSquare([1, 2, 3]));
console.log(sumSquare([[1, 2], 3]));
console.log(sumSquare([[[[[[[[[1]]]]]]]]]));
console.log(sumSquare([10, [[10], 10], [10]]));
// s = (0 + (((0 + 1) + 4)) + 9

// 9)
function replicate(time, value) {
  // Base Case
  if (time === 0) return [];
  // Recursive Case
  else return [value].concat(replicate(time - 1, value));
}
console.log(replicate(3, 5)); // [5, 5, 5]
