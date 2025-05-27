// const person = {
//   isHuman: false,
//   printIntroduction: function () {
//     console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
//   },
// };

// const me = Object.create(person);
// me.name = "Gowtam kumar"
// me.isHuman = true

// console.log("me", me.printIntroduction());

// const object1 = {};

// Object.defineProperties(object1, {
//   property1: {
//     value: 33,
//     writable: true,
//   },
//   property2: {},
// });

// console.log("object1", object1.property1);

// const object3 = {};
// Object.defineProperty(object3, "newProperty", {
//   value: 22,
//   writable: true,
// });

// object3.newProperty = 3;

// console.log(object3.newProperty);

const newData = {
  a: "some thing wrong",
  b: 33,
};

const entriesData = Object.entries(newData);

for (let [key, value] of entriesData) {
  console.log("key:", key);
  console.log("value:", value);
}
