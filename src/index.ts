import {
  IContext,
  ExecutionResult,
  RuntimeConfig,
  SecurityConfig,
  ParseError,
  RuntimeError,
  TimeoutError,
  NodeType,
  Identifier
} from './types';
import { Lexer } from './lexer';
import { Parser } from './parser';
import { RuntimeContext, Interpreter, BuiltinObjects } from './runtime';
import { builtinFunctions } from './functions';
import { SecurityManager } from './security';
import { MacroManager, CustomFunctionManager, CustomOperatorManager } from './operators';

/**
 * QLExpress-JS 表达式引擎
 * 类似阿里巴巴QLExpress的JavaScript实现
 */
export class ExpressRunner {
  private config: RuntimeConfig;
  private securityManager: SecurityManager;
  private macroManager: MacroManager;
  private functionManager: CustomFunctionManager;
  private operatorManager: CustomOperatorManager;
  private instructionCache: Map<string, any> = new Map();
  private operatorAliases: Map<string, string> = new Map();

  /**
   * 创建表达式引擎实例
   */
  constructor(options: Partial<RuntimeConfig> = {}) {
    this.config = {
      precise: options.precise ?? false,
      shortCircuit: options.shortCircuit ?? true,
      trace: options.trace ?? false,
      security: {
        sandbox: options.security?.sandbox ?? false,
        timeout: options.security?.timeout ?? 0,
        maxLoopCount: options.security?.maxLoopCount ?? 1000000,
        maxArrayLength: options.security?.maxArrayLength ?? 100000,
        forbidRiskMethods: options.security?.forbidRiskMethods ?? true,
        riskMethodBlacklist: options.security?.riskMethodBlacklist ?? [],
        allowedMethods: options.security?.allowedMethods ?? null
      }
    };

    this.securityManager = new SecurityManager(this.config.security);
    this.macroManager = new MacroManager();
    this.functionManager = new CustomFunctionManager();
    this.operatorManager = new CustomOperatorManager();

    // 初始化内置操作符别名
    this.initBuiltinAliases();
  }

  /**
   * 初始化内置操作符别名
   */
  private initBuiltinAliases(): void {
    // 中文别名
    this.addOperatorWithAlias('如果', 'if', null);
    this.addOperatorWithAlias('则', 'then', null);
    this.addOperatorWithAlias('否则', 'else', null);
    this.addOperatorWithAlias('并且', '&&', null);
    this.addOperatorWithAlias('或者', '||', null);
    this.addOperatorWithAlias('不', '!', null);
    this.addOperatorWithAlias('等于', '==', null);
    this.addOperatorWithAlias('不等于', '!=', null);
    this.addOperatorWithAlias('大于', '>', null);
    this.addOperatorWithAlias('小于', '<', null);
    this.addOperatorWithAlias('大于等于', '>=', null);
    this.addOperatorWithAlias('小于等于', '<=', null);
    this.addOperatorWithAlias('加', '+', null);
    this.addOperatorWithAlias('减', '-', null);
    this.addOperatorWithAlias('乘', '*', null);
    this.addOperatorWithAlias('除', '/', null);
    this.addOperatorWithAlias('取余', '%', null);
  }

  /**
   * 执行表达式
   */
  execute(
    expression: string,
    context?: IContext | Record<string, any>,
    options: {
      isCache?: boolean;
      isTrace?: boolean;
      timeout?: number;
    } = {}
  ): ExecutionResult {
    const { isCache = true, isTrace = false, timeout = 0 } = options;

    // 处理宏展开
    expression = this.expandMacros(expression);

    // 检查缓存
    let cached = isCache ? this.instructionCache.get(expression) : null;

    if (!cached) {
      // 词法分析
      const lexer = new Lexer(expression);
      const tokens = lexer.tokenize();

      // 语法分析
      const parser = new Parser(tokens, this.getMacroExpressions(), this.operatorAliases);
      const ast = parser.parse();

      cached = ast;

      // 缓存编译结果
      if (isCache) {
        this.instructionCache.set(expression, cached);
      }
    }

    // 创建运行时上下文
    const runtimeContext = this.createRuntimeContext(context);

    // 创建解释器
    const interpreter = new Interpreter(runtimeContext, {
      ...this.config,
      trace: isTrace || this.config.trace,
      security: {
        ...this.config.security,
        timeout: timeout || this.config.security.timeout
      }
    });

    // 注册自定义函数和操作符
    this.registerCustomFunctions(interpreter);
    this.registerCustomOperators(interpreter);

    // 执行
    const startTime = Date.now();
    const result = interpreter.execute(cached);
    const endTime = Date.now();

    // 添加执行时间信息
    (result as any).executionTime = endTime - startTime;

    return result;
  }

