"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoopCounter = exports.TimeoutController = exports.SecurityManager = void 0;
const types_1 = require("../types");
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
            throw new types_1.SecurityError(`Method '${methodName}' is not allowed in sandbox mode`);
        }
        // 检查黑名单
        if (this.config.forbidRiskMethods && this.isBlacklisted(methodName)) {
            throw new types_1.SecurityError(`Access to '${methodName}' is forbidden`);
        }
        // 检查白名单
        if (this.config.allowedMethods && !this.isWhitelisted(methodName)) {
            throw new types_1.SecurityError(`Access to '${methodName}' is not in the whitelist`);
        }
    }
    /**
     * 检查数组长度是否安全
     */
    checkArrayLength(length) {
        if (length > this.config.maxArrayLength) {
            throw new types_1.SecurityError(`Array length ${length} exceeds maximum ${this.config.maxArrayLength}`);
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
exports.SecurityManager = SecurityManager;
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
 * 执行超时控制器
 */
class TimeoutController {
    constructor(timeout = 0) {
        this.startTime = 0;
        this.timeoutId = null;
        this.timedOut = false;
        this.timeout = timeout;
    }
    /**
     * 开始计时
     */
    start() {
        this.startTime = Date.now();
        this.timedOut = false;
        if (this.timeout > 0) {
            this.timeoutId = setTimeout(() => {
                this.timedOut = true;
            }, this.timeout);
        }
    }
    /**
     * 停止计时
     */
    stop() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
    }
    /**
     * 检查是否超时
     */
    check() {
        if (this.timedOut || (this.timeout > 0 && Date.now() - this.startTime > this.timeout)) {
            throw new types_1.SecurityError(`Execution timeout after ${this.timeout}ms`);
        }
    }
    /**
     * 获取已执行时间
     */
    getElapsedTime() {
        return Date.now() - this.startTime;
    }
    /**
     * 获取剩余时间
     */
    getRemainingTime() {
        if (this.timeout === 0)
            return Infinity;
        return Math.max(0, this.timeout - this.getElapsedTime());
    }
}
exports.TimeoutController = TimeoutController;
/**
 * 循环计数器
 */
class LoopCounter {
    constructor(maxCount = 1000000) {
        this.count = 0;
        this.maxCount = maxCount;
    }
    /**
     * 增加计数
     */
    increment() {
        this.count++;
        if (this.count > this.maxCount) {
            throw new types_1.SecurityError(`Maximum loop count exceeded: ${this.maxCount}`);
        }
    }
    /**
     * 重置计数
     */
    reset() {
        this.count = 0;
    }
    /**
     * 获取当前计数
     */
    getCount() {
        return this.count;
    }
}
exports.LoopCounter = LoopCounter;
