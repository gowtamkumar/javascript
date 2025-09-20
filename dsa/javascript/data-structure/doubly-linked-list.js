class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(value) {
    const newNode = new Node(value);
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  pop() {
    if (!this.head) return undefined;
    const poopedNode = this.tail;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = poopedNode.prev;
      this.tail.next = null;
    }
    this.length--;
    return this;
  }
  shift() {
    if (this.length === 0) return undefined;
    const oldHead = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = oldHead.next;
      this.head.prev = null;
      oldHead.next = null;
    }
    this.length--;
    return oldHead;
  }
  unshift(value) {
    const newNode = new Node(value);
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }

  get(index) {
    if (index < 0 || index >= this.length) return null;
    if (index <= this.length / 2) {
      let count = 0;
      let current = this.head;
      while (count != index) {
        current = current.next;
        count++;
      }
      return current;
    } else {
      let count = this.length - 1;
      let current = this.tail;
      while (count !== index) {
        current = current.prev;
        count--;
      }
      return current;
    }
  }

  set(index, value) {
    const foundNode = this.get(index);
    if (foundNode != null) {
      foundNode.val = value;
      return true;
    }
    return false;
  }

  insert(value, index) {
    if (this.length < 0 || index > this.length) return false;
    if (index === 0) return this.unshift(value);
    if (index === this.length) return this.push(value);
    const newNode = new Node(value);
    const beforNode = this.get(index - 1);
    const afterNode = beforNode.next;

    beforNode.next = newNode;
    newNode.prev = beforNode;
    newNode.next = afterNode;
    afterNode.prev = newNode;
    this.length++;
    return true;
  }

  remove(index) {
    if (this.length < 0) return false;
    if (this.length - 1 === index) return this.pop();
    if (this.length === 1) return this.shift();
    var beforNode = this.get(index);
    console.log("beforNode", beforNode);

    beforNode.prev.next = beforNode.next;
    beforNode.next.prev = beforNode.prev;
    beforNode.next = null;
    beforNode.prev = null;
    this.length--;
    return this;
  }
}

const result = new DoublyLinkedList();

result.push(44);
result.push(50);

// result.pop();
// result.pop();
// result.shift();
// result.shift();
// result.set(0, 200);
// result.insert(6000, 0);
// result.insert(30, 2);
// result.insert(99, 3);

// result.remove(5, 0);
result.remove(0);
console.log("List of lnk", result);
