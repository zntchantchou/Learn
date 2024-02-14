import Stack from "./stack.js";
import toBase from "./aside/base.js";

let s = new Stack();
const res = toBase(55, 2);
console.log("RES ", res);
console.log("RES 125 % 8", toBase(125, 8));
