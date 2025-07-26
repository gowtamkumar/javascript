function  merge(arra1, arra2) {
    const results = [];
      let i = 0;
      let j = 0;
      while (i < arra1.length && j < arra2.length) {
          if(arra2[j] > arra1[i]){
            results.push(arra1[i]) 
            i++
          } else{
            results.push(arra2[j]);
            j++;
          }
      }

      while(i < arra1.length){
        results.push(arra1[i])  
         i++
      }
      while(j < arra2.length){
          results.push(arra2[j]);
            j++;
      }
    return results;
}

function mergeSort(arr){
  if(arr.length <= 1) return arr;
  let mid = Math.floor(arr.length/2)
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));
  console.log("left", left);
  console.log("right", right);
  return merge(left, right)
}


const resMergeSort = mergeSort([100,11,1,8,33,44,2,77,3,88])

console.log("resMergeSort", resMergeSort);
