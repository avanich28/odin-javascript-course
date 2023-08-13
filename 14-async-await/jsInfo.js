"use strict";

// - Javascript.info -

// Topic: Async/await

// 1) Async functions
const f = async function () {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000);
  });

  // NOTE: await literally suspends the function execution until the promise settles
  let result = await promise;
  console.log(result); // done!
};
f();
// IMPT cannot use await in non-async function

// IMPT top-level await can be used in modules.

// wrapping into an anonymous async function -> top-level await in modules
(async () => {
  let response = await fetch("/article/promise-chaining/user.json");
  let user = await response.json();
})();

// await accepts 'thenables'
class Thenable {
  constructor(num) {
    this.num = num;
  }

  then(resolve, reject) {
    console.log(resolve);
    setTimeout(() => resolve(this.num * 2), 1000);
  }
}

const ff = async function () {
  let result = await new Thenable(1);
  console.log(result);
};
ff();

// async class methods
class Waiter {
  async wait() {
    return Promise.resolve(1);
  }
}

new Waiter().wait().then((data) => console.log(data));

// 2) Error handling
const fff = async function () {
  // await Promise.reject(new Error("Whoops!"));
  // throw new Error("Whoops!");
  try {
    let res = await fetch("http://no-such-url");
  } catch (err) {
    console.error(err);
  }
};
fff();

// If we don't use try..catch
// fff().catch(err => console.log(err))

// Tasks
// 1)
const loadJson = async function (url) {
  try {
    const res = await fetch(url);
    if (res.status === 200) return res.json();

    throw new Error(res.status);
  } catch (err) {
    console.error(err);
  }
};
loadJson("https://javascript.info/no-such-user.json"); // Error: 404

// 2)
/*
class HttpError extends Error {
  constructor(res) {
    super(`${res.status} for ${res.url}`);
    this.name = "HttpError";
    this.res = res;
  }
}

const loadJson = async function (url) {
  const res = await fetch(url);
  if (res.status === 200) return res.json();
  else throw new HttpError(res); // ?
};

const demoGithubUser = async function () {
  let user;
  while (true) {
    let name = prompt("Enter a name?", "iliakan");
    try {
      user = await loadJson(`https://api.github.com/users/${name}`);
      break;
    } catch (err) {
      if (err instanceof HttpError && err.res.status === 404) demoGithubUser();
      else throw err;
    }
  }

  console.log(`Full name: ${user.name}.`);
};
demoGithubUser();
*/

// 3)
const wait = async function () {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return 10;
};
function ffff() {
  wait().then((data) => console.log(data));
}
ffff(); // 10
