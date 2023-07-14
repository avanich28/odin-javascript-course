"use strict";

// - digitalocean -
// Topic: Understanding Prototypes and Inheritance in Javascript

let x = {}; // or new Object()

// 1) Javascript Prototype
// NOTE
// The double square brackets that enclose [[Prototype]] signify that it is an internal property, and cannot be accessed directly in code.

console.log(Object.getPrototypeOf(x)); // Object.prototype

// 2) Prototype Inheritance
// JS search the object itself -> object's prototype -> until Object.prototype -> null

// use method from Object.prototype
console.log(x.toString()); // [object Object]

// prototype chain
console.log(x.__proto__.__proto__); // null

// built-in methods from Array.prototype
// NOTE [] or new Array() (create array from constructor func)
let y = [];
console.log(y.__proto__);
console.log(y.__proto__.__proto__);

// y -> Array -> Object
y.__proto__ === Array.prototype; // true
y.__proto__.__proto__ === Object.prototype; // true

Array.prototype.isPrototypeOf(y); // true
Object.prototype.isPrototypeOf(Array); // true

y instanceof Array; // true

// 3) Constructor Functions
// NOTE
// The functions that are used to construct new objects.
// new operator - create new instances based off a constructor function

// 'this' keyword refers to the new instance that is created {}.
function Hero(name, level) {
  this.name = name;
  this.level = level;
}

let hero1 = new Hero("Bjorn", 1);
console.log(hero1); // Hero {name: 'Bjorn', level: 1}

console.log(Object.getPrototypeOf(hero1)); // {constructor: ƒ}

// Add prototype
Hero.prototype.greet = function () {
  return `${this.name} says hello.`;
};

console.log(hero1.greet());

// Create character class
// diff class diff abilities
// also want to connect to the original Hero
// NOTE use call() to copy from constructor into another constructor
function Warrior(name, level, weapon) {
  // new -> this = {}
  // Chain constructor with 'call'
  // BUG Hero's prototype property is not linked, just only call func!
  // FIXME use Object.setPropertyOf()
  Hero.call(this, name, level);

  // New property
  this.weapon = weapon;
}

function Healer(name, level, spell) {
  Hero.call(this, name, level);

  this.spell = spell;
}

// add method
Warrior.prototype.attack = function () {
  return `${this.name} attacks with the ${this.weapon}.`;
};

Healer.prototype.heal = function () {
  return `${this.name} casts ${this.spell}.`;
};

hero1 = new Warrior("Bjorn", 1, "axe");
let hero2 = new Healer("Kanin", 1, "cure");
console.log(hero1, hero2);
// Warrior {name: 'Bjorn', level: 1, weapon: 'axe'}
// Healer {name: 'Kanin', level: 1, spell: 'cure'}

console.log(hero1.attack()); // Bjorn attacks with the axe.

// BUG Hero's prototype property is not linked.
// console.log(hero1.greet());
// FIXME use Object.setPropertyOf() -> link prototype
Object.setPrototypeOf(Warrior.prototype, Hero.prototype);
Object.setPrototypeOf(Healer.prototype, Hero.prototype);

console.log(hero1.greet()); // Bjorn says hello.
