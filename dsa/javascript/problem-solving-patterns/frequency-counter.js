function sameSquared(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  let frequency1 = {};
  let frequency2 = {};
  for (let val of arr1) {
    frequency1[val * val] = (frequency1[val * val] || 0) + 1;
  }
  for (let val2 of arr2) {
    frequency2[val2] = (frequency2[val2] || 0) + 1;
  }

  for (let key in frequency1) {
    if (!(key in frequency2)) {
      return false;
    }

    if (frequency1[key] !== frequency2[key]) {
      return false;
    }
  }

  return true;
}

// Example usage:
console.log(sameSquared([1, 2, 3], [1, 4, 9])); // true
console.log(sameSquared([1, 2, 3], [1, 9])); // false (different lengths)
console.log(sameSquared([1, 2, 1], [4, 4, 1])); // false (frequencies don't match for 1 and 4)
console.log(sameSquared([2, 5, 1, 3], [25, 4, 9, 1])); // false (order doesn't matter, but 1 is squared to 1, not 25)
// function same(arr1, arr2) {
//   if (arr1.length !== arr2.length) {
//     return false;
//   }
//   for (let i = 0; i < arr1.length; i++) {
//     const currectIndex = arr2.indexOf(arr1[i] ** 2);
//     if (currectIndex == -1) {
//       return false;
//     }
//     arr2.splice(currectIndex, 1);
//   }
//   return true;
// }

// const res = same([1, 2, 3], [1, 4, 9]);

// console.log("res", res);
