function bubbleSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      console.log(arr, arr[j], arr[j + 1]);

      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  } 
  return arr;
}

const bubblesortRes = bubbleSort([22, 44, 11, 22, 55, 900, 12, 13]);
console.log("bubblesortRes", bubblesortRes);
