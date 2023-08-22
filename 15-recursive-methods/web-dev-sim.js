// - Web dev simplifies -

// Topic: What is Recursion - In Depth

const tree = {
  name: "John",
  children: [
    {
      name: "Jim",
      children: [],
    },
    {
      name: "Zoe",
      children: [
        {
          name: "Kyle",
          children: [],
        },
        {
          name: "Sophia",
          children: [],
        },
      ],
    },
  ],
};

function printChildrenRecursive(t) {
  if (t.children.length === 0) return;
  t.children.forEach((child) => {
    console.log(child.name);
    printChildrenRecursive(child);
  });
}
printChildrenRecursive(tree);

// printChildrenRecursive('John')
//   printChildrenRecursive('Jim')
//   return
//   printChildrenRecursive('Zoe')
//     printChildrenRecursive('Kyle')
//     return
//     printChildrenRecursive('Sophia')
//     return
//   return
// return

// NOTE In loop, it is difficult to use because we don't know how deeply nested these children could be.
