"use strict";

const server = {
  people: [
    {
      name: "Odin",
      age: 20,
    },
    {
      name: "Thor",
      age: 35,
    },
    {
      name: "Freyja",
      age: 29,
    },
  ],

  getPeople() {
    return new Promise((resolve, reject) => {
      // Simulating a delayed network call to the server
      setTimeout(() => {
        resolve(this.people);
      }, 2000);
    });
  },
};

// ASYNC
const yourAsyncFunction = async () => {
  // do something asynchronously and return a promise
  return result;
};

const anArray = [];
anArray.forEach(async (item) => {
  // do something asynchronously for each item in 'anArray'
  // one could also use .map here to return an array of promises to use with 'Promise.all()'
});

server.getPeople().then(async (people) => {
  people.forEach((person) => {
    // do something asynchronously for each person
  });
});

// Error handling
/*
asyncFunctionCall().catch((err) => {
  console.error(err);
});
*/

const getPersonsInfo = async function (name) {
  try {
    const people = await server.getPeople();
    const person = people.find((person) => {
      return person.name === name;
    });
    return person;
  } catch (error) {
    // Handle the error any way you'd like
  }
};

// Practice
const img = document.querySelector("img");

const getCats = async function () {
  console.log("Duck");

  const res = await fetch(
    `https://api.giphy.com/v1/gifs/translate?key=60aiQSgfhfDMB1L8gyF271txiVhwOU3O&s=cats`
  );
  console.log("Cat");

  const data = await res.json();
  img.src = data.data.images.original.url;
};
getCats();
console.log("Dog");
