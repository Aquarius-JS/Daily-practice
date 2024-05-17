function filterTrees(trees, queryString) {
  let ans = [];
  trees.forEach(item => {
    if (item.children) {
      const list = filterTrees(item.children, queryString);
      if (list.length > 0) {
        ans.push({ content: item.content, children: list });
      }
    } else {
      return item.content.includes(queryString) ? ans.push(item) : null;
    }
  });
  return ans;
}

const trees = [
  {
    content: 'aa',
    children: [
      {
        content: '1',
      },
    ],
  },
  {
    content: 'bb',
    children: [
      {
        content: 'cc',
        children: [
          {
            content: '2',
          },
          {
            content: '1',
          },
        ],
      },
    ],
  },
];

console.log(filterTrees(trees, '2')[0].children[0].children);
