const newArray = [1, 5, 6, 7, 8, 9, 10, 11, 22, 21, 23, 25, 80];

function binarySearch(arr, findValue) {
  let right = arr.length - 1;
  let left = 0;
  let mid;
  while (left <= right) {
    mid = Math.floor((left + right) / 2);
    if (arr[mid] === findValue) return mid;
    if (arr[mid] < findValue) left = mid + 1;
    else right = mid - 1;
  }
  if (arr[mid] !== findValue) {
    return "not found";
  }
}

console.log("Hello", binarySearch(newArray, 11));
