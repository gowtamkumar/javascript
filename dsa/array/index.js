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

// const nums = [2, 11, 7, 15];
// let sum = [];
// let target = 9;
// for (let i = 0; i < nums.length; i++) {
//   for (let j = i + 1; j < nums.length; j++) {
//     if (nums[i] + nums[j] === target) {
//       sum = [i, j];
//       break;
//     }
//   }
// }

// console.log("sum", sum);

// const nums = [2, 11, 7, 15];
// function twoSum(arr, target) {
//   const map = new Map();
//   for (let i = 0; i < arr.length; i++) {
//     let diff = target - arr[i];
//     console.log("diff", diff);
//     console.log("map", map);

//     if (map.has(diff)) {
//       return [map.get(diff), i];
//     }
//     map.set(arr[i], i);
//   }
//   return [];
// }

// console.log(twoSum(nums, 9));

// const nums = [2, 11, 7, 15];
// function addFirst(nums, value) {
//   console.log("length", nums.length);

//   for (let i = nums.length - 1; i >= 0; i--) {
//     nums[i + 1] = nums[i];
//   }
//   nums[0] = value;
// }

// addFirst(nums, 90);

// function lastAdd(nums, value) {
//   nums[nums.length] = value;
// }
// lastAdd(nums, 30);
// lastAdd(nums, 88);

// console.log("nums", nums);

//middle array insert
// const nums = [2, 11, 7, 15];
// function addMid(nums, value) {
//   let mid = Math.floor(nums.length / 2);
//   for (let i = nums.length - 1; i >= mid; i--) {
//     nums[i + 1] = nums[i];
//   }

//   nums[mid] = value;
// }

// addMid(nums, 90);

// console.log(nums);

// const nums = [2, 11, 7, 15];

// function insert(arr, index, value) {
//   for (let i = arr.length - 1; i >= index; i--) {
//     arr[i + 1] = arr[i];
//   }
//   arr[index] = value;
// }

// insert(nums, 2, 33);

// console.log("nums", nums);
