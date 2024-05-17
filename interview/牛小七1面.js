async function f() {
  return 1;
}

async function f() {
  return Promise.resolve(1);
}

function f() {
  return 1;
}
(async () => {
  let res = await f();
  console.log(res);
})();

function f() {
  return Promise.resolve(1);
}

function f(n) {
  // n 为正整数
  if (n <= 1) {
    return n;
  } else if (n % 2 === 0) {
    // n 是偶数
    return 2 * f(n / 2);
  } else {
    return f(n - 1) + 1;
  }
}

/**
 * 获取数组深度
 * @param {Array | number} val
 * @return {number}
 */
function getDepth(val) {
  if (!Array.isArray(val)) {
    return 0;
  } else {
    if (val.length === 0) return 0;
    const arr = val.map(item => {
      if (Array.isArray(item)) {
        return getDepth(item) + 1;
      } else {
        return 1;
      }
    });
    return arr.reduce((max, item) => Math.max(max, item), 0);
  }
}

console.log(getDepth(1)); // 0
console.log(getDepth([])); // 0
console.log(getDepth([1])); // 1
console.log(getDepth([1, [2]])); // 2
console.log(getDepth([[1], [2, [3]]])); // 3
