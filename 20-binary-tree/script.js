"use strict";

// Tree
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Binary Search Tree
class BST {
  constructor() {
    this.root = null;
  }

  create(value) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;

    const addSide = (side) => {
      if (!current[side]) {
        current[side] = newNode;
        return this;
      }
      current = current[side];
    };

    while (true) {
      if (value === current.value) return this;
      if (value < current.value) addSide("left");
      else addSide("right");
    }
  }

  // - Binary Tree Traversed -

  // Breadth-first-search (queue)
  BFS() {
    let visited = [],
      queue = [],
      current = this.root;

    queue.push(current);
    console.log(queue);
    while (queue.length) {
      current = queue.shift();
      console.log(current);
      visited.push(current.value);

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }

    return visited;
  }

  // Depth-First Search (stack)
  preOrder() {
    let visited = [],
      current = this.root;

    let traverse = (node) => {
      visited.push(node.value);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    };

    traverse(current); // first call
    return visited;
  }

  postOrder() {
    let visited = [],
      current = this.root;

    let traverse = (node) => {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      visited.push(node.value);
    };

    traverse(current);
    return visited;
  }

  inOrder() {
    let visited = [],
      current = this.root;

    let traverse = (node) => {
      if (node.left) traverse(node.left);
      visited.push(node.value);
      if (node.right) traverse(node.right);
    };

    traverse(current);
    return visited;
  }
}

const tree = new BST();
tree.create(20);
tree.create(20);
tree.create(14);
tree.create(57);
tree.create(10);
console.log(tree);
console.log(tree.BFS()); // [20, 14, 57, 10]
console.log(tree.preOrder()); // [20, 14, 10, 57]
console.log(tree.postOrder()); // [10, 14, 57, 20]
console.log(tree.inOrder()); // [10, 14, 20, 57]
// O(n)

// 'Enqueue' pushes the first element into the queue.
// 'Dequeue' remove the first element from the queue.
