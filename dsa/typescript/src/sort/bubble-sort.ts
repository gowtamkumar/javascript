const newArray = [1, 3, 13, 2, 4, 55, 22, 11, 5, 100, 99, 12];
let len = newArray.length;
let temp;
for (let i = 0; i < len; i++) {
  for (let j = 0; j < len - i - 1; j++) {
    if (newArray[j] > newArray[j + 1]) {
      temp = newArray[j];
      newArray[j] = newArray[j + 1];
      newArray[j + 1] = temp;
    }
  }
}

console.log("newArray", newArray);
