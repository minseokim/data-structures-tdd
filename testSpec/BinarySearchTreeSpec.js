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

  it("should have methods named 'search', 'traverse', 'insert', 'delete', 'findMin', 'findMax'", () => {
    assert.typeOf(BST.search, "function");
    assert.typeOf(BST.traverse, "function");
    assert.typeOf(BST.insert, "function");
    assert.typeOf(BST.delete, "function");
    assert.typeOf(BST.findMin, "function");
    assert.typeOf(BST.findMax, "function");
  });

  it("should support inserting into leftChild, and rightChild", () => {
    assert.equal(BST.leftChild.data, null);
    assert.equal(BST.rightChild.data, null);
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

  it("should find the minimum", () => {});

  it("should find the maximum", () => {});
});
