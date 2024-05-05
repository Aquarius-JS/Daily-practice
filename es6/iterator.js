const obj = {
  name: '111',
  age: 18,
  flag: false,
  [Symbol.iterator]: function () {
    // console.log('111');
    return {
      next: function () {
        const done = this.flag;
        this.flag = true;
        return {
          value: this.name,
          done,
        };
      },
    };
  },
};

for (let i of obj) {
  console.log(i);
}

class RangeIterator {
  constructor(start, stop) {
    this.value = start;
    this.stop = stop;
  }

  [Symbol.iterator]() {
    return this;
  }

  next() {
    var value = this.value;
    if (value < this.stop) {
      this.value++;
      return { done: false, value: value };
    }
    return { done: true, value: undefined };
  }
}

function range(start, stop) {
  return new RangeIterator(start, stop);
}

for (var value of range(0, 3)) {
  console.log(value); // 0, 1, 2
}
