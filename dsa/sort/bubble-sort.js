// ## bubble sort
const arr = [4, 5, 2, 3, 1, 3, 44, 5, 5, 6, 7, 8, 9, 0];
let n = arr.length;
for (let i = 0; i < n - 1; i++) {
  console.log("parrnet", arr);
  for (let j = 0; j < n - 1 - i; j++) {
    console.log("inner", arr);
    if (arr[j] > arr[j + 1]) {
      let temp = arr[j];
      arr[j] = arr[j + 1];
      arr[j + 1] = temp;
    }
  }
}

// console.log("arr", arr);
