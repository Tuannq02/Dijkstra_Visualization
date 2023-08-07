let edge;
let graph;
let edgeArray = new Array();
let solutionArray = new Array();
let queue;
let index = 0;
let index1 = 0;
let solution;
let src;
let dest;
let solutionIndex1;
let solutionIndex2;
let edgeIndex0;
let edgeIndex1;
let edgeIndex2;
let nodeVisited;

function setup() {
  createCanvas(800, 500);
  graph = new Graph();
  graph.addNode("A", 150, 150);
  graph.addNode("B", 250, 250);
  graph.addNode("C", 450, 150);
  graph.addNode("D", 500, 250);
  graph.addNode("E", 650, 170);
  graph.addNode("F", 390, 380);
  graph.addNode("G", 610, 320);
  graph.addNode("H", 190, 360);
  graph.addNode("I", 730, 260);
  graph.addNode("J", 70, 250);
  graph.addEdge("A", "J", 3);
  graph.addEdge("J", "A", 3);
  graph.addEdge("J", "H", 4);
  graph.addEdge("H", "J", 4);
  graph.addEdge("I", "E", 3);
  graph.addEdge("E", "I", 3);
  graph.addEdge("G", "I", 1);
  graph.addEdge("I", "G", 1);

  graph.addEdge("A", "B", 5);
  graph.addEdge("B", "A", 5);
  graph.addEdge("A", "C", 10);
  graph.addEdge("C", "A", 10);
  graph.addEdge("B", "C", 7);
  graph.addEdge("C", "B", 7);
  graph.addEdge("B", "D", 8);
  graph.addEdge("D", "B", 8);
  graph.addEdge("C", "D", 2);
  graph.addEdge("D", "C", 2);
  graph.addEdge("D", "E", 4);
  graph.addEdge("E", "D", 4);
  graph.addEdge("C", "E", 8);
  graph.addEdge("E", "C", 8);
  graph.addEdge("A", "H", 8);
  graph.addEdge("H", "A", 8);
  graph.addEdge("H", "F", 4);
  graph.addEdge("F", "H", 4);
  graph.addEdge("F", "G", 6);
  graph.addEdge("G", "F", 6);
  graph.addEdge("B", "F", 5);
  graph.addEdge("F", "B", 5);
  graph.addEdge("F", "D", 4);
  graph.addEdge("D", "F", 4);
  graph.addEdge("G", "D", 3);
  graph.addEdge("D", "G", 3);

  //graph.findPath(graph.nodeList[1][0], graph.nodeList[4][0]);
}

function draw() {
  background("white");
  //Border
  stroke("#11324d");
  strokeWeight(10);
  noFill();
  rect(0, 0, 800, 500);

  // Title div
  stroke("white");
  strokeWeight(4);
  fill("#11324d");
  rect(7, 7, 786, 50);

  // Title
  fill("White");
  noStroke();
  textSize(28);
  textFont("Helvetica");
  textAlign(CENTER, CENTER);
  text("Path Finding Visualizer", 400, 34);

  graph.showEdges();
  graph.showNodes();
}

function findPathPressed() {
  let startInput;
  let endInput;
  let start;
  let end;
  let nodeIndex;
  let currentEdge;
  let edgeIndex;
  let nodeQueue = new Queue();
  let edgeQueue = new Queue();
  startInput = document.getElementById("start").value.toString();
  nodeIndex = graph.indexByInfo(startInput);
  start = graph.nodeList[nodeIndex][0];
  start.color = "#00FF00";
  print("Start : Node " + start.info);
  endInput = document.getElementById("end").value.toString();
  nodeIndex = graph.indexByInfo(endInput);
  end = graph.nodeList[nodeIndex][0];
  end.color = "#00FF00";
  print("End : Node " + end.info);

  solution = graph.findPath(start, end);
  print("solution: " + solution);
  for (let i = 0; i < solution.length - 1; i++) {
    src = graph.indexByInfo(solution[i]);
    dest = graph.indexByInfo(solution[i + 1]);
    edgeIndex0 = graph.edgeByNode(
      graph.nodeList[src][0],
      graph.nodeList[dest][0]
    );
    print(
      "push : " +
        graph.edgeList[edgeIndex0].src.info +
        graph.edgeList[edgeIndex0].dest.info
    );
    solutionArray.push(graph.edgeList[edgeIndex0]);
  }

  nodeIndex = graph.indexByNode(start);
  graph.nodeList[nodeIndex][0].cost = 0;
  nodeQueue.enqueue(start);
  while (!nodeQueue.isEmpty()) {
    nodeIndex = graph.indexByNode(nodeQueue.peek());
    for (let i = 1; i < graph.nodeList[nodeIndex].length; i++) {
      edgeIndex = graph.edgeByNode(
        graph.nodeList[nodeIndex][0],
        graph.nodeList[nodeIndex][i]
      );

      currentEdge = graph.edgeList[edgeIndex];
      edgeQueue.enqueue(currentEdge);

      if (nodeQueue.checkExist(graph.nodeList[nodeIndex][i]) == false) {
        nodeQueue.enqueue(graph.nodeList[nodeIndex][i]);
      }
    }
  }
  while (!edgeQueue.isEmpty()) {
    currentEdge = edgeQueue.dequeue();
    //print(currentEdge.src.info + "-" + currentEdge.dest.info);
    edgeArray.push(currentEdge);
  }

  for (let i = 0; i < edgeArray.length; i++) {
    setTimeout(EdgetoRed, i * 300);
    //toRed();
  }

  for (let i = 0; i < solutionArray.length; i++) {
    setTimeout(EdgetoGreen, edgeArray.length * 300 + i * 500);
  }
}

function EdgetoRed() {
  if (edgeArray[index] != null) {
    edgeIndex1 = graph.edgeByNode(edgeArray[index].src, edgeArray[index].dest);
    //print(edgeIndex1);
    edgeIndex2 = graph.edgeByNode(edgeArray[index].dest, edgeArray[index].src);
    //print(edgeIndex2);
    graph.edgeList[edgeIndex1].toRed();
    graph.edgeList[edgeIndex2].toRed();

    index++;
  }
}

function EdgetoGreen() {
  if (solutionArray[index1] != null) {
    solutionIndex1 = graph.edgeByNode(
      solutionArray[index1].src,
      solutionArray[index1].dest
    );
    solutionIndex2 = graph.edgeByNode(
      solutionArray[index1].dest,
      solutionArray[index1].src
    );
    graph.edgeList[solutionIndex1].toGreen();
    graph.edgeList[solutionIndex2].toGreen();
    index1++;
  }
}
