function Animal(name){
  this.name = name;
}


Animal.prototype.speak = function(){
  console.log(`${this.name} makes a sound`);
}

const doc1 = new Animal("Dubbly");
const doc2 = new Animal("Max");

doc1.speak()
doc2.speak()