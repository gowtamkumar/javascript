const arr = [22, 3, 55, 11, 32, 54, 11, 2, 1, 7, 4];

for (let i = 1; i < arr.length; i++) {
  let temp = arr[i];
  let j = i - 1;
  while (j >= 0 && arr[j] > temp) {
    /// condition check for move
    arr[j + 1] = arr[j]; // here just move to right site
    j--;
  }
  arr[j + 1] = temp; // orginal insert
}

console.log("arr", arr);
