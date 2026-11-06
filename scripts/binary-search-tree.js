class Node {
  data = null;
  left = null;
  right = null;
  constructor(root) {
    this.data = root;
  }
}
export class Tree {
  #root;
  constructor(arr) {
    arr = [...new Set(arr)];
    arr.sort((a, b) => a - b);
    this.#root = this.#buildTree(arr, 0, arr.length - 1);
  }
  #buildTree(arr, start, end) {
    if (start > end) return null;
    let mid = Math.floor((start + end) / 2);
    let root = new Node(arr[mid]);
    root.left = this.#buildTree(arr, start, mid - 1);
    root.right = this.#buildTree(arr, mid + 1, end);
    return root;
  }
  get root() {
    return this.#root;
  }
  includes(value, item = this.#root) {
    if (item === null) return false;
    if (item.data === value) return true;
    if (value < item.data) return this.includes(value, item.left);
    if (value > item.data) return this.includes(value, item.right);
  }
  insert(value, item = this.#root) {
    if (item.data === value) return item;
    if (item === null) return;
    if (item.left === null && item.data > value) {
      item.left = new Node(value);
    } else if (item.right === null && item.data < value) {
      item.right = new Node(value);
    }
    if (value < item.data) {
      this.insert(value, item.left);
    } else {
      this.insert(value, item.right);
    }
  }
  getSuccessor(node) {
    node = node.right;
    while (node !== null && node.left !== null) node = node.left;
    return node;
  }
  delNode(value, item = this.#root) {
    if (item === null) return item;
    if (item.data > value) item.left = this.delNode(value, item.left);
    else if (item.data < value) item.right = this.delNode(value, item.right);
    else {
      if (item.left === null) {
        return item.right;
      }
      if (item.right === null) {
        return item.left;
      }
      const succ = this.getSuccessor(item);
      item.data = succ.data;
      item.right = this.delNode(succ.data, item.right);
    }
    return item;
  }
  levelOrderForEachItr(callback) {
    if (typeof callback !== "function")
      throw new TypeError("Callback is not a function");
    const queue = [this.#root];
    while (queue.length !== 0) {
      const curr = queue.shift();
      if (curr.left !== null) queue.push(curr.left);
      if (curr.right !== null) queue.push(curr.right);
      callback(curr.data);
    }
  }
  // will visit later
  // levelOrderForEachRec(callback,queue=[this.#root]){
  //   if (typeof callback !== "function")
  //     throw new TypeError("Callback is not a function");

  // }
  inorderForEach(callback, item = this.#root) {
    if (typeof callback !== "function")
      throw new TypeError("Callback is not a function");
    if (item === null) return;
    this.inorderForEach(callback, item.left);
    callback(item.data);
    this.inorderForEach(callback, item.right);
  }
  preorderForEach(callback, item = this.#root) {
    if (typeof callback !== "function")
      throw new TypeError("Callback is not a function");
    if (item === null) return;
    callback(item.data);
    this.preorderForEach(callback, item.left);
    this.preorderForEach(callback, item.right);
  }
  postorderForEach(callback, item = this.#root) {
    if (typeof callback !== "function")
      throw new TypeError("Callback is not a function");
    if (item === null) return;

    this.postorderForEach(callback, item.left);
    this.postorderForEach(callback, item.right);
    callback(item.data);
  }
  traverseNodes(node, count = -1) {
    if (node === null) return count;
    let leftCount = this.traverseNodes(node.left, count + 1);
    let rightCount = this.traverseNodes(node.right, count + 1);
    return Math.max(leftCount, rightCount);
  }
  height(value, item = this.#root) {
    if (item === null) return;
    if (value < item.data) return this.height(value, item.left);
    else if (value > item.data) return this.height(value, item.right);
    else if (value === item.data) {
      return this.traverseNodes(item);
    }
  }
  depth(value, item = this.#root, count = 0) {
    if (item === null) return;
    if (value < item.data) return this.depth(value, item.left, count + 1);
    else if (value > item.data) return this.depth(value, item.right, count + 1);
    else if (value === item.data) {
      return count;
    }
  }
  isBalanced(item = this.#root) {
    if (item === null) return true;
    let heightDiff;
    if (item.right === null && item.left === null) {
      return true;
    }
    if (item.right === null) {
      heightDiff = this.height(item.left.data);
    } else if (item.left === null) {
      heightDiff = this.height(item.right.data);
    } else {
      heightDiff = this.height(item.right.data) - this.height(item.left.data);
    }

    if (heightDiff > 1 || heightDiff < -1) {
      return false;
    }
    return this.isBalanced(item.left) && this.isBalanced(item.right);
  }
  rebalance() {
    if (!this.isBalanced()) {
      let arr = [];
      let addtoArr = (item) => {
        arr.push(item);
      };
      this.inorderForEach(addtoArr);
      arr.sort((a, b) => a - b);
      this.#root = this.#buildTree(arr, 0, arr.length - 1);
      console.log("tree is balanced now");
    } else {
      console.log("Tree is balanced");
    }
  }
}

/// RAndom tests
