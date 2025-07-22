function createUser(name, age) {
  return {
    name,
    age,
    greet() {
      console.log(`hi, iam ${this.name}, ${this.age} years old`);
    },
  };
}

const user = createUser("Gowtma kumar");

user.greet();

// with privatye data using clouses

function crateBackAcount(owner, initialBlance = 0) {
  let balance = initialBlance;
  return {
    owner,
    deposit(amount) {
      balance += amount;
    },
    getBalance() {
      return balance;
    },
  };
}

const account = crateBackAcount("Gowtam kumar", 6000);
account.deposit(1000);
console.log(account.getBalance());
