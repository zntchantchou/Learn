function Stack() {
  this.dataStore = [];
  this.top = 0;
  this.push = push;
  this.pop = pop;
  this.peek = peek;
  this.length = length;
  this.clear = clear;

  /**
   * Adds one element on top of the stack
   * @param {*} element 
   */
  function push(element)  {
    this.dataStore[this.top] = element;
    this.top++;
  }

  /**
   * Returns top element of the stack, decrements stack's top
   * @param {*} element 
   */
  function pop() {
     return this.dataStore[--this.top];
  }

  /** Returns the top value of the top element in the stack (does not update stack) */
  function peek() {
    return this.dataStore[this.top - 1];
  }


  function length () {
    return this.top;
  }


  function clear() {
    this.top = 0;
  }
}

export default Stack;