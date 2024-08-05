'use strict';
/**
 * float24: 1 10 13
 * @param {string} value
 * @returns
 */
// 符号位 0/1 指数全1，尾数全0  正、负无穷
// 符号位 0/1 指数全0，尾数全0  +0/-0
// 指数全 1 尾数非0             NAN
// sqrt(-4)= NaN
// 0.0/0= NaN
// 无穷加无穷= NaN
// 无穷除无穷= NaN
// 指数位偏移量 2^9 - 1 = 511

const MAX_EXPONENT = 511; // 1022 - 511
const MIN_EXPONENT = -510;
const OFFSET = 511;

function float24(value) {
  if (value instanceof float24) {
    return value;
  }
  if (!new.target) {
    throw new Error('float24只能通过new调用');
  }
  const _floatRegex = /^[-+]?[0-9]*\.?[0-9]+$/;
  this.value = new String(value);
  if (!_floatRegex.test(this.value)) {
    throw new Error('float24 new`s argument is not rational');
  }
  this.binary = getBinary(this.value);
}
/**
 *
 * @param {float24 | string} float
 */
float24.prototype.add = function (float) {
  const A = { ...this.binary };
  const B = new float24(float).binary;
  A.expNum = BinaryToFloat(A.exponent);
  B.expNum = BinaryToFloat(B.exponent);
  A.fraction = [1, ...A.fraction, 0, 0].reverse();
  B.fraction = [1, ...B.fraction];
  if (A.expNum < B.expNum) {
    [A, B] = [B, A];
  }
  const expSub = A.expNum - B.expNum;
  B.fraction = [...new Array(expSub).fill(0)].slice(0, 16).reverse();
  let flag = 0;
  let index = 0;
  while (index < 16) {
    A.fraction[index] = A.fraction[index] + B.fraction[index] + flag;
    if (A.fraction[index] >= 2) {
      flag = 1;
      A.fraction -= 2;
    } else {
      flag = 0;
    }
    index++;
  }
  if (flag === 1) {
    A.fraction = [1, ...A.fraction.reverse()];
    A.expNum -= 1;
    A.exponent = IntToBinaryArr(A.expNum);
  } else {
    A.fraction = A.fraction.reverse();
  }
  //TODO: 四舍五入
  A.fraction = A.fraction.slice(1, 14);
  return;
};

float24.prototype.toBinaryString = function () {
  return this.binary.sign + this.binary.exponent.join('') + this.binary.fraction.join('');
};

float24.prototype.valueOf = function () {
  const IntExp = parseInt(this.binary.exponent.join(''), 2) - OFFSET;
  if (IntExp === 512) {
    if (!this.binary.fraction.includes(1)) {
      return Infinity * (this.binary.sign === 1 ? -1 : 1);
    } else {
      return NaN;
    }
  } else if (IntExp === -511 && !this.binary.fraction.includes(1)) {
    return 0;
  }
  const fraArr = [1, ...this.binary.fraction];
  let bin;
  if (IntExp >= 0) {
    if (IntExp <= 13) {
      bin = `${fraArr.slice(0, IntExp + 1).join('')}.${fraArr.slice(IntExp + 1).join('')}`;
    } else {
      bin = `${fraArr.join('')}.${new Array(IntExp - 13).fill(0).join('')}`;
    }
  } else {
    bin = `0.${new Array(-IntExp - 1).fill(0).join('')}${fraArr.join('')}`;
  }
  return BinaryToFloat(bin) * (this.binary.sign === 1 ? -1 : 1);
};

/**
 * 字符串数字转为float24
 * @param {string} strVal
 * @returns {{sign:number,exponent:number[],fraction:number[]}}
 */
const getBinary = strVal => {
  const res = {
    sign: 0,
    exponent: new Array(10),
    fraction: new Array(13),
  };
  //处理符号位
  res.sign = strVal[0] === '-' ? 1 : 0;
  strVal = strVal.replace('-', '');

  //只有整数
  if (!strVal.includes('.')) {
    const binArr = IntToBinaryArr(strVal);
    switch (binArr[0]) {
      //为0
      case 0:
        res.exponent = new Array(10).fill(0);
        res.fraction = new Array(13).fill(0);
        break;
      // 不为0
      case 1:
        if (binArr.length <= 14) {
          res.exponent = IntToBinaryArr(OFFSET + binArr.length - 1);
          res.fraction = TrimArr(binArr.slice(1), 13);
        } else if (binArr.length > MAX_EXPONENT + 1) {
          res.exponent = new Array(10).fill(1);
          res.fraction = new Array(13).fill(0);
        } else {
          res.exponent = IntToBinaryArr(OFFSET + binArr.length - 1);
          // TODO:四舍五入二进制数
          res.fraction = binArr.slice(1, 14);
        }
        break;
    }
  } else {
    //小数
    let [int, float] = strVal.split('.');
    float = `0.${float}`;
    const IntBinArr = IntToBinaryArr(int);
    const FloatBinArr = FloatToBinaryArr(float);

    if (IntBinArr[0] === 0) {
      // 确定右移的位数
      const expNum = FloatBinArr.indexOf(1) + 1;
      if (expNum * -1 < MIN_EXPONENT) {
        res.exponent = new Array(10).fill(0);
        res.fraction = new Array(13).fill(0);
      } else {
        res.exponent = IntToBinaryArr(OFFSET - expNum);
        //TODO:四舍五入
        res.fraction = FloatBinArr.slice(expNum, expNum + 13);
      }
    } else {
      //整数不为0
      if (IntBinArr.length <= 14) {
        res.exponent = IntToBinaryArr(OFFSET + IntBinArr.length - 1);
        // TODO:四舍五入二进制
        res.fraction = [...IntBinArr, ...FloatBinArr].slice(1, 14);
      } else if (IntBinArr.length > MAX_EXPONENT + 1) {
        res.exponent = new Array(10).fill(1);
        res.fraction = new Array(13).fill(0);
      } else {
        res.exponent = IntToBinaryArr(OFFSET + IntBinArr.length - 1);
        // TODO:四舍五入二进制数
        res.fraction = IntBinArr.slice(1, 14);
      }
    }
  }
  res.exponent = TrimArr(res.exponent, 10, true);
  res.fraction = TrimArr(res.fraction, 13);
  return res;
};

/**
 * 小数部分转二进制(只取小数部分二进制)
 * @param {string | number} val
 * @param {number} digit
 * @param {intIsZero} intIsZero
 */
function FloatToBinaryArr(val, intIsZero = false, digit = 15) {
  const arr = [];
  let float = parseFloat(val);
  if (!intIsZero) {
    let n = digit;
    while (n >= 0) {
      float *= 2;
      if (float >= 1) {
        arr.push(1);
        float -= 1;
      } else {
        arr.push(0);
      }
      n--;
    }
  } else {
    let effectiveN = 0;
    let isEffective = false;
    while (effectiveN <= digit) {
      float *= 2;
      if (float >= 1) {
        arr.push(1);
        float -= 1;
        isEffective = true;
      } else {
        arr.push(0);
      }
      effectiveN += isEffective ? 1 : 0;
    }
  }
  return arr;
}

/**
 * 整数转为二进制数组
 * @param {string | number} val
 * @returns {Array[13]}
 */
function IntToBinaryArr(val) {
  const parsedDecimal = parseInt(val, 10);
  return parsedDecimal
    .toString(2)
    .split('')
    .map(item => item * 1);
}

/**
 * 数组补全方法
 * @param {number>} arr
 * @param {number} length
 * @param {number} trimItem
 * @param {boolean} isHead
 */
function TrimArr(arr, length, isHead = false, trimItem = 0) {
  if (isHead) {
    return [...new Array(length - arr.length).fill(trimItem), ...arr];
  }
  return [...arr, ...new Array(length - arr.length).fill(trimItem)];
}

/**
 * 二进制字符串转十进制
 * @param {string} binaryStr
 * @returns {number}
 */
function BinaryToFloat(binaryStr) {
  let decimal = Number.parseInt(binaryStr, 2);
  // 提取小数部分
  let fractionalPart = binaryStr.split('.')[1];
  if (fractionalPart) {
    // 计算小数部分的二进制转十进制
    let fractionalDecimal = fractionalPart.split('').reduce((acc, bit, index) => {
      return acc + Number.parseInt(bit, 2) / 2 ** (index + 1);
    }, 0);
    // 累加整数和小数部分得到最终结果
    decimal += fractionalDecimal;
  }
  return decimal;
}

console.log(new float24('-0.755').valueOf()); // 1 0111111110 1000000000000 √
