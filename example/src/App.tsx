import { useState } from 'react'
import ExpressionConfig from './components/ExpressionConfig'
import ExpressionEditor from './components/ExpressionEditor'
import './App.less'

function App() {
  const [showConfig, setShowConfig] = useState(false)

  return (
    <div className="app">
      <header className="header">
        <h1>QLExpress-JS 表达式引擎</h1>
        <p>基于 React + Monaco Editor 的表达式编辑器（一个功能强大的JavaScript表达式引擎，支持多种运算、控制流、函数定义等。）</p>
        <button className="btn btn-primary" style={{ marginTop: '10px' }} onClick={() => setShowConfig(!showConfig)}>
          {showConfig ? '返回编辑器' : '表达式配置器'}
        </button>
      </header>

      <div className="container">
        {showConfig ? (<ExpressionConfig />) : (<ExpressionEditor />)}
      </div>
    </div>
  )
}

export default App