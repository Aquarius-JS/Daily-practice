const obj = {
  a: "a",
  b: "b",
  c: "c",
};
Object.setPrototypeOf(obj, { d: "d" });
Object.defineProperty(obj, "a", {
  enumerable: false,
  writable: true,
  configurable: true,
});

for (let i in obj) {
  console.log(obj[i]);
}
