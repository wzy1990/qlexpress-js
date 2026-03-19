"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressRunner = void 0;
exports.createDefaultContext = createDefaultContext;
exports.execute = execute;
const types_1 = require("./types");
const lexer_1 = require("./lexer");
const parser_1 = require("./parser");
const runtime_1 = require("./runtime");
const functions_1 = require("./functions");
const security_1 = require("./security");
const operators_1 = require("./operators");
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
        this.securityManager = new security_1.SecurityManager(this.config.security);
        this.macroManager = new operators_1.MacroManager();
        this.functionManager = new operators_1.CustomFunctionManager();
        this.operatorManager = new operators_1.CustomOperatorManager();
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
            const lexer = new lexer_1.Lexer(expression);
            const tokens = lexer.tokenize();
            // 语法分析
            const parser = new parser_1.Parser(tokens, this.getMacroExpressions(), this.operatorAliases);
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
        const interpreter = new runtime_1.Interpreter(runtimeContext, {
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
        Object.assign(initialVars, runtime_1.BuiltinObjects.getAll());
        // 添加内置函数
        for (const [name, handler] of Object.entries(functions_1.builtinFunctions)) {
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
        return new runtime_1.RuntimeContext(initialVars);
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
        return this.functionManager.has(name) || functions_1.builtinFunctions[name] !== undefined;
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
        const lexer = new lexer_1.Lexer(expression);
        const tokens = lexer.tokenize();
        const parser = new parser_1.Parser(tokens, this.getMacroExpressions(), this.operatorAliases);
        const ast = parser.parse();
        const varNames = new Set();
        this.collectVarNames(ast, varNames);
        // 排除内置函数和变量
        const builtins = new Set([
            ...Object.keys(functions_1.builtinFunctions),
            ...Object.keys(runtime_1.BuiltinObjects.getAll()),
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
        if (node.type === types_1.NodeType.Identifier) {
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
        const lexer = new lexer_1.Lexer(expression);
        const tokens = lexer.tokenize();
        const parser = new parser_1.Parser(tokens, this.getMacroExpressions(), this.operatorAliases);
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
        if (node.type === types_1.NodeType.CallExpression) {
            if (node.callee.type === types_1.NodeType.Identifier) {
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
            const lexer = new lexer_1.Lexer(expression);
            const tokens = lexer.tokenize();
            const parser = new parser_1.Parser(tokens, this.getMacroExpressions(), this.operatorAliases);
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
exports.ExpressRunner = ExpressRunner;
/**
 * 创建默认上下文
 */
function createDefaultContext(vars = {}) {
    const context = new runtime_1.RuntimeContext(vars);
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
// 默认导出
exports.default = ExpressRunner;