  /**
   * 创建运行时上下文
   */
  private createRuntimeContext(context?: IContext | Record<string, any>): RuntimeContext {
    const initialVars: Record<string, any> = {};

    // 添加内置对象
    Object.assign(initialVars, BuiltinObjects.getAll());

    // 添加内置函数
    for (const [name, handler] of Object.entries(builtinFunctions)) {
      initialVars[name] = handler;
    }

    // 添加用户提供的上下文
    if (context) {
      if (typeof (context as IContext).get === 'function') {
        // IContext 接口
        const ctx = context as IContext;
        for (const key of ctx.keys()) {
          initialVars[key] = ctx.get(key);
        }
      } else {
        // 普通对象
        Object.assign(initialVars, context as Record<string, any>);
      }
    }

    return new RuntimeContext(initialVars);
  }

  /**
   * 注册自定义函数
   */
  private registerCustomFunctions(interpreter: Interpreter): void {
    const functions = this.functionManager.getAll();
    for (const [name, def] of functions) {
      interpreter.addFunction(name, def.handler);
    }
  }

  /**
   * 注册自定义操作符
   */
  private registerCustomOperators(interpreter: Interpreter): void {
    const operators = this.operatorManager.getAll();
    for (const [name, def] of operators) {
      interpreter.addOperator(name, def.handler);
    }
  }

  /**
   * 展开宏
   */
  private expandMacros(expression: string): string {
    let result = expression;
    let changed = true;
    const macros = this.macroManager.getAll();

    // 循环展开直到没有变化（处理嵌套宏）
    while (changed) {
      changed = false;
      for (const [name, def] of macros) {
        // 使用正则表达式匹配宏调用，支持中文
        const regex = new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        const newResult = result.replace(regex, def.expression);
        if (newResult !== result) {
          changed = true;
          result = newResult;
        }
      }
    }
    return result;
  }

  /**
   * 获取宏表达式映射
   */
  private getMacroExpressions(): Map<string, string> {
    const result = new Map<string, string>();
    const macros = this.macroManager.getAll();
    for (const [name, def] of macros) {
      result.set(name, def.expression);
    }
    return result;
  }

  // ============ 函数管理 API ============

  /**
   * 添加自定义函数
   */
  addFunction(name: string, handler: (...args: any[]) => any): void {
    this.functionManager.add(name, handler);
  }

  /**
   * 移除自定义函数
   */
  removeFunction(name: string): boolean {
    return this.functionManager.remove(name);
  }

  /**
   * 检查函数是否存在
   */
  hasFunction(name: string): boolean {
    return this.functionManager.has(name) || builtinFunctions[name] !== undefined;
  }

  /**
   * 绑定类静态方法
   * 类似QLExpress的addFunctionOfClassMethod
   */
  addFunctionOfClassMethod(
    functionName: string,
    className: string,
    methodName: string,
    paramTypes?: string[]
  ): void {
    // 对于JavaScript，我们需要存储类引用和方法名
    // 这里简化实现，直接绑定方法
    this.addFunction(functionName, (...args: any[]) => {
      // 实际调用需要通过反射或其他方式
      throw new Error('Class method binding not implemented in JavaScript environment');
    });
  }

  /**
   * 绑定对象实例方法
   * 类似QLExpress的addFunctionOfServiceMethod
   */
  addFunctionOfServiceMethod<T extends object>(
    functionName: string,
    service: T,
    methodName: keyof T,
    paramTypes?: string[]
  ): void {
    const method = service[methodName];
    if (typeof method !== 'function') {
      throw new Error(`${String(methodName)} is not a function`);
    }

    this.addFunction(functionName, (...args: any[]) => {
      return (method as Function).apply(service, args);
    });
  }

