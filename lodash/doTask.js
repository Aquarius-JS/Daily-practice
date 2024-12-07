// function Task() {
//   this.task = [];
//   this.currentRunning = 0;
// }

// Task.prototype.add = function (time, cb) {
//   this.task.push(() => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         cb();
//         resolve('end');
//       }, time);
//     });
//   });
// };
// Task.prototype.do = function () {
//   if (this.currentRunning > 2) {
//     return;
//   }
//   this.currentRunning++;
//   this.task[0]().then(() => {
//     this.currentRunning--;
//     if (this.task.length > 0) {
//       this.do();
//     }
//   });
//   this.task.shift();
//   if (this.task.length > 0) {
//     this.do();
//   }
// };

// const task = new Task();
// task.add(1000, () => {
//   console.log('1');
// });
// task.add(5000, () => {
//   console.log('2');
// });
// task.add(1000, () => {
//   console.log('3');
// });
// task.add(1000, () => {
//   console.log('4');
// });
// task.do();

function Task2(maxNum) {
  this.task = [];
  this.currentRunning = 0
  this.maxNum = 2
}

Task2.prototype.add = function (time, fun) {
  this.task.push({ time, fun })
}

Task2.prototype.do = function () {
  if (this.currentRunning >= this.maxNum) {
    return
  }
  if (this.task.length === 0) {
    return
  }
  this.currentRunning++;
  const { time, fun } = this.task.shift()
  console.log(time, fun)
  // setTimeout(() => {
  //   fun()
  //   this.currentRunning--
  //   this.do()
  // }, time)
  new Promise((res) => {
    setTimeout(() => {
      fun()
      this.currentRunning--
      res()
    }, time)
  }).then(() => {
    this.do()
  })
  this.do()
}

const task = new Task2(2);
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