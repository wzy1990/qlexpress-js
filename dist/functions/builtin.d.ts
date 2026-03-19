import { IContext } from '../types';
/**
 * 内置函数集合
 */
export declare const builtinFunctions: Record<string, (...args: any[]) => any>;
/**
 * 操作符定义
 */
export declare const builtinOperators: Record<string, (args: any[], context: IContext) => any>;
/**
 * 注册自定义操作符
 */
export declare function registerOperator(operators: Map<string, (args: any[], context: IContext) => any>, name: string, handler: (args: any[], context: IContext) => any): void;
