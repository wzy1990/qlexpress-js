'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
    // 箭头函数
    TokenType["ARROW"] = "ARROW";
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
})(TokenType || (TokenType = {}));
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
/**
 * 安全限制错误
 */
class SecurityError extends Error {
    constructor(message) {
        super(`Security Error: ${message}`);
        this.name = 'SecurityError';
    }
}

/**
 * AST节点类型枚举
 */
var NodeType;
(function (NodeType) {
    // 字面量
    NodeType["NumberLiteral"] = "NumberLiteral";
    NodeType["StringLiteral"] = "StringLiteral";
    NodeType["BooleanLiteral"] = "BooleanLiteral";
    NodeType["NullLiteral"] = "NullLiteral";
    // 标识符
    NodeType["Identifier"] = "Identifier";
    // 数组和对象
    NodeType["ArrayExpression"] = "ArrayExpression";
    NodeType["ObjectExpression"] = "ObjectExpression";
    // 运算表达式
    NodeType["BinaryExpression"] = "BinaryExpression";
    NodeType["UnaryExpression"] = "UnaryExpression";
    NodeType["ConditionalExpression"] = "ConditionalExpression";
    NodeType["AssignmentExpression"] = "AssignmentExpression";
    NodeType["UpdateExpression"] = "UpdateExpression";
    NodeType["MemberExpression"] = "MemberExpression";
    NodeType["CallExpression"] = "CallExpression";
    NodeType["NewExpression"] = "NewExpression";
    // 语句
    NodeType["Program"] = "Program";
    NodeType["ExpressionStatement"] = "ExpressionStatement";
    NodeType["BlockStatement"] = "BlockStatement";
    NodeType["IfStatement"] = "IfStatement";
    NodeType["WhileStatement"] = "WhileStatement";
    NodeType["ForStatement"] = "ForStatement";
    NodeType["ReturnStatement"] = "ReturnStatement";
    NodeType["BreakStatement"] = "BreakStatement";
    NodeType["ContinueStatement"] = "ContinueStatement";
    NodeType["VariableDeclaration"] = "VariableDeclaration";
    NodeType["FunctionDeclaration"] = "FunctionDeclaration";
    NodeType["ArrowFunctionExpression"] = "ArrowFunctionExpression";
    NodeType["ImportStatement"] = "ImportStatement";
    // 特殊
    NodeType["InExpression"] = "InExpression";
    NodeType["LikeExpression"] = "LikeExpression";
    NodeType["BetweenExpression"] = "BetweenExpression";
    NodeType["MacroCall"] = "MacroCall";
})(NodeType || (NodeType = {}));

/**
 * 返回值包装器
 */
class ReturnValue {
    constructor(value) {
        this.value = value;
    }
}
/**
 * 控制流异常基类
 */
class ControlFlow extends Error {
    constructor(message) {
        super(message);
        this.name = 'ControlFlow';
    }
}
/**
 * Break异常
 */
class BreakException extends ControlFlow {
    constructor() {
        super('break');
        this.name = 'BreakException';
    }
}
/**
 * Continue异常
 */
class ContinueException extends ControlFlow {
    constructor() {
        super('continue');
        this.name = 'ContinueException';
    }
}
/**
 * Return异常
 */
class ReturnException extends ControlFlow {
    constructor(value) {
        super('return');
        this.value = value;
        this.name = 'ReturnException';
    }
}

