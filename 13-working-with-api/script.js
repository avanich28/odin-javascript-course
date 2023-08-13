"use strict";

fetch(
  "https://api.weatherapi.com/v1/current.json?key=0339d3d557a3447590e140611231208&q=london"
)
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error(err));

//////////////////

const img = document.querySelector("img");
const btn = document.querySelector("button");
const form = document.querySelector("form");
const p = document.querySelector("p");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const query = Object.fromEntries([...new FormData(this)]).query;

  fetch(
    `https://api.giphy.com/v1/gifs/translate?key=60aiQSgfhfDMB1L8gyF271txiVhwOU3O&s=${query}`,
    { mode: "cors" }
  )
    .then((res) => {
      const data = res.json();
      if (!data) throw new Error(`Can't find ${query}!`);
      return data;
    })
    .then((data) => (img.src = data.data.images.original.url))
    .catch((err) => (p.textContent = err));
});
