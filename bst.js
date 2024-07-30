function Node(data, left = null, right = null) {
  return { data, left, right };
}

function Tree(array) {
  let root = buildTree(array);

  /* You need a complete reassignment of the root to be the inserted
  object. You need to assign the root variable to be the new tree
  since one doesn't actually exist yet. */
  function insert(value) {
    root = insertRec(root, value);
  }

  function insertRec(root, value) {
    // base case
    if (root == null) {
      root = Node(value);
      return root;
    }
    // recursive case
    if (value < root.data) {
      root.left = insertRec(root.left, value);
    } else if (value > root.data) {
      root.right = insertRec(root.right, value);
    }
    return root;
  }

  function deleteItem(value) {
    root = deleteItemRec(root, value);
  }

  function deleteItemRec(root, value) {
    // base case
    if (root == null) {
      return root;
    }
    // recursive case
    if (value < root.data) {
      root.left = deleteItemRec(root.left, value);
    } else if (value > root.data) {
      root.right = deleteItemRec(root.right, value);
    } else {
      // if root has 1 or no children
      if (root.left == null) {
        return root.right;
      } else if (root.right == null) {
        return root.left;
      }
      // if root has 2 children
      root.data = minValue(root.right);
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

  function find(value) {
    while (root !== null && root.data !== value) {
      if (value < root.data) {
        root = root.left;
      } else if (value > root.data) {
        root = root.right;
      }
    }
    return root;
  }

  function levelOrder(callback) {
    let answer = [];
    // only accepts callback function as argument
    if (typeof callback !== 'function') {
      throw new Error('Callback function is required');
    }
    if (root === null) {
      return;
    }
    let queue = []; // array acting as a queue
    queue.push(root);
    while (queue.length > 0) {
      let tempNode = queue.shift(); // grab element from the front of the array
      callback(tempNode); // call the callback on each node as it traverses
      answer.push(tempNode.data);
      if (tempNode.left !== null) {
        queue.push(tempNode.left);
      }
      if (tempNode.right !== null) {
        queue.push(tempNode.right);
      }
    }
    return answer;
  }

  function inOrder(callback) {
    // only accepts callback function as argument
    if (typeof callback !== 'function') {
      throw new Error('Callback function is required');
    }
    callback(root);
    console.log('INORDER:');
    if (root.left !== null) {
      inOrderRec(root.left);
    }
    console.log(root.data);
    if (root.right !== null) {
      inOrderRec(root.right);
    }
  }

  function inOrderRec(root) {
    if (root === null) {
      return null;
    }
    preOrderRec(root.left);
    console.log(root.data);
    preOrderRec(root.right);
  }

  function preOrder(callback) {
    // only accepts callback function as argument
    if (typeof callback !== 'function') {
      throw new Error('Callback function is required');
    }
    callback(root);
    console.log('PREORDER:');
    console.log(root.data);
    if (root.left !== null) {
      preOrderRec(root.left);
    }
    if (root.right !== null) {
      preOrderRec(root.right);
    }
  }

  function preOrderRec(root) {
    // base condition
    if (root === null) {
      return;
    }
    console.log(root.data);
    preOrderRec(root.left);
    preOrderRec(root.right);
  }

  function postOrder(callback) {
    // only accepts callback function as argument
    if (typeof callback !== 'function') {
      throw new Error('Callback function is required');
    }
    callback(root);
    console.log('POSTORDER:');
    if (root.left !== null) {
      postOrderRec(root.left);
    }
    if (root.right !== null) {
      postOrderRec(root.right);
    }
    console.log(root.data);
  }

  function postOrderRec(root) {
    // base condition
    if (root === null) {
      return;
    }
    preOrderRec(root.left);
    preOrderRec(root.right);
    console.log(root.data);
  }

  function height(node) {
    let current = root;
    while (current !== null && current.data !== node) {
      if (node < current.data) {
        current = current.left;
      } else if (node > current.data) {
        current = current.right;
      }
    }
    let answer = findHeightRec(current, node);
    return answer;
  }

  function findHeightRec(root, node) {
    if (root === null) {
      return -1;
    }
    let leftHeight = findHeightRec(root.left, node);
    let rightHeight = findHeightRec(root.right, node);
    let answer = Math.max(leftHeight, rightHeight) + 1;

    return answer;
  }

  function depth(node) {
    let current = root;
    let x = 0;
    while (current !== null && current.data !== node) {
      if (node < current.data) {
        current = current.left;
        x += 1;
      } else if (node > current.data) {
        current = current.right;
        x += 1;
      }
    }
    return x;
    return depthRec(root, node);
  }

  function depthRec(root, node) {
    return root;
  }

  // https://www.geeksforgeeks.org/how-to-determine-if-a-binary-tree-is-balanced/
  function isBalanced(tree) {
    // The difference between heights of left and right subtree
    // of every node is not more than 1
    if (tree === null) {
      return;
    }
    let lh = isBalancedHelper(tree.left);
    let rh = isBalancedHelper(tree.right);
    if (Math.abs(lh - rh) <= 1) {
      return true;
    } else {
      return false;
    }
  }

  // https://www.geeksforgeeks.org/how-to-determine-if-a-binary-tree-is-balanced/
  function isBalancedHelper(root) {
    if (root === null) {
      return -1;
    }
    return (
      Math.max(isBalancedHelper(root.left), isBalancedHelper(root.right)) + 1
    );
  }

  function rebalance(tree) {
    // TODO: implement this
  }

  return {
    root,
    insert,
    deleteItem,
    find,
    levelOrder,
    preOrder,
    inOrder,
    postOrder,
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
  let myArray1 = [1, 3, 5, 7, 9];
  // sort array
  myArray1 = sortArray(myArray1);
  // remove duplicates
  myArray1 = removeDuplicates(myArray1);

  const tree1 = Tree(myArray1);
  tree1.insert(4);
  tree1.insert(10);
  tree1.insert(11);
  tree1.insert(12);
  prettyPrint(tree1.root);
  try {
    console.log('BALANCED: TRUE OR FALSE');
    console.log(tree1.isBalanced(tree1.root));
    console.log('LEVEL ORDER:');
    console.log(tree1.levelOrder(tree1.isBalanced));
    tree1.rebalance(tree1.root);
    prettyPrint(tree1.root);
    // tree1.preOrder(tree1.isBalanced);
    // tree1.inOrder(tree1.isBalanced);
    // tree1.postOrder(tree1.isBalanced);
    // console.log(tree1.height(12));
    // console.log(tree1.depth(5));
  } catch (e) {
    console.error(e);
  }
  // confirm the tree is balanced by calling isBalanced()
  // print out all elements in level, pre, post, and in order
  // unbalance the tree by adding several numbers > 100
  // confirm the tree is unbalanced by calling isBalanced()
  // balance the tree by calling rebalance
  // print out all elements in level, pre, post and in order
}

Driver();
