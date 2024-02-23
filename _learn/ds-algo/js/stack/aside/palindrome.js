import Stack from "../stack";

const testString = "A man, a plan, a canal: Panama";
let matchLettersRgx = /[^a-zA-z]/g;

function isPalindrome(word) {
  let wordLetters = word.replace(matchLettersRgx, "");
  let s = new Stack();
  let result = "";
  for (let i = 0; i < wordLetters.length; i++) {
    let letter = String(wordLetters).charAt(i);
    if (letter) {
      s.push(letter);
    }
  }
  while (s.length() > 0) {
    result += s.pop();
  }
  return result.toUpperCase() === wordLetters.toUpperCase();
}

console.log("\n\nA WORD: ", isPalindrome("A WORD"));
console.log(testString + " :", isPalindrome(testString));
