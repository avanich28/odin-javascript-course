"use strict";

const getData = function () {
  // go fetch data from some API...
  // clean it up a bit and return it as an object:
  const data = Promise.resolve("API");
  return data;
};

const myData = getData(); // promise
const pieceOfData = myData["whatever"]; // undefined

// .then() tells pieceOfData to wait until the promise is resolved
myData.then(function (data) {
  const pieceOfData = data["whatever"]; // and then run the function inside
});

// NOTE
//  "inversion of control," when you take part of your program and give over control of its execution to another third party.

// Promise becomes an immutable value once resolved

let a = 0;

const res = new Promise(function (resolve, reject) {
  resolve(a);
  reject("Bluh");
});
console.log(res.then((data) => console.log(data)));
a++;
console.log(a);
// then method callback receives the result given to it by the resolve() call:
