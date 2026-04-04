const fruits = ["apple", "banana", "apple"];
const countFruts = fruits.reduce((pre, curr) => {
  pre[curr] = (pre[curr] || 0) + 1;
  return pre;
}, {});

console.log("countFruts", countFruts);

const data = "Software Technology Park, Jashore 7400";

console.log("asdfasdf", data.toLowerCase().includes("jashore"));
