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

// //es6

// class Person {
//   name: string;
//   age: number;
//   constructor(name: string, age: number) {
//     this.name = name;
//     this.age = age;
//   }
//   greet() {
//     console.log(
//       `Hello, my name is ${this.name} and I am ${this.age} years old.`,
//     );
//   }
// }

// const resPerson = new Person("Gowtam", 25);

// console.log(resPerson);

// // Encapsulation in js

// function BackAccount(initialBalance: number) {
//   let balance = initialBalance;

//   return {
//     deposit(amount: number) {
//       balance += amount;
//     },
//     withdrow(amount: number) {
//       if (amount <= balance) {
//         balance -= amount;
//       }
//     },
//   };
// }

// const myAccount = BackAccount(1000);
// myAccount.deposit(500);
// myAccount.withdrow(200);
// myAccount.balance= 600 // you can not modify balance directly
// console.log(myAccount.balance); // Error: balance is not accessible

// class Person {
//   public id: string;
//   public name: string;
//   protected age: number;
//   constructor(name: string, age: number, id: string) {
//     this.name = name;
//     this.age = age;
//     this.id = id;
//   }

//   details() {
//     {
//       return `this is ${this.name}. his age is: ${this.age} and his find by this id :${this.id}`;
//     }
//   }
// }

// class Teacher extends Person {
//   private amount: number;
//   constructor(name: string, age: number, id: string, amount: number) {
//     super(name, age, id);
//     this.amount = amount;
//   }
//   teacherDetails() {
//     console.log(
//       `This is my Feaveriy Techer name is: ${this.name}, His age :${this.age} and person details: ${this.details()}`,
//     );
//   }
//   salary() {
//     console.log(`Teacher salary is ${this.amount}`);
//   }
//   details() {
//     //Polymorphism
//     {
//       return `this is testing overright`;
//     }
//   }
// }

// class student extends Person {
//   private result: string;
//   constructor(name: string, age: number, id: string, result: string) {
//     super(name, age, id);
//     this.result = result;
//   }

//   studentDetails() {
//     console.log(
//       `my name is : ${this.name} my age is ${this.age} and id is: ${this.id} and my result is ${this.result}`,
//     );
//   }
// }

// // const resSudent = new student("arko", 5, "1", "5.6");
// // console.log(":resSudent", resSudent.studentDetails());

// const resTeacher = new Teacher("Js", 30, "12", 3000);

// resTeacher.teacherDetails();

// abstract class Payment {
//   abstract pay(amount: number): void; // abstract methods.
// }

// class PaypalPayment extends Payment {
//   pay(amount: number) {
//     console.log(`Paid ${amount} using PayPal`);
//   }
// }

// const resPayment = new PaypalPayment();

abstract class Payment {
  abstract pay(amount: number): void;
}

class PaypalPayment extends Payment {
  pay(amount: number): void {
    console.log(`Paid ${amount} using PayPal`);
  }
}

class CashPayment extends Payment {
  pay(amount: number): void {
    console.log(`Paid ${amount} using Cash`);
  }
}
const payment = new PaypalPayment();
payment.pay(100);

const payCash = new CashPayment();
payCash.pay(2000);
