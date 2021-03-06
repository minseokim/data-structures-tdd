const assert = chai.assert;

/* Binary Search Trees */
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
    //Case 1 : Delete leaf node
    BST.delete(11);
    assert.equal(BST.search(11), false);

    //Case 2 : Delete node with one child
    BST.delete(10);
    assert.equal(BST.search(10), false);

    //Case 3 : delete node with two children
    BST.delete(8);
    assert.equal(BST.search(8), false);
  });
});

/*Binary Heaps(Min-Heap)*/
describe("Binary Heap(Min)", () => {
  let BinaryHeap;

  beforeEach(function() {
    BinaryHeap = new Heap();
  });

  it("should have properties '_storage', and '_size'", () => {
    assert.equal(BinaryHeap.hasOwnProperty("_storage"), true);
    assert.equal(BinaryHeap.hasOwnProperty("_size"), true);
  });

  it("should have methods, `heapifyUp`, `heapifyDown`, getLeftChildIndex`, `getRightChildIndex`, `getParentIndex`, 'search', `getSize`, 'insert', 'peekMin', 'removeMin', 'swap'", () => {
    assert.typeOf(BinaryHeap.getLeftChildIndex, "function");
    assert.typeOf(BinaryHeap.getRightChildIndex, "function");
    assert.typeOf(BinaryHeap.getParentIndex, "function");
    assert.typeOf(BinaryHeap.peekMin, "function");
    assert.typeOf(BinaryHeap.insert, "function");
    assert.typeOf(BinaryHeap.removeMin, "function");
    assert.typeOf(BinaryHeap.swap, "function");
    assert.typeOf(BinaryHeap.heapifyDown, "function");
    assert.typeOf(BinaryHeap.heapifyUp, "function");
  });

  it("should peekMin correctly", () => {
    BinaryHeap.insert(1);
    BinaryHeap.insert(5);
    BinaryHeap.insert(-2);
    BinaryHeap.insert(-3);
    assert.equal(BinaryHeap.peekMin(), -3);
  });

  it("should getLeftChild and check to see if leftChild exists correctly", () => {
    BinaryHeap.insert(1);
    BinaryHeap.insert(2);
    BinaryHeap.insert(3);
    assert.equal(BinaryHeap.getLeftChild(0), 2);
    BinaryHeap.insert(4);
    BinaryHeap.insert(5);
    assert.equal(BinaryHeap.getLeftChild(1), 4);
    assert.equal(BinaryHeap.hasLeftChild(4), false);
  });

  it("should getRightChild and check tos ee if rightChild exists correctly", () => {
    BinaryHeap.insert(1);
    BinaryHeap.insert(2);
    BinaryHeap.insert(3);
    assert.equal(BinaryHeap.getRightChild(0), 3);
    BinaryHeap.insert(4);
    BinaryHeap.insert(5);
    assert.equal(BinaryHeap.getRightChild(1), 5);
    assert.equal(BinaryHeap.hasRightChild(5), false);
  });

  it("should getRightChild and check tos ee if rightChild exists correctly", () => {
    BinaryHeap.insert(1);
    BinaryHeap.insert(2);
    BinaryHeap.insert(3);
    assert.equal(BinaryHeap.getRightChild(0), 3);
    BinaryHeap.insert(4);
    BinaryHeap.insert(5);
    assert.equal(BinaryHeap.getRightChild(1), 5);
    assert.equal(BinaryHeap.hasRightChild(5), false);
  });

  it("should insert and heapifyUp correctly", () => {
    BinaryHeap.insert(1);
    BinaryHeap.insert(-5);
    BinaryHeap.insert(-10);
    assert.equal(BinaryHeap._storage[0], -10);
    BinaryHeap.insert(-20);
    assert.equal(BinaryHeap._storage[0], -20);
  });

  it("should removeMin and heapifyDown correctly", () => {
    BinaryHeap.insert(1);
    BinaryHeap.insert(-5);
    BinaryHeap.insert(-10);
    assert.equal(BinaryHeap.removeMin(), -10);
    assert.equal(BinaryHeap._storage[0], -5);
  });
});

