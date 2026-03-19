import { IContext, ExecutionResult, RuntimeConfig, SecurityConfig } from './types';
/**
 * QLExpress-JS 表达式引擎
 * 类似阿里巴巴QLExpress的JavaScript实现
 */
export declare class ExpressRunner {
    private config;
    private securityManager;
    private macroManager;
    private functionManager;
    private operatorManager;
    private instructionCache;
    private operatorAliases;
    /**
     * 创建表达式引擎实例
     */
    constructor(options?: Partial<RuntimeConfig>);
    /**
     * 初始化内置操作符别名
     */
    private initBuiltinAliases;
    /**
     * 执行表达式
     */
    execute(expression: string, context?: IContext | Record<string, any>, options?: {
        isCache?: boolean;
        isTrace?: boolean;
        timeout?: number;
    }): ExecutionResult;
    /**
     * 创建运行时上下文
     */
    private createRuntimeContext;
    /**
     * 注册自定义函数
     */
    private registerCustomFunctions;
    /**
     * 注册自定义操作符
     */
    private registerCustomOperators;
    /**
     * 展开宏
     */
    private expandMacros;
    /**
     * 获取宏表达式映射
     */
    private getMacroExpressions;
    /**
     * 添加自定义函数
     */
    addFunction(name: string, handler: (...args: any[]) => any): void;
    /**
     * 移除自定义函数
     */
    removeFunction(name: string): boolean;
    /**
     * 检查函数是否存在
     */
    hasFunction(name: string): boolean;
    /**
     * 绑定类静态方法
     * 类似QLExpress的addFunctionOfClassMethod
     */
    addFunctionOfClassMethod(functionName: string, className: string, methodName: string, paramTypes?: string[]): void;
    /**
     * 绑定对象实例方法
     * 类似QLExpress的addFunctionOfServiceMethod
     */
    addFunctionOfServiceMethod<T extends object>(functionName: string, service: T, methodName: keyof T, paramTypes?: string[]): void;
    /**
     * 同时支持 a.fun(b) 和 fun(a, b) 两种调用方式
     */
    addFunctionAndClassMethod(functionName: string, className: string, methodName: string): void;
    /**
     * 添加自定义操作符
     */
    addOperator(name: string, handler: (args: any[], context: IContext) => any): void;
    /**
     * 替换操作符处理
     */
    replaceOperator(name: string, handler: (args: any[], context: IContext) => any): void;
    /**
     * 添加操作符别名
     */
    addOperatorWithAlias(alias: string, originalName: string, errorInfo?: string | null): void;
    /**
     * 检查操作符是否存在
     */
    hasOperator(name: string): boolean;
    /**
     * 添加宏定义
     */
    addMacro(name: string, expression: string): void;
    /**
     * 移除宏定义
     */
    removeMacro(name: string): boolean;
    /**
     * 检查宏是否存在
     */
    hasMacro(name: string): boolean;
    /**
     * 获取宏表达式
     */
    getMacro(name: string): string | undefined;
    /**
     * 获取表达式需要的外部变量名称列表
     */
    getOutVarNames(expression: string): string[];
    /**
     * 递归收集变量名
     */
    private collectVarNames;
    /**
     * 获取表达式需要的函数名称列表
     */
    getOutFunctionNames(expression: string): string[];
    /**
     * 递归收集函数名
     */
    private collectFunctionNames;
    /**
     * 语法校验
     */
    validate(expression: string): {
        valid: boolean;
        error?: string;
    };
    /**
     * 从缓存获取指令集
     */
    getInstructionSetFromLocalCache(expression: string): any;
    /**
     * 清除缓存
     */
    clearExpressCache(): void;
    /**
     * 获取缓存大小
     */
    getCacheSize(): number;
    /**
     * 设置沙箱模式
     */
    setSandboxMode(enabled: boolean): void;
    /**
     * 设置执行超时时间
     */
    setTimeout(timeout: number): void;
    /**
     * 设置最大循环次数
     */
    setMaxLoopCount(count: number): void;
    /**
     * 设置最大数组长度
     */
    setMaxArrayLength(length: number): void;
    /**
     * 添加危险方法到黑名单
     */
    addSecurityRiskMethod(className: string, methodName: string): void;
    /**
     * 添加安全方法到白名单
     */
    addSecureMethod(className: string, methodName: string): void;
    /**
     * 获取安全配置
     */
    getSecurityConfig(): SecurityConfig;
    /**
     * 设置是否使用高精度计算
     */
    setPrecise(precise: boolean): void;
    /**
     * 设置是否使用短路求值
     */
    setShortCircuit(shortCircuit: boolean): void;
    /**
     * 设置是否追踪执行过程
     */
    setTrace(trace: boolean): void;
    /**
     * 获取运行时配置
     */
    getConfig(): RuntimeConfig;
}
/**
 * 创建默认上下文
 */
export declare function createDefaultContext(vars?: Record<string, any>): IContext;
/**
 * 快速执行表达式
 */
export declare function execute(expression: string, context?: Record<string, any>, options?: {
    precise?: boolean;
    shortCircuit?: boolean;
    timeout?: number;
}): any;
export default ExpressRunner;
