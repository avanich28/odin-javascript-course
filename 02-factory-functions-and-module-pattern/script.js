"use strict";

// Topic: Factory Functions and the Module Pattern

// - Scrimba video -
// Constructor
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sayName = function () {
  console.log(this.name);
};

const jeff = new Person("Jeff", 33);

jeff.sayName();

// Factory Function
const personFactory = (name, age) => {
  const sayHello = () => console.log("hello");
  return { name, age, sayHello }; // factory! return obj
};
// return {name: name, age: age, sayHello: sayHello}; // condense

const jeff2 = personFactory("jeff", 27);
console.log(jeff2.name);

jeff2.sayHello();

// Short-hand
const name = "Maynard";
const color = "red";
const number = 34;
const food = "rice";
console.log({ name, color, number, food }); // {name: 'Maynard', color: 'red', number: 34, food: 'rice'}

// Scope
let a = 17;

const func = (x) => {
  let a = x; // 'a' inside scope
  return a;
};

a = func(99); // from func(99)
console.log(a); // 17 -> 99 when redefine a

// Factory
const FactoryFunction = (string) => {
  // NOTE private
  const capitalizeString = () => string.toUpperCase();
  const printString = () => console.log(`----${capitalizeString()}----`);
  return { printString }; // NOTE public
};

const taco = FactoryFunction("taco");

// printString(); // error
// capitalizeString(); // error
// taco.capitalizeString(); // error
taco.printString(); // ----TACO---

// Closure
// means the function retains the scope even if they are passed around and call outside of that scope.

// Allow us to create private variables and functions
const counterCreator = () => {
  let count = 0;
  return () => {
    console.log(count);
    count++;
  };
};

const counter = counterCreator();

counter();
counter();
counter();

// Example
const Player = (name, level) => {
  let health = level * 2;
  const getLevel = () => level;
  const getName = () => name;
  const die = () => {
    // uh oh
  };

  const damage = (x) => {
    health -= x;
    if (health <= 0) {
      die();
    }
  };

  const attack = (enemy) => {
    if (level < enemy.getLevel()) {
      damage(1);
      console.log(`${enemy.getName()} has damaged ${name}`);
    }

    if (level >= enemy.getLevel()) {
      enemy.damage(1);
      console.log(`${name} has damaged ${enemy.getName()}`);
    }
  };

  return { attack, damage, getLevel, getName };
};

const jimmie = Player("jim", 10);
const badGuy = Player("jeff", 5);
jimmie.attack(badGuy); // jim has damaged jeff

// jimmie.die(); // error

// Prototype inheritance in factory pattern
const Person2 = (name) => {
  const sayName = () => console.log(`my name is ${name}`);
  return { sayName };
};

const Nerd = (name) => {
  const { sayName } = Person2(name); // 💥
  const doSomethingNerdy = () => console.log("nerd stuff");
  return { sayName, doSomethingNerdy };
};

const jeff3 = Nerd("jeff");

jeff3.sayName();
jeff3.doSomethingNerdy();

const Nerd2 = (name) => {
  const prototype = Person2(name);
  const doSomethingNerdy = () => console.log("nerd stuff");
  return Object.assign({}, prototype, { doSomethingNerdy }); // targetObj, assignObj
};

console.log(Nerd2());

// Module Pattern
// Use IIFE
const calculator = (() => {
  // private func and var
  const add = (a, b) => a + b;
  const sub = (a, b) => a - b;
  const mul = (a, b) => a * b;
  const div = (a, b) => a / b;
  return { add, sub, mul, div };
})();

// Namespace
console.log(calculator.add(3, 5)); // 8

///////////////////////////////

// - Odin -

// 1) Factory Function Introduction
// IMPT factory return obj instead of using 'new' to create obj when you call function.

// Constructor
const Person3 = function (name, age) {
  this.sayHello = () => console.log("hello!");
  this.name = name;
  this.age = age;
};

const jeff4 = new Person("jeff", 27);

// Factory
const personFactory2 = (name, age) => {
  const sayHello = () => console.log("hello!");
  return { name, age, sayHello }; // TODO
};

const jeff5 = personFactory2("jeff", 27);
console.log(jeff5.name);
jeff5.sayHello();

// NOTE factory functions don't utilize the prototype, which does come with a performance penalty.

// Object shorthand
// return {name: name, age: age, sayHello: sayHello};
// return {name, age, sayHello}; // TODO

// console.log({name, color, number, food}); // TODO

// 2) Scope and Closure
// scope === variable access or when a piece of code is running what variables do I have access to.
// context === the value of this

// Base scope -> window obj
let aa = 1; // window.aa === aa (video)
// BUG
console.log(window.aa); // undefined (me)

// Child scope
function foo() {
  let b = 2;
  let aa = 2;
  console.log(window.aa); // undefined
  console.log(aa); // 2
}

function bar() {
  aa = 3;
  console.log(aa); // 3
}
foo();
// console.log(b); // error
bar();
console.log(aa); // 3

// NOTE continue at scope-todd.js and scope-wesbos.js IMPT

// 3) Private Variables and Functions
const FactoryFunction1 = (string) => {
  const capitalizeString = () => string.toUpperCase();
  const printString = () => console.log(`---${capitalizeString()}---`); // IMPT Closure / private func
  return { printString }; //IMPT return obj / public obj
};

