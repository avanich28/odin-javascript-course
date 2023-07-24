"use strict";

// - Dmitri Pavlutin -
// Topic: Gentle Explanation of 'this' in Javascript

// Table of Contents

// 1. The mystery of this

// 2. Function invocation
// 2.1. this in a function invocation
// 2.2. this in a function invocation, strict mode
// 2.3. Pitfall: this in an inner function

// 3. Method invocation
// 3.1. this in a method invocation
// 3.2. Pitfall: separating method from its object

// 4. Constructor invocation
// 4.1. this in a constructor invocation
// 4.2. Pitfall: forgetting about new

// 5. Indirect invocation
// 5.1. this in an indirect invocation

// 6. Bound function
// 6.1. this inside a bound function
// 6.2. Tight context binding

// 7. Arrow function
// 7.1. this in arrow function
// 7.2. Pitfall: defining method with an arrow function

// 8. Conclusion

////////////////////////////

// Invocation means executing a piece of code to retrieve the code's value.

// 1) The mystery of this
// 'this' is the context of a function invocation. There are 4 types:
// - function invocation: alert()
// - method invocation: obj.method()
// - constructor invocation: new Obj()
// - indirect invocation: .call()

// NOTE
// Invocation of a function is executing the code that makes the body of a function, or simply calling the function. For example parseInt function invocation is parseInt('15').

// Context of an invocation is the value of this within function body.

// Scope of a function is the set of variables and functions accessible within a function body.

// 2) Function invocation
function hello(name) {
  return "Hello " + name + "!";
}

// Function invocation
let message = hello("World");

// method invocation
// obj.myFunc()

// IIFE is also function invocation
message = (function (name) {
  return "Hello " + name + "!";
})("World");

// NOTE 'this' keyword
// 2.1) no strict mode
// this is the global object which is 'window' object.

// 2.2) strict mode
// this is 'undefined'
// execution context is not the global obj
// The strict mode is active not only in the current scope but also in the inner scopes

// 2.3) this in an inner function
// this is 'undefined' or window obj (no strict mode)
// In method invocation, this is an object.

// 2.4) this in arrow function
// lexical this (this of surrounding function)

// 3) Method invocation
// NOTE
// requires property accessor form to call the function obj.myFunc() or obj['myFunc']().

// 3.1) this in a method invocation
// this = the obj that owns the method in a method invocation
// A bound function IMPT const alone = myObj.myMethod.bind(myObj) fixes the context by binding this the object that owns the method.

// 3.2. Pitfall: separating method from its object
// BUG Careful - setTimeout will not call as myCat.logInfo() because myCate.logInfo is function. So, there are no any obj attached with when func is called. -> this = undefined/Error(strict mode)
function Pet(type, legs) {
  this.type = type;
  this.legs = legs;

  this.logInfo = function () {
    console.log(this === myCat); // false
    console.log(`The ${this.type} has ${this.legs} legs`);
  };
}

const myCat = new Pet("Cat", 4);

// BUG This is functional invocation / no obj attached with
// logs 'The undefined has undefined legs'
// or throw a TypeError in strict mode
console.log(setTimeout(myCat.logInfo, 1000)); // The undefined has undefined legs

// FIXME.bind() returns new func / this = myCat
const boundLogInfo = myCat.logInfo.bind(myCat);
console.log(setTimeout(boundLogInfo, 1000)); // The Cat has 4 legs

// FIXME arrow func / this lexically
// or class with arrow func
function Pet2(type, legs) {
  this.type = type;
  this.legs = legs;

  this.logInfo = () => {
    console.log(this === myCat2); // true
    console.log(`The ${this.type} has ${this.legs} legs`);
  };
}

// myCat2 = this = {}
const myCat2 = new Pet2("Cat", 4);
console.log(setTimeout(myCat.logInfo, 1000));

// 4) Constructor invocation
// new keyword
// new Pet('cat', 4),  new RegExp('\\d)
// NOTE If the constructor is called without arguments, then the parenthesis pair can be omitted: new Country.
// JS also defines constructors using class syntax.
// NOTE The role of the constructor function is to initialize the instance. A constructor call creates a new empty object, IMPT which inherits properties from the constructor's prototype.
// new myObject.myFunction() = a constructor invocation, not a method invocation

// 4.1) this in a constructor invocation
// NOTE this is the newly created object in a constructor invocation.

// class syntax: when new Bar() is executed, JS creates an empty obj and makes it the context of the constructor() method.

// 4.2) Pitfall: forgetting about new
// NOTE Some JS function create instances not only when invoked as constructors, but also as functions.
const reg1 = new RegExp("\\w+");
const reg2 = RegExp("\\w+");

