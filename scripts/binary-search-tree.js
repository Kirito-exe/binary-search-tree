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
  deleteItem(value, item = this.#root) {
    if (item === null) return;
    if (item.left !== null && item.left.data === value) {
      if (item.left.left === null && item.left.right === null) {
        item.left = null;
      } else if (item.left.left === null || item.left.right === null) {
        item.left = item.left.left === null ? item.left.right : item.left.left;
      } else {
        item.left.right.left = item.left.left;
        item.left = item.left.right;
      }
    }
    if (item.right !== null && item.right.data === value) {
      if (item.right.left === null && item.right.right === null) {
        item.right = null;
      } else if (item.right.left === null || item.right.right === null) {
        item.right =
          item.right.left === null ? item.right.right : item.right.left;
      } else {
        item.right.right.left = item.right.left;
        item.right = item.right.right;
      }
    }
    if (item.data === value) {
      console.log("i ran");
      if (item.left === null && item.right === null) {
        item = null;
      } else if (item.left === null || item.right === null) {
        item = item.left === null ? item.right : item.left.left;
      } else {
        let copyleft = item.right.left;
        item.right.left = item.left;
        item.right.right.left = copyleft;
        this.#root = item.right;
      }
    }
    if (value > item.data) this.deleteItem(value, item.right);
    else if (value < item.data) this.deleteItem(value, item.left);
  }
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
