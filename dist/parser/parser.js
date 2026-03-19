"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const types_1 = require("../types");
/**
 * 运算符优先级表
 */
const PRECEDENCE = {
    // 最低优先级
    ';': 0,
    ',': 1,
    '=': 2, '+=': 2, '-=': 2, '*=': 2, '/=': 2, '%=': 2,
    '?': 3, ':': 3,
    '||': 4,
    '&&': 5,
    '|': 6,
    '^': 7,
    '&': 8,
    '==': 9, '!=': 9, '===': 9, '!==': 9, '<>': 9,
    '<': 10, '>': 10, '<=': 10, '>=': 10,
    '<<': 11, '>>': 11, '>>>': 11,
    '+': 12, '-': 12,
    '*': 13, '/': 13, '%': 13, 'mod': 13,
    // 一元运算符
    '!': 14, '~': 14, '++': 14, '--': 14,
    // 成员访问和函数调用
    '.': 15, '[': 15, '(': 15,
    'new': 16
};
/**
 * 右结合运算符
 */
const RIGHT_ASSOCIATIVE = new Set(['=', '+=', '-=', '*=', '/=', '%=', '!', '~', '++', '--']);
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
            type: types_1.NodeType.Program,
            body
        };
    }
    /**
     * 解析语句
     */
    parseStatement() {
        // 跳过换行符
        while (this.check(types_1.TokenType.NEWLINE)) {
            this.advance();
        }
        if (this.isAtEnd())
            return null;
        const token = this.peek();
        switch (token.type) {
            case types_1.TokenType.IF:
                return this.parseIfStatement();
            case types_1.TokenType.FOR:
                return this.parseForStatement();
            case types_1.TokenType.WHILE:
                return this.parseWhileStatement();
            case types_1.TokenType.RETURN:
                return this.parseReturnStatement();
            case types_1.TokenType.BREAK:
                return this.parseBreakStatement();
            case types_1.TokenType.CONTINUE:
                return this.parseContinueStatement();
            case types_1.TokenType.FUNCTION:
                return this.parseFunctionDeclaration();
            case types_1.TokenType.IMPORT:
                return this.parseImportStatement();
            case types_1.TokenType.LBRACE:
                // 检查是否是对象字面量还是块语句
                // 如果 { 后面跟着标识符然后是冒号，则是对象字面量
                if (this.isObjectLiteral()) {
                    return this.parseExpressionStatement();
                }
                return this.parseBlockStatement();
            case types_1.TokenType.SEMICOLON:
                this.advance();
                return null;
            default:
                // 检查变量声明（标识符后跟赋值操作）
                if (this.check(types_1.TokenType.IDENTIFIER)) {
                    const nextToken = this.peekNext();
                    if (nextToken && (nextToken.type === types_1.TokenType.ASSIGN ||
                        nextToken.type === types_1.TokenType.PLUS_ASSIGN ||
                        nextToken.type === types_1.TokenType.MINUS_ASSIGN ||
                        nextToken.type === types_1.TokenType.STAR_ASSIGN ||
                        nextToken.type === types_1.TokenType.SLASH_ASSIGN ||
                        nextToken.type === types_1.TokenType.PERCENT_ASSIGN)) {
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
        this.consume(types_1.TokenType.LPAREN, "Expect '(' after 'if'");
        const test = this.parseExpression();
        this.consume(types_1.TokenType.RPAREN, "Expect ')' after condition");
        // 可选的 'then' 关键字
        if (this.check(types_1.TokenType.THEN)) {
            this.advance();
        }
        // 跳过换行
        while (this.check(types_1.TokenType.NEWLINE)) {
            this.advance();
        }
        const consequent = this.parseStatement() || { type: types_1.NodeType.BlockStatement, body: [] };
        // 跳过换行
        while (this.check(types_1.TokenType.NEWLINE)) {
            this.advance();
        }
        let alternate = null;
        if (this.check(types_1.TokenType.ELSE)) {
            this.advance();
            // 跳过换行
            while (this.check(types_1.TokenType.NEWLINE)) {
                this.advance();
            }
            alternate = this.parseStatement() || { type: types_1.NodeType.BlockStatement, body: [] };
        }
        return {
            type: types_1.NodeType.IfStatement,
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
        this.consume(types_1.TokenType.LPAREN, "Expect '(' after 'for'");
        // 初始化
        let init = null;
        if (!this.check(types_1.TokenType.SEMICOLON)) {
            init = this.parseExpression();
        }
        this.consume(types_1.TokenType.SEMICOLON, "Expect ';' after for init");
        // 条件
        let test = null;
        if (!this.check(types_1.TokenType.SEMICOLON)) {
            test = this.parseExpression();
        }
        this.consume(types_1.TokenType.SEMICOLON, "Expect ';' after for condition");
        // 更新
        let update = null;
        if (!this.check(types_1.TokenType.RPAREN)) {
            update = this.parseExpression();
        }
        this.consume(types_1.TokenType.RPAREN, "Expect ')' after for clauses");
        // 跳过换行
        while (this.check(types_1.TokenType.NEWLINE)) {
            this.advance();
        }
        const body = this.parseStatement() || { type: types_1.NodeType.BlockStatement, body: [] };
        return {
            type: types_1.NodeType.ForStatement,
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
        this.consume(types_1.TokenType.LPAREN, "Expect '(' after 'while'");
        const test = this.parseExpression();
        this.consume(types_1.TokenType.RPAREN, "Expect ')' after condition");
        // 跳过换行
        while (this.check(types_1.TokenType.NEWLINE)) {
            this.advance();
        }
        const body = this.parseStatement() || { type: types_1.NodeType.BlockStatement, body: [] };
        return {
            type: types_1.NodeType.WhileStatement,
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
        if (!this.check(types_1.TokenType.SEMICOLON) && !this.check(types_1.TokenType.NEWLINE) && !this.check(types_1.TokenType.RBRACE) && !this.isAtEnd()) {
            argument = this.parseExpression();
        }
        // 消费可选的分号
        if (this.check(types_1.TokenType.SEMICOLON)) {
            this.advance();
        }
        return {
            type: types_1.NodeType.ReturnStatement,
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
        if (this.check(types_1.TokenType.SEMICOLON)) {
            this.advance();
        }
        return {
            type: types_1.NodeType.BreakStatement,
            loc: this.createLocation(token)
        };
    }
    /**
     * 解析continue语句
     */
    parseContinueStatement() {
        const token = this.advance(); // 消费 'continue'
        // 消费可选的分号
        if (this.check(types_1.TokenType.SEMICOLON)) {
            this.advance();
        }
        return {
            type: types_1.NodeType.ContinueStatement,
            loc: this.createLocation(token)
        };
    }
    /**
     * 解析函数声明
     */
    parseFunctionDeclaration() {
        const token = this.advance(); // 消费 'function'
        const nameToken = this.consume(types_1.TokenType.IDENTIFIER, "Expect function name");
        const name = { type: types_1.NodeType.Identifier, name: nameToken.value, loc: this.createLocation(nameToken) };
        this.consume(types_1.TokenType.LPAREN, "Expect '(' after function name");
        const params = [];
        if (!this.check(types_1.TokenType.RPAREN)) {
            do {
                const paramToken = this.consume(types_1.TokenType.IDENTIFIER, "Expect parameter name");
                params.push({ type: types_1.NodeType.Identifier, name: paramToken.value, loc: this.createLocation(paramToken) });
            } while (this.match(types_1.TokenType.COMMA));
        }
        this.consume(types_1.TokenType.RPAREN, "Expect ')' after parameters");
        // 跳过换行
        while (this.check(types_1.TokenType.NEWLINE)) {
            this.advance();
        }
        const body = this.parseBlockStatement();
        return {
            type: types_1.NodeType.FunctionDeclaration,
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
            type: types_1.NodeType.ImportStatement,
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
        while (!this.check(types_1.TokenType.RBRACE) && !this.isAtEnd()) {
            // 跳过换行
            while (this.check(types_1.TokenType.NEWLINE)) {
                this.advance();
            }
            if (this.check(types_1.TokenType.RBRACE))
                break;
            const stmt = this.parseStatement();
            if (stmt) {
                body.push(stmt);
            }
        }
        this.consume(types_1.TokenType.RBRACE, "Expect '}' after block");
        return {
            type: types_1.NodeType.BlockStatement,
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
        if (this.check(types_1.TokenType.SEMICOLON)) {
            this.advance();
        }
        return {
            type: types_1.NodeType.ExpressionStatement,
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
        if (this.check(types_1.TokenType.ASSIGN) ||
            this.check(types_1.TokenType.PLUS_ASSIGN) ||
            this.check(types_1.TokenType.MINUS_ASSIGN) ||
            this.check(types_1.TokenType.STAR_ASSIGN) ||
            this.check(types_1.TokenType.SLASH_ASSIGN) ||
            this.check(types_1.TokenType.PERCENT_ASSIGN)) {
            const operator = this.advance().value;
            const value = this.parseAssignment();
            return {
                type: types_1.NodeType.AssignmentExpression,
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
        if (this.check(types_1.TokenType.QUESTION)) {
            this.advance();
            const consequent = this.parseExpression();
            this.consume(types_1.TokenType.COLON, "Expect ':' in conditional expression");
            const alternate = this.parseConditional();
            return {
                type: types_1.NodeType.ConditionalExpression,
                test: expr,
                consequent,
                alternate,
                loc: this.createLocation(expr)
            };
        }
        return expr;
    }
    /**
     * 解析逻辑或表达式
     */
    parseLogicalOr() {
        let left = this.parseLogicalAnd();
        while (this.match(types_1.TokenType.OR_OP) || this.match(types_1.TokenType.OR)) {
            const operator = this.previous().value;
            const right = this.parseLogicalAnd();
            left = {
                type: types_1.NodeType.BinaryExpression,
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
        while (this.match(types_1.TokenType.AND_OP) || this.match(types_1.TokenType.AND)) {
            const operator = this.previous().value;
            const right = this.parseBitwiseOr();
            left = {
                type: types_1.NodeType.BinaryExpression,
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
        while (this.match(types_1.TokenType.BIT_OR)) {
            const operator = this.previous().value;
            const right = this.parseBitwiseXor();
            left = {
                type: types_1.NodeType.BinaryExpression,
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
        while (this.match(types_1.TokenType.BIT_XOR)) {
            const operator = this.previous().value;
            const right = this.parseBitwiseAnd();
            left = {
                type: types_1.NodeType.BinaryExpression,
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
        while (this.match(types_1.TokenType.BIT_AND)) {
            const operator = this.previous().value;
            const right = this.parseEquality();
            left = {
                type: types_1.NodeType.BinaryExpression,
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
        while (this.match(types_1.TokenType.EQ) || this.match(types_1.TokenType.NEQ)) {
            const operator = this.previous().value;
            const right = this.parseComparison();
            left = {
                type: types_1.NodeType.BinaryExpression,
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
        while (this.match(types_1.TokenType.LT) || this.match(types_1.TokenType.GT) ||
            this.match(types_1.TokenType.LTE) || this.match(types_1.TokenType.GTE) ||
            this.match(types_1.TokenType.IN) || this.match(types_1.TokenType.LIKE) || this.match(types_1.TokenType.BETWEEN)) {
            const operator = this.previous().type;
            if (operator === types_1.TokenType.IN) {
                const right = this.parseShift();
                left = {
                    type: types_1.NodeType.InExpression,
                    element: left,
                    container: right,
                    loc: this.createLocation(left)
                };
            }
            else if (operator === types_1.TokenType.LIKE) {
                const right = this.parseShift();
                left = {
                    type: types_1.NodeType.LikeExpression,
                    value: left,
                    pattern: right,
                    loc: this.createLocation(left)
                };
            }
            else if (operator === types_1.TokenType.BETWEEN) {
                const low = this.parseShift();
                this.consume(types_1.TokenType.AND, "Expect 'and' in between expression");
                const high = this.parseShift();
                left = {
                    type: types_1.NodeType.BetweenExpression,
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
                    type: types_1.NodeType.BinaryExpression,
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
        while (this.match(types_1.TokenType.LSHIFT) || this.match(types_1.TokenType.RSHIFT) || this.match(types_1.TokenType.URSHIFT)) {
            const operator = this.previous().value;
            const right = this.parseAdditive();
            left = {
                type: types_1.NodeType.BinaryExpression,
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
        while (this.match(types_1.TokenType.PLUS) || this.match(types_1.TokenType.MINUS)) {
            const operator = this.previous().value;
            const right = this.parseMultiplicative();
            left = {
                type: types_1.NodeType.BinaryExpression,
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
        while (this.match(types_1.TokenType.STAR) || this.match(types_1.TokenType.SLASH) ||
            this.match(types_1.TokenType.PERCENT) || this.match(types_1.TokenType.MOD)) {
            const operator = this.previous().value;
            const right = this.parseUnary();
            left = {
                type: types_1.NodeType.BinaryExpression,
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
        if (this.match(types_1.TokenType.NOT_OP) || this.match(types_1.TokenType.NOT) ||
            this.match(types_1.TokenType.MINUS) || this.match(types_1.TokenType.BIT_NOT)) {
            const operator = this.previous().value;
            const argument = this.parseUnary();
            return {
                type: types_1.NodeType.UnaryExpression,
                operator: operator === 'not' ? '!' : operator,
                argument,
                prefix: true,
                loc: this.createLocation(this.previous())
            };
        }
        if (this.match(types_1.TokenType.INCREMENT) || this.match(types_1.TokenType.DECREMENT)) {
            const operator = this.previous().value;
            const argument = this.parseUnary();
            return {
                type: types_1.NodeType.UpdateExpression,
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
        if (this.match(types_1.TokenType.INCREMENT) || this.match(types_1.TokenType.DECREMENT)) {
            const operator = this.previous().value;
            return {
                type: types_1.NodeType.UpdateExpression,
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
            if (this.match(types_1.TokenType.LPAREN)) {
                expr = this.finishCall(expr);
            }
            else if (this.match(types_1.TokenType.DOT)) {
                const nameToken = this.consume(types_1.TokenType.IDENTIFIER, "Expect property name after '.'");
                const name = { type: types_1.NodeType.Identifier, name: nameToken.value, loc: this.createLocation(nameToken) };
                expr = {
                    type: types_1.NodeType.MemberExpression,
                    object: expr,
                    property: name,
                    computed: false,
                    loc: this.createLocation(expr)
                };
            }
            else if (this.match(types_1.TokenType.LBRACKET)) {
                const property = this.parseExpression();
                this.consume(types_1.TokenType.RBRACKET, "Expect ']' after index");
                expr = {
                    type: types_1.NodeType.MemberExpression,
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
        if (!this.check(types_1.TokenType.RPAREN)) {
            do {
                args.push(this.parseExpression());
            } while (this.match(types_1.TokenType.COMMA));
        }
        this.consume(types_1.TokenType.RPAREN, "Expect ')' after arguments");
        return {
            type: types_1.NodeType.CallExpression,
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
            case types_1.TokenType.NUMBER:
                this.advance();
                return {
                    type: types_1.NodeType.NumberLiteral,
                    value: token.value,
                    loc: this.createLocation(token)
                };
            case types_1.TokenType.STRING:
                this.advance();
                return {
                    type: types_1.NodeType.StringLiteral,
                    value: token.value,
                    loc: this.createLocation(token)
                };
            case types_1.TokenType.BOOLEAN:
                this.advance();
                return {
                    type: types_1.NodeType.BooleanLiteral,
                    value: token.value,
                    loc: this.createLocation(token)
                };
            case types_1.TokenType.NULL:
                this.advance();
                return {
                    type: types_1.NodeType.NullLiteral,
                    value: token.value, // 使用token的value（可能是null或undefined）
                    loc: this.createLocation(token)
                };
            case types_1.TokenType.IDENTIFIER:
                this.advance();
                return {
                    type: types_1.NodeType.Identifier,
                    name: token.value,
                    loc: this.createLocation(token)
                };
            case types_1.TokenType.NEW:
                return this.parseNewExpression();
            case types_1.TokenType.LPAREN: {
                this.advance();
                const expr = this.parseExpression();
                this.consume(types_1.TokenType.RPAREN, "Expect ')' after expression");
                return expr;
            }
            case types_1.TokenType.LBRACKET:
                return this.parseArrayExpression();
            case types_1.TokenType.LBRACE:
                return this.parseObjectExpression();
            default:
                throw new types_1.ParseError(`Unexpected token: ${token.value}`, token);
        }
    }
    /**
     * 解析new表达式
     */
    parseNewExpression() {
        const token = this.advance(); // 消费 'new'
        const callee = this.parsePrimary();
        let args = [];
        if (this.match(types_1.TokenType.LPAREN)) {
            if (!this.check(types_1.TokenType.RPAREN)) {
                do {
                    args.push(this.parseExpression());
                } while (this.match(types_1.TokenType.COMMA));
            }
            this.consume(types_1.TokenType.RPAREN, "Expect ')' after arguments");
        }
        return {
            type: types_1.NodeType.NewExpression,
            callee,
            arguments: args,
            loc: this.createLocation(token)
        };
    }
    /**
     * 解析数组表达式
     */
    parseArrayExpression() {
        const token = this.advance(); // 消费 '['
        const elements = [];
        if (!this.check(types_1.TokenType.RBRACKET)) {
            do {
                elements.push(this.parseExpression());
            } while (this.match(types_1.TokenType.COMMA));
        }
        this.consume(types_1.TokenType.RBRACKET, "Expect ']' after array elements");
        return {
            type: types_1.NodeType.ArrayExpression,
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
        if (!this.check(types_1.TokenType.RBRACE)) {
            do {
                // 跳过换行
                while (this.check(types_1.TokenType.NEWLINE)) {
                    this.advance();
                }
                let key;
                let computed = false;
                if (this.match(types_1.TokenType.LBRACKET)) {
                    // 计算属性
                    key = this.parseExpression();
                    this.consume(types_1.TokenType.RBRACKET, "Expect ']' after computed property");
                    computed = true;
                }
                else if (this.check(types_1.TokenType.IDENTIFIER)) {
                    key = {
                        type: types_1.NodeType.Identifier,
                        name: this.advance().value,
                        loc: this.createLocation(this.previous())
                    };
                }
                else if (this.check(types_1.TokenType.STRING)) {
                    key = {
                        type: types_1.NodeType.StringLiteral,
                        value: this.advance().value,
                        loc: this.createLocation(this.previous())
                    };
                }
                else if (this.check(types_1.TokenType.NUMBER)) {
                    key = {
                        type: types_1.NodeType.NumberLiteral,
                        value: this.advance().value,
                        loc: this.createLocation(this.previous())
                    };
                }
                else {
                    throw new types_1.ParseError('Expect property name', this.peek());
                }
                this.consume(types_1.TokenType.COLON, "Expect ':' after property name");
                const value = this.parseExpression();
                properties.push({ key, value, computed });
            } while (this.match(types_1.TokenType.COMMA));
        }
        this.consume(types_1.TokenType.RBRACE, "Expect '}' after object properties");
        return {
            type: types_1.NodeType.ObjectExpression,
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
        while (this.check(types_1.TokenType.NEWLINE)) {
            this.advance();
        }
        // 检查第一个属性
        const firstToken = this.peek();
        let isObject = false;
        if (firstToken.type === types_1.TokenType.IDENTIFIER ||
            firstToken.type === types_1.TokenType.STRING ||
            firstToken.type === types_1.TokenType.NUMBER) {
            this.advance();
            // 检查是否是冒号
            if (this.check(types_1.TokenType.COLON)) {
                isObject = true;
            }
        }
        else if (firstToken.type === types_1.TokenType.RBRACE) {
            // 空对象 {}
            isObject = true;
        }
        // 恢复位置
        this.current = savedCurrent;
        return isObject;
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
        return this.peek().type === types_1.TokenType.EOF;
    }
    check(type) {
        if (this.isAtEnd())
            return false;
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
        if (this.check(type))
            return this.advance();
        throw new types_1.ParseError(message, this.peek());
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
exports.Parser = Parser;
