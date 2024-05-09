/**
 * 原型链
 */

Function.prototype.a = () => {
  console.log('1');
};

Object.prototype.b = () => {
  console.log('2');
};

function Fn() {}
Fn.prototype;

const obj = new Fn();
console.log(Fn.prototype === Object.getPrototypeOf(obj));
console.log(Object.getPrototypeOf(Fn) === Function.prototype);
// obj.a();
obj.b();
Fn.a();
Fn.b();

//true true 2 1 2

/**
 * var
 */

var val = 1;
function foo() {
  console.log(val);
}

function bar() {
  var val = 2;
  foo();
}
bar();
// 1
/**
 * js函数执行为传值调用(call by value)，对比传名调用(call by name)
 */
for (var i = 0; i < 10; i++) {
  setTimeout(() => {
    (function (i) {
      console.log(i);
    })(i);
  }, 1000);
}

for (var i = 0; i < 10; i++) {
  setTimeout(() => {
    (function () {
      console.log(i);
    })(i);
  }, 1000);
}
for (var i = 0; i < 10; i++) {
  (function (i) {
    setTimeout(() => {
      console.log(i);
    }, 100);
  })(i);
}
/**
 * this
 */

const shape = {
  radis: 10,
  diameter() {
    return this.radis * 2;
  },
  perimeter: () => 2 * Math.PI * this.radis,
};

console.log(shape.diameter());
console.log(shape.perimeter());

// 20 err
