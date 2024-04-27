function PromiseAll(promiseArr) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promiseArr)) {
      return reject(new TypeError('Argument must be an array'));
    }
    const result = [];
    let successCount = 0;
    for (let i = 0; i < promiseArr.length; i++) {
      Promise.resolve(promiseArr[i])
        .then(val => {
          successCount++;
          result[i] = Promise.resolve(val);
          if (successCount === promiseArr.length) resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    }
  });
}

PromiseAll([1, Promise.resolve('1'), Promise.reject('err')])
  .then(val => {
    console.log(val);
  })
  .catch(err => {
    console.log(err);
  });

PromiseAll([1, Promise.resolve('1'), Promise.resolve('err')])
  .then(val => {
    console.log(val);
  })
  .catch(err => {
    console.log(err);
  });
