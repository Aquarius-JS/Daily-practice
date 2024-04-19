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
        const result = onFulfilled(this.val) ?? null;
        resolve(result);
      });
      this.onRejectedList.push(() => {
        const result = onRejected ? onRejected(this.err) : this.err;
        reject(result);
      });
    } else if (this.state === _FULFILLED_ && onFulfilled) {
      const result = onFulfilled(this.val);
      resolve(result);
    } else if (this.state === _REJECTED_ && onRejected) {
      const result = onRejected(this.err);
      reject(result);
    } else if (this.state === _REJECTED_ && !onRejected) {
      reject(this.err);
    }
  });
};

myPromise.prototype.catch = function (onRejected) {
  return this.then(() => {}, onRejected);
};

myPromise.resolve = function (val) {
  if (val instanceof myPromise) return val;
  //TODO
  // 如果 value 是一个对象或函数，并且具有 .then 方法（即 thenable 对象）
  if (
    val &&
    (typeof val === "object" || typeof val === "function") &&
    typeof val.then === "function"
  ) {
    return new Promise((resolve, reject) => {
      val.then(resolve, reject);
    });
  }
  return new myPromise((res) => res(val));
};

myPromise.reject = function (val) {
  return new myPromise((_resolve, reject) => {
    reject(val);
  });
};

myPromise.all = function (promises) {
  const list = [];
  let success = 0;
  return new myPromise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      reject(new TypeError("Argument must be an array"));
    }
    for (let i = 0; i < promises.length; i++) {
      myPromise
        .resolve(promises[i])
        .then((val) => {
          list[i] = myPromise.resolve(val);
          if (++success === promises.length) resolve(list);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
};

myPromise.race = function (promises) {
  return new myPromise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      reject(new TypeError("Argument must be an array"));
    }
    promises.forEach((promise) => {
      promise.then(
        (val) => {
          resolve(val);
        },
        (err) => {
          reject(err);
        }
      );
    });
  });
};

/**
 * 测试all, race
 */
myPromise
  .all([
    1,
    myPromise.resolve("12"),
    new myPromise((res, rej) => {
      setTimeout(() => {
        res(3);
      }, 3000);
    }),
  ])
  .then((array) => {
    console.log(array);
  });

/**
 * 测试延迟rejected
 */
new myPromise((res, rej) => {
  setTimeout(() => {
    rej("test");
  }, 1000);
})
  .then((val) => {
    console.log(val, "!!!");
  })
  .then(() => {})
  .catch((err) => {
    console.log(err, "1111");
  });
