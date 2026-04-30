import { ExecutionResult, IContext, RuntimeConfig, SecurityConfig } from './types';
/**
 * QLExpress-JS 表达式引擎
 * 类似阿里巴巴 QLExpress 的 JavaScript 实现
 */
export declare class ExpressRunner {
    private config;
    private securityManager;
    private macroManager;
    private functionManager;
    private operatorManager;
    private instructionCache;
    private operatorAliases;
    private namedExpressions;
    private globalContext?;
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
        useGlobalContext?: boolean;
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
     * 从全局上下文注册用户定义函数到解释器
     */
    private registerUserFunctionsFromContext;
    /**
     * 展开宏
     */
    private expandMacros;
    /**
     * 获取宏表达式映射
     */
    private getMacroExpressions;
    /**
     * 预加载表达式（类似 Java QLExpress 的 loadMultiExpress）
     * 用于预先加载函数定义、类定义等，支持命名管理和重复调用
     *
     * @param name 表达式名称（可选，用于后续通过名称执行）
     * @param expressContent 表达式内容（可以是函数定义、类定义等）
     * @param options 配置选项
     * @returns 执行结果
     *
     * @example
     * // 无名预加载
     * runner.loadMultiExpress('', 'function add(a, b) { return a + b; }');
     *
     * @example
     * // 命名预加载
     * runner.loadMultiExpress('MyFunctions', 'function multiply(a, b) { return a * b; }');
     *
     * @example
     * // 后续调用
     * runner.execute('add(10, 20)');
     * runner.executeByExpressName('MyFunctions', {});
     */
    loadMultiExpress(name: string, expressContent: string, options?: {
        isCache?: boolean;
        isTrace?: boolean;
    }): ExecutionResult;
    /**
     * 根据名称执行预加载的表达式
     *
     * @param name 表达式名称（通过 loadMultiExpress 预加载的名称）
     * @param context 上下文对象或 IContext
     * @param options 执行选项
     * @returns 执行结果
     *
     * @throws Error 如果未找到指定名称的表达式
     *
     * @example
     * // 先预加载
     * runner.loadMultiExpress('MathFuncs', 'function square(x) { return x * x; }');
     *
     * @example
     * // 通过名称执行
     * const result = runner.executeByExpressName('MathFuncs', { x: 5 });
     * console.log(result.value); // 输出：25
     */
    executeByExpressName(name: string, context?: IContext | Record<string, any>, options?: {
        isCache?: boolean;
        isTrace?: boolean;
        timeout?: number;
    }): ExecutionResult;
    /**
     * 获取所有已预加载的命名表达式
     *
     * @returns 返回包含所有命名表达式的 Map
     */
    getNamedExpressions(): Map<string, string>;
    /**
     * 删除指定的命名表达式
     *
     * @param name 表达式名称
     * @returns 是否删除成功
     */
    removeNamedExpression(name: string): boolean;
    /**
     * 检查是否存在指定名称的表达式
     *
     * @param name 表达式名称
     * @returns 是否存在
     */
    hasNamedExpression(name: string): boolean;
    /**
     * 清除所有命名表达式
     */
    clearNamedExpressions(): void;
    /**
     * 获取命名表达式数量
     *
     * @returns 表达式数量
     */
    getNamedExpressionCount(): number;
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
