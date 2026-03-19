"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lexer = void 0;
const types_1 = require("../types");
/**
 * 关键字映射
 */
const KEYWORDS = {
    'if': types_1.TokenType.IF,
    'then': types_1.TokenType.THEN,
    'else': types_1.TokenType.ELSE,
    'for': types_1.TokenType.FOR,
    'while': types_1.TokenType.WHILE,
    'break': types_1.TokenType.BREAK,
    'continue': types_1.TokenType.CONTINUE,
    'return': types_1.TokenType.RETURN,
    'function': types_1.TokenType.FUNCTION,
    'import': types_1.TokenType.IMPORT,
    'new': types_1.TokenType.NEW,
    'in': types_1.TokenType.IN,
    'like': types_1.TokenType.LIKE,
    'between': types_1.TokenType.BETWEEN,
    'and': types_1.TokenType.AND,
    'or': types_1.TokenType.OR,
    'not': types_1.TokenType.NOT,
    'mod': types_1.TokenType.MOD,
    'true': types_1.TokenType.BOOLEAN,
    'false': types_1.TokenType.BOOLEAN,
    'null': types_1.TokenType.NULL,
    'undefined': types_1.TokenType.NULL // undefined 也作为 null 类型处理
};
/**
 * 操作符字符映射
 */
const OPERATORS = {
    '+': types_1.TokenType.PLUS,
    '-': types_1.TokenType.MINUS,
    '*': types_1.TokenType.STAR,
    '/': types_1.TokenType.SLASH,
    '%': types_1.TokenType.PERCENT,
    '=': types_1.TokenType.ASSIGN,
    '<': types_1.TokenType.LT,
    '>': types_1.TokenType.GT,
    '!': types_1.TokenType.NOT_OP,
    '&': types_1.TokenType.BIT_AND,
    '|': types_1.TokenType.BIT_OR,
    '^': types_1.TokenType.BIT_XOR,
    '~': types_1.TokenType.BIT_NOT,
    '?': types_1.TokenType.QUESTION,
    ':': types_1.TokenType.COLON,
    '(': types_1.TokenType.LPAREN,
    ')': types_1.TokenType.RPAREN,
    '{': types_1.TokenType.LBRACE,
    '}': types_1.TokenType.RBRACE,
    '[': types_1.TokenType.LBRACKET,
    ']': types_1.TokenType.RBRACKET,
    ',': types_1.TokenType.COMMA,
    ';': types_1.TokenType.SEMICOLON,
    '.': types_1.TokenType.DOT
};
/**
 * 词法分析器
 * 将源代码字符串转换为Token流
 */
