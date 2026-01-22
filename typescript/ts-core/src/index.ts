// const user = { name: "Boss", age: 25};

// for (const key in user) {
//   console.log(key, user[key as keyof typeof user]);
// }
// type userType = {
//   name: string;
//   age: string | number;
//   greet: () => void;
// };
// const user: any = {
//   name: "Boss",
//   age: 25,
//   greet() {
//     console.log("Hello");
//   },
// };

//  inhareitance using prototype

// function User(this: { name: string }, name: string) {
//   this.name = name;
// }

// User.prototype.sayHi = function () {
//   console.log("HI", this.name);
// };

// function Admin(this: { name: string }, name: string) {
//   User.call(this, name);
// }

// Admin.prototype = Object.create(User.prototype);

// Admin.prototype.constructor = Admin;
// Admin.prototype.deleteUser = function () {
//   console.log("User Deleted");
// };

// const resAdmin = new (Admin as any)("Hello Admin");
// console.log(resAdmin.sayHi());

// //create Object

// const parent = {
//   greet() {
//     console.log("Hello from parent");
//   },
// };

// const child = Object.create(parent);
// child.__proto__.greet();

//es6

class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  greet() {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old.`,
    );
  }
}

const resPerson = new Person("Gowtam", 25);

console.log(resPerson);

// Encapsulation in js

function BackAccount(initialBalance: number) {
  let balance = initialBalance;

  return {
    deposit(amount: number) {
      balance += amount;
    },
    withdrow(amount: number) {
      if (amount <= balance) {
        balance -= amount;
      }
    },
  };
}

const myAccount = BackAccount(1000);
myAccount.deposit(500);
myAccount.withdrow(200);
// myAccount.balance= 600 // you can not modify balance directly
// console.log(myAccount.balance); // Error: balance is not accessible
