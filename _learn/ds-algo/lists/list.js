function List() {
  this.pos = 0;
  this.dataStore = [];
  this.size = this.dataStore.length;
  this.append = append;
  this.remove = remove;
  this.findIndex = findIndex;
  this.toString = toString;
  this.insert = insert;
  this.clear = clear;
  this.length = length;
  this.contains = contains;
  this.prev = prev;
  this.next = next;
  this.front = front;
  this.end = end;
  this.moveTo = moveTo;
  this.getElement = getElement;
  this.currPos = currPos;
  /**
   * appends element to the end of the list
   * @param {*} element
   * @returns {void}
   */
  function append(element) {
    console.log("[APPEND] ");
    this.dataStore[this.size++] = element;
  }

  /**
   * removes the element from the list if found, return the
   * @param {*} element
   * @returns {boolean}
   */
  function remove(element) {
    console.log("[Remove]");
    let index = this.dataStore.findIndex((storedElt) => storedElt === element);
    if (index < 0) {
      console.log("[Remove]: element not found");
      return false;
    }
    this.dataStore.splice(index, 1);
    this.size = this.dataStore.length;
    return true;
  }

  /**
   * finds the index of an element
   * @param {*} element
   * @returns  if not found: -1, if found: the index
   */
  function findIndex(element) {
    console.log("[FINDINDEX] ");
    for (let i = 0; i < this.dataStore.length; i++) {
      if (this.dataStore[i] == element) {
        return i;
      }
    }
    return -1;
  }

  /**
   * returns the actual list elements as an array
   * @param {*} element
   * @param {*} after
   * @returns {Array<*>}
   */
  function toString() {
    return this.dataStore;
  }

  /**
   * length of the list
   * @param {*} element
   * @param {*} after
   * @returns {number}
   */
  function length() {
    return this.size;
  }

  /**
   * insert element after the element specified as first param
   * @param {*} element
   * @param {*} after
   * @returns {void}
   */
  function insert(after, element) {
    const index = this.findIndex(after);
    if (index < 0) {
      console.log("[insert]: element not found");
      return;
    }
    console.log("[insert] inserting at index ", index);
    this.dataStore.splice(index + 1, 0, element);
    return;
  }

  /**
   * removes all the elements stored
   * @returns {void}
   */
  function clear() {
    this.dataStore = [];
    this.size = this.dataStore.length;
  }
}

export default List;
