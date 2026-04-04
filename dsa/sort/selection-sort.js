// ## selection sort
const arr = [4, 5, 2, 3, 1, 3, 44, 5, 5, 6, 7, 8, 9, 0];
let n = arr.length;


for(let i = 0; i < n; i++){
  let min = i;
  for(let j = i + 1; j < n; j++){
    if(arr[min] > arr[j]){
      min = j
    }
  }

  let temp = arr[i]
  if(arr[i] !== arr[min]){
    arr[i] = arr[min]
    arr[min] = temp
  }
}

console.log("selection sort", arr);
