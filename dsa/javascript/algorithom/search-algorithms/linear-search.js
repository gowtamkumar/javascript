function linearSearch(arr, value) {
    for(let i = 0; i < arr.length; i++){
        if(arr[i] === value){
            return 1;
        }
    }
    return -1;
}

linearSearch([11,22,3,455,66,5], 11)  