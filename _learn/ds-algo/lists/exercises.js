import List from "./list";

export default function appendIfLargest(element, list) {
  let largest = true;
  for (let i = 0; i < list.size; i++) {
    if (list.toString()[i] > element) {
      largest = false;
      break;
    }
  }
  if (largest) list.append(element);
  return;
}

function appendIfSmallest(element, list) {
  // no element in the list should be smaller than the value provided
  const predicateFn = (value, elements) => () =>
    !elements.toString().some((element) => element < value);
  appendIf(element, list, predicateFn);
}
ÒÒÒ;
// const nums = new List();
// nums.append(1);
// nums.append(2);
// nums.append(3);
// appendIfLargest(4, nums);

const names = new List();
names.append("Ash");
names.append("Luke");
names.append("Zambe");
appendIfSmallest("Zob", names);

// console.log("TO STRING: ", nums.toString());
console.log("TO STRING: ", names.toString());
