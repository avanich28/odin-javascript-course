export function forEach(items, callback) {
  for (let i = 0; i < items.length; i++) {
    callback(items[i]);
  }
}

const add = (a, b) => a + b;

const doAdd = (a, b) => add(a, b);

console.log(doAdd(1, 2));
