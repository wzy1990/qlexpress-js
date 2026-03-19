"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.builtinOperators = exports.builtinFunctions = void 0;
exports.registerOperator = registerOperator;
/**
 * 内置函数集合
 */
exports.builtinFunctions = {
    /**
     * 数学函数
     */
    abs: (x) => Math.abs(x),
    ceil: (x) => Math.ceil(x),
    floor: (x) => Math.floor(x),
    round: (x) => Math.round(x),
    sqrt: (x) => Math.sqrt(x),
    pow: (x, y) => Math.pow(x, y),
    exp: (x) => Math.exp(x),
    log: (x) => Math.log(x),
    log10: (x) => Math.log10(x),
    log2: (x) => Math.log2(x),
    /**
     * 三角函数
     */
    sin: (x) => Math.sin(x),
    cos: (x) => Math.cos(x),
    tan: (x) => Math.tan(x),
    asin: (x) => Math.asin(x),
    acos: (x) => Math.acos(x),
    atan: (x) => Math.atan(x),
    atan2: (y, x) => Math.atan2(y, x),
    /**
     * 聚合函数
     */
    min: (...args) => Math.min(...args),
    max: (...args) => Math.max(...args),
    sum: (...args) => args.reduce((a, b) => a + b, 0),
    avg: (...args) => {
        if (args.length === 0)
            return 0;
        return args.reduce((a, b) => a + b, 0) / args.length;
    },
    /**
     * 类型转换函数
     */
    parseInt: (s, radix) => parseInt(s, radix || 10),
    parseFloat: (s) => parseFloat(s),
    toString: (value) => String(value),
    toNumber: (value) => {
        if (typeof value === 'number')
            return value;
        if (typeof value === 'string')
            return parseFloat(value);
        if (typeof value === 'boolean')
            return value ? 1 : 0;
        return 0;
    },
    toBoolean: (value) => Boolean(value),
    /**
     * 类型检查函数
     */
    isNaN: (value) => Number.isNaN(value),
    isFinite: (value) => Number.isFinite(value),
    isInteger: (value) => Number.isInteger(value),
    isArray: (value) => Array.isArray(value),
    isObject: (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
    isString: (value) => typeof value === 'string',
    isNumber: (value) => typeof value === 'number',
    isBoolean: (value) => typeof value === 'boolean',
    isFunction: (value) => typeof value === 'function',
    isNull: (value) => value === null,
    isUndefined: (value) => value === undefined,
    isEmpty: (value) => {
        if (value == null)
            return true;
        if (typeof value === 'string')
            return value.length === 0;
        if (Array.isArray(value))
            return value.length === 0;
        if (value instanceof Map || value instanceof Set)
            return value.size === 0;
        if (typeof value === 'object')
            return Object.keys(value).length === 0;
        return false;
    },
    /**
     * 字符串函数
     */
    strlen: (s) => s.length,
    strlenb: (s) => {
        // 使用TextEncoder代替Buffer
        try {
            return new TextEncoder().encode(s).length;
        }
        catch {
            return s.length;
        }
    },
    substr: (s, start, length) => s.substr(start, length),
    substring: (s, start, end) => s.substring(start, end),
    indexOf: (s, search, position) => s.indexOf(search, position),
    lastIndexOf: (s, search, position) => s.lastIndexOf(search, position),
    replace: (s, search, replace) => s.replace(search, replace),
    replaceAll: (s, search, replace) => s.split(search).join(replace),
    trim: (s) => s.trim(),
    trimLeft: (s) => s.trimStart(),
    trimRight: (s) => s.trimEnd(),
    toUpperCase: (s) => s.toUpperCase(),
    toLowerCase: (s) => s.toLowerCase(),
    capitalize: (s) => s.charAt(0).toUpperCase() + s.slice(1),
    split: (s, separator, limit) => s.split(separator, limit),
    join: (arr, separator = ',') => arr.join(separator),
    charAt: (s, index) => s.charAt(index),
    charCodeAt: (s, index) => s.charCodeAt(index),
    startsWith: (s, search, position) => s.startsWith(search, position),
    endsWith: (s, search, endPosition) => s.endsWith(search, endPosition),
    includes: (s, search, position) => s.includes(search, position),
    repeat: (s, count) => s.repeat(count),
    padLeft: (s, length, char = ' ') => s.padStart(length, char),
    padRight: (s, length, char = ' ') => s.padEnd(length, char),
    reverse: (s) => s.split('').reverse().join(''),
    /**
     * 数组函数
     */
    size: (arr) => {
        if (Array.isArray(arr) || typeof arr === 'string')
            return arr.length;
        if (arr instanceof Map || arr instanceof Set)
            return arr.size;
        if (typeof arr === 'object' && arr !== null)
            return Object.keys(arr).length;
        return 0;
    },
    length: (arr) => arr.length,
    push: (arr, ...items) => arr.push(...items),
    pop: (arr) => arr.pop(),
    shift: (arr) => arr.shift(),
    unshift: (arr, ...items) => arr.unshift(...items),
    slice: (arr, start, end) => arr.slice(start, end),
    concat: (arr, ...items) => arr.concat(...items),
    reverseArray: (arr) => [...arr].reverse(),
    sort: (arr, compareFn) => [...arr].sort(compareFn),
    flatten: (arr, depth = 1) => arr.flat(depth),
    unique: (arr) => [...new Set(arr)],
    first: (arr) => arr[0],
    last: (arr) => arr[arr.length - 1],
    range: (start, end, step = 1) => {
        if (end === undefined) {
            end = start;
            start = 0;
        }
        const result = [];
        for (let i = start; step > 0 ? i < end : i > end; i += step) {
            result.push(i);
        }
        return result;
    },
    /**
     * 对象函数
     */
    keys: (obj) => Object.keys(obj),
    values: (obj) => Object.values(obj),
    entries: (obj) => Object.entries(obj),
    fromEntries: (entries) => Object.fromEntries(entries),
    hasKey: (obj, key) => key in obj,
    getValue: (obj, key, defaultValue) => {
        const value = obj[key];
        return value !== undefined ? value : defaultValue;
    },
    setValue: (obj, key, value) => {
        obj[key] = value;
        return obj;
    },
    removeKey: (obj, key) => {
        delete obj[key];
        return obj;
    },
    merge: (...objs) => Object.assign({}, ...objs),
    deepClone: (obj) => JSON.parse(JSON.stringify(obj)),
    /**
     * 条件函数
     */
    iif: (condition, trueValue, falseValue) => condition ? trueValue : falseValue,
    switchCase: (value, ...cases) => {
        for (let i = 0; i < cases.length - 1; i += 2) {
            if (value === cases[i])
                return cases[i + 1];
        }
        return cases.length % 2 === 1 ? cases[cases.length - 1] : undefined;
    },
    coalesce: (...values) => values.find(v => v !== null && v !== undefined),
    defaultIfEmpty: (value, defaultValue) => {
        if (value === null || value === undefined || value === '')
            return defaultValue;
        return value;
    },
    /**
     * 日期函数
     */
    now: () => Date.now(),
    date: (timestamp) => new Date(timestamp),
    parseDate: (dateString) => new Date(dateString),
    format: (date, format = 'yyyy-MM-dd HH:mm:ss') => {
        const d = date instanceof Date ? date : new Date(date);
        const pad = (n) => n.toString().padStart(2, '0');
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
    year: (date) => new Date(date).getFullYear(),
    month: (date) => new Date(date).getMonth() + 1,
    day: (date) => new Date(date).getDate(),
    hour: (date) => new Date(date).getHours(),
    minute: (date) => new Date(date).getMinutes(),
    second: (date) => new Date(date).getSeconds(),
    dayOfWeek: (date) => new Date(date).getDay(),
    addDays: (date, days) => {
        const d = new Date(date);
        d.setDate(d.getDate() + days);
        return d;
    },
    addMonths: (date, months) => {
        const d = new Date(date);
        d.setMonth(d.getMonth() + months);
        return d;
    },
    addYears: (date, years) => {
        const d = new Date(date);
        d.setFullYear(d.getFullYear() + years);
        return d;
    },
    daysBetween: (date1, date2) => {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        const diffTime = Math.abs(d2.getTime() - d1.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    },
    /**
     * 正则函数
     */
    regex: (pattern, flags) => new RegExp(pattern, flags),
    test: (pattern, text) => {
        const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
        return regex.test(text);
    },
    match: (pattern, text) => {
        const regex = typeof pattern === 'string' ? new RegExp(pattern, 'g') : new RegExp(pattern.source, pattern.flags + 'g');
        return text.match(regex) || [];
    },
    matchAll: (pattern, text) => {
        const regex = typeof pattern === 'string' ? new RegExp(pattern, 'g') : new RegExp(pattern.source, pattern.flags.includes('g') ? pattern.flags : pattern.flags + 'g');
        return [...text.matchAll(regex)];
    },
    /**
     * JSON函数
     */
    json: (value, replacer, space) => JSON.stringify(value, replacer, space),
    parseJson: (text) => JSON.parse(text),
    /**
     * 随机函数
     */
    random: () => Math.random(),
    randomInt: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
    randomFloat: (min, max) => Math.random() * (max - min) + min,
    randomPick: (arr) => arr[Math.floor(Math.random() * arr.length)],
    shuffle: (arr) => {
        const result = [...arr];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    },
    uuid: () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    /**
     * 打印函数
     */
    print: (...args) => {
        console.log(...args.map(arg => formatValue(arg)));
        return args.length === 1 ? args[0] : args;
    },
    println: (...args) => {
        console.log(...args.map(arg => formatValue(arg)));
        return args.length === 1 ? args[0] : args;
    },
    printf: (format, ...args) => {
        console.log(format.replace(/%[sdifjo]/g, () => formatValue(args.shift())));
        return undefined;
    },
    /**
     * 集合操作
     */
    NewMap: (...entries) => new Map(entries),
    NewSet: (...values) => new Set(values),
    NewList: (...items) => [...items],
    NewArray: (...items) => [...items],
    /**
     * 高阶函数
     */
    map: (arr, fn) => arr.map(fn),
    filter: (arr, fn) => arr.filter(fn),
    reduce: (arr, fn, initialValue) => initialValue !== undefined ? arr.reduce(fn, initialValue) : arr.reduce(fn),
    find: (arr, fn) => arr.find(fn),
    findIndex: (arr, fn) => arr.findIndex(fn),
    every: (arr, fn) => arr.every(fn),
    some: (arr, fn) => arr.some(fn),
    forEach: (arr, fn) => {
        arr.forEach(fn);
        return arr;
    },
    sortArray: (arr, compareFn) => [...arr].sort(compareFn),
    groupBy: (arr, keyFn) => {
        return arr.reduce((groups, item) => {
            const key = keyFn(item);
            if (!groups[key])
                groups[key] = [];
            groups[key].push(item);
            return groups;
        }, {});
    },
    countBy: (arr, keyFn) => {
        return arr.reduce((counts, item) => {
            const key = keyFn(item);
            counts[key] = (counts[key] || 0) + 1;
            return counts;
        }, {});
    },
    distinctBy: (arr, keyFn) => {
        const seen = new Set();
        return arr.filter(item => {
            const key = keyFn(item);
            if (seen.has(key))
                return false;
            seen.add(key);
            return true;
        });
    }
};
/**
 * 格式化值用于打印
 */
function formatValue(value) {
    if (value === null)
        return 'null';
    if (value === undefined)
        return 'undefined';
    if (typeof value === 'string')
        return value;
    if (typeof value === 'number' || typeof value === 'boolean')
        return String(value);
    if (Array.isArray(value))
        return JSON.stringify(value);
    if (typeof value === 'object')
        return JSON.stringify(value);
    return String(value);
}
/**
 * 操作符定义
 */
exports.builtinOperators = {
// 自定义操作符可以通过 addOperator 方法添加
// 这里预留一些常用操作符的扩展位置
};
/**
 * 注册自定义操作符
 */
function registerOperator(operators, name, handler) {
    operators.set(name, handler);
}
