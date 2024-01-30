import fs from "fs";
import path from "path";

// function asyncFlow(generatorFn: any) {
//   function callback(error: Error) {
//     console.log("callback invoked");
//     if (error) {
//       return generator.throw(error);
//     }
//     // arguments is an array-like object accessible inside functions
//     // that contains the values of the arguments passed to that function.
//     var results = [].slice.call(arguments, 1); // generatorFn is called using .call
//     generator.next(results.length > 1 ? results : results[0]);
//   }
//   var generator = generatorFn(callback);
//   generator.next();
// }

// // handles a fake asynchronous operation the old way : a callback

// function* generate(callbackFn: any): Generator {
//   const filename = path.basename(__filename);
//   const myself = yield fs.readFile(filename, "utf8", callbackFn);
//   return;
// }
