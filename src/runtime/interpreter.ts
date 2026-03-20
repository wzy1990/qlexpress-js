import {
  NodeType,
  Program,
  Expression,
  Statement,
  BinaryExpression,
  UnaryExpression,
  ConditionalExpression,
  AssignmentExpression,
  UpdateExpression,
  MemberExpression,
  CallExpression,
  NewExpression,
  ArrowFunctionExpression,
  InExpression,
  LikeExpression,
  BetweenExpression,
  ArrayExpression,
  ObjectExpression,
  Identifier,
  BlockStatement,
  IfStatement,
  WhileStatement,
  ForStatement,
  ReturnStatement,
  FunctionDeclaration,
  VariableDeclaration,
  ExpressionStatement,
  RuntimeError,
  BreakException,
  ContinueException,
  ReturnException,
  ReturnValue,
  ExecutionResult,
  ExecutionTrace,
  SecurityConfig,
  RuntimeConfig,
  IContext
} from '../types';
import { RuntimeContext, Scope } from './context';

/**
 * 用户自定义函数
 */
interface UserFunction {
  name: string;
  params: string[];
  body: any;
  closure: Scope;
}

/**
 * 解释器
 * 执行AST并返回结果
 */
export class Interpreter {
  private context: RuntimeContext;
  private config: RuntimeConfig;
  private traces: ExecutionTrace[] = [];
  private loopCount: number = 0;
  private startTime: number = 0;
  private customFunctions: Map<string, (...args: any[]) => any> = new Map();
  private customOperators: Map<string, (args: any[], context: IContext) => any> = new Map();
  private macros: Map<string, string> = new Map();
  private userFunctions: Map<string, UserFunction> = new Map();

  constructor(
    context: RuntimeContext,
    config: Partial<RuntimeConfig> = {}
  ) {
    this.context = context;
    this.config = {
      precise: config.precise ?? false,
      shortCircuit: config.shortCircuit ?? true,
      trace: config.trace ?? false,
      security: {
        sandbox: config.security?.sandbox ?? false,
        timeout: config.security?.timeout ?? 0,
        maxLoopCount: config.security?.maxLoopCount ?? 1000000,
        maxArrayLength: config.security?.maxArrayLength ?? 100000,
        forbidRiskMethods: config.security?.forbidRiskMethods ?? true,
        riskMethodBlacklist: config.security?.riskMethodBlacklist ?? [],
        allowedMethods: config.security?.allowedMethods ?? null
      }
    };
  }

  /**
   * 执行AST
   */
  execute(node: any): ExecutionResult {
    this.startTime = Date.now();
    this.traces = [];
    this.loopCount = 0;

    try {
      const value = this.evaluate(node);
      return {
        value: value instanceof ReturnValue ? value.value : value,
        variables: this.context.toObject(),
        trace: this.config.trace ? this.traces : undefined
      };
    } catch (error) {
      if (error instanceof BreakException) {
        throw new RuntimeError("'break' is not allowed outside of a loop");
      }
      if (error instanceof ContinueException) {
        throw new RuntimeError("'continue' is not allowed outside of a loop");
      }
      if (error instanceof ReturnException) {
        return {
          value: error.value,
          variables: this.context.toObject(),
          trace: this.config.trace ? this.traces : undefined
        };
      }
      throw error;
    }
  }

  /**
   * 添加自定义函数
   */
  addFunction(name: string, handler: (...args: any[]) => any): void {
    this.customFunctions.set(name, handler);
  }

  /**
   * 添加自定义操作符
   */
  addOperator(name: string, handler: (args: any[], context: IContext) => any): void {
    this.customOperators.set(name, handler);
  }

  /**
   * 添加宏
   */
  addMacro(name: string, expression: string): void {
    this.macros.set(name, expression);
  }

  /**
   * 检查安全限制
   */
  private checkSecurity(): void {
    const { timeout, maxLoopCount } = this.config.security;

    // 检查超时
    if (timeout > 0 && Date.now() - this.startTime > timeout) {
      throw new RuntimeError(`Execution timeout after ${timeout}ms`);
    }

    // 检查循环次数
    if (this.loopCount > maxLoopCount) {
      throw new RuntimeError(`Maximum loop count exceeded: ${maxLoopCount}`);
    }
  }

  /**
   * 添加执行追踪
   */
  private addTrace(node: string, action: string, result?: any): void {
    if (this.config.trace) {
      this.traces.push({
        node,
        action,
        result
      });
    }
  }

