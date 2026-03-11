// function add1(x) {
//   console.log("inner add1 fun", x);
//   return x + 1;
// }

// function add2(x) {
//   console.log("add2 inner fun", x);
//   return x + 2;
// }

// function compose(add1, add2) {
//   console.log("add1", add1);
//   console.log("add2", add2);
//   return function (x) {
//     console.log("innerfunction");
//     return add1(add2(x));
//   };
// }

// const result = compose(add1, add2);
// console.log(result(5));

// Compose with Many Functions

const add = (x) => x + 2;
const multiply = (x) => x * 3;
const square = (x) => x * x;

const compose = (...arg) => {
  return function (x) {
    return arg.reduceRight((value, fn) => fn(value), x);
  };
};

const result = compose(add, multiply, square);
console.log(result(1));
