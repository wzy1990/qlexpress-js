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

// 辅助函数：格式化日期为 YYYY-MM-DD（使用本地时区）
const formatDate = (d: Date): string => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// 辅助函数：格式化日期时间为 YYYY-MM-DD HH:mm:ss（使用本地时区）
const formatDateTime = (d: Date): string => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const DATEDELTA = (date: string, delta: number): string => {
  const d = new Date(date);
  d.setDate(d.getDate() + delta);
  return formatDate(d);
};

// 简化实现DATEDIF，完整实现需要更复杂的逻辑
// ⚠️ 当前实现为简化版本，存在以下限制：

// 年月计算简化：Y 和 M 单位使用 365 和 30 作为除数，可能与实际日历有偏差
// MD/YM/YD 计算：当前实现与 Excel 标准行为可能不完全一致
// 建议优化：如需精确计算，建议使用专业的日期处理库（如 dayjs 或 date-fns）
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
                      new Date(end.getFullYear(), start.getMonth(), start.getDate()).getTime()) / 
                     (1000 * 60 * 60 * 24));
    default:
      return 0;
  }
};

export const DATEINMONTH = (date: string, number: number): string => {
  const d = new Date(date);
  d.setDate(number);
  return formatDate(d);
};

export const DATEINQUARTER = (
  date: string, 
  number: number, 
  strict: boolean = false  // true: 超出范围报错，false: 自动顺延
): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth();
  
  const quarterStartMonth = Math.floor(month / 3) * 3;
  const quarterStart = new Date(year, quarterStartMonth, 1);
  quarterStart.setDate(quarterStart.getDate() + number);
  
  if (strict) {
    const quarterEnd = new Date(year, quarterStartMonth + 3, 0);
    if (quarterStart > quarterEnd) {
      throw new Error(`DATEINQUARTER: number(${number}) 超出季度有效天数范围`);
    }
  }
  
  return formatDate(quarterStart);
};

export const DATEINWEEK = (date: string, number: number): string => {
  const d = new Date(date);
  const dayOfWeek = d.getDay(); // 0=周日，1-6=周一到周六
  
  // 计算当前是周内第几天（周一=1，周日=0转为7）
  const currentDay = dayOfWeek === 0 ? 7 : dayOfWeek;
  
  // 计算目标日期
  const result = new Date(d);
  if (number <= 7) {
    // 周内第number天
    const offset = number - currentDay;
    result.setDate(d.getDate() + offset);
  } else {
    // 超出7天，顺延到下一周
    const offset = number - currentDay;
    result.setDate(d.getDate() + offset);
  }
  
  const year = result.getFullYear();
  const month = String(result.getMonth() + 1).padStart(2, '0');
  const day = String(result.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * DATEINYEAR(date, number)：函数返回在某一个年当中第几天的日期。
 * date：日期
 * number：指定天数（如果超出当年天数，顺延到下一年）
 */
export const DATEINYEAR = (date: string, number: number): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  
  // 找到该年的1月1日
  const firstDay = new Date(year, 0, 1);
  
  // 加上 number - 1 天（第1天就是1月1日）
  firstDay.setDate(1 + number - 1);
  
  const resultYear = firstDay.getFullYear();
  const month = String(firstDay.getMonth() + 1).padStart(2, '0');
  const day = String(firstDay.getDate()).padStart(2, '0');
  return `${resultYear}-${month}-${day}`;
};

// 简化实现DATESUBDATE，完整实现需要更复杂的逻辑
/**
 * DATESUBDATE(startDateTime, endDateTime, unit, [method])：返回两个日期之间的时间差。
 * startDateTime：开始时间
 * endDateTime：结束时间
 * unit：时间差单位
 * method：（可选、默认返回绝对值），若填写-1、则会考虑正负情况。
 */
export const DATESUBDATE = (startDateTime: string, endDateTime: string, unit: string, method?: number): number => {
  const start = new Date(startDateTime);
  const end = new Date(endDateTime);
  
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error('Invalid date format');
  }
  
  let diff = end.getTime() - start.getTime();
  
  // method 不为 -1 时返回绝对值
  if (method !== -1) {
    diff = Math.abs(diff);
  }
  
  switch (unit.toLowerCase()) {
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
      throw new Error(`Unsupported unit: ${unit}. Use s, m, h, d, or w.`);
  }
};

