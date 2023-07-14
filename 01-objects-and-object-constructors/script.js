"use strict";

// - ODIN -
// Topic: Objects and Object Constructors

// Object literals
const myObject = {
  property: "Value!",
  otherProperty: 77,
  "obnoxious property": function () {
    this.obnoxious = this.otherProperty;
  },
};
myObject["obnoxious property"](); // bracket notation
console.log(myObject.obnoxious); // dot notation

const variable = "property";
console.log(myObject.variable); // undefined
console.log(myObject[variable]); // myObject['property'] = Value!

// tic tac toe
// ex 1
const playerOneName = "tim";
const playerTwoName = "jenn";
const playerOneMarker = "X";
const playerTwoMarker = "O";

// ex 2
const playerOne = {
  name: "tim",
  marker: "X",
  score: 15,
};

const playerTwo = {
  name: "jenn",
  marker: "O",
  score: 5,
};

function printName(player) {
  console.log(player.name);
}
printName(playerTwo); // jenn

function keepScore() {
  if (playerOne.score >= 10) gameOver(playerOne);
  else if (playerTwo.score >= 10) gameOver(playerTwo);
}
keepScore();

function gameOver(winningPlayer) {
  console.log("Congratulations!");
  console.log(winningPlayer.name + " id the winner!");
}

// Constructor function or instantiate
function Player(name, marker) {
  this.name = name;
  this.marker = marker;
  this.sayName = function () {
    console.log(name); // contain a lot of memory -> contain in prototype instead
  };
}

const player1 = new Player("steve", "X");
const player2 = new Player("also steve", "O");

player1.sayName(); // steve
player2.sayName(); // also steve

// Every object has a prototype which is basically an object.
// Object access to the prototype method and property.
function Student(name, grade) {
  this.name = name;
  this.grade = grade;
}

Student.prototype.sayName = function () {
  console.log(this.name);
};

Student.prototype.goToProm = function () {
  console.log("Eh.. go to prom?");
};

const studentOne = new Student("Susan", 9);
studentOne.sayName(); // Susan
const studentTwo = new Student("Mario", 8);
studentTwo.goToProm(); // Eh.. go to prom?

// Object.create()
function AnotherStudent() {}

AnotherStudent.prototype.sayName = function () {
  console.log(this.name);
};

function EightGrader(name) {
  this.name = name;
  this.grade = 8;
}

function NinthGrader(name) {
  this.name = name;
  this.grade = 9;
}

// EighthGrader.prototype = Student.prototype // not the same as below!
EightGrader.prototype = Object.create(AnotherStudent.prototype);

// NOTE refer same obj = same value reference (which is an address in heap)
// NinthGrader.prototype = AnotherStudent.prototype;
NinthGrader.prototype = Object.create(AnotherStudent.prototype);
// child prototype = Parent prototype hide in child prototype property

// change the sayName method
NinthGrader.prototype.sayName = function () {
  console.log("HAHAHAHAHA");
};

const studentThree = new NinthGrader("Josh"); // HAHAHA
studentThree.sayName();
const studentFour = new EightGrader("Mary");
studentFour.sayName(); // HAHAHA -> Mary

// Exercise
function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
}

// Behind the scenes
// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

Book.prototype.info = function () {
  return `The ${this.title} by ${this.author}, ${this.pages}, not read yet`;
};

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295);
console.log(theHobbit.info());

// The Prototype

// NOTE
// All objects in JS have a prototype.
// The prototype is another object that the original inherits from, and has access to all of its prototype's methods and properties.

// Accessing an object's prototype
console.log(Object.getPrototypeOf(player1) === Player.prototype); // true
console.log(Object.getPrototypeOf(player2) === Player.prototype); // true
// NOTE Player.prototype = The .prototype property of the Object Constructor

// Object.getPrototypeOf() vs. .proto vs. [[Prototype]]

// NOTE .__proto__ => deprecated
// FIXME use Object.getPrototypeOf()
// Don't do this
console.log(player1.__proto__ === Player.prototype); // true (player1.[[Prototype]])

// Prototypal Inheritance
// NOTE What is the purpose to use prototype as a place to contain properties and methods?
// 1) Save memory (Defining on a centralized)
// 2) All linked objects inherit from the Player.prototype or Parent prototype

// Player.prototype.__proto__
console.log(Object.getPrototypeOf(Player.prototype) === Object.prototype); // true
console.log(player1.valueOf()); // Player {name: 'steve', marker: 'X', sayName: ƒ}

// NOTE .getPropertyOf & .valueOf is defined on Object.prototype

// .hasOwnProperty (check where .valueOf function is defined)
console.log(player1.hasOwnProperty("valueOf")); // false - name, marker, sayName
console.log(Object.prototype.hasOwnProperty("valueOf")); // true
console.log(Object.prototype.hasOwnProperty("hasOwnProperty")); // true
console.log(Object.getPrototypeOf(Object.prototype)); // null

// Recommend Method for Prototypal Inheritance

// NOTE
// .getPrototypeOf(..) - view prototype
// .setPrototypeOf(..) - set prototype or mutate
// .valueOf()
// .hasOwnProperty(..)

function Person(name) {
  this.name = name;
}

Person.prototype.sayName = function () {
  console.log(`Hello, I'm ${this.name}!`);
};

Player.prototype.getMarker = function () {
  console.log(`My marker is ${this.marker}`);
};

console.log(Object.getPrototypeOf(Player.prototype)); // Object.prototype {}

// Set
Object.setPrototypeOf(Player.prototype, Person.prototype);
console.log(Object.getPrototypeOf(Player.prototype)); // Person.prototype

// Object -> Person -> Player

// const player1 = new Player('steve', 'X')
// const player2 = new Player('also steve', 'O')

// Person
player1.sayName(); // steve
player2.sayName(); // also steve

// Player
player1.getMarker(); // My marker is X
player2.getMarker(); // My marker is O

// BUG
// Player.prototype = Person.prototype;
// Don't do it bcs this set Player.prototype directly refer to Person.prototype.
// When we change Player func, Person func also change

// Knowledge check
// Object constructor
function Language(type) {
  this.type = type;
}

function Style(type, cl) {
  Language.call(this, type);
  this.cl = cl;
}

// Instance
const js = new Style("dynamic", "prototype");
console.log(js);

// Object.create() -> static method
// use when no prototype, no constructor function, no new operator

const test = [1, 2, 3];
