// 三角函数实现
export const ACOS = (number: number): number => {
  if (number < -1 || number > 1) {
    throw new Error('ACOS: number值必须在-1~1之间（包括-1和1）。');
  }
  return Math.acos(number);
};

export const ACOSH = (number: number): number => {
  if (number < 1) {
    throw new Error('ACOSH: number值必须大于等于1');
  }
  return Math.acosh(number);
};

export const ASIN = (number: number): number => {
  if (number < -1 || number > 1) {
    throw new Error('ASIN: number值必须在 -1 到 1 之间（含 1 与 -1）');
  }
  return Math.asin(number);
};

export const ASINH = (number: number): number => {
  return Math.asinh(number);
};

export const ATAN = (number: number): number => {
  return Math.atan(number);
};

export const ATAN2 = (x: number, y: number): number => {
  if (x === 0 && y === 0) {
    throw new Error('ATAN2: x 与 y 不可同时为0。');
  }
  return Math.atan2(x, y);
};

export const ATANH = (number: number): number => {
  if (number <= -1 || number >= 1) {
    throw new Error('ATANH: number值必须介于-1~1之间（不包括-1，1）');
  }
  return Math.atanh(number);
};

export const COS = (number: number): number => {
  return Math.cos(number);
};

export const COSH = (number: number): number => {
  return Math.cosh(number);
};

export const DEGREES = (number: number): number => {
  return number * (180 / Math.PI);
};

export const RADIANS = (number: number): number => {
  return number * (Math.PI / 180);
};

export const SIN = (number: number): number => {
  return Math.sin(number);
};

export const SINH = (number: number): number => {
  return Math.sinh(number);
};

export const TAN = (number: number): number => {
  return Math.tan(number);
};

export const TANH = (number: number): number => {
  return Math.tanh(number);
};

// 数学函数实现
export const ABS = (number: number): number => {
  return Math.abs(number);
};

export const CEILING = (number: number): number => {
  // 沿绝对值增大的方向舍入到最接近的整数
  // 正数：向上取整 (如 0.5 -> 1)
  // 负数：向下取整 (如 -2.5 -> -3)
  if (number >= 0) {
    return Math.ceil(number);
  } else {
    return Math.floor(number);
  }
};

export const DECIMAL = (number: number): number => {
  // 如需支持更高精度的大数类型（如 Java 中的 BigDecimal），
  // 则需要引入专门的 JavaScript 大数库（如 decimal.js 或 big.js）
  return parseFloat(number.toString());
};

export const FLOOR = (number: number): number => {
  // 沿绝对值减小的方向去尾舍入
  // 正数：向下取整 (2.5 -> 2)
  // 负数：向零取整 (-3.5 -> -3)
  if (number >= 0) {
    return Math.floor(number);
  } else {
    return Math.ceil(number);
  }
};

export const INT = (number: number): number => {
  // 下舍入（数值减小的方向），即向负无穷方向取整
  return Math.floor(number);
};

export const MOD = (number: number, divisor: number): number => {
  if (divisor === 0) {
    throw new Error('MOD: divisor cannot be 0');
  }
  return ((number % divisor) + divisor) % divisor;
};

export const PRODUCT = (...numbers: number[]): number => {
  return numbers.reduce((acc, curr) => acc * curr, 1);
};

// 返回number2在number1上提升的比例（返回值还是百分比，待验证优化）
export const PROMOTION = (number1: number, number2: number): string | number => {
  return number2 - number1;
  // if (number1 === 0) {
  //   // 相对于0的提升，直接乘以100%
  //   return (number2 * 100) + '%';
  // }
  // const promotion = (number2 - number1) / Math.abs(number1) * 100;
  // return promotion + '%';
};

export const RAND = (): number => {
  return Math.random();
};

