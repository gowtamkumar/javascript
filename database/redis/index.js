const client = require("./config");

async function init() {
  const newDATa = { name: "gowtam kumar", age: 33 };
  await client.set("data:1", JSON.stringify(newDATa));
  client.expire("data:1", 10);
  const result = await client.get("data:1");
  console.log("asdfasdf", result);
}
init();
