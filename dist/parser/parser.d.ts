import { Token, Program } from '../types';
/**
 * 语法分析器
 * 将Token流转换为抽象语法树(AST)
 */
export declare class Parser {
    private tokens;
    private current;
    private macros;
    private operatorAliases;
    constructor(tokens: Token[], macros?: Map<string, string>, operatorAliases?: Map<string, string>);
    /**
     * 解析表达式，返回AST
     */
    parse(): Program;
    /**
     * 解析语句
     */
    private parseStatement;
    /**
     * 解析if语句
     */
    private parseIfStatement;
    /**
     * 解析for语句
     */
    private parseForStatement;
    /**
     * 解析while语句
     */
    private parseWhileStatement;
    /**
     * 解析return语句
     */
    private parseReturnStatement;
    /**
     * 解析break语句
     */
    private parseBreakStatement;
    /**
     * 解析continue语句
     */
    private parseContinueStatement;
    /**
     * 解析函数声明
     */
    private parseFunctionDeclaration;
    /**
     * 解析import语句
     */
    private parseImportStatement;
    /**
     * 解析块语句
     */
    private parseBlockStatement;
    /**
     * 解析表达式语句
     */
    private parseExpressionStatement;
    /**
     * 解析表达式
     */
    private parseExpression;
    /**
     * 解析赋值表达式
     */
    private parseAssignment;
    /**
     * 解析条件表达式（三元运算符）
     */
    private parseConditional;
    /**
     * 解析逻辑或表达式
     */
    private parseLogicalOr;
    /**
     * 解析逻辑与表达式
     */
    private parseLogicalAnd;
    /**
     * 解析按位或表达式
     */
    private parseBitwiseOr;
    /**
     * 解析按位异或表达式
     */
    private parseBitwiseXor;
    /**
     * 解析按位与表达式
     */
    private parseBitwiseAnd;
    /**
     * 解析相等比较表达式
     */
    private parseEquality;
    /**
     * 解析比较表达式
     */
    private parseComparison;
    /**
     * 解析位移表达式
     */
    private parseShift;
    /**
     * 解析加减表达式
     */
    private parseAdditive;
    /**
     * 解析乘除表达式
     */
    private parseMultiplicative;
    /**
     * 解析一元表达式
     */
    private parseUnary;
    /**
     * 解析后缀表达式
     */
    private parsePostfix;
    /**
     * 解析函数调用和成员访问
     */
    private parseCall;
    /**
     * 完成函数调用
     */
    private finishCall;
    /**
     * 解析基本表达式
     */
    private parsePrimary;
    /**
     * 解析new表达式
     */
    private parseNewExpression;
    /**
     * 检查是否是箭头函数的参数列表
     */
    private isArrowParameterList;
    /**
     * 解析箭头函数的参数列表
     */
    private parseArrowParameters;
    /**
     * 解析箭头函数表达式（带参数列表）
     */
    private parseArrowFunctionWithParams;
    /**
     * 解析箭头函数表达式
     */
    private parseArrowFunction;
    /**
     * 解析数组表达式
     */
    private parseArrayExpression;
    /**
     * 解析对象表达式
     */
    private parseObjectExpression;
    /**
     * 检查是否是对象字面量
     * 对象字面量: { 后面跟着标识符/字符串/数字，然后是冒号
     */
    private isObjectLiteral;
    /**
     * 检查并跳过换行符
     */
    private skipNewlines;
    private peek;
    private peekNext;
    private previous;
    private advance;
    private isAtEnd;
    private check;
    /**
     * 匹配指定类型的 Token，会在匹配前跳过换行符
     */
    private match;
    private consume;
    private createLocation;
}
