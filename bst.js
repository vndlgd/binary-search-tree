// Algorithm
// 1. Initialize start = 0, end = length of the array - 1
// mid = (start + end) / 2
// Create a tree node with mid as root (lets call it A)
// Recursively do the following steps:
// Calculate mid of left subarray and make it root of left subtree of A
// Calculate mid of right subarray and mkae it root of right subtree of A
// Check that array is always sorted and check that there are no duplicate values,
// if there is duplicate values, remove them

function Node(data, leftChild, rightChild) {
  // write code here
  return {};
}

function Tree(array) {
  // write code here
  let root;
  return {};
}

function buildTree(array) {
  // takes array of data
  // turn into BST full of Node objects appropriately placed
  // don't forget to sort and remove duplicates
  // should return the level-0 root node
}

// visualize the binary search tree
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

function insert(value) {
  // write code here
}

function deleteItem(value) {
  // write code here
}

function find(value) {
  // write code here
}

function levelOrder(callback) {
  // write code here
}

function height(node) {
  // write code here
}

function depth(node) {
  // write code here
}

function isBalanced(tree) {
  // write code here
}

function rebalance(tree) {
  // write code here
}

// Driver Script
// TODO
// create an array of random numbers less than 100
function createRandomArray() {
  myArray = [];
  for (let i = 0; i < 100; i++) {
    myArray.push(Math.floor(Math.random() * 100));
  }
  return myArray;
}

function Driver() {
  const myArray1 = createRandomArray();
  console.log(myArray1);
  // confirm the tree is balanced by calling isBalanced()
  // print out all elements in level, pre, post, and in order
  // unbalance the tree by adding several numbers > 100
  // confirm the tree is unbalanced by calling isBalanced()
  // balance the tree by calling rebalance
  // print out all elements in level, pre, post and in order
}

Driver();
