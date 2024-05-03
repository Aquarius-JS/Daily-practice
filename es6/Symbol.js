const a = '1';
a.toString = () => {
  console.log('11');
};
String.prototype.toString = () => {
  console.log('3');
};
console.log(a.toString());

const b = {
  name: '1',
};
console.log(Object.getOwnPropertyDescriptor(Object.getPrototypeOf(a), 'toString'));

Array.prototype[Symbol.hasInstance] = array => {
  console.log(array);
  return '1';
};

console.log(Object.getOwnPropertyDescriptor(Array.prototype, '[Symbol.hasInstance]'))

console.log(new Array instanceof Array);


String.prototype.toString = ()=>{
  return '1'
}

console.log('2'.toString());