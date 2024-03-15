/**
 * 判断变量的类型
 * @param {object} value 变量值
 */
function checkType(value) {
    return Object.prototype.toString.call(value).slice(8, -1);
  }
  
  /**
   * 深拷贝（递归）
   * @param {*} sourceValue 需要拷贝的值
   */
  function deepClone(sourceValue) {
    // 如果传入的数据是简单类型（不是 {} & []），直接返回即可
    if (typeof sourceValue !== "object") {
      return sourceValue;
    }
    // 判断 传入参数的数据类型(object or array)
    let targetType = checkType(sourceValue);
    // 根据传入参数的数据类型，创建 初始存储结果的变量类型 {} or []
    let result = targetType === "Object" ? {} : [];
    // 遍历 sourceValue (for...in可以遍历数据和对象)
    // 避免数组内有自定义属性，遍历数组使用 for...of，遍历对象 for...in
    if (targetType === "Array") {
      // 传入参数是数组时，次数使用的是 for...of 遍历，当然，也可以使用 数组的其他遍历方法
      for (const [key, value] of sourceValue.entries()) {
        let itemType = checkType(item);
        // 如果 value 是 数组 或 对象，则继续遍历
        if (itemType === "Object" || itemType === "Array") {
          result[key] = deepClone(value);
        } else {
          // 如果 value 是 基本数据类型 或者 函数，直接赋值即可
          result[key] = value;
        }
      }
    } else {
      // 传入参数是对象时
      for (const key in sourceValue) {
        // 遍历数组时，key 为数组的 下标
        // 遍历对象时，key 为对象的 key
        // hasOwnProperty 只能检验对象自身的属性，不能检验继承属性，也不能检验原型链上的属性
        if (sourceValue.hasOwnProperty(key)) {
          const item = sourceValue[key];
          let itemType = checkType(item);
          // 如果 value 是 数组 或 对象，则继续遍历
          if (itemType === "Object" || itemType === "Array") {
            result[key] = deepClone(item);
          } else {
            // 如果 value 是 基本数据类型 或者 函数，直接赋值即可
            result[key] = item;
          }
        }
      }
    }
    // 返回 result 即可
    return result;
  }
  