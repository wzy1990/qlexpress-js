/*
 * @Author: 王志永
 * @Date: 2026-03-31 10:40:05
 * @LastEditors: 王志永
 * @LastEditTime: 2026-03-31 11:01:44
 * @Description: 
 */
import React, { useState, useRef, useEffect } from 'react';
import './VariableTag.less';

interface VariableOption {
  value: string;
  label: string;
}

interface VariableTagProps {
  variable: string;
  variableOptions?: VariableOption[];
  onRemove: (variable: string) => void;
  onSelect: (oldVariable: string, newVariable: string) => void;
}

const VariableTag: React.FC<VariableTagProps> = ({ 
  variable, 
  variableOptions = [],
  onRemove, 
  onSelect 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // 默认变量选项
  const defaultVariables = [
    { value: '123', label: '变量选择1' },
    { value: '456', label: '变量选择2' },
    { value: '789', label: '变量选择3' },
    { value: '1000', label: '变量选择4' },
    { value: '2000', label: '变量选择5' }
  ];
  
  // 使用外部传入的变量选项或默认选项
  const variables = variableOptions.length > 0 ? variableOptions : defaultVariables;
  
  // 点击外部关闭下拉框
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(variable);
  };
  
  const handleSelect = (newVariable: string) => {
    onSelect(variable, newVariable);
    setIsOpen(false);
  };
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div 
      className="variable-tag"
      ref={dropdownRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="tag-content"
        onClick={toggleDropdown}
      >
        <span className="tag-bracket">{'{/}'}</span>
        <span className="tag-value">{variable}</span>
        {isHovered && (
          <button 
            className="remove-btn"
            onClick={handleRemove}
          >
            ×
          </button>
        )}
      </div>
      
      {isOpen && (
        <div className="dropdown">
          {variables.map((varOption) => (
            <div 
              key={varOption.value}
              className={`dropdown-item ${variable === varOption.value ? 'active' : ''}`}
              onClick={() => handleSelect(varOption.value)}
            >
              {varOption.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VariableTag;