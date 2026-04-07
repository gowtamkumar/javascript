const newArray = [2, 5, 6, 7, 8, 9, 33, 44, 66, 77, 88];

function BinarySearch(arry, findValue) {
  let left = 0;
  let right = arry.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arry[mid] === findValue) return mid;
    if (arry[mid] < findValue) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return "not found this number";
}
console.log("resutl", BinarySearch(newArray, 33));
