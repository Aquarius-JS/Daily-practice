/**
 * 运行Generator函数的函数实现运行async函数
 * @param {Iterator} iter generator函数执行后的 Iterator
 * @param {*} value
 */
function RunAsync(iter, value) {
  let _res = iter.next(value);
  return new Promise(resolve => {
    const handleResult = _res => {
      if (_res.done) {
        resolve(_res.value);
      } else {
        Promise.resolve(_res.value).then(
          val => {
            resolve(RunAsync(iter, val));
          },
          err => {
            try {
              // 尝试将错误传递回Generator函数
              handleResult(iter.throw(err));
            } catch (error) {
              // 如果Generator函数内部没有捕获错误，则reject
              reject(error);
            }
          }
        );
      }
    };
    handleResult(_res);
  });
}

/**
 * 模拟一个async函数 yield <-> await
 * @returns {Promise}
 */
function* myAsync() {
  let res = yield Promise.resolve('1');
  console.log(res, 'success');
  res = yield new Promise(resolve => {
    setTimeout(() => {
      console.log('test');
      resolve(2);
    }, 3000);
  });
  console.log(res);
  try {
    yield Promise.reject('err');
  } catch (err) {
    console.log('12');
  }
  return 3;
}

RunAsync(myAsync()).then(console.log);
//1 success test 2 12 3

(() => {
  try {
    new Promise((res, rej) => {
      setTimeout(() => {
        rej()
      }, 1000)
    }).catch(err => {
      console.log('err')
    })
  } catch (e) {
    console.log("111")
  }
  console.log("1")
})()