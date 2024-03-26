export const treeToArray = (tree: any[], arr: any[] = []) => {
  if (Array.isArray(tree)) {
    for (let i = 0; i < tree.length; i++) {
      arr.push(tree[i])
      if (tree[i]?.children) {
        treeToArray(tree[i]?.children, arr)
      }
    }
  }
  return arr
}
