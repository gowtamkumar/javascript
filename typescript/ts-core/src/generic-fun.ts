function identity<T>(arg: T): T {
  return arg;
}

const output = identity<string>("Hello World");
console.log(output);

const arrowIdentity = <T>(value: T): T => value;

console.log(arrowIdentity<number>(100));
