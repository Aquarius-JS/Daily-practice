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
