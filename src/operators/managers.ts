import { FunctionInfo, IContext } from '../types';

/**
 * 宏管理器
 * 管理宏定义和展开
 */
export class MacroManager {
  private macros: Map<string, MacroDefinition> = new Map();

  /**
   * 添加宏定义
   */
  add(name: string, expression: string): void {
    this.macros.set(name, { name, expression });
  }

  /**
   * 移除宏定义
   */
  remove(name: string): boolean {
    return this.macros.delete(name);
  }

  /**
   * 检查宏是否存在
   */
  has(name: string): boolean {
    return this.macros.has(name);
  }

  /**
   * 获取宏表达式
   */
  get(name: string): string | undefined {
    return this.macros.get(name)?.expression;
  }

  /**
   * 获取所有宏
   */
  getAll(): Map<string, MacroDefinition> {
    return new Map(this.macros);
  }

  /**
   * 清空所有宏
   */
  clear(): void {
    this.macros.clear();
  }
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
export class CustomFunctionManager {
  private functions: Map<string, FunctionDefinition> = new Map();

  /**
   * 添加自定义函数
   */
  add(name: string, handler: (...args: any[]) => any, description?: string): void {
    this.functions.set(name, { name, handler, description });
  }

  /**
   * 移除自定义函数
   */
  remove(name: string): boolean {
    return this.functions.delete(name);
  }

  /**
   * 检查函数是否存在
   */
  has(name: string): boolean {
    return this.functions.has(name);
  }

  /**
   * 获取函数
   */
  get(name: string): FunctionDefinition | undefined {
    return this.functions.get(name);
  }

  /**
   * 获取所有函数
   */
  getAll(): Map<string, FunctionDefinition> {
    return new Map(this.functions);
  }

  /**
   * 清空所有函数
   */
  clear(): void {
    this.functions.clear();
  }
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
export class CustomOperatorManager {
  private operators: Map<string, OperatorDefinition> = new Map();
  private aliases: Map<string, string> = new Map();

  /**
   * 添加自定义操作符
   */
  add(name: string, handler: (args: any[], context: IContext) => any, precedence?: number): void {
    this.operators.set(name, { name, handler, precedence });
  }

  /**
   * 添加操作符别名
   */
  addAlias(alias: string, originalName: string): void {
    this.aliases.set(alias, originalName);
  }

  /**
   * 移除自定义操作符
   */
  remove(name: string): boolean {
    return this.operators.delete(name);
  }

  /**
   * 检查操作符是否存在
   */
  has(name: string): boolean {
    const resolvedName = this.resolveAlias(name);
    return this.operators.has(resolvedName);
  }

  /**
   * 获取操作符
   */
  get(name: string): OperatorDefinition | undefined {
    const resolvedName = this.resolveAlias(name);
    return this.operators.get(resolvedName);
  }

  /**
   * 解析别名
   */
  resolveAlias(name: string): string {
    return this.aliases.get(name) || name;
  }

  /**
   * 获取所有操作符
   */
  getAll(): Map<string, OperatorDefinition> {
    return new Map(this.operators);
  }

  /**
   * 获取所有别名
   */
  getAllAliases(): Map<string, string> {
    return new Map(this.aliases);
  }

  /**
   * 清空所有操作符
   */
  clear(): void {
    this.operators.clear();
    this.aliases.clear();
  }
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
export class ExternalMethodManager {
  private classMethods: Map<string, Map<string, FunctionInfo>> = new Map();
  private instanceMethods: Map<string, Map<string, FunctionInfo>> = new Map();

  /**
   * 绑定类静态方法
   */
  bindClassMethod(
    functionName: string,
    className: string,
    methodName: string,
    paramTypes?: string[],
  ): void {
    if (!this.classMethods.has(className)) {
      this.classMethods.set(className, new Map());
    }

    const classMethodMap = this.classMethods.get(className)!;

    // 这里存储方法信息，实际调用时需要通过反射或直接调用
    classMethodMap.set(functionName, {
      className,
      methodName,
      paramTypes,
      type: 'static',
    });
  }

  /**
   * 绑定实例方法
   */
  bindInstanceMethod(
    functionName: string,
    instance: any,
    methodName: string,
    paramTypes?: string[],
  ): void {
    const instanceId = instance.constructor.name;
    if (!this.instanceMethods.has(instanceId)) {
      this.instanceMethods.set(instanceId, new Map());
    }

    const instanceMethodMap = this.instanceMethods.get(instanceId)!;

    instanceMethodMap.set(functionName, {
      instance,
      methodName,
      paramTypes,
      type: 'instance',
    });
  }

  /**
   * 调用静态方法
   */
  callClassMethod(className: string, functionName: string, args: any[]): any {
    const classMethodMap = this.classMethods.get(className);
    if (!classMethodMap) {
      throw new Error(`Class ${className} not found`);
    }

    const functionInfo = classMethodMap.get(functionName);
    if (!functionInfo) {
      throw new Error(`Method ${functionName} not found in class ${className}`);
    }

    // 实际实现需要通过反射或其他方式调用
    // 这里只是框架结构
    return undefined;
  }

  /**
   * 调用实例方法
   */
  callInstanceMethod(instanceId: string, functionName: string, args: any[]): any {
    const instanceMethodMap = this.instanceMethods.get(instanceId);
    if (!instanceMethodMap) {
      throw new Error(`Instance ${instanceId} not found`);
    }

    const functionInfo = instanceMethodMap.get(functionName);
    if (!functionInfo) {
      throw new Error(`Method ${functionName} not found in instance ${instanceId}`);
    }

    // 实际实现需要调用实例方法
    return undefined;
  }

  /**
   * 获取所有绑定的类方法
   */
  getAllClassMethods(): Map<string, Map<string, FunctionInfo>> {
    return new Map(this.classMethods);
  }

  /**
   * 获取所有绑定的实例方法
   */
  getAllInstanceMethods(): Map<string, Map<string, FunctionInfo>> {
    return new Map(this.instanceMethods);
  }

  /**
   * 清空所有绑定
   */
  clear(): void {
    this.classMethods.clear();
    this.instanceMethods.clear();
  }
}
