(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD环境
    define(['dependency'], factory);
  } else if (typeof exports === 'object') {
    // CommonJS环境
    module.exports = factory();
  } else {
    // 浏览器全局变量环境
    root.myModule = factory();
  }
})(this, function (dependency = []) {
  // 模块代码...
  const myModule = {};
  return myModule;
});