export const RANDBETWEEN = (number1: number, number2: number): number => {
  const min = Math.ceil(number1);
  const max = Math.floor(number2);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const ROUND = (number: number, num_digits: number): number => {
  const factor = Math.pow(10, num_digits);
  const result = number * factor;
  // Excel 的 ROUND 使用 "round half away from zero" 方式
  // 即 .5 总是向远离零的方向舍入
  const absResult = Math.abs(result);
  const intPart = Math.floor(absResult);
  const decimalPart = absResult - intPart;
  
  let roundedAbs: number;
  if (decimalPart > 0.5) {
    roundedAbs = intPart + 1;
  } else if (decimalPart === 0.5) {
    // .5 时向远离零的方向舍入
    roundedAbs = intPart + 1;
  } else {
    roundedAbs = intPart;
  }
  
  return result >= 0 ? roundedAbs / factor : -roundedAbs / factor;
};

export const ROUNDDOWN = (number: number, num_digits: number): number => {
  // 靠近零值，向下（绝对值减小的方向）舍入，即向零方向舍入
  const factor = Math.pow(10, num_digits);
  const result = number * factor;
  // 正数向小取整，负数向大取整（向零方向）
  const rounded = number >= 0 ? Math.floor(result) : Math.ceil(result);
  return rounded / factor;
};

export const ROUNDUP = (number: number, num_digits: number): number => {
  // 远离零值，向上（绝对值增大的方向）舍入
  const factor = Math.pow(10, num_digits);
  const result = number * factor;
  // 正数向上取整，负数向下取整（远离零方向）
  const rounded = number >= 0 ? Math.ceil(result) : Math.floor(result);
  return rounded / factor;
};

export const SIGN = (number: number): number => {
  return Math.sign(number);
};

export const TRUNC = (number: number, num_digits: number = 0): number => {
  const factor = Math.pow(10, num_digits);
  return Math.trunc(number * factor) / factor;
};

// 文本函数实现
export const CHAR = (number: number): string => {
  if (number < 1 || number > 65535) {
    throw new Error('CHAR: 指定字符的数字，介于 1 和 65535 之间（包括 1 和 65535）');
  }
  return String.fromCharCode(number);
};

// 实现人民币大写，完整实现需要更复杂的逻辑
export const CNMONEY = (number: number, unit?: string): string => {
  // 数字转换为人民币大写
  const num = Math.abs(number);
  const isNegative = number < 0;
  
  // 中文数字
  const cnNumbers = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  // 中文单位
  const cnUnits = ['', '拾', '佰', '仟'];
  // 整数部分单位
  const intUnits = ['', '万', '亿', '万亿'];
  
  // 处理单位倍数
  let multiplier = 1;
  if (unit) {
    switch (unit) {
      case 's': multiplier = 10; break;
      case 'b': multiplier = 100; break;
      case 'q': multiplier = 1000; break;
      case 'w': multiplier = 10000; break;
      case 'sw': multiplier = 100000; break;
      case 'bw': multiplier = 1000000; break;
      case 'qw': multiplier = 10000000; break;
      case 'y': multiplier = 100000000; break;
      case 'sy': multiplier = 1000000000; break;
      case 'by': multiplier = 10000000000; break;
      case 'qy': multiplier = 100000000000; break;
      case 'wy': multiplier = 1000000000000; break;
      case 'swy': multiplier = 10000000000000; break;
      case 'bwy': multiplier = 100000000000000; break;
      case 'qwy': multiplier = 1000000000000000; break;
    }
  }
  
  const adjustedNum = num * multiplier;
  
  // 分离整数和小数
  const parts = adjustedNum.toFixed(2).split('.');
  let intPart = parseInt(parts[0], 10);
  const decimalPart = parts[1];
  
  // 转换整数部分
  let result = '';
  let unitIndex = 0;
  let hasNonZeroBefore = false; // 记录前面是否有非零数字
  
  if (intPart === 0) {
    result = '';
  } else {
    const segments: string[] = [];
    
    while (intPart > 0) {
      let segment = intPart % 10000;
      let segmentStr = '';
      let digitIndex = 0;
      let segmentHasNonZero = false;
      
      while (segment > 0) {
        const digit = segment % 10;
        if (digit === 0) {
          if (segmentHasNonZero) {
            // 如果这个段之前有非零数字，现在遇到零，只加一个零
            segmentStr = '零' + segmentStr;
            segmentHasNonZero = false;
          }
        } else {
          segmentStr = cnNumbers[digit] + cnUnits[digitIndex] + segmentStr;
          segmentHasNonZero = true;
        }
        digitIndex++;
        segment = Math.floor(segment / 10);
      }
      
      // 去掉段末尾的零
      if (segmentStr.endsWith('零')) {
        segmentStr = segmentStr.slice(0, -1);
      }
      
      if (segmentStr) {
        segments.push(segmentStr + (unitIndex > 0 ? intUnits[unitIndex] : ''));
      }
      
      intPart = Math.floor(intPart / 10000);
      unitIndex++;
    }
    
    // 合并各段，去除相邻的重复零
    result = segments.reverse().join('');
    // 去除连续的"零零"
    result = result.replace(/零+/g, '零');
    // 去除末尾的零
    if (result.endsWith('零')) {
      result = result.slice(0, -1);
    }
  }
  
  // 转换小数部分
  const jiao = parseInt(decimalPart[0], 10);
  const fen = parseInt(decimalPart[1], 10);
  
  if (result === '' && jiao === 0 && fen === 0) {
    return '零';
  }
  
  if (jiao === 0 && fen === 0) {
    result += '圓整';
  } else {
    result += '圓';
    if (jiao > 0) {
      result += cnNumbers[jiao] + '角';
    }
    if (fen > 0) {
      result += cnNumbers[fen] + '分';
    }
  }
  
  if (isNegative) {
    result = '负' + result;
  }
  
  return result;
};

export const CODE = (text: string): number => {
  return text.charCodeAt(0);
};

export const CONCATENATE = (...texts: string[]): string => {
  return texts.join('');
};

export const ENBYSTRNUM = (text: string, number: number): string => {
  const result = [];
  for (let i = 0; i < text.length; i += number) {
    result.push(text.slice(i, i + number));
  }
  return result.join('\n');
};

export const ENDWITH = (text1: string, text2: string): boolean => {
  return text1.endsWith(text2);
};

// 实现数字转换成英文金额文本（待验证优化）
export const ENMONEY = (number: number): string => {
  // 检查范围限制：超过千万亿不支持
  if (Math.abs(number) > 1000000000000000) {
    throw new Error('ENMONEY: 数字超过千万亿，不支持使用该函数。');
  }
  
  // 将数字转换为英文金额
  const num = Math.abs(number);
  const isNegative = number < 0;
  
  // 0-19 的英文单词
  const below20 = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 
                   'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 
                   'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  // 20, 30, ... 90 的英文单词
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  // 大数单位
  const units = ['', 'Thousand', 'Million', 'Billion', 'Trillion', 'Quadrillion'];
  
  // 转换小于1000的数字
  const convertBelow1000 = (n: number): string => {
    if (n === 0) return '';
    if (n < 20) return below20[n];
    if (n < 100) {
      return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + below20[n % 10] : '');
    }
    return below20[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' ' + convertBelow1000(n % 100) : '');
  };
  
  // 分离整数和小数
  const parts = num.toFixed(2).split('.');
  const intPart = parseInt(parts[0], 10);
  const decimalPart = parseInt(parts[1], 10);
  
  // 转换整数部分
  let result = '';
  let tempNum = intPart;
  let unitIndex = 0;
  let foundNonZero = false;
  let maxUnitIndex = 0;
  
  while (tempNum > 0) {
    if (tempNum % 1000 !== 0) {
      maxUnitIndex = unitIndex;
    }
    tempNum = Math.floor(tempNum / 1000);
    unitIndex++;
  }
  
  if (intPart > 0) {
    maxUnitIndex = unitIndex - 1;
  }
  
  tempNum = intPart;
  unitIndex = 0;
  foundNonZero = false;
  
  while (unitIndex <= maxUnitIndex) {
    const segment = tempNum > 0 ? tempNum % 1000 : 0;
    
    if (segment !== 0) {
      const segStr = convertBelow1000(segment);
      result += segStr + (units[unitIndex] ? ' ' + units[unitIndex] : '') + ' ';
      foundNonZero = true;
    } else if (foundNonZero && unitIndex > 0) {
      result += 'Zero ' + (units[unitIndex] || '') + ' ';
    }
    
    if (tempNum > 0) {
      tempNum = Math.floor(tempNum / 1000);
    }
    unitIndex++;
  }
  
  result = result.trim();
  
  if (result === '') {
    result = 'Zero';
  }
  
  // 转换小数部分（cents）
  const centsText = convertBelow1000(decimalPart);
  
  if (centsText) {
    result += ' And Cents ' + centsText;
  }
  
  if (isNegative) {
    result = 'Negative ' + result;
  }
  
  return result;
};

