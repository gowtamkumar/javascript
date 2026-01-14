let vehicle = {
  wheels: "4",
  fuelType: "Gasoline",
  color: "Green",
};
let carProps = {
  type: {
    value: "Volkswagen",
  },
  model: {
    value: "Golf",
  },
};

const res = Object.create(vehicle, carProps);

console.log("res", res.type);

function Person(value) {
  this.name = value;
  this.age = 22;
}

const resPerson = new Person("Gowtam kumar");

console.log("res ", resPerson);

function JsNu() {}

JsNu.prototype.name = "Arko paul";

const resJsu = new JsNu();

console.log("resJsu", resJsu.name);

function func(name, age, skill) {
  console.log(skill);

  this.name = name;
  this.age = age;
  this.skill = skill;
}

const createInstant = Object.create(func.prototype);

console.log("createInstant", createInstant.skill);

const newInstandCreate = func.call(
  createInstant,
  "Gowtam kumar",
  32,
  "js, REact.js, node.js, posgeslq"
);

// Object's assign method

const arko = {
  arkoName: "Arkop apul",
  arkoage: 3.5,
  arkoSkill: "Dance",
};
const poly = {
  name: "Poly paul",
  age: 25,
  skill: "Fight with ma and me",
};

const objeAssing = Object.assign({}, arko, poly);

console.log("objeAssing", objeAssing);

class Gowtamkumar {
  constructor(value) {
    this.name = value;
  }
}

const resGowtam = new Gowtamkumar("Paul KUmar");

console.log("resGowtam", resGowtam);

//object key
const key = Object.keys(poly);
console.log("soft key", key);

key.forEach((item) => {
  console.log(item, poly[item]);
});

// object value
const value = Object.values(poly);

console.log("Object value", value);

/// object entries
const entries = Object.entries(poly);
console.log("entries", entries);

// loop whth destructruing
for (const [key, value] of Object.entries(poly)) {
  console.log(key, value);
}

// convet object to array
const obj = { a: 1, b: 2 };
const arr = Object.entries(obj);

console.log(arr);

// array to object convert
const convertObj = Object.fromEntries(arr);
console.log(convertObj);
