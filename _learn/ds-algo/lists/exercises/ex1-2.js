import List from "../list";

export function appendIfLargest(element, list) {
  if (list.isLargestElement(element)) list.append(element);
} 


export function appendIfSmallest(element, list) {
  if(list.isSmallestElement(element)) list.append(element);
}

const nums = new List();
nums.append(1);
nums.append(2);
nums.append(3);
appendIfLargest(4, nums);

const names = new List();
names.append("Ash");
names.append("Luke");
names.append("Zambe");
