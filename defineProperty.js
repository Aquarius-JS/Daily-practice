const obj = {
  a: 'a',
  b: 'b',
  c: 'c',
};
Object.setPrototypeOf(obj, { d: 'd' });
Object.defineProperty(obj, 'a', {
  enumerable: false,
  writable: true,
  configurable: true,
});

Object.defineProperty(obj, 'b', {
  get: function () {
    return 'test';
  },
  set:function(val) {
    
  }
});
