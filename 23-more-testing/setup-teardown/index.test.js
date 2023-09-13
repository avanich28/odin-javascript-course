let cities = [];

function initializeCityDatabase() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      cities.push("Vienna");
      cities.push("San Juan");
      resolve();
    }, 1000);
  });
}

function clearCityDatabase() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      cities = [];
      resolve();
    }, 1000);
  });
}

function isCity(name) {
  return cities.includes(name);
}

// 1) Repeating Setup
// Run Each test
beforeEach(() => {
  // initializeCityDatabase();
  // For async
  return initializeCityDatabase();
});

// Clear after each test
afterEach(() => {
  // clearCityDatabase();
  // For async
  return clearCityDatabase();
});

test("city database has Vienna", () => {
  expect(isCity("Vienna")).toBeTruthy();
});

test("city database has San Juan", () => {
  expect(isCity("San Juan")).toBeTruthy();
});

// If we don't have afterEach(), the cities array will be 6, not 2.
test("has only 2 cities", () => {
  expect(cities.length).toBe(2);
});