  /**
   * 评估节点
   */
  private evaluate(node: any): any {
    this.checkSecurity();

    switch (node.type) {
      case NodeType.Program:
        return this.evaluateProgram(node as Program);

      case NodeType.ExpressionStatement:
        return this.evaluate((node as ExpressionStatement).expression);

      case NodeType.NumberLiteral:
      case NodeType.StringLiteral:
      case NodeType.BooleanLiteral:
      case NodeType.NullLiteral:
        return (node as any).value;

      case NodeType.Identifier:
        return this.evaluateIdentifier(node as Identifier);

      case NodeType.ArrayExpression:
        return this.evaluateArrayExpression(node as ArrayExpression);

      case NodeType.ObjectExpression:
        return this.evaluateObjectExpression(node as ObjectExpression);

      case NodeType.BinaryExpression:
        return this.evaluateBinaryExpression(node as BinaryExpression);

      case NodeType.UnaryExpression:
        return this.evaluateUnaryExpression(node as UnaryExpression);

      case NodeType.ConditionalExpression:
        return this.evaluateConditionalExpression(node as ConditionalExpression);

      case NodeType.AssignmentExpression:
        return this.evaluateAssignmentExpression(node as AssignmentExpression);

      case NodeType.UpdateExpression:
        return this.evaluateUpdateExpression(node as UpdateExpression);

      case NodeType.MemberExpression:
        return this.evaluateMemberExpression(node as MemberExpression);

      case NodeType.CallExpression:
        return this.evaluateCallExpression(node as CallExpression);

      case NodeType.NewExpression:
        return this.evaluateNewExpression(node as NewExpression);

      case NodeType.ArrowFunctionExpression:
        return this.evaluateArrowFunctionExpression(node as ArrowFunctionExpression);

      case NodeType.InExpression:
        return this.evaluateInExpression(node as InExpression);

      case NodeType.LikeExpression:
        return this.evaluateLikeExpression(node as LikeExpression);

      case NodeType.BetweenExpression:
        return this.evaluateBetweenExpression(node as BetweenExpression);

      case NodeType.BlockStatement:
        return this.evaluateBlockStatement(node as BlockStatement);

      case NodeType.IfStatement:
        return this.evaluateIfStatement(node as IfStatement);

      case NodeType.WhileStatement:
        return this.evaluateWhileStatement(node as WhileStatement);

      case NodeType.ForStatement:
        return this.evaluateForStatement(node as ForStatement);

      case NodeType.ReturnStatement:
        return this.evaluateReturnStatement(node as ReturnStatement);

      case NodeType.BreakStatement:
        throw new BreakException();

      case NodeType.ContinueStatement:
        throw new ContinueException();

      case NodeType.FunctionDeclaration:
        return this.evaluateFunctionDeclaration(node as FunctionDeclaration);

      case NodeType.VariableDeclaration:
        return this.evaluateVariableDeclaration(node as VariableDeclaration);

      default:
        throw new RuntimeError(`Unknown node type: ${node.type}`);
    }
  }

  /**
   * 评估程序
   */
  private evaluateProgram(node: Program): any {
    let result: any = undefined;

    for (const statement of node.body) {
      result = this.evaluate(statement);
      if (result instanceof ReturnValue) {
        return result;
      }
    }

    return result;
  }

  /**
   * 评估标识符
   */
  private evaluateIdentifier(node: Identifier): any {
    const name = node.name;

    // 检查自定义函数
    if (this.customFunctions.has(name)) {
      return this.customFunctions.get(name);
    }

    // 检查用户定义函数
    if (this.userFunctions.has(name)) {
      return this.userFunctions.get(name);
    }

    // 检查上下文变量
    if (this.context.has(name)) {
      return this.context.get(name);
    }

    // 未定义变量返回 undefined
    return undefined;
  }

  /**
   * 评估数组表达式
   */
  private evaluateArrayExpression(node: ArrayExpression): any[] {
    const { maxArrayLength } = this.config.security;

    if (node.elements.length > maxArrayLength) {
      throw new RuntimeError(`Array length exceeds maximum: ${maxArrayLength}`);
    }

    return node.elements.map(element => this.evaluate(element));
  }

