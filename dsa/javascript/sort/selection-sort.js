function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    // console.log(element);
    let small = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[small] > arr[j]) {
        small = j;
      }

      let temp = arr[small];
      arr[small] = arr[i];
      arr[i] = temp;
    }
  }
  console.log(arr);

  return arr;
}

console.log(
  "selectionSort([2, 3, 1, 3, 55, 100, 500, 22, 11, 33, 44, 55]);",
  selectionSort([2, 3, 3, 1, 55, 100, 500, 22, 11, 33, 44, 55,1,1,1,1111,11])
);
