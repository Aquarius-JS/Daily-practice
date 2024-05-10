const proxy = new Proxy(
  {},
  {
    get: function (target, propKey, receiver) {},
    set: function (target, propKey, value, receiver) {},
    apply: function (target, context, args) {},
    has: function (target, propKey) {},
    construct: function (target, args, newTarget) {},
    deleteProperty: function (target, propKey) {},
    defineProperty: function (target, propKey, description) {},
    getOwnPropertyDescriptor: function (target, propKey) {},
    getPrototypeOf: function (target) {},
    setPrototypeOf: function (target, proto) {},
    isExtensible: function (target) {},
    ownKeys: function (target) {},
  }
);
