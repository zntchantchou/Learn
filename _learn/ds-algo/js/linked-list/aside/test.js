import LinkedList from "../LinkedList";

const ll = new LinkedList();
ll.insertAfter('two')
ll.insertAfter('three', 'two')
ll.insertAfter('four', 'three')
ll.remove("two")
ll.print()