  /**
   * 同时支持 a.fun(b) 和 fun(a, b) 两种调用方式
   */
  addFunctionAndClassMethod(
    functionName: string,
    className: string,
    methodName: string
  ): void {
    this.addFunctionOfClassMethod(functionName, className, methodName);
  }

  // ============ 操作符管理 API ============

  /**
   * 添加自定义操作符
   */
  addOperator(
    name: string,
    handler: (args: any[], context: IContext) => any
  ): void {
    this.operatorManager.add(name, handler);
  }

  /**
   * 替换操作符处理
   */
  replaceOperator(
    name: string,
    handler: (args: any[], context: IContext) => any
  ): void {
    this.operatorManager.add(name, handler);
  }

  /**
   * 添加操作符别名
   */
  addOperatorWithAlias(
    alias: string,
    originalName: string,
    errorInfo?: string | null
  ): void {
    this.operatorAliases.set(alias, originalName);
    this.operatorManager.addAlias(alias, originalName);
  }

  /**
   * 检查操作符是否存在
   */
  hasOperator(name: string): boolean {
    return this.operatorManager.has(name);
  }

  // ============ 宏管理 API ============

  /**
   * 添加宏定义
   */
  addMacro(name: string, expression: string): void {
    this.macroManager.add(name, expression);
  }

  /**
   * 移除宏定义
   */
  removeMacro(name: string): boolean {
    return this.macroManager.remove(name);
  }

  /**
   * 检查宏是否存在
   */
  hasMacro(name: string): boolean {
    return this.macroManager.has(name);
  }

  /**
   * 获取宏表达式
   */
  getMacro(name: string): string | undefined {
    return this.macroManager.get(name);
  }

  // ============ 语法分析 API ============

  /**
   * 获取表达式需要的外部变量名称列表
   */
  getOutVarNames(expression: string): string[] {
    expression = this.expandMacros(expression);

    const lexer = new Lexer(expression);
    const tokens = lexer.tokenize();
    const parser = new Parser(tokens, this.getMacroExpressions(), this.operatorAliases);
    const ast = parser.parse();

    const varNames = new Set<string>();
    this.collectVarNames(ast, varNames);

    // 排除内置函数和变量
    const builtins = new Set([
      ...Object.keys(builtinFunctions),
      ...Object.keys(BuiltinObjects.getAll()),
      'true', 'false', 'null', 'undefined'
    ]);

    return Array.from(varNames).filter(name => !builtins.has(name));
  }

  /**
   * 递归收集变量名
   */
  private collectVarNames(node: any, varNames: Set<string>): void {
    if (!node) return;

    if (node.type === NodeType.Identifier) {
      const name = (node as Identifier).name;
      // 排除函数名（在函数调用中）
      varNames.add(name);
    }

    // 递归遍历子节点
    for (const key of Object.keys(node)) {
      const value = node[key];
      if (Array.isArray(value)) {
        for (const item of value) {
          if (typeof item === 'object' && item !== null) {
            this.collectVarNames(item, varNames);
          }
        }
      } else if (typeof value === 'object' && value !== null) {
        this.collectVarNames(value, varNames);
      }
    }
  }

  /**
   * 获取表达式需要的函数名称列表
   */
  getOutFunctionNames(expression: string): string[] {
    expression = this.expandMacros(expression);

    const lexer = new Lexer(expression);
    const tokens = lexer.tokenize();
    const parser = new Parser(tokens, this.getMacroExpressions(), this.operatorAliases);
    const ast = parser.parse();

    const funcNames = new Set<string>();
    this.collectFunctionNames(ast, funcNames);

    return Array.from(funcNames);
  }

  /**
   * 递归收集函数名
   */
  private collectFunctionNames(node: any, funcNames: Set<string>): void {
    if (!node) return;

    if (node.type === NodeType.CallExpression) {
      if (node.callee.type === NodeType.Identifier) {
        funcNames.add(node.callee.name);
      }
    }

    // 递归遍历子节点
    for (const key of Object.keys(node)) {
      const value = node[key];
      if (Array.isArray(value)) {
        for (const item of value) {
          if (typeof item === 'object' && item !== null) {
            this.collectFunctionNames(item, funcNames);
          }
        }
      } else if (typeof value === 'object' && value !== null) {
        this.collectFunctionNames(value, funcNames);
      }
    }
  }

