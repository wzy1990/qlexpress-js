import { IContext, RuntimeError } from '../types';

/**
 * 作用域类
 * 实现变量存储和作用域链
 */
export class Scope implements IContext {
  private variables: Map<string, any> = new Map();
  private parent: Scope | null;

  constructor(parent: Scope | null = null) {
    this.parent = parent;
  }

  /**
   * 获取变量值
   */
  get(name: string): any {
    if (this.variables.has(name)) {
      return this.variables.get(name);
    }
    if (this.parent) {
      return this.parent.get(name);
    }
    return undefined;
  }

  /**
   * 设置变量值（向上查找已存在的变量）
   */
  set(name: string, value: any): void {
    if (this.variables.has(name)) {
      this.variables.set(name, value);
      return;
    }
    if (this.parent && this.parent.has(name)) {
      this.parent.set(name, value);
      return;
    }
    // 如果变量不存在，在当前作用域创建
    this.variables.set(name, value);
  }

  /**
   * 在当前作用域定义变量
   */
  define(name: string, value: any): void {
    this.variables.set(name, value);
  }

  /**
   * 检查变量是否存在
   */
  has(name: string): boolean {
    if (this.variables.has(name)) {
      return true;
    }
    if (this.parent) {
      return this.parent.has(name);
    }
    return false;
  }

  /**
   * 删除变量（仅当前作用域）
   */
  delete(name: string): boolean {
    return this.variables.delete(name);
  }

  /**
   * 清空当前作用域变量
   */
  clear(): void {
    this.variables.clear();
  }

  /**
   * 获取所有变量名
   */
  keys(): string[] {
    const keys = new Set<string>();
    this.collectKeys(keys);
    return Array.from(keys);
  }

  private collectKeys(keys: Set<string>): void {
    this.variables.forEach((_, key) => keys.add(key));
    if (this.parent) {
      this.parent.collectKeys(keys);
    }
  }

  /**
   * 转换为普通对象
   */
  toObject(): Record<string, any> {
    const result: Record<string, any> = {};
    this.collectToObject(result);
    return result;
  }

  private collectToObject(result: Record<string, any>): void {
    if (this.parent) {
      this.parent.collectToObject(result);
    }
    this.variables.forEach((value, key) => {
      result[key] = value;
    });
  }

  /**
   * 获取父作用域
   */
  getParent(): Scope | null {
    return this.parent;
  }

  /**
   * 创建子作用域
   */
  createChild(): Scope {
    return new Scope(this);
  }
}

/**
 * 运行时上下文
 * 提供全局作用域和内置对象
 */
export class RuntimeContext implements IContext {
  private globalScope: Scope;
  private currentScope: Scope;

  constructor(initialVars: Record<string, any> = {}) {
    this.globalScope = new Scope();
    this.currentScope = this.globalScope;

    // 初始化变量
    for (const [key, value] of Object.entries(initialVars)) {
      this.globalScope.define(key, value);
    }
  }

  /**
   * 进入新作用域
   */
  enterScope(): Scope {
    this.currentScope = this.currentScope.createChild();
    return this.currentScope;
  }

  /**
   * 退出当前作用域
   */
  exitScope(): void {
    const parent = this.currentScope.getParent();
    if (parent) {
      this.currentScope = parent;
    }
  }

  /**
   * 获取当前作用域
   */
  getCurrentScope(): Scope {
    return this.currentScope;
  }

  /**
   * 获取全局作用域
   */
  getGlobalScope(): Scope {
    return this.globalScope;
  }

  // IContext 接口实现

  get(name: string): any {
    return this.currentScope.get(name);
  }

  set(name: string, value: any): void {
    this.currentScope.set(name, value);
  }

  define(name: string, value: any): void {
    this.currentScope.define(name, value);
  }

  has(name: string): boolean {
    return this.currentScope.has(name);
  }

  delete(name: string): boolean {
    return this.currentScope.delete(name);
  }

  clear(): void {
    this.currentScope.clear();
  }

  keys(): string[] {
    return this.currentScope.keys();
  }

  toObject(): Record<string, any> {
    return this.currentScope.toObject();
  }
}

/**
 * 内置对象
 */
export class BuiltinObjects {
  /**
   * Math对象
   */
  static Math = {
    abs: Math.abs,
    ceil: Math.ceil,
    floor: Math.floor,
    round: Math.round,
    sqrt: Math.sqrt,
    pow: Math.pow,
    log: Math.log,
    log10: Math.log10,
    log2: Math.log2,
    exp: Math.exp,
    sin: Math.sin,
    cos: Math.cos,
    tan: Math.tan,
    asin: Math.asin,
    acos: Math.acos,
    atan: Math.atan,
    atan2: Math.atan2,
    max: Math.max,
    min: Math.min,
    random: Math.random,
    PI: Math.PI,
    E: Math.E,
    LN2: Math.LN2,
    LN10: Math.LN10,
    LOG2E: Math.LOG2E,
    LOG10E: Math.LOG10E,
    SQRT2: Math.SQRT2,
    SQRT1_2: Math.SQRT1_2
  };

  /**
   * JSON对象
   */
  static JSON = {
    parse: JSON.parse,
    stringify: JSON.stringify
  };

  /**
   * Array对象
   */
  static Array = Array;

  /**
   * Object对象
   */
  static Object = {
    keys: Object.keys,
    values: Object.values,
    entries: Object.entries,
    assign: Object.assign,
    create: Object.create,
    freeze: Object.freeze,
    fromEntries: Object.fromEntries
  };

  /**
   * String对象
   */
  static String = {
    fromCharCode: String.fromCharCode,
    fromCodePoint: String.fromCodePoint
  };

  /**
   * Number对象
   */
  static Number = {
    isNaN: Number.isNaN,
    isFinite: Number.isFinite,
    isInteger: Number.isInteger,
    parseFloat: Number.parseFloat,
    parseInt: Number.parseInt,
    MAX_VALUE: Number.MAX_VALUE,
    MIN_VALUE: Number.MIN_VALUE,
    POSITIVE_INFINITY: Number.POSITIVE_INFINITY,
    NEGATIVE_INFINITY: Number.NEGATIVE_INFINITY
  };

  /**
   * Date对象
   */
  static Date = Date;

  /**
   * Boolean对象
   */
  static Boolean = Boolean;

  /**
   * RegExp对象
   */
  static RegExp = RegExp;

  /**
   * Error对象
   */
  static Error = Error;

  /**
   * Map对象
   */
  static Map = Map;

  /**
   * Set对象
   */
  static Set = Set;

  /**
   * Promise对象
   */
  static Promise = Promise;

  /**
   * 获取所有内置对象
   */
  static getAll(): Record<string, any> {
    return {
      Math: BuiltinObjects.Math,
      JSON: BuiltinObjects.JSON,
      Array: BuiltinObjects.Array,
      Object: BuiltinObjects.Object,
      String: BuiltinObjects.String,
      Number: BuiltinObjects.Number,
      Date: BuiltinObjects.Date,
      Boolean: BuiltinObjects.Boolean,
      RegExp: BuiltinObjects.RegExp,
      Error: BuiltinObjects.Error,
      Map: BuiltinObjects.Map,
      Set: BuiltinObjects.Set,
      Promise: BuiltinObjects.Promise
    };
  }
}
