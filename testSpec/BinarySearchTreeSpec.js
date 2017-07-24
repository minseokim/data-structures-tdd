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
    assert.equal(BST.findMin().data, 3);
    BST.insert(7);
    assert.equal(BST.findMin().data, 7);
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
    BST.traverse(store);
    let str = "";
    store.forEach(curr => {
      str += String(curr);
    });
    assert.equal(str, "23546");
  });

  it("should support delete", () => {
    BST.insert(8);
    assert.equal(BST.search(8), true);
    BST.delete(8);
    assert.equal(BST.search(8), false);
    //delete root
    BST.delete(3);
    assert.equal(BST.search(3), false);
  });
});