// 实现数字转换成英文数字文本（待验证优化）
export const ENNUMBER = (number: number): string => {
  // 检查范围限制：超过千万亿不支持
  if (Math.abs(number) > 1000000000000000) {
    throw new Error('ENNUMBER: 数字超过千万亿，不支持使用该函数。');
  }
  // 将数字转换为英文文本
  const num = Math.abs(number);
  const isNegative = number < 0;
  
  // 0-19 的英文单词
  const below20 = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 
                   'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 
                   'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  // 20, 30, ... 90 的英文单词
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  // 大数单位
  const units = ['', 'Thousand', 'Million', 'Billion', 'Trillion', 'Quadrillion'];
  
  // 转换小于1000的数字
  const convertBelow1000 = (n: number): string => {
    if (n === 0) return '';
    if (n < 20) return below20[n];
    if (n < 100) {
      return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + below20[n % 10] : '');
    }
    return below20[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' ' + convertBelow1000(n % 100) : '');
  };
  
  // 分离整数和小数
  const parts = num.toString().split('.');
  const intPart = parseInt(parts[0], 10);
  const decimalPart = parts[1] || '';
  
  // 转换整数部分
  let result = '';
  let tempNum = intPart;
  let unitIndex = 0;
  let foundNonZero = false;
  let maxUnitIndex = 0;
  
  while (tempNum > 0) {
    if (tempNum % 1000 !== 0) {
      maxUnitIndex = unitIndex;
    }
    tempNum = Math.floor(tempNum / 1000);
    unitIndex++;
  }
  
  if (intPart > 0) {
    maxUnitIndex = unitIndex - 1;
  }
  
  tempNum = intPart;
  unitIndex = 0;
  foundNonZero = false;
  
  while (unitIndex <= maxUnitIndex) {
    const segment = tempNum > 0 ? tempNum % 1000 : 0;
    
    if (segment !== 0) {
      const segStr = convertBelow1000(segment);
      result += segStr + (units[unitIndex] ? ' ' + units[unitIndex] : '') + ' ';
      foundNonZero = true;
    } else if (foundNonZero && unitIndex > 0) {
      result += 'Zero ' + (units[unitIndex] || '') + ' ';
    }
    
    if (tempNum > 0) {
      tempNum = Math.floor(tempNum / 1000);
    }
    unitIndex++;
  }
  
  result = result.trim();
  
  if (result === '') {
    result = 'Zero';
  }
  
  // 转换小数部分 - 每个数字单独输出
  if (decimalPart) {
    result += ' Point';
    for (const digit of decimalPart) {
      if (digit !== '0') {
        result += ' ' + below20[parseInt(digit, 10)];
      } else {
        result += ' Zero';
      }
    }
  }
  
  if (isNegative) {
    result = 'Negative ' + result;
  }
  
  return result;
};

export const EXACT = (text1: string, text2: string): boolean => {
  return text1 === text2;
};

export const FIND = (find_text: string, within_text: string, start_num: number = 1): number => {
  const index = within_text.indexOf(find_text, start_num - 1);
  return index >= 0 ? index + 1 : 0;
};

