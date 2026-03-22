import { IContext } from '../types';
/**
 * 作用域类
 * 实现变量存储和作用域链
 */
export declare class Scope implements IContext {
    private variables;
    private parent;
    constructor(parent?: Scope | null);
    /**
     * 获取变量值
     */
    get(name: string): any;
    /**
     * 设置变量值（向上查找已存在的变量）
     */
    set(name: string, value: any): void;
    /**
     * 在当前作用域定义变量
     */
    define(name: string, value: any): void;
    /**
     * 检查变量是否存在
     */
    has(name: string): boolean;
    /**
     * 删除变量（仅当前作用域）
     */
    delete(name: string): boolean;
    /**
     * 清空当前作用域变量
     */
    clear(): void;
    /**
     * 获取所有变量名
     */
    keys(): string[];
    private collectKeys;
    /**
     * 转换为普通对象
     */
    toObject(): Record<string, any>;
    private collectToObject;
    /**
     * 获取父作用域
     */
    getParent(): Scope | null;
    /**
     * 创建子作用域
     */
    createChild(): Scope;
    /**
     * 克隆当前作用域（用于闭包）
     */
    clone(): Scope;
    /**
     * 合并另一个作用域的变量到当前作用域
     */
    merge(other: Scope): void;
}
/**
 * 运行时上下文
 * 提供全局作用域和内置对象
 */
export declare class RuntimeContext implements IContext {
    private globalScope;
    private currentScope;
    constructor(initialVars?: Record<string, any>);
    /**
     * 进入新作用域
     */
    enterScope(): Scope;
    /**
     * 退出当前作用域
     */
    exitScope(): void;
    /**
     * 获取当前作用域
     */
    getCurrentScope(): Scope;
    /**
     * 获取全局作用域
     */
    getGlobalScope(): Scope;
    get(name: string): any;
    set(name: string, value: any): void;
    define(name: string, value: any): void;
    has(name: string): boolean;
    delete(name: string): boolean;
    clear(): void;
    keys(): string[];
    toObject(): Record<string, any>;
}
/**
 * 内置对象
 */
export declare class BuiltinObjects {
    /**
     * Math对象
     */
    static Math: {
        abs: (x: number) => number;
        ceil: (x: number) => number;
        floor: (x: number) => number;
        round: (x: number) => number;
        sqrt: (x: number) => number;
        pow: (x: number, y: number) => number;
        log: (x: number) => number;
        log10: (x: number) => number;
        log2: (x: number) => number;
        exp: (x: number) => number;
        sin: (x: number) => number;
        cos: (x: number) => number;
        tan: (x: number) => number;
        asin: (x: number) => number;
        acos: (x: number) => number;
        atan: (x: number) => number;
        atan2: (y: number, x: number) => number;
        max: (...values: number[]) => number;
        min: (...values: number[]) => number;
        random: () => number;
        PI: number;
        E: number;
        LN2: number;
        LN10: number;
        LOG2E: number;
        LOG10E: number;
        SQRT2: number;
        SQRT1_2: number;
    };
    /**
     * JSON对象
     */
    static JSON: {
        parse: (text: string, reviver?: (this: any, key: string, value: any) => any) => any;
        stringify: {
            (value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string;
            (value: any, replacer?: (number | string)[] | null, space?: string | number): string;
        };
    };
    /**
     * Array对象
     */
    static Array: ArrayConstructor;
    /**
     * Object对象
     */
    static Object: {
        keys: {
            (o: object): string[];
            (o: {}): string[];
        };
        values: {
            <T>(o: {
                [s: string]: T;
            } | ArrayLike<T>): T[];
            (o: {}): any[];
        };
        entries: {
            <T>(o: {
                [s: string]: T;
            } | ArrayLike<T>): [string, T][];
            (o: {}): [string, any][];
        };
        assign: {
            <T extends {}, U>(target: T, source: U): T & U;
            <T extends {}, U, V>(target: T, source1: U, source2: V): T & U & V;
            <T extends {}, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;
            (target: object, ...sources: any[]): any;
        };
        create: {
            (o: object | null): any;
            (o: object | null, properties: PropertyDescriptorMap & ThisType<any>): any;
        };
        freeze: {
            <T extends Function>(f: T): T;
            <T extends {
                [idx: string]: U | null | undefined | object;
            }, U extends string | bigint | number | boolean | symbol>(o: T): Readonly<T>;
            <T>(o: T): Readonly<T>;
        };
        fromEntries: {
            <T = any>(entries: Iterable<readonly [PropertyKey, T]>): {
                [k: string]: T;
            };
            (entries: Iterable<readonly any[]>): any;
        };
    };
    /**
     * String对象
     */
    static String: {
        fromCharCode: (...codes: number[]) => string;
        fromCodePoint: (...codePoints: number[]) => string;
    };
    /**
     * Number对象
     */
    static Number: {
        isNaN: (number: unknown) => boolean;
        isFinite: (number: unknown) => boolean;
        isInteger: (number: unknown) => boolean;
        parseFloat: (string: string) => number;
        parseInt: (string: string, radix?: number) => number;
        MAX_VALUE: number;
        MIN_VALUE: number;
        POSITIVE_INFINITY: number;
        NEGATIVE_INFINITY: number;
    };
    /**
     * Date对象
     */
    static Date: DateConstructor;
    /**
     * Boolean对象
     */
    static Boolean: BooleanConstructor;
    /**
     * RegExp对象
     */
    static RegExp: RegExpConstructor;
    /**
     * Error对象
     */
    static Error: ErrorConstructor;
    /**
     * Map对象
     */
    static Map: MapConstructor;
    /**
     * Set对象
     */
    static Set: SetConstructor;
    /**
     * Promise对象
     */
    static Promise: PromiseConstructor;
    /**
     * 获取所有内置对象
     */
    static getAll(): Record<string, any>;
}