/* Graphs(Direced, Adjacency-List implementation using a BST)*/
describe("Graphs", () => {
  let graphOne;

  beforeEach(function() {
    graphOne = new Graph();
  });

  it("should have properties 'vertices', 'edges', '_vertexSize' and '_edgeSize'", () => {
    assert.equal(graphOne.hasOwnProperty("vertices"), true);
    assert.equal(graphOne.hasOwnProperty("edges"), true);
    assert.equal(graphOne.hasOwnProperty("_vertexSize"), true);
    assert.equal(graphOne.hasOwnProperty("_edgeSize"), true);
  });

  it("should add node correctly", () => {
    graphOne.addVertex(1);
    graphOne.addVertex(2);
    assert.equal(graphOne.hasVertex(1), true);
    assert.equal(graphOne.hasVertex(2), true);
    assert.equal(graphOne.hasVertex(3), false);
  });

  it("should add edge correctly", () => {
    graphOne.addVertex("a");
    graphOne.addVertex("b");
    graphOne.addVertex("c");
    graphOne.addEdge("a", "b");
    assert.equal(graphOne.hasEdge("a", "b"), true);
    assert.equal(graphOne.hasEdge("a", "c"), false);
    assert.equal(graphOne.hasEdge("b", "c"), false);
  });

  it("should remove edges correctly", () => {
    graphOne.addVertex("a");
    graphOne.addVertex("b");
    graphOne.addVertex("c");
    graphOne.addVertex("d");
    graphOne.addEdge("a", "b");
    graphOne.addEdge("a", "c");
    graphOne.addEdge("a", "d");
    graphOne.addEdge("b", "c");

    //remove edge between a->c
    graphOne.removeEdge("a", "c");
    //remove edge between a->d
    graphOne.removeEdge("a", "d");
    //remove edge between b->c
    graphOne.removeEdge("b", "c");

    assert.equal(graphOne.hasEdge("a", "c"), false);
    assert.equal(graphOne.hasEdge("b", "c"), false);
    assert.equal(graphOne.hasEdge("a", "b"), true);
    assert.equal(graphOne.hasEdge("c", "a"), false);
  });

  it("should remove vertex correctly", () => {
    graphOne.addVertex("a");
    graphOne.addVertex("b");
    graphOne.addVertex("c");
    graphOne.addVertex("d");
    graphOne.addEdge("a", "b");
    graphOne.addEdge("a", "c");
    graphOne.addEdge("a", "d");
    graphOne.addEdge("b", "c");

    graphOne.removeVertex("a");
    graphOne.removeVertex("d");

    assert.equal(graphOne.hasVertex("a"), false);
    assert.equal(graphOne.hasVertex("d"), false);
    assert.equal(graphOne.hasVertex("b"), true);
    assert.equal(graphOne.hasVertex("c"), true);

    //check edges
    // assert.throws(graphOne.hasEdge("a", "b"), "throws error");
    // assert.throws(graphOne.hasEdge("a", "d"), "throws error");
    assert.equal(graphOne.hasEdge("b", "c"), true);
  });

  it("should get neighbors correctly", () => {
    graphOne.addVertex("a");
    graphOne.addVertex("b");
    graphOne.addVertex("c");
    graphOne.addVertex("d");
    graphOne.addEdge("a", "b");
    graphOne.addEdge("b", "c");
    graphOne.addEdge("a", "d");

    assert.equal(JSON.stringify(graphOne.getNeighbors("a")), '["b","d"]');
    assert.equal(JSON.stringify(graphOne.getNeighbors("b")), '["c"]');
  });

  it("should depth-first-traverse correctly", () => {
    graphOne.addVertex("a");
    graphOne.addVertex("b");
    graphOne.addVertex("c");
    graphOne.addVertex("d");
    graphOne.addEdge("a", "d");
    graphOne.addEdge("a", "c");
    graphOne.addEdge("a", "b");
    graphOne.addEdge("b", "c");
    assert.equal(JSON.stringify(graphOne.dfs("a")), `["c","b","d","a"]`);
  });

  it("should breadth-first-traverse correctly", () => {
    graphOne.addVertex("a");
    graphOne.addVertex("b");
    graphOne.addVertex("c");
    graphOne.addVertex("d");
    graphOne.addEdge("a", "d");
    graphOne.addEdge("a", "c");
    graphOne.addEdge("a", "b");
    graphOne.addEdge("b", "c");
    assert.equal(JSON.stringify(graphOne.bfs("a")), `["a","b","c","d"]`);
    graphOne.addEdge("c", "a");
    graphOne.addEdge("c", "d");
    assert.equal(JSON.stringify(graphOne.bfs("c")), `["c","a","d","b"]`);
  });

  it("should get all vertices correctly by returning an iterator", () => {
    graphOne.addVertex("a");
    graphOne.addVertex("b");
    graphOne.addVertex("c");
    graphOne.addVertex("d");
    graphOne.addEdge("a", "d");
    graphOne.addEdge("a", "c");
    graphOne.addEdge("a", "b");
    graphOne.addEdge("b", "c");
    assert.equal(
      JSON.stringify(Array.from(graphOne.getVertices())),
      '["a","b","c","d"]'
    );
  });

  it("should detect cycles correctly", () => {
    graphOne.addVertex("a");
    graphOne.addVertex("b");
    graphOne.addVertex("c");
    graphOne.addVertex("d");
    graphOne.addEdge("a", "b");
    graphOne.addEdge("b", "c");
    graphOne.addEdge("c", "a");
    //Uncomment the line below, should throw an error
    // assert.equal(graphOne.dfs("a"), []);
  });
});

/* Tries */
describe("Tries", () => {
  let TrieRoot;

  beforeEach(function() {
    TrieRoot = new Trie();
  });

  it("should have properties root", () => {
    assert.equal(TrieRoot.hasOwnProperty("root"), true);
  });

  it("should insert words properly", () => {
    TrieRoot.insert("dictionary");
    TrieRoot.insert("dictation");
    TrieRoot.insert("dict");
    TrieRoot.insert("ab");
    TrieRoot.insert("abc");
    console.log(TrieRoot);
    assert.equal(TrieRoot.contains("dictionary"), true);
    assert.equal(TrieRoot.contains("dictation"), true);
    assert.equal(TrieRoot.contains("dic"), false);
    assert.equal();
  });

  // it("should delete words correctly", () => {
  //   TrieRoot.insert("dict");
  //   TrieRoot.insert("ab");
  //   TrieRoot.insert("abc");
  //   TrieRoot.insert("di");

  //   //Delete
  //   TrieRoot.delete("abc");
  //   TrieRoot.delete("di");

  //   assert.equal(TrieRoot.contains("abc"), false);
  //   assert.equal(TrieRoot.contains("ab"), true);
  //   assert.equal(TrieRoot.contains("di"), false);
  //   assert.equal(TrieRoot.contains("dict"), false);
  // });

  it("should get suggestions correctly", () => {
    TrieRoot.insert("dictionary");
    TrieRoot.insert("dictation");
    TrieRoot.insert("ab");
    TrieRoot.insert("abc");
    TrieRoot.insert("dict");

    assert.equal(TrieRoot.getSuggestions("dic"), true);
  });
});