// 简化实现格式化，完整实现需要更复杂的逻辑（待验证优化）
export const FORMAT = (text: any, format: string): string => {
  const num = typeof text === 'number' ? text : parseFloat(text);
  
  if (isNaN(num)) {
    return String(text);
  }
  
  // 百分比格式
  if (format.includes('%')) {
    const percentMatch = format.match(/0\.0+/g)?.[0];
    const decimalPlaces = percentMatch ? percentMatch.length - 1 : 0;
    const multiplied = num * 100;
    return multiplied.toFixed(decimalPlaces) + '%';
  }
  
  // 科学计数法格式
  if (format.toUpperCase().includes('E')) {
    const match = format.match(/0\.?0*E0?0*/i);
    if (match) {
      return num.toString().toUpperCase();
    }
    return num.toExponential().toUpperCase();
  }
  
  // 千分位货币格式
  let decimalPlaces = 0;
  const decimalMatch = format.match(/\.(0+)/);
  if (decimalMatch) {
    decimalPlaces = decimalMatch[1].length;
  }
  
  // 判断是否有货币符号
  let prefix = '';
  if (format.includes('￥')) {
    prefix = '￥';
  } else if (format.includes('$')) {
    prefix = '$';
  }
  
  // 格式化数字
  const parts = num.toFixed(decimalPlaces).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  return prefix + parts.join('.');
};

export const GETCHARNUM = (text1: string, text2: string): number => {
  if (!text2 || !text1) return 0;
  
  let count = 0;
  let index = text1.indexOf(text2);
  while (index !== -1) {
    count++;
    index = text1.indexOf(text2, index + text2.length);
  }

  return count;
};

export const INDEXOF = (text: string, index: number): string => {
  const i = Math.floor(index);
  return i >= 0 && i < text.length ? text.charAt(i) : '';
};

export const LEFT = (text: string, num_chars: number = 1): string => {
  const len = Math.floor(num_chars);
  return len >= 0 ? text.slice(0, len) : '';
};

export const LEN = (text: string): number => {
  return text.length;
};

export const LOWER = (text: string): string => {
  return text.toLowerCase();
};

export const MID = (text: string, start_num: number, num_chars: number): string => {
  const start = Math.max(0, start_num - 1);
  return text.slice(start, start + num_chars);
};

// 简化实现MIDCHAR，完整实现需要更复杂的逻辑（待验证优化）
export const MIDCHAR = (text: string, char: string, number: number = 1, direction: boolean = true): string => {
  const indices: number[] = [];
  let index = text.indexOf(char);
  
  while (index !== -1) {
    indices.push(index);
    index = text.indexOf(char, index + 1);
  }
  
  const targetIndex = number > 0 ? number - 1 : indices.length + number;
  
  if (targetIndex < 0 || targetIndex >= indices.length) {
    return '';
  }
  
  const pos = indices[targetIndex];
  
  if (direction) {
    return text.slice(pos + char.length);
  } else {
    return text.slice(0, pos);
  }
};

// 简化实现NUMTO，完整实现需要更复杂的逻辑（待验证优化）
export const NUMTO = (number: number): string => {
  return number.toString();
};

// 简化实现NUMTOZH，完整实现需要更复杂的逻辑（待验证优化）
export const NUMTOZH = (number: number | string, type: number = 1): string => {
  return number.toString();
};

export const PROPER = (text: string): string => {
  if (!text || text.length === 0) {
    return '';
  }
  
  let result = '';
  let capitalizeNext = true;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    
    if (/[a-zA-Z]/.test(char)) {
      // 如果是字母
      if (capitalizeNext) {
        result += char.toUpperCase();
        capitalizeNext = false;
      } else {
        result += char.toLowerCase();
      }
    } else {
      // 非字母字符后，下一个字母需要大写
      result += char;
      capitalizeNext = true;
    }
  }
  
  return result;
};

// 正则表达式标志位常量 （待验证优化）
export const REGEXP = (
  text: string,
  pattern: string,
  intNumber?: number
): boolean => {
  if (!text || pattern === undefined || pattern === null) {
    return false;
  }
  // 标志位常量
  const UNIX_LINES = 1;           // 启用Unix行模式
  const CASE_INSENSITIVE = 2;     // 启用不区分大小写的匹配
  const COMMENTS = 4;             // 允许在模式中使用空格和注释
  const MULTILINE = 8;            // 启用多行模式
  const LITERAL = 16;             // 启用模式的文字分析
  const DOTALL = 32;              // 启用DOTALL模式
  const UNICODE_CASE = 64;        // 启用支持Unicode的大小写折叠
  const CANON_EQ = 128;           // 启用规范等效
  const UNICODE_CHAR_CLASS = 256; // 启用预定义字符类和POSIX字符类的Unicode版本
  let flags = '';
  // 处理标志位组合
  if (intNumber !== undefined && intNumber !== null) {
    // CASE_INSENSITIVE = 2
    if ((intNumber & CASE_INSENSITIVE) === CASE_INSENSITIVE) {
      flags += 'i';
    }
    // MULTILINE = 8
    if ((intNumber & MULTILINE) === MULTILINE) {
      flags += 'm';
    }
    // DOTALL = 32
    if ((intNumber & DOTALL) === DOTALL) {
      flags += 's';
    }
    // UNICODE_CASE = 64
    if ((intNumber & UNICODE_CASE) === UNICODE_CASE) {
      flags += 'u';
    }
  }
  let regex: RegExp;
  try {
    // LITERAL = 16: 启用模式的文字分析（转义正则元字符）
    if (intNumber !== undefined && (intNumber & LITERAL) === LITERAL) {
      // 转义所有正则元字符
      const escapedPattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      regex = new RegExp(escapedPattern, flags);
    } else {
      regex = new RegExp(pattern, flags);
    }
  } catch (e) {
    throw new Error(`REGEXP: 正则表达式语法错误 - ${(e as Error).message}`);
  }
  return regex.test(text);
}

