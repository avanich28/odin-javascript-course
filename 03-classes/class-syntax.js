"use strict";

// - Javscript.info -

// Topic: Class basic syntax

// 1) The "class syntax"
class User {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    console.log(this.name);
  }
}
// Usage:
let user = new User("John");
user.sayHi(); // John

// 1. new obj create (new operator)
// 2. constructor runs with the given argument and assigns it to this.name

// 2) What is a class?
// In JS, class is a function
console.log(typeof User); // function
// NOTE The function code is taken from the constructor method!

// Constructor and method are in prototype
console.log(User === User.prototype.constructor); // true

console.log(User.prototype.sayHi);

console.log(Object.getOwnPropertyNames(User.prototype)); //  ['constructor', 'sayHi']

// 3) Not just a syntactic sugar
// NOTE
// Must be call with 'new'
// A class sets enumerable flag to false.
// Classes automatically use strict mode.

// 4) Class Expression
// Class Expression
let User1 = class {
  sayHi() {
    console.log("Hello");
  }
};
console.log(new User1());

// Name Class Expression
let User2 = class MyClass {
  sayHi() {
    console.log(MyClass); // visible inside
  }
};
new User2().sayHi();
// console.log(MyClass); // not visible outside
console.log(new User2()); // MyClass {}

// on-demand
function makeClass(phrase) {
  // declare a class and return it
  return class {
    sayHi() {
      console.log(phrase);
    }
  };
}

// Create a new class
let User3 = makeClass("Hello");
new User3().sayHi(); // Hello

// 5) Getters/setters
class User4 {
  constructor(name) {
    // invokes the setter
    this.name = name;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (value.length < 4) {
      console.log("Name is too short.");
      return;
    }
    this._name = value;
  }
}

let user1 = new User4("John");
console.log(user.name); // John

user1 = new User4(""); // Name is too short.

// 6) Computed names [...]
class User5 {
  ["say" + "Hi"]() {
    console.log("Hello");
  }
}
new User5().sayHi(); // Hello

// 7) Class fields
class User6 {
  name = "John";
  // Can also assign complex expressions
  // name = prompt("Name, please?", "John")

  sayHi() {
    console.log(`Hello, ${this.name}!`);
  }
}

new User6().sayHi(); // Hello, John!

// 7.1) Making bound methods with class fields
class Button {
  constructor(value) {
    this.value = value;
  }

  // FIXME  use arrow func to get 'this'
  click = () => {
    console.log(this.value);
  };
}

let button = new Button("hello");
// BUG
setTimeout(button.click, 1000); // undefined (bcs this is setTimeout) // hello

// 8) Summary
class MyClass {
  prop = value;

  constructor() {}

  method() {}

  get something() {}
  set something1(argu) {}

  [Symbol.iterator]() {}
}
// IMPT MyClass is a function that provides a constructor.

// 9) Tasks
class Clock {
  constructor(template) {
    this.template = template.template;
  }

  render() {
    let date = new Date();

    let hours = date.getHours();
    if (hours < 10) hours = "0" + hours;

    let mins = date.getMinutes();
    if (mins < 10) mins = "0" + mins;

    let secs = date.getSeconds();
    if (secs < 10) secs = "0" + secs;

    let output = this.template
      .replace("h", hours)
      .replace("m", mins)
      .replace("s", secs);

    console.log(output);
  }

  stop = () => clearInterval(this.timer);

  start() {
    this.render();
    this.timer = setInterval(() => this.render(), 1000);
  }
}

let clock = new Clock({ template: "h:m:s" });
clock.start();
clock.stop();