  /**
   * 评估对象表达式
   */
  private evaluateObjectExpression(node: ObjectExpression): Record<string, any> {
    const obj: Record<string, any> = {};

    for (const prop of node.properties) {
      let key: string | number;

      if (prop.key.type === NodeType.Identifier) {
        key = (prop.key as Identifier).name;
      } else if (prop.key.type === NodeType.StringLiteral) {
        key = (prop.key as any).value;
      } else if (prop.key.type === NodeType.NumberLiteral) {
        key = (prop.key as any).value;
      } else {
        key = String(this.evaluate(prop.key));
      }

      obj[key] = this.evaluate(prop.value);
    }

    return obj;
  }

  /**
   * 评估二元表达式
   */
  private evaluateBinaryExpression(node: BinaryExpression): any {
    const operator = node.operator;

    // 短路求值
    if (this.config.shortCircuit) {
      if (operator === '&&') {
        const left = this.evaluate(node.left);
        if (!left) return false;
        return Boolean(this.evaluate(node.right));
      }
      if (operator === '||') {
        const left = this.evaluate(node.left);
        if (left) return true;
        return Boolean(this.evaluate(node.right));
      }
    }

    const left = this.evaluate(node.left);
    const right = this.evaluate(node.right);

    // 检查自定义操作符
    if (this.customOperators.has(operator)) {
      return this.customOperators.get(operator)!([left, right], this.context);
    }

    switch (operator) {
      case '+':
        // 字符串拼接或数值相加
        if (typeof left === 'string' || typeof right === 'string') {
          return String(left) + String(right);
        }
        return this.toNumber(left) + this.toNumber(right);

      case '-':
        return this.toNumber(left) - this.toNumber(right);

      case '*':
        return this.toNumber(left) * this.toNumber(right);

      case '/':
        const divisor = this.toNumber(right);
        if (divisor === 0) {
          throw new RuntimeError('Division by zero');
        }
        return this.toNumber(left) / divisor;

      case '%':
        return this.toNumber(left) % this.toNumber(right);

      case '==':
        return this.isEqual(left, right);

      case '!=':
      case '<>':
        return !this.isEqual(left, right);

      case '===':
        return left === right;

      case '!==':
        return left !== right;

      case '<':
        return this.toNumber(left) < this.toNumber(right);

      case '>':
        return this.toNumber(left) > this.toNumber(right);

      case '<=':
        return this.toNumber(left) <= this.toNumber(right);

      case '>=':
        return this.toNumber(left) >= this.toNumber(right);

      case '&':
        return this.toNumber(left) & this.toNumber(right);

      case '|':
        return this.toNumber(left) | this.toNumber(right);

      case '^':
        return this.toNumber(left) ^ this.toNumber(right);

      case '<<':
        return this.toNumber(left) << this.toNumber(right);

      case '>>':
        return this.toNumber(left) >> this.toNumber(right);

      case '>>>':
        return this.toNumber(left) >>> this.toNumber(right);

      default:
        throw new RuntimeError(`Unknown binary operator: ${operator}`);
    }
  }

  /**
   * 评估一元表达式
   */
  private evaluateUnaryExpression(node: UnaryExpression): any {
    const argument = this.evaluate(node.argument);

    switch (node.operator) {
      case '!':
        return !argument;

      case '-':
        return -this.toNumber(argument);

      case '+':
        return +this.toNumber(argument);

      case '~':
        return ~this.toNumber(argument);

      default:
        throw new RuntimeError(`Unknown unary operator: ${node.operator}`);
    }
  }

  /**
   * 评估条件表达式
   */
  private evaluateConditionalExpression(node: ConditionalExpression): any {
    const test = this.evaluate(node.test);
    return test ? this.evaluate(node.consequent) : this.evaluate(node.alternate);
  }