class Lexer {
    constructor(source) {
        this.tokens = [];
        this.start = 0;
        this.current = 0;
        this.line = 1;
        this.column = 1;
        this.startColumn = 1;
        this.source = source;
    }
    /**
     * 执行词法分析，返回Token数组
     */
    tokenize() {
        while (!this.isAtEnd()) {
            this.start = this.current;
            this.startColumn = this.column;
            this.scanToken();
        }
        this.addToken(types_1.TokenType.EOF, null);
        return this.tokens;
    }
    /**
     * 扫描单个Token
     */
    scanToken() {
        const char = this.advance();
        // 空白字符处理
        if (this.isWhitespace(char)) {
            if (char === '\n') {
                this.addToken(types_1.TokenType.NEWLINE, null);
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
        throw new types_1.LexerError(`Unexpected character: ${char}`, this.line, this.column);
    }
    /**
     * 扫描操作符
     */
    scanOperator(char) {
        switch (char) {
            case '+':
                if (this.match('+')) {
                    this.addToken(types_1.TokenType.INCREMENT, '++');
                }
                else if (this.match('=')) {
                    this.addToken(types_1.TokenType.PLUS_ASSIGN, '+=');
                }
                else {
                    this.addToken(types_1.TokenType.PLUS, '+');
                }
                break;
            case '-':
                if (this.match('-')) {
                    this.addToken(types_1.TokenType.DECREMENT, '--');
                }
                else if (this.match('=')) {
                    this.addToken(types_1.TokenType.MINUS_ASSIGN, '-=');
                }
                else if (this.match('>')) {
                    this.addToken(types_1.TokenType.COLON, '->');
                }
                else {
                    this.addToken(types_1.TokenType.MINUS, '-');
                }
                break;
            case '*':
                if (this.match('=')) {
                    this.addToken(types_1.TokenType.STAR_ASSIGN, '*=');
                }
                else {
                    this.addToken(types_1.TokenType.STAR, '*');
                }
                break;
            case '/':
                if (this.match('=')) {
                    this.addToken(types_1.TokenType.SLASH_ASSIGN, '/=');
                }
                else {
                    this.addToken(types_1.TokenType.SLASH, '/');
                }
                break;
            case '%':
                if (this.match('=')) {
                    this.addToken(types_1.TokenType.PERCENT_ASSIGN, '%=');
                }
                else {
                    this.addToken(types_1.TokenType.PERCENT, '%');
                }
                break;
            case '=':
                if (this.match('=')) {
                    if (this.match('=')) {
                        this.addToken(types_1.TokenType.EQ, '===');
                    }
                    else {
                        this.addToken(types_1.TokenType.EQ, '==');
                    }
                }
                else if (this.match('>')) {
                    this.addToken(types_1.TokenType.COLON, '=>');
                }
                else {
                    this.addToken(types_1.TokenType.ASSIGN, '=');
                }
                break;
            case '!':
                if (this.match('=')) {
                    if (this.match('=')) {
                        this.addToken(types_1.TokenType.NEQ, '!==');
                    }
                    else {
                        this.addToken(types_1.TokenType.NEQ, '!=');
                    }
                }
                else {
                    this.addToken(types_1.TokenType.NOT_OP, '!');
                }
                break;
            case '<':
                if (this.match('=')) {
                    this.addToken(types_1.TokenType.LTE, '<=');
                }
                else if (this.match('<')) {
                    if (this.match('=')) {
                        this.addToken(types_1.TokenType.ASSIGN, '<<=');
                    }
                    else {
                        this.addToken(types_1.TokenType.LSHIFT, '<<');
                    }
                }
                else if (this.match('>')) {
                    this.addToken(types_1.TokenType.NEQ, '<>');
                }
                else {
                    this.addToken(types_1.TokenType.LT, '<');
                }
                break;
            case '>':
                if (this.match('=')) {
                    this.addToken(types_1.TokenType.GTE, '>=');
                }
                else if (this.match('>')) {
                    if (this.match('>')) {
                        if (this.match('=')) {
                            this.addToken(types_1.TokenType.ASSIGN, '>>>=');
                        }
                        else {
                            this.addToken(types_1.TokenType.URSHIFT, '>>>');
                        }
                    }
                    else if (this.match('=')) {
                        this.addToken(types_1.TokenType.ASSIGN, '>>=');
                    }
                    else {
                        this.addToken(types_1.TokenType.RSHIFT, '>>');
                    }
                }
                else {
                    this.addToken(types_1.TokenType.GT, '>');
                }
                break;
            case '&':
                if (this.match('&')) {
                    this.addToken(types_1.TokenType.AND_OP, '&&');
                }
                else if (this.match('=')) {
                    this.addToken(types_1.TokenType.ASSIGN, '&=');
                }
                else {
                    this.addToken(types_1.TokenType.BIT_AND, '&');
                }
                break;
            case '|':
                if (this.match('|')) {
                    this.addToken(types_1.TokenType.OR_OP, '||');
                }
                else if (this.match('=')) {
                    this.addToken(types_1.TokenType.ASSIGN, '|=');
                }
                else {
                    this.addToken(types_1.TokenType.BIT_OR, '|');
                }
                break;
            case '^':
                if (this.match('=')) {
                    this.addToken(types_1.TokenType.ASSIGN, '^=');
                }
                else {
                    this.addToken(types_1.TokenType.BIT_XOR, '^');
                }
                break;
            default:
                this.addToken(OPERATORS[char], char);
        }
    }
    /**
     * 扫描数字
     */
    scanNumber() {
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
            }
            else if (this.match('b') || this.match('B')) {
                isBinary = true;
                while (this.peek() === '0' || this.peek() === '1') {
                    this.advance();
                }
            }
            else if (this.match('o') || this.match('O')) {
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
        let value;
        if (isHex) {
            value = parseInt(raw, 16);
        }
        else if (isBinary) {
            value = parseInt(raw.substring(2), 2);
        }
        else if (isOctal) {
            value = parseInt(raw.substring(2), 8);
        }
        else {
            value = parseFloat(raw);
        }
        this.addToken(types_1.TokenType.NUMBER, value, raw);
    }
    /**
     * 扫描字符串
     */
    scanString(quote) {
        let value = '';
        let raw = quote;
        while (!this.isAtEnd() && this.peek() !== quote) {
            if (this.peek() === '\n') {
                if (quote !== '`') {
                    throw new types_1.LexerError('Unterminated string', this.line, this.column);
                }
                this.line++;
                this.column = 0;
            }
            if (this.peek() === '\\') {
                raw += this.advance();
                if (this.isAtEnd()) {
                    throw new types_1.LexerError('Unterminated string', this.line, this.column);
                }
                const escaped = this.advance();
                raw += escaped;
                switch (escaped) {
                    case 'n':
                        value += '\n';
                        break;
                    case 'r':
                        value += '\r';
                        break;
                    case 't':
                        value += '\t';
                        break;
                    case 'b':
                        value += '\b';
                        break;
                    case 'f':
                        value += '\f';
                        break;
                    case 'v':
                        value += '\v';
                        break;
                    case '0':
                        value += '\0';
                        break;
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
                        }
                        else {
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
            }
            else {
                const char = this.advance();
                value += char;
                raw += char;
            }
        }
        if (this.isAtEnd()) {
            throw new types_1.LexerError('Unterminated string', this.line, this.column);
        }
        this.advance(); // 闭合引号
        raw += quote;
        this.addToken(types_1.TokenType.STRING, value, raw);
    }
    /**
     * 扫描标识符
     */
    scanIdentifier() {
        while (this.isAlphaNumeric(this.peek())) {
            this.advance();
        }
        const text = this.source.substring(this.start, this.current);
        let type = KEYWORDS[text.toLowerCase()];
        if (type === undefined) {
            type = types_1.TokenType.IDENTIFIER;
        }
        // 处理布尔值和null
        if (type === types_1.TokenType.BOOLEAN) {
            this.addToken(type, text.toLowerCase() === 'true', text);
        }
        else if (type === types_1.TokenType.NULL) {
            // 区分 null 和 undefined
            this.addToken(type, text.toLowerCase() === 'undefined' ? undefined : null, text);
        }
        else {
            this.addToken(type, text);
        }
    }
    /**
     * 扫描块注释
     */
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
        throw new types_1.LexerError('Unterminated block comment', this.line, this.column);
    }
    /**
     * 扫描行注释
     */
    scanLineComment() {
        while (!this.isAtEnd() && this.peek() !== '\n') {
            this.advance();
        }
    }
    /**
     * 辅助方法：前进一个字符
     */
    advance() {
        const char = this.source[this.current++];
        this.column++;
        return char;
    }
    /**
     * 辅助方法：查看当前字符但不前进
     */
    peek() {
        if (this.isAtEnd())
            return '\0';
        return this.source[this.current];
    }
    /**
     * 辅助方法：查看下一个字符但不前进
     */
    peekNext() {
        if (this.current + 1 >= this.source.length)
            return '\0';
        return this.source[this.current + 1];
    }
    /**
     * 辅助方法：匹配并消费
     */
    match(expected) {
        if (this.isAtEnd())
            return false;
        if (this.source[this.current] !== expected)
            return false;
        this.current++;
        this.column++;
        return true;
    }
    /**
     * 辅助方法：是否到达末尾
     */
    isAtEnd() {
        return this.current >= this.source.length;
    }
    /**
     * 辅助方法：是否为空白字符
     */
    isWhitespace(char) {
        return char === ' ' || char === '\t' || char === '\r' || char === '\n';
    }
    /**
     * 辅助方法：是否为数字
     */
    isDigit(char) {
        return char >= '0' && char <= '9';
    }
    /**
     * 辅助方法：是否为十六进制数字
     */
    isHexDigit(char) {
        return ((char >= '0' && char <= '9') ||
            (char >= 'a' && char <= 'f') ||
            (char >= 'A' && char <= 'F'));
    }
    /**
     * 辅助方法：是否为八进制数字
     */
    isOctalDigit(char) {
        return char >= '0' && char <= '7';
    }
    /**
     * 辅助方法：是否为字母
     */
    isAlpha(char) {
        return ((char >= 'a' && char <= 'z') ||
            (char >= 'A' && char <= 'Z') ||
            // 支持中文字符
            (char.charCodeAt(0) >= 0x4e00 && char.charCodeAt(0) <= 0x9fff));
    }
    /**
     * 辅助方法：是否为字母或数字
     */
    isAlphaNumeric(char) {
        return this.isAlpha(char) || this.isDigit(char) || char === '_' || char === '$';
    }
    /**
     * 辅助方法：添加Token
     */
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
exports.Lexer = Lexer;
