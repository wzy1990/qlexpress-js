import { Token } from './token';

/**
 * AST节点类型枚举
 */
export enum NodeType {
  // 字面量
  NumberLiteral = 'NumberLiteral',
  StringLiteral = 'StringLiteral',
  BooleanLiteral = 'BooleanLiteral',
  NullLiteral = 'NullLiteral',

  // 标识符
  Identifier = 'Identifier',

  // 数组和对象
  ArrayExpression = 'ArrayExpression',
  ObjectExpression = 'ObjectExpression',

  // 运算表达式
  BinaryExpression = 'BinaryExpression',
  UnaryExpression = 'UnaryExpression',
  ConditionalExpression = 'ConditionalExpression',
  AssignmentExpression = 'AssignmentExpression',
  UpdateExpression = 'UpdateExpression',
  MemberExpression = 'MemberExpression',
  CallExpression = 'CallExpression',
  NewExpression = 'NewExpression',

  // 语句
  Program = 'Program',
  ExpressionStatement = 'ExpressionStatement',
  BlockStatement = 'BlockStatement',
  IfStatement = 'IfStatement',
  WhileStatement = 'WhileStatement',
  ForStatement = 'ForStatement',
  ReturnStatement = 'ReturnStatement',
  BreakStatement = 'BreakStatement',
  ContinueStatement = 'ContinueStatement',
  VariableDeclaration = 'VariableDeclaration',
  FunctionDeclaration = 'FunctionDeclaration',
  ImportStatement = 'ImportStatement',

  // 特殊
  InExpression = 'InExpression',
  LikeExpression = 'LikeExpression',
  BetweenExpression = 'BetweenExpression',
  MacroCall = 'MacroCall'
}

/**
 * 基础节点接口
 */
export interface BaseNode {
  type: NodeType;
  loc?: SourceLocation;
}

export interface SourceLocation {
  start: Position;
  end: Position;
}

export interface Position {
  line: number;
  column: number;
}

/**
 * 字面量节点
 */
export interface NumberLiteral extends BaseNode {
  type: NodeType.NumberLiteral;
  value: number;
}

export interface StringLiteral extends BaseNode {
  type: NodeType.StringLiteral;
  value: string;
}

export interface BooleanLiteral extends BaseNode {
  type: NodeType.BooleanLiteral;
  value: boolean;
}

export interface NullLiteral extends BaseNode {
  type: NodeType.NullLiteral;
}

/**
 * 标识符节点
 */
export interface Identifier extends BaseNode {
  type: NodeType.Identifier;
  name: string;
}

/**
 * 数组表达式
 */
export interface ArrayExpression extends BaseNode {
  type: NodeType.ArrayExpression;
  elements: Expression[];
}

/**
 * 对象表达式
 */
export interface ObjectExpression extends BaseNode {
  type: NodeType.ObjectExpression;
  properties: Property[];
}

export interface Property {
  key: Expression | Identifier;
  value: Expression;
  computed?: boolean;
}

/**
 * 二元表达式
 */
export interface BinaryExpression extends BaseNode {
  type: NodeType.BinaryExpression;
  operator: string;
  left: Expression;
  right: Expression;
}

/**
 * 一元表达式
 */
export interface UnaryExpression extends BaseNode {
  type: NodeType.UnaryExpression;
  operator: string;
  argument: Expression;
  prefix: boolean;
}

/**
 * 条件表达式（三元运算符）
 */
export interface ConditionalExpression extends BaseNode {
  type: NodeType.ConditionalExpression;
  test: Expression;
  consequent: Expression;
  alternate: Expression;
}

/**
 * 赋值表达式
 */
export interface AssignmentExpression extends BaseNode {
  type: NodeType.AssignmentExpression;
  operator: string;
  left: Expression;
  right: Expression;
}

/**
 * 更新表达式（自增/自减）
 */
export interface UpdateExpression extends BaseNode {
  type: NodeType.UpdateExpression;
  operator: '++' | '--';
  argument: Expression;
  prefix: boolean;
}

/**
 * 成员访问表达式
 */
export interface MemberExpression extends BaseNode {
  type: NodeType.MemberExpression;
  object: Expression;
  property: Expression;
  computed: boolean;
}

