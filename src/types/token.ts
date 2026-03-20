/**
 * Token类型枚举
 */
export enum TokenType {
  // 字面量
  NUMBER = 'NUMBER',
  STRING = 'STRING',
  BOOLEAN = 'BOOLEAN',
  NULL = 'NULL',
  IDENTIFIER = 'IDENTIFIER',

  // 关键字
  IF = 'IF',
  THEN = 'THEN',
  ELSE = 'ELSE',
  FOR = 'FOR',
  WHILE = 'WHILE',
  BREAK = 'BREAK',
  CONTINUE = 'CONTINUE',
  RETURN = 'RETURN',
  FUNCTION = 'FUNCTION',
  IMPORT = 'IMPORT',
  NEW = 'NEW',
  IN = 'IN',
  LIKE = 'LIKE',
  BETWEEN = 'BETWEEN',
  AND = 'AND',
  OR = 'OR',
  NOT = 'NOT',
  MOD = 'MOD',

  // 运算符
  PLUS = 'PLUS',           // +
  MINUS = 'MINUS',         // -
  STAR = 'STAR',           // *
  SLASH = 'SLASH',         // /
  PERCENT = 'PERCENT',     // %

  // 比较运算符
  EQ = 'EQ',               // ==
  NEQ = 'NEQ',             // != 或 <>
  LT = 'LT',               // <
  GT = 'GT',               // >
  LTE = 'LTE',             // <=
  GTE = 'GTE',             // >=

  // 逻辑运算符
  AND_OP = 'AND_OP',       // &&
  OR_OP = 'OR_OP',         // ||
  NOT_OP = 'NOT_OP',       // !

  // 位运算符
  BIT_AND = 'BIT_AND',     // &
  BIT_OR = 'BIT_OR',       // |
  BIT_XOR = 'BIT_XOR',     // ^
  BIT_NOT = 'BIT_NOT',     // ~
  LSHIFT = 'LSHIFT',       // <<
  RSHIFT = 'RSHIFT',       // >>
  URSHIFT = 'URSHIFT',     // >>>

  // 赋值运算符
  ASSIGN = 'ASSIGN',       // =
  PLUS_ASSIGN = 'PLUS_ASSIGN',     // +=
  MINUS_ASSIGN = 'MINUS_ASSIGN',   // -=
  STAR_ASSIGN = 'STAR_ASSIGN',     // *=
  SLASH_ASSIGN = 'SLASH_ASSIGN',   // /=
  PERCENT_ASSIGN = 'PERCENT_ASSIGN', // %=

  // 自增自减
  INCREMENT = 'INCREMENT', // ++
  DECREMENT = 'DECREMENT', // --

  // 三元运算符
  QUESTION = 'QUESTION',   // ?
  COLON = 'COLON',         // :

  // 箭头函数
  ARROW = 'ARROW',         // =>

  // 分隔符
  LPAREN = 'LPAREN',       // (
  RPAREN = 'RPAREN',       // )
  LBRACE = 'LBRACE',       // {
  RBRACE = 'RBRACE',       // }
  LBRACKET = 'LBRACKET',   // [
  RBRACKET = 'RBRACKET',   // ]
  COMMA = 'COMMA',         // ,
  SEMICOLON = 'SEMICOLON', // ;
  DOT = 'DOT',             // .

  // 特殊
  EOF = 'EOF',
  NEWLINE = 'NEWLINE'
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
export class LexerError extends Error {
  constructor(message: string, public line: number, public column: number) {
    super(`Lexer Error at line ${line}, column ${column}: ${message}`);
    this.name = 'LexerError';
  }
}

/**
 * 语法分析错误
 */
export class ParseError extends Error {
  constructor(message: string, public token?: Token) {
    const location = token ? ` at line ${token.line}, column ${token.column}` : '';
    super(`Parse Error${location}: ${message}`);
    this.name = 'ParseError';
  }
}

/**
 * 运行时错误
 */
export class RuntimeError extends Error {
  constructor(message: string, public line?: number, public column?: number) {
    const location = (line !== undefined && column !== undefined)
      ? ` at line ${line}, column ${column}`
      : '';
    super(`Runtime Error${location}: ${message}`);
    this.name = 'RuntimeError';
  }
}

/**
 * 超时错误
 */
export class TimeoutError extends Error {
  constructor(timeout: number) {
    super(`Execution timeout after ${timeout}ms`);
    this.name = 'TimeoutError';
  }
}

/**
 * 安全限制错误
 */
export class SecurityError extends Error {
  constructor(message: string) {
    super(`Security Error: ${message}`);
    this.name = 'SecurityError';
  }
}
