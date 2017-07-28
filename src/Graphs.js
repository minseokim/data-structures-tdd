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
  //use hasOwnProperty because our key might be 0, in which case evaluating it to boolean returns false
  return this.vertices.hasOwnProperty(val);
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
  const fromNodeEdgesRot = this.edges[fromNodeIndex];

  //If no root exists, this means no edge exists from fromNode
  if (!fromNodeEdgesRot) {
    return false;
  }

  return fromNodeEdgesRot.search(toNode);
};

Graph.prototype.removeVertex = function(val) {
  if (!this.hasVertex(val)) {
    throw new Error("Trying to remove vertex that doesn't exist");
  }

  const fromNodeIndex = this.vertices[val];

  //delete edges first(set the root edge to null)
  this.edges[fromNodeIndex] = null;

  //delete vertex from map
  delete this.vertices[val];

  this._vertexSize -= 1;
};

Graph.prototype.removeEdge = function(fromNode, toNode) {
  //validate edge first
  if (!this.hasEdge(fromNode, toNode)) {
    throw new Error("Trying to remove edge when edges don't exist");
  }

  const fromNodeIndex = this.vertices[fromNode];
  let fromNodeEdgesRoot = this.edges[fromNodeIndex];

  //Since the 'delete' operation in our BST returns null when deleting root, we need to handel that edge case and set root to null.
  if (fromNodeEdgesRoot.delete(toNode) === null) {
    this.edges[fromNodeIndex] = null;
  }

  //Decrease edgesize
  this._edgeSize -= 1;
};

Graph.prototype.getNeighbors = function(sourceNode) {
  if (!this.hasVertex(sourceNode)) {
    throw new Error("Trying to get neighbors of a vertex that doesn't exist");
  }

  const neighbors = [];
  const sourceNodeIndex = this.vertices[sourceNode];
  const sourceNodeRoot = this.edges[sourceNodeIndex];

  if (!sourceNodeRoot) return [];

  const cb = root => {
    neighbors.push(root.data);
  };

  sourceNodeRoot.traversePre(cb);

  return neighbors.slice(1);
};

Graph.prototype.dfs = function(currentVertex) {
  const visited = new Set();
  const result = [];
  const that = this;

  const dfsRecurse = function(vertex) {
    //if currentVertex is already processed, return
    if (visited.has(vertex)) {
      return;
    }

    //set currentVertex as visited
    visited.add(vertex);

    let neighbors = that.getNeighbors(vertex);

    for (let nextNeighbor of neighbors) {
      dfsRecurse(nextNeighbor);
    }

    result.push(vertex);
  };

  dfsRecurse(currentVertex);
  return result;
};

Graph.prototype.bfs = function(currentVertex) {
  const visited = new Set();
  const queue = [];
  const result = [];
  //enqueue currentVertex in queue
  queue.push(currentVertex);

  //iterate as long as queue isn't empty
  while (queue.length > 0) {
    //dequeue from front
    let current = queue.shift();

    //if it's already visited continue
    if (visited.has(current)) continue;

    //process or do something here
    result.push(current);

    //mark it as visited
    visited.add(current);

    //enqueue all its neighbors
    let neighbors = this.getNeighbors(current);

    for (let nextNeighbor of neighbors) {
      queue.push(nextNeighbor);
    }
  }

  return result;
};
