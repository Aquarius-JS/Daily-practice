/**
 * @param {Object} target
 * @param {string} key
 * @param {Object} attributes
 * Reflect.defineProperty (Object.defineProperty)
 */

const obj = {
  key: '1',
};
Reflect.defineProperty(target, key, {
  get() {
    console.log('tet');
    return '1';
  },
  set(val) {},
  writable: true,
  enumerable: true,
  configurable: true,
});

/**
 * 
 */