  /**
   * 评估赋值表达式
   */
  private evaluateAssignmentExpression(node: AssignmentExpression): any {
    const value = this.evaluate(node.right);

    if (node.left.type === NodeType.Identifier) {
      const name = (node.left as Identifier).name;

      switch (node.operator) {
        case '=':
          this.context.set(name, value);
          return value;

        case '+=':
          const currentAdd = this.context.get(name) ?? 0;
          const resultAdd = typeof currentAdd === 'string' || typeof value === 'string'
            ? String(currentAdd) + String(value)
            : this.toNumber(currentAdd) + this.toNumber(value);
          this.context.set(name, resultAdd);
          return resultAdd;

        case '-=':
          const currentSub = this.toNumber(this.context.get(name) ?? 0);
          const resultSub = currentSub - this.toNumber(value);
          this.context.set(name, resultSub);
          return resultSub;

        case '*=':
          const currentMul = this.toNumber(this.context.get(name) ?? 0);
          const resultMul = currentMul * this.toNumber(value);
          this.context.set(name, resultMul);
          return resultMul;

        case '/=':
          const currentDiv = this.toNumber(this.context.get(name) ?? 0);
          const resultDiv = currentDiv / this.toNumber(value);
          this.context.set(name, resultDiv);
          return resultDiv;

        case '%=':
          const currentMod = this.toNumber(this.context.get(name) ?? 0);
          const resultMod = currentMod % this.toNumber(value);
          this.context.set(name, resultMod);
          return resultMod;

        default:
          throw new RuntimeError(`Unknown assignment operator: ${node.operator}`);
      }
    }

    if (node.left.type === NodeType.MemberExpression) {
      const memberExpr = node.left as MemberExpression;
      const object = this.evaluate(memberExpr.object);
      const property = memberExpr.computed
        ? this.evaluate(memberExpr.property)
        : (memberExpr.property as Identifier).name;

      switch (node.operator) {
        case '=':
          object[property] = value;
          return value;

        case '+=':
          object[property] = (object[property] ?? 0) + value;
          return object[property];

        case '-=':
          object[property] = (object[property] ?? 0) - value;
          return object[property];

        case '*=':
          object[property] = (object[property] ?? 0) * value;
          return object[property];

        case '/=':
          object[property] = (object[property] ?? 0) / value;
          return object[property];

        case '%=':
          object[property] = (object[property] ?? 0) % value;
          return object[property];

        default:
          throw new RuntimeError(`Unknown assignment operator: ${node.operator}`);
      }
    }

    throw new RuntimeError('Invalid assignment target');
  }

  /**
   * 评估更新表达式
   */
  private evaluateUpdateExpression(node: UpdateExpression): any {
    const getValue = (): number => {
      if (node.argument.type === NodeType.Identifier) {
        return this.toNumber(this.context.get((node.argument as Identifier).name) ?? 0);
      }
      if (node.argument.type === NodeType.MemberExpression) {
        const object = this.evaluate(node.argument.object);
        const property = node.argument.computed
          ? this.evaluate(node.argument.property)
          : (node.argument.property as Identifier).name;
        return this.toNumber(object[property] ?? 0);
      }
      throw new RuntimeError('Invalid update target');
    };

    const setValue = (value: number): void => {
      if (node.argument.type === NodeType.Identifier) {
        this.context.set((node.argument as Identifier).name, value);
      } else if (node.argument.type === NodeType.MemberExpression) {
        const object = this.evaluate(node.argument.object);
        const property = node.argument.computed
          ? this.evaluate(node.argument.property)
          : (node.argument.property as Identifier).name;
        object[property] = value;
      }
    };

    const oldValue = getValue();
    const newValue = node.operator === '++' ? oldValue + 1 : oldValue - 1;
    setValue(newValue);

    return node.prefix ? newValue : oldValue;
  }

  /**
   * 评估成员访问表达式
   */
  private evaluateMemberExpression(node: MemberExpression): any {
    const object = this.evaluate(node.object);

    let property: string | number;
    if (node.computed) {
      property = this.evaluate(node.property);
    } else {
      property = (node.property as Identifier).name;
    }

    // 支持Map和Set
    if (object instanceof Map) {
      if (property === 'get') {
        return (key: any) => object.get(key);
      }
      if (property === 'set') {
        return (key: any, value: any) => { object.set(key, value); };
      }
      if (property === 'has') {
        return (key: any) => object.has(key);
      }
      if (property === 'delete') {
        return (key: any) => object.delete(key);
      }
      if (property === 'size') {
        return object.size;
      }
      return object.get(property);
    }

    if (object instanceof Set) {
      if (property === 'has') {
        return (value: any) => object.has(value);
      }
      if (property === 'add') {
        return (value: any) => { object.add(value); };
      }
      if (property === 'delete') {
        return (value: any) => object.delete(value);
      }
      if (property === 'size') {
        return object.size;
      }
      return undefined;
    }

    return object[property];
  }

