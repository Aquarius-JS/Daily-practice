/**
 * 记忆化缓存函数
 * @param {Function} cb 需要缓存计算结果的函数
 * @param {Function} resolver 缓存的key
 * @returns {Function}
 */
function memoize(cb, resolver) {
  function memoized(...args) {
    const key = resolver ? resolver(...args) : args[0];
    if (memoized.cache.has(key)) {
      return memoized.cache.get(key);
    } else {
      const result = cb.apply(this, args);
      memoized.cache.set(key, result);
      return result;
    }
  }
  memoized.cache = new CacheMap();
  return memoized;
}

/**
 * cache类
 */
class CacheMap {
  constructor() {
    this.normalCache = new Map();
    this.objCache = new WeakMap();
  }
  isObject(o) {
    return typeof o === 'object' && o !== null;
  }
  has(key) {
    return this.isObject(key) ? this.objCache.has(key) : this.normalCache.has(key);
  }
  set(key, val) {
    return this.isObject(key) ? this.objCache.set(key, val) : this.normalCache.set(key, val);
  }
  get(key) {
    return this.isObject(key) ? this.objCache.get(key) : this.normalCache.get(key);
  }
}
/**
 * test
 */
const obj = { a: 1, b: 2 };
const cb = memoize(o => {
  return o.a;
});

console.log(cb(obj));
obj.a = 2;
console.log(cb(obj));
// 1 1
