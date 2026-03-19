"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interpreter = exports.BuiltinObjects = exports.RuntimeContext = exports.Scope = void 0;
var context_1 = require("./context");
Object.defineProperty(exports, "Scope", { enumerable: true, get: function () { return context_1.Scope; } });
Object.defineProperty(exports, "RuntimeContext", { enumerable: true, get: function () { return context_1.RuntimeContext; } });
Object.defineProperty(exports, "BuiltinObjects", { enumerable: true, get: function () { return context_1.BuiltinObjects; } });
var interpreter_1 = require("./interpreter");
Object.defineProperty(exports, "Interpreter", { enumerable: true, get: function () { return interpreter_1.Interpreter; } });
