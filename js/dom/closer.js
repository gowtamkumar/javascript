// jokhon kono function nested function niya hoy and nested function call kora hoy. tokhon parent fun 1 bar call hoy.
// oi nested function tokhon call hoy na jodi baire thake call na kora hoy. just function return kore dai
// jokhon nested fun call kora hoy. tokhon jodi parent fun ar kono var use kora hoy tokhon oi function hoy jai closure .
// ar jodi nested ar moddha var use na kora hoy tahole closure hoy na. sum ke mere fale.
//

function add() {
  let sum = 0;
  return function () {
    //this the closure
    sum += 1;
  };
}

const newAdd = add();
console.dir(newAdd);
newAdd();
console.dir(newAdd);
newAdd();
console.dir(newAdd);
newAdd();

function addFun() {
  const getbyClass = document.getElementsByClassName("p1");
  document.getElementById("clsInsert").innerText = getbyClass[0].innerHTML;
  const getForm = document.forms["frm1"];
  let text = "";
  for (let i = 0; i < getForm.length; i++) {
    text += `${getForm.elements[i].value}, `;
  }
  document.getElementById("fromValue").innerHTML = text;
}

function insertBodyData() {
  const inserData = (document.getElementById("inserBodyText").innerHTML =
    document.body.innerHTML);
}

function getLink() {
  const getLInk = (document.getElementById("demos").innerHTML = document.title);
}

function setColor() {
  document.getElementById("p1").style.color = "red";
}
