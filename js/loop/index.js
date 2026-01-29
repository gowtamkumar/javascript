// for loop
// use when:
//need index;
//need to skip items
//need reverse loop
let i = 0;
let len = 10;
for (; i < len; i++) {
  console.log(i);
}

//## while
//use when
//you dont know exact Number of loops
// Loop depends on external conditiond(api, input,etc)
let j = 0;
while (j < 10) {
  console.log("while loop", j);
  j++;
}

//## do --while
// use when:
// you must execute code one before checking condition
let k = 0;
do {
  console.log("do while loop...", k);
  k++;
} while (k < 10);

// ## for --in(Objects)
// use when
// loop over keys of an object
// not recommended for arrays(order issues)
const user = { name: "Gwotam kumar", age: 31 };

for (let key in user) {
  console.log("key", user[key]);
}

// # for --of (Arrays, Strings, Iterables)
let names = "gowtam kumar paul";
for (let value of names) {
  console.log("string map", value);
}

let newArray = new Set([2, 3, 4, 54, 5, 67]);
for (let value1 of newArray) {
  console.log("array map", value1);
}

//## forEach
// Cleaner array loop
// ⚠️ Important:
// ❌ Cannot use break
// ❌ Cannot use continue
// ❌ Does NOT work well with async/await

const arrnew = [1, 2, 3, 4, 5, 6];
arrnew.forEach((value, idx, array) => {
  console.log("for each array", value, idx, array);
});
