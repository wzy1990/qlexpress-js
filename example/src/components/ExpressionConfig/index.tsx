/*
 * @Author: 王志永
 * @Date: 2026-03-22 11:39:38
 * @LastEditors: 王志永
 * @LastEditTime: 2026-03-26 15:29:54
 * @Description: 表达式配置组件，用于演示如何在React项目中实现一个表达式配置组件。该组件允许用户通过选择变量和函数来构建自定义的数学或逻辑表达式，并通过Monaco编辑器进行实时预览和编辑。
 */
import React, { useState, useRef, useEffect } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { FunctionItem, VariableItem, variables, categories, functions } from './data';
import './index.less';

const ExpressionConfig: React.FC = () => {
  const [expression, setExpression] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [selectedFunction, setSelectedFunction] = useState<FunctionItem | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const editorRef = useRef<any>(null);

  // 筛选函数列表
  const filteredFunctions = functions.filter(func => {
    const matchesCategory = selectedCategory === '全部' || func.category === selectedCategory;
    const matchesSearch = func.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      func.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    // setExpression('商家应收=\n    价格\n   - 饭卡商家承担\n   + 平台补贴');
    setExpression('商家应收=\r\n    价格\r\n    - 饭卡商家承担\r\n    + 平台补贴')
    
    // 可选：在编辑器加载完成后，将光标移动到第一行
    if (editorRef.current) {
      editorRef.current.setPosition({ lineNumber: 1, column: 1 });
    }
  }, []);

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
      console.log('表达式字符串:', JSON.stringify({
        expression: backendExpression, // 直接发送，保留原始格式
      }));
      console.log('表达式长度:', backendExpression.length);
      console.log('包含的换行符数量:', (backendExpression.match(/\n/g) || []).length);

    } catch (error) {
      console.error('保存失败:', error);
    }
  };

  return (
    <div className="expression-config-container">
      <div className="expression-config-header">
        <h2>表达式配置</h2>
      </div>
      
      <div className="expression-input-section">
        <div className="expression-input-label">请在下方编辑区内输入</div>
        <div className="expression-input-wrapper">
          <MonacoEditor
            height="250px"
            language="javascript"
            // theme="vs-dark"
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
              wordWrap: 'off', // 关闭自动换行，保留原始格式
              wrappingStrategy: 'advanced',
              folding: false, // 关闭折叠功能
              formatOnPaste: false, // 禁用粘贴时格式化，保留原始空格和换行
              formatOnType: false, // 禁用输入时格式化，保留原始格式
              autoIndent: 'none', // 禁用自动缩进
              suggestOnTriggerCharacters: true, // 禁用触发字符自动提示
              quickSuggestions: true, // 禁用快速建议
            }}
          />
        </div>
      </div>
      
      <div className="expression-tools-section">
        {/* 变量列表 */}
        <div className="variable-list">
          <div className="section-title">变量 双击插入变量</div>
          <div className="variable-items">
            {variables.map((variable) => (
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
              {categories.map((category) => (
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
              {filteredFunctions.map((func) => (
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
      
      <div className="expression-config-footer">
        <button className="btn btn-secondary" onClick={() => setExpression('')}>取消</button>
        <button className="btn btn-primary" onClick={handleSaveToBackend}>确定</button>
      </div>
    </div>
  );
};

export default ExpressionConfig;