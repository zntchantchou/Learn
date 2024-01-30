import { fibAsync } from "../../fib/fib";

const start = Date.now();

const results = await Promise.all([
  fibAsync(40, { promiseId: 1 }),
  fibAsync(40, { promiseId: 2 }),
  fibAsync(40, { promiseId: 3 }),
  fibAsync(40, { promiseId: 4 }),
  fibAsync(40, { promiseId: 5 }),
  fibAsync(40, { promiseId: 6 }),
]);
const end = Date.now();
const totalTime = end - start;

console.log("--- single threaded version ---");
console.log("RESULTS: \n", results);
console.log("TOTAL TIME: \n", totalTime, "ms");
// that is all we can do without being able to create more threads
