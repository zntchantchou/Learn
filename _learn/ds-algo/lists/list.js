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

  /**
   * return whether the list contains the specified element all the elements stored
   * @returns {boolean}
   */
  function contains(element) {
    let found = false;
    for(let i = 0; i < this.dataStore.length; i++) {
      if(this.dataStore[i] == element) {
        found = true;
      }
    }
    return found;
  }

/** set position to first element
 * @returns {void}
 */
  function front() {
    this.pos = 0;
  }

/** set position to first element
 * @returns {void}
 */
  function end() {
    this.pos = this.size - 1;
  }

/** move back one position
 * @returns {void}
 */
  function prev() {
    console.log('prev ');
    if(this.pos >= 0) {
      --this.pos;
    }
  }
  
 /** move position forward by one 
 * @returns {void}
 */
  function next() {
    if(this.pos <= this.size - 1) {
      ++this.pos;
    }
  }

 /** move position to provided index
 * @returns {void}
 */
  function moveTo(position) {
    if(position && position >= 0 && position < this.size - 1) {
      this.pos = position;
      return 
    }
  }

/** set position to first element
 * @returns {*}
 */
  function getElement() {
    if(this.pos >= 0 && this.pos < this.size) {
      return this.dataStore[this.pos];
    }
    console.log('[List.getElement]: index is out of range' )
    return null;
  }
}

// returns the current position (useful for iterator pattern usage)
function currPos() {
  return this.pos;
}

export default List;
