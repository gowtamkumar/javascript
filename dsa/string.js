// # string is imutable in JavaScript, meaning that once a string is created,
//  it cannot be changed. However, you can create new strings based on existing ones.
const str = "Hello, World! World";

// # length of the string
console.log(str.length); // Output: 13
// # slice extract subscring from the string
console.log(str.slice(-8, str.length)); // Output: "!"

// # substring is similar to slice but does not accept negative indices
console.log(str.substring(0, 5)); // Output: "Hello"

// # concatenate strings
const str1 = "Hello";
const str2 = "World";
const concatenated = str1.concat(", ", str2, "!"); // Output: "Hello, World!"
console.log(concatenated); // Output: "Hello, World!"

// # trim removes whitespace from both ends of a string
const str3 = "  Hello, World!  ";
console.log(str3.trim()); // Output: "Hello, World!"

// # indexof returns the index of the first occurrence of a specified value in a string
console.log(str.indexOf("World")); // Output: 7

// # lastIndexOf returns the index of the last occurrence of a specified value in a string
console.log(str.lastIndexOf("World")); // Output: 13

// # replace replaces a specified value with another value in a string
const newStr = str.replace("World", "Universe");
console.log(newStr); // Output: "Hello, Universe! World"
// replace all occurrences of "World" with "Universe"
const newStr2 = str.replaceAll("World", "Universe");
console.log(newStr2); // Output: "Hello, Universe! Universe"

// # split
const str4 = "Hello, World! How are you?";
const words = str4.split(" ");
console.log(words); // Output: ["Hello,", "World!", "How", "are", "you?"]

// chratAt returns the character at a specified index in a string
console.log(str.charAt(0)); // Output: "H"
console.log(str.charCodeAt(7)); // Output: "W"
// print the characters of the string one by one
for (let i = 0; i < str4.length; i++) {
  console.log(str4[i]); // Output: each character in the string
}

// print the characters of the string in reverse order
let reversedStr = "";
for (let i = str4.length - 1; i >= 0; i--) {
  console.log(str4[i]); // Output: each character in reverse order
  reversedStr += str4[i];
}
console.log(reversedStr); // Output: "?uoy era woH !dlroW ,olleH"

let upper = "";
let lower = "";

for (let i = 0; i < str4.length; i++) {
  console.log(i);

  if (str4[i].toLowerCase() === str4[i]) {
    console.log(str4[i]); // Output: each character in the string
    lower += str4[i];
  } else if (str4[i].toUpperCase() === str4[i]) {
    console.log(str4[i]); // Output: each character in the string

    upper += str4[i];
  }
}
console.log(str4);
console.log("Lowercase:", lower);
console.log("Uppercase:", upper);
