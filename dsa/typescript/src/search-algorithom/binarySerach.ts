// binary search should be sorted
let newArray = [1, 3, 4, 6, 7, 12, 33, 44, 56, 76, 81, 91, 92, 95];

let targetValue = 95;

function binarySearch(newArray, findValue) {
  let right = newArray.length - 1;
  let left = 0;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (newArray[mid] === findValue) {
      return newArray[mid];
    }

    if (newArray[mid] < findValue) {
      left = mid + 1;
      console.log("testing..");
    } else {
      right = mid - 1;
    }
  }
}

const res = binarySearch(newArray, targetValue);

console.log("res", res);
