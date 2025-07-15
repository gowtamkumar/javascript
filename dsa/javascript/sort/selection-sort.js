function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let small = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[small] > arr[j]) {
        small = j;
      }

      // let temp = arr[small];
      // arr[small] = arr[i];
      // arr[i] = temp;
      [arr[small], arr[i]] = [arr[i], arr[small]];
    }
  }
  return arr;
}

console.log(
  "selection sort",
  selectionSort([
    2, 3, 3, 1, 55, 100, 500, 22, 11, 33, 44, 55, 1, 1, 1, 1111, 11,
  ])
);

function selectionSortRevese(arr) {
  for (let i = 0; i < arr.length; i++) {
    let large = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] > arr[large]) {
        large = j;
      }
    }
    [arr[i], arr[large]] = [arr[large], arr[i]];
  }
  return arr;
}

console.log(
  "selectionSort reverse",
  selectionSortRevese([
    2, 3, 3, 1, 55, 100, 500, 22, 11, 33, 44, 55, 1, 1, 1, 1111, 11,
  ])
);
