function Task() {
  this.task = [];
  this.currentRunning = 0;
}

Task.prototype.add = function (time, cb) {
  this.task.push(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        cb();
        resolve('end');
      }, time);
    });
  });
};
Task.prototype.do = function () {
  if (this.currentRunning > 2) {
    return;
  }
  this.currentRunning++;
  this.task[0]().then(() => {
    this.currentRunning--;
    if (this.task.length > 0) {
      this.do();
    }
  });
  this.task.shift();
  if (this.task.length > 0) {
    this.do();
  }
};

const task = new Task();
task.add(1000, () => {
  console.log('1');
});
task.add(5000, () => {
  console.log('2');
});
task.add(1000, () => {
  console.log('3');
});
task.add(1000, () => {
  console.log('4');
});
task.do();
