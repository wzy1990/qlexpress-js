import { Token } from '../types';
/**
 * 词法分析器
 * 将源代码字符串转换为Token流
 */
export declare class Lexer {
    private source;
    private tokens;
    private start;
    private current;
    private line;
    private column;
    private startColumn;
    private reservedNames;
    constructor(source: string, reservedNames?: Set<string>);
    /**
     * 执行词法分析，返回Token数组
     */
    tokenize(): Token[];
    /**
     * 扫描单个Token
     */
    private scanToken;
    /**
     * 扫描操作符
     */
    private scanOperator;
    /**
     * 扫描数字
     */
    private scanNumber;
    /**
     * 扫描字符串
     */
    private scanString;
    /**
     * 扫描占位符：${placeholder}
     */
    private scanPlaceholder;
    /**
     * 扫描标识符
     */
    private scanIdentifier;
    /**
     * 扫描块注释
     */
    private scanBlockComment;
    /**
     * 扫描行注释
     */
    private scanLineComment;
    /**
     * 辅助方法：检查是否为有效标识符
     */
    private isValidIdentifier;
    /**
     * 辅助方法：前进一个字符
     */
    private advance;
    /**
     * 辅助方法：查看当前字符但不前进
     */
    private peek;
    /**
     * 辅助方法：查看下一个字符但不前进
     */
    private peekNext;
    /**
     * 辅助方法：匹配并消费
     */
    private match;
    /**
     * 辅助方法：是否到达末尾
     */
    private isAtEnd;
    /**
     * 辅助方法：是否为空白字符
     */
    private isWhitespace;
    /**
     * 辅助方法：是否为数字
     */
    private isDigit;
    /**
     * 辅助方法：是否为十六进制数字
     */
    private isHexDigit;
    /**
     * 辅助方法：是否为八进制数字
     */
    private isOctalDigit;
    /**
     * 辅助方法：是否为字母
     */
    private isAlpha;
    /**
     * 辅助方法：是否为字母或数字
     */
    private isAlphaNumeric;
    /**
     * 辅助方法：添加Token
     */
    private addToken;
}
