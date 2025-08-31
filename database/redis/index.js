const client = require("./config");

async function init() {
  await client.set("data:1", "hello boss hwo old are you?");
  client.expire("data:1", 10);
  const result = await client.get("data:1");
  console.log("asdfasdf", result);
}
init();
