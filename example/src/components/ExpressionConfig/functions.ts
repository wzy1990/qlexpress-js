// 三角函数实现
export const ACOS = (number: number): number => {
  if (number < -1 || number > 1) {
    throw new Error('ACOS: number value must be between -1 and 1');
  }
  return Math.acos(number);
};

export const ACOSH = (number: number): number => {
  if (number < 1) {
    throw new Error('ACOSH: number value must be greater than or equal to 1');
  }
  return Math.acosh(number);
};

export const ASIN = (number: number): number => {
  if (number < -1 || number > 1) {
    throw new Error('ASIN: number value must be between -1 and 1');
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
    throw new Error('ATAN2: x and y cannot both be 0');
  }
  return Math.atan2(x, y);
};

export const ATANH = (number: number): number => {
  if (number <= -1 || number >= 1) {
    throw new Error('ATANH: number value must be between -1 and 1 (exclusive)');
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
  return Math.ceil(number);
};

export const DECIMAL = (number: number): number => {
  return parseFloat(number.toString());
};

export const FLOOR = (number: number): number => {
  return Math.floor(number);
};

export const INT = (number: number): number => {
  return number > 0 ? Math.floor(number) : Math.ceil(number);
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

export const PROMOTION = (number1: number, number2: number): number => {
  return number2 - number1;
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
  return Math.round(number * factor) / factor;
};

export const ROUNDDOWN = (number: number, num_digits: number): number => {
  const factor = Math.pow(10, num_digits);
  return Math.floor(number * factor) / factor;
};

export const ROUNDUP = (number: number, num_digits: number): number => {
  const factor = Math.pow(10, num_digits);
  return Math.ceil(number * factor) / factor;
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
    throw new Error('CHAR: number value must be between 1 and 65535');
  }
  return String.fromCharCode(number);
};

// 简化实现人民币大写，完整实现需要更复杂的逻辑
export const CNMONEY = (number: number, unit?: string): string => {
  // 简化实现，仅返回数字字符串
  return number.toFixed(2) + ' 人民币';
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

// 简化实现英文金额，完整实现需要更复杂的逻辑
export const ENMONEY = (number: number): string => {
  return number.toFixed(2) + ' Dollars';
};

// 简化实现英文数字，完整实现需要更复杂的逻辑
export const ENNUMBER = (number: number): string => {
  return number.toString();
};

export const EXACT = (text1: string, text2: string): boolean => {
  return text1 === text2;
};

export const FIND = (find_text: string, within_text: string, start_num: number = 1): number => {
  const index = within_text.indexOf(find_text, start_num - 1);
  return index >= 0 ? index + 1 : 0;
};

// 简化实现格式化，完整实现需要更复杂的逻辑
export const FORMAT = (text: any, format: string): string => {
  return text.toString();
};

export const GETCHARNUM = (text1: string, text2: string): number => {
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

// 简化实现MIDCHAR，完整实现需要更复杂的逻辑
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

// 简化实现NUMTO，完整实现需要更复杂的逻辑
export const NUMTO = (number: number): string => {
  return number.toString();
};

// 简化实现NUMTOZH，完整实现需要更复杂的逻辑
export const NUMTOZH = (number: number | string, type: number = 1): string => {
  return number.toString();
};

export const PROPER = (text: string): string => {
  return text.split(' ').map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');
};

export const REGEXP = (text: string, pattern: string, intNumber?: number): boolean => {
  let flags = '';
  if (intNumber === 2 || intNumber === 66) { // CASE_INSENSITIVE or CASE_INSENSITIVE + UNICODE_CASE
    flags += 'i';
  }
  if (intNumber === 8) { // MULTILINE
    flags += 'm';
  }
  if (intNumber === 32) { // DOTALL
    flags += 's';
  }
  
  const regex = new RegExp(pattern, flags);
  return regex.test(text);
};

export const REPEAT = (text: string, number_times: number = 1): string => {
  const count = Math.floor(number_times);
  if (count < 0) {
    return '';
  }
  const result = text.repeat(count);
  return result.length > 32767 ? 'Too Long Text For Excel Cell' : result;
};

export const REPLACE = (...args: any[]): string => {
  if (args.length === 3) {
    // 替换所有符合条件的文本
    const [text, texttoreplace, replacetext] = args;
    return text.split(texttoreplace).join(replacetext);
  } else if (args.length === 4) {
    // 替换指定位置的文本
    const [old_text, start_num, num_chars, new_text] = args;
    const start = Math.max(0, start_num - 1);
    const end = start + num_chars;
    return old_text.slice(0, start) + new_text + old_text.slice(end);
  }
  return args[0];
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
  const numbers = text.match(/\d/g);
  return numbers ? numbers.join('') : '';
};

export const TODOUBLE = (text: string): number => {
  return parseFloat(text);
};

export const TOINTEGER = (text: string): number => {
  return parseInt(text, 10);
};

export const TOLONG = (text: string): number => {
  return parseInt(text, 10);
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
        if (countString || typeof item === 'number') {
          const num = typeof item === 'boolean' ? (item ? 1 : 0) : 
                      typeof item === 'string' ? (isNaN(Number(item)) ? 0 : Number(item)) : 
                      typeof item === 'number' ? item : 0;
          sum += num;
          count++;
        }
      });
    } else {
      if (countString || typeof arg === 'number') {
        const num = typeof arg === 'boolean' ? (arg ? 1 : 0) : 
                    typeof arg === 'string' ? (isNaN(Number(arg)) ? 0 : Number(arg)) : 
                    typeof arg === 'number' ? arg : 0;
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

export const MAX = (...args: number[]): number => {
  return Math.max(...args);
};

export const MIN = (...args: number[]): number => {
  return Math.min(...args);
};

export const SUM = (...args: any[]): number => {
  let sum = 0;
  
  args.forEach((arg: any) => {
    if (Array.isArray(arg)) {
      arg.forEach((item: any) => {
        const num = typeof item === 'boolean' ? (item ? 1 : 0) : 
                    typeof item === 'string' ? (isNaN(Number(item)) ? 0 : Number(item)) : 
                    typeof item === 'number' ? item : 0;
        sum += num;
      });
    } else {
      const num = typeof arg === 'boolean' ? (arg ? 1 : 0) : 
                  typeof arg === 'string' ? (isNaN(Number(arg)) ? 0 : Number(arg)) : 
                  typeof arg === 'number' ? arg : 0;
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