/**
 * 函数调用表达式
 */
export interface CallExpression extends BaseNode {
  type: NodeType.CallExpression;
  callee: Expression;
  arguments: Expression[];
}

/**
 * new表达式
 */
export interface NewExpression extends BaseNode {
  type: NodeType.NewExpression;
  callee: Expression;
  arguments: Expression[];
}

/**
 * IN表达式
 */
export interface InExpression extends BaseNode {
  type: NodeType.InExpression;
  element: Expression;
  container: Expression;
}

/**
 * LIKE表达式
 */
export interface LikeExpression extends BaseNode {
  type: NodeType.LikeExpression;
  value: Expression;
  pattern: Expression;
}

/**
 * BETWEEN表达式
 */
export interface BetweenExpression extends BaseNode {
  type: NodeType.BetweenExpression;
  value: Expression;
  low: Expression;
  high: Expression;
}

/**
 * 表达式联合类型
 */
export type Expression =
  | NumberLiteral
  | StringLiteral
  | BooleanLiteral
  | NullLiteral
  | Identifier
  | ArrayExpression
  | ObjectExpression
  | BinaryExpression
  | UnaryExpression
  | ConditionalExpression
  | AssignmentExpression
  | UpdateExpression
  | MemberExpression
  | CallExpression
  | NewExpression
  | InExpression
  | LikeExpression
  | BetweenExpression;

/**
 * 程序节点
 */
export interface Program extends BaseNode {
  type: NodeType.Program;
  body: Statement[];
}

/**
 * 表达式语句
 */
export interface ExpressionStatement extends BaseNode {
  type: NodeType.ExpressionStatement;
  expression: Expression;
}

/**
 * 块语句
 */
export interface BlockStatement extends BaseNode {
  type: NodeType.BlockStatement;
  body: Statement[];
}

/**
 * if语句
 */
export interface IfStatement extends BaseNode {
  type: NodeType.IfStatement;
  test: Expression;
  consequent: Statement;
  alternate?: Statement | null;
}

/**
 * while语句
 */
export interface WhileStatement extends BaseNode {
  type: NodeType.WhileStatement;
  test: Expression;
  body: Statement;
}

/**
 * for语句
 */
export interface ForStatement extends BaseNode {
  type: NodeType.ForStatement;
  init?: Expression | VariableDeclaration | null;
  test?: Expression | null;
  update?: Expression | null;
  body: Statement;
}

/**
 * return语句
 */
export interface ReturnStatement extends BaseNode {
  type: NodeType.ReturnStatement;
  argument?: Expression | null;
}

/**
 * break语句
 */
export interface BreakStatement extends BaseNode {
  type: NodeType.BreakStatement;
}

/**
 * continue语句
 */
export interface ContinueStatement extends BaseNode {
  type: NodeType.ContinueStatement;
}

/**
 * 变量声明
 */
export interface VariableDeclaration extends BaseNode {
  type: NodeType.VariableDeclaration;
  declarations: VariableDeclarator[];
}

export interface VariableDeclarator {
  id: Identifier;
  init?: Expression | null;
}

/**
 * 函数声明
 */
export interface FunctionDeclaration extends BaseNode {
  type: NodeType.FunctionDeclaration;
  id: Identifier;
  params: Identifier[];
  body: BlockStatement;
}

/**
 * 导入语句
 */
export interface ImportStatement extends BaseNode {
  type: NodeType.ImportStatement;
  source: StringLiteral;
  specifiers?: (Identifier | ImportSpecifier)[];
}

export interface ImportSpecifier {
  imported: Identifier;
  local: Identifier;
}

/**
 * 语句联合类型
 */
export type Statement =
  | Program
  | ExpressionStatement
  | BlockStatement
  | IfStatement
  | WhileStatement
  | ForStatement
  | ReturnStatement
  | BreakStatement
  | ContinueStatement
  | VariableDeclaration
  | FunctionDeclaration
  | ImportStatement;

/**
 * 宏调用
 */
export interface MacroCall extends BaseNode {
  type: NodeType.MacroCall;
  name: string;
  expression: string;
}
