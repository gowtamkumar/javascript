const withTimestamp = (fn) => {
  return (...arg) => {
    console.log(`Execution started at: ${new Date().toDateString()}`);
    return fn(...arg);
  };
};

const saveUser = (user) => console.log(`Saving ${user} to db`);

const saveUserWithLog = withTimestamp(saveUser);
saveUserWithLog("Gowtam");
