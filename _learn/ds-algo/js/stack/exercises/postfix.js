import Stack from "../stack";

// examples
// 2 + 3 => 23+
// 2 + 3 * 4 => 234*+
// 5 * (2 + 5) * 8 => 525+*8*

const exprA = "3*4+2*5"; // expected: 34*25*+
const exprB = "3*(4+2)*5"; // expected: 342+*5*

// REMARKS

/**
 * Postfix eliminates parenthesis
 * All operands are preserved in order
 * Operands appear in the actual order of execution
 * Double digit number are separated from other numbers by a space
 */

const OPERANDS = ["+", "-", "*", "/", "%"];
const PARENTHESIS = ["(", ")"];

function isOperand(char) {
  return OPERANDS.includes(char);
}

function toPostFix(expr) {
  const operandsStack = new Stack();
  const operatorsStack = new Stack();
  for (let i = 0; i < expr.length; i++) {
    if (isOperand(expr[i])) operandsStack.push(expr[i]);
    else {
      operatorsStack.push(expr[i]);
    }
  }
  console.log("operandsStack ", operandsStack.dataStore);
  console.log("operatorsStack", operatorsStack.dataStore);
}

toPostFix(exprA)