function bubbleSort(arr) {
  let len = arr.length;
  let noSowap;
  let count = 0
  for (let i = 0; i < len; i++) {
    noSowap = true;
    for (let j = 0; j < len - i - 1; j++) {
      console.log(arr, arr[j], arr[j + 1]);
      count++
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        noSowap = false;
      }
    }
    if (noSowap) break;
  }

  console.log(" count++",  count++);
  
  return arr;
}

const bubblesortRes = bubbleSort([22, 44, 11, 22, 55, 900, 12, 13]);
console.log("bubblesortRes", bubblesortRes);
