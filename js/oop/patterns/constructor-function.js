function Person(name, age) {
  this.name = name;
  this.age = age;

  this.greet = function () {
    console.log(`Hi, i am ${this.name}, ${this.age} years old.`);
  };
}

const newPerson = new Person("Arko paul", 4);

newPerson.greet()
