import {
  Token,
  TokenType,
  ParseError,
  NodeType,
  Program,
  Statement,
  Expression,
  Identifier,
  NumberLiteral,
  StringLiteral,
  BooleanLiteral,
  NullLiteral,
  ArrayExpression,
  ObjectExpression,
  BinaryExpression,
  UnaryExpression,
  ConditionalExpression,
  AssignmentExpression,
  UpdateExpression,
  MemberExpression,
  CallExpression,
  NewExpression,
  ArrowFunctionExpression,
  InExpression,
  LikeExpression,
  BetweenExpression,
  BlockStatement,
  IfStatement,
  WhileStatement,
  ForStatement,
  ReturnStatement,
  VariableDeclaration,
  FunctionDeclaration,
  ImportStatement,
  ExpressionStatement
} from '../types';

/**
 * 运算符优先级表
 */
const PRECEDENCE: Record<string, number> = {
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
export class Parser {
  private tokens: Token[] = [];
  private current: number = 0;
  private macros: Map<string, string> = new Map();
  private operatorAliases: Map<string, string> = new Map();

  constructor(tokens: Token[], macros?: Map<string, string>, operatorAliases?: Map<string, string>) {
    this.tokens = tokens;
    if (macros) this.macros = macros;
    if (operatorAliases) this.operatorAliases = operatorAliases;
  }

  /**
   * 解析表达式，返回AST
   */
  parse(): Program {
    const body: Statement[] = [];

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
  private parseStatement(): Statement | null {
    // 跳过换行符
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
          if (nextToken && (
            nextToken.type === TokenType.ASSIGN ||
            nextToken.type === TokenType.PLUS_ASSIGN ||
            nextToken.type === TokenType.MINUS_ASSIGN ||
            nextToken.type === TokenType.STAR_ASSIGN ||
            nextToken.type === TokenType.SLASH_ASSIGN ||
            nextToken.type === TokenType.PERCENT_ASSIGN
          )) {
            return this.parseExpressionStatement();
          }
        }
        return this.parseExpressionStatement();
    }
  }

  /**
   * 解析if语句
   */
  private parseIfStatement(): IfStatement {
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

    let alternate: Statement | null = null;
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
  private parseForStatement(): ForStatement {
    const token = this.advance(); // 消费 'for'

    this.consume(TokenType.LPAREN, "Expect '(' after 'for'");

    // 初始化
    let init: Expression | VariableDeclaration | null = null;
    if (!this.check(TokenType.SEMICOLON)) {
      init = this.parseExpression();
    }
    this.consume(TokenType.SEMICOLON, "Expect ';' after for init");

    // 条件
    let test: Expression | null = null;
    if (!this.check(TokenType.SEMICOLON)) {
      test = this.parseExpression();
    }
    this.consume(TokenType.SEMICOLON, "Expect ';' after for condition");

    // 更新
    let update: Expression | null = null;
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
  private parseWhileStatement(): WhileStatement {
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
  private parseReturnStatement(): ReturnStatement {
    const token = this.advance(); // 消费 'return'

    let argument: Expression | null = null;
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
  private parseBreakStatement(): Statement {
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
  private parseContinueStatement(): Statement {
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
  private parseFunctionDeclaration(): FunctionDeclaration {
    const token = this.advance(); // 消费 'function'

    const nameToken = this.consume(TokenType.IDENTIFIER, "Expect function name");
    const name = { type: NodeType.Identifier, name: nameToken.value, loc: this.createLocation(nameToken) };

    this.consume(TokenType.LPAREN, "Expect '(' after function name");

    const params: Identifier[] = [];
    if (!this.check(TokenType.RPAREN)) {
      do {
        const paramToken = this.consume(TokenType.IDENTIFIER, "Expect parameter name");
        params.push({ type: NodeType.Identifier, name: paramToken.value, loc: this.createLocation(paramToken) } as Identifier);
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
      id: name as any,
      params,
      body,
      loc: this.createLocation(token)
    };
  }

  /**
   * 解析import语句
   */
  private parseImportStatement(): ImportStatement {
    const token = this.advance(); // 消费 'import'

    const source = this.parsePrimary() as StringLiteral;

    return {
      type: NodeType.ImportStatement,
      source,
      loc: this.createLocation(token)
    };
  }

  /**
   * 解析块语句
   */
  private parseBlockStatement(): BlockStatement {
    const token = this.advance(); // 消费 '{'

    const body: Statement[] = [];
    while (!this.check(TokenType.RBRACE) && !this.isAtEnd()) {
      // 跳过换行
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

    return {
      type: NodeType.BlockStatement,
      body,
      loc: this.createLocation(token)
    };
  }

  /**
   * 解析表达式语句
   */
  private parseExpressionStatement(): ExpressionStatement {
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
  private parseExpression(): Expression {
    return this.parseAssignment();
  }

  /**
   * 解析赋值表达式
   */
  private parseAssignment(): Expression {
    const expr = this.parseConditional();

    if (this.check(TokenType.ASSIGN) ||
        this.check(TokenType.PLUS_ASSIGN) ||
        this.check(TokenType.MINUS_ASSIGN) ||
        this.check(TokenType.STAR_ASSIGN) ||
        this.check(TokenType.SLASH_ASSIGN) ||
        this.check(TokenType.PERCENT_ASSIGN)) {
      const operator = this.advance().value as string;
      const value = this.parseAssignment();

      return {
        type: NodeType.AssignmentExpression,
        operator,
        left: expr,
        right: value,
        loc: this.createLocation(expr)
      } as AssignmentExpression;
    }

    return expr;
  }

  /**
   * 解析条件表达式（三元运算符）
   */
  private parseConditional(): Expression {
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
      } as ConditionalExpression;
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
  private parseLogicalOr(): Expression {
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
      } as BinaryExpression;
    }

    return left;
  }

  /**
   * 解析逻辑与表达式
   */
  private parseLogicalAnd(): Expression {
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
      } as BinaryExpression;
    }

    return left;
  }

  /**
   * 解析按位或表达式
   */
  private parseBitwiseOr(): Expression {
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
      } as BinaryExpression;
    }

    return left;
  }

  /**
   * 解析按位异或表达式
   */
  private parseBitwiseXor(): Expression {
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
      } as BinaryExpression;
    }

    return left;
  }

  /**
   * 解析按位与表达式
   */
  private parseBitwiseAnd(): Expression {
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
      } as BinaryExpression;
    }

    return left;
  }

  /**
   * 解析相等比较表达式
   */
  private parseEquality(): Expression {
    let left = this.parseComparison();

    while (this.match(TokenType.EQ) || this.match(TokenType.NEQ)) {
      const operator = this.previous().value as string;
      const right = this.parseComparison();

      left = {
        type: NodeType.BinaryExpression,
        operator,
        left,
        right,
        loc: this.createLocation(left)
      } as BinaryExpression;
    }

    return left;
  }

  /**
   * 解析比较表达式
   */
  private parseComparison(): Expression {
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
        } as InExpression;
      } else if (operator === TokenType.LIKE) {
        const right = this.parseShift();
        left = {
          type: NodeType.LikeExpression,
          value: left,
          pattern: right,
          loc: this.createLocation(left)
        } as LikeExpression;
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
        } as BetweenExpression;
      } else {
        const op = this.previous().value as string;
        const right = this.parseShift();

        left = {
          type: NodeType.BinaryExpression,
          operator: op,
          left,
          right,
          loc: this.createLocation(left)
        } as BinaryExpression;
      }
    }

    return left;
  }

  /**
   * 解析位移表达式
   */
  private parseShift(): Expression {
    let left = this.parseAdditive();

    while (this.match(TokenType.LSHIFT) || this.match(TokenType.RSHIFT) || this.match(TokenType.URSHIFT)) {
      const operator = this.previous().value as string;
      const right = this.parseAdditive();

      left = {
        type: NodeType.BinaryExpression,
        operator,
        left,
        right,
        loc: this.createLocation(left)
      } as BinaryExpression;
    }

    return left;
  }

  /**
   * 解析加减表达式
   */
  private parseAdditive(): Expression {
    let left = this.parseMultiplicative();

    while (this.match(TokenType.PLUS) || this.match(TokenType.MINUS)) {
      const operator = this.previous().value as string;
      const right = this.parseMultiplicative();

      left = {
        type: NodeType.BinaryExpression,
        operator,
        left,
        right,
        loc: this.createLocation(left)
      } as BinaryExpression;
    }

    return left;
  }

  /**
   * 解析乘除表达式
   */
  private parseMultiplicative(): Expression {
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
      } as BinaryExpression;
    }

    return left;
  }

  /**
   * 解析一元表达式
   */
  private parseUnary(): Expression {
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
      } as UnaryExpression;
    }

    if (this.match(TokenType.INCREMENT) || this.match(TokenType.DECREMENT)) {
      const operator = this.previous().value as '++' | '--';
      const argument = this.parseUnary();

      return {
        type: NodeType.UpdateExpression,
        operator,
        argument,
        prefix: true,
        loc: this.createLocation(this.previous())
      } as UpdateExpression;
    }

    return this.parsePostfix();
  }

  /**
   * 解析后缀表达式
   */
  private parsePostfix(): Expression {
    let expr = this.parseCall();

    // 后缀自增/自减
    if (this.match(TokenType.INCREMENT) || this.match(TokenType.DECREMENT)) {
      const operator = this.previous().value as '++' | '--';
      return {
        type: NodeType.UpdateExpression,
        operator,
        argument: expr,
        prefix: false,
        loc: this.createLocation(expr)
      } as UpdateExpression;
    }

    return expr;
  }

  /**
   * 解析函数调用和成员访问
   */
  private parseCall(): Expression {
    let expr = this.parsePrimary();

    while (true) {
      if (this.match(TokenType.LPAREN)) {
        expr = this.finishCall(expr);
      } else if (this.match(TokenType.DOT)) {
        const nameToken = this.consume(TokenType.IDENTIFIER, "Expect property name after '.'");
        const name = { type: NodeType.Identifier, name: nameToken.value, loc: this.createLocation(nameToken) } as Identifier;
        expr = {
          type: NodeType.MemberExpression,
          object: expr,
          property: name,
          computed: false,
          loc: this.createLocation(expr)
        } as MemberExpression;
      } else if (this.match(TokenType.LBRACKET)) {
        const property = this.parseExpression();
        this.consume(TokenType.RBRACKET, "Expect ']' after index");
        expr = {
          type: NodeType.MemberExpression,
          object: expr,
          property,
          computed: true,
          loc: this.createLocation(expr)
        } as MemberExpression;
      } else {
        break;
      }
    }

    return expr;
  }

  /**
   * 完成函数调用
   */
  private finishCall(callee: Expression): Expression {
    const args: Expression[] = [];

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
    } as CallExpression;
  }

  /**
   * 解析基本表达式
   */
  private parsePrimary(): Expression {
    const token = this.peek();

    switch (token.type) {
      case TokenType.NUMBER:
        this.advance();
        return {
          type: NodeType.NumberLiteral,
          value: token.value,
          loc: this.createLocation(token)
        } as NumberLiteral;

      case TokenType.STRING:
        this.advance();
        return {
          type: NodeType.StringLiteral,
          value: token.value,
          loc: this.createLocation(token)
        } as StringLiteral;

      case TokenType.BOOLEAN:
        this.advance();
        return {
          type: NodeType.BooleanLiteral,
          value: token.value,
          loc: this.createLocation(token)
        } as BooleanLiteral;

      case TokenType.NULL:
        this.advance();
        return {
          type: NodeType.NullLiteral,
          value: token.value,  // 使用token的value（可能是null或undefined）
          loc: this.createLocation(token)
        } as NullLiteral;

      case TokenType.IDENTIFIER:
        this.advance();
        return {
          type: NodeType.Identifier,
          name: token.value,
          loc: this.createLocation(token)
        } as Identifier;

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
          } else {
            // 创建一个逗号表达式
            let result: Expression = params[0];
            for (let i = 1; i < params.length; i++) {
              result = {
                type: NodeType.BinaryExpression,
                operator: ',',
                left: result,
                right: params[i],
                loc: result.loc
              } as BinaryExpression;
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
  private parseNewExpression(): Expression {
    const token = this.advance(); // 消费 'new'

    const callee = this.parsePrimary();
    let args: Expression[] = [];

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
    } as NewExpression;
  }

  /**
   * 检查是否是箭头函数的参数列表
   */
  private isArrowParameterList(): boolean {
    let index = this.current;
    
    // 跳过换行
    while (index < this.tokens.length && this.tokens[index].type === TokenType.NEWLINE) {
      index++;
    }
    
    if (index >= this.tokens.length) return false;
    
    // 第一个必须是标识符
    if (this.tokens[index].type !== TokenType.IDENTIFIER) return false;
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
      } else if (token.type === TokenType.NEWLINE) {
        index++;
      } else {
        return false;
      }
    }
    
    return false;
  }

  /**
   * 解析箭头函数的参数列表
   */
  private parseArrowParameters(): Identifier[] {
    const params: Identifier[] = [];
    
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
      } as Identifier);
      
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
  private parseArrowFunctionWithParams(params: Identifier[]): ArrowFunctionExpression {
    const token = this.advance(); // 消费 ARROW token

    let body: Expression | BlockStatement;

    // 检查是否是块级体
    if (this.check(TokenType.LBRACE)) {
      body = this.parseBlockStatement();
    } else {
      // 简洁体
      body = this.parseAssignment();
    }

    return {
      type: NodeType.ArrowFunctionExpression,
      params,
      body,
      loc: this.createLocation(token)
    } as ArrowFunctionExpression;
  }

  /**
   * 解析箭头函数表达式
   */
  private parseArrowFunction(leftExpr: Expression): ArrowFunctionExpression {
    const token = this.previous(); // ARROW token

    let params: Identifier[] = [];

    // 如果左边是标识符，则是单参数箭头函数
    if (leftExpr.type === NodeType.Identifier) {
      params = [leftExpr as Identifier];
    } else if (leftExpr.type === NodeType.CallExpression) {
      // 如果是 (a, b) 形式，从调用表达式中提取参数
      const callExpr = leftExpr as CallExpression;
      if (callExpr.callee.type === NodeType.Identifier) {
        // 检查是否是 (a, b) => ... 形式
        // 这种情况下，callee 应该是一个标识符，但我们需要从 arguments 中提取参数
        // 实际上，这种情况下应该是在 parsePrimary 中处理 (a, b) 形式
        // 这里我们假设 arguments 是标识符列表
        for (const arg of callExpr.arguments) {
          if (arg.type === NodeType.Identifier) {
            params.push(arg as Identifier);
          } else {
            throw new ParseError(`Invalid arrow function parameter`, token);
          }
        }
      }
    }

    // 消费 ARROW token
    this.advance();

    let body: Expression | BlockStatement;

    // 检查是否是块级体
    if (this.check(TokenType.LBRACE)) {
      body = this.parseBlockStatement();
    } else {
      // 简洁体
      body = this.parseAssignment();
    }

    return {
      type: NodeType.ArrowFunctionExpression,
      params,
      body,
      loc: this.createLocation(token)
    } as ArrowFunctionExpression;
  }

  /**
   * 解析数组表达式
   */
  private parseArrayExpression(): ArrayExpression {
    const token = this.advance(); // 消费 '['

    const elements: Expression[] = [];
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
    } as ArrayExpression;
  }

  /**
   * 解析对象表达式
   */
  private parseObjectExpression(): ObjectExpression {
    const token = this.advance(); // 消费 '{'

    const properties: Array<{ key: Expression; value: Expression; computed?: boolean }> = [];

    if (!this.check(TokenType.RBRACE)) {
      do {
        // 跳过换行
        while (this.check(TokenType.NEWLINE)) {
          this.advance();
        }

        let key: Expression;
        let computed = false;

        if (this.match(TokenType.LBRACKET)) {
          // 计算属性
          key = this.parseExpression();
          this.consume(TokenType.RBRACKET, "Expect ']' after computed property");
          computed = true;
        } else if (this.check(TokenType.IDENTIFIER)) {
          key = {
            type: NodeType.Identifier,
            name: this.advance().value,
            loc: this.createLocation(this.previous())
          } as Identifier;
        } else if (this.check(TokenType.STRING)) {
          key = {
            type: NodeType.StringLiteral,
            value: this.advance().value,
            loc: this.createLocation(this.previous())
          } as StringLiteral;
        } else if (this.check(TokenType.NUMBER)) {
          key = {
            type: NodeType.NumberLiteral,
            value: this.advance().value,
            loc: this.createLocation(this.previous())
          } as NumberLiteral;
        } else {
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
    } as ObjectExpression;
  }

  // ============ 辅助方法 ============

  /**
   * 检查是否是对象字面量
   * 对象字面量: { 后面跟着标识符/字符串/数字，然后是冒号
   */
  private isObjectLiteral(): boolean {
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
    } else if (firstToken.type === TokenType.RBRACE) {
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
  private skipNewlines(): void {
    while (this.current < this.tokens.length && this.tokens[this.current].type === TokenType.NEWLINE) {
      this.current++;
    }
  }

  private peek(): Token {
    return this.tokens[this.current];
  }

  private peekNext(): Token | null {
    if (this.current + 1 >= this.tokens.length) return null;
    return this.tokens[this.current + 1];
  }

  private previous(): Token {
    return this.tokens[this.current - 1];
  }

  private advance(): Token {
    if (!this.isAtEnd()) this.current++;
    return this.previous();
  }

  private isAtEnd(): boolean {
    return this.peek().type === TokenType.EOF;
  }

  private check(type: TokenType): boolean {
    // 检查前也要跳过换行符
    this.skipNewlines();
    if (this.isAtEnd()) return false;
    return this.peek().type === type;
  }

  /**
   * 匹配指定类型的 Token，会在匹配前跳过换行符
   */
  private match(type: TokenType): boolean {
    // 先跳过换行符
    this.skipNewlines();
    
    if (this.check(type)) {
      this.advance();
      return true;
    }
    return false;
  }

  private consume(type: TokenType, message: string): Token {
    // consume 前也要跳过换行符
    this.skipNewlines();
    
    if (this.check(type)) return this.advance();
    throw new ParseError(message, this.peek());
  }

  private createLocation(start: Token | { loc?: any }): any {
    if ('line' in start) {
      return {
        start: { line: start.line, column: start.column },
        end: { line: this.previous().line, column: this.previous().column }
      };
    }
    return start.loc;
  }
}
