const Heap = function() {
  this._storage = [];
  this._size = 0;
};
Heap.prototype.swap = function(index1, index2) {
  let temp = this._storage[index1];
  this._storage[index1] = this._storage[index2];
  this._storage[index2] = temp;
};
Heap.prototype.hasLeftChild = function(index) {
  return this.getLeftChildIndex(index) < this._size;
};

Heap.prototype.hasRightChild = function(index) {
  return this.getRightChildIndex(index) < this._size;
};

Heap.prototype.hasParent = function(index) {
  return this.getParentIndex(index) >= 0;
};

Heap.prototype.getLeftChildIndex = function(index) {
  let leftChildIndex = 2 * index + 1;

  return leftChildIndex;
};
Heap.prototype.getRightChildIndex = function(index) {
  let rightChildIndex = 2 * index + 2;

  return rightChildIndex;
};
Heap.prototype.getLeftChild = function(index) {
  let leftChildIndex = this.getLeftChildIndex(index);

  return this._storage[leftChildIndex];
};
Heap.prototype.getRightChild = function(index) {
  let rightChildIndex = this.getRightChildIndex(index);

  return this._storage[rightChildIndex];
};
Heap.prototype.getParentIndex = function(index) {
  return Math.floor((index - 1) / 2);
};

Heap.prototype.getParent = function(index) {
  return this._storage[this.getParentIndex(index)];
};

Heap.prototype.insert = function(val) {
  this._storage[this._size] = val;

  this._size += 1;
  //Re-heapify up

  this.heapifyUp();
};
Heap.prototype.peekMin = function() {
  if (this._size === 0) throw new Error("Heap is currently empty!");

  return this._storage[0];
};
Heap.prototype.removeMin = function() {
  if (this._size === 0) throw new Error("Heap is currently empty!");

  //First store reference to root(Minimum)'s data
  let min = this._storage[0];

  //Since we're removing it, we need to copy over the last item's data into min's index
  this._storage[0] = this._storage[this._size - 1];

  //reduce the size
  this._size -= 1;

  //Re-heapify the root element down
  this.heapifyDown();
  return min;
};

Heap.prototype.heapifyDown = function() {
  //start at index 0
  let index = 0;

  //Only need to check left child - since heap is a complete BST, if no left child, then there WON'T BE a right child.
  while (this.hasLeftChild(index)) {
    let smallerChildIndex = this.getLeftChildIndex(index);
    //compare it with the rightChildIndex to find the minimum
    //if it HAS a rightChild, and the rightchild is smaller than leftChild, make rightChild the smallerChildIndex.
    if (
      this.hasRightChild(index) &&
      this.rightChild(index) < this.leftChild(index)
    ) {
      smallerChildIndex = this.getRightChildIndex(index);
    }

    //Heap property satisfied, BREAK.
    if (this._storage[index] < this._storage[smallerChildIndex]) {
      break;
    } else {
      this.swap(index, smallerChildIndex);
    }
    //re-set index to smallerChildIndex for next iteration
    index = smallerChildIndex;
  }
};

Heap.prototype.heapifyUp = function() {
  //start at last index
  let index = this._size - 1;

  //Only do something if parent exists AND heap property is violated(parent > child)
  while (
    this.hasParent(index) &&
    this.getParent(index) > this._storage[index]
  ) {
    //swap parent with index
    this.swap(this.getParentIndex(index), index);
    //re-set index
    index = this.getParentIndex(index);
  }
};
