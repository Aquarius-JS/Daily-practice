function filterTrees(trees, queryString) {
  return trees.filter((item) => {
    if (item.children) {
      return filterTrees(item.children, queryString).length > 0;
    } else {
      return item.content.includes(queryString);
    }
  });
}

const trees = [
  {
    content: "aa",
    children: [
      {
        content: "1",
      },
    ],
  },
];

console.log(filterTrees(trees,"1"));
