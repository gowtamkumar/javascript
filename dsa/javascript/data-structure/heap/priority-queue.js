// ## binary heap
class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(value, priority) {
    let newNode = new Node(value, priority);
    this.values.push(newNode);
    this.boubbleUp();
  }
  boubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    while (idx > 0) {
      let parnetId = Math.floor((idx - 1) / 2); //this parnet data find math
      const parentData = this.values[parnetId];
      if (element.priority >= parentData.priority) break;
      this.values[parnetId] = element;
      this.values[idx] = parentData;
      idx = parnetId;
    }
  }

  dequeue() {
    const max = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    return max;
  }
  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild.priority < element.priority) {
          swap = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < element.priority)
        ) {
          swap = rightChildIdx;
        }
      }
      if (swap === null) {
        break;
      }
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
}

class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

const ER = new PriorityQueue();

ER.enqueue("hello dsa", 3);
ER.enqueue("hello js", 1);
ER.enqueue("hello python", 2);
ER.dequeue();

console.log("ER", ER);
