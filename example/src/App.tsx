/*
 * @Author: 王志永
 * @Date: 2026-03-23 09:29:59
 * @LastEditors: 王志永
 * @LastEditTime: 2026-03-26 16:04:28
 * @Description: 表达式编辑器组件，用于演示如何在 React 项目中实现一个表达式编辑器组件。该组件允许用户通过 Monaco 编辑器进行实时预览和编辑。
 */
import { useState } from 'react'
import ExpressionConfig from './components/ExpressionConfig'
import ExpressionEditor from './components/ExpressionEditor'
import ExpressionConfigWithResult from './components/ExpressionConfigWithResult'
import './App.less'

function App() {
  const [activeComponent, setActiveComponent] = useState<'config' | 'editor' | 'configWithResult'>('configWithResult')

  return (
    <div className="app">
      <header className="header">
        <h1>QLExpress-JS 表达式引擎</h1>
        <p>基于 React + Monaco Editor 的表达式编辑器（一个功能强大的 JavaScript 表达式引擎，支持多种运算、控制流、函数定义等。）</p>      
        <button 
          className={activeComponent === 'configWithResult' ? 'btn btn-primary' : 'btn btn-default'} 
          style={{ marginTop: '10px', marginRight: '10px' }} 
          onClick={() => setActiveComponent('configWithResult')}
        >
          表达式配置器（带结果）
        </button>
        <button 
          className={activeComponent === 'config' ? 'btn btn-primary' : 'btn btn-default'} 
          style={{ marginTop: '10px', marginRight: '10px' }} 
          onClick={() => setActiveComponent('config')}
        >
          表达式配置器
        </button>
        <button 
          className={activeComponent === 'editor' ? 'btn btn-primary' : 'btn btn-default'} 
          style={{ marginTop: '10px' }} 
          onClick={() => setActiveComponent('editor')}
        >
          表达式编辑器
        </button>
      </header>

      <div className="container">
        {activeComponent === 'config' && <ExpressionConfig />}
        {activeComponent === 'configWithResult' && <ExpressionConfigWithResult />}
        {activeComponent === 'editor' && <ExpressionEditor />}
      </div>
    </div>
  )
}

export default App
