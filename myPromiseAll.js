function PromiseAll(promiseArr) {
  if (!Array.isArray(promises)) {
    return reject(new TypeError("Argument must be an array"));
  }
  return new Promise((resolve, reject) => {
    const result = [];
    const successCount = 0;
    for (let i = 0; i < promiseArr.length; i++) {
      Promise.resolve(promiseArr[i])
        .then((val) => {
          successCount++;
          result[i] = Promise.resolve(val);
          if (successCount === promiseArr.length) resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}
