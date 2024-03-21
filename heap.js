const k = 10;
/**
 * 取前k个出现频次最高的元素
 * @param {number} k
 * @param {number[]} arr;
 * @param {function} heap;
 */
const heap = function (arr) {
  this.arr = [0, ...arr];
};
heap.prototype.down = function (index) {
  const _l_ = this.arr.length;
  let temp = index;
  if (index * 2 <= _l_ && this.arr[index] > this.arr[index * 2])
    temp = index * 2;
  if (index * 2 + 1 <= _l_ && this.arr[temp] > this.arr[index * 2 + 1])
    temp = index * 2 + 1;
  if (temp !== index) {
    [this.arr[index], this.arr[temp]] = [this.arr[temp], this.arr[index]];
    this.down(temp);
  }
  return this.arr;
};

heap.prototype.up = function (index) {
  if (index < 1) return;
  const temp = Math.floor(index / 2);
  if (this.arr[index] < this.arr[temp]) {
    [this.arr[index], this.arr[temp]] = [this.arr[temp], this.arr[index]];
  }
  return this.arr;
};

console.log(new heap([5, 2, 3, 4, 5, 6]).down(1));
console.log(new heap([5, 2, 3, 4, 5, 6]).up(2));
