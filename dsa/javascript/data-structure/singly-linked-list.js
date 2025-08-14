class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  push(value) {
    var newNode = new Node(value);
    console.log("newNode", newNode);

    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }
  // traverse(){
  //   var current = this.head;
  //   while (current) {

  //   }
  // }
}

var list = new SinglyLinkedList();
list.push("hello");
