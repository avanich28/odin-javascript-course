"use strict";
// - Javascript.info -
// Topic: Prototype inheritance

// 1) [[Prototype]]

// reuse Parent obj in a new child obj
// In JS, obj have a special hidden property [[Prototype]], IMPT that is either null or references another obj.
let animal = {
  eats: true,
};

let rabbit = {
  jumps: true,
};

// set prototype
Object.setPrototypeOf(rabbit, animal);
console.log(rabbit);

// property (missing) -> prototype
// rabbit (missing) -> animal
console.log(rabbit.eats); // true

// NOTE
// animal is the prototype of rabbit. - prototype delegation 🔥
// rabbit prototypically inherits from animal - prototype inheritance 🔥

// Long chain
// longEar -> rabbit -> animal
animal = {
  eats: true,
  walk() {
    console.log("Animal walk");
  },
  // BUG
  // proto can't go in circles.
  // __proto__: longEar,
};

rabbit = {
  jumps: true,
  __proto__: animal, // Don't use!
};

let longEar = {
  earLength: 10,
  __proto__: rabbit,
};

rabbit.walk(); // Animal walk
longEar.walk(); // Animal walk
console.log(longEar.jumps); // true

// NOTE Limitation
// 1) __proto__ can't go in circles. (ex. animal's prototype is rabbit)
// 2) __proto__ can be either an obj or null

// NOTE IMPT
// Please note that __proto__ is not the same as the internal [[Prototype]] property. It’s a historical getter/setter for [[Prototype]].
// __proto__ is outdated!

// 2) Writing doesn't use prototype

// NOTE
// The prototype is only used for reading properties.
// Write/delete operations work directly with the object. BUG
animal = {
  eats: true,
  walk() {
    // BUG stop search this
  },
};

rabbit = {
  __proto__: animal,
};

rabbit.walk = function () {
  // BUG found first
  console.log("Rabbit! Bounce-bounce!");
};
rabbit.walk(); // Rabbit! Bounce-bounce!

// NOTE
// setter/getter - writing to such a property (.) is actually the same as calling a function.

let user = {
  name: "John",
  surname: "Smith",

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  },

  get fullName() {
    return `${this.name} ${this.surname}`;
  },
};

let admin = {
  __proto__: user,
  isAdmin: true,
};

// Don't need to write call ()
// IMPT getter in the prototype
console.log(admin.fullName); // John Smith

// IMPT setter triggers!
// set() -> this.name/this.surname change
admin.fullName = "Alice Cooper";
// getter
console.log(admin.fullName); // Alice Cooper
console.log(user.fullName); // John Smith

// 3) The value of 'this'

// NOTE 'this' is always the object before the dot.
// modify only the own states, not the state of the big obj IMPT
animal = {
  walk() {
    if (!this.isSleeping) {
      console.log("I walk");
    }
  },

  sleep() {
    this.isSleeping = true;
  },
};

rabbit = {
  name: "White Rabbit",
  __proto__: animal,
};

// add rabbit.isSleeping IMPT
rabbit.sleep();

console.log(rabbit.isSleeping); // true
console.log(animal.isSleeping); // undefined (no property)

// NOTE methods are shared, but the object state {this} is not!

// 4) for...in loop

// BUG The for..in loop iterates over inherited properties too.
animal = {
  eats: true,
};

rabbit = {
  jumps: true,
  __proto__: animal,
};

console.log(Object.keys(rabbit)); // jumps
for (let prop in rabbit) console.log(prop); // 🔥 BUG jumps eats

// FIXME use obj.hasOwnProperty(key)
for (let prop in rabbit) {
  let isOwn = rabbit.hasOwnProperty(prop);

  if (isOwn) console.log(`Our: ${prop}`);
  else console.log(`Inherited: ${prop}`);
}

// NOTE Object.prototype isn't enumerable, so it will not show in the for loop.
// NOTE Object.keys/values and so on ignore inherited properties! (operate only the property in the obj itself, no prototype)

// Object.key()
// Object.value()
// Object.entries()
// Object.fromEntries()
const test = ["a", "b", "c"];
console.log(test.entries().next().value);

// 5) Exercise

// 1.
animal = {
  jumps: null,
};
rabbit = {
  __proto__: animal,
  jumps: true,
};

console.log(rabbit.jumps); // true (1)
delete rabbit.jumps;
console.log(rabbit.jumps); // null (2)
delete animal.jumps;
console.log(rabbit.jumps); // undefined (3)

// 2.
let head = {
  glasses: 1,
};

let table = {
  __proto__: head,
  pen: 3,
};

let bed = {
  __proto__: table,
  sheet: 1,
  pillow: 2,
};

let pockets = {
  __proto__: bed,
  money: 2000,
};

// 3 Why are both hamsters full?
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach = [food]; // FIXME
  },
};

let speedy = {
  __proto__: hamster,
};

let lazy = {
  __proto__: hamster,
};

// This one found the food
speedy.eat("apple");
console.log(speedy.stomach); // apple

// This one also has it, why? fix please.
console.log(lazy.stomach); // apple
