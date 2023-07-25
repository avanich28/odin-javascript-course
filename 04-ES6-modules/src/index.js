import _ from "lodash";
import { functionOne, functionTwo } from "./functionOne";
import myName from "./myName";

functionOne();
functionOne();
functionOne();
console.log(functionTwo());
console.log("Hello");

function component() {
  const element = document.createElement("div");

  // Lodash, now imported by this script
  element.innerHTML = _.join(["Hello", "webpack"], " ");

  // use your function
  element.textContent = myName("Cody");

  return element;
}

document.body.appendChild(component());

// npm init -y
// npm i webpack webpack-cli --save-dev

// In package.json
// - "main": "index.js",
// + "private": true,

// + |- /dist
// +  |- index.html

// npm i --save lodash

// import _ from 'lodash';

// In index.html
// - <script src="https...lodash"><script>
// + <script src="main.js"></script>

// npx webpack

// See message "Hello webpack" on the viewport

// mkdir webpack.config.js
// + information (look in webpack website at the config topic)

// npx webpack --config webpack.config.js

// In package.json
// + "test": "echo \"Error: no test specified\" && exit 1",
// + "build": "webpack",

// export name
// export default name
// export default [name]
// export {name, name}

// import {name}
// import name
// import [name]
// import {name, name}