  /**
   * 评估函数调用表达式
   */
  private evaluateCallExpression(node: CallExpression): any {
    const args = node.arguments.map(arg => this.evaluate(arg));

    // 处理成员方法调用
    if (node.callee.type === NodeType.MemberExpression) {
      const memberExpr = node.callee as MemberExpression;
      const object = this.evaluate(memberExpr.object);

      let method: string | number;
      if (memberExpr.computed) {
        method = this.evaluate(memberExpr.property);
      } else {
        method = (memberExpr.property as Identifier).name;
      }

      const func = object[method];

      if (typeof func === 'function') {
        return func.apply(object, args);
      }

      throw new RuntimeError(`${String(method)} is not a function`);
    }

    // 处理普通函数调用
    const callee = this.evaluate(node.callee);

    // 自定义函数
    if (this.customFunctions.has(node.callee.type === NodeType.Identifier ? (node.callee as Identifier).name : '')) {
      const funcName = (node.callee as Identifier).name;
      const func = this.customFunctions.get(funcName)!;
      return func(...args);
    }

    // 用户定义函数
    if (node.callee.type === NodeType.Identifier) {
      const funcName = (node.callee as Identifier).name;
      if (this.userFunctions.has(funcName)) {
        return this.callUserFunction(this.userFunctions.get(funcName)!, args);
      }
    }

    // 箭头函数
    if (callee && typeof callee === 'function' && (callee as any).__isArrowFunction) {
      return callee(...args);
    }

    if (typeof callee === 'function') {
      return callee(...args);
    }

    throw new RuntimeError('Expression is not a function');
  }

  /**
   * 调用用户定义函数
   */
  private callUserFunction(func: UserFunction, args: any[]): any {
    // 创建新的作用域
    const previousScope = this.context.getCurrentScope();
    this.context.enterScope();

    // 绑定参数
    for (let i = 0; i < func.params.length; i++) {
      this.context.define(func.params[i], args[i]);
    }

    // 执行函数体
    let result: any = undefined;
    try {
      result = this.evaluate(func.body);
    } catch (error) {
      if (error instanceof ReturnException) {
        result = error.value;
      } else {
        throw error;
      }
    } finally {
      this.context.exitScope();
    }

    return result;
  }

  /**
   * 评估new表达式
   */
  private evaluateNewExpression(node: NewExpression): any {
    // 检查沙箱模式
    if (this.config.security.sandbox) {
      throw new RuntimeError("'new' is not allowed in sandbox mode");
    }

    const args = node.arguments.map(arg => this.evaluate(arg));
    const constructor = this.evaluate(node.callee);

    if (typeof constructor !== 'function') {
      throw new RuntimeError('Expression is not a constructor');
    }

    return new constructor(...args);
  }

  /**
   * 评估箭头函数表达式
   */
  private evaluateArrowFunctionExpression(node: ArrowFunctionExpression): any {
    // 保存当前作用域作为闭包
    const closure = this.context.getCurrentScope().clone();
    
    // 提取参数名
    const params = node.params.map(param => {
      if (param.type === NodeType.Identifier) {
        return (param as Identifier).name;
      }
      throw new RuntimeError('Invalid parameter in arrow function');
    });

    // 创建可调用的函数对象
    const arrowFunc = (...args: any[]) => {
      // 保存当前作用域
      const previousScope = this.context.getCurrentScope();
      
      // 创建新的作用域，继承闭包
      this.context.enterScope();
      this.context.getCurrentScope().merge(closure);
      
      // 绑定参数
      for (let i = 0; i < params.length; i++) {
        this.context.define(params[i], args[i]);
      }
      
      // 执行函数体
      let result: any = undefined;
      try {
        result = this.evaluate(node.body);
      } catch (error) {
        if (error instanceof ReturnException) {
          result = error.value;
        } else {
          throw error;
        }
      } finally {
        // 恢复之前的作用域
        this.context.exitScope();
      }
      
      return result;
    };

    // 标记为箭头函数
    (arrowFunc as any).__isArrowFunction = true;
    (arrowFunc as any).__params = params;
    (arrowFunc as any).__body = node.body;
    (arrowFunc as any).__closure = closure;

    return arrowFunc;
  }

  /**
   * 评估IN表达式
   */
  private evaluateInExpression(node: InExpression): boolean {
    const element = this.evaluate(node.element);
    const container = this.evaluate(node.container);

    if (Array.isArray(container)) {
      return container.includes(element);
    }

    if (container instanceof Set) {
      return container.has(element);
    }

    if (typeof container === 'string') {
      return container.includes(String(element));
    }

    if (typeof container === 'object' && container !== null) {
      return element in container;
    }

    return false;
  }

