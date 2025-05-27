// const arr = ["A", "B", "C", "D", "A", "A"];
// console.log(arr.indexOf("A", 2));

// const arr = ["E", "A", "B", "D", "C"];

// arr.sort()
// console.log(arr);

// console.log([]===[]) // false
// console.log([]==[]) // false;

// let hello = 2;
// let world = !--hello;
// let world2 = !--hello;

// console.log(world, world2);

// const names = "Gaurav";
// age = 25;
// console.log(delete names);
// console.log(delete age);

// const a = {};
// const b = { key: "b" };
// const c = { key: "c" };
// a[b] = 400;
// a[c] = 600;

// console.log("sadfasdf", a[b]);

// console.log(a);

function checkValue() {
  throw new Error("this value required");
}

function Toggle(value = checkValue()) {
  return value;
}

const resutl = Toggle("hell");
console.log("resutl", resutl);
