const unicValus = [1, 2,23, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 3];

function getUniqueValues(arr){
  var i = 0;
  for(var j = 1; j < arr.length; j++){
    console.log(arr[i], arr[j]);
    
    if(arr[i] !== arr[j]){
      i++;
      arr[i] = arr[j];
    }
  }

  return i + 1
  
}

const resUniqe = getUniqueValues(unicValus)
console.log("resUniqe", resUniqe);
