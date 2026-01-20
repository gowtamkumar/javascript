// class User {
//   public id: number;
//   private name: string;
//   protected age: number;
//   protected blance: number;
//   constructor(id: number, name: string, age: number = 44, blance: number) {
//     this.id = id;
//     this.name = name;
//     this.age = age;
//     this.blance = blance;
//   }
//   greet(): void {
//     console.log(`Hello ${this.name}`);
//   }
// }

// class UserRoll extends User {
//   show() {
//     console.log(this.age);
//   }
//   changeAmount(value: number) {
//     this.blance = value;
//   }
// }

// const resUser = new UserRoll(11, "gowtamkumar", 33, 20000);

// resUser.show();
// resUser.changeAmount(11);
interface IUser {
  id: number;
  name: string;
  greet(): void;
}
class User implements IUser {
  constructor(
    public id: number,
    public name: string,
  ) {}
  greet(): void {
    console.log("hi Hello");
  }
}
const resUser = new User(22, "gowtmakumar");
