const assert = chai.assert;

describe("Binary Search Tree", () => {
  let BST;

  beforeEach(function() {
    BST = new BinarySearchTree(3);
  });

  it("should have properties 'data', 'leftChild' and 'rightChild'", () => {
    assert.equal(BST.hasOwnProperty("data"), true);
    assert.equal(BST.hasOwnProperty("leftChild"), true);
    assert.equal(BST.hasOwnProperty("rightChild"), true);
  });

  it("should have methods named 'search', 'traverseIn','insert', 'delete', 'findMin', 'findMax', 'deleteMin', 'deleteMax'", () => {
    assert.typeOf(BST.search, "function");
    assert.typeOf(BST.traverseIn, "function");
    assert.typeOf(BST.insert, "function");
    assert.typeOf(BST.delete, "function");
    assert.typeOf(BST.findMin, "function");
    assert.typeOf(BST.findMax, "function");
    assert.typeOf(BST.deleteMin, "function");
    assert.typeOf(BST.deleteMax, "function");
  });

  it("should support inserting into leftChild, and rightChild", () => {
    assert.equal(BST.leftChild, null);
    assert.equal(BST.rightChild, null);
    BST.insert(4);
    BST.insert(2);
    assert.equal(BST.leftChild.data, 2);
    assert.equal(BST.rightChild.data, 4);
  });

  it("should support searching", () => {
    BST.insert(7);
    assert.equal(BST.search(3), true);
    assert.equal(BST.search(7), true);
    assert.equal(BST.search(4), false);
    assert.equal(BST.search(2), false);
  });

  it("should find the minimum", () => {
    BST.insert(-100);
    BST.insert(-39);
    assert.equal(BST.findMin().data, -100);
    BST.insert(-348);
    assert.equal(BST.findMin().data, -348);
  });

  it("should find the maximum", () => {
    BST.insert(1);
    BST.insert(2);
    assert.equal(BST.findMax().data, 3);
    BST.insert(7);
    assert.equal(BST.findMax().data, 7);
  });

  it("should traverse in-order", () => {
    const result = [];
    const store = BSTNode => {
      result.push(BSTNode.data);
    };
    BST.insert(4);
    BST.insert(2);
    BST.insert(6);
    BST.insert(5);
    BST.traverseIn(store);
    let str = "";

    for (let i = 0; i < result.length; i++) {
      str += result[i];
    }
    assert.equal(str, "23456");
  });

  it("should support deleteMin", () => {
    BST.insert(-10);
    BST.insert(-29);
    BST.insert(-16);
    BST.deleteMin();
    assert.equal(BST.search(-29), false);

    BST.deleteMin();
    assert.equal(BST.search(-16), false);

    BST.deleteMin();
    assert.equal(BST.search(-10), false);
    //Edge case of deleting root - won't delete root itself, will just return null.
    assert.equal(BST.deleteMin(), null);
  });

  it("should support deleteMax", () => {
    BST.insert(5);
    BST.insert(7);
    BST.insert(10);
    BST.deleteMax();
    assert.equal(BST.search(10), false);

    BST.deleteMax();
    assert.equal(BST.search(7), false);

    BST.deleteMax();
    assert.equal(BST.search(5), false);
    //Edge case of deleting root - won't delete root itself, will just return null.
    assert.equal(BST.deleteMax(), null);
  });

  it("should support delete", () => {
    BST.insert(8);
    BST.insert(5);
    BST.insert(10);
    BST.insert(9);
    BST.insert(11);
    //Delete leaf node
    BST.delete(11);
    assert.equal(BST.search(11), false);

    //Delete node with one child
    BST.delete(10);
    assert.equal(BST.search(10), false);

    //delete node with two children
    BST.delete(8);
    assert.equal(BST.search(8), false);
  });
});
