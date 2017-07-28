const BinarySearchTree = function(data) {
  this.data = data;
  this.leftChild = null;
  this.rightChild = null;
};

BinarySearchTree.prototype.search = function(val) {
  if (this.data === val) {
    return true;
  } else if (this.data > val) {
    return !!this.leftChild && this.leftChild.search(val);
  } else if (this.data < val) {
    return !!this.rightChild && this.rightChild.search(val);
  }
  return false;
};

BinarySearchTree.prototype.traverseIn = function(cb) {
  if (this.leftChild) {
    this.leftChild.traverseIn(cb);
  }

  cb(this);

  if (this.rightChild) {
    this.rightChild.traverseIn(cb);
  }
};

//Pre-Order
BinarySearchTree.prototype.traversePre = function(cb) {
  cb(this);

  if (this.leftChild) {
    this.leftChild.traverseIn(cb);
  }

  if (this.rightChild) {
    this.rightChild.traverseIn(cb);
  }
};

BinarySearchTree.prototype.insert = function(val) {
  if (this.data > val) {
    if (this.leftChild) {
      this.leftChild.insert(val);
    } else {
      this.leftChild = new BinarySearchTree(val);
    }
  } else if (this.data < val) {
    if (this.rightChild) {
      this.rightChild.insert(val);
    } else {
      this.rightChild = new BinarySearchTree(val);
    }
  } else if (this.data === val) {
    throw new Error("Node with this value already exists!");
  }
};

//Pass the parent as an argument!
BinarySearchTree.prototype.delete = function(val, root) {
  //we will have to re-set 'this'(which isn't possible), so we will pass in an additional parameter called root that will be initialized to 'this'
  root = root || this;

  if (!root) return null;

  //Go left
  if (root.data > val) {
    root.leftChild = root.delete(val, root.leftChild);

    //Go right
  } else if (root.data < val) {
    root.rightChild = root.delete(val, root.rightChild);
  } else {
    //We've found our node, need to delete it

    //Caes 1 : Leaf node
    if (root.leftChild === null && root.rightChild === null) {
      root = null;
    } else if (root.leftChild === null) {
      //Case 2 : Only rightChild or Only leftChild
      root = root.rightChild;
    } else if (root.rightChild === null) {
      root = root.leftChild;
    } else {
      //Case 3 : Two children

      //Find minimum in rightSubtree
      let minInRightSubTree = root.rightChild.findMin();
      //Copy this data into root!
      root.data = minInRightSubTree.data;

      //now there is a duplicate node in RightSubtree, delete it(We're calling it FROM the reference of the right subtree.)
      root.rightChild = root.delete(minInRightSubTree.data, root.rightChild);
    }
  }

  //Don't forget to return root
  return root;
};

BinarySearchTree.prototype.findMin = function() {
  //Recursive Approach
  // if (this.leftChild === null) {
  //   return this;
  // } else {
  //   return this.leftChild.findMin();
  // }

  //Iterative Approach
  let min = this;
  while (min.leftChild !== null) {
    min = min.leftChild;
  }
  return min;
};

BinarySearchTree.prototype.findMax = function() {
  //Recursive Approach
  if (this.rightChild === null) {
    return this;
  } else {
    return this.rightChild.findMax();
  }

  //Iterative Approach
  // let max = this;
  // while (max.rightChild !== null) {
  //   max = max.rightChild;
  // }
  // return max;
};

BinarySearchTree.prototype.deleteMin = function() {
  //if we've reached leftmost node, return its rightChild
  //its rightChild can be either an element, or null
  if (this.leftChild === null) {
    return this.rightChild;
  }
  this.leftChild = this.leftChild.deleteMin();
  //need to return this every time so the parent can preserve the leftChild
  return this;
};

BinarySearchTree.prototype.deleteMax = function() {
  //if we've reached rightMost node, return its leftChild
  //its rightChild can be either an element, or null
  if (this.rightChild === null) {
    return this.leftChild;
  }
  this.rightChild = this.rightChild.deleteMax();
  //need to return this every time so the parent can preserve the rightChild
  return this;
};
