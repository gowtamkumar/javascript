function test() {
  if (true) {
    var x = 5;
  }
  console.log(x); // 5
}

test();

// #Redeclaration
// var a  = 10;
// var a  = 10
// let b = 10;
// let b = 30; //SyntaxError: Identifier 'b' has already been declared
// const c = 10;
// const c = 30; //SyntaxError: Identifier 'c' has already been declared
// c = 30; //TypeError: Assignment to constant variable.
// # assignment
var a = 20;
a = 30; // No error

let c = 3;
c = 5;

const d = 30;
// d = 40; // TypeError: Assignment to constant variable.

// #Hoisting
console.log(x); // undefined
var x = 5;

console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 10;

// | Feature   | var             | let       | const     |
// | --------- | --------------- | --------- | --------- |
// | Scope     | Function        | Block     | Block     |
// | Redeclare | ✅ Yes           | ❌ No      | ❌ No      |
// | Reassign  | ✅ Yes           | ✅ Yes     | ❌ No      |
// | Hoisted   | Yes (undefined) | Yes (TDZ) | Yes (TDZ) |
