"use strict";

// - Medium -

// Topic: JavaScript ES 2017: Learn Async/Await by Example

const doubleAfter2Seconds = function (x) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x * 2);
    }, 2000);
  });
};

const addPromise = function (x) {
  return new Promise((resolve) => {
    doubleAfter2Seconds(10).then((a) => {
      doubleAfter2Seconds(20).then((b) => {
        doubleAfter2Seconds(30).then((c) => {
          resolve(x + a + b + c);
        });
      });
    });
  });
};

addPromise(10).then((sum) => {
  console.log(sum); // 130
});

const addAsync = async function (x) {
  const a = await doubleAfter2Seconds(10);
  const b = await doubleAfter2Seconds(20);
  const c = await doubleAfter2Seconds(30);

  return x + a + b + c;
};
addAsync(10).then((sum) => console.log(sum));
