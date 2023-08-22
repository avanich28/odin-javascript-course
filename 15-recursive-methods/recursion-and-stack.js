// - Javascript.info -

// Topic: Recursion and stack

// Recursion is the process that a function calls itself.

// 1) Two ways of thinking
console.log(Math.pow(2, 2));
console.log(Math.pow(2, 3));
console.log(Math.pow(2, 4));

// 1.1 Iterative: for loop
function pow(x, n) {
  let result = 1;

  // multiply results by x n times in the loop
  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
console.log(pow(2, 3)); // 8

// 1.2 Recursive thinking: simplify the task and call self
function pow(x, n) {
  return n === 1 ? x : x * pow(x, n - 1);
}

console.log(pow(2, 3)); // 8
// IMPT The maximal number of nested calls (including the first one) is called recursion depth. In this case, it is n.
// max n = 10000
// 2 * pow(x, n-1)
// 2 * 2 * pow(x, n-1)
// 2 * 2 * 2

// 2) The execution context and stack

// The execution context is an internal data structure that contains details about the execution of a function.

// NOTE loop is more memory-saving than recursion and don't depend on n

// 3) Recursive traversals
let company = {
  sales: [
    {
      name: "John",
      salary: 1000,
    },
    {
      name: "Alice",
      salary: 1600,
    },
  ],

  development: {
    sites: [
      {
        name: "Peter",
        salary: 2000,
      },
      {
        name: "Alex",
        salary: 1800,
      },
    ],

    internals: [
      {
        name: "Jack",
        salary: 1300,
      },
    ],
  },
};

function sumSalaries(department) {
  if (Array.isArray(department)) {
    return department.reduce((prev, cur) => prev + cur.salary, 0);
  } else {
    let sum = 0;
    for (let subdep of Object.values(department)) {
      sum += sumSalaries(subdep);
    }
    return sum;
  }
}
console.log(sumSalaries(company)); // 7700

// 4) Recursive structures

// NOTE The problems with arrays are the 'delete element' and 'insert element'. It takes time to renumber all elements and quite slow for big queue respectively.
// So, we use linked list instead

// 4.1 Linked List
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null,
      },
    },
  },
};
console.log(list);

// prepend the new value to the list
list = { value: "new item", next: list };
console.log(list);

// jump over 1 to value 2
// 1 will automatically removed from the memory
list.next = { value: "hello", next: list.next };
console.log(list);

// NOTE lists are not always better than arrays because it hard to access the element.
// It needs to start from the first item, not like array arr[n].

// 5) Tasks
// 5.1 Sum all numbers till the given one

// for loop
function sumTo(num) {
  let sum = 0;
  for (let i = 0; i < num; i++) {
    sum += num - i;
  }
  return sum;
}
console.log(sumTo(100)); // 5050

// recursion (slowest - execution stack management)
function sumToRecur(num) {
  return num === 1 ? num : (num += sumToRecur(num - 1));
}
console.log(sumToRecur(100)); // 5050

// arithmetic progression (fastest - use only 3 operations)
function sumToArithmetic(n) {
  return (n * (n + 1)) / 2;
}
console.log(sumToArithmetic(100));

// An = A1 + (n - 1)d
// S = n(A1 + An) / 2

// 5.2 Calculate factorial
function factorial(n) {
  return n === 1 ? n : n * factorial(n - 1);
}
console.log(factorial(5)); // 120

// 5.3 Fibonacci numbers
function fib(n) {
  let a = 0;
  let b = 1; // อยู่ 1 2
  for (let i = 1; i < n; i++) {
    let c = a + b; // หา 2 3
    a = b;
    b = c;
  }
  return b;
}
console.log(fib(3)); // 0 + 1 + 1 = 2

// Cannot use for large number!
function fibRecur(n) {
  return n <= 1 ? n : fibRecur(n - 1) + fibRecur(n - 2);
}
console.log(fibRecur(3)); // 2

// 5.4 Output a single-linked list
let list2 = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null,
      },
    },
  },
};

function printList(list) {
  console.log(list.value);
  if (list.next) {
    printList(list.next);
  }
}
printList(list2);

function printListLoop(list) {
  let temp = list;
  while (temp) {
    console.log(temp.value);
    temp = temp.next;
  }
}
printListLoop(list2);

// NOTE the loop is more effective, but the recursive is shorter and easier to understand.

// 5.5 Output a single-linked list in the reverse order
function printReverse(list) {
  if (list.next) {
    printReverse(list.next);
  }
  console.log(list.value);
}
printReverse(list2);

function printReverseLoop(list) {
  const arr = [];
  let temp = list;

  while (temp) {
    arr.push(temp.value);
    temp = temp.next;
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    console.log(arr[i]);
  }
}
printReverseLoop(list2);
