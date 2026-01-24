
// hich is best function; 

function addToUp(n) {
    return n * (n + 1) / 2;
}
console.log(addToUp(10))

function addToUp(n) {
    let total =0;
    for(let i=0; i <= n; i++){
        total +=i;
    }

    return total;
}

let test1 = performance.now()
console.log(addToUp(10000000000))
let test2 = performance.now()

console.log(`${(test2 - test1) / 100} second`);