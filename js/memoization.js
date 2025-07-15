// const memoizeAddition = () => {
//   let cache = {};
//   return (value) => {
//     console.log(value);

//     if (value in cache) {
//       console.log("Fetching from cache");
//       return value[cache];
//     } else {
//       console.log("Calculating result");
//       let result = value + 20;
//       cache[value] = result;
//       return result;
//     }
//   };
// };

// const addition = memoizeAddition();
// console.log(addition(30));
// console.log(addition(40));

function memoize(fn) {
  const cache = {};
  return function (value) {
    if (cache[value] !== undefined) {
      console.log("Fetching for cashce...");
      return cache[value];
    }
    const res = fn(value);
    console.log("Calculating...");
    cache[value] = res;
    return res;
  };
}
const slowSquere = (n) => n * n;

const memoizaition = memoize(slowSquere);

console.log("memoizaition", memoizaition(200));
console.log("memoizaition", memoizaition(200));
console.log("memoizaition", memoizaition(40));
console.log("memoizaition", memoizaition(40));
