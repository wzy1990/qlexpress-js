"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeType = void 0;
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
    NodeType["ImportStatement"] = "ImportStatement";
    // 特殊
    NodeType["InExpression"] = "InExpression";
    NodeType["LikeExpression"] = "LikeExpression";
    NodeType["BetweenExpression"] = "BetweenExpression";
    NodeType["MacroCall"] = "MacroCall";
})(NodeType || (exports.NodeType = NodeType = {}));
