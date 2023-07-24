"use strict";

// - MDN -

// Topic: Classes
// Have TDZ

// A class element can be characterized by three aspects:
// Kind: Getter, setter, method, or field
// Location: Static or instance
// Visibility: Public or private

class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  // Getter
  get area() {
    return this.calcArea();
  }

  // Method
  calcArea() {
    return this.height * this.width;
  }

  *getSides() {
    yield this.height;
    yield this.width;
    yield this.height;
    yield this.width;
  }
}

const square = new Rectangle(10, 10);
console.log(square.area); // 100
console.log([...square.getSides()]); // [10, 10, 10, 10]

// Static methods and fields
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // caches, fixes-configuration
  static displayName = "Point";

  // utility func for an application
  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.hypot(dx, dy);
  }
}

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);
p1.displayName; // undefined
p1.distance; // undefined
p2.displayName; // undefined
p2.distance; // undefined

console.log(Point.displayName); // Point
console.log(Point.distance(p1, p2)); // 7.0710678118654755

// Private
class Rectangle1 {
  #height = 0;
  #width;

  constructor(height, width) {
    this.#height = height;
    this.#width = width;
  }
}

// extends (create a class as a child of another constructor)
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name); // Animal class
  }

  speak() {
    console.log(`${this.name} barks.`);
  }
}

const d = new Dog("Mitzie");
d.speak(); // Mitzie barks.

// super can also call method of super class
class Cat {
  #age = 20;
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Lion extends Cat {
  speak() {
    super.speak();
    console.log(`${this.name} roars.`);
  }
}

const l = new Lion("Fuzzy");
l.speak();
// Fuzzy makes a noise.
// Fuzzy roars.

// NOTE When a static or instance method is called without a value for this.
// this = undefined
class Animal1 {
  speak() {
    return this;
  }

  static eat() {
    return this;
  }
}

const obj = new Animal1();
obj.speak(); // Animal {}

// BUG -> uses arrow func instead!
const speak = obj.speak;
speak(); // undefined
const eat = Animal1.eat;
eat(); // undefined
