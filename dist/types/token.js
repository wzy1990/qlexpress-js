"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityError = exports.TimeoutError = exports.RuntimeError = exports.ParseError = exports.LexerError = exports.TokenType = void 0;
/**
 * Token类型枚举
 */
var TokenType;
(function (TokenType) {
    // 字面量
    TokenType["NUMBER"] = "NUMBER";
    TokenType["STRING"] = "STRING";
    TokenType["BOOLEAN"] = "BOOLEAN";
    TokenType["NULL"] = "NULL";
    TokenType["IDENTIFIER"] = "IDENTIFIER";
    // 关键字
    TokenType["IF"] = "IF";
    TokenType["THEN"] = "THEN";
    TokenType["ELSE"] = "ELSE";
    TokenType["FOR"] = "FOR";
    TokenType["WHILE"] = "WHILE";
    TokenType["BREAK"] = "BREAK";
    TokenType["CONTINUE"] = "CONTINUE";
    TokenType["RETURN"] = "RETURN";
    TokenType["FUNCTION"] = "FUNCTION";
    TokenType["IMPORT"] = "IMPORT";
    TokenType["NEW"] = "NEW";
    TokenType["IN"] = "IN";
    TokenType["LIKE"] = "LIKE";
    TokenType["BETWEEN"] = "BETWEEN";
    TokenType["AND"] = "AND";
    TokenType["OR"] = "OR";
    TokenType["NOT"] = "NOT";
    TokenType["MOD"] = "MOD";
    // 运算符
    TokenType["PLUS"] = "PLUS";
    TokenType["MINUS"] = "MINUS";
    TokenType["STAR"] = "STAR";
    TokenType["SLASH"] = "SLASH";
    TokenType["PERCENT"] = "PERCENT";
    // 比较运算符
    TokenType["EQ"] = "EQ";
    TokenType["NEQ"] = "NEQ";
    TokenType["LT"] = "LT";
    TokenType["GT"] = "GT";
    TokenType["LTE"] = "LTE";
    TokenType["GTE"] = "GTE";
    // 逻辑运算符
    TokenType["AND_OP"] = "AND_OP";
    TokenType["OR_OP"] = "OR_OP";
    TokenType["NOT_OP"] = "NOT_OP";
    // 位运算符
    TokenType["BIT_AND"] = "BIT_AND";
    TokenType["BIT_OR"] = "BIT_OR";
    TokenType["BIT_XOR"] = "BIT_XOR";
    TokenType["BIT_NOT"] = "BIT_NOT";
    TokenType["LSHIFT"] = "LSHIFT";
    TokenType["RSHIFT"] = "RSHIFT";
    TokenType["URSHIFT"] = "URSHIFT";
    // 赋值运算符
    TokenType["ASSIGN"] = "ASSIGN";
    TokenType["PLUS_ASSIGN"] = "PLUS_ASSIGN";
    TokenType["MINUS_ASSIGN"] = "MINUS_ASSIGN";
    TokenType["STAR_ASSIGN"] = "STAR_ASSIGN";
    TokenType["SLASH_ASSIGN"] = "SLASH_ASSIGN";
    TokenType["PERCENT_ASSIGN"] = "PERCENT_ASSIGN";
    // 自增自减
    TokenType["INCREMENT"] = "INCREMENT";
    TokenType["DECREMENT"] = "DECREMENT";
    // 三元运算符
    TokenType["QUESTION"] = "QUESTION";
    TokenType["COLON"] = "COLON";
    // 分隔符
    TokenType["LPAREN"] = "LPAREN";
    TokenType["RPAREN"] = "RPAREN";
    TokenType["LBRACE"] = "LBRACE";
    TokenType["RBRACE"] = "RBRACE";
    TokenType["LBRACKET"] = "LBRACKET";
    TokenType["RBRACKET"] = "RBRACKET";
    TokenType["COMMA"] = "COMMA";
    TokenType["SEMICOLON"] = "SEMICOLON";
    TokenType["DOT"] = "DOT";
    // 特殊
    TokenType["EOF"] = "EOF";
    TokenType["NEWLINE"] = "NEWLINE";
})(TokenType || (exports.TokenType = TokenType = {}));
/**
 * 词法分析错误
 */
class LexerError extends Error {
    constructor(message, line, column) {
        super(`Lexer Error at line ${line}, column ${column}: ${message}`);
        this.line = line;
        this.column = column;
        this.name = 'LexerError';
    }
}
exports.LexerError = LexerError;
/**
 * 语法分析错误
 */
class ParseError extends Error {
    constructor(message, token) {
        const location = token ? ` at line ${token.line}, column ${token.column}` : '';
        super(`Parse Error${location}: ${message}`);
        this.token = token;
        this.name = 'ParseError';
    }
}
exports.ParseError = ParseError;
/**
 * 运行时错误
 */
class RuntimeError extends Error {
    constructor(message, line, column) {
        const location = (line !== undefined && column !== undefined)
            ? ` at line ${line}, column ${column}`
            : '';
        super(`Runtime Error${location}: ${message}`);
        this.line = line;
        this.column = column;
        this.name = 'RuntimeError';
    }
}
exports.RuntimeError = RuntimeError;
/**
 * 超时错误
 */
class TimeoutError extends Error {
    constructor(timeout) {
        super(`Execution timeout after ${timeout}ms`);
        this.name = 'TimeoutError';
    }
}
exports.TimeoutError = TimeoutError;
/**
 * 安全限制错误
 */
class SecurityError extends Error {
    constructor(message) {
        super(`Security Error: ${message}`);
        this.name = 'SecurityError';
    }
}
exports.SecurityError = SecurityError;
