/* Adjacency List for a directed graph Implementation using BST's */
const Graph = function() {
  //Hash table maps value ==> index
  this.vertices = {};
  //Array to store root node of edge BST nodes
  this.edges = [];

  this._vertexSize = 0;
  this._edgeSize = 0;
};

Graph.prototype.addNode = function(val) {};

Graph.prototype.contains = function(val) {};

Graph.prototype.hasEdge = function(fromNode, toNode) {};

Graph.prototype.removeNode = function(fromNode, toNode) {};

Graph.prototype.addEdge = function(fromNode, toNode, count) {};

Graph.prototype.removeEdge = function(fromNode, toNode) {};

Graph.prototype.getNeighbors = function(source) {};
