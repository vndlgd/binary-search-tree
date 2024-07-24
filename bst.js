function Node(data, left = null, right = null) {
  return { data, left, right };
}

function Tree(array) {
  let root = buildTree(array);

  function insert(value) {
    root = insertRec(root, value);
  }

  function insertRec(root, value) {
    if (root === null) {
      root = Node(value);
      return root;
    }
    if (value < root.data) {
      root.left = insertRec(root.left, value);
    } else if (value > root.data) {
      root.right = insertRec(root.right, value);
    }
    return root; // if value == root.data
  }

  function deleteItem(value) {
    root = deleteItemRec(root, value);
  }

  function deleteItemRec(root, value) {
    // 3 cases:
    // base case
    if (root === null) {
      return root;
    }
    // recursive case
    if (value < root.data) {
      root.left = deleteItemRec(root.left, value);
    } else if (value > root.data) {
      root.right = deleteItemRec(root.right, value);
    } else {
      // node with 1 child or no child
      if (root.left == null) {
        return root.right;
      } else if (root.right == null) {
        return root.left;
      }

      // node with 2 children
      root.data = minValue(root.right); // root value at 2 becomes 3
      root.right = deleteItemRec(root.right, root.data);
    }
    return root;
  }

  function minValue(root) {
    let minValue = root.data;
    while (root.left !== null) {
      minValue = root.left.data;
      root = root.left;
    }
    return minValue;
  }

  function find(value) {}

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

  return {
    root,
    insert,
    deleteItem,
    find,
    levelOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
}

function buildTree(array) {
  // base case
  if (array.length == 0) {
    return null;
  }

  let mid = Math.floor(array.length / 2); // mid point
  let root = Node(
    array[mid], // root node
    buildTree(array.slice(0, mid)), // left side
    buildTree(array.slice(mid + 1, array.length)) // right side
  );

  return root;
}

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
  // let myArray1 = createRandomArray();
  let myArray1 = [1, 2, 3, 4, 5];
  // sort array
  myArray1 = sortArray(myArray1);
  // remove duplicates
  myArray1 = removeDuplicates(myArray1);
  const tree1 = Tree(myArray1);
  // tree1.deleteItem(2);
  // tree1.deleteItem(6);
  // tree1.deleteItem(3);
  prettyPrint(tree1.root);
  // confirm the tree is balanced by calling isBalanced()
  // print out all elements in level, pre, post, and in order
  // unbalance the tree by adding several numbers > 100
  // confirm the tree is unbalanced by calling isBalanced()
  // balance the tree by calling rebalance
  // print out all elements in level, pre, post and in order
}

Driver();
