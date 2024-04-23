const targetMap = new WeakMap();

function isObject(val) {
    return val !== null && typeof val === 'object';
}

// 依赖收集函数
function track(target, key) {
  if (activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()));
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, (dep = new Set()));
    }
    dep.add(activeEffect);
  }
}

// 触发更新函数
function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (depsMap) {
    const dep = depsMap.get(key);
    if (dep) {
      dep.forEach((effect) => effect());
    }
  }
}

// 创建响应式对象
function reactive(target) {
  const handler = {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver);
      // 依赖收集
      track(target, key);
      return isObject(result) ? reactive(result) : result;
    },
    set(target, key, value, receiver) {
      const oldValue = Reflect.get(target, key, receiver);
      const result = Reflect.set(target, key, value, receiver);
      if (oldValue !== value) {
        // 触发更新
        trigger(target, key);
      }
      return result;
    },
  };
  return new Proxy(target, handler);
}

// 简单的副作用函数注册机制
let activeEffect = null;
function effect(fn) {
  activeEffect = fn;
  fn();
  activeEffect = null;
}

const obj = reactive({ state: "1", test: { name: "张三" } });
effect(() => {
  console.log(obj.state, "@@@");
});
effect(() => {
  console.log(obj.test.name, "$$$");
});

obj.state = 2;
obj.test.name = "李四";
