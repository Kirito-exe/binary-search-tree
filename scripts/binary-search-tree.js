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
  deleteItem() {}
}
let tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.insert(0);
tree.insert(10);
tree.insert(11);
tree.insert(23);

tree.deleteItem(8);
prettyPrint(tree.root);
console.log(tree.root.left.left);
console.log(tree.includes(4));
