"use strict";
// binary search should be sorted
let newArray = [1, 3, 4, 6, 7, 12, 33, 44, 56, 76, 81, 91, 92, 95];
let len = newArray.length;
function binarySearch(arr, len, find) {
    let left, right;
    let mid = 0;
    left = 0;
    right = len - 1; // last index
    while (left <= right) {
        mid = Math.round((left + right) / 2);
        if (arr[mid] == find) {
            return mid;
        }
        if (arr[mid] < find) {
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }
    }
    if (arr[mid] != find) {
        return `not found ${find}`;
    }
}
const res = binarySearch(newArray, len, 44);
console.log("res", res);
