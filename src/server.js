const app = require("./app");
const connect = require("./configs/db");
const port = process.env.PORT || 2566;
app.listen(port, async function () {
  await connect();
  console.log("listening on port 2566:", +port);
});
