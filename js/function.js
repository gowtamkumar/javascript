const personDq = {
  name: "Gowtam",
  greet: function () {
    console.log("Hello boss i  am " + this.name);
  },
};

personD.greet();

const personD = {
  name: "Gowtam",
  greet: function () {
    setTimeout(function () {
      console.log("Hello boss i  am " + this.name); // here this not working but if you set arrow function this working.
    }, 100);
  },
};

personD.greet(); // undefined

const personDArraw = {
  name: "Gowtam",
  greet: function () {
    setTimeout(() => {
      console.log("Hello boss i  am " + this.name); // here working
    }, 100);
  },
};

personD.greet();

// class

