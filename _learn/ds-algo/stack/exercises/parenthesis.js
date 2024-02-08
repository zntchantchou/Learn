import Stack from "../stack"

const exprA = "2.3 + 23 / 12 + + 60 + 90 + (3.14159 * .24"
const exprB = "(1 + 1)* 3 + 2 * 2) "
const exprC = "(1 + 1)* 3 / 2 * 2) "

function isParenthesis(char) {
  return ["(", ")"].includes(char);
}


// trim all blank spaces
// push each parenthesis to the stack
// if peek is an opening bracket and current char is not a number or an operator or is the last character, push current Position + 


function locateMissingParenthesis(expr) {
  const s = new Stack();
  expr = expr.replaceAll(' ', '')
  console.log('expr', expr);
  for(let i = 0; i < expr.length ; i++) {
    if(isParenthesis(expr.charAt(i))) {
      console.log('parenthesis', expr.charAt(i));
      s.push({position: i, character: expr.charAt(i)});
    }
    // last saved is opening parenthesis at end of string
    if(i === expr.length - 1 && s.peek().character === '(') {
     return expr.length
    }
  }
  console.log('STACK content ', s.dataStore);
}

const missingIndex = locateMissingParenthesis(exprA);
console.log('missingIndex ', missingIndex)