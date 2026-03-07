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

let arr = [1, 2, 3, 4, 5, 6]; // result k step left
let k = 2;
for (let j = 0; j < k; j++) {
  let copy = arr[0];
  for (let i = 0; i < arr.length - 1; i++) {
    arr[i] = arr[i + 1];
  }
  arr[arr.length - 1] = copy;
}

console.log("arr", arr);
