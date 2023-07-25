import _ from "lodash";
import greet from "./another";
// Loading
import "./style.css";
import Icon from "./fire.png";

import printMe, { test } from "./print.js";

console.log(greet());
console.log("Thou you who come from the another side of the world");
console.log("webpack dev server");
console.log(test);
console.log("Hello");

function component() {
  const element = document.createElement("div");
  const btn = document.createElement("button");

  element.innerHTML = _.join(["Hello", "webpack"], " ");

  const myIcon = new Image();
  myIcon.src = Icon;

  btn.innerHTML = "Click me and check the console!";
  btn.onclick = printMe;

  element.appendChild(myIcon);
  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());

// Asset Management

// 1) Loading CSS
// In webpack.config.js
// module: {
//   rules: [
//     {
//       test: /\.css$/i,
//       use: ['style-loader', 'css-loader'],
//     }
//   ]
// }

// import "./style.css"

// 2) Loading Image
// In webpack.config.js
// {
//   test: /\.(png|svg|jpg|jpeg|gif)/i,
//   type: "asset/resource",
// }

// 3) Loading Font
// {
//   test: /\.(woff|woff2|eot|ttf|otf)/i,
//   type: "asset/resource",
// },

/////////////////////

// Output Management