  /**
   * 评估LIKE表达式
   */
  private evaluateLikeExpression(node: LikeExpression): boolean {
    const value = String(this.evaluate(node.value));
    const pattern = String(this.evaluate(node.pattern));

    // 将SQL风格的LIKE模式转换为正则表达式
    const regexPattern = pattern
      .replace(/[.+^${}()|[\]\\]/g, '\\$&') // 转义特殊字符
      .replace(/%/g, '.*')  // % 匹配任意字符序列
      .replace(/_/g, '.');  // _ 匹配单个字符

    const regex = new RegExp(`^${regexPattern}$`, 'i');
    return regex.test(value);
  }

  /**
   * 评估BETWEEN表达式
   */
  private evaluateBetweenExpression(node: BetweenExpression): boolean {
    const value = this.toNumber(this.evaluate(node.value));
    const low = this.toNumber(this.evaluate(node.low));
    const high = this.toNumber(this.evaluate(node.high));

    return value >= low && value <= high;
  }

  /**
   * 评估块语句
   */
  private evaluateBlockStatement(node: BlockStatement): any {
    let result: any = undefined;

    for (const statement of node.body) {
      result = this.evaluate(statement);
      if (result instanceof ReturnValue) {
        return result;
      }
    }

    return result;
  }

  /**
   * 评估if语句
   */
  private evaluateIfStatement(node: IfStatement): any {
    const test = this.evaluate(node.test);

    if (test) {
      return this.evaluate(node.consequent);
    } else if (node.alternate) {
      return this.evaluate(node.alternate);
    }

    return undefined;
  }

  /**
   * 评估while语句
   */
  private evaluateWhileStatement(node: WhileStatement): any {
    let result: any = undefined;

    while (this.evaluate(node.test)) {
      this.loopCount++;
      this.checkSecurity();

      try {
        result = this.evaluate(node.body);
      } catch (error) {
        if (error instanceof BreakException) {
          break;
        }
        if (error instanceof ContinueException) {
          continue;
        }
        throw error;
      }
    }

    return result;
  }

  /**
   * 评估for语句
   */
  private evaluateForStatement(node: ForStatement): any {
    // 初始化
    if (node.init) {
      this.evaluate(node.init);
    }

    let result: any = undefined;

    while (node.test ? this.evaluate(node.test) : true) {
      this.loopCount++;
      this.checkSecurity();

      try {
        result = this.evaluate(node.body);
      } catch (error) {
        if (error instanceof BreakException) {
          break;
        }
        if (error instanceof ContinueException) {
          // 继续执行更新语句
        } else {
          throw error;
        }
      }

      // 更新
      if (node.update) {
        this.evaluate(node.update);
      }
    }

    return result;
  }

  /**
   * 评估return语句
   */
  private evaluateReturnStatement(node: ReturnStatement): ReturnValue {
    const value = node.argument ? this.evaluate(node.argument) : undefined;
    throw new ReturnException(value);
  }

  /**
   * 评估函数声明
   */
  private evaluateFunctionDeclaration(node: FunctionDeclaration): void {
    const func: UserFunction = {
      name: node.id.name,
      params: node.params.map(p => p.name),
      body: node.body,
      closure: this.context.getCurrentScope()
    };

    this.userFunctions.set(func.name, func);
    this.context.define(func.name, func);
  }

  /**
   * 评估变量声明
   */
  private evaluateVariableDeclaration(node: VariableDeclaration): void {
    for (const declarator of node.declarations) {
      const value = declarator.init ? this.evaluate(declarator.init) : undefined;
      this.context.define(declarator.id.name, value);
    }
  }

  // ============ 辅助方法 ============

  /**
   * 转换为数字
   */
  private toNumber(value: any): number {
    if (typeof value === 'number') {
      return value;
    }
    if (typeof value === 'string') {
      const num = parseFloat(value);
      return isNaN(num) ? 0 : num;
    }
    if (typeof value === 'boolean') {
      return value ? 1 : 0;
    }
    return 0;
  }

  /**
   * 比较是否相等（弱类型）
   */
  private isEqual(left: any, right: any): boolean {
    // 同类型直接比较
    if (typeof left === typeof right) {
      return left === right;
    }

    // null 和 undefined 相等
    if (left == null && right == null) {
      return true;
    }

    // 数字和字符串比较
    if (typeof left === 'number' && typeof right === 'string') {
      return left === parseFloat(right);
    }
    if (typeof left === 'string' && typeof right === 'number') {
      return parseFloat(left) === right;
    }

    // 布尔值转换
    if (typeof left === 'boolean') {
      return this.isEqual(left ? 1 : 0, right);
    }
    if (typeof right === 'boolean') {
      return this.isEqual(left, right ? 1 : 0);
    }

    return left == right;
  }
}
