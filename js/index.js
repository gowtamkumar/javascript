console.log(10 ** 3); //Exponentiation that mine 10 x 10 = 100 x 10
const resutl = Math.pow(10, 3);
// console.log(resutl);

console.log(10 / 3); //division just division kore dei;
console.log(10 % 3); //vagse bar kora hoy
console.log(3 && 3);

let day;
switch (new Date().getDay()) {
  case 0:
    day = "Sunday";
    break;
  case 1:
    day = "Monday";
    break;
  case 2:
    day = "Tuesday";
    break;
  default:
    day = "There is no matching! sorry for than";
}

// console.log(day);

const person = { fname: "John", lname: "Doe", age: 25 };

let text = "";
for (let x in person) {
  // console.log(person);
  text += person[x];
}

// console.log(text);

const cars = "Javascript";

let texts = "";
for (let x of cars) {
  //   console.log(x);
  texts += x;
}

let i = 0;
// while (i < 10) {
//     // console.log(i);
//     i++;
// }

// do {
//   i++;
//   console.log("aaa", i);
// } while (i < 10);

// console.log(10-10*10+10);

// const timerId = setInterval(
//   () => console.log("start", new Date().getSeconds()),
//   1000
// );

// setTimeout(()=> {clearInterval(timerId); alert("hello")}, 5000)

// const str = "hello world"; //word reverse
// console.log(str.split('').reverse().join(''));

// const user = {name: "Alice", age: 33, email: "ghw@gmail.com"}
// const hasEmail = "email" in user
// console.log("🚀 ~ hasEmail:", hasEmail)

// console.log(typeof typeof 1); // result string

var mainString = "hello";
var subString = "hell";

console.log(
  "mainString.includes(subString);",
  mainString.indexOf(subString) !== -1
);

// regex
var regex = /hell/;

console.log(regex.test(mainString));

function capitalizeFirstLetter(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

console.log(capitalizeFirstLetter("gowtamkumar"));

const str = "this is a \n very long string that is used to test the \n multiline string functionality in JavaScript. \n It should be able to handle new lines and other special characters like \n tabs and spaces.";

console.log("str", str);

function sum(num1, num2, num3, num4) {
  return num1 + num2 + num3 + num4;
}
console.log(sum.length);
 // 4 is the number of parameters expected.
