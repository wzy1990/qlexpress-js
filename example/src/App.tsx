/*
 * @Author: 王志永
 * @Date: 2026-03-23 09:29:59
 * @LastEditors: 王志永
 * @LastEditTime: 2026-03-23 15:57:37
 * @Description: 表达式编辑器组件，用于演示如何在React项目中实现一个表达式编辑器组件。该组件允许用户通过Monaco编辑器进行实时预览和编辑。
 */
import { useState } from 'react'
import ExpressionConfig from './components/ExpressionConfig'
import ExpressionEditor from './components/ExpressionEditor'
import './App.less'

function App() {
  const [showConfig, setShowConfig] = useState(true)

  return (
    <div className="app">
      <header className="header">
        <h1>QLExpress-JS 表达式引擎</h1>
        <p>基于 React + Monaco Editor 的表达式编辑器（一个功能强大的JavaScript表达式引擎，支持多种运算、控制流、函数定义等。）</p>
        <button className={showConfig ? 'btn btn-primary' : 'btn btn-default'} style={{ marginTop: '10px', marginRight: '10px' }} onClick={() => setShowConfig(!showConfig)}>
          表达式配置器
        </button>
        <button className={!showConfig ? 'btn btn-primary' : 'btn btn-default'} style={{ marginTop: '10px' }} onClick={() => setShowConfig(!showConfig)}>
          表达式编辑器
        </button>
      </header>

      <div className="container">
        {showConfig ? (<ExpressionConfig />) : (<ExpressionEditor />)}
      </div>
    </div>
  )
}

export default App