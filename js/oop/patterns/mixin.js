const sayHIMixin = {
  sayHi() {
    console.log(`hi, my name is ${this.name}`);
  },
};

const sayByeMixin = {
  sayBye() {
    console.log(`Bye from ${this.name}`);
  },
};

class User {
  constructor(name) {
    this.name = name;
  }
}

Object.assign(User.prototype, sayHIMixin, sayByeMixin);

const user = new User("Gowtam kumar");
user.sayHi();
user.sayBye();
