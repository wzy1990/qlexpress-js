import { ExecutionResult, IContext, RuntimeConfig } from '../types';
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
export declare class Interpreter {
    private context;
    private config;
    private traces;
    private loopCount;
    private startTime;
    private customFunctions;
    private customOperators;
    private macros;
    private userFunctions;
    constructor(context: RuntimeContext, config?: Partial<RuntimeConfig>);
    /**
     * 执行AST
     */
    execute(node: any): ExecutionResult;
    /**
     * 添加自定义函数
     */
    addFunction(name: string, handler: (...args: any[]) => any): void;
    /**
     * 添加用户定义函数（从外部加载）
     */
    addUserFunction(name: string, func: UserFunction): void;
    /**
     * 添加自定义操作符
     */
    addOperator(name: string, handler: (args: any[], context: IContext) => any): void;
    /**
     * 添加宏
     */
    addMacro(name: string, expression: string): void;
    /**
     * 检查安全限制
     */
    private checkSecurity;
    /**
     * 添加执行追踪
     */
    private addTrace;
    /**
     * 评估节点
     */
    private evaluate;
    /**
     * 评估程序
     */
    private evaluateProgram;
    /**
     * 评估标识符
     */
    private evaluateIdentifier;
    /**
     * 评估数组表达式
     */
    private evaluateArrayExpression;
    /**
     * 评估对象表达式
     */
    private evaluateObjectExpression;
    /**
     * 评估二元表达式
     */
    private evaluateBinaryExpression;
    /**
     * 评估一元表达式
     */
    private evaluateUnaryExpression;
    /**
     * 评估条件表达式
     */
    private evaluateConditionalExpression;
    /**
     * 评估赋值表达式
     */
    private evaluateAssignmentExpression;
    /**
     * 评估更新表达式
     */
    private evaluateUpdateExpression;
    /**
     * 评估成员访问表达式
     */
    private evaluateMemberExpression;
    /**
     * 评估函数调用表达式
     */
    private evaluateCallExpression;
    /**
     * 调用用户定义函数
     */
    private callUserFunction;
    /**
     * 评估new表达式
     */
    private evaluateNewExpression;
    /**
     * 评估箭头函数表达式
     */
    private evaluateArrowFunctionExpression;
    /**
     * 评估IN表达式
     */
    private evaluateInExpression;
    /**
     * 评估LIKE表达式
     */
    private evaluateLikeExpression;
    /**
     * 评估BETWEEN表达式
     */
    private evaluateBetweenExpression;
    /**
     * 评估块语句
     */
    private evaluateBlockStatement;
    /**
     * 评估if语句
     */
    private evaluateIfStatement;
    /**
     * 评估while语句
     */
    private evaluateWhileStatement;
    /**
     * 评估for语句
     */
    private evaluateForStatement;
    /**
     * 评估return语句
     */
    private evaluateReturnStatement;
    /**
     * 评估函数声明
     */
    private evaluateFunctionDeclaration;
    /**
     * 评估变量声明
     */
    private evaluateVariableDeclaration;
    /**
     * 转换为数字
     */
    private toNumber;
    /**
     * 比较是否相等（弱类型）
     */
    private isEqual;
}
export {};