/**
 * 关键字映射
 */
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
    'undefined': TokenType.NULL // undefined 也作为 null 类型处理
};
/**
 * 操作符字符映射
 */
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
        this.addToken(TokenType.EOF, null);
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
    scanOperator(char) {
        switch (char) {
            case '+':
                if (this.match('+')) {
                    this.addToken(TokenType.INCREMENT, '++');
                }
                else if (this.match('=')) {
                    this.addToken(TokenType.PLUS_ASSIGN, '+=');
                }
                else {
                    this.addToken(TokenType.PLUS, '+');
                }
                break;
            case '-':
                if (this.match('-')) {
                    this.addToken(TokenType.DECREMENT, '--');
                }
                else if (this.match('=')) {
                    this.addToken(TokenType.MINUS_ASSIGN, '-=');
                }
                else if (this.match('>')) {
                    this.addToken(TokenType.COLON, '->');
                }
                else {
                    this.addToken(TokenType.MINUS, '-');
                }
                break;
            case '*':
                if (this.match('=')) {
                    this.addToken(TokenType.STAR_ASSIGN, '*=');
                }
                else {
                    this.addToken(TokenType.STAR, '*');
                }
                break;
            case '/':
                if (this.match('=')) {
                    this.addToken(TokenType.SLASH_ASSIGN, '/=');
                }
                else {
                    this.addToken(TokenType.SLASH, '/');
                }
                break;
            case '%':
                if (this.match('=')) {
                    this.addToken(TokenType.PERCENT_ASSIGN, '%=');
                }
                else {
                    this.addToken(TokenType.PERCENT, '%');
                }
                break;
            case '=':
                if (this.match('=')) {
                    if (this.match('=')) {
                        this.addToken(TokenType.EQ, '===');
                    }
                    else {
                        this.addToken(TokenType.EQ, '==');
                    }
                }
                else if (this.match('>')) {
                    this.addToken(TokenType.ARROW, '=>');
                }
                else {
                    this.addToken(TokenType.ASSIGN, '=');
                }
                break;
            case '!':
                if (this.match('=')) {
                    if (this.match('=')) {
                        this.addToken(TokenType.NEQ, '!==');
                    }
                    else {
                        this.addToken(TokenType.NEQ, '!=');
                    }
                }
                else {
                    this.addToken(TokenType.NOT_OP, '!');
                }
                break;
            case '<':
                if (this.match('=')) {
                    this.addToken(TokenType.LTE, '<=');
                }
                else if (this.match('<')) {
                    if (this.match('=')) {
                        this.addToken(TokenType.ASSIGN, '<<=');
                    }
                    else {
                        this.addToken(TokenType.LSHIFT, '<<');
                    }
                }
                else if (this.match('>')) {
                    this.addToken(TokenType.NEQ, '<>');
                }
                else {
                    this.addToken(TokenType.LT, '<');
                }
                break;
            case '>':
                if (this.match('=')) {
                    this.addToken(TokenType.GTE, '>=');
                }
                else if (this.match('>')) {
                    if (this.match('>')) {
                        if (this.match('=')) {
                            this.addToken(TokenType.ASSIGN, '>>>=');
                        }
                        else {
                            this.addToken(TokenType.URSHIFT, '>>>');
                        }
                    }
                    else if (this.match('=')) {
                        this.addToken(TokenType.ASSIGN, '>>=');
                    }
                    else {
                        this.addToken(TokenType.RSHIFT, '>>');
                    }
                }
                else {
                    this.addToken(TokenType.GT, '>');
                }
                break;
            case '&':
                if (this.match('&')) {
                    this.addToken(TokenType.AND_OP, '&&');
                }
                else if (this.match('=')) {
                    this.addToken(TokenType.ASSIGN, '&=');
                }
                else {
                    this.addToken(TokenType.BIT_AND, '&');
                }
                break;
            case '|':
                if (this.match('|')) {
                    this.addToken(TokenType.OR_OP, '||');
                }
                else if (this.match('=')) {
                    this.addToken(TokenType.ASSIGN, '|=');
                }
                else {
                    this.addToken(TokenType.BIT_OR, '|');
                }
                break;
            case '^':
                if (this.match('=')) {
                    this.addToken(TokenType.ASSIGN, '^=');
                }
                else {
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
    scanNumber() {
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
                this.advance(); // 消费 '.'
                while (this.isDigit(this.peek())) {
                    this.advance();
                }
            }
            // 扫描指数部分
            if (this.peek() === 'e' || this.peek() === 'E') {
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
        this.addToken(TokenType.NUMBER, value, raw);
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
            throw new LexerError('Unterminated string', this.line, this.column);
        }
        this.advance(); // 闭合引号
        raw += quote;
        this.addToken(TokenType.STRING, value, raw);
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
            type = TokenType.IDENTIFIER;
        }
        // 处理布尔值和null
        if (type === TokenType.BOOLEAN) {
            this.addToken(type, text.toLowerCase() === 'true', text);
        }
        else if (type === TokenType.NULL) {
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
        throw new LexerError('Unterminated block comment', this.line, this.column);
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

/**
 * 语法分析器
 * 将Token流转换为抽象语法树(AST)
 */
class Parser {
    constructor(tokens, macros, operatorAliases) {
        this.tokens = [];
        this.current = 0;
        this.macros = new Map();
        this.operatorAliases = new Map();
        this.tokens = tokens;
        if (macros)
            this.macros = macros;
        if (operatorAliases)
            this.operatorAliases = operatorAliases;
    }
    /**
     * 解析表达式，返回AST
     */
    parse() {
        const body = [];
        while (!this.isAtEnd()) {
            const stmt = this.parseStatement();
            if (stmt) {
                body.push(stmt);
            }
        }
        return {
            type: NodeType.Program,
            body
        };
    }
    /**
     * 解析语句
     */
    parseStatement() {
        // 跳过换行符
        while (this.check(TokenType.NEWLINE)) {
            this.advance();
        }
        if (this.isAtEnd())
            return null;
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
                // 检查是否是对象字面量还是块语句
                // 如果 { 后面跟着标识符然后是冒号，则是对象字面量
                if (this.isObjectLiteral()) {
                    return this.parseExpressionStatement();
                }
                return this.parseBlockStatement();
            case TokenType.SEMICOLON:
                this.advance();
                return null;
            default:
                // 检查变量声明（标识符后跟赋值操作）
                if (this.check(TokenType.IDENTIFIER)) {
                    const nextToken = this.peekNext();
                    if (nextToken && (nextToken.type === TokenType.ASSIGN ||
                        nextToken.type === TokenType.PLUS_ASSIGN ||
                        nextToken.type === TokenType.MINUS_ASSIGN ||
                        nextToken.type === TokenType.STAR_ASSIGN ||
                        nextToken.type === TokenType.SLASH_ASSIGN ||
                        nextToken.type === TokenType.PERCENT_ASSIGN)) {
                        return this.parseExpressionStatement();
                    }
                }
                return this.parseExpressionStatement();
        }
    }
    /**
     * 解析if语句
     */
    parseIfStatement() {
        const token = this.advance(); // 消费 'if'
        this.consume(TokenType.LPAREN, "Expect '(' after 'if'");
        const test = this.parseExpression();
        this.consume(TokenType.RPAREN, "Expect ')' after condition");
        // 可选的 'then' 关键字
        if (this.check(TokenType.THEN)) {
            this.advance();
        }
        // 跳过换行
        while (this.check(TokenType.NEWLINE)) {
            this.advance();
        }
        const consequent = this.parseStatement() || { type: NodeType.BlockStatement, body: [] };
        // 跳过换行
        while (this.check(TokenType.NEWLINE)) {
            this.advance();
        }
        let alternate = null;
        if (this.check(TokenType.ELSE)) {
            this.advance();
            // 跳过换行
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
    /**
     * 解析for语句
     */
    parseForStatement() {
        const token = this.advance(); // 消费 'for'
        this.consume(TokenType.LPAREN, "Expect '(' after 'for'");
        // 初始化
        let init = null;
        if (!this.check(TokenType.SEMICOLON)) {
            init = this.parseExpression();
        }
        this.consume(TokenType.SEMICOLON, "Expect ';' after for init");
        // 条件
        let test = null;
        if (!this.check(TokenType.SEMICOLON)) {
            test = this.parseExpression();
        }
        this.consume(TokenType.SEMICOLON, "Expect ';' after for condition");
        // 更新
        let update = null;
        if (!this.check(TokenType.RPAREN)) {
            update = this.parseExpression();
        }
        this.consume(TokenType.RPAREN, "Expect ')' after for clauses");
        // 跳过换行
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
    /**
     * 解析while语句
     */
    parseWhileStatement() {
        const token = this.advance(); // 消费 'while'
        this.consume(TokenType.LPAREN, "Expect '(' after 'while'");
        const test = this.parseExpression();
        this.consume(TokenType.RPAREN, "Expect ')' after condition");
        // 跳过换行
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
    /**
     * 解析return语句
     */
    parseReturnStatement() {
        const token = this.advance(); // 消费 'return'
        let argument = null;
        if (!this.check(TokenType.SEMICOLON) && !this.check(TokenType.NEWLINE) && !this.check(TokenType.RBRACE) && !this.isAtEnd()) {
            argument = this.parseExpression();
        }
        // 消费可选的分号
        if (this.check(TokenType.SEMICOLON)) {
            this.advance();
        }
        return {
            type: NodeType.ReturnStatement,
            argument,
            loc: this.createLocation(token)
        };
    }
    /**
     * 解析break语句
     */
    parseBreakStatement() {
        const token = this.advance(); // 消费 'break'
        // 消费可选的分号
        if (this.check(TokenType.SEMICOLON)) {
            this.advance();
        }
        return {
            type: NodeType.BreakStatement,
            loc: this.createLocation(token)
        };
    }
    /**
     * 解析continue语句
     */
    parseContinueStatement() {
        const token = this.advance(); // 消费 'continue'
        // 消费可选的分号
        if (this.check(TokenType.SEMICOLON)) {
            this.advance();
        }
        return {
            type: NodeType.ContinueStatement,
            loc: this.createLocation(token)
        };
    }
    /**
     * 解析函数声明
     */
    parseFunctionDeclaration() {
        const token = this.advance(); // 消费 'function'
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
        // 跳过换行
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
    /**
     * 解析import语句
     */
    parseImportStatement() {
        const token = this.advance(); // 消费 'import'
        const source = this.parsePrimary();
        return {
            type: NodeType.ImportStatement,
            source,
            loc: this.createLocation(token)
        };
    }
    /**
     * 解析块语句
     */
    parseBlockStatement() {
        const token = this.advance(); // 消费 '{'
        const body = [];
        while (!this.check(TokenType.RBRACE) && !this.isAtEnd()) {
            // 跳过换行
            while (this.check(TokenType.NEWLINE)) {
                this.advance();
            }
            if (this.check(TokenType.RBRACE))
                break;
            const stmt = this.parseStatement();
            if (stmt) {
                body.push(stmt);
            }
        }
        this.consume(TokenType.RBRACE, "Expect '}' after block");
        return {
            type: NodeType.BlockStatement,
            body,
            loc: this.createLocation(token)
        };
    }
    /**
     * 解析表达式语句
     */
    parseExpressionStatement() {
        const expr = this.parseExpression();
        // 消费可选的分号
        if (this.check(TokenType.SEMICOLON)) {
            this.advance();
        }
        return {
            type: NodeType.ExpressionStatement,
            expression: expr
        };
    }
    /**
     * 解析表达式
     */
    parseExpression() {
        return this.parseAssignment();
    }
    /**
     * 解析赋值表达式
     */
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
    /**
     * 解析条件表达式（三元运算符）
     */
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
        // 检查箭头函数
        if (this.check(TokenType.ARROW)) {
            return this.parseArrowFunction(expr);
        }
        return expr;
    }
    /**
     * 解析逻辑或表达式
     */
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
    /**
     * 解析逻辑与表达式
     */
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
    /**
     * 解析按位或表达式
     */
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
    /**
     * 解析按位异或表达式
     */
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
    /**
     * 解析按位与表达式
     */
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
    /**
     * 解析相等比较表达式
     */
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
    /**
     * 解析比较表达式
     */
    parseComparison() {
        let left = this.parseShift();
        while (this.match(TokenType.LT) || this.match(TokenType.GT) ||
            this.match(TokenType.LTE) || this.match(TokenType.GTE) ||
            this.match(TokenType.IN) || this.match(TokenType.LIKE) || this.match(TokenType.BETWEEN)) {
            const operator = this.previous().type;
            if (operator === TokenType.IN) {
                const right = this.parseShift();
                left = {
                    type: NodeType.InExpression,
                    element: left,
                    container: right,
                    loc: this.createLocation(left)
                };
            }
            else if (operator === TokenType.LIKE) {
                const right = this.parseShift();
                left = {
                    type: NodeType.LikeExpression,
                    value: left,
                    pattern: right,
                    loc: this.createLocation(left)
                };
            }
            else if (operator === TokenType.BETWEEN) {
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
            }
            else {
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
    /**
     * 解析位移表达式
     */
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
    /**
     * 解析加减表达式
     */
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
    /**
     * 解析乘除表达式
     */
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
    /**
     * 解析一元表达式
     */
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
    /**
     * 解析后缀表达式
     */
    parsePostfix() {
        let expr = this.parseCall();
        // 后缀自增/自减
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
    /**
     * 解析函数调用和成员访问
     */
    parseCall() {
        let expr = this.parsePrimary();
        while (true) {
            if (this.match(TokenType.LPAREN)) {
                expr = this.finishCall(expr);
            }
            else if (this.match(TokenType.DOT)) {
                const nameToken = this.consume(TokenType.IDENTIFIER, "Expect property name after '.'");
                const name = { type: NodeType.Identifier, name: nameToken.value, loc: this.createLocation(nameToken) };
                expr = {
                    type: NodeType.MemberExpression,
                    object: expr,
                    property: name,
                    computed: false,
                    loc: this.createLocation(expr)
                };
            }
            else if (this.match(TokenType.LBRACKET)) {
                const property = this.parseExpression();
                this.consume(TokenType.RBRACKET, "Expect ']' after index");
                expr = {
                    type: NodeType.MemberExpression,
                    object: expr,
                    property,
                    computed: true,
                    loc: this.createLocation(expr)
                };
            }
            else {
                break;
            }
        }
        return expr;
    }
    /**
     * 完成函数调用
     */
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
    /**
     * 解析基本表达式
     */
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
                    value: token.value, // 使用token的value（可能是null或undefined）
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
                // 检查是否是箭头函数的参数列表 (a, b) => ...
                if (this.isArrowParameterList()) {
                    const params = this.parseArrowParameters();
                    this.consume(TokenType.RPAREN, "Expect ')' after parameters");
                    if (this.check(TokenType.ARROW)) {
                        return this.parseArrowFunctionWithParams(params);
                    }
                    // 如果不是箭头函数，则将参数列表转换为逗号表达式
                    if (params.length === 1) {
                        return params[0];
                    }
                    else {
                        // 创建一个逗号表达式
                        let result = params[0];
                        for (let i = 1; i < params.length; i++) {
                            result = {
                                type: NodeType.BinaryExpression,
                                operator: ',',
                                left: result,
                                right: params[i],
                                loc: result.loc
                            };
                        }
                        return result;
                    }
                }
                const expr = this.parseExpression();
                this.consume(TokenType.RPAREN, "Expect ')' after expression");
                // 检查是否是箭头函数 x => ...
                if (this.check(TokenType.ARROW)) {
                    return this.parseArrowFunction(expr);
                }
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
    /**
     * 解析new表达式
     */
    parseNewExpression() {
        const token = this.advance(); // 消费 'new'
        const callee = this.parsePrimary();
        let args = [];
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
    /**
     * 检查是否是箭头函数的参数列表
     */
    isArrowParameterList() {
        let index = this.current;
        // 跳过换行
        while (index < this.tokens.length && this.tokens[index].type === TokenType.NEWLINE) {
            index++;
        }
        if (index >= this.tokens.length)
            return false;
        // 第一个必须是标识符
        if (this.tokens[index].type !== TokenType.IDENTIFIER)
            return false;
        index++;
        // 跳过换行
        while (index < this.tokens.length && this.tokens[index].type === TokenType.NEWLINE) {
            index++;
        }
        // 检查后续是否是逗号分隔的标识符
        while (index < this.tokens.length) {
            const token = this.tokens[index];
            if (token.type === TokenType.RPAREN) {
                // 到达右括号，是参数列表
                return true;
            }
            if (token.type === TokenType.COMMA) {
                index++;
                // 跳过换行
                while (index < this.tokens.length && this.tokens[index].type === TokenType.NEWLINE) {
                    index++;
                }
                // 逗号后必须是标识符
                if (index >= this.tokens.length || this.tokens[index].type !== TokenType.IDENTIFIER) {
                    return false;
                }
                index++;
            }
            else if (token.type === TokenType.NEWLINE) {
                index++;
            }
            else {
                return false;
            }
        }
        return false;
    }
    /**
     * 解析箭头函数的参数列表
     */
    parseArrowParameters() {
        const params = [];
        do {
            // 跳过换行
            while (this.check(TokenType.NEWLINE)) {
                this.advance();
            }
            const paramToken = this.consume(TokenType.IDENTIFIER, "Expect parameter name");
            params.push({
                type: NodeType.Identifier,
                name: paramToken.value,
                loc: this.createLocation(paramToken)
            });
            // 跳过换行
            while (this.check(TokenType.NEWLINE)) {
                this.advance();
            }
        } while (this.match(TokenType.COMMA));
        return params;
    }
    /**
     * 解析箭头函数表达式（带参数列表）
     */
    parseArrowFunctionWithParams(params) {
        const token = this.advance(); // 消费 ARROW token
        let body;
        // 检查是否是块级体
        if (this.check(TokenType.LBRACE)) {
            body = this.parseBlockStatement();
        }
        else {
            // 简洁体
            body = this.parseAssignment();
        }
        return {
            type: NodeType.ArrowFunctionExpression,
            params,
            body,
            loc: this.createLocation(token)
        };
    }
    /**
     * 解析箭头函数表达式
     */
    parseArrowFunction(leftExpr) {
        const token = this.previous(); // ARROW token
        let params = [];
        // 如果左边是标识符，则是单参数箭头函数
        if (leftExpr.type === NodeType.Identifier) {
            params = [leftExpr];
        }
        else if (leftExpr.type === NodeType.CallExpression) {
            // 如果是 (a, b) 形式，从调用表达式中提取参数
            const callExpr = leftExpr;
            if (callExpr.callee.type === NodeType.Identifier) {
                // 检查是否是 (a, b) => ... 形式
                // 这种情况下，callee 应该是一个标识符，但我们需要从 arguments 中提取参数
                // 实际上，这种情况下应该是在 parsePrimary 中处理 (a, b) 形式
                // 这里我们假设 arguments 是标识符列表
                for (const arg of callExpr.arguments) {
                    if (arg.type === NodeType.Identifier) {
                        params.push(arg);
                    }
                    else {
                        throw new ParseError(`Invalid arrow function parameter`, token);
                    }
                }
            }
        }
        // 消费 ARROW token
        this.advance();
        let body;
        // 检查是否是块级体
        if (this.check(TokenType.LBRACE)) {
            body = this.parseBlockStatement();
        }
        else {
            // 简洁体
            body = this.parseAssignment();
        }
        return {
            type: NodeType.ArrowFunctionExpression,
            params,
            body,
            loc: this.createLocation(token)
        };
    }
    /**
     * 解析数组表达式
     */
    parseArrayExpression() {
        const token = this.advance(); // 消费 '['
        const elements = [];
        if (!this.check(TokenType.RBRACKET)) {
            do {
                elements.push(this.parseExpression());
            } while (this.match(TokenType.COMMA));
        }
        this.consume(TokenType.RBRACKET, "Expect ']' after array elements");
        return {
            type: NodeType.ArrayExpression,
            elements,
            loc: this.createLocation(token)
        };
    }
    /**
     * 解析对象表达式
     */
    parseObjectExpression() {
        const token = this.advance(); // 消费 '{'
        const properties = [];
        if (!this.check(TokenType.RBRACE)) {
            do {
                // 跳过换行
                while (this.check(TokenType.NEWLINE)) {
                    this.advance();
                }
                let key;
                let computed = false;
                if (this.match(TokenType.LBRACKET)) {
                    // 计算属性
                    key = this.parseExpression();
                    this.consume(TokenType.RBRACKET, "Expect ']' after computed property");
                    computed = true;
                }
                else if (this.check(TokenType.IDENTIFIER)) {
                    key = {
                        type: NodeType.Identifier,
                        name: this.advance().value,
                        loc: this.createLocation(this.previous())
                    };
                }
                else if (this.check(TokenType.STRING)) {
                    key = {
                        type: NodeType.StringLiteral,
                        value: this.advance().value,
                        loc: this.createLocation(this.previous())
                    };
                }
                else if (this.check(TokenType.NUMBER)) {
                    key = {
                        type: NodeType.NumberLiteral,
                        value: this.advance().value,
                        loc: this.createLocation(this.previous())
                    };
                }
                else {
                    throw new ParseError('Expect property name', this.peek());
                }
                this.consume(TokenType.COLON, "Expect ':' after property name");
                const value = this.parseExpression();
                properties.push({ key, value, computed });
            } while (this.match(TokenType.COMMA));
        }
        this.consume(TokenType.RBRACE, "Expect '}' after object properties");
        return {
            type: NodeType.ObjectExpression,
            properties,
            loc: this.createLocation(token)
        };
    }
    // ============ 辅助方法 ============
    /**
     * 检查是否是对象字面量
     * 对象字面量: { 后面跟着标识符/字符串/数字，然后是冒号
     */
    isObjectLiteral() {
        // 保存当前位置
        const savedCurrent = this.current;
        // 跳过 {
        this.advance();
        // 跳过换行
        while (this.check(TokenType.NEWLINE)) {
            this.advance();
        }
        // 检查第一个属性
        const firstToken = this.peek();
        let isObject = false;
        if (firstToken.type === TokenType.IDENTIFIER ||
            firstToken.type === TokenType.STRING ||
            firstToken.type === TokenType.NUMBER) {
            this.advance();
            // 检查是否是冒号
            if (this.check(TokenType.COLON)) {
                isObject = true;
            }
        }
        else if (firstToken.type === TokenType.RBRACE) {
            // 空对象 {}
            isObject = true;
        }
        // 恢复位置
        this.current = savedCurrent;
        return isObject;
    }
    /**
     * 检查并跳过换行符
     */
    skipNewlines() {
        while (this.current < this.tokens.length && this.tokens[this.current].type === TokenType.NEWLINE) {
            this.current++;
        }
    }
    peek() {
        return this.tokens[this.current];
    }
    peekNext() {
        if (this.current + 1 >= this.tokens.length)
            return null;
        return this.tokens[this.current + 1];
    }
    previous() {
        return this.tokens[this.current - 1];
    }
    advance() {
        if (!this.isAtEnd())
            this.current++;
        return this.previous();
    }
    isAtEnd() {
        return this.peek().type === TokenType.EOF;
    }
    check(type) {
        // 检查前也要跳过换行符
        this.skipNewlines();
        if (this.isAtEnd())
            return false;
        return this.peek().type === type;
    }
    /**
     * 匹配指定类型的 Token，会在匹配前跳过换行符
     */
    match(type) {
        // 先跳过换行符
        this.skipNewlines();
        if (this.check(type)) {
            this.advance();
            return true;
        }
        return false;
    }
    consume(type, message) {
        // consume 前也要跳过换行符
        this.skipNewlines();
        if (this.check(type))
            return this.advance();
        throw new ParseError(message, this.peek());
    }
    createLocation(start) {
        if ('line' in start) {
            return {
                start: { line: start.line, column: start.column },
                end: { line: this.previous().line, column: this.previous().column }
            };
        }
        return start.loc;
    }
}

/**
 * 作用域类
 * 实现变量存储和作用域链
 */
class Scope {
    constructor(parent = null) {
        this.variables = new Map();
        this.parent = parent;
    }
    /**
     * 获取变量值
     */
    get(name) {
        if (this.variables.has(name)) {
            return this.variables.get(name);
        }
        if (this.parent) {
            return this.parent.get(name);
        }
        return undefined;
    }
    /**
     * 设置变量值（向上查找已存在的变量）
     */
    set(name, value) {
        if (this.variables.has(name)) {
            this.variables.set(name, value);
            return;
        }
        if (this.parent && this.parent.has(name)) {
            this.parent.set(name, value);
            return;
        }
        // 如果变量不存在，在当前作用域创建
        this.variables.set(name, value);
    }
    /**
     * 在当前作用域定义变量
     */
    define(name, value) {
        this.variables.set(name, value);
    }
    /**
     * 检查变量是否存在
     */
    has(name) {
        if (this.variables.has(name)) {
            return true;
        }
        if (this.parent) {
            return this.parent.has(name);
        }
        return false;
    }
    /**
     * 删除变量（仅当前作用域）
     */
    delete(name) {
        return this.variables.delete(name);
    }
    /**
     * 清空当前作用域变量
     */
    clear() {
        this.variables.clear();
    }
    /**
     * 获取所有变量名
     */
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
    /**
     * 转换为普通对象
     */
    toObject() {
        const result = {};
        this.collectToObject(result);
        return result;
    }
    collectToObject(result) {
        if (this.parent) {
            this.parent.collectToObject(result);
        }
        this.variables.forEach((value, key) => {
            result[key] = value;
        });
    }
    /**
     * 获取父作用域
     */
    getParent() {
        return this.parent;
    }
    /**
     * 创建子作用域
     */
    createChild() {
        return new Scope(this);
    }
    /**
     * 克隆当前作用域（用于闭包）
     */
    clone() {
        const cloned = new Scope(this.parent);
        // 复制当前作用域的所有变量
        this.variables.forEach((value, key) => {
            cloned.define(key, value);
        });
        return cloned;
    }
    /**
     * 合并另一个作用域的变量到当前作用域
     */
    merge(other) {
        other.variables.forEach((value, key) => {
            if (!this.variables.has(key)) {
                this.variables.set(key, value);
            }
        });
    }
}
/**
 * 运行时上下文
 * 提供全局作用域和内置对象
 */
class RuntimeContext {
    constructor(initialVars = {}) {
        this.globalScope = new Scope();
        this.currentScope = this.globalScope;
        // 初始化变量
        for (const [key, value] of Object.entries(initialVars)) {
            this.globalScope.define(key, value);
        }
    }
    /**
     * 进入新作用域
     */
    enterScope() {
        this.currentScope = this.currentScope.createChild();
        return this.currentScope;
    }
    /**
     * 退出当前作用域
     */
    exitScope() {
        const parent = this.currentScope.getParent();
        if (parent) {
            this.currentScope = parent;
        }
    }
    /**
     * 获取当前作用域
     */
    getCurrentScope() {
        return this.currentScope;
    }
    /**
     * 获取全局作用域
     */
    getGlobalScope() {
        return this.globalScope;
    }
    // IContext 接口实现
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
    delete(name) {
        return this.currentScope.delete(name);
    }
    clear() {
        this.currentScope.clear();
    }
    keys() {
        return this.currentScope.keys();
    }
    toObject() {
        return this.currentScope.toObject();
    }
}
/**
 * 内置对象
 */
class BuiltinObjects {
    /**
     * 获取所有内置对象
     */
    static getAll() {
        return {
            Math: BuiltinObjects.Math,
            JSON: BuiltinObjects.JSON,
            Array: BuiltinObjects.Array,
            Object: BuiltinObjects.Object,
            String: BuiltinObjects.String,
            Number: BuiltinObjects.Number,
            Date: BuiltinObjects.Date,
            Boolean: BuiltinObjects.Boolean,
            RegExp: BuiltinObjects.RegExp,
            Error: BuiltinObjects.Error,
            Map: BuiltinObjects.Map,
            Set: BuiltinObjects.Set,
            Promise: BuiltinObjects.Promise
        };
    }
}
/**
 * Math对象
 */
BuiltinObjects.Math = {
    abs: Math.abs,
    ceil: Math.ceil,
    floor: Math.floor,
    round: Math.round,
    sqrt: Math.sqrt,
    pow: Math.pow,
    log: Math.log,
    log10: Math.log10,
    log2: Math.log2,
    exp: Math.exp,
    sin: Math.sin,
    cos: Math.cos,
    tan: Math.tan,
    asin: Math.asin,
    acos: Math.acos,
    atan: Math.atan,
    atan2: Math.atan2,
    max: Math.max,
    min: Math.min,
    random: Math.random,
    PI: Math.PI,
    E: Math.E,
    LN2: Math.LN2,
    LN10: Math.LN10,
    LOG2E: Math.LOG2E,
    LOG10E: Math.LOG10E,
    SQRT2: Math.SQRT2,
    SQRT1_2: Math.SQRT1_2
};
/**
 * JSON对象
 */
BuiltinObjects.JSON = {
    parse: JSON.parse,
    stringify: JSON.stringify
};
/**
 * Array对象
 */
BuiltinObjects.Array = Array;
/**
 * Object对象
 */
BuiltinObjects.Object = {
    keys: Object.keys,
    values: Object.values,
    entries: Object.entries,
    assign: Object.assign,
    create: Object.create,
    freeze: Object.freeze,
    fromEntries: Object.fromEntries
};
/**
 * String对象
 */
BuiltinObjects.String = {
    fromCharCode: String.fromCharCode,
    fromCodePoint: String.fromCodePoint
};
/**
 * Number对象
 */
BuiltinObjects.Number = {
    isNaN: Number.isNaN,
    isFinite: Number.isFinite,
    isInteger: Number.isInteger,
    parseFloat: Number.parseFloat,
    parseInt: Number.parseInt,
    MAX_VALUE: Number.MAX_VALUE,
    MIN_VALUE: Number.MIN_VALUE,
    POSITIVE_INFINITY: Number.POSITIVE_INFINITY,
    NEGATIVE_INFINITY: Number.NEGATIVE_INFINITY
};
/**
 * Date对象
 */
BuiltinObjects.Date = Date;
/**
 * Boolean对象
 */
BuiltinObjects.Boolean = Boolean;
/**
 * RegExp对象
 */
BuiltinObjects.RegExp = RegExp;
/**
 * Error对象
 */
BuiltinObjects.Error = Error;
/**
 * Map对象
 */
BuiltinObjects.Map = Map;
/**
 * Set对象
 */
BuiltinObjects.Set = Set;
/**
 * Promise对象
 */
BuiltinObjects.Promise = Promise;

/**
 * 解释器
 * 执行AST并返回结果
 */
class Interpreter {
    constructor(context, config = {}) {
        this.traces = [];
        this.loopCount = 0;
        this.startTime = 0;
        this.customFunctions = new Map();
        this.customOperators = new Map();
        this.macros = new Map();
        this.userFunctions = new Map();
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
        }
        catch (error) {
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
    addFunction(name, handler) {
        this.customFunctions.set(name, handler);
    }
    /**
     * 添加自定义操作符
     */
    addOperator(name, handler) {
        this.customOperators.set(name, handler);
    }
    /**
     * 添加宏
     */
    addMacro(name, expression) {
        this.macros.set(name, expression);
    }
    /**
     * 检查安全限制
     */
    checkSecurity() {
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
    addTrace(node, action, result) {
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
            case NodeType.ArrowFunctionExpression:
                return this.evaluateArrowFunctionExpression(node);
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
            case NodeType.VariableDeclaration:
                return this.evaluateVariableDeclaration(node);
            default:
                throw new RuntimeError(`Unknown node type: ${node.type}`);
        }
    }
    /**
     * 评估程序
     */
    evaluateProgram(node) {
        let result = undefined;
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
    evaluateIdentifier(node) {
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
    evaluateArrayExpression(node) {
        const { maxArrayLength } = this.config.security;
        if (node.elements.length > maxArrayLength) {
            throw new RuntimeError(`Array length exceeds maximum: ${maxArrayLength}`);
        }
        return node.elements.map(element => this.evaluate(element));
    }
    /**
     * 评估对象表达式
     */
    evaluateObjectExpression(node) {
        const obj = {};
        for (const prop of node.properties) {
            let key;
            if (prop.key.type === NodeType.Identifier) {
                key = prop.key.name;
            }
            else if (prop.key.type === NodeType.StringLiteral) {
                key = prop.key.value;
            }
            else if (prop.key.type === NodeType.NumberLiteral) {
                key = prop.key.value;
            }
            else {
                key = String(this.evaluate(prop.key));
            }
            obj[key] = this.evaluate(prop.value);
        }
        return obj;
    }
    /**
     * 评估二元表达式
     */
    evaluateBinaryExpression(node) {
        const operator = node.operator;
        // 短路求值
        if (this.config.shortCircuit) {
            if (operator === '&&') {
                const left = this.evaluate(node.left);
                if (!left)
                    return false;
                return Boolean(this.evaluate(node.right));
            }
            if (operator === '||') {
                const left = this.evaluate(node.left);
                if (left)
                    return true;
                return Boolean(this.evaluate(node.right));
            }
        }
        const left = this.evaluate(node.left);
        const right = this.evaluate(node.right);
        // 检查自定义操作符
        if (this.customOperators.has(operator)) {
            return this.customOperators.get(operator)([left, right], this.context);
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
    evaluateUnaryExpression(node) {
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
    evaluateConditionalExpression(node) {
        const test = this.evaluate(node.test);
        return test ? this.evaluate(node.consequent) : this.evaluate(node.alternate);
    }
    /**
     * 评估赋值表达式
     */
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
            const memberExpr = node.left;
            const object = this.evaluate(memberExpr.object);
            const property = memberExpr.computed
                ? this.evaluate(memberExpr.property)
                : memberExpr.property.name;
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
    evaluateUpdateExpression(node) {
        const getValue = () => {
            if (node.argument.type === NodeType.Identifier) {
                return this.toNumber(this.context.get(node.argument.name) ?? 0);
            }
            if (node.argument.type === NodeType.MemberExpression) {
                const object = this.evaluate(node.argument.object);
                const property = node.argument.computed
                    ? this.evaluate(node.argument.property)
                    : node.argument.property.name;
                return this.toNumber(object[property] ?? 0);
            }
            throw new RuntimeError('Invalid update target');
        };
        const setValue = (value) => {
            if (node.argument.type === NodeType.Identifier) {
                this.context.set(node.argument.name, value);
            }
            else if (node.argument.type === NodeType.MemberExpression) {
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
    /**
     * 评估成员访问表达式
     */
    evaluateMemberExpression(node) {
        const object = this.evaluate(node.object);
        let property;
        if (node.computed) {
            property = this.evaluate(node.property);
        }
        else {
            property = node.property.name;
        }
        // 支持Map和Set
        if (object instanceof Map) {
            if (property === 'get') {
                return (key) => object.get(key);
            }
            if (property === 'set') {
                return (key, value) => { object.set(key, value); };
            }
            if (property === 'has') {
                return (key) => object.has(key);
            }
            if (property === 'delete') {
                return (key) => object.delete(key);
            }
            if (property === 'size') {
                return object.size;
            }
            return object.get(property);
        }
        if (object instanceof Set) {
            if (property === 'has') {
                return (value) => object.has(value);
            }
            if (property === 'add') {
                return (value) => { object.add(value); };
            }
            if (property === 'delete') {
                return (value) => object.delete(value);
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
    evaluateCallExpression(node) {
        const args = node.arguments.map(arg => this.evaluate(arg));
        // 处理成员方法调用
        if (node.callee.type === NodeType.MemberExpression) {
            const memberExpr = node.callee;
            const object = this.evaluate(memberExpr.object);
            let method;
            if (memberExpr.computed) {
                method = this.evaluate(memberExpr.property);
            }
            else {
                method = memberExpr.property.name;
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
        if (this.customFunctions.has(node.callee.type === NodeType.Identifier ? node.callee.name : '')) {
            const funcName = node.callee.name;
            const func = this.customFunctions.get(funcName);
            return func(...args);
        }
        // 用户定义函数
        if (node.callee.type === NodeType.Identifier) {
            const funcName = node.callee.name;
            if (this.userFunctions.has(funcName)) {
                return this.callUserFunction(this.userFunctions.get(funcName), args);
            }
        }
        // 箭头函数
        if (callee && typeof callee === 'function' && callee.__isArrowFunction) {
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
    callUserFunction(func, args) {
        // 创建新的作用域
        this.context.getCurrentScope();
        this.context.enterScope();
        // 绑定参数
        for (let i = 0; i < func.params.length; i++) {
            this.context.define(func.params[i], args[i]);
        }
        // 执行函数体
        let result = undefined;
        try {
            result = this.evaluate(func.body);
        }
        catch (error) {
            if (error instanceof ReturnException) {
                result = error.value;
            }
            else {
                throw error;
            }
        }
        finally {
            this.context.exitScope();
        }
        return result;
    }
    /**
     * 评估new表达式
     */
    evaluateNewExpression(node) {
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
    evaluateArrowFunctionExpression(node) {
        // 保存当前作用域作为闭包
        const closure = this.context.getCurrentScope().clone();
        // 提取参数名
        const params = node.params.map(param => {
            if (param.type === NodeType.Identifier) {
                return param.name;
            }
            throw new RuntimeError('Invalid parameter in arrow function');
        });
        // 创建可调用的函数对象
        const arrowFunc = (...args) => {
            // 保存当前作用域
            this.context.getCurrentScope();
            // 创建新的作用域，继承闭包
            this.context.enterScope();
            this.context.getCurrentScope().merge(closure);
            // 绑定参数
            for (let i = 0; i < params.length; i++) {
                this.context.define(params[i], args[i]);
            }
            // 执行函数体
            let result = undefined;
            try {
                result = this.evaluate(node.body);
            }
            catch (error) {
                if (error instanceof ReturnException) {
                    result = error.value;
                }
                else {
                    throw error;
                }
            }
            finally {
                // 恢复之前的作用域
                this.context.exitScope();
            }
            return result;
        };
        // 标记为箭头函数
        arrowFunc.__isArrowFunction = true;
        arrowFunc.__params = params;
        arrowFunc.__body = node.body;
        arrowFunc.__closure = closure;
        return arrowFunc;
    }
    /**
     * 评估IN表达式
     */
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
    /**
     * 评估LIKE表达式
     */
    evaluateLikeExpression(node) {
        const value = String(this.evaluate(node.value));
        const pattern = String(this.evaluate(node.pattern));
        // 将SQL风格的LIKE模式转换为正则表达式
        const regexPattern = pattern
            .replace(/[.+^${}()|[\]\\]/g, '\\$&') // 转义特殊字符
            .replace(/%/g, '.*') // % 匹配任意字符序列
            .replace(/_/g, '.'); // _ 匹配单个字符
        const regex = new RegExp(`^${regexPattern}$`, 'i');
        return regex.test(value);
    }
    /**
     * 评估BETWEEN表达式
     */
    evaluateBetweenExpression(node) {
        const value = this.toNumber(this.evaluate(node.value));
        const low = this.toNumber(this.evaluate(node.low));
        const high = this.toNumber(this.evaluate(node.high));
        return value >= low && value <= high;
    }
    /**
     * 评估块语句
     */
    evaluateBlockStatement(node) {
        let result = undefined;
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
    evaluateIfStatement(node) {
        const test = this.evaluate(node.test);
        if (test) {
            return this.evaluate(node.consequent);
        }
        else if (node.alternate) {
            return this.evaluate(node.alternate);
        }
        return undefined;
    }
    /**
     * 评估while语句
     */
    evaluateWhileStatement(node) {
        let result = undefined;
        while (this.evaluate(node.test)) {
            this.loopCount++;
            this.checkSecurity();
            try {
                result = this.evaluate(node.body);
            }
            catch (error) {
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
    evaluateForStatement(node) {
        // 初始化
        if (node.init) {
            this.evaluate(node.init);
        }
        let result = undefined;
        while (node.test ? this.evaluate(node.test) : true) {
            this.loopCount++;
            this.checkSecurity();
            try {
                result = this.evaluate(node.body);
            }
            catch (error) {
                if (error instanceof BreakException) {
                    break;
                }
                if (error instanceof ContinueException) ;
                else {
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
    evaluateReturnStatement(node) {
        const value = node.argument ? this.evaluate(node.argument) : undefined;
        throw new ReturnException(value);
    }
    /**
     * 评估函数声明
     */
    evaluateFunctionDeclaration(node) {
        const func = {
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
    evaluateVariableDeclaration(node) {
        for (const declarator of node.declarations) {
            const value = declarator.init ? this.evaluate(declarator.init) : undefined;
            this.context.define(declarator.id.name, value);
        }
    }
    // ============ 辅助方法 ============
    /**
     * 转换为数字
     */
    toNumber(value) {
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
    isEqual(left, right) {
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

/**
 * 内置函数集合
 */
const builtinFunctions = {
    /**
     * 数学函数
     */
    abs: (x) => Math.abs(x),
    ceil: (x) => Math.ceil(x),
    floor: (x) => Math.floor(x),
    round: (x) => Math.round(x),
    sqrt: (x) => Math.sqrt(x),
    pow: (x, y) => Math.pow(x, y),
    exp: (x) => Math.exp(x),
    log: (x) => Math.log(x),
    log10: (x) => Math.log10(x),
    log2: (x) => Math.log2(x),
    /**
     * 三角函数
     */
    sin: (x) => Math.sin(x),
    cos: (x) => Math.cos(x),
    tan: (x) => Math.tan(x),
    asin: (x) => Math.asin(x),
    acos: (x) => Math.acos(x),
    atan: (x) => Math.atan(x),
    atan2: (y, x) => Math.atan2(y, x),
    /**
     * 聚合函数
     */
    min: (...args) => Math.min(...args),
    max: (...args) => Math.max(...args),
    sum: (...args) => args.reduce((a, b) => a + b, 0),
    avg: (...args) => {
        if (args.length === 0)
            return 0;
        return args.reduce((a, b) => a + b, 0) / args.length;
    },
    /**
     * 类型转换函数
     */
    parseInt: (s, radix) => parseInt(s, radix || 10),
    parseFloat: (s) => parseFloat(s),
    toString: (value) => String(value),
    toNumber: (value) => {
        if (typeof value === 'number')
            return value;
        if (typeof value === 'string')
            return parseFloat(value);
        if (typeof value === 'boolean')
            return value ? 1 : 0;
        return 0;
    },
    toBoolean: (value) => Boolean(value),
    /**
     * 类型检查函数
     */
    isNaN: (value) => Number.isNaN(value),
    isFinite: (value) => Number.isFinite(value),
    isInteger: (value) => Number.isInteger(value),
    isArray: (value) => Array.isArray(value),
    isObject: (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
    isString: (value) => typeof value === 'string',
    isNumber: (value) => typeof value === 'number',
    isBoolean: (value) => typeof value === 'boolean',
    isFunction: (value) => typeof value === 'function',
    isNull: (value) => value === null,
    isUndefined: (value) => value === undefined,
    isEmpty: (value) => {
        if (value == null)
            return true;
        if (typeof value === 'string')
            return value.length === 0;
        if (Array.isArray(value))
            return value.length === 0;
        if (value instanceof Map || value instanceof Set)
            return value.size === 0;
        if (typeof value === 'object')
            return Object.keys(value).length === 0;
        return false;
    },
    /**
     * 字符串函数
     */
    strlen: (s) => s.length,
    strlenb: (s) => {
        // 使用TextEncoder代替Buffer
        try {
            return new TextEncoder().encode(s).length;
        }
        catch {
            return s.length;
        }
    },
    substr: (s, start, length) => s.substr(start, length),
    substring: (s, start, end) => s.substring(start, end),
    indexOf: (s, search, position) => s.indexOf(search, position),
    lastIndexOf: (s, search, position) => s.lastIndexOf(search, position),
    replace: (s, search, replace) => s.replace(search, replace),
    replaceAll: (s, search, replace) => s.split(search).join(replace),
    trim: (s) => s.trim(),
    trimLeft: (s) => s.trimStart(),
    trimRight: (s) => s.trimEnd(),
    toUpperCase: (s) => s.toUpperCase(),
    toLowerCase: (s) => s.toLowerCase(),
    capitalize: (s) => s.charAt(0).toUpperCase() + s.slice(1),
    split: (s, separator, limit) => s.split(separator, limit),
    join: (arr, separator = ',') => arr.join(separator),
    charAt: (s, index) => s.charAt(index),
    charCodeAt: (s, index) => s.charCodeAt(index),
    startsWith: (s, search, position) => s.startsWith(search, position),
    endsWith: (s, search, endPosition) => s.endsWith(search, endPosition),
    includes: (s, search, position) => s.includes(search, position),
    repeat: (s, count) => s.repeat(count),
    padLeft: (s, length, char = ' ') => s.padStart(length, char),
    padRight: (s, length, char = ' ') => s.padEnd(length, char),
    reverse: (s) => s.split('').reverse().join(''),
    /**
     * 数组函数
     */
    size: (arr) => {
        if (Array.isArray(arr) || typeof arr === 'string')
            return arr.length;
        if (arr instanceof Map || arr instanceof Set)
            return arr.size;
        if (typeof arr === 'object' && arr !== null)
            return Object.keys(arr).length;
        return 0;
    },
    length: (arr) => arr.length,
    push: (arr, ...items) => arr.push(...items),
    pop: (arr) => arr.pop(),
    shift: (arr) => arr.shift(),
    unshift: (arr, ...items) => arr.unshift(...items),
    slice: (arr, start, end) => arr.slice(start, end),
    concat: (arr, ...items) => arr.concat(...items),
    reverseArray: (arr) => [...arr].reverse(),
    sort: (arr, compareFn) => [...arr].sort(compareFn),
    flatten: (arr, depth = 1) => arr.flat(depth),
    unique: (arr) => [...new Set(arr)],
    first: (arr) => arr[0],
    last: (arr) => arr[arr.length - 1],
    range: (start, end, step = 1) => {
        if (end === undefined) {
            end = start;
            start = 0;
        }
        const result = [];
        for (let i = start; step > 0 ? i < end : i > end; i += step) {
            result.push(i);
        }
        return result;
    },
    /**
     * 对象函数
     */
    keys: (obj) => Object.keys(obj),
    values: (obj) => Object.values(obj),
    entries: (obj) => Object.entries(obj),
    fromEntries: (entries) => Object.fromEntries(entries),
    hasKey: (obj, key) => key in obj,
    getValue: (obj, key, defaultValue) => {
        const value = obj[key];
        return value !== undefined ? value : defaultValue;
    },
    setValue: (obj, key, value) => {
        obj[key] = value;
        return obj;
    },
    removeKey: (obj, key) => {
        delete obj[key];
        return obj;
    },
    merge: (...objs) => Object.assign({}, ...objs),
    deepClone: (obj) => JSON.parse(JSON.stringify(obj)),
    /**
     * 条件函数
     */
    iif: (condition, trueValue, falseValue) => condition ? trueValue : falseValue,
    switchCase: (value, ...cases) => {
        for (let i = 0; i < cases.length - 1; i += 2) {
            if (value === cases[i])
                return cases[i + 1];
        }
        return cases.length % 2 === 1 ? cases[cases.length - 1] : undefined;
    },
    coalesce: (...values) => values.find(v => v !== null && v !== undefined),
    defaultIfEmpty: (value, defaultValue) => {
        if (value === null || value === undefined || value === '')
            return defaultValue;
        return value;
    },
    /**
     * 日期函数
     */
    now: () => Date.now(),
    date: (timestamp) => new Date(timestamp),
    parseDate: (dateString) => new Date(dateString),
    format: (date, format = 'yyyy-MM-dd HH:mm:ss') => {
        const d = date instanceof Date ? date : new Date(date);
        const pad = (n) => n.toString().padStart(2, '0');
        return format
            .replace(/yyyy/g, d.getFullYear().toString())
            .replace(/yy/g, d.getFullYear().toString().slice(-2))
            .replace(/MM/g, pad(d.getMonth() + 1))
            .replace(/M/g, (d.getMonth() + 1).toString())
            .replace(/dd/g, pad(d.getDate()))
            .replace(/d/g, d.getDate().toString())
            .replace(/HH/g, pad(d.getHours()))
            .replace(/H/g, d.getHours().toString())
            .replace(/hh/g, pad(d.getHours() % 12 || 12))
            .replace(/h/g, (d.getHours() % 12 || 12).toString())
            .replace(/mm/g, pad(d.getMinutes()))
            .replace(/m/g, d.getMinutes().toString())
            .replace(/ss/g, pad(d.getSeconds()))
            .replace(/s/g, d.getSeconds().toString())
            .replace(/SSS/g, d.getMilliseconds().toString().padStart(3, '0'));
    },
    year: (date) => new Date(date).getFullYear(),
    month: (date) => new Date(date).getMonth() + 1,
    day: (date) => new Date(date).getDate(),
    hour: (date) => new Date(date).getHours(),
    minute: (date) => new Date(date).getMinutes(),
    second: (date) => new Date(date).getSeconds(),
    dayOfWeek: (date) => new Date(date).getDay(),
    addDays: (date, days) => {
        const d = new Date(date);
        d.setDate(d.getDate() + days);
        return d;
    },
    addMonths: (date, months) => {
        const d = new Date(date);
        d.setMonth(d.getMonth() + months);
        return d;
    },
    addYears: (date, years) => {
        const d = new Date(date);
        d.setFullYear(d.getFullYear() + years);
        return d;
    },
    daysBetween: (date1, date2) => {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        const diffTime = Math.abs(d2.getTime() - d1.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    },
    /**
     * 正则函数
     */
    regex: (pattern, flags) => new RegExp(pattern, flags),
    test: (pattern, text) => {
        const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
        return regex.test(text);
    },
    match: (pattern, text) => {
        const regex = typeof pattern === 'string' ? new RegExp(pattern, 'g') : new RegExp(pattern.source, pattern.flags + 'g');
        return text.match(regex) || [];
    },
    matchAll: (pattern, text) => {
        const regex = typeof pattern === 'string' ? new RegExp(pattern, 'g') : new RegExp(pattern.source, pattern.flags.includes('g') ? pattern.flags : pattern.flags + 'g');
        return [...text.matchAll(regex)];
    },
    /**
     * JSON函数
     */
    json: (value, replacer, space) => JSON.stringify(value, replacer, space),
    parseJson: (text) => JSON.parse(text),
    /**
     * 随机函数
     */
    random: () => Math.random(),
    randomInt: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
    randomFloat: (min, max) => Math.random() * (max - min) + min,
    randomPick: (arr) => arr[Math.floor(Math.random() * arr.length)],
    shuffle: (arr) => {
        const result = [...arr];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    },
    uuid: () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    /**
     * 打印函数
     */
    print: (...args) => {
        console.log(...args.map(arg => formatValue(arg)));
        return args.length === 1 ? args[0] : args;
    },
    println: (...args) => {
        console.log(...args.map(arg => formatValue(arg)));
        return args.length === 1 ? args[0] : args;
    },
    printf: (format, ...args) => {
        console.log(format.replace(/%[sdifjo]/g, () => formatValue(args.shift())));
        return undefined;
    },
    /**
     * 集合操作
     */
    NewMap: (...entries) => new Map(entries),
    NewSet: (...values) => new Set(values),
    NewList: (...items) => [...items],
    NewArray: (...items) => [...items],
    /**
     * 高阶函数
     */
    map: (arr, fn) => arr.map(fn),
    filter: (arr, fn) => arr.filter(fn),
    reduce: (arr, fn, initialValue) => initialValue !== undefined ? arr.reduce(fn, initialValue) : arr.reduce(fn),
    find: (arr, fn) => arr.find(fn),
    findIndex: (arr, fn) => arr.findIndex(fn),
    every: (arr, fn) => arr.every(fn),
    some: (arr, fn) => arr.some(fn),
    forEach: (arr, fn) => {
        arr.forEach(fn);
        return arr;
    },
    sortArray: (arr, compareFn) => [...arr].sort(compareFn),
    groupBy: (arr, keyFn) => {
        return arr.reduce((groups, item) => {
            const key = keyFn(item);
            if (!groups[key])
                groups[key] = [];
            groups[key].push(item);
            return groups;
        }, {});
    },
    countBy: (arr, keyFn) => {
        return arr.reduce((counts, item) => {
            const key = keyFn(item);
            counts[key] = (counts[key] || 0) + 1;
            return counts;
        }, {});
    },
    distinctBy: (arr, keyFn) => {
        const seen = new Set();
        return arr.filter(item => {
            const key = keyFn(item);
            if (seen.has(key))
                return false;
            seen.add(key);
            return true;
        });
    }
};
/**
 * 格式化值用于打印
 */
function formatValue(value) {
    if (value === null)
        return 'null';
    if (value === undefined)
        return 'undefined';
    if (typeof value === 'string')
        return value;
    if (typeof value === 'number' || typeof value === 'boolean')
        return String(value);
    if (Array.isArray(value))
        return JSON.stringify(value);
    if (typeof value === 'object')
        return JSON.stringify(value);
    return String(value);
}

/**
 * 安全管理器
 * 实现多级安全控制机制
 */
class SecurityManager {
    constructor(config = {}) {
        this.config = {
            sandbox: config.sandbox ?? false,
            timeout: config.timeout ?? 0,
            maxLoopCount: config.maxLoopCount ?? 1000000,
            maxArrayLength: config.maxArrayLength ?? 100000,
            forbidRiskMethods: config.forbidRiskMethods ?? true,
            riskMethodBlacklist: config.riskMethodBlacklist ?? [],
            allowedMethods: config.allowedMethods ?? null
        };
        // 合并默认黑名单
        this.config.riskMethodBlacklist = [
            ...SecurityManager.DEFAULT_BLACKLIST,
            ...this.config.riskMethodBlacklist
        ];
    }
    /**
     * 获取安全配置
     */
    getConfig() {
        return { ...this.config };
    }
    /**
     * 更新安全配置
     */
    updateConfig(config) {
        this.config = { ...this.config, ...config };
    }
    /**
     * 检查是否处于沙箱模式
     */
    isSandboxMode() {
        return this.config.sandbox;
    }
    /**
     * 启用沙箱模式
     */
    enableSandboxMode() {
        this.config.sandbox = true;
    }
    /**
     * 禁用沙箱模式
     */
    disableSandboxMode() {
        this.config.sandbox = false;
    }
    /**
     * 检查方法是否在黑名单中
     */
    isBlacklisted(methodName) {
        return this.config.riskMethodBlacklist.some(blocked => methodName === blocked || methodName.startsWith(blocked + '.'));
    }
    /**
     * 检查方法是否在白名单中
     */
    isWhitelisted(methodName) {
        if (!this.config.allowedMethods) {
            return true; // 未设置白名单则全部允许
        }
        return this.config.allowedMethods.includes(methodName);
    }
    /**
     * 检查方法调用是否安全
     */
    checkMethodAccess(methodName) {
        // 沙箱模式下禁止所有外部方法调用
        if (this.config.sandbox) {
            throw new SecurityError(`Method '${methodName}' is not allowed in sandbox mode`);
        }
        // 检查黑名单
        if (this.config.forbidRiskMethods && this.isBlacklisted(methodName)) {
            throw new SecurityError(`Access to '${methodName}' is forbidden`);
        }
        // 检查白名单
        if (this.config.allowedMethods && !this.isWhitelisted(methodName)) {
            throw new SecurityError(`Access to '${methodName}' is not in the whitelist`);
        }
    }
    /**
     * 检查数组长度是否安全
     */
    checkArrayLength(length) {
        if (length > this.config.maxArrayLength) {
            throw new SecurityError(`Array length ${length} exceeds maximum ${this.config.maxArrayLength}`);
        }
    }
    /**
     * 添加危险方法到黑名单
     */
    addToBlacklist(methodName) {
        if (!this.config.riskMethodBlacklist.includes(methodName)) {
            this.config.riskMethodBlacklist.push(methodName);
        }
    }
    /**
     * 从黑名单移除方法
     */
    removeFromBlacklist(methodName) {
        const index = this.config.riskMethodBlacklist.indexOf(methodName);
        if (index >= 0) {
            this.config.riskMethodBlacklist.splice(index, 1);
        }
    }
    /**
     * 添加方法到白名单
     */
    addToWhitelist(methodName) {
        if (!this.config.allowedMethods) {
            this.config.allowedMethods = [];
        }
        if (!this.config.allowedMethods.includes(methodName)) {
            this.config.allowedMethods.push(methodName);
        }
    }
    /**
     * 从白名单移除方法
     */
    removeFromWhitelist(methodName) {
        if (this.config.allowedMethods) {
            const index = this.config.allowedMethods.indexOf(methodName);
            if (index >= 0) {
                this.config.allowedMethods.splice(index, 1);
            }
        }
    }
    /**
     * 设置超时时间
     */
    setTimeout(timeout) {
        this.config.timeout = timeout;
    }
    /**
     * 获取超时时间
     */
    getTimeout() {
        return this.config.timeout;
    }
    /**
     * 设置最大循环次数
     */
    setMaxLoopCount(count) {
        this.config.maxLoopCount = count;
    }
    /**
     * 获取最大循环次数
     */
    getMaxLoopCount() {
        return this.config.maxLoopCount;
    }
    /**
     * 设置最大数组长度
     */
    setMaxArrayLength(length) {
        this.config.maxArrayLength = length;
    }
    /**
     * 获取最大数组长度
     */
    getMaxArrayLength() {
        return this.config.maxArrayLength;
    }
    /**
     * 创建安全执行环境
     */
    createSafeEnvironment() {
        const safeEnv = {};
        // 只允许安全的内置对象
        const allowedObjects = ['Math', 'JSON', 'Date', 'Boolean', 'Number', 'String', 'Array', 'Object'];
        for (const name of allowedObjects) {
            if (typeof globalThis[name] !== 'undefined') {
                safeEnv[name] = globalThis[name];
            }
        }
        return safeEnv;
    }
}
// 默认危险方法黑名单
SecurityManager.DEFAULT_BLACKLIST = [
    'eval',
    'Function',
    'setTimeout',
    'setInterval',
    'setImmediate',
    'process.exit',
    'process.binding',
    'process.dlopen',
    'require',
    'module.constructor',
    'global',
    'globalThis',
    '__dirname',
    '__filename'
];

/**
 * 宏管理器
 * 管理宏定义和展开
 */
class MacroManager {
    constructor() {
        this.macros = new Map();
    }
    /**
     * 添加宏定义
     */
    add(name, expression) {
        this.macros.set(name, { name, expression });
    }
    /**
     * 移除宏定义
     */
    remove(name) {
        return this.macros.delete(name);
    }
    /**
     * 检查宏是否存在
     */
    has(name) {
        return this.macros.has(name);
    }
    /**
     * 获取宏表达式
     */
    get(name) {
        return this.macros.get(name)?.expression;
    }
    /**
     * 获取所有宏
     */
    getAll() {
        return new Map(this.macros);
    }
    /**
     * 清空所有宏
     */
    clear() {
        this.macros.clear();
    }
}
/**
 * 自定义函数管理器
 */
class CustomFunctionManager {
    constructor() {
        this.functions = new Map();
    }
    /**
     * 添加自定义函数
     */
    add(name, handler, description) {
        this.functions.set(name, { name, handler, description });
    }
    /**
     * 移除自定义函数
     */
    remove(name) {
        return this.functions.delete(name);
    }
    /**
     * 检查函数是否存在
     */
    has(name) {
        return this.functions.has(name);
    }
    /**
     * 获取函数
     */
    get(name) {
        return this.functions.get(name);
    }
    /**
     * 获取所有函数
     */
    getAll() {
        return new Map(this.functions);
    }
    /**
     * 清空所有函数
     */
    clear() {
        this.functions.clear();
    }
}
/**
 * 自定义操作符管理器
 */
class CustomOperatorManager {
    constructor() {
        this.operators = new Map();
        this.aliases = new Map();
    }
    /**
     * 添加自定义操作符
     */
    add(name, handler, precedence) {
        this.operators.set(name, { name, handler, precedence });
    }
    /**
     * 添加操作符别名
     */
    addAlias(alias, originalName) {
        this.aliases.set(alias, originalName);
    }
    /**
     * 移除自定义操作符
     */
    remove(name) {
        return this.operators.delete(name);
    }
    /**
     * 检查操作符是否存在
     */
    has(name) {
        const resolvedName = this.resolveAlias(name);
        return this.operators.has(resolvedName);
    }
    /**
     * 获取操作符
     */
    get(name) {
        const resolvedName = this.resolveAlias(name);
        return this.operators.get(resolvedName);
    }
    /**
     * 解析别名
     */
    resolveAlias(name) {
        return this.aliases.get(name) || name;
    }
    /**
     * 获取所有操作符
     */
    getAll() {
        return new Map(this.operators);
    }
    /**
     * 获取所有别名
     */
    getAllAliases() {
        return new Map(this.aliases);
    }
    /**
     * 清空所有操作符
     */
    clear() {
        this.operators.clear();
        this.aliases.clear();
    }
}

/**
 * QLExpress-JS 表达式引擎
 * 类似阿里巴巴QLExpress的JavaScript实现
 */
class ExpressRunner {
    /**
     * 创建表达式引擎实例
     */
    constructor(options = {}) {
        this.instructionCache = new Map();
        this.operatorAliases = new Map();
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
        this.securityManager = new SecurityManager(this.config.security);
        this.macroManager = new MacroManager();
        this.functionManager = new CustomFunctionManager();
        this.operatorManager = new CustomOperatorManager();
        // 初始化内置操作符别名
        this.initBuiltinAliases();
    }
    /**
     * 初始化内置操作符别名
     */
    initBuiltinAliases() {
        // 中文别名
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
        this.addOperatorWithAlias('加', '+', null);
        this.addOperatorWithAlias('减', '-', null);
        this.addOperatorWithAlias('乘', '*', null);
        this.addOperatorWithAlias('除', '/', null);
        this.addOperatorWithAlias('取余', '%', null);
    }
    /**
     * 执行表达式
     */
    execute(expression, context, options = {}) {
        const { isCache = true, isTrace = false, timeout = 0 } = options;
        // 处理宏展开
        expression = this.expandMacros(expression);
        // 检查缓存
        let cached = isCache ? this.instructionCache.get(expression) : null;
        if (!cached) {
            // 词法分析
            const lexer = new Lexer(expression);
            const tokens = lexer.tokenize();
            // 语法分析
            const parser = new Parser(tokens, this.getMacroExpressions(), this.operatorAliases);
            const ast = parser.parse();
            cached = ast;
            // 缓存编译结果
            if (isCache) {
                this.instructionCache.set(expression, cached);
            }
        }
        // 创建运行时上下文
        const runtimeContext = this.createRuntimeContext(context);
        // 创建解释器
        const interpreter = new Interpreter(runtimeContext, {
            ...this.config,
            trace: isTrace || this.config.trace,
            security: {
                ...this.config.security,
                timeout: timeout || this.config.security.timeout
            }
        });
        // 注册自定义函数和操作符
        this.registerCustomFunctions(interpreter);
        this.registerCustomOperators(interpreter);
        // 执行
        const startTime = Date.now();
        const result = interpreter.execute(cached);
        const endTime = Date.now();
        // 添加执行时间信息
        result.executionTime = endTime - startTime;
        return result;
    }
    /**
     * 创建运行时上下文
     */
    createRuntimeContext(context) {
        const initialVars = {};
        // 添加内置对象
        Object.assign(initialVars, BuiltinObjects.getAll());
        // 添加内置函数
        for (const [name, handler] of Object.entries(builtinFunctions)) {
            initialVars[name] = handler;
        }
        // 添加用户提供的上下文
        if (context) {
            if (typeof context.get === 'function') {
                // IContext 接口
                const ctx = context;
                for (const key of ctx.keys()) {
                    initialVars[key] = ctx.get(key);
                }
            }
            else {
                // 普通对象
                Object.assign(initialVars, context);
            }
        }
        return new RuntimeContext(initialVars);
    }
    /**
     * 注册自定义函数
     */
    registerCustomFunctions(interpreter) {
        const functions = this.functionManager.getAll();
        for (const [name, def] of functions) {
            interpreter.addFunction(name, def.handler);
        }
    }
    /**
     * 注册自定义操作符
     */
    registerCustomOperators(interpreter) {
        const operators = this.operatorManager.getAll();
        for (const [name, def] of operators) {
            interpreter.addOperator(name, def.handler);
        }
    }
    /**
     * 展开宏
     */
    expandMacros(expression) {
        let result = expression;
        let changed = true;
        const macros = this.macroManager.getAll();
        // 循环展开直到没有变化（处理嵌套宏）
        while (changed) {
            changed = false;
            for (const [name, def] of macros) {
                // 使用正则表达式匹配宏调用，支持中文
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
    /**
     * 获取宏表达式映射
     */
    getMacroExpressions() {
        const result = new Map();
        const macros = this.macroManager.getAll();
        for (const [name, def] of macros) {
            result.set(name, def.expression);
        }
        return result;
    }
    // ============ 函数管理 API ============
    /**
     * 添加自定义函数
     */
    addFunction(name, handler) {
        this.functionManager.add(name, handler);
    }
    /**
     * 移除自定义函数
     */
    removeFunction(name) {
        return this.functionManager.remove(name);
    }
    /**
     * 检查函数是否存在
     */
    hasFunction(name) {
        return this.functionManager.has(name) || builtinFunctions[name] !== undefined;
    }
    /**
     * 绑定类静态方法
     * 类似QLExpress的addFunctionOfClassMethod
     */
    addFunctionOfClassMethod(functionName, className, methodName, paramTypes) {
        // 对于JavaScript，我们需要存储类引用和方法名
        // 这里简化实现，直接绑定方法
        this.addFunction(functionName, (...args) => {
            // 实际调用需要通过反射或其他方式
            throw new Error('Class method binding not implemented in JavaScript environment');
        });
    }
    /**
     * 绑定对象实例方法
     * 类似QLExpress的addFunctionOfServiceMethod
     */
    addFunctionOfServiceMethod(functionName, service, methodName, paramTypes) {
        const method = service[methodName];
        if (typeof method !== 'function') {
            throw new Error(`${String(methodName)} is not a function`);
        }
        this.addFunction(functionName, (...args) => {
            return method.apply(service, args);
        });
    }
    /**
     * 同时支持 a.fun(b) 和 fun(a, b) 两种调用方式
     */
    addFunctionAndClassMethod(functionName, className, methodName) {
        this.addFunctionOfClassMethod(functionName, className, methodName);
    }
    // ============ 操作符管理 API ============
    /**
     * 添加自定义操作符
     */
    addOperator(name, handler) {
        this.operatorManager.add(name, handler);
    }
    /**
     * 替换操作符处理
     */
    replaceOperator(name, handler) {
        this.operatorManager.add(name, handler);
    }
    /**
     * 添加操作符别名
     */
    addOperatorWithAlias(alias, originalName, errorInfo) {
        this.operatorAliases.set(alias, originalName);
        this.operatorManager.addAlias(alias, originalName);
    }
    /**
     * 检查操作符是否存在
     */
    hasOperator(name) {
        return this.operatorManager.has(name);
    }
    // ============ 宏管理 API ============
    /**
     * 添加宏定义
     */
    addMacro(name, expression) {
        this.macroManager.add(name, expression);
    }
    /**
     * 移除宏定义
     */
    removeMacro(name) {
        return this.macroManager.remove(name);
    }
    /**
     * 检查宏是否存在
     */
    hasMacro(name) {
        return this.macroManager.has(name);
    }
    /**
     * 获取宏表达式
     */
    getMacro(name) {
        return this.macroManager.get(name);
    }
    // ============ 语法分析 API ============
    /**
     * 获取表达式需要的外部变量名称列表
     */
    getOutVarNames(expression) {
        expression = this.expandMacros(expression);
        const lexer = new Lexer(expression);
        const tokens = lexer.tokenize();
        const parser = new Parser(tokens, this.getMacroExpressions(), this.operatorAliases);
        const ast = parser.parse();
        const varNames = new Set();
        this.collectVarNames(ast, varNames);
        // 排除内置函数和变量
        const builtins = new Set([
            ...Object.keys(builtinFunctions),
            ...Object.keys(BuiltinObjects.getAll()),
            'true', 'false', 'null', 'undefined'
        ]);
        return Array.from(varNames).filter(name => !builtins.has(name));
    }
    /**
     * 递归收集变量名
     */
    collectVarNames(node, varNames) {
        if (!node)
            return;
        if (node.type === NodeType.Identifier) {
            const name = node.name;
            // 排除函数名（在函数调用中）
            varNames.add(name);
        }
        // 递归遍历子节点
        for (const key of Object.keys(node)) {
            const value = node[key];
            if (Array.isArray(value)) {
                for (const item of value) {
                    if (typeof item === 'object' && item !== null) {
                        this.collectVarNames(item, varNames);
                    }
                }
            }
            else if (typeof value === 'object' && value !== null) {
                this.collectVarNames(value, varNames);
            }
        }
    }
    /**
     * 获取表达式需要的函数名称列表
     */
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
    /**
     * 递归收集函数名
     */
    collectFunctionNames(node, funcNames) {
        if (!node)
            return;
        if (node.type === NodeType.CallExpression) {
            if (node.callee.type === NodeType.Identifier) {
                funcNames.add(node.callee.name);
            }
        }
        // 递归遍历子节点
        for (const key of Object.keys(node)) {
            const value = node[key];
            if (Array.isArray(value)) {
                for (const item of value) {
                    if (typeof item === 'object' && item !== null) {
                        this.collectFunctionNames(item, funcNames);
                    }
                }
            }
            else if (typeof value === 'object' && value !== null) {
                this.collectFunctionNames(value, funcNames);
            }
        }
    }
    /**
     * 语法校验
     */
    validate(expression) {
        try {
            expression = this.expandMacros(expression);
            const lexer = new Lexer(expression);
            const tokens = lexer.tokenize();
            const parser = new Parser(tokens, this.getMacroExpressions(), this.operatorAliases);
            parser.parse();
            return { valid: true };
        }
        catch (error) {
            return {
                valid: false,
                error: error instanceof Error ? error.message : String(error)
            };
        }
    }
    // ============ 缓存管理 API ============
    /**
     * 从缓存获取指令集
     */
    getInstructionSetFromLocalCache(expression) {
        return this.instructionCache.get(expression);
    }
    /**
     * 清除缓存
     */
    clearExpressCache() {
        this.instructionCache.clear();
    }
    /**
     * 获取缓存大小
     */
    getCacheSize() {
        return this.instructionCache.size;
    }
    // ============ 安全配置 API ============
    /**
     * 设置沙箱模式
     */
    setSandboxMode(enabled) {
        this.config.security.sandbox = enabled;
        this.securityManager.updateConfig({ sandbox: enabled });
    }
    /**
     * 设置执行超时时间
     */
    setTimeout(timeout) {
        this.config.security.timeout = timeout;
        this.securityManager.updateConfig({ timeout });
    }
    /**
     * 设置最大循环次数
     */
    setMaxLoopCount(count) {
        this.config.security.maxLoopCount = count;
        this.securityManager.updateConfig({ maxLoopCount: count });
    }
    /**
     * 设置最大数组长度
     */
    setMaxArrayLength(length) {
        this.config.security.maxArrayLength = length;
        this.securityManager.updateConfig({ maxArrayLength: length });
    }
    /**
     * 添加危险方法到黑名单
     */
    addSecurityRiskMethod(className, methodName) {
        const fullName = `${className}.${methodName}`;
        this.config.security.riskMethodBlacklist.push(fullName);
        this.securityManager.addToBlacklist(fullName);
    }
    /**
     * 添加安全方法到白名单
     */
    addSecureMethod(className, methodName) {
        const fullName = `${className}.${methodName}`;
        if (!this.config.security.allowedMethods) {
            this.config.security.allowedMethods = [];
        }
        this.config.security.allowedMethods.push(fullName);
        this.securityManager.addToWhitelist(fullName);
    }
    /**
     * 获取安全配置
     */
    getSecurityConfig() {
        return this.securityManager.getConfig();
    }
    // ============ 配置 API ============
    /**
     * 设置是否使用高精度计算
     */
    setPrecise(precise) {
        this.config.precise = precise;
    }
    /**
     * 设置是否使用短路求值
     */
    setShortCircuit(shortCircuit) {
        this.config.shortCircuit = shortCircuit;
    }
    /**
     * 设置是否追踪执行过程
     */
    setTrace(trace) {
        this.config.trace = trace;
    }
    /**
     * 获取运行时配置
     */
    getConfig() {
        return { ...this.config };
    }
}
/**
 * 创建默认上下文
 */
function createDefaultContext(vars = {}) {
    const context = new RuntimeContext(vars);
    return context;
}
/**
 * 快速执行表达式
 */
function execute(expression, context, options) {
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
}

exports.ExpressRunner = ExpressRunner;
exports.createDefaultContext = createDefaultContext;
exports.default = ExpressRunner;
exports.execute = execute;
//# sourceMappingURL=index.js.map
