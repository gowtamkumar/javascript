// function countDown(n) {
//   if (n === 0) {
//     console.log("All count done");
//     return;
//   }
//   countDown(n - 1);
// }

// countDown(100);

// factorial
// factorial(5)
// = 5 * factorial(4)
// = 5 * 4 * factorial(3)
// = 5 * 4 * 3 * factorial(2)
// = 5 * 4 * 3 * 2 * factorial(1)
// = 5 * 4 * 3 * 2 * 1
// = 120
// function factorial(n) {
//   if (n === 1) return 1;
//   return n * factorial(n - 1);
// }
// console.log(factorial(5));
// reverse string
function reverseString(value) {
  if (value == "") {
    return "";
  }
  return reverseString(value.slice(1)) + value[0];
}

console.log(reverseString("Hello"));
