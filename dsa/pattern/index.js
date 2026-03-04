const prompt = require("prompt-sync")();
let n = Number(prompt("Enter a number"));

// for (let i = 1; i <= pro; i++) {
//   for (let j = 1; j <= pro; j++) {
//     process.stdout.write("*");
//   }
//   console.log();
// }
// ## right triangle pattern
// for (let i = 1; i <= pro; i++) {
//   for (let j = 1; j <= i * 2 - 1; j++) {
//     process.stdout.write("*");
//   }
//   console.log();
// }

// for (let i = 1; i <= n; i++) {
//   for (let j = 1; j <= i; j++) {
//     process.stdout.write("*");
//   }
//   console.log();
// }

// ## inverted right angle triangle
// for (let i = 1; i <= n; i++) {
//   for (let j = n; j >= i; j--) {
//     process.stdout.write("*");
//   }
//   console.log();
// }

// ## mirror right angle traningle

// for (let i = 1; i <= n; i++) {
//   console.log(n - i);

//   for (let s = 1; s <= n - i; s++) {
//     process.stdout.write(" ");
//   }

//   for (let j = 1; j <= i; j++) {
//     process.stdout.write("*");
//   }
//   console.log("");
// }

// # home work full traningle

// for (let i = 1; i <= n; i++) {
//   for (let s = 1; s <= n - i; s++) {
//     process.stdout.write(" ");
//   }

//   for (let j = 1; j <= 2 * i - 1; j++) {
//     process.stdout.write("*");
//   }
//   console.log("");
// }

// # x pattern

// for (let i = 1; i <= n; i++) {
//   for (let j = 1; j <= n; j++) {
//     if (i == j || i + j == n + 1) {
//       process.stdout.write("* ");
//     } else {
//       process.stdout.write("  "); // TWO spaces
//     }
//   }
//   console.log();
// }

// # v pattern
for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= 2 * n - 1; j++) {
    if (i == j || i + j == 2 * n) {
      process.stdout.write("* ");
    } else process.stdout.write("  ");
  }
  console.log();
}
