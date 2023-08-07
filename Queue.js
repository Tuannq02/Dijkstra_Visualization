class Queue {
  constructor() {
    this.elements = new Array();
    this.head = 0;
    this.tail = 0;
  }

  enqueue(element) {
    this.elements[this.tail] = element;
    this.tail++;
  }

  dequeue() {
    if (this.head > this.tail) {
      print("Queue empty");
      return null;
    } else {
      const item = this.elements[this.head];
      delete this.elements[this.head];
      this.head++;
      return item;
    }
  }

  peek() {
    const item = this.elements[this.head];
    this.head++;
    return item;
  }

  checkExist(element) {
    if (this.elements.indexOf(element) != -1) {
      return true;
    } else {
      return false;
    }
  }

  isEmpty() {
    return this.head >= this.tail;
  }
}
