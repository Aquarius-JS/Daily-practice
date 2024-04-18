function MyPromiseRace(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("Argument must be an array"));
    }
    promises.forEach((promise) => {
      Promise.resolve(promise)
        .then((val) => {
          resolve(val);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}
