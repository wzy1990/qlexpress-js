/*
 * @Author: 王志永
 * @Date: 2026-03-26 15:44:17
 * @LastEditors: 王志永
 * @LastEditTime: 2026-03-26 22:53:28
 * @Description: 表达式配置组件（带计算结果），在 ExpressionConfig 基础上增加了参数录入和表达式计算结果展示功能
 */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { ExpressRunner } from 'qlexpress-js';
import { FunctionItem, VariableItem, variables, categories, functions } from '../ExpressionConfig/data';
import * as CustomFunctions from '../ExpressionConfig/functions';
import './index.less';

const ExpressionConfigWithResult: React.FC = () => {
  const [expression, setExpression] = useState<string>('');
  const [context, setContext] = useState<string>(JSON.stringify({ 
    '价格': 100, 
    '饭卡商家承担': 10, 
    '平台补贴': 5 
  }, null, 2));
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [selectedFunction, setSelectedFunction] = useState<FunctionItem | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [executionTime, setExecutionTime] = useState<number>(0);
  const editorRef = useRef<any>(null);
  const contextEditorRef = useRef<any>(null);

  // 创建表达式运行器实例，并批量注册自定义函数
  const runner = new ExpressRunner();
  Object.entries(CustomFunctions).forEach(([name, handler]) => { // 批量注册自定义函数
    if (name !== 'default' && typeof handler === 'function') {
      runner.addFunction(name, handler);
    } else {
      console.error(`Invalid function handler for ${name}. Expected a function, got:`, typeof handler);
    }
  });

  // 筛选函数列表
  const filteredFunctions = functions.filter((func: FunctionItem) => {
    const matchesCategory = selectedCategory === '全部' || func.category === selectedCategory;
    const matchesSearch = func.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      func.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    const backEndExpression = '商家应收=\n    价格\n   - 饭卡商家承担\n   + 平台补贴'; // 后端表达式示例
    
    // 直接使用后端返回的表达式，保留原有的换行和空格格式
    const jsExpression = backEndExpression;
    
    setExpression(jsExpression);
    
    // 可选：在编辑器加载完成后，将光标移动到第一行
    if (editorRef.current) {
      editorRef.current.setPosition({ lineNumber: 1, column: 1 });
    }
  }, []);

  /**
   * 将字符串解析为 JavaScript 对象
   */
  const parseJsObject = (str: string): Record<string, any> => {
    const trimmed = str.trim();
    if (!trimmed) return {};
    try {
      return JSON.parse(trimmed);
    } catch {
      const converted = trimmed
        .replace(/([\w$]+)\s*:/g, '"$1":')
        .replace(/'([^']*)'/g, '"$1"');
      return JSON.parse(converted);
    }
  };

  // 执行表达式计算
  const handleExecute = useCallback(() => {
    const startTime = performance.now();
    setError('');
    setResult('');

    try {
      // 解析上下文
      const contextObj = parseJsObject(context);

      console.log('表达式:', expression);
      console.log('上下文:', contextObj);

      // 执行
      let executeResult: any;
      try {
        // const runner = new ExpressRunner();
        // 现在可以使用所有自定义函数和表达式执行器
        executeResult = runner.execute(expression, contextObj);
      } catch (e: any) {
        throw new Error(e.message);
      }

      const endTime = performance.now();
      const duration = (endTime - startTime).toFixed(2);

      setResult(formatResult(executeResult));
      setExecutionTime(parseFloat(duration));
    } catch (e: any) {
      const endTime = performance.now();
      const duration = (endTime - startTime).toFixed(2);
      setError(e.message || '执行错误');
      setExecutionTime(parseFloat(duration));
    }
  }, [expression, context]);

  const formatResult = (result: any): string => {
    if (result === null) return 'null';
    if (result === undefined) return 'undefined';
    if (typeof result === 'string') return result;
    if (typeof result === 'number' || typeof result === 'boolean') return String(result);
    if (Array.isArray(result)) return JSON.stringify(result, null, 2);
    if (typeof result === 'object') return JSON.stringify(result, null, 2);
    return String(result);
  };

  // 插入变量到表达式中
  const handleInsertVariable = (variable: VariableItem) => {
    const insertText = '${' + variable.name + '}';
    if (editorRef.current) {
      const editor = editorRef.current;
      const position = editor.getPosition();
      if (position) {
        editor.executeEdits('insert-text', [
          {
            range: {
              startLineNumber: position.lineNumber,
              startColumn: position.column,
              endLineNumber: position.lineNumber,
              endColumn: position.column
            },
            text: insertText
          }
        ]);
        editor.focus();
      }
    } else {
      // 降级方案：如果编辑器实例不可用，追加到末尾
      setExpression(prev => `${prev}${insertText}`);
    }
  };

  // 插入函数到表达式中
  const handleInsertFunction = (func: FunctionItem) => {
    const insertText = func.signature;
    if (editorRef.current) {
      const editor = editorRef.current;
      const position = editor.getPosition();
      if (position) {
        editor.executeEdits('insert-text', [
          {
            range: {
              startLineNumber: position.lineNumber,
              startColumn: position.column,
              endLineNumber: position.lineNumber,
              endColumn: position.column
            },
            text: insertText
          }
        ]);
        editor.focus();
      }
    } else {
      // 降级方案：如果编辑器实例不可用，追加到末尾
      setExpression(prev => `${prev}${insertText}`);
    }
  };

  // 保存表达式到后端
  const handleSaveToBackend = async () => {
    try {
      // expression 状态变量已经包含了完整的带换行和空格的字符串
      // Monaco Editor 的 onChange 会自动保留所有格式字符（\n 和空格）
      const backendExpression = expression;
      
      console.log('准备发送到后端的表达式:', backendExpression);
      console.log('表达式长度:', backendExpression.length);
      console.log('包含的换行符数量:', (backendExpression.match(/\n/g) || []).length);
      
      // 示例：调用后端 API
      // const response = await fetch('/api/save-expression', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     expression: backendExpression, // 直接发送，保留原始格式
      //   }),
      // });
      // 
      // if (response.ok) {
      //   const result = await response.json();
      //   console.log('保存成功:', result);
      //   alert('保存成功！');
      // }
      
      // 临时演示：显示要发送的内容
      alert(`准备发送到后端的表达式:\n${backendExpression}\n\n这是一个包含 ${backendExpression.split('\n').length} 行的多行字符串`);
      
    } catch (error) {
      console.error('保存失败:', error);
      alert('保存失败，请重试');
    }
  };

  return (
    <div className="expression-config-container">
      <div className="expression-config-header">
        <h2>表达式配置（带计算结果）</h2>
      </div>
      
      <div className="expression-content-wrapper">
        {/* 左侧：原有功能 */}
        <div className="expression-left-panel">
          <div className="expression-input-section">
            <div className="expression-input-label">请在下方编辑区内输入</div>
            <div className="expression-input-wrapper">
              <MonacoEditor
                height="200px"
                language="javascript"
                value={expression}
                onChange={(value) => setExpression(value || '')}
                editorDidMount={(editor) => {
                  editorRef.current = editor;
                }}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                  wordWrap: 'off',
                  wrappingStrategy: 'advanced',
                  folding: false,
                  formatOnPaste: false,
                  formatOnType: false,
                  autoIndent: 'none',
                  suggestOnTriggerCharacters: true,
                  quickSuggestions: true,
                }}
              />
            </div>
          </div>
          
          <div className="expression-tools-section">
            {/* 变量列表 */}
            <div className="variable-list">
              <div className="section-title">变量 双击插入变量</div>
              <div className="variable-items">
                {variables.map((variable: VariableItem) => (
                  <div
                    key={variable.name}
                    className="variable-item"
                    onDoubleClick={() => handleInsertVariable(variable)}
                  >
                    <div className="variable-name">{variable.name}</div>
                    <div className="variable-type">{variable.type}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 函数列表 */}
            <div className="function-list">
              {/* 左侧：函数分类 */}
              <div className="function-categories-container">
                <div className="section-title">函数分类</div>
                <div className="function-categories">
                  {categories.map((category: string) => (
                    <div
                      key={category}
                      className={`category-item ${selectedCategory === category ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 中间：函数名称列表 */}
              <div className="function-items-container">
                <div className="section-title">函数列表 双击插入公式</div>
                <div className="function-search">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="搜索"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="function-items">
                  {filteredFunctions.map((func: FunctionItem) => (
                    <div
                      key={func.name}
                      className={`function-item ${selectedFunction?.name === func.name ? 'selected' : ''}`}
                      onClick={() => setSelectedFunction(func)}
                      onDoubleClick={() => handleInsertFunction(func)}
                    >
                      {func.name}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 右侧：函数信息 */}
              <div className="function-info">
                {selectedFunction ? (
                  <>
                    <div className="function-info-header">函数信息</div>
                    <div className="function-info-content">
                      <pre>{selectedFunction.description}</pre>
                    </div>
                  </>
                ) : (
                  <div className="function-info-header">请选择一个函数查看详细信息</div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* 右侧：新增的参数录入和计算结果 */}
        <div className="expression-right-panel">
          {/* 参数录入 */}
          <div className="right-panel-section">
            <div className="section-header">
              <h3>参数录入</h3>
              <button className="btn btn-primary btn-small" onClick={handleExecute}>
                计算表达式
              </button>
            </div>
            <div className="monaco-editor-wrapper">
              <MonacoEditor
                height="200px"
                language="json"
                value={context}
                onChange={(value) => setContext(value || '')}
                editorDidMount={(editor) => {
                  contextEditorRef.current = editor;
                }}
                options={{
                  minimap: { enabled: false },
                  fontSize: 13,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                  wordWrap: 'off',
                  formatOnPaste: true,
                  formatOnType: true,
                }}
              />
            </div>
          </div>

          {/* 计算结果 */}
          <div className="right-panel-section">
            <div className="section-header">
              <h3>计算结果</h3>
              {executionTime > 0 && (
                <span className="execution-time">耗时：{executionTime}ms</span>
              )}
            </div>
            <div className={`result-area ${error ? 'error' : result ? 'success' : 'empty'}`}>
              {error ? (
                <div className="result-error">{error}</div>
              ) : result ? (
                <div className="result-success">
                  <pre>{result}</pre>
                </div>
              ) : (
                <div className="result-empty">点击"计算表达式"按钮查看结果...</div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="expression-config-footer">
        <button className="btn btn-secondary" onClick={() => setExpression('')}>取消</button>
        <button className="btn btn-primary" onClick={handleSaveToBackend}>确定</button>
      </div>
    </div>
  );
};

export default ExpressionConfigWithResult;
