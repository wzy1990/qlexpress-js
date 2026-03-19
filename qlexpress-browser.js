/**
 * QLExpress-JS 浏达式引擎 - 浏览器版本
 * 将表达式引擎打包为单文件以便在浏览器中使用
 */

(function(global) {
  'use strict';

  // ============ Token类型 ============
  const TokenType = {
    NUMBER: 'NUMBER',
    STRING: 'STRING',
    BOOLEAN: 'BOOLEAN',
    NULL: 'NULL',
    IDENTIFIER: 'IDENTIFIER',
    IF: 'IF',
    THEN: 'THEN',
    ELSE: 'ELSE',
    FOR: 'FOR',
    WHILE: 'WHILE',
    BREAK: 'BREAK',
    CONTINUE: 'CONTINUE',
    RETURN: 'RETURN',
    FUNCTION: 'FUNCTION',
    IMPORT: 'IMPORT',
    NEW: 'NEW',
    IN: 'IN',
    LIKE: 'LIKE',
    BETWEEN: 'BETWEEN',
    AND: 'AND',
    OR: 'OR',
    NOT: 'NOT',
    MOD: 'MOD',
    PLUS: 'PLUS',
    MINUS: 'MINUS',
    STAR: 'STAR',
    SLASH: 'SLASH',
    PERCENT: 'PERCENT',
    EQ: 'EQ',
    NEQ: 'NEQ',
    LT: 'LT',
    GT: 'GT',
    LTE: 'LTE',
    GTE: 'GTE',
    AND_OP: 'AND_OP',
    OR_OP: 'OR_OP',
    NOT_OP: 'NOT_OP',
    BIT_AND: 'BIT_AND',
    BIT_OR: 'BIT_OR',
    BIT_XOR: 'BIT_XOR',
    BIT_NOT: 'BIT_NOT',
    LSHIFT: 'LSHIFT',
    RSHIFT: 'RSHIFT',
    URSHIFT: 'URSHIFT',
    ASSIGN: 'ASSIGN',
    PLUS_ASSIGN: 'PLUS_ASSIGN',
    MINUS_ASSIGN: 'MINUS_ASSIGN',
    STAR_ASSIGN: 'STAR_ASSIGN',
    SLASH_ASSIGN: 'SLASH_ASSIGN',
    PERCENT_ASSIGN: 'PERCENT_ASSIGN',
    INCREMENT: 'INCREMENT',
    DECREMENT: 'DECREMENT',
    QUESTION: 'QUESTION',
    COLON: 'COLON',
    LPAREN: 'LPAREN',
    RPAREN: 'RPAREN',
    LBRACE: 'LBRACE',
    RBRACE: 'RBRACE',
    LBRACKET: 'LBRACKET',
    RBRACKET: 'RBRACKET',
    COMMA: 'COMMA',
    SEMICOLON: 'SEMICOLON',
    DOT: 'DOT',
    EOF: 'EOF',
    NEWLINE: 'NEWLINE'
  };

  // ============ 词法分析器 ============
  class LexerError extends Error {
    constructor(message, line, column) {
      super(`Lexer Error at line ${line}, column ${column}: ${message}`);
      this.name = 'LexerError';
    }
  }

  const KEYWORDS = {
    'if': TokenType.IF,
    'then': TokenType.THEN,
    'else': TokenType.ELSE,
    'for': TokenType.FOR,
    'while': TokenType.WHILE,
    'break': TokenType.BREAK,
    'continue': TokenType.CONTINUE,
    'return': TokenType.RETURN,
    'function': TokenType.FUNCTION,
    'import': TokenType.IMPORT,
    'new': TokenType.NEW,
    'in': TokenType.IN,
    'like': TokenType.LIKE,
    'between': TokenType.BETWEEN,
    'and': TokenType.AND,
    'or': TokenType.OR,
    'not': TokenType.NOT,
    'mod': TokenType.MOD,
    'true': TokenType.BOOLEAN,
    'false': TokenType.BOOLEAN,
    'null': TokenType.NULL,
    'undefined': TokenType.NULL
  };

  const OPERATORS = {
    '+': TokenType.PLUS,
    '-': TokenType.MINUS,
    '*': TokenType.STAR,
    '/': TokenType.SLASH,
    '%': TokenType.PERCENT,
    '=': TokenType.ASSIGN,
    '<': TokenType.LT,
    '>': TokenType.GT,
    '!': TokenType.NOT_OP,
    '&': TokenType.BIT_AND,
    '|': TokenType.BIT_OR,
    '^': TokenType.BIT_XOR,
    '~': TokenType.BIT_NOT,
    '?': TokenType.QUESTION,
    ':': TokenType.COLON,
    '(': TokenType.LPAREN,
    ')': TokenType.RPAREN,
    '{': TokenType.LBRACE,
    '}': TokenType.RBRACE,
    '[': TokenType.LBRACKET,
    ']': TokenType.RBRACKET,
    ',': TokenType.COMMA,
    ';': TokenType.SEMICOLON,
    '.': TokenType.DOT
  };

  class Lexer {
    constructor(source) {
      this.source = source;
      this.tokens = [];
      this.start = 0;
      this.current = 0;
      this.line = 1;
      this.column = 1;
      this.startColumn = 1;
    }

    tokenize() {
      while (!this.isAtEnd()) {
        this.start = this.current;
        this.startColumn = this.column;
        this.scanToken();
      }
      this.addToken(TokenType.EOF, null);
      return this.tokens;
    }

    scanToken() {
      const char = this.advance();

      if (this.isWhitespace(char)) {
        if (char === '\n') {
          this.addToken(TokenType.NEWLINE, null);
          this.line++;
          this.column = 1;
        }
        return;
      }

      if (OPERATORS[char] !== undefined) {
        this.scanOperator(char);
        return;
      }

      if (this.isDigit(char)) {
        this.scanNumber();
        return;
      }

      if (char === '"' || char === "'" || char === '`') {
        this.scanString(char);
        return;
      }

      if (this.isAlpha(char) || char === '_' || char === '$') {
        this.scanIdentifier();
        return;
      }

      if (char === '/') {
        if (this.match('*')) {
          this.scanBlockComment();
          return;
        }
        if (this.match('/')) {
          this.scanLineComment();
          return;
        }
      }

      throw new LexerError(`Unexpected character: ${char}`, this.line, this.column);
    }

    scanOperator(char) {
      switch (char) {
        case '+':
          if (this.match('+')) {
            this.addToken(TokenType.INCREMENT, '++');
          } else if (this.match('=')) {
            this.addToken(TokenType.PLUS_ASSIGN, '+=');
          } else {
            this.addToken(TokenType.PLUS, '+');
          }
          break;
        case '-':
          if (this.match('-')) {
            this.addToken(TokenType.DECREMENT, '--');
          } else if (this.match('=')) {
            this.addToken(TokenType.MINUS_ASSIGN, '-=');
          } else {
            this.addToken(TokenType.MINUS, '-');
          }
          break;
        case '*':
          if (this.match('=')) {
            this.addToken(TokenType.STAR_ASSIGN, '*=');
          } else {
            this.addToken(TokenType.STAR, '*');
          }
          break;
        case '/':
          if (this.match('=')) {
            this.addToken(TokenType.SLASH_ASSIGN, '/=');
          } else {
            this.addToken(TokenType.SLASH, '/');
          }
          break;
        case '%':
          if (this.match('=')) {
            this.addToken(TokenType.PERCENT_ASSIGN, '%=');
          } else {
            this.addToken(TokenType.PERCENT, '%');
          }
          break;
        case '=':
          if (this.match('=')) {
            if (this.match('=')) {
              this.addToken(TokenType.EQ, '===');
            } else {
              this.addToken(TokenType.EQ, '==');
            }
          } else if (this.match('>')) {
            this.addToken(TokenType.COLON, '=>');
          } else {
            this.addToken(TokenType.ASSIGN, '=');
          }
          break;
        case '!':
          if (this.match('=')) {
            if (this.match('=')) {
              this.addToken(TokenType.NEQ, '!==');
            } else {
              this.addToken(TokenType.NEQ, '!=');
            }
          } else {
            this.addToken(TokenType.NOT_OP, '!');
          }
          break;
        case '<':
          if (this.match('=')) {
            this.addToken(TokenType.LTE, '<=');
          } else if (this.match('<')) {
            if (this.match('=')) {
              this.addToken(TokenType.ASSIGN, '<<=');
            } else {
              this.addToken(TokenType.LSHIFT, '<<');
            }
          } else if (this.match('>')) {
            this.addToken(TokenType.NEQ, '<>');
          } else {
            this.addToken(TokenType.LT, '<');
          }
          break;
        case '>':
          if (this.match('=')) {
            this.addToken(TokenType.GTE, '>=');
          } else if (this.match('>')) {
            if (this.match('>')) {
              if (this.match('=')) {
                this.addToken(TokenType.ASSIGN, '>>>=');
              } else {
                this.addToken(TokenType.URSHIFT, '>>>');
              }
            } else if (this.match('=')) {
              this.addToken(TokenType.ASSIGN, '>>=');
            } else {
              this.addToken(TokenType.RSHIFT, '>>');
            }
          } else {
            this.addToken(TokenType.GT, '>');
          }
          break;
        case '&':
          if (this.match('&')) {
            this.addToken(TokenType.AND_OP, '&&');
          } else if (this.match('=')) {
            this.addToken(TokenType.ASSIGN, '&=');
          } else {
            this.addToken(TokenType.BIT_AND, '&');
          }
          break;
        case '|':
          if (this.match('|')) {
            this.addToken(TokenType.OR_OP, '||');
          } else if (this.match('=')) {
            this.addToken(TokenType.ASSIGN, '|=');
          } else {
            this.addToken(TokenType.BIT_OR, '|');
          }
          break;
        case '^':
          if (this.match('=')) {
            this.addToken(TokenType.ASSIGN, '^=');
          } else {
            this.addToken(TokenType.BIT_XOR, '^');
          }
          break;
        default:
          this.addToken(OPERATORS[char], char);
      }
    }

    scanNumber() {
      let isFloat = false;
      let isHex = false;
      let isBinary = false;
      let isOctal = false;

      if (this.source[this.start] === '0') {
        if (this.match('x') || this.match('X')) {
          isHex = true;
          while (this.isHexDigit(this.peek())) {
            this.advance();
          }
        } else if (this.match('b') || this.match('B')) {
          isBinary = true;
          while (this.peek() === '0' || this.peek() === '1') {
            this.advance();
          }
        } else if (this.match('o') || this.match('O')) {
          isOctal = true;
          while (this.isOctalDigit(this.peek())) {
            this.advance();
          }
        }
      }

      if (!isHex && !isBinary && !isOctal) {
        while (this.isDigit(this.peek())) {
          this.advance();
        }

        if (this.peek() === '.' && this.isDigit(this.peekNext())) {
          isFloat = true;
          this.advance();
          while (this.isDigit(this.peek())) {
            this.advance();
          }
        }

        if (this.peek() === 'e' || this.peek() === 'E') {
          isFloat = true;
          this.advance();
          if (this.peek() === '+' || this.peek() === '-') {
            this.advance();
          }
          while (this.isDigit(this.peek())) {
            this.advance();
          }
        }
      }

      const raw = this.source.substring(this.start, this.current);
      let value;

      if (isHex) {
        value = parseInt(raw, 16);
      } else if (isBinary) {
        value = parseInt(raw.substring(2), 2);
      } else if (isOctal) {
        value = parseInt(raw.substring(2), 8);
      } else {
        value = parseFloat(raw);
      }

      this.addToken(TokenType.NUMBER, value, raw);
    }

    scanString(quote) {
      let value = '';
      let raw = quote;

      while (!this.isAtEnd() && this.peek() !== quote) {
        if (this.peek() === '\n') {
          if (quote !== '`') {
            throw new LexerError('Unterminated string', this.line, this.column);
          }
          this.line++;
          this.column = 0;
        }

        if (this.peek() === '\\') {
          raw += this.advance();
          if (this.isAtEnd()) {
            throw new LexerError('Unterminated string', this.line, this.column);
          }
          const escaped = this.advance();
          raw += escaped;
          switch (escaped) {
            case 'n': value += '\n'; break;
            case 'r': value += '\r'; break;
            case 't': value += '\t'; break;
            case 'b': value += '\b'; break;
            case 'f': value += '\f'; break;
            case 'v': value += '\v'; break;
            case '0': value += '\0'; break;
            case 'x': {
              let hex = '';
              for (let i = 0; i < 2 && this.isHexDigit(this.peek()); i++) {
                hex += this.advance();
                raw += hex[hex.length - 1];
              }
              value += String.fromCharCode(parseInt(hex, 16));
              break;
            }
            case 'u': {
              let unicode = '';
              if (this.peek() === '{') {
                this.advance();
                raw += '{';
                while (!this.isAtEnd() && this.peek() !== '}') {
                  unicode += this.advance();
                  raw += unicode[unicode.length - 1];
                }
                if (this.peek() === '}') {
                  this.advance();
                  raw += '}';
                }
              } else {
                for (let i = 0; i < 4 && this.isHexDigit(this.peek()); i++) {
                  unicode += this.advance();
                  raw += unicode[unicode.length - 1];
                }
              }
              value += String.fromCharCode(parseInt(unicode, 16));
              break;
            }
            default:
              value += escaped;
          }
        } else {
          const char = this.advance();
          value += char;
          raw += char;
        }
      }

      if (this.isAtEnd()) {
        throw new LexerError('Unterminated string', this.line, this.column);
      }

      this.advance();
      raw += quote;

      this.addToken(TokenType.STRING, value, raw);
    }

    scanIdentifier() {
      while (this.isAlphaNumeric(this.peek())) {
        this.advance();
      }

      const text = this.source.substring(this.start, this.current);
      let type = KEYWORDS[text.toLowerCase()];

      if (type === undefined) {
        type = TokenType.IDENTIFIER;
      }

      if (type === TokenType.BOOLEAN) {
        this.addToken(type, text.toLowerCase() === 'true', text);
      } else if (type === TokenType.NULL) {
        this.addToken(type, text.toLowerCase() === 'undefined' ? undefined : null, text);
      } else {
        this.addToken(type, text);
      }
    }

    scanBlockComment() {
      while (!this.isAtEnd()) {
        if (this.peek() === '*' && this.peekNext() === '/') {
          this.advance();
          this.advance();
          return;
        }
        if (this.peek() === '\n') {
          this.line++;
          this.column = 0;
        }
        this.advance();
      }
      throw new LexerError('Unterminated block comment', this.line, this.column);
    }

    scanLineComment() {
      while (!this.isAtEnd() && this.peek() !== '\n') {
        this.advance();
      }
    }

    advance() {
      const char = this.source[this.current++];
      this.column++;
      return char;
    }

    peek() {
      if (this.isAtEnd()) return '\0';
      return this.source[this.current];
    }

    peekNext() {
      if (this.current + 1 >= this.source.length) return '\0';
      return this.source[this.current + 1];
    }

    match(expected) {
      if (this.isAtEnd()) return false;
      if (this.source[this.current] !== expected) return false;
      this.current++;
      this.column++;
      return true;
    }

    isAtEnd() {
      return this.current >= this.source.length;
    }

    isWhitespace(char) {
      return char === ' ' || char === '\t' || char === '\r' || char === '\n';
    }

    isDigit(char) {
      return char >= '0' && char <= '9';
    }

    isHexDigit(char) {
      return (char >= '0' && char <= '9') ||
             (char >= 'a' && char <= 'f') ||
             (char >= 'A' && char <= 'F');
    }

    isOctalDigit(char) {
      return char >= '0' && char <= '7';
    }

    isAlpha(char) {
      return (char >= 'a' && char <= 'z') ||
             (char >= 'A' && char <= 'Z') ||
             (char.charCodeAt(0) >= 0x4e00 && char.charCodeAt(0) <= 0x9fff);
    }

    isAlphaNumeric(char) {
      return this.isAlpha(char) || this.isDigit(char) || char === '_' || char === '$';
    }

    addToken(type, value, raw) {
      this.tokens.push({
        type,
        value,
        line: this.line,
        column: this.startColumn,
        raw: raw !== undefined ? raw : String(value)
      });
    }
  }

  // ============ AST节点类型 ============
  const NodeType = {
    NumberLiteral: 'NumberLiteral',
    StringLiteral: 'StringLiteral',
    BooleanLiteral: 'BooleanLiteral',
    NullLiteral: 'NullLiteral',
    Identifier: 'Identifier',
    ArrayExpression: 'ArrayExpression',
    ObjectExpression: 'ObjectExpression',
    BinaryExpression: 'BinaryExpression',
    UnaryExpression: 'UnaryExpression',
    ConditionalExpression: 'ConditionalExpression',
    AssignmentExpression: 'AssignmentExpression',
    UpdateExpression: 'UpdateExpression',
    MemberExpression: 'MemberExpression',
    CallExpression: 'CallExpression',
    NewExpression: 'NewExpression',
    InExpression: 'InExpression',
    LikeExpression: 'LikeExpression',
    BetweenExpression: 'BetweenExpression',
    Program: 'Program',
    ExpressionStatement: 'ExpressionStatement',
    BlockStatement: 'BlockStatement',
    IfStatement: 'IfStatement',
    WhileStatement: 'WhileStatement',
    ForStatement: 'ForStatement',
    ReturnStatement: 'ReturnStatement',
    BreakStatement: 'BreakStatement',
    ContinueStatement: 'ContinueStatement',
    VariableDeclaration: 'VariableDeclaration',
    FunctionDeclaration: 'FunctionDeclaration',
    ImportStatement: 'ImportStatement'
  };

  // ============ 错误类型 ============
  class ParseError extends Error {
    constructor(message, token) {
      const location = token ? ` at line ${token.line}, column ${token.column}` : '';
      super(`Parse Error${location}: ${message}`);
      this.name = 'ParseError';
    }
  }

  class RuntimeError extends Error {
    constructor(message, line, column) {
      const location = (line !== undefined && column !== undefined)
        ? ` at line ${line}, column ${column}`
        : '';
      super(`Runtime Error${location}: ${message}`);
      this.name = 'RuntimeError';
    }
  }

  class ReturnValue {
    constructor(value) {
      this.value = value;
    }
  }

  class BreakException extends Error {
    constructor() {
      super('break');
      this.name = 'BreakException';
    }
  }

  class ContinueException extends Error {
    constructor() {
      super('continue');
      this.name = 'ContinueException';
    }
  }

  class ReturnException extends Error {
    constructor(value) {
      super('return');
      this.value = value;
      this.name = 'ReturnException';
    }
  }

  // ============ 语法分析器 ============
  class Parser {
    constructor(tokens, macros, operatorAliases) {
      this.tokens = tokens;
      this.current = 0;
      this.macros = macros || new Map();
      this.operatorAliases = operatorAliases || new Map();
    }

    parse() {
      const body = [];
      while (!this.isAtEnd()) {
        const stmt = this.parseStatement();
        if (stmt) {
          body.push(stmt);
        }
      }
      return { type: NodeType.Program, body };
    }

    parseStatement() {
      while (this.check(TokenType.NEWLINE)) {
        this.advance();
      }

      if (this.isAtEnd()) return null;

      const token = this.peek();

      switch (token.type) {
        case TokenType.IF:
          return this.parseIfStatement();
        case TokenType.FOR:
          return this.parseForStatement();
        case TokenType.WHILE:
          return this.parseWhileStatement();
        case TokenType.RETURN:
          return this.parseReturnStatement();
        case TokenType.BREAK:
          return this.parseBreakStatement();
        case TokenType.CONTINUE:
          return this.parseContinueStatement();
        case TokenType.FUNCTION:
          return this.parseFunctionDeclaration();
        case TokenType.IMPORT:
          return this.parseImportStatement();
        case TokenType.LBRACE:
          if (this.isObjectLiteral()) {
            return this.parseExpressionStatement();
          }
          return this.parseBlockStatement();
        case TokenType.SEMICOLON:
          this.advance();
          return null;
        default:
          return this.parseExpressionStatement();
      }
    }

    isObjectLiteral() {
      const savedCurrent = this.current;
      this.advance();

      while (this.check(TokenType.NEWLINE)) {
        this.advance();
      }

      const firstToken = this.peek();
      let isObject = false;

      if (firstToken.type === TokenType.IDENTIFIER ||
          firstToken.type === TokenType.STRING ||
          firstToken.type === TokenType.NUMBER) {
        this.advance();
        if (this.check(TokenType.COLON)) {
          isObject = true;
        }
      } else if (firstToken.type === TokenType.RBRACE) {
        isObject = true;
      }

      this.current = savedCurrent;
      return isObject;
    }

    parseIfStatement() {
      const token = this.advance();

      this.consume(TokenType.LPAREN, "Expect '(' after 'if'");
      const test = this.parseExpression();
      this.consume(TokenType.RPAREN, "Expect ')' after condition");

      if (this.check(TokenType.THEN)) {
        this.advance();
      }

      while (this.check(TokenType.NEWLINE)) {
        this.advance();
      }

      const consequent = this.parseStatement() || { type: NodeType.BlockStatement, body: [] };

      while (this.check(TokenType.NEWLINE)) {
        this.advance();
      }

      let alternate = null;
      if (this.check(TokenType.ELSE)) {
        this.advance();
        while (this.check(TokenType.NEWLINE)) {
          this.advance();
        }
        alternate = this.parseStatement() || { type: NodeType.BlockStatement, body: [] };
      }

      return {
        type: NodeType.IfStatement,
        test,
        consequent,
        alternate,
        loc: this.createLocation(token)
      };
    }

    parseForStatement() {
      const token = this.advance();

      this.consume(TokenType.LPAREN, "Expect '(' after 'for'");

      let init = null;
      if (!this.check(TokenType.SEMICOLON)) {
        init = this.parseExpression();
      }
      this.consume(TokenType.SEMICOLON, "Expect ';' after for init");

      let test = null;
      if (!this.check(TokenType.SEMICOLON)) {
        test = this.parseExpression();
      }
      this.consume(TokenType.SEMICOLON, "Expect ';' after for condition");

      let update = null;
      if (!this.check(TokenType.RPAREN)) {
        update = this.parseExpression();
      }
      this.consume(TokenType.RPAREN, "Expect ')' after for clauses");

      while (this.check(TokenType.NEWLINE)) {
        this.advance();
      }

      const body = this.parseStatement() || { type: NodeType.BlockStatement, body: [] };

      return {
        type: NodeType.ForStatement,
        init,
        test,
        update,
        body,
        loc: this.createLocation(token)
      };
    }

    parseWhileStatement() {
      const token = this.advance();

      this.consume(TokenType.LPAREN, "Expect '(' after 'while'");
      const test = this.parseExpression();
      this.consume(TokenType.RPAREN, "Expect ')' after condition");

      while (this.check(TokenType.NEWLINE)) {
        this.advance();
      }

      const body = this.parseStatement() || { type: NodeType.BlockStatement, body: [] };

      return {
        type: NodeType.WhileStatement,
        test,
        body,
        loc: this.createLocation(token)
      };
    }

    parseReturnStatement() {
      const token = this.advance();

      let argument = null;
      if (!this.check(TokenType.SEMICOLON) && !this.check(TokenType.NEWLINE) && 
          !this.check(TokenType.RBRACE) && !this.isAtEnd()) {
        argument = this.parseExpression();
      }

      if (this.check(TokenType.SEMICOLON)) {
        this.advance();
      }

      return {
        type: NodeType.ReturnStatement,
        argument,
        loc: this.createLocation(token)
      };
    }

    parseBreakStatement() {
      const token = this.advance();
      if (this.check(TokenType.SEMICOLON)) {
        this.advance();
      }
      return { type: NodeType.BreakStatement, loc: this.createLocation(token) };
    }

    parseContinueStatement() {
      const token = this.advance();
      if (this.check(TokenType.SEMICOLON)) {
        this.advance();
      }
      return { type: NodeType.ContinueStatement, loc: this.createLocation(token) };
    }

    parseFunctionDeclaration() {
      const token = this.advance();

      const nameToken = this.consume(TokenType.IDENTIFIER, "Expect function name");
      const name = { type: NodeType.Identifier, name: nameToken.value, loc: this.createLocation(nameToken) };

      this.consume(TokenType.LPAREN, "Expect '(' after function name");

      const params = [];
      if (!this.check(TokenType.RPAREN)) {
        do {
          const paramToken = this.consume(TokenType.IDENTIFIER, "Expect parameter name");
          params.push({ type: NodeType.Identifier, name: paramToken.value, loc: this.createLocation(paramToken) });
        } while (this.match(TokenType.COMMA));
      }

      this.consume(TokenType.RPAREN, "Expect ')' after parameters");

      while (this.check(TokenType.NEWLINE)) {
        this.advance();
      }

      const body = this.parseBlockStatement();

      return {
        type: NodeType.FunctionDeclaration,
        id: name,
        params,
        body,
        loc: this.createLocation(token)
      };
    }

    parseImportStatement() {
      const token = this.advance();
      const source = this.parsePrimary();
      return { type: NodeType.ImportStatement, source, loc: this.createLocation(token) };
    }

    parseBlockStatement() {
      const token = this.advance();

      const body = [];
      while (!this.check(TokenType.RBRACE) && !this.isAtEnd()) {
        while (this.check(TokenType.NEWLINE)) {
          this.advance();
        }
        if (this.check(TokenType.RBRACE)) break;

        const stmt = this.parseStatement();
        if (stmt) {
          body.push(stmt);
        }
      }

      this.consume(TokenType.RBRACE, "Expect '}' after block");

      return { type: NodeType.BlockStatement, body, loc: this.createLocation(token) };
    }

    parseExpressionStatement() {
      const expr = this.parseExpression();
      if (this.check(TokenType.SEMICOLON)) {
        this.advance();
      }
      return { type: NodeType.ExpressionStatement, expression: expr };
    }

    parseExpression() {
      return this.parseAssignment();
    }

    parseAssignment() {
      const expr = this.parseConditional();

      if (this.check(TokenType.ASSIGN) ||
          this.check(TokenType.PLUS_ASSIGN) ||
          this.check(TokenType.MINUS_ASSIGN) ||
          this.check(TokenType.STAR_ASSIGN) ||
          this.check(TokenType.SLASH_ASSIGN) ||
          this.check(TokenType.PERCENT_ASSIGN)) {
        const operator = this.advance().value;
        const value = this.parseAssignment();

        return {
          type: NodeType.AssignmentExpression,
          operator,
          left: expr,
          right: value,
          loc: this.createLocation(expr)
        };
      }

      return expr;
    }

    parseConditional() {
      const expr = this.parseLogicalOr();

      if (this.check(TokenType.QUESTION)) {
        this.advance();
        const consequent = this.parseExpression();
        this.consume(TokenType.COLON, "Expect ':' in conditional expression");
        const alternate = this.parseConditional();

        return {
          type: NodeType.ConditionalExpression,
          test: expr,
          consequent,
          alternate,
          loc: this.createLocation(expr)
        };
      }

      return expr;
    }

    parseLogicalOr() {
      let left = this.parseLogicalAnd();

      while (this.match(TokenType.OR_OP) || this.match(TokenType.OR)) {
        const operator = this.previous().value;
        const right = this.parseLogicalAnd();

        left = {
          type: NodeType.BinaryExpression,
          operator: operator === 'or' ? '||' : operator,
          left,
          right,
          loc: this.createLocation(left)
        };
      }

      return left;
    }

    parseLogicalAnd() {
      let left = this.parseBitwiseOr();

      while (this.match(TokenType.AND_OP) || this.match(TokenType.AND)) {
        const operator = this.previous().value;
        const right = this.parseBitwiseOr();

        left = {
          type: NodeType.BinaryExpression,
          operator: operator === 'and' ? '&&' : operator,
          left,
          right,
          loc: this.createLocation(left)
        };
      }

      return left;
    }

    parseBitwiseOr() {
      let left = this.parseBitwiseXor();

      while (this.match(TokenType.BIT_OR)) {
        const operator = this.previous().value;
        const right = this.parseBitwiseXor();

        left = {
          type: NodeType.BinaryExpression,
          operator,
          left,
          right,
          loc: this.createLocation(left)
        };
      }

      return left;
    }

    parseBitwiseXor() {
      let left = this.parseBitwiseAnd();

      while (this.match(TokenType.BIT_XOR)) {
        const operator = this.previous().value;
        const right = this.parseBitwiseAnd();

        left = {
          type: NodeType.BinaryExpression,
          operator,
          left,
          right,
          loc: this.createLocation(left)
        };
      }

      return left;
    }

    parseBitwiseAnd() {
      let left = this.parseEquality();

      while (this.match(TokenType.BIT_AND)) {
        const operator = this.previous().value;
        const right = this.parseEquality();

        left = {
          type: NodeType.BinaryExpression,
          operator,
          left,
          right,
          loc: this.createLocation(left)
        };
      }

      return left;
    }

    parseEquality() {
      let left = this.parseComparison();

      while (this.match(TokenType.EQ) || this.match(TokenType.NEQ)) {
        const operator = this.previous().value;
        const right = this.parseComparison();

        left = {
          type: NodeType.BinaryExpression,
          operator,
          left,
          right,
          loc: this.createLocation(left)
        };
      }

      return left;
    }

    parseComparison() {
      let left = this.parseShift();

      while (this.match(TokenType.LT) || this.match(TokenType.GT) ||
             this.match(TokenType.LTE) || this.match(TokenType.GTE) ||
             this.match(TokenType.IN) || this.match(TokenType.LIKE) || 
             this.match(TokenType.BETWEEN)) {
        const operator = this.previous().type;

        if (operator === TokenType.IN) {
          const right = this.parseShift();
          left = {
            type: NodeType.InExpression,
            element: left,
            container: right,
            loc: this.createLocation(left)
          };
        } else if (operator === TokenType.LIKE) {
          const right = this.parseShift();
          left = {
            type: NodeType.LikeExpression,
            value: left,
            pattern: right,
            loc: this.createLocation(left)
          };
        } else if (operator === TokenType.BETWEEN) {
          const low = this.parseShift();
          this.consume(TokenType.AND, "Expect 'and' in between expression");
          const high = this.parseShift();
          left = {
            type: NodeType.BetweenExpression,
            value: left,
            low,
            high,
            loc: this.createLocation(left)
          };
        } else {
          const op = this.previous().value;
          const right = this.parseShift();

          left = {
            type: NodeType.BinaryExpression,
            operator: op,
            left,
            right,
            loc: this.createLocation(left)
          };
        }
      }

      return left;
    }

    parseShift() {
      let left = this.parseAdditive();

      while (this.match(TokenType.LSHIFT) || this.match(TokenType.RSHIFT) || this.match(TokenType.URSHIFT)) {
        const operator = this.previous().value;
        const right = this.parseAdditive();

        left = {
          type: NodeType.BinaryExpression,
          operator,
          left,
          right,
          loc: this.createLocation(left)
        };
      }

      return left;
    }

    parseAdditive() {
      let left = this.parseMultiplicative();

      while (this.match(TokenType.PLUS) || this.match(TokenType.MINUS)) {
        const operator = this.previous().value;
        const right = this.parseMultiplicative();

        left = {
          type: NodeType.BinaryExpression,
          operator,
          left,
          right,
          loc: this.createLocation(left)
        };
      }

      return left;
    }

    parseMultiplicative() {
      let left = this.parseUnary();

      while (this.match(TokenType.STAR) || this.match(TokenType.SLASH) ||
             this.match(TokenType.PERCENT) || this.match(TokenType.MOD)) {
        const operator = this.previous().value;
        const right = this.parseUnary();

        left = {
          type: NodeType.BinaryExpression,
          operator: operator === 'mod' ? '%' : operator,
          left,
          right,
          loc: this.createLocation(left)
        };
      }

      return left;
    }

    parseUnary() {
      if (this.match(TokenType.NOT_OP) || this.match(TokenType.NOT) ||
          this.match(TokenType.MINUS) || this.match(TokenType.BIT_NOT)) {
        const operator = this.previous().value;
        const argument = this.parseUnary();

        return {
          type: NodeType.UnaryExpression,
          operator: operator === 'not' ? '!' : operator,
          argument,
          prefix: true,
          loc: this.createLocation(this.previous())
        };
      }

      if (this.match(TokenType.INCREMENT) || this.match(TokenType.DECREMENT)) {
        const operator = this.previous().value;
        const argument = this.parseUnary();

        return {
          type: NodeType.UpdateExpression,
          operator,
          argument,
          prefix: true,
          loc: this.createLocation(this.previous())
        };
      }

      return this.parsePostfix();
    }

    parsePostfix() {
      let expr = this.parseCall();

      if (this.match(TokenType.INCREMENT) || this.match(TokenType.DECREMENT)) {
        const operator = this.previous().value;
        return {
          type: NodeType.UpdateExpression,
          operator,
          argument: expr,
          prefix: false,
          loc: this.createLocation(expr)
        };
      }

      return expr;
    }

    parseCall() {
      let expr = this.parsePrimary();

      while (true) {
        if (this.match(TokenType.LPAREN)) {
          expr = this.finishCall(expr);
        } else if (this.match(TokenType.DOT)) {
          const nameToken = this.consume(TokenType.IDENTIFIER, "Expect property name after '.'");
          const name = { type: NodeType.Identifier, name: nameToken.value, loc: this.createLocation(nameToken) };
          expr = {
            type: NodeType.MemberExpression,
            object: expr,
            property: name,
            computed: false,
            loc: this.createLocation(expr)
          };
        } else if (this.match(TokenType.LBRACKET)) {
          const property = this.parseExpression();
          this.consume(TokenType.RBRACKET, "Expect ']' after index");
          expr = {
            type: NodeType.MemberExpression,
            object: expr,
            property,
            computed: true,
            loc: this.createLocation(expr)
          };
        } else {
          break;
        }
      }

      return expr;
    }

    finishCall(callee) {
      const args = [];

      if (!this.check(TokenType.RPAREN)) {
        do {
          args.push(this.parseExpression());
        } while (this.match(TokenType.COMMA));
      }

      this.consume(TokenType.RPAREN, "Expect ')' after arguments");

      return {
        type: NodeType.CallExpression,
        callee,
        arguments: args,
        loc: this.createLocation(callee)
      };
    }

    parsePrimary() {
      const token = this.peek();

      switch (token.type) {
        case TokenType.NUMBER:
          this.advance();
          return {
            type: NodeType.NumberLiteral,
            value: token.value,
            loc: this.createLocation(token)
          };

        case TokenType.STRING:
          this.advance();
          return {
            type: NodeType.StringLiteral,
            value: token.value,
            loc: this.createLocation(token)
          };

        case TokenType.BOOLEAN:
          this.advance();
          return {
            type: NodeType.BooleanLiteral,
            value: token.value,
            loc: this.createLocation(token)
          };

        case TokenType.NULL:
          this.advance();
          return {
            type: NodeType.NullLiteral,
            value: token.value,
            loc: this.createLocation(token)
          };

        case TokenType.IDENTIFIER:
          this.advance();
          return {
            type: NodeType.Identifier,
            name: token.value,
            loc: this.createLocation(token)
          };

        case TokenType.NEW:
          return this.parseNewExpression();

        case TokenType.LPAREN: {
          this.advance();
          const expr = this.parseExpression();
          this.consume(TokenType.RPAREN, "Expect ')' after expression");
          return expr;
        }

        case TokenType.LBRACKET:
          return this.parseArrayExpression();

        case TokenType.LBRACE:
          return this.parseObjectExpression();

        default:
          throw new ParseError(`Unexpected token: ${token.value}`, token);
      }
    }

    parseNewExpression() {
      const token = this.advance();

      const callee = this.parsePrimary();
      const args = [];

      if (this.match(TokenType.LPAREN)) {
        if (!this.check(TokenType.RPAREN)) {
          do {
            args.push(this.parseExpression());
          } while (this.match(TokenType.COMMA));
        }
        this.consume(TokenType.RPAREN, "Expect ')' after arguments");
      }

      return {
        type: NodeType.NewExpression,
        callee,
        arguments: args,
        loc: this.createLocation(token)
      };
    }

    parseArrayExpression() {
      const token = this.advance();

      const elements = [];
      if (!this.check(TokenType.RBRACKET)) {
        do {
          elements.push(this.parseExpression());
        } while (this.match(TokenType.COMMA));
      }

      this.consume(TokenType.RBRACKET, "Expect ']' after array elements");

      return { type: NodeType.ArrayExpression, elements, loc: this.createLocation(token) };
    }

    parseObjectExpression() {
      const token = this.advance();

      const properties = [];

      if (!this.check(TokenType.RBRACE)) {
        do {
          while (this.check(TokenType.NEWLINE)) {
            this.advance();
          }

          let key;
          let computed = false;

          if (this.match(TokenType.LBRACKET)) {
            key = this.parseExpression();
            this.consume(TokenType.RBRACKET, "Expect ']' after computed property");
            computed = true;
          } else if (this.check(TokenType.IDENTIFIER)) {
            key = {
              type: NodeType.Identifier,
              name: this.advance().value,
              loc: this.createLocation(this.previous())
            };
          } else if (this.check(TokenType.STRING)) {
            key = {
              type: NodeType.StringLiteral,
              value: this.advance().value,
              loc: this.createLocation(this.previous())
            };
          } else if (this.check(TokenType.NUMBER)) {
            key = {
              type: NodeType.NumberLiteral,
              value: this.advance().value,
              loc: this.createLocation(this.previous())
            };
          } else {
            throw new ParseError('Expect property name', this.peek());
          }

          this.consume(TokenType.COLON, "Expect ':' after property name");
          const value = this.parseExpression();

          properties.push({ key, value, computed });
        } while (this.match(TokenType.COMMA));
      }

      this.consume(TokenType.RBRACE, "Expect '}' after object properties");

      return { type: NodeType.ObjectExpression, properties, loc: this.createLocation(token) };
    }

    peek() {
      return this.tokens[this.current];
    }

    peekNext() {
      if (this.current + 1 >= this.tokens.length) return null;
      return this.tokens[this.current + 1];
    }

    previous() {
      return this.tokens[this.current - 1];
    }

    advance() {
      if (!this.isAtEnd()) this.current++;
      return this.previous();
    }

    isAtEnd() {
      return this.peek().type === TokenType.EOF;
    }

    check(type) {
      if (this.isAtEnd()) return false;
      return this.peek().type === type;
    }

    match(type) {
      if (this.check(type)) {
        this.advance();
        return true;
      }
      return false;
    }

    consume(type, message) {
      if (this.check(type)) return this.advance();
      throw new ParseError(message, this.peek());
    }

    createLocation(start) {
      if (start && start.line !== undefined) {
        return {
          start: { line: start.line, column: start.column },
          end: { line: this.previous().line, column: this.previous().column }
        };
      }
      return start && start.loc;
    }
  }

  // ============ 运行时环境 ============
  class Scope {
    constructor(parent = null) {
      this.variables = new Map();
      this.parent = parent;
    }

    get(name) {
      if (this.variables.has(name)) {
        return this.variables.get(name);
      }
      if (this.parent) {
        return this.parent.get(name);
      }
      return undefined;
    }

    set(name, value) {
      if (this.variables.has(name)) {
        this.variables.set(name, value);
        return;
      }
      if (this.parent && this.parent.has(name)) {
        this.parent.set(name, value);
        return;
      }
      this.variables.set(name, value);
    }

    define(name, value) {
      this.variables.set(name, value);
    }

    has(name) {
      if (this.variables.has(name)) {
        return true;
      }
      if (this.parent) {
        return this.parent.has(name);
      }
      return false;
    }

    keys() {
      const keys = new Set();
      this.collectKeys(keys);
      return Array.from(keys);
    }

    collectKeys(keys) {
      this.variables.forEach((_, key) => keys.add(key));
      if (this.parent) {
        this.parent.collectKeys(keys);
      }
    }

    toObject() {
      const result = {};
      if (this.parent) {
        Object.assign(result, this.parent.toObject());
      }
      this.variables.forEach((value, key) => {
        result[key] = value;
      });
      return result;
    }

    createChild() {
      return new Scope(this);
    }
  }

  class RuntimeContext {
    constructor(initialVars = {}) {
      this.globalScope = new Scope();
      this.currentScope = this.globalScope;

      for (const [key, value] of Object.entries(initialVars)) {
        this.globalScope.define(key, value);
      }
    }

    enterScope() {
      this.currentScope = this.currentScope.createChild();
      return this.currentScope;
    }

    exitScope() {
      const parent = this.currentScope.parent;
      if (parent) {
        this.currentScope = parent;
      }
    }

    getCurrentScope() {
      return this.currentScope;
    }

    getGlobalScope() {
      return this.globalScope;
    }

    get(name) {
      return this.currentScope.get(name);
    }

    set(name, value) {
      this.currentScope.set(name, value);
    }

    define(name, value) {
      this.currentScope.define(name, value);
    }

    has(name) {
      return this.currentScope.has(name);
    }

    keys() {
      return this.currentScope.keys();
    }

    toObject() {
      return this.currentScope.toObject();
    }
  }

  // ============ 内置函数 ============
  const builtinFunctions = {
    abs: (x) => Math.abs(x),
    ceil: (x) => Math.ceil(x),
    floor: (x) => Math.floor(x),
    round: (x) => Math.round(x),
    sqrt: (x) => Math.sqrt(x),
    pow: (x, y) => Math.pow(x, y),
    min: (...args) => Math.min(...args),
    max: (...args) => Math.max(...args),
    sum: (...args) => args.reduce((a, b) => a + b, 0),
    avg: (...args) => args.length === 0 ? 0 : args.reduce((a, b) => a + b, 0) / args.length,
    parseInt: (s, radix) => parseInt(s, radix || 10),
    parseFloat: (s) => parseFloat(s),
    toString: (v) => String(v),
    strlen: (s) => s.length,
    substr: (s, start, len) => s.substr(start, len),
    toUpperCase: (s) => s.toUpperCase(),
    toLowerCase: (s) => s.toLowerCase(),
    trim: (s) => s.trim(),
    replace: (s, old, n) => s.replace(old, n),
    split: (s, sep) => s.split(sep),
    size: (arr) => Array.isArray(arr) ? arr.length : (typeof arr === 'string' ? arr.length : 0),
    first: (arr) => arr[0],
    last: (arr) => arr[arr.length - 1],
    range: (start, end, step = 1) => {
      if (end === undefined) { end = start; start = 0; }
      const result = [];
      for (let i = start; step > 0 ? i < end : i > end; i += step) {
        result.push(i);
      }
      return result;
    },
    isArray: (v) => Array.isArray(v),
    isString: (v) => typeof v === 'string',
    isNumber: (v) => typeof v === 'number',
    isBoolean: (v) => typeof v === 'boolean',
    isNull: (v) => v === null,
    isEmpty: (v) => v == null || v === '' || (Array.isArray(v) && v.length === 0),
    iif: (cond, t, f) => cond ? t : f,
    coalesce: (...args) => args.find(v => v !== null && v !== undefined),
    now: () => Date.now(),
    date: (ts) => new Date(ts),
    year: (d) => new Date(d).getFullYear(),
    month: (d) => new Date(d).getMonth() + 1,
    day: (d) => new Date(d).getDate(),
    print: (...args) => { console.log(...args); return args.length === 1 ? args[0] : args; },
    println: (...args) => { console.log(...args); return args.length === 1 ? args[0] : args; },
    NewList: (...items) => [...items],
    NewMap: (...entries) => new Map(entries),
    NewSet: (...values) => new Set(values)
  };

  const builtinObjects = {
    Math: {
      abs: Math.abs,
      ceil: Math.ceil,
      floor: Math.floor,
      round: Math.round,
      sqrt: Math.sqrt,
      pow: Math.pow,
      PI: Math.PI,
      E: Math.E
    },
    JSON: {
      parse: JSON.parse,
      stringify: JSON.stringify
    },
    Date: Date,
    Array: Array,
    Object: Object
  };

  // ============ 解释器 ============
  class Interpreter {
    constructor(context, config = {}) {
      this.context = context;
      this.config = {
        precise: config.precise ?? false,
        shortCircuit: config.shortCircuit ?? true,
        trace: config.trace ?? false,
        security: {
          sandbox: config.security?.sandbox ?? false,
          timeout: config.security?.timeout ?? 0,
          maxLoopCount: config.security?.maxLoopCount ?? 1000000,
          maxArrayLength: config.security?.maxArrayLength ?? 100000
        }
      };
      this.traces = [];
      this.loopCount = 0;
      this.startTime = 0;
      this.customFunctions = new Map();
      this.customOperators = new Map();
      this.macros = new Map();
      this.userFunctions = new Map();
    }

    execute(node) {
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

    addFunction(name, handler) {
      this.customFunctions.set(name, handler);
    }

    addOperator(name, handler) {
      this.customOperators.set(name, handler);
    }

    addMacro(name, expression) {
      this.macros.set(name, expression);
    }

    checkSecurity() {
      const { timeout, maxLoopCount } = this.config.security;

      if (timeout > 0 && Date.now() - this.startTime > timeout) {
        throw new RuntimeError(`Execution timeout after ${timeout}ms`);
      }

      if (this.loopCount > maxLoopCount) {
        throw new RuntimeError(`Maximum loop count exceeded: ${maxLoopCount}`);
      }
    }

    evaluate(node) {
      this.checkSecurity();

      switch (node.type) {
        case NodeType.Program:
          return this.evaluateProgram(node);

        case NodeType.ExpressionStatement:
          return this.evaluate(node.expression);

        case NodeType.NumberLiteral:
        case NodeType.StringLiteral:
        case NodeType.BooleanLiteral:
        case NodeType.NullLiteral:
          return node.value;

        case NodeType.Identifier:
          return this.evaluateIdentifier(node);

        case NodeType.ArrayExpression:
          return this.evaluateArrayExpression(node);

        case NodeType.ObjectExpression:
          return this.evaluateObjectExpression(node);

        case NodeType.BinaryExpression:
          return this.evaluateBinaryExpression(node);

        case NodeType.UnaryExpression:
          return this.evaluateUnaryExpression(node);

        case NodeType.ConditionalExpression:
          return this.evaluateConditionalExpression(node);

        case NodeType.AssignmentExpression:
          return this.evaluateAssignmentExpression(node);

        case NodeType.UpdateExpression:
          return this.evaluateUpdateExpression(node);

        case NodeType.MemberExpression:
          return this.evaluateMemberExpression(node);

        case NodeType.CallExpression:
          return this.evaluateCallExpression(node);

        case NodeType.NewExpression:
          return this.evaluateNewExpression(node);

        case NodeType.InExpression:
          return this.evaluateInExpression(node);

        case NodeType.LikeExpression:
          return this.evaluateLikeExpression(node);

        case NodeType.BetweenExpression:
          return this.evaluateBetweenExpression(node);

        case NodeType.BlockStatement:
          return this.evaluateBlockStatement(node);

        case NodeType.IfStatement:
          return this.evaluateIfStatement(node);

        case NodeType.WhileStatement:
          return this.evaluateWhileStatement(node);

        case NodeType.ForStatement:
          return this.evaluateForStatement(node);

        case NodeType.ReturnStatement:
          return this.evaluateReturnStatement(node);

        case NodeType.BreakStatement:
          throw new BreakException();

        case NodeType.ContinueStatement:
          throw new ContinueException();

        case NodeType.FunctionDeclaration:
          return this.evaluateFunctionDeclaration(node);

        default:
          throw new RuntimeError(`Unknown node type: ${node.type}`);
      }
    }

    evaluateProgram(node) {
      let result;
      for (const statement of node.body) {
        result = this.evaluate(statement);
        if (result instanceof ReturnValue) {
          return result;
        }
      }
      return result;
    }

    evaluateIdentifier(node) {
      const name = node.name;

      if (this.customFunctions.has(name)) {
        return this.customFunctions.get(name);
      }

      if (this.userFunctions.has(name)) {
        return this.userFunctions.get(name);
      }

      if (this.context.has(name)) {
        return this.context.get(name);
      }

      return undefined;
    }

    evaluateArrayExpression(node) {
      return node.elements.map(element => this.evaluate(element));
    }

    evaluateObjectExpression(node) {
      const obj = {};

      for (const prop of node.properties) {
        let key;

        if (prop.key.type === NodeType.Identifier) {
          key = prop.key.name;
        } else if (prop.key.type === NodeType.StringLiteral) {
          key = prop.key.value;
        } else if (prop.key.type === NodeType.NumberLiteral) {
          key = prop.key.value;
        } else {
          key = String(this.evaluate(prop.key));
        }

        obj[key] = this.evaluate(prop.value);
      }

      return obj;
    }

    evaluateBinaryExpression(node) {
      const operator = node.operator;

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

      if (this.customOperators.has(operator)) {
        return this.customOperators.get(operator)([left, right], this.context);
      }

      switch (operator) {
        case '+':
          if (typeof left === 'string' || typeof right === 'string') {
            return String(left) + String(right);
          }
          return Number(left) + Number(right);

        case '-':
          return Number(left) - Number(right);

        case '*':
          return Number(left) * Number(right);

        case '/':
          return Number(left) / Number(right);

        case '%':
          return Number(left) % Number(right);

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
          return Number(left) < Number(right);

        case '>':
          return Number(left) > Number(right);

        case '<=':
          return Number(left) <= Number(right);

        case '>=':
          return Number(left) >= Number(right);

        case '&':
          return Number(left) & Number(right);

        case '|':
          return Number(left) | Number(right);

        case '^':
          return Number(left) ^ Number(right);

        case '<<':
          return Number(left) << Number(right);

        case '>>':
          return Number(left) >> Number(right);

        case '>>>':
          return Number(left) >>> Number(right);

        default:
          throw new RuntimeError(`Unknown binary operator: ${operator}`);
      }
    }

    evaluateUnaryExpression(node) {
      const argument = this.evaluate(node.argument);

      switch (node.operator) {
        case '!':
          return !argument;

        case '-':
          return -Number(argument);

        case '+':
          return +Number(argument);

        case '~':
          return ~Number(argument);

        default:
          throw new RuntimeError(`Unknown unary operator: ${node.operator}`);
      }
    }

    evaluateConditionalExpression(node) {
      const test = this.evaluate(node.test);
      return test ? this.evaluate(node.consequent) : this.evaluate(node.alternate);
    }

    evaluateAssignmentExpression(node) {
      const value = this.evaluate(node.right);

      if (node.left.type === NodeType.Identifier) {
        const name = node.left.name;

        switch (node.operator) {
          case '=':
            this.context.set(name, value);
            return value;

          case '+=':
            const currentAdd = this.context.get(name) ?? 0;
            const resultAdd = typeof currentAdd === 'string' || typeof value === 'string'
              ? String(currentAdd) + String(value)
              : Number(currentAdd) + Number(value);
            this.context.set(name, resultAdd);
            return resultAdd;

          case '-=':
            const resultSub = Number(this.context.get(name) ?? 0) - Number(value);
            this.context.set(name, resultSub);
            return resultSub;

          case '*=':
            const resultMul = Number(this.context.get(name) ?? 0) * Number(value);
            this.context.set(name, resultMul);
            return resultMul;

          case '/=':
            const resultDiv = Number(this.context.get(name) ?? 0) / Number(value);
            this.context.set(name, resultDiv);
            return resultDiv;

          case '%=':
            const resultMod = Number(this.context.get(name) ?? 0) % Number(value);
            this.context.set(name, resultMod);
            return resultMod;

          default:
            throw new RuntimeError(`Unknown assignment operator: ${node.operator}`);
        }
      }

      if (node.left.type === NodeType.MemberExpression) {
        const object = this.evaluate(node.left.object);
        const property = node.left.computed
          ? this.evaluate(node.left.property)
          : node.left.property.name;

        object[property] = value;
        return value;
      }

      throw new RuntimeError('Invalid assignment target');
    }

    evaluateUpdateExpression(node) {
      const getValue = () => {
        if (node.argument.type === NodeType.Identifier) {
          return Number(this.context.get(node.argument.name) ?? 0);
        }
        if (node.argument.type === NodeType.MemberExpression) {
          const object = this.evaluate(node.argument.object);
          const property = node.argument.computed
            ? this.evaluate(node.argument.property)
            : node.argument.property.name;
          return Number(object[property] ?? 0);
        }
        throw new RuntimeError('Invalid update target');
      };

      const setValue = (value) => {
        if (node.argument.type === NodeType.Identifier) {
          this.context.set(node.argument.name, value);
        } else if (node.argument.type === NodeType.MemberExpression) {
          const object = this.evaluate(node.argument.object);
          const property = node.argument.computed
            ? this.evaluate(node.argument.property)
            : node.argument.property.name;
          object[property] = value;
        }
      };

      const oldValue = getValue();
      const newValue = node.operator === '++' ? oldValue + 1 : oldValue - 1;
      setValue(newValue);

      return node.prefix ? newValue : oldValue;
    }

    evaluateMemberExpression(node) {
      const object = this.evaluate(node.object);

      let property;
      if (node.computed) {
        property = this.evaluate(node.property);
      } else {
        property = node.property.name;
      }

      if (object instanceof Map) {
        return object.get(property);
      }

      return object[property];
    }

    evaluateCallExpression(node) {
      const args = node.arguments.map(arg => this.evaluate(arg));

      if (node.callee.type === NodeType.MemberExpression) {
        const object = this.evaluate(node.callee.object);

        let method;
        if (node.callee.computed) {
          method = this.evaluate(node.callee.property);
        } else {
          method = node.callee.property.name;
        }

        const func = object[method];

        if (typeof func === 'function') {
          return func.apply(object, args);
        }

        throw new RuntimeError(`${String(method)} is not a function`);
      }

      if (node.callee.type === NodeType.Identifier) {
        const funcName = node.callee.name;

        if (this.customFunctions.has(funcName)) {
          const func = this.customFunctions.get(funcName);
          return func(...args);
        }

        if (this.userFunctions.has(funcName)) {
          return this.callUserFunction(this.userFunctions.get(funcName), args);
        }
      }

      const callee = this.evaluate(node.callee);

      if (typeof callee === 'function') {
        return callee(...args);
      }

      throw new RuntimeError('Expression is not a function');
    }

    callUserFunction(func, args) {
      this.context.enterScope();

      for (let i = 0; i < func.params.length; i++) {
        this.context.define(func.params[i], args[i]);
      }

      let result;
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

    evaluateNewExpression(node) {
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

    evaluateInExpression(node) {
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

    evaluateLikeExpression(node) {
      const value = String(this.evaluate(node.value));
      const pattern = String(this.evaluate(node.pattern));

      const regexPattern = pattern
        .replace(/[.+^${}()|[\]\\]/g, '\\$&')
        .replace(/%/g, '.*')
        .replace(/_/g, '.');

      const regex = new RegExp(`^${regexPattern}$`, 'i');
      return regex.test(value);
    }

    evaluateBetweenExpression(node) {
      const value = Number(this.evaluate(node.value));
      const low = Number(this.evaluate(node.low));
      const high = Number(this.evaluate(node.high));

      return value >= low && value <= high;
    }

    evaluateBlockStatement(node) {
      let result;

      for (const statement of node.body) {
        result = this.evaluate(statement);
        if (result instanceof ReturnValue) {
          return result;
        }
      }

      return result;
    }

    evaluateIfStatement(node) {
      const test = this.evaluate(node.test);

      if (test) {
        return this.evaluate(node.consequent);
      } else if (node.alternate) {
        return this.evaluate(node.alternate);
      }

      return undefined;
    }

    evaluateWhileStatement(node) {
      let result;

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

    evaluateForStatement(node) {
      if (node.init) {
        this.evaluate(node.init);
      }

      let result;

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
            // continue
          } else {
            throw error;
          }
        }

        if (node.update) {
          this.evaluate(node.update);
        }
      }

      return result;
    }

    evaluateReturnStatement(node) {
      const value = node.argument ? this.evaluate(node.argument) : undefined;
      throw new ReturnException(value);
    }

    evaluateFunctionDeclaration(node) {
      const func = {
        name: node.id.name,
        params: node.params.map(p => p.name),
        body: node.body
      };

      this.userFunctions.set(func.name, func);
      this.context.define(func.name, func);
    }

    isEqual(left, right) {
      if (typeof left === typeof right) {
        return left === right;
      }

      if (left == null && right == null) {
        return true;
      }

      if (typeof left === 'number' && typeof right === 'string') {
        return left === parseFloat(right);
      }
      if (typeof left === 'string' && typeof right === 'number') {
        return parseFloat(left) === right;
      }

      if (typeof left === 'boolean') {
        return this.isEqual(left ? 1 : 0, right);
      }
      if (typeof right === 'boolean') {
        return this.isEqual(left, right ? 1 : 0);
      }

      return left == right;
    }
  }

  // ============ 宏管理器 ============
  class MacroManager {
    constructor() {
      this.macros = new Map();
    }

    add(name, expression) {
      this.macros.set(name, { name, expression });
    }

    remove(name) {
      return this.macros.delete(name);
    }

    has(name) {
      return this.macros.has(name);
    }

    get(name) {
      return this.macros.get(name)?.expression;
    }

    getAll() {
      return new Map(this.macros);
    }
  }

  // ============ 函数管理器 ============
  class CustomFunctionManager {
    constructor() {
      this.functions = new Map();
    }

    add(name, handler, description) {
      this.functions.set(name, { name, handler, description });
    }

    remove(name) {
      return this.functions.delete(name);
    }

    has(name) {
      return this.functions.has(name);
    }

    get(name) {
      return this.functions.get(name);
    }

    getAll() {
      return new Map(this.functions);
    }
  }

  // ============ 操作符管理器 ============
  class CustomOperatorManager {
    constructor() {
      this.operators = new Map();
      this.aliases = new Map();
    }

    add(name, handler, precedence) {
      this.operators.set(name, { name, handler, precedence });
    }

    addAlias(alias, originalName) {
      this.aliases.set(alias, originalName);
    }

    remove(name) {
      return this.operators.delete(name);
    }

    has(name) {
      const resolvedName = this.resolveAlias(name);
      return this.operators.has(resolvedName);
    }

    get(name) {
      const resolvedName = this.resolveAlias(name);
      return this.operators.get(resolvedName);
    }

    resolveAlias(name) {
      return this.aliases.get(name) || name;
    }

    getAll() {
      return new Map(this.operators);
    }

    getAllAliases() {
      return new Map(this.aliases);
    }
  }

  // ============ ExpressRunner ============
  class ExpressRunner {
    constructor(options = {}) {
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

      this.macroManager = new MacroManager();
      this.functionManager = new CustomFunctionManager();
      this.operatorManager = new CustomOperatorManager();
      this.instructionCache = new Map();
      this.operatorAliases = new Map();

      this.initBuiltinAliases();
    }

    initBuiltinAliases() {
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
    }

    execute(expression, context, options = {}) {
      const { isCache = true, isTrace = false, timeout = 0 } = options;

      expression = this.expandMacros(expression);

      let cached = isCache ? this.instructionCache.get(expression) : null;

      if (!cached) {
        const lexer = new Lexer(expression);
        const tokens = lexer.tokenize();
        const parser = new Parser(tokens, this.getMacroExpressions(), this.operatorAliases);
        const ast = parser.parse();

        cached = ast;

        if (isCache) {
          this.instructionCache.set(expression, cached);
        }
      }

      const runtimeContext = this.createRuntimeContext(context);

      const interpreter = new Interpreter(runtimeContext, {
        ...this.config,
        trace: isTrace || this.config.trace,
        security: {
          ...this.config.security,
          timeout: timeout || this.config.security.timeout
        }
      });

      this.registerCustomFunctions(interpreter);
      this.registerCustomOperators(interpreter);

      const startTime = Date.now();
      const result = interpreter.execute(cached);
      const endTime = Date.now();

      result.executionTime = endTime - startTime;

      return result;
    }

    createRuntimeContext(context) {
      const initialVars = {};

      Object.assign(initialVars, builtinObjects);

      for (const [name, handler] of Object.entries(builtinFunctions)) {
        initialVars[name] = handler;
      }

      if (context) {
        if (typeof context.get === 'function') {
          for (const key of context.keys()) {
            initialVars[key] = context.get(key);
          }
        } else {
          Object.assign(initialVars, context);
        }
      }

      return new RuntimeContext(initialVars);
    }

    registerCustomFunctions(interpreter) {
      const functions = this.functionManager.getAll();
      for (const [name, def] of functions) {
        interpreter.addFunction(name, def.handler);
      }
    }

    registerCustomOperators(interpreter) {
      const operators = this.operatorManager.getAll();
      for (const [name, def] of operators) {
        interpreter.addOperator(name, def.handler);
      }
    }

    expandMacros(expression) {
      let result = expression;
      let changed = true;
      const macros = this.macroManager.getAll();

      while (changed) {
        changed = false;
        for (const [name, def] of macros) {
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

    getMacroExpressions() {
      const result = new Map();
      const macros = this.macroManager.getAll();
      for (const [name, def] of macros) {
        result.set(name, def.expression);
      }
      return result;
    }

    addFunction(name, handler) {
      this.functionManager.add(name, handler);
    }

    removeFunction(name) {
      return this.functionManager.remove(name);
    }

    hasFunction(name) {
      return this.functionManager.has(name) || builtinFunctions[name] !== undefined;
    }

    addFunctionOfClassMethod(functionName, className, methodName, paramTypes) {
      this.addFunction(functionName, (...args) => {
        throw new Error('Class method binding not implemented in JavaScript environment');
      });
    }

    addFunctionOfServiceMethod(functionName, service, methodName, paramTypes) {
      const method = service[methodName];
      if (typeof method !== 'function') {
        throw new Error(`${String(methodName)} is not a function`);
      }

      this.addFunction(functionName, (...args) => {
        return method.apply(service, args);
      });
    }

    addOperator(name, handler) {
      this.operatorManager.add(name, handler);
    }

    replaceOperator(name, handler) {
      this.operatorManager.add(name, handler);
    }

    addOperatorWithAlias(alias, originalName, errorInfo) {
      this.operatorManager.add(name, handler);
    }

    replaceOperator(name, handler) {
      this.operatorManager.add(name, handler);
    }

    addOperatorWithAlias(alias, originalName, errorInfo) {
      this.operatorAliases.set(alias, originalName);
      this.operatorManager.addAlias(alias, originalName);
    }

    hasOperator(name) {
      return this.operatorManager.has(name);
    }

    addMacro(name, expression) {
      this.macroManager.add(name, expression);
    }

    removeMacro(name) {
      return this.macroManager.remove(name);
    }

    hasMacro(name) {
      return this.macroManager.has(name);
    }

    getMacro(name) {
      return this.macroManager.get(name);
    }

    getOutVarNames(expression) {
      expression = this.expandMacros(expression);

      const lexer = new Lexer(expression);
      const tokens = lexer.tokenize();
      const parser = new Parser(tokens, this.getMacroExpressions(), this.operatorAliases);
      const ast = parser.parse();

      const varNames = new Set();
      this.collectVarNames(ast, varNames);

      const builtins = new Set([
        ...Object.keys(builtinFunctions),
        ...Object.keys(builtinObjects),
        'true', 'false', 'null', 'undefined'
      ]);

      return Array.from(varNames).filter(name => !builtins.has(name));
    }

    collectVarNames(node, varNames) {
      if (!node) return;

      if (node.type === NodeType.Identifier) {
        varNames.add(node.name);
      }

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

    getOutFunctionNames(expression) {
      expression = this.expandMacros(expression);

      const lexer = new Lexer(expression);
      const tokens = lexer.tokenize();
      const parser = new Parser(tokens, this.getMacroExpressions(), this.operatorAliases);
      const ast = parser.parse();

      const funcNames = new Set();
      this.collectFunctionNames(ast, funcNames);

      return Array.from(funcNames);
    }

    collectFunctionNames(node, funcNames) {
      if (!node) return;

      if (node.type === NodeType.CallExpression) {
        if (node.callee.type === NodeType.Identifier) {
          funcNames.add(node.callee.name);
        }
      }

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

    validate(expression) {
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

    getInstructionSetFromLocalCache(expression) {
      return this.instructionCache.get(expression);
    }

    clearExpressCache() {
      this.instructionCache.clear();
    }

    getCacheSize() {
      return this.instructionCache.size;
    }

    setSandboxMode(enabled) {
      this.config.security.sandbox = enabled;
    }

    setTimeout(timeout) {
      this.config.security.timeout = timeout;
    }

    setMaxLoopCount(count) {
      this.config.security.maxLoopCount = count;
    }

    setMaxArrayLength(length) {
      this.config.security.maxArrayLength = length;
    }

    getConfig() {
      return { ...this.config };
    }
  }

  // ============ 导出 ============
  global.QLExpress = {
    ExpressRunner,
    execute: function(expression, context, options) {
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
    },
    createDefaultContext: function(vars = {}) {
      return new RuntimeContext(vars);
    },
    TokenType,
    NodeType,
    LexerError,
    ParseError,
    RuntimeError
  };

})(typeof window !== 'undefined' ? window : this);