export const REPEAT = (text: string, number_times: number = 1): string => {
   // 如果 text 为空或 null，返回空字符串
  if (!text) {
    return '';
  }

  // 如果不是整数，将被取整
  const count = Math.floor(number_times);
  if (count <= 0) {
    return '';
  }
  const result = text.repeat(count);
  // 若超过 32767 个字符，则显示错误信息
  return result.length > 32767 ? 'Too Long Text For Excel Cell' : result;
};

// 文本替换
export const REPLACE = (...args: any[]): string => {
  if (args.length < 3 || args.length > 4) {
    throw new Error('REPLACE: 参数数量不正确，需要 3 或 4 个参数。');
  }

  if (args.length === 3) {
    // 用法一：替换所有符合条件的文本
    const [text, texttoreplace, replacetext] = args;
    
    if (text === undefined || text === null) {
      return '';
    }
    if (texttoreplace === undefined || texttoreplace === null) {
      return String(text);
    }
    
    // 使用 split + join 替换所有匹配的文本
    return String(text).split(String(texttoreplace)).join(replacetext !== null && replacetext !== undefined ? String(replacetext) : '');
    
  } else {
    // 用法二：替换指定位置的文本
    const [old_text, start_num, num_chars, new_text] = args;
    
    if (old_text === undefined || old_text === null) {
      return '';
    }
    
    const text = String(old_text);
    const start = Math.max(1, Math.floor(start_num));  // 起始位置从1开始
    const num = Math.max(0, Math.floor(num_chars));   // 替换长度
    const replacement = new_text !== null && new_text !== undefined ? String(new_text) : '';
    
    // 如果起始位置超过文本长度，直接返回原文本
    if (start > text.length) {
      return text + replacement;
    }
    
    // 计算实际的结束位置
    const startIndex = start - 1;  // 转换为0-based索引
    const endIndex = Math.min(startIndex + num, text.length);
    
    return text.slice(0, startIndex) + replacement + text.slice(endIndex);
  }
};

export const RIGHT = (text: string, num_chars: number = 1): string => {
  const len = Math.floor(num_chars);
  return len >= 0 ? text.slice(-len) : '';
};

export const SPLIT = (text1: string, text2: string): string[] => {
  return text1.split(text2);
};

export const STARTWITH = (text1: string, text2: string): boolean => {
  return text1.startsWith(text2);
};

export const SUBSTITUTE = (text: string, old_text: string, new_text: string, instance_num?: number): string => {
  if (instance_num === undefined) {
    return text.split(old_text).join(new_text);
  }
  
  const parts = text.split(old_text);
  if (instance_num <= 0 || instance_num > parts.length - 1) {
    return text;
  }
  
  return parts.slice(0, instance_num).join(old_text) + new_text + parts.slice(instance_num).join(old_text);
};

export const TEXTGETNUM = (text: string): string => {
  const numbers = text ? text.match(/\d/g) : [];
  return numbers ? numbers.join('') : '';
};

export const TODOUBLE = (text: string): number => {
  if (!text) {
    return 0;
  }
  return parseFloat(text);
};

export const TOINTEGER = (text: string): number => {
  if (!text) {
    return 0;
  }
  return parseInt(text, 10);
};

// 待验证优化
export const TOLONG = (text: string): number => {
  // Long 范围：-9223372036854775808 ~ 9223372036854775807
  const MIN_LONG = -9223372036854775808;
  const MAX_LONG = 9223372036854775807;
  
  if (!text) {
    return 0;
  }
  
  // 处理字符串，提取整数部分
  const numStr = String(text).trim();
  
  // 尝试解析为数字
  let num = parseFloat(numStr);
  
  // 如果解析失败，抛出错误
  if (isNaN(num)) {
    throw new Error('TOLONG: 无法将文本转换为Long类型。');
  }
  
  // 取整（向下取整，与 Java 的 Long.parseLong() 一致）
  num = Math.floor(num);
  
  // 检查是否在 Long 范围内
  if (num < MIN_LONG || num > MAX_LONG) {
    throw new Error(`TOLONG: 数值超出Long范围（${MIN_LONG} ~ ${MAX_LONG}）。`);
  }
  
  return num;
};

export const TRIM = (text: string): string => {
  return text.trim();
};

export const UPPER = (text: string): string => {
  return text.toUpperCase();
};

// 日期函数实现
export const DATEDELTA = (date: string, delta: number): string => {
  const d = new Date(date);
  d.setDate(d.getDate() + delta);
  return d.toISOString().split('T')[0];
};

