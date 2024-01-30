// https://nodejs.org/en/learn/asynchronous-work/overview-of-blocking-vs-non-blocking
import fs from "node:fs";

// do more stuff will have to wait for the file to be read...
const data = fs.readFileSync("./file.json");
console.log("[readFileSync] data", data);
doMoreStuff();

function doMoreStuff() {
  console.log("doMoreStuff");
}
