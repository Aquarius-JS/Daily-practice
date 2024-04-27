function findColumnWidth(grid: number[][]): number[] {
  const ans: number[] = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      let l = grid[i][j].toString().length;
      ans[j] ? (ans[j] = Math.max(l, ans[j])) : (ans[j] = l);
    }
  }
  return ans;
}

function findColumnWidth_(grid: number[][]): number[] {
  const grids: number[][] = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grids[j] ? grids[j].push(grid[i][j]) : (grids[j] = [grid[i][j]]);
    }
  }
  return grids.map(arr => getAns(arr));
}

function getAns(arr: number[]): number {
  let len: number = 0;
  arr.forEach(item => {
    const s = item.toString();
    len = Math.max(len, s.length);
  });
  return len;
}
