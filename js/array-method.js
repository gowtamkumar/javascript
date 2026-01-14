const fruits = [
  { name: "apple" },
  { name: "banana" },
  { name: "apple" },
  { name: "orange" },
];

const count = fruits.reduce((pre, current) => {
  pre[current.name] = (pre[current.name] || 0) + 1;
  return pre;
}, {});

console.log(count);
