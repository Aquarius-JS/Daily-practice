/**
 * 防抖函数
 * @param {Function} func
 * @param {number} duration
 * @returns {Function}
 */
function debounce(func, duration) {
  let timeout = null;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, duration);
  };
}

/**
 * 节流函数
 * @param {Function} func
 * @param {number} delay
 * @returns {Function}
 */
function throttle(func, delay) {
  let last = 0;
  return function (...args) {
    let now = new Date().getTime();
    if (now - last > delay) {
      last = now;
      func.apply(this, args);
    }
  };
}


function deb(fun, time) {
  let t = null
  return function (...args) {
    clearTimeout(t)
    t = setTimeout(() => {
      fun().apply(this, args)
    }, time)
  }
}

function t(fun, time) {
  let last = 0;
  return function (...args) {
    let now = new Date().getTime();
    if ((now - last) > time) {
      fun.apply(this, args)
      last = now
    }
  }
}