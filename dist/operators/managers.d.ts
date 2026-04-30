import { FunctionInfo, IContext } from '../types';
/**
 * 宏管理器
 * 管理宏定义和展开
 */
export declare class MacroManager {
    private macros;
    /**
     * 添加宏定义
     */
    add(name: string, expression: string): void;
    /**
     * 移除宏定义
     */
    remove(name: string): boolean;
    /**
     * 检查宏是否存在
     */
    has(name: string): boolean;
    /**
     * 获取宏表达式
     */
    get(name: string): string | undefined;
    /**
     * 获取所有宏
     */
    getAll(): Map<string, MacroDefinition>;
    /**
     * 清空所有宏
     */
    clear(): void;
}
/**
 * 宏定义
 */
interface MacroDefinition {
    name: string;
    expression: string;
}
/**
 * 自定义函数管理器
 */
export declare class CustomFunctionManager {
    private functions;
    /**
     * 添加自定义函数
     */
    add(name: string, handler: (...args: any[]) => any, description?: string): void;
    /**
     * 移除自定义函数
     */
    remove(name: string): boolean;
    /**
     * 检查函数是否存在
     */
    has(name: string): boolean;
    /**
     * 获取函数
     */
    get(name: string): FunctionDefinition | undefined;
    /**
     * 获取所有函数
     */
    getAll(): Map<string, FunctionDefinition>;
    /**
     * 清空所有函数
     */
    clear(): void;
}
/**
 * 函数定义
 */
interface FunctionDefinition {
    name: string;
    handler: (...args: any[]) => any;
    description?: string;
}
/**
 * 自定义操作符管理器
 */
export declare class CustomOperatorManager {
    private operators;
    private aliases;
    /**
     * 添加自定义操作符
     */
    add(name: string, handler: (args: any[], context: IContext) => any, precedence?: number): void;
    /**
     * 添加操作符别名
     */
    addAlias(alias: string, originalName: string): void;
    /**
     * 移除自定义操作符
     */
    remove(name: string): boolean;
    /**
     * 检查操作符是否存在
     */
    has(name: string): boolean;
    /**
     * 获取操作符
     */
    get(name: string): OperatorDefinition | undefined;
    /**
     * 解析别名
     */
    resolveAlias(name: string): string;
    /**
     * 获取所有操作符
     */
    getAll(): Map<string, OperatorDefinition>;
    /**
     * 获取所有别名
     */
    getAllAliases(): Map<string, string>;
    /**
     * 清空所有操作符
     */
    clear(): void;
}
/**
 * 操作符定义
 */
interface OperatorDefinition {
    name: string;
    handler: (args: any[], context: IContext) => any;
    precedence?: number;
}
/**
 * 外部方法绑定管理器
 */
export declare class ExternalMethodManager {
    private classMethods;
    private instanceMethods;
    /**
     * 绑定类静态方法
     */
    bindClassMethod(functionName: string, className: string, methodName: string, paramTypes?: string[]): void;
    /**
     * 绑定实例方法
     */
    bindInstanceMethod(functionName: string, instance: any, methodName: string, paramTypes?: string[]): void;
    /**
     * 调用静态方法
     */
    callClassMethod(className: string, functionName: string, args: any[]): any;
    /**
     * 调用实例方法
     */
    callInstanceMethod(instanceId: string, functionName: string, args: any[]): any;
    /**
     * 获取所有绑定的类方法
     */
    getAllClassMethods(): Map<string, Map<string, FunctionInfo>>;
    /**
     * 获取所有绑定的实例方法
     */
    getAllInstanceMethods(): Map<string, Map<string, FunctionInfo>>;
    /**
     * 清空所有绑定
     */
    clear(): void;
}
export {};
