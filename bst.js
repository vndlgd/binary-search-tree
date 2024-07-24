function Node(data, left = null, right = null) {
  return { data, left, right };
}

function Tree(array) {
  let root = buildTree(array);

  function insert(value) {
    // Note: Value always becomes a LEAF in the tree
    let currentNode = root; // use a pointer
    while (currentNode.left != null && currentNode.right != null) {
      // we've reached a leaf node if we exit
      if (value == currentNode.data) {
        // if this value already exists in the BST
        break; // break out of the loop
      }
      if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    if (value == currentNode.data) {
      // if this value already exists in the BST
      return; // don't insert
    }
    if (value < currentNode.data) {
      currentNode.left = Node(value, null, null);
    } else {
      currentNode.right = Node(value, null, null);
    }
  }

  function deleteItem(value) {
    // use recursion
    // 3 cases:
    // if node has children:
    // TODO: if it has 1 child:
    // replace parent with its child, left.right type syntax
    // i.e. 40 -> 32 -> 34 -> 36 becomes 40 -> 32 -> 36
    // TODO: if it has 2 children:
    // Find what is next biggest, just bigger than it
    // look in right subtree, then look at far left of the right subtree, this replaces the value
    // leftmost value was easy to remove because it had no children
    // if leftmost of rightsubtree has children, those children become leftchild of rightsubtree
    // TODO: if node has no children (A LEAF), easy < no change necessary
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
    prettyPrint,
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
  tree1.insert(10);
  tree1.insert(100);
  tree1.insert(1000);
  // TODO: tree1.insert(0) does not work properly
  tree1.prettyPrint(tree1.root);
  // confirm the tree is balanced by calling isBalanced()
  // print out all elements in level, pre, post, and in order
  // unbalance the tree by adding several numbers > 100
  // confirm the tree is unbalanced by calling isBalanced()
  // balance the tree by calling rebalance
  // print out all elements in level, pre, post and in order
}

Driver();
