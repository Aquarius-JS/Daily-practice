function A() {
  this.name = '张三';
}
A.prototype[Symbol.toStringTag] = '11';
A.prototype.toString = function () {
  return {};
};
A.prototype.valueOf = function () {
  return 1;
};
const a = new A();
console.log(a);
console.log('' + Number.parseInt(a));
Object.prototype.toString.call(a);
console.log(
  Object.getOwnPropertySymbols(Object.getPrototypeOf(a)),
  Object.prototype.toString.call(a)
);
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  get [Symbol.toStringTag]() {
    return 'test';
  }
  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
const p = new Point(1, 2);
console.log(p);
console.log(
  Object.getOwnPropertySymbols(Reflect.getPrototypeOf(p)),
  Object.prototype.toString.call(p)
);
