"use strict";

const email = document.getElementById("email");
const country = document.getElementById("country");
const zipCode = document.getElementById("zip");
const password = document.getElementById("password");
const confirmPass = document.getElementById("confirm");
const error = document.querySelectorAll(".error");

email.addEventListener("input", () => {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("Please fill email as example@gmail.com");
  } else {
    email.setCustomValidity("");
  }
});

const showError = function () {
  if (country.validity.valueMissing) {
    error[1].textContent =
      "Please fill between 3 and 10 characters ex. thailand";
  } else if (country.validity.tooShort) {
    error[1].textContent = "Please fill at least 3 characters";
  }
};

country.addEventListener("input", () => {
  if (country.validity.valid) {
    error[1].textContent = "";
  } else {
    showError();
  }
});

const showError2 = function () {
  if (zipCode.validity.patternMismatch) {
    error[2].textContent =
      "Please fill 2 capital letters with dash and then 4 numbers ex. TH-1234";
  }
};

zipCode.addEventListener("input", () => {
  if (zipCode.validity.valid) {
    error[2].textContent = "";
  } else {
    showError2();
  }
});

const showError3 = function () {
  if (password.validity.patternMismatch) {
    error[3].textContent = "Please fill 10 numbers or characters";
  }
};

password.addEventListener("input", () => {
  if (password.validity.valid) {
    error[3].textContent = "";
  } else {
    showError3();
  }
});

confirmPass.addEventListener("input", () => {
  if (confirmPass.value === password.value) {
    error[4].textContent = "";
    confirmPass.style.backgroundColor = "rgb(182, 242, 176)";
  } else {
    error[4].textContent = "Incorrect";
    confirmPass.style.backgroundColor = "pink";
  }
});
