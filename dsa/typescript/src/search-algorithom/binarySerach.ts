// binary search should be sorted

let newArray = [1, 3, 4, 6, 7, 12, 33, 44, 56, 76, 81, 91, 92, 95];
let left = 0;
let right = newArray.length - 1;
let findValues = null;
let targetValue = 3;

while (left <= right) {
  let mid = Math.floor((left + right) / 2);

  if (newArray[mid] === targetValue) {
    findValues = newArray[mid];
    break;
  }

  if (newArray[mid] < targetValue) {
    left = mid + 1;
  } else if (newArray[mid] > targetValue) {
    right = mid - 1;
  }
}

if (findValues !== null) {
  console.log("dinf valu", findValues);
} else {
  console.log("not found this");
}
