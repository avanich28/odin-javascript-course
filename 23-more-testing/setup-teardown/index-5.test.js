test.only("this will be the only test that runs", () => {
  expect(true).toBe(true);
});

test("this test will not run", () => {
  expect("A").toBe("B");
});
