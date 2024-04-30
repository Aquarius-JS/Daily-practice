const a = '1';
a.toString = () => {
  console.log('11');
};
String.prototype.toString = ()=>{
  console.log("3")
}
console.log(a.toString());

const b = {
  name: '1',
};
console.log(Object.getOwnPropertyDescriptor(Object.getPrototypeOf(a),"toString"))