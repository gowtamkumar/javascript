// # type coercion

console.log("1" + 10); // 110
console.log("1" - 1); //0
console.log("1" * 1); // 1

// let age = prompt("Enter you age");

// console.log("age", age);

// # type casting
// one type to other type convert is type casting

// # swap
let a = 10;
let b = 20;
let c;
c = a; // copy c = 10
a = b; // a = 20
b = c; // b = 10

console.log("a: ", a, "b: ", b);
// swap without extra variable
let d = 20;
let e = 10;

d = d + e; // d= 30
e = d - e; // e = 20
d = d - e; // d = 10
console.log("d: ", d, "e: ", e);

// es6 swap

let j = 100;
let k = 200;

[j, k] = [k, j]; // array destructuring assignment and ES6 destructuring

console.log("J: ", j, "K: ", k);

// # oparator
//# division
let f = 12;
let g = 22;
console.log(f / g); // j ke division to g
console.log(g / j);
console.log(Math.floor(f / g)); // j ke division to g
console.log(Math.floor(g / j));
// # Modulus(made)
console.log("Modulus: ", g % f); // 10
console.log("Modulus: ", f % g); // here can not divide
// # relation operator ">,<,<=,>=,!=, !=="
// logical operator "&&,||"
console.log(10 > 6 && 5 < 9); // if two condition true then return true
console.log(10 > 6 && 5 < 9 && 5 > 20); // if two condition true then return true and if this check left to right if find a flase then return false
// # unary operator "++,--"
//  1. post increment
//  2. pre increment
//  1. post deincrement
//  2. pre decrement

let i = 10;
// console.log(i++); // 10 post increment
// console.log(i); // 11
// console.log(++i); // 12 pre increment
// console.log(i); // 12 pre increment

// console.log(i--); // 10 post decrement
// console.log(i); // 10
// console.log(--i); //8 pre decrement
// console.log(i); //

let h = true; // true is 1
// console.log(++h);

// example 1
// let ky = 11++

// let gk = 22;
// let kg = --(gk++) // here 23 then -- meaning --(23) can not run increment and decrement
// console.log(kg);

// # Math
console.log(Math.round(10.3));
console.log(Math.ceil(10.3));
console.log(Math.floor(22.6));
console.log(Math.trunc(23.4));
console.log(Math.pow(2, 5));
console.log(Math.sqrt(69));
console.log(Math.cbrt(27)); // here result 3 mean 3 x 3 x 3
console.log(Math.abs(-33)); // this remove to nagative to positive convert
console.log(Math.max(33, 44, 100));
console.log(Math.trunc(Math.random() * 9000) + 1000); // opt number create

// # condition statement
let amount = 2909;

if (amount >= 500) {
  console.log("500 notes: " + Math.floor(amount / 500));
  amount = amount % 500;
}

if (amount >= 200) {
  console.log("200 notes: " + Math.floor(amount / 200));
  amount = amount % 200;
}
if (amount >= 100) {
  console.log("100 notes: " + Math.floor(amount / 100));
  amount = amount % 100;
}
if (amount >= 50) {
  console.log("50 notes: ", Math.floor(amount / 50));
  amount = amount % 50;
}

if (amount >= 20) {
  console.log("20 notes: ", Math.floor(amount / 20));
  amount = amount % 20;
}
if (amount >= 10) {
  console.log("10 notes: ", Math.floor(amount / 10));
  amount = amount % 10;
}

if (amount >= 5) {
  console.log("5 notes: ", Math.floor(amount / 5));
  amount = amount % 5;
}
if (amount >= 2) {
  console.log("2 notes: ", Math.floor(amount / 2));
  amount = amount % 2;
}

console.log("1 notes", amount);

let num = Number((0.1 + 0.2).toFixed(1));
newday = "";

switch (num) {
  case 0.3:
    newday = "Tuesday";
    break;
  case 3.5:
    newday = "Friday";
  default:
    newday = "Invalid day";
}

console.log("newday", newday);
