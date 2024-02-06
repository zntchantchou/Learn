import Stack from "./stack";

let s = new Stack();
s.push('A')
s.push('B')
s.push('C')
s.push('D')

console.log('s.length ', s.length())
console.log('s.peek before ', s.peek())
s.pop()
console.log('s.peek after', s.peek())
console.log('s.peek after length', s.length())

