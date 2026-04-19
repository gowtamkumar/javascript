// Find the maximum number in an array
// const arr = [3, 7, 2, 9, 5];
// let max = arr[0];
// // time complxity 0(n)
// // space complxity 0(1)
// for (let num of arr) {
//   if (num > max) {
//     max = num;
//   }
// }

// console.log("max", max);

// reverse array
// const reverData = [];
// time complxity 0(n)
// space complxity 0(n)
// for (let i = arr.length - 1; i >= 0; i--) {
//   console.log("eee", arr.length - 1);
//   reverData.push(arr[i]);
// }

// console.log("reverData", reverData);

// optimize reverse
// const arr = [3, 7, 2, 9, 5];
// let left = 0;
// let right = arr.length - 1;
// // time complxity 0(n)
// // space complxity 0(1)

// while (left < right) {
//   [arr[left], arr[right]] = [arr[right], arr[left]];
//   right--;
//   left++;
// }

// console.log("arr", arr);
// Two Sum // target = 9

const nums = [2, 11, 7, 15];
let sum = [];
let target = 9;
for (let i = 0; i < nums.length; i++) {
  for (let j = i + 1; j < nums.length; j++) {
    if (nums[i] + nums[j] === target) {
      sum = [i, j];
      break;
    }
  }
}

console.log("sum", sum);
