// array reverse
// let newArry = [1, 2, 3, 4, 5, 6, 7];
// let first = 0;
// let last = newArry.length - 1;
// let temp = 0;
// let len = newArry.length;
// for (let i = 0; i < len; i++) {
//   temp = newArry[i];
//   newArry[i] = newArry[last];
//   newArry[last] = temp;
//   first++;
//   last--;
//   len--;
//   len--;
// }

// console.log("newArry", newArry);
// let arr = [1, 2, 3, 4, 5, 6, 7];

// let first = 0;
// let last = arr.length - 1;

// while (first < last) {
//   let temp = arr[first];

//   arr[first] = arr[last];
//   arr[last] = temp;

//   first++;
//   last--;
// }

// console.log(arr);

// # advance array
// let arr = [1, 2, 3, 4, 5, 6]; result: [6, 2, 3, 4, 5, 1];
// let copy = arr[0];
// for (let i = 0; i < arr.length - 1; i++) {
//   console.log("i + 1", arr.length - 1);

//   arr[i] = arr[i + 1];
// }
// arr[arr.length - 1] = copy;
// console.log("arr", arr);
// let arr = [1, 2, 3, 4, 5, 6]; // result: [6, 1, 2, 3, 4, 5];
// let copy = arr[arr.length - 1];
// for (let i = arr.length - 1; i > 0; i--) {
//   arr[i] = arr[i - 1];
//   console.log(i);
// }
// arr[0] = copy;
// console.log("arr", arr);

// let arr = [1, 2, 3, 4, 5, 6]; // result k step left
// let k = 2 % arr.length;
// for (let j = 0; j < k; j++) {
//   let copy = arr[0];
//   for (let i = 0; i < arr.length - 1; i++) {
//     arr[i] = arr[i + 1];
//   }
//   arr[arr.length - 1] = copy;
// }

// console.log("arr", arr);

// marge sort
// let arr1 = [2, 5, 6];
// let arr2 = [1, 3, 4, 9];

// let marge = [];
// let i = 0,
//   j = 0,
//   k = 0;

// while (i < arr1.length && j < arr2.length) {
//   if (arr1[i] < arr2[j]) {
//     marge[k] = arr1[i];
//     k++;
//     i++;
//   } else {
//     marge[k] = arr2[j];
//     k++;
//     j++;
//   }
// }

// while (i < arr1.length) {
//   marge[k] = arr1[i];
//   k++;
//   i++;
// }

// while (j < arr2.length) {
//   marge[k] = arr2[j];
//   k++;
//   j++;
// }

// console.log("marge", marge);

// let arr1 = [2, 5, 5, 7, 8, 1, 100, 0];
// let dublicate = [];
// let k = 0,
//   i = 0;

// while (i < arr1.length) {
//   if (!dublicate.includes(arr1[i])) {
//     dublicate[k] = arr1[i];
//     k++;
//   }
//   i++;
// }

// console.log("dublicate", dublicate);

// # min value and max
// let arr1 = [2, 5, 5, 7, 8, 1, 100, 0];
// let min = arr1[0];
// let max = arr1[0];
// for (let i = 0; i < arr1.length; i++) {
//   if (min > arr1[i]) {
//     // min
//     min = arr1[i];
//   }
//   if (min < arr1[i]) {
//     max = arr1[i];
//   }
// }

// console.log("min", min);
// console.log("max", max);

let arry = [1, 2, 0, 1, 0, 1, 2, 0, 0, 2];

let i = 0;
let j = 0;
let k = arry.length - 1;
let temp;

while (i <= k) {
  if (arry[i] === 0) {
    temp = arry[i];
    arry[i] = arry[j];
    arry[j] = temp;
    i++;
    j++;
  } else if (arry[i] === 2) {
    temp = arry[i];
    arry[i] = arry[k];
    arry[k] = temp;
    k--;
  } else {
    i++;
  }
}

console.log("arry", arry);
