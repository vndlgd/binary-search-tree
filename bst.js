function Node(data, left, right) {
  return { data, left, right };
}

function Tree(array) {
  let root = buildTree(array);
  console.log(root.data);
  console.log(root.left);
  console.log(root.right);
  return { root };
}

function buildTree(array) {
  let mid = Math.floor(array.length / 2); // mid point
  let root = Node(
    array[mid], // root node
    array.slice(0, mid), // left side
    array.slice(mid + 1, array.length) // right side
  );

  return root;
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

function removeDuplicates(array) {
  let uniqueElements = new Set(array);
  let uniqueArray = Array.from(uniqueElements);
  return uniqueArray;
}

function sortArray(array) {
  // sort array of numbers NOT STRINGS
  // https://stackoverflow.com/questions/7000851/how-to-sort-numbers-correctly-with-array-sort
  array = array.sort(function (a, b) {
    return a - b;
  });
  return array;
}

function insert(value) {
  // TODO: check for existing values before insertion
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
  let myArray1 = createRandomArray();
  // sort array
  myArray1 = sortArray(myArray1);
  // remove duplicates
  myArray1 = removeDuplicates(myArray1);
  const tree1 = Tree(myArray1);

  // prettyPrint(tree1);
  // confirm the tree is balanced by calling isBalanced()
  // print out all elements in level, pre, post, and in order
  // unbalance the tree by adding several numbers > 100
  // confirm the tree is unbalanced by calling isBalanced()
  // balance the tree by calling rebalance
  // print out all elements in level, pre, post and in order
}

Driver();