/**
 * DATE_FORMAT(datetime, formatTo)：日期时间格式化函数。
 * datetime：日期时间
 * formatTo：目标格式化样式
 * 
 * 支持格式：
 * yyyy - 4位年份
 * yy - 2位年份
 * MM - 2位月份
 * dd - 2位日期
 * HH - 24小时制（00-23）
 * hh - 12小时制（01-12）
 * mm - 分钟
 * ss - 秒
 * SSS - 毫秒
 */
export const DATE_FORMAT = (datetime: string, formatTo: string): string => {
  const date = new Date(datetime);
  
  if (isNaN(date.getTime())) {
    throw new Error('Invalid datetime format');
  }
  
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours24 = date.getHours();
  const hours12 = hours24 % 12 || 12;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();
  
  return formatTo
    .replace(/yyyy/g, String(year))
    .replace(/yy/g, String(year).slice(-2))
    .replace(/MM/g, String(month).padStart(2, '0'))
    .replace(/dd/g, String(day).padStart(2, '0'))
    .replace(/HH/g, String(hours24).padStart(2, '0'))
    .replace(/hh/g, String(hours12).padStart(2, '0'))
    .replace(/mm/g, String(minutes).padStart(2, '0'))
    .replace(/ss/g, String(seconds).padStart(2, '0'))
    .replace(/SSS/g, String(milliseconds).padStart(3, '0'));
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
  return formatDate(d);
};

// 简化实现ISWORKDAY，完整实现需要更复杂的逻辑
export const ISWORKDAY = (date?: string): boolean => {
  const d = date ? new Date(date) : new Date();
  const day = d.getDay();
  return day !== 0 && day !== 6;
};

/**
 * getFormatDate(time)：返回时间中的日期对象。
 * time：时间
 * 
 * 示例：
 * getFormatDate("16:40:19")
 * getFormatDate("2023-12-13 16:40:19")
 */
const getFormatDate = (time: string): Date => {
  let date: Date;
  if (time.includes(' ') || time.includes('T')) {
    // 完整日期时间格式
    date = new Date(time);
  } else {
    // 仅时间格式
    date = new Date('2000-01-01 ' + time);
  }
  
  if (isNaN(date.getTime())) {
    throw new Error('非法的时间格式，请确保时间格式为HH:mm:ss或YYYY-MM-DD HH:mm:ss.');
  }

  return date;
};
export const HOUR = (time: string): number => {
  return getFormatDate(time).getHours();
};

export const MINUTE = (time: string): number => {
  return getFormatDate(time).getMinutes();
};

export const SECOND = (time: string): number => {
  return getFormatDate(time).getSeconds();
};

export const MONTH = (date: string): number => {
  return new Date(date).getMonth() + 1;
};

export const MONTHDELTA = (date: string, delta: number): string => {
  const d = new Date(date);
  d.setMonth(d.getMonth() + delta);
  return formatDate(d);
};

export const NOW = (): string => {
  return formatDateTime(new Date());
};

export const QUARTER = (date: string): number => {
  return Math.floor((new Date(date).getMonth() + 3) / 3);
};

export const TIME = (hour: number, minute: number, second: number): string => {
  const d = new Date();
  d.setHours(hour, minute, second);
  return formatDateTime(d);
};

