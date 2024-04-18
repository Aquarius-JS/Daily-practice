const _PENDING_ = "pending";
const _FULFILLED_ = "fulfilled";
const _REJECTED_ = "rejected";

function myPromise(executor) {
  this.state = _PENDING_;
  this.val = null;
  this.err = null;
  this.onFulfilledList = [];
  this.onRejectedList = [];
  const resolve = (val) => {
    if (this.state === _PENDING_) {
      this.val = val;
      this.state = _FULFILLED_;
      this.onFulfilledList.forEach((cb) => cb());
    }
  };
  const reject = (err) => {
    if (this.state === _PENDING_) {
      this.err = err;
      this.state = _REJECTED_;
      this.onRejectedList.forEach((cb) => cb());
    }
  };
  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

myPromise.prototype.then = function (onFulfilled, onRejected) {
  return new myPromise((resolve, reject) => {
    if (this.state === _PENDING_) {
      this.onFulfilledList.push(() => {
        const result = onFulfilled(this.val);
        resolve(result);
      });
      this.onRejectedList.push(() => {
        const result = onRejected ? onRejected(this.err) : null;
        reject(result);
      });
    } else if (this.state === _FULFILLED_ && onFulfilled) {
      const result = onFulfilled(this.val);
      resolve(result);
    } else if (this.state === _REJECTED_ && onRejected) {
      const result = onRejected(this.err);
      reject(result);
    }
  });
};

myPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};

export { myPromise };

const test = new myPromise((res, rej) => {
  setTimeout(() => {
    res("test");
  }, 4000);
}).then((val) => {
  console.log(val);
});
setTimeout(() => {
  console.log(test);
}, 5000);
