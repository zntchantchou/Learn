function* fruitGenerator() {
  console.log("one");
  yield "apple";
  console.log("two");
  yield "orange";
  console.log("three");

  return "watermelon";
}

const newFruitGenerator = fruitGenerator();
console.log(newFruitGenerator.next());
console.log(newFruitGenerator.next());
console.log(newFruitGenerator.next());
console.log(newFruitGenerator.next()); // at this point logs { value: undefined, done: true }
