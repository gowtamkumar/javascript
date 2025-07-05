const obj = { name: "Alice", age: 25 };

if ("age" in obj) {
  console.log(obj["age"]);
}

var object = {
  k1: "value1",
  k2: "value2",
  k3: "value3",
};

console.log("Object.entries(obj)", obj.constructor === Object);

for (var key in object) {
  console.log("dded", key);

  if (object.hasOwnProperty(key)) {
    console.log(key + " -> " + object[key]); // k1 -> value1 ...
  }
}

function sum() {
  var total = 0;
  for (var i = 0, len = arguments.length; i < len; ++i) {
    total += arguments[i];
  }
  return total;
}

const ressum = sum(1, 2, 3); // returns 6

console.log("ressum", ressum);