const taco1 = FactoryFunction("taco");

// printString(); // Error
// capitalizeString(); // Error
// taco1.capitalizeString(); // Error
taco1.printString(); // ---TACO---

// Ex
const counterCreator1 = () => {
  // Closure
  // NOTE allow us to create private variables and functions.
  let count = 0; // Can't access from outside, just only counter func
  return function () {
    console.log(count);
    count++;
  };
};

const counter1 = counterCreator(); // return func
counter1(); // 0
counter1(); // 1

// 4) Back to Factory Functions
// The func that returns obj.

// Ex. want objects to describe our players and encapsulate all of the things our players can do (functions!).
const Player1 = (name, level) => {
  // NOTE Encapsulated
  let health = level * 2;
  const getLevel = () => level;
  const getName = () => name;
  const die = () => {
    // uh oh
  };

  const damage = (x) => {
    health -= x;
    if (health <= 0) {
      die();
    }
  };

  const attack = (enemy) => {
    if (level < enemy.getLevel()) {
      damage(1);
      console.log(`${enemy.getName()} has damaged ${name}`);
    }
    if (level >= enemy.getLevel()) {
      enemy.damage(1);
      console.log(`${name} has damaged ${enemy.getName()}`);
    }
  };

  return { attack, damage, getLevel, getName };
};
const jimmie1 = Player("jim", 10);
const badGuy1 = Player("jeff", 5);
jimmie1.attack(badGuy1); // jim has damaged jeff

// 4.1) Inheritance with factories
const Person1 = (name) => {
  const sayName = () => console.log(`my name is ${name}`);
  return { sayName };
};

const Nerd1 = (name) => {
  // simply create a person and pull out the sayName function with destructing assignment syntax!
  // sayName = func
  // IMPT
  const { sayName } = Person(name);
  const doSomethingNerdy = () => console.log("nerd stuff");
  return { sayName, doSomethingNerdy };
};
const jeff6 = Nerd("jeff");
jeff6.sayName(); // my name is jeff
jeff6.doSomethingNerdy(); // nerd stuff

// or use Object.assign()
const Nerd3 = (name) => {
  const prototype = Person(name); // {sayName}
  const doSomethingNerdy = () => console.log("nerd stuff");
  // IMPT
  return Object.assign({}, prototype, { doSomethingNerdy });
};

// - MDN -
// Object.assign(target, ...sources)

// Copy all enumerable own properties

// BUG
// Object.assign() doesn't throw on null or undefined.
// Not Deep Clone {a: 0, b: {c: 0}} -> Copy only property value
// If the source value is a reference to an object, it only copies the reference value!
// IMPT merging objects
const o1 = { a: 1 };
const o2 = { b: 2 };
const o3 = { c: 3 };

const obj = Object.assign(o1, o2, o3);
console.log(obj);
console.log(o1); // { a: 1, b: 2, c: 3 }, target object itself is changed. BUG

// IMPT merging objects with same property
const o4 = { a: 1, b: 1, c: 1 };
const o5 = { b: 2, c: 2 };
const o6 = { c: 3 };

const obj1 = Object.assign({}, o4, o5, o6);
console.log(obj1); // { a: 1, b: 2, c: 3 }

// Copying symbol-typed properties
const o7 = { a: 1 };
const o8 = { [Symbol("foo")]: 2 };

const obj2 = Object.assign({}, o7, o8);
console.log(obj); // { a : 1, [Symbol("foo")]: 2 }

// - Medium -
// Topic: 3 Different Kinds of Prototypal Inheritance: ES6+ Edition
// NOTE
// Method delegation can preserve memory resources because you only need one copy of each method to be shared by all instances.

// - Fun Fun Functions -
// Topic: Composition over Inheritance
// NOTE
// Inheritance is when you design your types around what they are. -> class
// Composition is when you design your types around what they do. -> function factory + functional inheritance
// NOTE
// Class - hard to predict what they are
// Composition - more flexible to set the object

// Composition
// Dog + Robot
const barker = function (state) {
  return { bark: () => console.log("Woof, I am " + state.name) };
};

// Robot
const driver = (state) => ({
  drive: () => (state.position = state.position + state.speed),
});

// Dog + Robot
const killer = (state) => ({ action: "Bite" });

barker({ name: "karo" }).bark(); // Woof, I am karo

// Factory function
const murderRobotDog = (name) => {
  let state = {
    name,
    speed: 100,
    position: 0,
  };

  return Object.assign({}, barker(state), driver(state), killer(state));
};

murderRobotDog("sniffles").bark(); // Woof, I am sniffles

// 5) The Module Pattern
// The difference from factory function is how they're created.
// The module wraps the factory in an IIFE.
// cannot use over and over again to  create multiple object
const calculator1 = (() => {
  const add = (a, b) => a + b;
  const sub = (a, b) => a - b;
  const mul = (a, b) => a * b;
  const div = (a, b) => a / b;
  return {
    add,
    sub,
    mul,
    div,
  };
})();

console.log(calculator1.add(3, 5)); // 8

// IMPT Namespacing is a technique that is used to avoid naming collisions in our programs.
// Ex. calculator.add(), displayController.add(), operatorStack.add().