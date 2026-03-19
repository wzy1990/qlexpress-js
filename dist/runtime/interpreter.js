"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interpreter = void 0;
const types_1 = require("../types");
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
                value: value instanceof types_1.ReturnValue ? value.value : value,
                variables: this.context.toObject(),
                trace: this.config.trace ? this.traces : undefined
            };
        }
        catch (error) {
            if (error instanceof types_1.BreakException) {
                throw new types_1.RuntimeError("'break' is not allowed outside of a loop");
            }
            if (error instanceof types_1.ContinueException) {
                throw new types_1.RuntimeError("'continue' is not allowed outside of a loop");
            }
            if (error instanceof types_1.ReturnException) {
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
            throw new types_1.RuntimeError(`Execution timeout after ${timeout}ms`);
        }
        // 检查循环次数
        if (this.loopCount > maxLoopCount) {
            throw new types_1.RuntimeError(`Maximum loop count exceeded: ${maxLoopCount}`);
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
            case types_1.NodeType.Program:
                return this.evaluateProgram(node);
            case types_1.NodeType.ExpressionStatement:
                return this.evaluate(node.expression);
            case types_1.NodeType.NumberLiteral:
            case types_1.NodeType.StringLiteral:
            case types_1.NodeType.BooleanLiteral:
            case types_1.NodeType.NullLiteral:
                return node.value;
            case types_1.NodeType.Identifier:
                return this.evaluateIdentifier(node);
            case types_1.NodeType.ArrayExpression:
                return this.evaluateArrayExpression(node);
            case types_1.NodeType.ObjectExpression:
                return this.evaluateObjectExpression(node);
            case types_1.NodeType.BinaryExpression:
                return this.evaluateBinaryExpression(node);
            case types_1.NodeType.UnaryExpression:
                return this.evaluateUnaryExpression(node);
            case types_1.NodeType.ConditionalExpression:
                return this.evaluateConditionalExpression(node);
            case types_1.NodeType.AssignmentExpression:
                return this.evaluateAssignmentExpression(node);
            case types_1.NodeType.UpdateExpression:
                return this.evaluateUpdateExpression(node);
            case types_1.NodeType.MemberExpression:
                return this.evaluateMemberExpression(node);
            case types_1.NodeType.CallExpression:
                return this.evaluateCallExpression(node);
            case types_1.NodeType.NewExpression:
                return this.evaluateNewExpression(node);
            case types_1.NodeType.InExpression:
                return this.evaluateInExpression(node);
            case types_1.NodeType.LikeExpression:
                return this.evaluateLikeExpression(node);
            case types_1.NodeType.BetweenExpression:
                return this.evaluateBetweenExpression(node);
            case types_1.NodeType.BlockStatement:
                return this.evaluateBlockStatement(node);
            case types_1.NodeType.IfStatement:
                return this.evaluateIfStatement(node);
            case types_1.NodeType.WhileStatement:
                return this.evaluateWhileStatement(node);
            case types_1.NodeType.ForStatement:
                return this.evaluateForStatement(node);
            case types_1.NodeType.ReturnStatement:
                return this.evaluateReturnStatement(node);
            case types_1.NodeType.BreakStatement:
                throw new types_1.BreakException();
            case types_1.NodeType.ContinueStatement:
                throw new types_1.ContinueException();
            case types_1.NodeType.FunctionDeclaration:
                return this.evaluateFunctionDeclaration(node);
            case types_1.NodeType.VariableDeclaration:
                return this.evaluateVariableDeclaration(node);
            default:
                throw new types_1.RuntimeError(`Unknown node type: ${node.type}`);
        }
    }
    /**
     * 评估程序
     */
    evaluateProgram(node) {
        let result = undefined;
        for (const statement of node.body) {
            result = this.evaluate(statement);
            if (result instanceof types_1.ReturnValue) {
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
            throw new types_1.RuntimeError(`Array length exceeds maximum: ${maxArrayLength}`);
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
            if (prop.key.type === types_1.NodeType.Identifier) {
                key = prop.key.name;
            }
            else if (prop.key.type === types_1.NodeType.StringLiteral) {
                key = prop.key.value;
            }
            else if (prop.key.type === types_1.NodeType.NumberLiteral) {
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
                    throw new types_1.RuntimeError('Division by zero');
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
                throw new types_1.RuntimeError(`Unknown binary operator: ${operator}`);
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
                throw new types_1.RuntimeError(`Unknown unary operator: ${node.operator}`);
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
        if (node.left.type === types_1.NodeType.Identifier) {
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
                    throw new types_1.RuntimeError(`Unknown assignment operator: ${node.operator}`);
            }
        }
        if (node.left.type === types_1.NodeType.MemberExpression) {
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
                    throw new types_1.RuntimeError(`Unknown assignment operator: ${node.operator}`);
            }
        }
        throw new types_1.RuntimeError('Invalid assignment target');
    }
    /**
     * 评估更新表达式
     */
    evaluateUpdateExpression(node) {
        const getValue = () => {
            if (node.argument.type === types_1.NodeType.Identifier) {
                return this.toNumber(this.context.get(node.argument.name) ?? 0);
            }
            if (node.argument.type === types_1.NodeType.MemberExpression) {
                const object = this.evaluate(node.argument.object);
                const property = node.argument.computed
                    ? this.evaluate(node.argument.property)
                    : node.argument.property.name;
                return this.toNumber(object[property] ?? 0);
            }
            throw new types_1.RuntimeError('Invalid update target');
        };
        const setValue = (value) => {
            if (node.argument.type === types_1.NodeType.Identifier) {
                this.context.set(node.argument.name, value);
            }
            else if (node.argument.type === types_1.NodeType.MemberExpression) {
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
        if (node.callee.type === types_1.NodeType.MemberExpression) {
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
            throw new types_1.RuntimeError(`${String(method)} is not a function`);
        }
        // 处理普通函数调用
        const callee = this.evaluate(node.callee);
        // 自定义函数
        if (this.customFunctions.has(node.callee.type === types_1.NodeType.Identifier ? node.callee.name : '')) {
            const funcName = node.callee.name;
            const func = this.customFunctions.get(funcName);
            return func(...args);
        }
        // 用户定义函数
        if (node.callee.type === types_1.NodeType.Identifier) {
            const funcName = node.callee.name;
            if (this.userFunctions.has(funcName)) {
                return this.callUserFunction(this.userFunctions.get(funcName), args);
            }
        }
        if (typeof callee === 'function') {
            return callee(...args);
        }
        throw new types_1.RuntimeError('Expression is not a function');
    }
    /**
     * 调用用户定义函数
     */
    callUserFunction(func, args) {
        // 创建新的作用域
        const previousScope = this.context.getCurrentScope();
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
            if (error instanceof types_1.ReturnException) {
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
            throw new types_1.RuntimeError("'new' is not allowed in sandbox mode");
        }
        const args = node.arguments.map(arg => this.evaluate(arg));
        const constructor = this.evaluate(node.callee);
        if (typeof constructor !== 'function') {
            throw new types_1.RuntimeError('Expression is not a constructor');
        }
        return new constructor(...args);
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
            if (result instanceof types_1.ReturnValue) {
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
                if (error instanceof types_1.BreakException) {
                    break;
                }
                if (error instanceof types_1.ContinueException) {
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
                if (error instanceof types_1.BreakException) {
                    break;
                }
                if (error instanceof types_1.ContinueException) {
                    // 继续执行更新语句
                }
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
        throw new types_1.ReturnException(value);
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
exports.Interpreter = Interpreter;