  /**
   * 语法校验
   */
  validate(expression: string): { valid: boolean; error?: string } {
    try {
      expression = this.expandMacros(expression);

      const lexer = new Lexer(expression);
      const tokens = lexer.tokenize();
      const parser = new Parser(tokens, this.getMacroExpressions(), this.operatorAliases);
      parser.parse();

      return { valid: true };
    } catch (error) {
      return {
        valid: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  // ============ 缓存管理 API ============

  /**
   * 从缓存获取指令集
   */
  getInstructionSetFromLocalCache(expression: string): any {
    return this.instructionCache.get(expression);
  }

  /**
   * 清除缓存
   */
  clearExpressCache(): void {
    this.instructionCache.clear();
  }

  /**
   * 获取缓存大小
   */
  getCacheSize(): number {
    return this.instructionCache.size;
  }

  // ============ 安全配置 API ============

  /**
   * 设置沙箱模式
   */
  setSandboxMode(enabled: boolean): void {
    this.config.security.sandbox = enabled;
    this.securityManager.updateConfig({ sandbox: enabled });
  }

  /**
   * 设置执行超时时间
   */
  setTimeout(timeout: number): void {
    this.config.security.timeout = timeout;
    this.securityManager.updateConfig({ timeout });
  }

  /**
   * 设置最大循环次数
   */
  setMaxLoopCount(count: number): void {
    this.config.security.maxLoopCount = count;
    this.securityManager.updateConfig({ maxLoopCount: count });
  }

  /**
   * 设置最大数组长度
   */
  setMaxArrayLength(length: number): void {
    this.config.security.maxArrayLength = length;
    this.securityManager.updateConfig({ maxArrayLength: length });
  }

  /**
   * 添加危险方法到黑名单
   */
  addSecurityRiskMethod(className: string, methodName: string): void {
    const fullName = `${className}.${methodName}`;
    this.config.security.riskMethodBlacklist.push(fullName);
    this.securityManager.addToBlacklist(fullName);
  }

  /**
   * 添加安全方法到白名单
   */
  addSecureMethod(className: string, methodName: string): void {
    const fullName = `${className}.${methodName}`;
    if (!this.config.security.allowedMethods) {
      this.config.security.allowedMethods = [];
    }
    this.config.security.allowedMethods.push(fullName);
    this.securityManager.addToWhitelist(fullName);
  }

  /**
   * 获取安全配置
   */
  getSecurityConfig(): SecurityConfig {
    return this.securityManager.getConfig();
  }

  // ============ 配置 API ============

  /**
   * 设置是否使用高精度计算
   */
  setPrecise(precise: boolean): void {
    this.config.precise = precise;
  }

  /**
   * 设置是否使用短路求值
   */
  setShortCircuit(shortCircuit: boolean): void {
    this.config.shortCircuit = shortCircuit;
  }

  /**
   * 设置是否追踪执行过程
   */
  setTrace(trace: boolean): void {
    this.config.trace = trace;
  }

  /**
   * 获取运行时配置
   */
  getConfig(): RuntimeConfig {
    return { ...this.config };
  }
}

/**
 * 创建默认上下文
 */
export function createDefaultContext(vars: Record<string, any> = {}): IContext {
  const context = new RuntimeContext(vars);
  return context;
}

/**
 * 快速执行表达式
 */
export function execute(
  expression: string,
  context?: Record<string, any>,
  options?: {
    precise?: boolean;
    shortCircuit?: boolean;
    timeout?: number;
  }
): any {
  const runner = new ExpressRunner({
    precise: options?.precise,
    shortCircuit: options?.shortCircuit,
    security: {
      sandbox: false,
      timeout: options?.timeout || 0,
      maxLoopCount: 1000000,
      maxArrayLength: 100000,
      forbidRiskMethods: true,
      riskMethodBlacklist: [],
      allowedMethods: null
    }
  });

  return runner.execute(expression, context).value;
}

// 默认导出
export default ExpressRunner;
