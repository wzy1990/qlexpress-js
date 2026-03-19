import {
  Token,
  TokenType,
  LexerError
} from '../types';

/**
 * 关键字映射
 */
const KEYWORDS: Record<string, TokenType> = {
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
  'undefined': TokenType.NULL  // undefined 也作为 null 类型处理
};

/**
 * 操作符字符映射
 */
const OPERATORS: Record<string, TokenType> = {
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

/**
 * 词法分析器
 * 将源代码字符串转换为Token流
 */
export class Lexer {
  private source: string;
  private tokens: Token[] = [];
  private start: number = 0;
  private current: number = 0;
  private line: number = 1;
  private column: number = 1;
  private startColumn: number = 1;

  constructor(source: string) {
    this.source = source;
  }

  /**
   * 执行词法分析，返回Token数组
   */
  tokenize(): Token[] {
    while (!this.isAtEnd()) {
      this.start = this.current;
      this.startColumn = this.column;
      this.scanToken();
    }

    this.addToken(TokenType.EOF, null);
    return this.tokens;
  }

  /**
   * 扫描单个Token
   */
  private scanToken(): void {
    const char = this.advance();

    // 空白字符处理
    if (this.isWhitespace(char)) {
      if (char === '\n') {
        this.addToken(TokenType.NEWLINE, null);
        this.line++;
        this.column = 1;
      }
      return;
    }

    // 操作符处理
    if (OPERATORS[char] !== undefined) {
      this.scanOperator(char);
      return;
    }

    // 数字处理
    if (this.isDigit(char)) {
      this.scanNumber();
      return;
    }

    // 字符串处理
    if (char === '"' || char === "'" || char === '`') {
      this.scanString(char);
      return;
    }

    // 标识符和关键字处理
    if (this.isAlpha(char) || char === '_' || char === '$') {
      this.scanIdentifier();
      return;
    }

    // 注释处理
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

  /**
   * 扫描操作符
   */
  private scanOperator(char: string): void {
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
        } else if (this.match('>')) {
          this.addToken(TokenType.COLON, '->');
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

  /**
   * 扫描数字
   */
  private scanNumber(): void {
    let isFloat = false;
    let isHex = false;
    let isBinary = false;
    let isOctal = false;

    // 检查十六进制、二进制、八进制
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
      // 扫描整数部分
      while (this.isDigit(this.peek())) {
        this.advance();
      }

      // 扫描小数部分
      if (this.peek() === '.' && this.isDigit(this.peekNext())) {
        isFloat = true;
        this.advance(); // 消费 '.'
        while (this.isDigit(this.peek())) {
          this.advance();
        }
      }

      // 扫描指数部分
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
    let value: number;

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

  /**
   * 扫描字符串
   */
  private scanString(quote: string): void {
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
            // 十六进制转义
            let hex = '';
            for (let i = 0; i < 2 && this.isHexDigit(this.peek()); i++) {
              hex += this.advance();
              raw += hex[hex.length - 1];
            }
            value += String.fromCharCode(parseInt(hex, 16));
            break;
          }
          case 'u': {
            // Unicode转义
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

    this.advance(); // 闭合引号
    raw += quote;

    this.addToken(TokenType.STRING, value, raw);
  }

  /**
   * 扫描标识符
   */
  private scanIdentifier(): void {
    while (this.isAlphaNumeric(this.peek())) {
      this.advance();
    }

    const text = this.source.substring(this.start, this.current);
    let type = KEYWORDS[text.toLowerCase()];

    if (type === undefined) {
      type = TokenType.IDENTIFIER;
    }

    // 处理布尔值和null
    if (type === TokenType.BOOLEAN) {
      this.addToken(type, text.toLowerCase() === 'true', text);
    } else if (type === TokenType.NULL) {
      // 区分 null 和 undefined
      this.addToken(type, text.toLowerCase() === 'undefined' ? undefined : null, text);
    } else {
      this.addToken(type, text);
    }
  }

  /**
   * 扫描块注释
   */
  private scanBlockComment(): void {
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

  /**
   * 扫描行注释
   */
  private scanLineComment(): void {
    while (!this.isAtEnd() && this.peek() !== '\n') {
      this.advance();
    }
  }

  /**
   * 辅助方法：前进一个字符
   */
  private advance(): string {
    const char = this.source[this.current++];
    this.column++;
    return char;
  }

  /**
   * 辅助方法：查看当前字符但不前进
   */
  private peek(): string {
    if (this.isAtEnd()) return '\0';
    return this.source[this.current];
  }

  /**
   * 辅助方法：查看下一个字符但不前进
   */
  private peekNext(): string {
    if (this.current + 1 >= this.source.length) return '\0';
    return this.source[this.current + 1];
  }

  /**
   * 辅助方法：匹配并消费
   */
  private match(expected: string): boolean {
    if (this.isAtEnd()) return false;
    if (this.source[this.current] !== expected) return false;
    this.current++;
    this.column++;
    return true;
  }

  /**
   * 辅助方法：是否到达末尾
   */
  private isAtEnd(): boolean {
    return this.current >= this.source.length;
  }

  /**
   * 辅助方法：是否为空白字符
   */
  private isWhitespace(char: string): boolean {
    return char === ' ' || char === '\t' || char === '\r' || char === '\n';
  }

  /**
   * 辅助方法：是否为数字
   */
  private isDigit(char: string): boolean {
    return char >= '0' && char <= '9';
  }

  /**
   * 辅助方法：是否为十六进制数字
   */
  private isHexDigit(char: string): boolean {
    return (
      (char >= '0' && char <= '9') ||
      (char >= 'a' && char <= 'f') ||
      (char >= 'A' && char <= 'F')
    );
  }

  /**
   * 辅助方法：是否为八进制数字
   */
  private isOctalDigit(char: string): boolean {
    return char >= '0' && char <= '7';
  }

  /**
   * 辅助方法：是否为字母
   */
  private isAlpha(char: string): boolean {
    return (
      (char >= 'a' && char <= 'z') ||
      (char >= 'A' && char <= 'Z') ||
      // 支持中文字符
      (char.charCodeAt(0) >= 0x4e00 && char.charCodeAt(0) <= 0x9fff)
    );
  }

  /**
   * 辅助方法：是否为字母或数字
   */
  private isAlphaNumeric(char: string): boolean {
    return this.isAlpha(char) || this.isDigit(char) || char === '_' || char === '$';
  }

  /**
   * 辅助方法：添加Token
   */
  private addToken(type: TokenType, value: any, raw?: string): void {
    this.tokens.push({
      type,
      value,
      line: this.line,
      column: this.startColumn,
      raw: raw !== undefined ? raw : String(value)
    });
  }
}
