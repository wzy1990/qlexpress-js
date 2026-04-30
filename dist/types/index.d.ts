export * from './token';
export * from './ast';
/**
 * 运行时上下文接口
 */
export interface IContext {
    get(name: string): any;
    set(name: string, value: any): void;
    has(name: string): boolean;
    delete(name: string): boolean;
    clear(): void;
    keys(): string[];
    toObject(): Record<string, any>;
}
/**
 * 自定义操作符接口
 */
export interface IOperator {
    name: string;
    execute(args: any[], context: IContext): any;
}
/**
 * 自定义函数接口
 */
export interface IFunction {
    name: string;
    execute(args: any[], context: IContext): any;
}
/**
 * 方法信息接口
 */
export interface FunctionInfo {
    className?: string;
    instance?: any;
    methodName: string;
    paramTypes?: string[];
    type: 'static' | 'instance';
}
/**
 * 安全配置
 */
export interface SecurityConfig {
    /** 是否启用沙箱模式 */
    sandbox: boolean;
    /** 执行超时时间（毫秒），0表示不限制 */
    timeout: number;
    /** 最大循环次数 */
    maxLoopCount: number;
    /** 最大数组长度 */
    maxArrayLength: number;
    /** 是否禁止调用危险方法 */
    forbidRiskMethods: boolean;
    /** 危险方法黑名单 */
    riskMethodBlacklist: string[];
    /** 允许调用的方法白名单 */
    allowedMethods: string[] | null;
}
/**
 * 运行时配置
 */
export interface RuntimeConfig {
    /** 是否使用高精度计算 */
    precise: boolean;
    /** 是否使用短路求值 */
    shortCircuit: boolean;
    /** 是否追踪执行过程 */
    trace: boolean;
    /** 安全配置 */
    security: SecurityConfig;
}
/**
 * 运行结果
 */
export interface ExecutionResult {
    value: any;
    variables: Record<string, any>;
    trace?: ExecutionTrace[];
}
/**
 * 执行追踪记录
 */
export interface ExecutionTrace {
    node: string;
    action: string;
    result?: any;
    line?: number;
    column?: number;
}
/**
 * 编译缓存项
 */
export interface CachedInstruction {
    expression: string;
    compiled: any;
    timestamp: number;
}
/**
 * 操作符定义
 */
export interface OperatorDefinition {
    name: string;
    alias?: string;
    handler: (args: any[], context: IContext) => any;
    precedence?: number;
    associativity?: 'left' | 'right';
}
/**
 * 函数定义
 */
export interface FunctionDefinition {
    name: string;
    handler: (...args: any[]) => any;
    description?: string;
}
/**
 * 宏定义
 */
export interface MacroDefinition {
    name: string;
    expression: string;
}
/**
 * 执行选项
 */
export interface ExecuteOptions {
    /** 是否使用缓存 */
    cache?: boolean;
    /** 是否追踪执行 */
    trace?: boolean;
    /** 超时时间 */
    timeout?: number;
    /** 安全配置 */
    security?: Partial<SecurityConfig>;
}
/**
 * 返回值包装器
 */
export declare class ReturnValue {
    value: any;
    constructor(value: any);
}
/**
 * 控制流异常基类
 */
export declare class ControlFlow extends Error {
    constructor(message: string);
}
/**
 * Break异常
 */
export declare class BreakException extends ControlFlow {
    constructor();
}
/**
 * Continue异常
 */
export declare class ContinueException extends ControlFlow {
    constructor();
}
/**
 * Return异常
 */
export declare class ReturnException extends ControlFlow {
    value: any;
    constructor(value: any);
}
