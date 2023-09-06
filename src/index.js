import { listen } from "./app";
import "./database";
async function init() {
  await listen(3000);
  console.log("Server on port 3000");
}
init();
