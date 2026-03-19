/**
 * Token类型枚举
 */
export declare enum TokenType {
    NUMBER = "NUMBER",
    STRING = "STRING",
    BOOLEAN = "BOOLEAN",
    NULL = "NULL",
    IDENTIFIER = "IDENTIFIER",
    IF = "IF",
    THEN = "THEN",
    ELSE = "ELSE",
    FOR = "FOR",
    WHILE = "WHILE",
    BREAK = "BREAK",
    CONTINUE = "CONTINUE",
    RETURN = "RETURN",
    FUNCTION = "FUNCTION",
    IMPORT = "IMPORT",
    NEW = "NEW",
    IN = "IN",
    LIKE = "LIKE",
    BETWEEN = "BETWEEN",
    AND = "AND",
    OR = "OR",
    NOT = "NOT",
    MOD = "MOD",
    PLUS = "PLUS",// +
    MINUS = "MINUS",// -
    STAR = "STAR",// *
    SLASH = "SLASH",// /
    PERCENT = "PERCENT",// %
    EQ = "EQ",// ==
    NEQ = "NEQ",// != 或 <>
    LT = "LT",// <
    GT = "GT",// >
    LTE = "LTE",// <=
    GTE = "GTE",// >=
    AND_OP = "AND_OP",// &&
    OR_OP = "OR_OP",// ||
    NOT_OP = "NOT_OP",// !
    BIT_AND = "BIT_AND",// &
    BIT_OR = "BIT_OR",// |
    BIT_XOR = "BIT_XOR",// ^
    BIT_NOT = "BIT_NOT",// ~
    LSHIFT = "LSHIFT",// <<
    RSHIFT = "RSHIFT",// >>
    URSHIFT = "URSHIFT",// >>>
    ASSIGN = "ASSIGN",// =
    PLUS_ASSIGN = "PLUS_ASSIGN",// +=
    MINUS_ASSIGN = "MINUS_ASSIGN",// -=
    STAR_ASSIGN = "STAR_ASSIGN",// *=
    SLASH_ASSIGN = "SLASH_ASSIGN",// /=
    PERCENT_ASSIGN = "PERCENT_ASSIGN",// %=
    INCREMENT = "INCREMENT",// ++
    DECREMENT = "DECREMENT",// --
    QUESTION = "QUESTION",// ?
    COLON = "COLON",// :
    LPAREN = "LPAREN",// (
    RPAREN = "RPAREN",// )
    LBRACE = "LBRACE",// {
    RBRACE = "RBRACE",// }
    LBRACKET = "LBRACKET",// [
    RBRACKET = "RBRACKET",// ]
    COMMA = "COMMA",// ,
    SEMICOLON = "SEMICOLON",// ;
    DOT = "DOT",// .
    EOF = "EOF",
    NEWLINE = "NEWLINE"
}
/**
 * Token结构
 */
export interface Token {
    type: TokenType;
    value: any;
    line: number;
    column: number;
    raw?: string;
}
/**
 * 词法分析错误
 */
export declare class LexerError extends Error {
    line: number;
    column: number;
    constructor(message: string, line: number, column: number);
}
/**
 * 语法分析错误
 */
export declare class ParseError extends Error {
    token?: Token;
    constructor(message: string, token?: Token);
}
/**
 * 运行时错误
 */
export declare class RuntimeError extends Error {
    line?: number;
    column?: number;
    constructor(message: string, line?: number, column?: number);
}
/**
 * 超时错误
 */
export declare class TimeoutError extends Error {
    constructor(timeout: number);
}
/**
 * 安全限制错误
 */
export declare class SecurityError extends Error {
    constructor(message: string);
}
