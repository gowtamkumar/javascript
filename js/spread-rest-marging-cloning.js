// Cloning an Array:
const arr1 = [2, 3, 4, 5];
const arr2 = [...arr1]; // here is clone
console.log(arr2);

arr1.push(10);
console.log(arr1);
console.log(arr2); // here orginal not change

// .........
// merging arrays
const arr3 = [11, 20];
const marged = [...arr1, ...arr3];
console.log(marged);

// adding element while cloing
const newArr = [0, ...arr1, 100];

console.log(newArr);

// ${} this name Interpolation
// ${} this name Interpolation
// ( ) this name is backticks
