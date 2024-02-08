import Stack from '../stack.js';

function fact(num) {
  const s = new Stack();
  for(let i = 1; i <= num; i++) {
    s.push(i);
  }
  let product = 1;
  while(s.length() > 0) {
    console.log('current product ', product);
    product *= s.pop();
  }
  return product;
}


fact(5);