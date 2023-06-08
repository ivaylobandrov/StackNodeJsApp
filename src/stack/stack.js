let stackInstance = null;

class Stack {
  constructor() {
    if (!stackInstance) {
      stackInstance = this;
      this.stack = [];
    }

    return stackInstance;
  }

  push(item) {
    this.stack.push(item);
  }

  pop() {
    if (this.isEmpty()) {
      return 'The stack is empty';
    }

    return this.stack.pop();
  }

  isEmpty() {
    return this.stack.length === 0;
  }
}

module.exports = new Stack();
