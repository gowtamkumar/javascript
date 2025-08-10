function insertionSort(arr, len) {
  for (let i = 0; i < arr.length; i++) {
    let temp = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > temp) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = temp;
  }
}
const newArray = [22, 3, 55, 11, 32, 54, 11, 2, 1, 7, 4];

console.log(insertionSort(newArray, newArray.length));
console.log("newArray", newArray);
