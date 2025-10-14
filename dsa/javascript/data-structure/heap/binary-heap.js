// ## binary heap
class MaxBinaryHeap {
  constructor() {
    this.values = [41, 39, 33, 18, 27, 12, 55];
  }

  insert(value) {
    this.values.push(value);
    this.boubbleUp();
  }
  boubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    while (idx > 0) {
      let parnetId = Math.floor((idx - 1) / 2); //this parnet data find math
      const parentData = this.values[parnetId];
      if (element <= parentData) break;
      this.values[parnetId] = element;
      this.values[idx] = parentData;
      idx = parnetId;
    }
  }
}

const heap = new MaxBinaryHeap();

heap.insert(55);
heap.insert(100);
heap.insert(1);

console.log("heap", heap);
