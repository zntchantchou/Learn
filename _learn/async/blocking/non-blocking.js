// https://nodejs.org/en/learn/asynchronous-work/overview-of-blocking-vs-non-blocking
import fs from "node:fs";

/**
 "JavaScript execution in Node.js is single threaded, so concurrency refers to
 the event loop's capacity to execute JavaScript callback functions AFTER completing other work" 
*/

// readFile is non-blocking, meaning it executes AFTER synchronous code
fs.readFile("./file.json", (err, data) => {
  if (err) {
    throw err;
  }
  console.log("[readFile] data", data);
});

doMoreStuff();

function doMoreStuff() {
  console.log("do more stuff");
}
