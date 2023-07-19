"use strict";

// 1) Scope - the current context of your code.
// scope - can be locally or globally

// 2) Global scope
let name = "Todd";

// 3) Local scope
// Each function has its own local scope.

// Global scope
let myFunction = function () {
  // Local scope
  // variables become locally scoped
  // outside cannot access
  let name1 = "todd";
  console.log(name1);
};
// console.log(name1); // Error

// 4) Function scope
// Scope A
let myFunction1 = function () {
  // Scope B
  let myOtherFunction = function () {
    // Scope C
  };
};

// 5) Lexical scope or Closure
// Also referred to as Static Scope
// NOTE The inner function has access to the scope in the outer function.

// Scope A
let myFunction2 = function () {
  // Scope B
  let name = "Todd";
  let myOtherFunction = function () {
    // Scope C: `name` is accessible here!
    console.log(`My name is ${name}`);
  };
  console.log(name);
  myOtherFunction(); // call function
};
myFunction2();

// Variables/objects/functions defined in its parent scope, are available in the scope chain.

// Scope chain doesn't access from outside to inside
// name = undefined
let scope1 = function () {
  // name = undefined
  let scope2 = function () {
    // name = undefined
    let scope3 = function () {
      let name = "Todd"; // locally scope
    };
  };
};

// 6) Scope Chain
// nested scope (outer function) -> local scope (inner function) -> chain!
// NOTE JS starts from innermost scope and search outwards until it finds the var/obj/func it was looking for

// 7) Closures
// Closely to lexical scope
// See when returning a `func reference'
let sayHello = function (name) {
  let text = "Hello, " + name;
  return function () {
    console.log(text);
  };
};
sayHello("Todd"); // function must be store in var
let helloTodd = sayHello("Todd");
// IMPT call the closure
helloTodd(); // Hello, Todd

// IMPT or call like this
sayHello("Bob")(); // Hello, Bob

// 8) Scope and 'this'
function test() {
  console.log(this); // undefined
  setTimeout(function () {
    // BUG setTimeout = object
    console.log(this); // window
  }, 1000);
}
test();

function test2() {
  // FIXME
  let self = this;
  console.log(self); // undefined
  setTimeout(function () {
    console.log(self); // undefined
  }, 1000);
}
test2();

// 9) Changing scope with .call(), .apply() and .bind()

// 9.1) .call() and .apply()
const links = document.querySelectorAll("nav");
for (let i = 0; i < links.length; i++) {
  (function () {
    console.log(this);
  }).call(links[i]); // FIXME
}
// .call(this, arg1, arg2, ...)
// .apply(this, [arg1, arg2, ...])

// NOTE myFunction.call(scope)

// 9.2) .bind()
const btn = document.querySelector("button");

function toggle(e) {
  const text = e.target.innerHTML;
  e.target.innerHTML = text === "Button" ? "Hello" : "Button";
}
// work
// btn.addEventListener("click", toggle);

// will invoke the function immediately
// BUG
// btn.addEventListener("click", toggle(e), false); // no event!

// FIXME 1
// btn.addEventListener("click", function (e) {
//   toggle(e);
// });

// FIXME 2
btn.addEventListener("click", toggle.bind(links));

// 10) Private and Public Scope
// NOTE In module pattern, we can create public and private scope! IMPT
(function () {
  // private scope
  // TODO
  const myFunction3 = function () {
    // do some stuff
  };
})();
// TODO Create Private Scope
// myFunction3(); // error

// Define Module
const Module = (function () {
  // NOTE Private
  const privateMethod = function () {};
  return {
    // NOTE Public
    publicMethod: function () {
      console.log("myMethod has been called.");
    },
  };
})();
// TODO Want func to be Public method
// call module + methods
// IMPT Module = namespaced
// This means our Module takes care of our namespace, and can contain as many methods as we want.
Module.publicMethod(); // myMethod has been called.

// BUG Private can't call & global scope cannot access IMPT
// Public can call! & access private & global can access

// Public and Private(underscore)
const Module1 = (function () {
  let myModule = {};
  const _privateMethod = function () {};
  myModule.publicMethod = function () {};
  myModule.anotherPublicMethod = function () {};
  // TODO return obj + public methods
  return myModule;
})();
// usage
Module1.publicMethod;
