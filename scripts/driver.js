import { Tree } from "./binary-search-tree.js";
import { prettyPrint } from "./pretty-print.js";
function randomArr() {
  let length = Math.floor(Math.random() * 21);
  if (length < 10) length = 10;
  const arr = new Array(length);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Math.floor(Math.random() * 101);
  }
  return arr;
}
const tree = new Tree(randomArr());
console.log(tree.isBalanced());
prettyPrint(tree.root);
tree.preorderForEach(console.log);
tree.levelOrderForEachItr(console.log);
tree.inorderForEach(console.log);
tree.postorderForEach(console.log);
tree.insert(446984);
tree.insert(5454);
tree.insert(564968464);
console.log(tree.isBalanced());
prettyPrint(tree.root);
tree.rebalance();
prettyPrint(tree.root);
console.log(tree.isBalanced());
tree.preorderForEach(console.log);
tree.levelOrderForEachItr(console.log);
tree.inorderForEach(console.log);
tree.postorderForEach(console.log);
