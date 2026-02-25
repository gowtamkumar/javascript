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
