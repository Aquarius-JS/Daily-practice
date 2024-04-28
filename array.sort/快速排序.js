/**
 * 快速排序
 * @param {Array} arr
 * @returns {Array}
 */
function sort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let index = 0;
  let left = 1;
  let right = arr.length - 1;
  const pivot = arr[0];
  while (left <= right) {
    while (left <= right) {
      if (pivot > arr[right]) {
        arr[index] = arr[right];
        index = right;
        right--;
        break;
      }
      right--;
    }
    while (left <= right) {
      if (pivot < arr[left]) {
        arr[index] = arr[left];
        index = left;
        left++;
        break;
      }
      left++;
    }
  }
  arr[index] = pivot;
  arr = [...sort(arr.slice(0, index)), arr[index], ...sort(arr.slice(index + 1))];
  return arr;
}
console.log(sort([4, 1, 5, 3, 5, -1, 4, 2, 2, 10, -4, 3]));

/**
 * 双指针实现 temp p
 * @param {Array} arr 
 * @returns 
 */
function sort_two(arr) {
  if (arr.length <= 1) return arr;
  let temp = 0;
  let p = arr.length - 1;
  while (p !== temp) {
    while (p > temp) {
      if (arr[p] < arr[temp]) {
        [arr[p], arr[temp]] = [arr[temp], arr[p]];
        [p, temp] = [temp + 1, p];
        break;
      }
      p--;
    }
    while (p < temp) {
      if (arr[p] > arr[temp]) {
        [arr[p], arr[temp]] = [arr[temp], arr[p]];
        [p, temp] = [temp - 1, p];
        break;
      }
      p++;
    }
  }
  return [...sort_two(arr.slice(0, temp)), arr[temp], ...sort_two(arr.slice(temp + 1))];
}

console.log(sort_two([4, 1, 5, 3, 5, -1, 4, 2, 2, 10, -4, 3]));
