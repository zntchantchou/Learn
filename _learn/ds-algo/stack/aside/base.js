<<<<<<< HEAD
// convert a number from one base to another using
=======
/** convert a number from one base to another and returns it as a string */
import Stack from "../stack";

function toBase(num, base) {
  const s = new Stack();
  s.push(num % base);
  while (num / base >= 1) {
    num = num / base;
    s.push(Math.floor(num) % base);
  }
  let result = "";
  while (s.length() > 0) {
    const element = s.pop();
    result += element;
  }
  return result;
}

export default toBase;
>>>>>>> 96f2125 (stack -> add palindrome)
