class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarrySearchTree {
  constructor() {
    this.root = null;
  }
  insert(value) {
    const newNode = new Node(value);

    if (this.root === null) {
      this.root = newNode;
      return this;
    } else {
      let current = this.root;

      while (true) {
        if (value === current.value) return undefined;
        if (value < current.value) {
          if (current.left === null) {
            current.left = newNode;
            return this;
          } else {
            // here update current
            current = current.left;
          }
        } else if (value > current.value) {
          if (current.right === null) {
            current.right = newNode;
            return this;
          } else {
            // here update current
            current = current.right;
          }
        }
      }
    }
  }
  find(value) {
    if (this.root === null) return false;
    let current = this.root;
    let found = false;
    while (current && !found) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        found = true;
      }
    }
    return current;
  }

  BFS() {
    let root = this.root;
    if (!root) {
      return [];
    }

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
      const currentNode = queue.shift();
      result.push(currentNode.value);
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }
    return result;
  }
  DFSPreOrder() {
    const data = [];

    function traverse(node) {
      data.push(node.value);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }

    traverse(this.root);

    return data;
  }

  DFSPostOrder() {
    const data = [];
    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      data.push(node.value);
    }
    traverse(this.root);
    return data;
  }
  DFSInOrder() {
    const data = [];

    function traverse(node) {
      if (node.left) traverse(node.left);
      data.push(node.value);
      if (node.right) traverse(node.right);
    }
    traverse(this.root);

    return data;
  }
}

const result = new BinarrySearchTree();

result.insert(33);
result.insert(10);
result.insert(9);
result.insert(100);
result.insert(110);
result.insert(99);

console.log(result.DFSPreOrder());
console.log(result.DFSPostOrder());
console.log(result.DFSInOrder());
