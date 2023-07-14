"use strict";

// - MDN -
// Topic: Object.prototype.hasOwnProperty()

// 1)
// The method return false if the property is inherited or has not been declared.

// Most objects descend from Object and inherit its methods. Ex. Array object
const fruits = ["Apple", "Banana", "Watermelon", "Orange"];
console.log(fruits.hasOwnProperty(3)); // true
console.log(fruits.hasOwnProperty(4)); // false
console.log(fruits); // Array prototype -> Object prototype

// The method will not be available on objects created using Object.create(null).
const example = {};
example.hasOwnProperty("prop"); // false

example.prop = "exists";
example.hasOwnProperty("prop"); // true - 'prop' has been defined

example.prop = null;
example.hasOwnProperty("prop"); // true - own property exists with value of null

example.prop = undefined;
example.hasOwnProperty("prop"); // true - own property exists with value of undefined

// 2) Direct vs. inherited properties
example.prop = "exists";

// 'hasOwnProperty' return true for direct properties
example.hasOwnProperty("prop"); // true
example.hasOwnProperty("toString"); // false
example.hasOwnProperty("hasOwnProperty"); // false

// The `in` operator will return true for direct or inherited properties:
"prop" in example; // true
"toString" in example; // true
"hasOwnProperty" in example; // true

// 3) Iterating over the properties of an object
const buz = {
  fog: "stack",
};

for (let name in buz) {
  if (buz.hasOwnProperty(name))
    console.log(`this is fog (${name}) for sure. Value: ${buz[name]}`);
  else console.log(name);
}

// 4) Using hasOwnProperty as a property name
// NOTE JS doesn't protect the property name. The property can be mutated and returns incorrect results

const foo = {
  // re-implemetation
  hasOwnProperty() {
    return false;
  },
  bar: "Here be dragons",
};

console.log(foo.hasOwnProperty("bar")); // This always returns false

// FIXME 1: use 'Object.hasOwn()'
const foo1 = { bar: "Here be dragons" };
console.log(Object.hasOwn(foo, "bar")); // true

// FIXME 2: use hasOwnProperty from the 'Object prototype'
console.log(Object.prototype.hasOwnProperty.call(foo, "bar")); // true

// FIXME 3: Use another Object's hasOwnProperty and call it with 'this' set to foo
console.log({}.hasOwnProperty.call(foo, "bar")); // true

// 5) Objects created with Object.create(null)
// BUG Object.create(null) don't inherit from Object.prototype, making hasOwnProperty() inaccessible.
const foo2 = Object.create(null);
foo2.prop = "exists";
// console.log(foo2.hasOwnProperty("prop")); // Error

// FIXME use Object.hasOwn()
