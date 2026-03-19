"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalMethodManager = exports.CustomOperatorManager = exports.CustomFunctionManager = exports.MacroManager = void 0;
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
exports.MacroManager = MacroManager;
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
exports.CustomFunctionManager = CustomFunctionManager;
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
exports.CustomOperatorManager = CustomOperatorManager;
/**
 * 外部方法绑定管理器
 */
class ExternalMethodManager {
    constructor() {
        this.classMethods = new Map();
        this.instanceMethods = new Map();
    }
    /**
     * 绑定类静态方法
     */
    bindClassMethod(functionName, className, methodName, paramTypes) {
        if (!this.classMethods.has(className)) {
            this.classMethods.set(className, new Map());
        }
        const classMethodMap = this.classMethods.get(className);
        // 这里存储方法信息，实际调用时需要通过反射或直接调用
        classMethodMap.set(functionName, {
            className,
            methodName,
            paramTypes,
            type: 'static'
        });
    }
    /**
     * 绑定实例方法
     */
    bindInstanceMethod(functionName, instance, methodName, paramTypes) {
        const instanceId = instance.constructor.name;
        if (!this.instanceMethods.has(instanceId)) {
            this.instanceMethods.set(instanceId, new Map());
        }
        const instanceMethodMap = this.instanceMethods.get(instanceId);
        instanceMethodMap.set(functionName, {
            instance,
            methodName,
            paramTypes,
            type: 'instance'
        });
    }
    /**
     * 调用静态方法
     */
    callClassMethod(className, functionName, args) {
        const classMethodMap = this.classMethods.get(className);
        if (!classMethodMap) {
            throw new Error(`Class ${className} not found`);
        }
        const methodInfo = classMethodMap.get(functionName);
        if (!methodInfo) {
            throw new Error(`Method ${functionName} not found in class ${className}`);
        }
        // 实际实现需要通过反射或其他方式调用
        // 这里只是框架结构
        return undefined;
    }
    /**
     * 调用实例方法
     */
    callInstanceMethod(instanceId, functionName, args) {
        const instanceMethodMap = this.instanceMethods.get(instanceId);
        if (!instanceMethodMap) {
            throw new Error(`Instance ${instanceId} not found`);
        }
        const methodInfo = instanceMethodMap.get(functionName);
        if (!methodInfo) {
            throw new Error(`Method ${functionName} not found in instance ${instanceId}`);
        }
        // 实际实现需要调用实例方法
        return undefined;
    }
    /**
     * 获取所有绑定的类方法
     */
    getAllClassMethods() {
        return new Map(this.classMethods);
    }
    /**
     * 获取所有绑定的实例方法
     */
    getAllInstanceMethods() {
        return new Map(this.instanceMethods);
    }
    /**
     * 清空所有绑定
     */
    clear() {
        this.classMethods.clear();
        this.instanceMethods.clear();
    }
}
exports.ExternalMethodManager = ExternalMethodManager;