// 简化实现DATEDIF，完整实现需要更复杂的逻辑
export const DATEDIF = (start_date: string, end_date: string, unit: string, method?: number): number => {
  const start = new Date(start_date);
  const end = new Date(end_date);
  let diff = end.getTime() - start.getTime();
  
  if (method === -1) {
    // 考虑正负情况
  } else {
    // 返回绝对值
    diff = Math.abs(diff);
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  
  switch (unit) {
    case 'Y':
      return years;
    case 'M':
      return months;
    case 'D':
      return days;
    case 'MD':
      return Math.abs(end.getDate() - start.getDate());
    case 'YM':
      return Math.abs(end.getMonth() - start.getMonth());
    case 'YD':
      return Math.abs((new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime() - 
                      new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime()) / 
                     (1000 * 60 * 60 * 24));
    default:
      return 0;
  }
};

// 简化实现DATEINMONTH，完整实现需要更复杂的逻辑
export const DATEINMONTH = (date: string, number: number): string => {
  const d = new Date(date);
  d.setDate(number);
  return d.toISOString().split('T')[0];
};

// 简化实现DATEINQUARTER，完整实现需要更复杂的逻辑
export const DATEINQUARTER = (date: string, number: number): string => {
  const d = new Date(date);
  d.setDate(d.getDate() + number - 1);
  return d.toISOString().split('T')[0];
};

// 简化实现DATEINWEEK，完整实现需要更复杂的逻辑
export const DATEINWEEK = (date: string, number: number): string => {
  const d = new Date(date);
  d.setDate(d.getDate() + number - 1);
  return d.toISOString().split('T')[0];
};

// 简化实现DATEINYEAR，完整实现需要更复杂的逻辑
export const DATEINYEAR = (date: string, number: number): string => {
  const d = new Date(date);
  d.setDate(1);
  d.setDate(number);
  return d.toISOString().split('T')[0];
};

// 简化实现DATESUBDATE，完整实现需要更复杂的逻辑
export const DATESUBDATE = (startDateTime: string, endDateTime: string, unit: string, method?: number): number => {
  const start = new Date(startDateTime);
  const end = new Date(endDateTime);
  let diff = end.getTime() - start.getTime();
  
  if (method === -1) {
    // 考虑正负情况
  } else {
    // 返回绝对值
    diff = Math.abs(diff);
  }
  
  switch (unit) {
    case 's':
      return Math.floor(diff / 1000);
    case 'm':
      return Math.floor(diff / (1000 * 60));
    case 'h':
      return Math.floor(diff / (1000 * 60 * 60));
    case 'd':
      return Math.floor(diff / (1000 * 60 * 60 * 24));
    case 'w':
      return Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
    default:
      return 0;
  }
};

// 简化实现DATE_FORMAT，完整实现需要更复杂的逻辑
export const DATE_FORMAT = (datetime: string, formatTo: string): string => {
  const date = new Date(datetime);
  return date.toLocaleString();
};

export const DAY = (date: string): number => {
  return new Date(date).getDate();
};

export const DAYSOFMONTH = (date: string): number => {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
};

export const DAYSOFYEAR = (year: number): number => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 366 : 365;
};

// 简化实现ENDOFMONTH，完整实现需要更复杂的逻辑
export const ENDOFMONTH = (date?: string, number: number = 0): string => {
  const d = date ? new Date(date) : new Date();
  d.setMonth(d.getMonth() + number + 1, 0);
  return d.toISOString().split('T')[0];
};

export const HOUR = (time: string): number => {
  return new Date('2000-01-01 ' + time).getHours();
};

// 简化实现ISWORKDAY，完整实现需要更复杂的逻辑
export const ISWORKDAY = (date?: string): boolean => {
  const d = date ? new Date(date) : new Date();
  const day = d.getDay();
  return day !== 0 && day !== 6;
};

export const MINUTE = (time: string): number => {
  return new Date('2000-01-01 ' + time).getMinutes();
};

export const MONTH = (date: string): number => {
  return new Date(date).getMonth() + 1;
};

// 简化实现MONTHDELTA，完整实现需要更复杂的逻辑
export const MONTHDELTA = (date: string, delta: number): string => {
  const d = new Date(date);
  d.setMonth(d.getMonth() + delta);
  return d.toISOString().split('T')[0];
};

export const NOW = (): string => {
  return new Date().toISOString().slice(0, 19).replace('T', ' ');
};

export const QUARTER = (date: string): number => {
  return Math.floor((new Date(date).getMonth() + 3) / 3);
};

export const SECOND = (time: string): number => {
  return new Date('2000-01-01 ' + time).getSeconds();
};

// 简化实现TIME，完整实现需要更复杂的逻辑
export const TIME = (hour: number, minute: number, second: number): string => {
  const d = new Date();
  d.setHours(hour, minute, second);
  return d.toISOString().slice(0, 19).replace('T', ' ');
};

export const TODAY = (): string => {
  return new Date().toISOString().split('T')[0];
};

