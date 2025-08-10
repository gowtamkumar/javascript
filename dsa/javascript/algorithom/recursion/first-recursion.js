function firstRcursion(num) {
  if (num <= 0) {
    console.log("all Done");
    return;
  }
  console.log(num);
  num--;

  firstRcursion(num);
}

firstRcursion(1000);
