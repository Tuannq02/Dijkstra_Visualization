class Graph {
  constructor() {
    this.nodeList = new Array();
    this.edgeList = new Array();
  }

  addNode(info, x, y) {
    let currentList = new Array();
    currentList.push(new Node(info, x, y));
    this.nodeList.push(currentList);
  }

  indexByInfo(info) {
    for (let i = 0; i < this.nodeList.length; i++) {
      if (this.nodeList[i][0].info === info) {
        return i;
      }
    }
  }

  indexByNode(node) {
    for (let i = 0; i < this.nodeList.length; i++) {
      if (this.nodeList[i][0] == node) {
        return i;
      }
    }
  }

  edgeByNode(src, dest) {
    for (let i = 0; i < this.edgeList.length; i++) {
      if (this.edgeList[i].src == src && this.edgeList[i].dest == dest) {
        return i;
      }
    }
  }

  addEdge(src, dest, weight) {
    let srcIndex = this.indexByInfo(src);
    let destIndex = this.indexByInfo(dest);
    this.nodeList[srcIndex].push(this.nodeList[destIndex][0]);
    this.edgeList.push(
      new Edge(this.nodeList[srcIndex][0], this.nodeList[destIndex][0], weight)
    );
  }

  showNodes() {
    for (let i = 0; i < this.nodeList.length; i++) {
      this.nodeList[i][0].show();
    }
  }

  showEdges() {
    for (let i = 0; i < this.edgeList.length; i++) {
      this.edgeList[i].show();
    }
  }

  findPath(start, end) {
    let solution;
    let path = "";
    let nodeIndex;
    let currentNode;
    let currentEdge;
    let edgeIndex;
    let newCost;
    let nodeQueue = new Queue();
    let edgeQueue = new Queue();
    nodeIndex = this.indexByNode(start);
    this.nodeList[nodeIndex][0].cost = 0;
    nodeQueue.enqueue(start);
    while (!nodeQueue.isEmpty()) {
      nodeIndex = this.indexByNode(nodeQueue.peek());
      print(this.nodeList[nodeIndex][0].info);
      for (let i = 1; i < this.nodeList[nodeIndex].length; i++) {
        edgeIndex = this.edgeByNode(
          this.nodeList[nodeIndex][0],
          this.nodeList[nodeIndex][i]
        );
        currentEdge = this.edgeList[edgeIndex];
        if (currentEdge.src != end && currentEdge.dest != start) {
          edgeQueue.enqueue(this.edgeList[edgeIndex]);
        }
        if (nodeQueue.checkExist(this.nodeList[nodeIndex][i]) == false) {
          nodeQueue.enqueue(this.nodeList[nodeIndex][i]);
        }
      }
    }
    while (!edgeQueue.isEmpty()) {
      currentEdge = edgeQueue.dequeue();
      print(currentEdge.src.info + "-" + currentEdge.dest.info);
      newCost = currentEdge.src.cost + currentEdge.weight;
      if (newCost < currentEdge.dest.cost) {
        currentEdge.dest.cost = newCost;
        currentEdge.dest.prev = currentEdge.src;
      }
    }
    for (let i = 0; i < this.nodeList.length; i++) {
      if (this.nodeList[i][0].prev != null) {
        print(
          this.nodeList[i][0].info +
            "-" +
            this.nodeList[i][0].cost +
            "-" +
            this.nodeList[i][0].prev.info
        );
      } else {
        print(
          this.nodeList[i][0].info + "-" + this.nodeList[i][0].cost + "-start"
        );
      }
    }
    nodeIndex = this.indexByNode(end);
    currentNode = this.nodeList[nodeIndex][0];
    path += currentNode.info;
    while (currentNode.prev != null) {
      path += currentNode.prev.info;
      currentNode = currentNode.prev;
    }
    return this.reversePath(path);
  }

  reversePath(path) {
    let newPath = "";
    for (let i = path.length - 1; i >= 0; i--) {
      newPath += path[i];
    }
    return newPath;
  }
}
