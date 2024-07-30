function Node(data, left = null, right = null) {
  return { data, left, right };
}

function Tree(array) {
  let root = buildTree(array);

  let orderArray = []; // for level, pre, in, post order traversal

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
    orderArray = [];
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
      orderArray.push(tempNode.data);
      if (tempNode.left !== null) {
        queue.push(tempNode.left);
      }
      if (tempNode.right !== null) {
        queue.push(tempNode.right);
      }
    }
    return orderArray;
  }

  function inOrder(callback) {
    orderArray = [];
    // only accepts callback function as argument
    if (typeof callback !== 'function') {
      throw new Error('Callback function is required');
    }
    callback(root);
    if (root.left !== null) {
      inOrderRec(root.left);
    }
    orderArray.push(root.data);
    if (root.right !== null) {
      inOrderRec(root.right);
    }
    return orderArray;
  }

  function inOrderRec(root) {
    if (root === null) {
      return null;
    }
    inOrderRec(root.left);
    orderArray.push(root.data);
    inOrderRec(root.right);
  }

  function preOrder(callback) {
    orderArray = [];
    // only accepts callback function as argument
    if (typeof callback !== 'function') {
      throw new Error('Callback function is required');
    }
    callback(root);
    orderArray.push(root.data);
    if (root.left !== null) {
      preOrderRec(root.left);
    }
    if (root.right !== null) {
      preOrderRec(root.right);
    }
    return orderArray;
  }

  function preOrderRec(root) {
    // base condition
    if (root === null) {
      return;
    }
    orderArray.push(root.data);
    preOrderRec(root.left);
    preOrderRec(root.right);
  }

  function postOrder(callback) {
    orderArray = [];
    // only accepts callback function as argument
    if (typeof callback !== 'function') {
      throw new Error('Callback function is required');
    }
    callback(root);
    if (root.left !== null) {
      postOrderRec(root.left);
    }
    if (root.right !== null) {
      postOrderRec(root.right);
    }
    orderArray.push(root.data);

    return orderArray;
  }

  function postOrderRec(root) {
    // base condition
    if (root === null) {
      return;
    }
    postOrderRec(root.left);
    postOrderRec(root.right);
    orderArray.push(root.data);
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
    let inOrderArray = inOrder(isBalanced);
    tree = Tree(inOrderArray);
    return tree.root;
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
  // let myArray1 = [1, 3, 5, 7, 9];
  // sort array
  myArray1 = sortArray(myArray1);
  // remove duplicates
  myArray1 = removeDuplicates(myArray1);

  const tree1 = Tree(myArray1);
  try {
    prettyPrint(tree1.root);
    console.log('Confirm that the tree is balanced by calling isBalanced');
    console.log('isBalanced: ' + tree1.isBalanced(tree1.root));
    console.log('LEVEL ORDER');
    console.log(tree1.levelOrder(tree1.isBalanced));
    console.log('PRE ORDER');
    console.log(tree1.preOrder(tree1.isBalanced));
    console.log('IN ORDER');
    console.log(tree1.inOrder(tree1.isBalanced));
    console.log('POST ORDER');
    console.log(tree1.postOrder(tree1.isBalanced));

    tree1.insert(101);
    tree1.insert(202);
    tree1.insert(303);
    tree1.insert(404);
    tree1.insert(505);

    console.log('Confirm that the tree is unbalanced by calling isBalanced.');
    console.log('isBalanced: ' + tree1.isBalanced(tree1.root));

    console.log('Rebalancing tree...');
    tree1.root = tree1.rebalance(tree1);
    console.log('Confirm that the tree is balanced by calling isBalanced');
    console.log('isBalanced: ' + tree1.isBalanced(tree1.root));

    console.log('LEVEL ORDER');
    console.log(tree1.levelOrder(tree1.isBalanced));
    console.log('PRE ORDER');
    console.log(tree1.preOrder(tree1.isBalanced));
    console.log('IN ORDER');
    console.log(tree1.inOrder(tree1.isBalanced));
    console.log('POST ORDER');
    console.log(tree1.postOrder(tree1.isBalanced));

    prettyPrint(tree1.root);
  } catch (e) {
    console.error(e);
  }
}

Driver();
