/* Adjacency List for a directed graph Implementation using BST's */
const Graph = function() {
  //Hash table maps value ==> index
  this.vertices = {};
  //Array to store root node of edge BST nodes
  this.edges = [];

  this._vertexSize = 0;
  this._edgeSize = 0;
};

Graph.prototype.addVertex = function(val) {
  //First check if it exists in our vertices,
  //if it doesn't map from value ---> index(# of vertices)
  if (!this.vertices[val]) {
    this.vertices[val] = this._vertexSize;
  }
  this._vertexSize += 1;
};

Graph.prototype.hasVertex = function(val) {
  return this.vertices[val] !== undefined;
};

Graph.prototype.addEdge = function(fromNode, toNode) {
  //Validate both nodes
  if (!this.hasVertex(fromNode) || !this.hasVertex(toNode)) {
    throw new Error("Trying to add edges between vertices that don't exist");
  }

  //get index of fromNode
  const fromNodeIndex = this.vertices[fromNode];

  //get root of adjacency list
  const fromNodeEdgesRoot = this.edges[fromNodeIndex];

  //if it doesn't exist, initialize new BST as root with value fromNode
  if (!fromNodeEdgesRoot) {
    this.edges[fromNodeIndex] = new BinarySearchTree(fromNode);
  }

  //Insert new node to BST with the value of toNode
  this.edges[fromNodeIndex].insert(toNode);

  //increase edge size
  this._edgeSize += 1;
};

Graph.prototype.hasEdge = function(fromNode, toNode) {
  //Validate both nodes
  if (!this.hasVertex(fromNode) || !this.hasVertex(toNode)) {
    throw new Error("Trying to check edges between vertices that don't exist");
  }

  const fromNodeIndex = this.vertices[fromNode];
  const fromNodeRoot = this.edges[fromNodeIndex];

  //If no root exists, this means no edge exists from fromNode
  if (!fromNodeRoot) {
    return false;
  }

  return fromNodeRoot.search(toNode);
};

Graph.prototype.removeVertex = function(fromNode, toNode) {};

Graph.prototype.removeEdge = function(fromNode, toNode) {
  //validate edge first
  if (!this.hasEdge(fromNode, toNode)) {
    throw new Error("Trying to remove edge when edges don't exist");
  }

  const fromNodeIndex = this.vertices[fromNode];
  let fromNodeRoot = this.edges[fromNodeIndex];

  //Since the 'delete' operation in our BST returns null when deleting root, we need to handel that edge case and set root to null.
  if (fromNodeRoot.delete(toNode) === null) {
    this.edges[fromNodeIndex] = null;
  }

  //Decrease edgesize
  this._edgeSize -= 1;
};

Graph.prototype.getNeighbors = function(source) {};
