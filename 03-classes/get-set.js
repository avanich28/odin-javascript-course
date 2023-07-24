"use strict";

// - Javascript info -
// Topic: Property getters and setters

// 1) Getters and setters
let user = {
  name: "John",
  surname: "Smith",

  // get property name
  // Don't need to call function
  // A function without arguments, that works when a property is read.
  get fullName() {
    return `${this.name} ${this.surname}`;
  },

  // FIXME
  // A function with one argument, that is called when the property is set.
  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  },
};
// get
console.log(user.fullName);
// BUG
// user.fullName = "Test"; // Error

// set
user.fullName = "Alice Cooper";
console.log(user.name); // Alice
console.log(user.surname); // Copper

// 2) Accessor descriptors
// no value or writable, just only get/set function
let user1 = {
  name: "John",
  surname: "Smith",
};

Object.defineProperty(user1, "fullName", {
  get() {
    return `${this.name} ${this.surname}`;
  },

  set(value) {
    [this.name, this.surname] = value.split(" ");
  },
});
console.log(user1.fullName); // John Smith
for (let key in user1) console.log(key); // name, surname

// NOTE Cannot supply get/set and property value at the same descriptor
// BUG
Object.defineProperty({}, "prop", {
  get() {
    return 1;
  },

  // value: 2, // error
});

// 3) Smarter getters/setters
// Wrappers over real property value
let user2 = {
  get name() {
    return this._name;
  },

  set name(value) {
    if (value.length < 4) {
      console.log("Name is too short, need at least 4 characters");
      return;
    }
    this._name = value;
  },
};
user2.name = "Huck";
console.log(user2.name); // Huck

user2.name = ""; // Name is too short, need at least 4 characters

// 4) Using for compatibility
// control over regular data property
function User(name, birthday) {
  this.name = name;
  // this.age = age;
  this.birthday = birthday;

  // store birthday instead of age
  Object.defineProperty(this, "age", {
    get() {
      let todayYear = new Date().getFullYear();
      return todayYear - this.birthday.getFullYear();
    },
  });
}

let john = new User("John", new Date(1992, 6, 1));
console.log(john.birthday); // Wed Jul 01 1992 00:00:00 GMT+0700 (Indochina Time)
console.log(john.age); // 31
