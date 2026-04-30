import { IContext } from '../types';

/**
 * 格式化值用于打印
 */
function formatValue(value: any): string {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (Array.isArray(value)) return JSON.stringify(value);
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

/**
 * 内置函数集合
 */
export const builtinFunctions: Record<string, (...args: any[]) => any> = {
  /**
   * 数学函数
   */
  abs: (x: number) => Math.abs(x),
  ceil: (x: number) => Math.ceil(x),
  floor: (x: number) => Math.floor(x),
  round: (x: number) => Math.round(x),
  sqrt: (x: number) => Math.sqrt(x),
  pow: (x: number, y: number) => Math.pow(x, y),
  exp: (x: number) => Math.exp(x),
  log: (x: number) => Math.log(x),
  log10: (x: number) => Math.log10(x),
  log2: (x: number) => Math.log2(x),

  /**
   * 三角函数
   */
  sin: (x: number) => Math.sin(x),
  cos: (x: number) => Math.cos(x),
  tan: (x: number) => Math.tan(x),
  asin: (x: number) => Math.asin(x),
  acos: (x: number) => Math.acos(x),
  atan: (x: number) => Math.atan(x),
  atan2: (y: number, x: number) => Math.atan2(y, x),

  /**
   * 聚合函数
   */
  min: (...args: number[]) => Math.min(...args),
  max: (...args: number[]) => Math.max(...args),
  sum: (...args: number[]) => args.reduce((a, b) => a + b, 0),
  avg: (...args: number[]) => {
    if (args.length === 0) return 0;
    return args.reduce((a, b) => a + b, 0) / args.length;
  },

  /**
   * 类型转换函数
   */
  parseInt: (s: string, radix?: number) => parseInt(s, radix || 10),
  parseFloat: (s: string) => parseFloat(s),
  toString: (value: any) => String(value),
  toNumber: (value: any) => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') return parseFloat(value);
    if (typeof value === 'boolean') return value ? 1 : 0;
    return 0;
  },
  toBoolean: (value: any) => Boolean(value),

  /**
   * 类型检查函数
   */
  isNaN: (value: any) => Number.isNaN(value),
  isFinite: (value: any) => Number.isFinite(value),
  isInteger: (value: any) => Number.isInteger(value),
  isArray: (value: any) => Array.isArray(value),
  isObject: (value: any) => typeof value === 'object' && value !== null && !Array.isArray(value),
  isString: (value: any) => typeof value === 'string',
  isNumber: (value: any) => typeof value === 'number',
  isBoolean: (value: any) => typeof value === 'boolean',
  isFunction: (value: any) => typeof value === 'function',
  isNull: (value: any) => value === null,
  isUndefined: (value: any) => value === undefined,
  isEmpty: (value: any) => {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string') return value.length === 0;
    if (Array.isArray(value)) return value.length === 0;
    if (value instanceof Map || value instanceof Set) return value.size === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
  },

  /**
   * 字符串函数
   */
  strlen: (s: string) => s.length,
  strlenb: (s: string) => {
    // 使用TextEncoder代替Buffer
    try {
      return new TextEncoder().encode(s).length;
    } catch {
      return s.length;
    }
  },
  substr: (s: string, start: number, length?: number) => s.substr(start, length),
  substring: (s: string, start: number, end?: number) => s.substring(start, end),
  indexOf: (s: string, search: string, position?: number) => s.indexOf(search, position),
  lastIndexOf: (s: string, search: string, position?: number) => s.lastIndexOf(search, position),
  replace: (s: string, search: string | RegExp, replace: string) => s.replace(search, replace),
  replaceAll: (s: string, search: string, replace: string) => s.split(search).join(replace),
  trim: (s: string) => s.trim(),
  trimLeft: (s: string) => s.trimStart(),
  trimRight: (s: string) => s.trimEnd(),
  toUpperCase: (s: string) => s.toUpperCase(),
  toLowerCase: (s: string) => s.toLowerCase(),
  capitalize: (s: string) => s.charAt(0).toUpperCase() + s.slice(1),
  split: (s: string, separator: string, limit?: number) => s.split(separator, limit),
  join: (arr: any[], separator: string = ',') => arr.join(separator),
  charAt: (s: string, index: number) => s.charAt(index),
  charCodeAt: (s: string, index: number) => s.charCodeAt(index),
  startsWith: (s: string, search: string, position?: number) => s.startsWith(search, position),
  endsWith: (s: string, search: string, endPosition?: number) => s.endsWith(search, endPosition),
  includes: (s: string, search: string, position?: number) => s.includes(search, position),
  repeat: (s: string, count: number) => s.repeat(count),
  padLeft: (s: string, length: number, char: string = ' ') => s.padStart(length, char),
  padRight: (s: string, length: number, char: string = ' ') => s.padEnd(length, char),
  reverse: (s: string) => s.split('').reverse().join(''),

  /**
   * 数组函数
   */
  size: (arr: any[] | string | Map<any, any> | Set<any>) => {
    if (Array.isArray(arr) || typeof arr === 'string') return arr.length;
    if (arr instanceof Map || arr instanceof Set) return (arr as Map<any, any> | Set<any>).size;
    if (typeof arr === 'object' && arr !== null) return Object.keys(arr).length;
    return 0;
  },
  length: (arr: any[] | string) => arr.length,
  push: (arr: any[], ...items: any[]) => arr.push(...items),
  pop: (arr: any[]) => arr.pop(),
  shift: (arr: any[]) => arr.shift(),
  unshift: (arr: any[], ...items: any[]) => arr.unshift(...items),
  slice: (arr: any[], start: number, end?: number) => arr.slice(start, end),
  concat: (arr: any[], ...items: any[]) => arr.concat(...items),
  reverseArray: (arr: any[]) => [...arr].reverse(),
  sort: (arr: any[], compareFn?: (a: any, b: any) => number) => [...arr].sort(compareFn),
  flatten: (arr: any[], depth: number = 1) => arr.flat(depth),
  unique: (arr: any[]) => [...new Set(arr)],
  first: (arr: any[]) => arr[0],
  last: (arr: any[]) => arr[arr.length - 1],
  range: (start: number, end?: number, step: number = 1) => {
    let actualStart = start;
    let actualEnd = end;
    if (actualEnd === undefined) {
      actualEnd = actualStart;
      actualStart = 0;
    }
    const result = [];
    for (let i = actualStart; step > 0 ? i < actualEnd : i > actualEnd; i += step) {
      result.push(i);
    }
    return result;
  },

  /**
   * 对象函数
   */
  keys: (obj: any) => Object.keys(obj),
  values: (obj: any) => Object.values(obj),
  entries: (obj: any) => Object.entries(obj),
  fromEntries: (entries: [string, any][]) => Object.fromEntries(entries),
  hasKey: (obj: any, key: string) => key in obj,
  getValue: (obj: any, key: string, defaultValue?: any) => {
    const value = obj[key];
    return value !== undefined ? value : defaultValue;
  },
  setValue: (obj: any, key: string, value: any) => {
    obj[key] = value;
    return obj;
  },
  removeKey: (obj: any, key: string) => {
    delete obj[key];
    return obj;
  },
  merge: (...objs: any[]) => Object.assign({}, ...objs),
  deepClone: (obj: any) => JSON.parse(JSON.stringify(obj)),

  /**
   * 条件函数
   */
  iif: <T>(condition: boolean, trueValue: T, falseValue: T) => (condition ? trueValue : falseValue),
  switchCase: (value: any, ...cases: any[]) => {
    for (let i = 0; i < cases.length - 1; i += 2) {
      if (value === cases[i]) return cases[i + 1];
    }
    return cases.length % 2 === 1 ? cases[cases.length - 1] : undefined;
  },
  coalesce: (...values: any[]) => values.find(v => v !== null && v !== undefined),
  defaultIfEmpty: <T>(value: T, defaultValue: T) => {
    if (value === null || value === undefined || value === '') return defaultValue;
    return value;
  },

  /**
   * 日期函数
   */
  now: () => Date.now(),
  date: (timestamp?: number) => (timestamp !== undefined ? new Date(timestamp) : new Date()),
  parseDate: (dateString: string) => new Date(dateString),
  format: (date: Date | number, format: string = 'yyyy-MM-dd HH:mm:ss') => {
    const d = date instanceof Date ? date : new Date(date);
    const pad = (n: number) => n.toString().padStart(2, '0');

    return format
      .replace(/yyyy/g, d.getFullYear().toString())
      .replace(/yy/g, d.getFullYear().toString().slice(-2))
      .replace(/MM/g, pad(d.getMonth() + 1))
      .replace(/M/g, (d.getMonth() + 1).toString())
      .replace(/dd/g, pad(d.getDate()))
      .replace(/d/g, d.getDate().toString())
      .replace(/HH/g, pad(d.getHours()))
      .replace(/H/g, d.getHours().toString())
      .replace(/hh/g, pad(d.getHours() % 12 || 12))
      .replace(/h/g, (d.getHours() % 12 || 12).toString())
      .replace(/mm/g, pad(d.getMinutes()))
      .replace(/m/g, d.getMinutes().toString())
      .replace(/ss/g, pad(d.getSeconds()))
      .replace(/s/g, d.getSeconds().toString())
      .replace(/SSS/g, d.getMilliseconds().toString().padStart(3, '0'));
  },
  year: (date: Date | number) => new Date(date).getFullYear(),
  month: (date: Date | number) => new Date(date).getMonth() + 1,
  day: (date: Date | number) => new Date(date).getDate(),
  hour: (date: Date | number) => new Date(date).getHours(),
  minute: (date: Date | number) => new Date(date).getMinutes(),
  second: (date: Date | number) => new Date(date).getSeconds(),
  dayOfWeek: (date: Date | number) => new Date(date).getDay(),
  addDays: (date: Date | number, days: number) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  },
  addMonths: (date: Date | number, months: number) => {
    const d = new Date(date);
    d.setMonth(d.getMonth() + months);
    return d;
  },
  addYears: (date: Date | number, years: number) => {
    const d = new Date(date);
    d.setFullYear(d.getFullYear() + years);
    return d;
  },
  daysBetween: (date1: Date | number, date2: Date | number) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  },

  /**
   * 正则函数
   */
  regex: (pattern: string, flags?: string) => new RegExp(pattern, flags),
  test: (pattern: string | RegExp, text: string) => {
    const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
    return regex.test(text);
  },
  match: (pattern: string | RegExp, text: string) => {
    const regex =
      typeof pattern === 'string'
        ? new RegExp(pattern, 'g')
        : new RegExp(pattern.source, pattern.flags + 'g');
    return text.match(regex) || [];
  },
  matchAll: (pattern: string | RegExp, text: string) => {
    const regex =
      typeof pattern === 'string'
        ? new RegExp(pattern, 'g')
        : new RegExp(
            pattern.source,
            pattern.flags.includes('g') ? pattern.flags : pattern.flags + 'g',
          );
    return [...text.matchAll(regex)];
  },

  /**
   * JSON函数
   */
  json: (value: any, replacer?: any, space?: string | number) =>
    JSON.stringify(value, replacer, space),
  parseJson: (text: string) => JSON.parse(text),

  /**
   * 随机函数
   */
  random: () => Math.random(),
  randomInt: (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min,
  randomFloat: (min: number, max: number) => Math.random() * (max - min) + min,
  randomPick: <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)],
  shuffle: <T>(arr: T[]) => {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  },
  uuid: () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  },

  /**
   * 打印函数
   */
  print: (...args: any[]) => {
    console.log(...args.map(arg => formatValue(arg)));
    return args.length === 1 ? args[0] : args;
  },
  println: (...args: any[]) => {
    console.log(...args.map(arg => formatValue(arg)));
    return args.length === 1 ? args[0] : args;
  },
  printf: (format: string, ...args: any[]) => {
    console.log(format.replace(/%[sdifjo]/g, () => formatValue(args.shift())));
    return undefined;
  },

  /**
   * 集合操作
   */
  NewMap: (...entries: [any, any][]) => new Map(entries),
  NewSet: (...values: any[]) => new Set(values),
  NewList: (...items: any[]) => [...items],
  NewArray: (...items: any[]) => [...items],

  /**
   * 高阶函数
   */
  map: (arr: any[], fn: (item: any, index: number) => any) => arr.map(fn),
  filter: (arr: any[], fn: (item: any, index: number) => boolean) => arr.filter(fn),
  reduce: (arr: any[], fn: (acc: any, item: any, index: number) => any, initialValue?: any) =>
    initialValue !== undefined ? arr.reduce(fn, initialValue) : arr.reduce(fn),
  find: (arr: any[], fn: (item: any, index: number) => boolean) => arr.find(fn),
  findIndex: (arr: any[], fn: (item: any, index: number) => boolean) => arr.findIndex(fn),
  every: (arr: any[], fn: (item: any, index: number) => boolean) => arr.every(fn),
  some: (arr: any[], fn: (item: any, index: number) => boolean) => arr.some(fn),
  forEach: (arr: any[], fn: (item: any, index: number) => void) => {
    arr.forEach(fn);
    return arr;
  },
  sortArray: (arr: any[], compareFn?: (a: any, b: any) => number) => [...arr].sort(compareFn),
  groupBy: <T>(arr: T[], keyFn: (item: T) => string) => {
    return arr.reduce((groups, item) => {
      const key = keyFn(item);
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
      return groups;
    }, {} as Record<string, T[]>);
  },
  countBy: <T>(arr: T[], keyFn: (item: T) => string) => {
    return arr.reduce((counts, item) => {
      const key = keyFn(item);
      counts[key] = (counts[key] || 0) + 1;
      return counts;
    }, {} as Record<string, number>);
  },
  distinctBy: <T>(arr: T[], keyFn: (item: T) => any) => {
    const seen = new Set();
    return arr.filter(item => {
      const key = keyFn(item);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  },
};

/**
 * 操作符定义
 */
export const builtinOperators: Record<string, (args: any[], context: IContext) => any> = {
  // 自定义操作符可以通过 addOperator 方法添加
  // 这里预留一些常用操作符的扩展位置
};

/**
 * 注册自定义操作符
 */
export function registerOperator(
  operators: Map<string, (args: any[], context: IContext) => any>,
  name: string,
  handler: (args: any[], context: IContext) => any,
): void {
  operators.set(name, handler);
}
