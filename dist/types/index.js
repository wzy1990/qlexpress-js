"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnException = exports.ContinueException = exports.BreakException = exports.ControlFlow = exports.ReturnValue = void 0;
__exportStar(require("./token"), exports);
__exportStar(require("./ast"), exports);
/**
 * 返回值包装器
 */
class ReturnValue {
    constructor(value) {
        this.value = value;
    }
}
exports.ReturnValue = ReturnValue;
/**
 * 控制流异常基类
 */
class ControlFlow extends Error {
    constructor(message) {
        super(message);
        this.name = 'ControlFlow';
    }
}
exports.ControlFlow = ControlFlow;
/**
 * Break异常
 */
class BreakException extends ControlFlow {
    constructor() {
        super('break');
        this.name = 'BreakException';
    }
}
exports.BreakException = BreakException;
/**
 * Continue异常
 */
class ContinueException extends ControlFlow {
    constructor() {
        super('continue');
        this.name = 'ContinueException';
    }
}
exports.ContinueException = ContinueException;
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
exports.ReturnException = ReturnException;