export const TODAY = (): string => {
  return formatDate(new Date());
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
  return formatDate(d);
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

export const YEARDELTA = (date: string, delta: number): string => {
  const d = new Date(date);
  d.setFullYear(d.getFullYear() + delta);
  return formatDate(d);
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

// 简化实现IPMT，（待验证优化）
export const IPMT = (
  rate: number, 
  per: number, 
  nper: number, 
  pv: number, 
  fv: number = 0, 
  type: number = 0
): number => {
  // 参数验证
  if (per < 1 || per > nper) {
    throw new Error('IPMT: per 必须在 1 到 nper 范围内');
  }
  
  if (rate === 0) {
    // 利率为 0 时，利息为 0
    return 0;
  }
  
  // 计算每期付款额 (PMT)
  // PMT = rate * (pv * (1+rate)^nper + fv) / ((1 + rate*type) * ((1+rate)^nper - 1))
  const powRateNper = Math.pow(1 + rate, nper);
  const pmt = rate * (pv * powRateNper + fv) / ((1 + rate * type) * (powRateNper - 1));
  
  // 计算指定期间的利息部分
  // IPMT = -(pv * (1+rate)^(per-1) + pmt * ((1+rate)^(per-1)-1)/rate * (1+rate*type)) * rate
  const powRatePer = Math.pow(1 + rate, per - 1);
  const ipmt = -(pv * powRatePer + pmt * (powRatePer - 1) / rate * (1 + rate * type)) * rate;
  
  // 保留两位小数，与 Excel 保持一致
  return Math.round(ipmt * 100) / 100;
};

export const NPER = (
  rate: number, 
  pmt: number, 
  pv: number, 
  fv: number = 0, 
  type: number = 0
): number => {
  // 参数验证
  if (pmt === 0 && pv === 0) {
    throw new Error('NPER: pmt 和 pv 不能同时为 0');
  }
  
  if (rate <= -1) {
    throw new Error('NPER: rate 必须大于 -1');
  }
  
  // 利率为 0 时的特殊情况
  if (rate === 0) {
    if (pmt === 0) {
      throw new Error('NPER: rate 为 0 时，pmt 不能为 0');
    }
    return -(pv + fv) / pmt;
  }
  
  // 标准 NPER 公式
  // nper = log((pmt * (1 + rate * type) - fv * rate) / (pmt * (1 + rate * type) + pv * rate)) / log(1 + rate)
  const pmtRateType = pmt * (1 + rate * type);
  const numerator = pmtRateType - fv * rate;
  const denominator = pmtRateType + pv * rate;
  
  if (denominator === 0) {
    throw new Error('NPER: 计算无效，分母为 0');
  }
  
  if (numerator / denominator <= 0) {
    throw new Error('NPER: 无法计算期数，参数组合无效');
  }
  
  const nper = Math.log(numerator / denominator) / Math.log(1 + rate);
  
  // 保留 5 位小数，与 Excel 保持一致
  return Math.round(nper * 100000) / 100000;
};

export const NPV = (rate: number, ...values: number[]): number => {
  let npv = 0;
  for (let i = 0; i < values.length; i++) {
    npv += values[i] / Math.pow(1 + rate, i + 1);
  }
  // 保留 2 位小数
  return Math.round(npv * 100) / 100;
};

export const PMT = (rate: number, nper: number, pv: number, fv: number = 0, type: number = 0): number => {
  if (rate === 0) {
    return -(pv + fv) / nper;
  }
  
  const pmt = (fv + pv * Math.pow(1 + rate, nper)) / 
              (((1 + rate * type) * (Math.pow(1 + rate, nper) - 1)) / rate + type);
  
  return -pmt;
};

// 简化实现PPMT，（待验证优化）
export const PPMT = (
  rate: number, 
  per: number, 
  nper: number, 
  pv: number, 
  fv: number = 0, 
  type: number = 0
): number => {
  // 参数验证
  if (per < 1 || per > nper) {
    throw new Error('PPMT: per 必须在 1 到 nper 范围内');
  }
  
  if (nper <= 0) {
    throw new Error('PPMT: nper 必须大于 0');
  }
  
  // 利率为 0 时的特殊情况
  if (rate === 0) {
    // 零利率时，每期本金 = -(pv + fv) / nper
    return -(pv + fv) / nper;
  }
  
  // 计算每期付款额 (PMT)
  const pmt = PMT(rate, nper, pv, fv, type);
  
  // 计算指定期间的利息部分 (IPMT)
  const ipmt = IPMT(rate, per, nper, pv, fv, type);
  
  // 本金 = 总付款 - 利息
  const ppmt = pmt - ipmt;
  
  // 保留两位小数，与 Excel 保持一致
  return Math.round(ppmt * 100) / 100;
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
// 待验证
export const AND = (...exprs: boolean[]): boolean => {
  return exprs.every(expr => expr === true);
};

export const BITNOT = (data: number | string): number => {
  const num = typeof data === 'string' ? parseInt(data, 10) : data;
  return ~num;
};
// 待验证
export const IF = (boolean: boolean, value1: any, value2: any): any => {
  return boolean ? value1 : value2;
};
// 待验证
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
    throw new Error('CORREL: 数组长度不一致');
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

// 简化实现INDEX基本测试通过，（待验证优化）
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