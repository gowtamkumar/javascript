const newArray = [1, 3, 13, 2, 4, 55, 22, 11, 5, 100, 99, 12];

for (let i = 0; i < newArray.length; i++) {
  let temp;
  const element = newArray[i];
  if (newArray[i] > newArray[i + 1]) {

    temp = newArray[i];
    newArray[i] = newArray[i + 1];
    newArray[i + 1] = temp;
    // console.log(newArray);
    
  }

  console.log("temp", temp);
  



}

console.log("newArray", newArray);
