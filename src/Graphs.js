const Graph = function() {
  //Hash table maps value ==> index
  this.vertices = {};
  //Array to store root node of edge BST nodes
  this.edges = [];

  this._vertexSize = 0;
  this._edgeSize = 0;
};