reg1 instanceof RegExp; // true
reg2 instanceof RegExp; // true
console.log(reg1.source === reg2.source); // true = JS creates equivalent regEx objects

// BUG If we call car = Vehicle('Car', 4), 'this' keyword will equal to 'window' and not create a new obj!

// 5) Indirect invocation
// when a function is call by myFun.call() or myFun.apply()

// In JS, function is first-class obj
// Func obj -> method: .call() .apply()
function sum(num1, num2) {
  return num1 + num2;
}
sum.call(undefined, 10, 2); // 12
sum.apply(undefined, [10, 2]); // 12

// 5.1) this in an indirect invocation
// NOTE this is the first argument of .call() or.apply() in as indirect invocation.
const rabbit2 = { name: "White Rabbit" };

function concatName(str) {
  console.log(this === rabbit2); // true
  return str + this.name;
}

concatName.call(rabbit2, "Hello "); // Hello White Rabbit
concatName.apply(rabbit2, ["Bye "]); // Bye White Rabbit

// Creating hierarchies of classes
function Runner(name) {
  console.log(this instanceof Rabbit); // true
  this.name = name;
}

function Rabbit(name, countLegs) {
  console.log(this instanceof Rabbit); // true
  // NOTE indirect call parent constructor
  Runner.call(this, name);
  this.countLegs = countLegs;
}

const myRabbit = new Rabbit("White Rabbit", 4);
console.log(myRabbit); // {name: 'White Rabbit', countLegs: 4}

// 6) Bound function
// NOTE A function whose context and/or arguments are bound to specific values.
// .bind() IMPT only return a new func
function multiply(num) {
  return this * num;
}

const double = multiply.bind(2);
// invoke bound func
console.log(double(3)); // 2 * 3

// 6.1) this inside a bound function
// NOTE this is the fist argument of myFunc.bind(thisArg)

const numbers = {
  array: [3, 5, 10],

  getNumbers() {
    return this.array;
  },
};

// Bound function
const boundGetNumbers = numbers.getNumbers.bind(numbers);
console.log(boundGetNumbers()); // [3, 5, 10]

// Extract method from obj
const simpleGetNumbers = numbers.getNumbers;
// console.log(simpleGetNumbers()); // error => this = undefined / window (no strict mode)

// 6.2) Tight context binding
// IMPT .bind() makes a permanent context link.
// .bind() can't change its linked context when using .call() or .apply() or re-bound
// Only the constructor invocation can change.
function getThis() {
  return this;
}

const one = getThis.bind(1);
// Not change the context
one(); // 1
one.call(2); // 1
one.apply(2); // 1
one.bind(2); // 1

console.log(new one()); // {} IMPT change the context of the bound function

// 7) Arrow function
// NOTE
// lexical this

// 7.1) this in arrow function
// NOTE
// 'this' is the enclosing context where the arrow function is defined.
// Arrow func define in the topmost scope => this = window

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  log() {
    console.log(this === myPoint); // 879
    setTimeout(() => {
      console.log(this === myPoint); // true
      console.log(this.x + ":" + this.y);
    }, 1000);
  }
}

const myPoint = new Point(95, 165);
myPoint.log();

// this cannot be modify in arrow func => lexical this forever
const numbers2 = [1, 2];

(function () {
  // Arrow
  const get = () => {
    console.log(this === numbers2); // true
    return this;
  };

  console.log(this === numbers2); // true
  get(); // [1, 2]

  // Try to change arrow function context manually -> no effect
  get.call([0]); // [1, 2]
  get.apply([0]); // [1, 2]
  get.bind([0])(); // [1, 2]

  // BUG Arrow cannot be used as constructor
  // new get() -> Error
}).call(numbers2);

// 7.2) Pitfall: defining method with an arrow function
function Period(hours, minutes) {
  this.hours = hours;
  this.minutes = minutes;
}
Period.prototype.format = () => {
  // BUG
  // arrow define in global scope
  // this = window
  // arrow is a static context IMPT
  // not change on diff invocation types
  console.log(this === window); // true
  return this.hours + ` hours and ` + this.minutes + " minutes ";
};

Period.prototype.format = function () {
  // FIXME
  // use expression func
  // change its context depending on invocation IMPT
  console.log(this === walkPeriod); // true
  return this.hours + ` hours and ` + this.minutes + " minutes ";
};

const walkPeriod = new Period(2, 30);
console.log(walkPeriod.format());
// BUG undefined hours and undefined minutes
// FIXME 2 hours and 30 minutes

// 8) Conclusion
// NOTE WHERE is 'this' taken from?
// => How is the 'function invoked'?
// => What is 'this' inside the outer function where the arrow function is defined?
