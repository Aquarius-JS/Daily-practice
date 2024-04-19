const _PENDING_ = "pending";
const _FULFILLED_ = "fulfilled";
const _REJECTED_ = "rejected";

function MyPromise(execute) {
  this.state = _PENDING_;
  this.val = null;
  this.err = null;
  this.onFulfilledList = [];
  this.onRejectedList = [];
  this.resolve;
  const _resolve = (val) => {
    if ((this.state = _PENDING_)) {
      this.val = val;
      this.state = _FULFILLED_;
      this.onFulfilledList.forEach((cb) => cb());
    }
  };
  const _reject = (err) => {
    if ((this.state = _PENDING_)) {
      this.err = err;
      this.state = _REJECTED_;
      this.onRejectedList.forEach((cb) => cb());
    }
  };
  try {
    execute(_resolve, _reject);
  } catch (err) {
    _reject(err);
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  return new MyPromise((resolve, reject) => {
    if (this.state === _PENDING_) {
      this.onFulfilledList.push(() => {
        const result = onFulfilled(this.val) ?? null;
        resolve(result);
      });
      this.onRejectedList.push(() => {
        const result = onRejected ? onRejected(this.err) : this.err;
        reject(result);
      });
    } else if (this.state === _FULFILLED_) {
      resolve(onFulfilled(this.val));
    } else if(this.state === _REJECTED_) {
      
    }
  });
};
