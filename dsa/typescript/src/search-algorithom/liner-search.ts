let array = [2, 33, 44, 55, 10, 300, 500];

let findValue = 55;

function LinerSearch(array, findValue) {
  let len = array.length;
  let i = 0;
  while (len > i) {
    if (array[i] === findValue) {
      return `this number have a ${i} index`;
    }
    i++;
  }
}

const resArray = LinerSearch(array, findValue);

console.log(resArray);
