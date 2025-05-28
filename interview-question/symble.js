const sym2 = Symbol.for("foo");
const sym3 = Symbol.for("foo");

console.log(sym2);
console.log(sym3);

console.log(sym2 === sym3);
