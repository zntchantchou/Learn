function* iteratorGenerator(arr: string[]) {
  for (var i = 0; i < arr.length; i++) {
    yield arr[i];
    return "fuck";
  }
}
// iteratorGenerator will pause at each yield inside the loop.
// We use the word 'pause' as opposed to 'return'.
// IMPORTANT: This demonstrates how the state of the generator is MAINTAINED ACROSS INVOCATIONS.
const fruits = ["banana", "orange", "watermelon", "apple"];
const iterator = iteratorGenerator(fruits);
let currentItem = iterator.next();

while (!currentItem.done) {
  console.log("value: ", currentItem.value);
  currentItem = iterator.next();
}
