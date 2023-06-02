function createConnector(parentNode, childNode) {
  const parentRect = parentNode.getBoundingClientRect();
  const childRect = childNode.getBoundingClientRect();

  const x1 = parentRect.left + parentRect.width / 2;
  const y1 = parentRect.top + parentRect.height / 2;
  const x2 = childRect.left + childRect.width / 2;
  const y2 = childRect.top + childRect.height / 2;

  const connector = document.createElementNS("http://www.w3.org/2000/svg", "line");
  connector.setAttribute("x1", x1);
  connector.setAttribute("y1", y1);
  connector.setAttribute("x2", x2);
  connector.setAttribute("y2", y2);
  connector.setAttribute("stroke", "#ccc");
  connector.setAttribute("stroke-width", "2");

  connector.id = `connector-${parentNode.id}-${childNode.id}`;
  document.querySelector(".connectors").appendChild(connector);
  return connector;
}

function updateConnector(connector, parentNode, childNode) {
  const parentRect = parentNode.getBoundingClientRect();
  const childRect = childNode.getBoundingClientRect();

  const x1 = parentRect.left + parentRect.width / 2;
  const y1 = parentRect.top + parentRect.height / 2;
  const x2 = childRect.left + childRect.width / 2;
  const y2 = childRect.top + childRect.height / 2;

  connector.setAttribute("x1", x1);
  connector.setAttribute("y1", y1);
  connector.setAttribute("x2", x2);
  connector.setAttribute("y2", y2);
}

function createNode(text, parentNode, angle, distance) {
  const node = document.createElement("div");
  node.classList.add("node");
  node.id = `node-${Math.random()
    .toString(36)
    .substring(2)}`;
  node.innerText = text;

  const parentRect = parentNode.getBoundingClientRect();
  const x = parentRect.left + (distance * Math.cos(angle));
  const y = parentRect.top + (distance * Math.sin(angle));

  node.style.left = `${x}px`;
  node.style.top = `${y}px`;

  document.querySelector(".mindmap").appendChild(node);

  const connector = createConnector(parentNode, node);
  node.setAttribute('data-connector-id', connector.id);

  node.addEventListener("mousedown", handleMouseDown);
  node.addEventListener("mousemove", handleMouseMove);
  node.addEventListener("mouseup", handleMouseUp);

  return node;
}

let draggedNode = null;
let initialPosition = { x: 0, y: 0 };

function handleMouseDown(event) {
  draggedNode = event.target;
  initialPosition = { x: event.clientX, y: event.clientY };
}

function handleMouseMove(event) {
  if (draggedNode) {
    const deltaX = event.clientX - initialPosition.x;
    const deltaY = event.clientY - initialPosition.y;

    const rect = draggedNode.getBoundingClientRect();
    const x = rect.left + deltaX;
    const y = rect.top + deltaY;

    draggedNode.style.left = `${x}px`;
    draggedNode.style.top = `${y}px`;

    const connectorId = draggedNode.getAttribute('data-connector-id');
    const connector = document.getElementById(connectorId);
    const parentNode = document.getElementById("rootNode"); // Assuming all nodes are connected to the root node
    updateConnector(connector, parentNode, draggedNode);

    initialPosition = { x: event.clientX, y: event.clientY };
  }
}

function handleMouseUp() {
  draggedNode = null;
}

// Attach to DOM
const rootNode = document.getElementById("rootNode");

// Create first-level nodes
const node1 = createNode("Node 1", rootNode, Math.PI / 4, 150);
const node2 = createNode("Node 2", rootNode, (3 * Math.PI) / 4, 150);
const node3 = createNode("Node 3", rootNode, (5 * Math.PI) / 4, 150);
const node4 = createNode("Node 4", rootNode, (7 * Math.PI) / 4, 150);

// Create second-level nodes
createNode("Node 1.1", node1, Math.PI / 4, 150);
createNode("Node 1.2", node1, (7 * Math.PI) / 4, 150);
createNode("Node 2.1", node2, Math.PI / 4, 150);
createNode("Node 2.2", node2, (3 * Math.PI) / 4, 150);