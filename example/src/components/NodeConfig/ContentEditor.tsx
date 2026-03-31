import React, { useState } from 'react';
import VariableTag from './VariableTag';
import './ContentEditor.less';

interface VariableOption {
  value: string;
  label: string;
}

interface ContentEditorProps {
  title: string;
  variables: string[];
  variableOptions: VariableOption[];
  onInsert: (variable: string) => void;
  onRemove: (variable: string) => void;
  onSelect: (oldVariable: string, newVariable: string) => void;
  fixedText?: string;
}

const ContentEditor: React.FC<ContentEditorProps> = ({
  title,
  variables,
  variableOptions,
  onInsert,
  onRemove,
  onSelect,
  fixedText = '文字内容xx'
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="form-section content-editor">
      <div className="section-header">
        <div className="section-title">{title}</div>
        <div className="header-right">
          <button 
            className="insert-var-btn" 
            onClick={() => setShowDropdown(!showDropdown)}
          >
            + 插入变量
          </button>
          {showDropdown && (
            <div className="variable-dropdown">
              {variableOptions.map((option) => (
                <div 
                  key={option.value}
                  className="dropdown-item"
                  onClick={() => {
                    onInsert(option.value);
                    setShowDropdown(false);
                  }}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="content-input">
        <div className="content-tags">
          {variables.map((variable, index) => (
            <VariableTag 
              key={index} 
              variable={variable}
              variableOptions={variableOptions}
              onRemove={onRemove}
              onSelect={onSelect}
            />
          ))}
          <span className="text-content">{fixedText}</span>
        </div>
      </div>
    </div>
  );
};

export default ContentEditor;