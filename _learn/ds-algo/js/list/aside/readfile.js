import fs from "fs";

export function createArr(path) {
  console.log("createArr");

  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (err, data) => {
      if (err) {
        console.log("[createArr] error: ", err);
        reject(new Error(err));
      }
      resolve(data.split("\n").map((line) => line.trim().toUpperCase()));
    });
  });
  // new character is replaced with a space
}