// 简化实现WEEK，完整实现需要更复杂的逻辑
export const WEEK = (date: string): number => {
  const d = new Date(date);
  const firstDayOfYear = new Date(d.getFullYear(), 0, 1);
  const pastDaysOfYear = (d.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

// 简化实现WEEKDATE，完整实现需要更复杂的逻辑
export const WEEKDATE = (year: number, month: number, weekOfMonth: number, dayOfWeek: number): string => {
  const d = new Date(year, month - 1, 1);
  const firstDay = d.getDay();
  const dayDiff = dayOfWeek - firstDay;
  const date = (weekOfMonth - 1) * 7 + (dayDiff <= 0 ? dayDiff + 7 : dayDiff) + 1;
  d.setDate(date);
  return d.toISOString().split('T')[0];
};

// 简化实现WEEKDAY，完整实现需要更复杂的逻辑
export const WEEKDAY = (date: string, showChinese: boolean = false): any => {
  const d = new Date(date);
  const day = d.getDay();
  const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  return showChinese ? weekDays[day] : day === 0 ? 7 : day;
};

export const YEAR = (date: string): number => {
  return new Date(date).getFullYear();
};

// 简化实现YEARDELTA，完整实现需要更复杂的逻辑
export const YEARDELTA = (date: string, delta: number): string => {
  const d = new Date(date);
  d.setFullYear(d.getFullYear() + delta);
  return d.toISOString().split('T')[0];
};

// 统计函数实现
// 辅助函数：将各种类型转换为数字
const canConvertToNumber = (value: any): boolean => {
  return typeof value === 'number' || (typeof value === 'string' && !isNaN(Number(value)));
};
const convertToNumber = (value: any): number => {
  return typeof value === 'boolean' ? (value ? 1 : 0) :
         typeof value === 'string' ? (isNaN(Number(value)) ? 0 : Number(value)) :
         typeof value === 'number' ? value : 0;
};

export const AVERAGE = (...args: any[]): number => {
  let count = 0;
  let sum = 0;
  let countString = true;

  if (args.length > 0 && typeof args[args.length - 1] === 'boolean') {
    countString = args.pop();
  }

  args.forEach((arg: any) => {
    if (Array.isArray(arg)) {
      arg.forEach((item: any) => {
        if (countString || canConvertToNumber(item)) {
          const num = convertToNumber(item);
          sum += num;
          count++;
        }
      });
    } else {
      if (countString || canConvertToNumber(arg)) {
        const num = convertToNumber(arg);
        sum += num;
        count++;
      }
    }
  });

  return count > 0 ? sum / count : 0;
};

export const COUNT = (...args: any[]): number => {
  let count = 0;
  
  args.forEach((arg: any) => {
    if (Array.isArray(arg)) {
      count += arg.filter((item: any) => item !== null && item !== undefined).length;
    } else if (arg !== null && arg !== undefined) {
      count++;
    }
  });
  
  return count;
};

export const MAX = (...args: any[]): number => {
  return Math.max(...args.map(convertToNumber));
};

export const MIN = (...args: any[]): number => {
  return Math.min(...args.map(convertToNumber));
};

export const SUM = (...args: any[]): number => {
  let sum = 0;
  
  args.forEach((arg: any) => {
    if (Array.isArray(arg)) {
      arg.forEach((item: any) => {
        const num = convertToNumber(item);
        sum += num;
      });
    } else {
      const num = convertToNumber(arg);
      sum += num;
    }
  });
  
  return sum;
};

// 财务函数实现
export const FV = (rate: number, nper: number, pmt: number, pv: number = 0, type: number = 0): number => {
  if (rate === 0) {
    return -((pv || 0) + (pmt || 0) * nper);
  }
  
  const fv = (pmt || 0) * ((Math.pow(1 + rate, nper) - 1) / rate) * (1 + rate * type) + 
             (pv || 0) * Math.pow(1 + rate, nper);
  return -fv;
};

// 简化实现IPMT，完整实现需要更复杂的逻辑
export const IPMT = (rate: number, per: number, nper: number, pv: number, fv: number = 0, type: number = 0): number => {
  if (rate === 0) {
    return 0;
  }
  
  const pmt = -((fv + pv * Math.pow(1 + rate, nper)) / 
               (((1 + rate * type) * (Math.pow(1 + rate, nper) - 1)) / rate + type));
  
  const ipmt = -((pv * Math.pow(1 + rate, per - 1) * rate) - 
                (pmt * (1 + rate * type) * (Math.pow(1 + rate, per - 1) - 1) / rate));
  
  return ipmt;
};

// 简化实现NPER，完整实现需要更复杂的逻辑
export const NPER = (rate: number, pmt: number, pv: number, fv: number = 0, type: number = 0): number => {
  if (rate === 0) {
    return -(pv + fv) / pmt;
  }
  
  let nper = 0;
  let guess = 10;
  const maxIter = 100;
  const tolerance = 1e-8;
  
  for (let i = 0; i < maxIter; i++) {
    const f = -pv * Math.pow(1 + rate, guess) - 
              pmt * (1 + rate * type) * (Math.pow(1 + rate, guess) - 1) / rate + fv;
    
    if (Math.abs(f) < tolerance) {
      break;
    }
    
    const df = -pv * Math.log(1 + rate) * Math.pow(1 + rate, guess) - 
               pmt * (1 + rate * type) * (Math.log(1 + rate) * Math.pow(1 + rate, guess) * rate - 
               (Math.pow(1 + rate, guess) - 1)) / rate;
    
    guess -= f / df;
    nper = guess;
  }
  
  return nper;
};

export const NPV = (rate: number, ...values: number[]): number => {
  let npv = 0;
  for (let i = 0; i < values.length; i++) {
    npv += values[i] / Math.pow(1 + rate, i + 1);
  }
  return npv;
};

export const PMT = (rate: number, nper: number, pv: number, fv: number = 0, type: number = 0): number => {
  if (rate === 0) {
    return -(pv + fv) / nper;
  }
  
  const pmt = (fv + pv * Math.pow(1 + rate, nper)) / 
              (((1 + rate * type) * (Math.pow(1 + rate, nper) - 1)) / rate + type);
  
  return -pmt;
};

export const PPMT = (rate: number, per: number, nper: number, pv: number, fv: number = 0, type: number = 0): number => {
  if (rate === 0) {
    return -(pv + fv) / nper;
  }
  
  const pmt = PMT(rate, nper, pv, fv, type);
  const ipmt = IPMT(rate, per, nper, pv, fv, type);
  
  return pmt - ipmt;
};

export const PV = (rate: number, nper: number, pmt: number, fv: number = 0, type: number = 0): number => {
  if (rate === 0) {
    return -(pmt * nper + fv);
  }
  
  const pv = (pmt * (1 + rate * type) * (Math.pow(1 + rate, nper) - 1) / rate + fv) / 
             Math.pow(1 + rate, nper);
  
  return -pv;
};

// 逻辑函数实现
export const AND = (...exprs: boolean[]): boolean => {
  return exprs.every(expr => expr === true);
};

export const BITNOT = (data: number | string): number => {
  const num = typeof data === 'string' ? parseInt(data, 10) : data;
  return ~num;
};

export const IF = (boolean: boolean, value1: any, value2: any): any => {
  return boolean ? value1 : value2;
};

export const OR = (...exprs: boolean[]): boolean => {
  return exprs.some(expr => expr === true);
};

export const REVERSE = (boolean: boolean): boolean => {
  return !boolean;
};

export const SWITCH = (expression: any, ...args: any[]): any => {
  for (let i = 0; i < args.length - 1; i += 2) {
    if (expression === args[i]) {
      return args[i + 1];
    }
  }
  return args[args.length - 1];
};

// 其他函数实现
export const CORREL = (array1: number[], array2: number[]): number => {
  if (array1.length !== array2.length) {
    throw new Error('CORREL: arrays must have the same length');
  }
  
  const n = array1.length;
  if (n === 0) {
    return 0;
  }
  
  const sum1 = array1.reduce((acc, curr) => acc + curr, 0);
  const sum2 = array2.reduce((acc, curr) => acc + curr, 0);
  const sum1Sq = array1.reduce((acc, curr) => acc + curr * curr, 0);
  const sum2Sq = array2.reduce((acc, curr) => acc + curr * curr, 0);
  const pSum = array1.reduce((acc, curr, idx) => acc + curr * array2[idx], 0);
  
  const num = pSum - (sum1 * sum2 / n);
  const den = Math.sqrt((sum1Sq - sum1 * sum1 / n) * (sum2Sq - sum2 * sum2 / n));
  
  return den === 0 ? 0 : num / den;
};

// 简化实现INDEX，完整实现需要更复杂的逻辑
export const INDEX = (arry: any[], ...indices: number[]): any => {
  if (indices.length === 1) {
    return arry[indices[0] - 1];
  } else if (indices.length === 2) {
    return arry[indices[0] - 1][indices[1] - 1];
  }
  return arry;
};

export const ISNULL = (obj: any): boolean => {
  if (obj === null || obj === undefined) {
    return true;
  }
  if (typeof obj === 'string') {
    return obj.trim() === '';
  }
  return false;
};

// 简化实现MEDIAN，完整实现需要更复杂的逻辑
export const MEDIAN = (matrix: number[][]): number => {
  const flat = matrix.flat();
  flat.sort((a, b) => a - b);
  const mid = Math.floor(flat.length / 2);
  
  return flat.length % 2 === 0 ? (flat[mid - 1] + flat[mid]) / 2 : flat[mid];
};

// 简化实现RANK，完整实现需要更复杂的逻辑
export const RANK = (number: number, matrix: number[][], order: number = 0): number => {
  const flat = matrix.flat();
  const sorted = [...flat].sort((a, b) => order === 0 ? b - a : a - b);
  return sorted.indexOf(number) + 1;
};

// 简化实现STDEV，完整实现需要更复杂的逻辑
export const STDEV = (...matrices: any[]): number => {
  const flat = matrices.flat(Infinity).filter((item: any) => typeof item === 'number');
  const n = flat.length;
  if (n <= 1) {
    return 0;
  }
  
  const mean = flat.reduce((acc, curr) => acc + curr, 0) / n;
  const variance = flat.reduce((acc, curr) => acc + Math.pow(curr - mean, 2), 0) / (n - 1);
  
  return Math.sqrt(variance);
};

export const UUID = (num?: number): string => {
  const d = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (d + Math.random() * 16) % 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
  
  if (num === 32) {
    return uuid.replace(/-/g, '');
  }
  return uuid;
};

// 导出所有函数
export const functionImplementations = {
  // 三角函数
  ACOS, ACOSH, ASIN, ASINH, ATAN, ATAN2, ATANH, COS, COSH, DEGREES, RADIANS, SIN, SINH, TAN, TANH,
  // 数学函数
  ABS, CEILING, DECIMAL, FLOOR, INT, MOD, PRODUCT, PROMOTION, RAND, RANDBETWEEN, ROUND, ROUNDDOWN, ROUNDUP, SIGN, TRUNC,
  // 文本函数
  CHAR, CNMONEY, CODE, CONCATENATE, ENBYSTRNUM, ENDWITH, ENMONEY, ENNUMBER, EXACT, FIND, FORMAT, GETCHARNUM, INDEXOF, LEFT, LEN, LOWER, MID, MIDCHAR, NUMTO, NUMTOZH, PROPER, REGEXP, REPEAT, REPLACE, RIGHT, SPLIT, STARTWITH, SUBSTITUTE, TEXTGETNUM, TODOUBLE, TOINTEGER, TOLONG, TRIM, UPPER,
  // 日期函数
  DATEDELTA, DATEDIF, DATEINMONTH, DATEINQUARTER, DATEINWEEK, DATEINYEAR, DATESUBDATE, DATE_FORMAT, DAY, DAYSOFMONTH, DAYSOFYEAR, ENDOFMONTH, HOUR, ISWORKDAY, MINUTE, MONTH, MONTHDELTA, NOW, QUARTER, SECOND, TIME, TODAY, WEEK, WEEKDATE, WEEKDAY, YEAR, YEARDELTA,
  // 统计函数
  AVERAGE, COUNT, MAX, MIN, SUM,
  // 财务函数
  FV, IPMT, NPER, NPV, PMT, PPMT, PV,
  // 逻辑函数
  AND, BITNOT, IF, OR, REVERSE, SWITCH,
  // 其他函数
  CORREL, INDEX, ISNULL, MEDIAN, RANK, STDEV, UUID
};