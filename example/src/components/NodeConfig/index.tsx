import React, { useState } from 'react';
import ContentEditor from './ContentEditor';
import './index.less';

interface Condition {
  variable: string;
  operator: string;
  target: string;
  targetType: 'constant' | 'variable';
}

const NodeConfig: React.FC = () => {
  // 类型选择：'judge' 或 'confirm'
  const [type, setType] = useState<'judge' | 'confirm'>('judge');
  
  // 条件设置：'all' 或 'any'
  const [conditionType, setConditionType] = useState<'all' | 'any'>('all');
  
  // 条件列表
  const [conditions, setConditions] = useState<Condition[]>([
    {
      variable: '',
      operator: 'equal',
      target: 'xxx',
      targetType: 'constant'
    }
  ]);
  
  // 确认框配置
  const [confirmConfig, setConfirmConfig] = useState({
    title: '',
    titleVars: ['1235', '1235678', '123'] as string[],
    icon: 'info',
    content: '',
    contentVars: ['1235', '1235678', '123'] as string[],
    confirmText: '确认',
    cancelText: '取消'
  });
  
  // 比较操作符选项
  const operators = [
    { value: 'equal', label: '等于' },
    { value: 'not_equal', label: '不等于' },
    { value: 'greater', label: '大于' },
    { value: 'less', label: '小于' },
    { value: 'greater_equal', label: '大于等于' },
    { value: 'less_equal', label: '小于等于' }
  ];

  // 变量选项
  const variableOptions = [
    { value: '123', label: '变量选择1' },
    { value: '456', label: '变量选择2' },
    { value: '789', label: '变量选择3' },
    { value: '1000', label: '变量选择4' },
    { value: '2000', label: '变量选择5' }
  ];
  
  // 添加条件
  const addCondition = () => {
    setConditions([...conditions, {
      variable: '',
      operator: 'equal',
      target: 'xxx',
      targetType: 'constant'
    }]);
  };
  
  // 删除条件
  const removeCondition = (index: number) => {
    const newConditions = [...conditions];
    newConditions.splice(index, 1);
    setConditions(newConditions);
  };
  
  // 更新条件
  const updateCondition = (index: number, key: keyof Condition, value: string | 'constant' | 'variable') => {
    const newConditions = [...conditions];
    newConditions[index] = { ...newConditions[index], [key]: value };
    setConditions(newConditions);
  };
  
  // 插入变量到确认框内容
  const insertVariable = (field: 'title' | 'content', variable: string) => {
    setConfirmConfig(prev => ({
      ...prev,
      [`${field}Vars`]: [...prev[`${field}Vars` as keyof typeof prev], variable]
    }));
  };
  
  // 删除变量
  const removeVariable = (field: 'title' | 'content', variable: string) => {
    setConfirmConfig(prev => ({
      ...prev,
      [`${field}Vars`]: prev[`${field}Vars` as keyof typeof prev].filter(v => v !== variable)
    }));
  };
  
  // 选择变量
  const selectVariable = (field: 'title' | 'content', oldVariable: string, newVariable: string) => {
    setConfirmConfig(prev => ({
      ...prev,
      [`${field}Vars`]: prev[`${field}Vars` as keyof typeof prev].map(v => 
        v === oldVariable ? newVariable : v
      )
    }));
  };

  return (
    <div className="node-config-container">
      <div className="node-config-header">
        <div className="header-left">
          <div className="icon">📋</div>
          <h2>条件分支</h2>
        </div>
        <div className="header-right">
          <button className="close-btn">×</button>
        </div>
      </div>
      
      <div className="node-config-content">
        {/* 类型选择 */}
        <div className="form-section">
          <div className="section-title">类型</div>
          <div className="radio-group">
            <label className="radio-item">
              <input 
                type="radio" 
                name="type" 
                value="judge" 
                checked={type === 'judge'}
                onChange={() => setType('judge')}
              />
              <span>判断分支</span>
            </label>
            <label className="radio-item">
              <input 
                type="radio" 
                name="type" 
                value="confirm" 
                checked={type === 'confirm'}
                onChange={() => setType('confirm')}
              />
              <span>确认框</span>
            </label>
          </div>
        </div>
        
        {/* 判断分支配置 */}
        {type === 'judge' && (
          <>
            {/* 条件设置 */}
            <div className="form-section">
              <div className="section-title">条件设置</div>
              <div className="radio-group">
                <label className="radio-item">
                  <input 
                    type="radio" 
                    name="conditionType" 
                    value="all" 
                    checked={conditionType === 'all'}
                    onChange={() => setConditionType('all')}
                  />
                  <span>全部满足</span>
                </label>
                <label className="radio-item">
                  <input 
                    type="radio" 
                    name="conditionType" 
                    value="any" 
                    checked={conditionType === 'any'}
                    onChange={() => setConditionType('any')}
                  />
                  <span>部分满足</span>
                </label>
              </div>
            </div>
            
            {/* 变量设置 */}
            {conditions.map((condition, index) => (
              <div key={index} className="form-section condition-section">
                <div className="section-header">
                  <div className="section-title">变量设置</div>
                  <button 
                    className="remove-btn" 
                    onClick={() => removeCondition(index)}
                  >
                    🗑️
                  </button>
                </div>
                
                <div className="form-group">
                  <label>变量选择</label>
                  <input 
                    type="text" 
                    placeholder="请输入" 
                    value={condition.variable}
                    onChange={(e) => updateCondition(index, 'variable', e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <label>比较方式</label>
                  <select 
                    value={condition.operator}
                    onChange={(e) => updateCondition(index, 'operator', e.target.value)}
                  >
                    {operators.map(op => (
                      <option key={op.value} value={op.value}>{op.label}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>比较目标</label>
                  <div className="target-input">
                    <select 
                      value={condition.target}
                      onChange={(e) => updateCondition(index, 'target', e.target.value)}
                    >
                      <option value="xxx">xxx</option>
                      <option value="yyy">yyy</option>
                      <option value="zzz">zzz</option>
                    </select>
                    <div className="target-type">
                      <button className="type-btn">
                        ⇄
                        <div className="dropdown">
                          <div 
                            className="dropdown-item" 
                            onClick={() => updateCondition(index, 'targetType', 'constant')}
                          >
                            常量
                          </div>
                          <div 
                            className="dropdown-item" 
                            onClick={() => updateCondition(index, 'targetType', 'variable')}
                          >
                            变量输入
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* 添加条件 */}
            <div className="add-condition">
              <button className="add-btn" onClick={addCondition}>
                + 添加
              </button>
            </div>
          </>
        )}
        
        {/* 确认框配置 */}
        {type === 'confirm' && (
          <>
            {/* 标题内容 */}
            <ContentEditor 
              title="标题内容"
              variables={confirmConfig.titleVars}
              variableOptions={variableOptions}
              onInsert={(variable) => insertVariable('title', variable)}
              onRemove={(variable) => removeVariable('title', variable)}
              onSelect={(oldVar, newVar) => selectVariable('title', oldVar, newVar)}
              fixedText="文字内容xx"
            />
            
            {/* 标题图标 */}
            <div className="form-section">
              <div className="section-title">标题图标</div>
              <div className="icon-selector">
                <div className="icon-option active">
                  <div className="icon-preview">📋</div>
                </div>
              </div>
            </div>
            
            {/* 内容 */}
            <ContentEditor 
              title="内容"
              variables={confirmConfig.contentVars}
              variableOptions={variableOptions}
              onInsert={(variable) => insertVariable('content', variable)}
              onRemove={(variable) => removeVariable('content', variable)}
              onSelect={(oldVar, newVar) => selectVariable('content', oldVar, newVar)}
              fixedText="文字内容xx"
            />
            
            {/* 确认按钮 */}
            <div className="form-section">
              <div className="section-title">确认按钮</div>
              <input 
                type="text" 
                value={confirmConfig.confirmText}
                onChange={(e) => setConfirmConfig({...confirmConfig, confirmText: e.target.value})}
              />
            </div>
            
            {/* 取消按钮 */}
            <div className="form-section">
              <div className="section-title">取消按钮</div>
              <input 
                type="text" 
                value={confirmConfig.cancelText}
                onChange={(e) => setConfirmConfig({...confirmConfig, cancelText: e.target.value})}
              />
            </div>
          </>
        )}
      </div>
      
      {/* 底部按钮 */}
      <div className="node-config-footer">
        <button className="btn btn-secondary">取消</button>
        <button className="btn btn-primary">确定</button>
      </div>
    </div>
  );
};

export default NodeConfig;