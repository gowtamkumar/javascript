const newArray = [1, 3, 13, 2, 4, 55, 22, 11, 5, 100, 99, 12];

for (let i = 0; i < newArray.length; i++) {
  const element = newArray[i];
  console.log(element);

  let checkvalue = 0;
  for (let j = 1; j < newArray.length; j++) {
    console.log(newArray[j]);

    if (newArray[j] > newArray[j + 1]) {
      checkvalue = j;
    } else {
      checkvalue = j + 1;
    }
  }

  const elements = newArray[checkvalue];
  let store = 0;
  console.log("checkvalue", checkvalue);
  // if (element > elements) {
  //   store = i;
  //   newArray[i] = newArray[checkvalue];
  //   newArray[checkvalue] = newArray[store];
  // }
}

console.log("newArray", newArray);
