import { SecurityConfig } from '../types';
/**
 * 安全管理器
 * 实现多级安全控制机制
 */
export declare class SecurityManager {
    private config;
    private static DEFAULT_BLACKLIST;
    constructor(config?: Partial<SecurityConfig>);
    /**
     * 获取安全配置
     */
    getConfig(): SecurityConfig;
    /**
     * 更新安全配置
     */
    updateConfig(config: Partial<SecurityConfig>): void;
    /**
     * 检查是否处于沙箱模式
     */
    isSandboxMode(): boolean;
    /**
     * 启用沙箱模式
     */
    enableSandboxMode(): void;
    /**
     * 禁用沙箱模式
     */
    disableSandboxMode(): void;
    /**
     * 检查方法是否在黑名单中
     */
    isBlacklisted(methodName: string): boolean;
    /**
     * 检查方法是否在白名单中
     */
    isWhitelisted(methodName: string): boolean;
    /**
     * 检查方法调用是否安全
     */
    checkMethodAccess(methodName: string): void;
    /**
     * 检查数组长度是否安全
     */
    checkArrayLength(length: number): void;
    /**
     * 添加危险方法到黑名单
     */
    addToBlacklist(methodName: string): void;
    /**
     * 从黑名单移除方法
     */
    removeFromBlacklist(methodName: string): void;
    /**
     * 添加方法到白名单
     */
    addToWhitelist(methodName: string): void;
    /**
     * 从白名单移除方法
     */
    removeFromWhitelist(methodName: string): void;
    /**
     * 设置超时时间
     */
    setTimeout(timeout: number): void;
    /**
     * 获取超时时间
     */
    getTimeout(): number;
    /**
     * 设置最大循环次数
     */
    setMaxLoopCount(count: number): void;
    /**
     * 获取最大循环次数
     */
    getMaxLoopCount(): number;
    /**
     * 设置最大数组长度
     */
    setMaxArrayLength(length: number): void;
    /**
     * 获取最大数组长度
     */
    getMaxArrayLength(): number;
    /**
     * 创建安全执行环境
     */
    createSafeEnvironment(): Record<string, any>;
}
/**
 * 执行超时控制器
 */
export declare class TimeoutController {
    private timeout;
    private startTime;
    private timeoutId;
    private timedOut;
    constructor(timeout?: number);
    /**
     * 开始计时
     */
    start(): void;
    /**
     * 停止计时
     */
    stop(): void;
    /**
     * 检查是否超时
     */
    check(): void;
    /**
     * 获取已执行时间
     */
    getElapsedTime(): number;
    /**
     * 获取剩余时间
     */
    getRemainingTime(): number;
}
/**
 * 循环计数器
 */
export declare class LoopCounter {
    private count;
    private maxCount;
    constructor(maxCount?: number);
    /**
     * 增加计数
     */
    increment(): void;
    /**
     * 重置计数
     */
    reset(): void;
    /**
     * 获取当前计数
     */
    getCount(): number;
}
