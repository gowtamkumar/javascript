const newArray = [1, 3, 13, 2, 4, 55, 22, 11, 5, 100, 99, 12];
let checkvalue, temp;

for (let i = 0; i < newArray.length; i++) {
  checkvalue = i;

  for (let j = i + 1; j < newArray.length; j++) {
    console.log(j);
    
    if (newArray[j] < newArray[checkvalue]) {
      checkvalue = j;
    }
  }

  if (checkvalue != i) {
    temp = newArray[i];
    newArray[i] = newArray[checkvalue];
    newArray[checkvalue] = temp;
  }
}
