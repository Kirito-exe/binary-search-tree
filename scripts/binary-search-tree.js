import { prettyPrint } from "./pretty-print.js";
class Node {
  data = null;
  left = null;
  right = null;
  constructor(root) {
    this.data = root;
  }
}
class Tree {
  #root;
  constructor(arr) {
    arr = [...new Set(arr)];

    arr.sort();
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
}
let tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

prettyPrint(tree.root);
