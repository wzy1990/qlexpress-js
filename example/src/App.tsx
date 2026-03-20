import React, { useState, useRef } from 'react'
import MonacoEditor from 'react-monaco-editor'
import { ExpressRunner } from 'qlexpress-js'
import './App.css'

interface Example {
  tag: string
  title: string
  description: string
  expression: string
  context: Record<string, any>
}

const examples: Example[] = [
  {
    tag: '基础运算',
    title: '算术运算',
    description: '计算 a + b * c 的值',
    expression: 'a + b * c',
    context: { a: 1, b: 2, c: 3 }
  },
  {
    tag: '条件判断',
    title: '成绩等级判断',
    description: '根据分数判断等级',
    expression: `if (score >= 90) { return "优秀" } else { return "良好" }`,
    context: { score: 85 }
  },
  {
    tag: '循环',
    title: '计算1到100的和',
    description: '使用for循环求和',
    expression: `sum = 0; for (i = 1; i <= 100; i++) { sum = sum + i; } return sum;`,
    context: {}
  },
  {
    tag: '函数',
    title: '斐波那契数列',
    description: '递归计算斐波那契数',
    expression: `function fib(n) { if (n <= 1) { return n; } return fib(n - 1) + fib(n - 2); } return fib(10);`,
    context: {}
  },
  {
    tag: '数组',
    title: '数组操作',
    description: '数组过滤和映射',
    expression: `arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; return arr.filter(x => x > 5).map(x => x * 2);`,
    context: {}
  },
  {
    tag: 'SQL风格',
    title: 'IN/LIKE/BETWEEN',
    description: 'SQL风格的条件查询',
    expression: `name like "张%" && age between 18 and 60 && city in ["北京", "上海", "深圳"]`,
    context: { name: "张三", age: 25, city: "北京" }
  },
  {
    tag: '对象',
    title: '对象操作',
    description: '创建和访问对象',
    expression: `user = { name: "John", age: 30, score: 95 }; return user.name + " is " + user.age + " years old with score " + user.score;`,
    context: {}
  },
  {
    tag: '中文',
    title: '中文变量名',
    description: '支持中文变量',
    expression: `平均分 = (语文 + 数学 + 英语) / 3; return 平均分 > 90 ? "优秀" : "良好"`,
    context: { 语文: 92, 数学: 88, 英语: 95 }
  },
  {
    tag: '内置函数',
    title: '数学函数',
    description: '使用内置数学函数',
    expression: `max(1, 2, 3, 4, 5) + min(-5, -3, 0, 3) + round(3.7) + floor(3.7)`,
    context: {}
  },
  {
    tag: '字符串',
    title: '字符串处理',
    description: '字符串操作函数',
    expression: `s = "Hello World"; return s.toUpperCase() + " | " + s.toLowerCase() + " | " + s.substr(0, 5)`,
    context: {}
  },
  {
    tag: '三元运算',
    title: '三元运算符',
    description: '简化的条件表达式',
    expression: `a = 10; b = 20; return a > b ? "a大" : "b大"`,
    context: {}
  },
  {
    tag: '逻辑运算',
    title: '逻辑与或非',
    description: '逻辑运算符示例',
    expression: `a = true; b = false; return a && b || !a`,
    context: {}
  }
]

function App() {
  const [expression, setExpression] = useState('a + b * c')
  const [context, setContext] = useState('{\n  "a": 1,\n  "b": 2,\n  "c": 3\n}')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [executionTime, setExecutionTime] = useState<number>(0)
  const [stats, setStats] = useState({ total: 0, success: 0, error: 0 })

  const handleExecute = () => {
    const startTime = performance.now()
    setError('')
    setResult('')

    try {
      // 解析上下文
      let contextObj: Record<string, any> = {}
      if (context.trim()) {
        contextObj = JSON.parse(context)
      }

      // 这里需要引入 QLExpress 库
      // 由于是示例，我们模拟执行
      // 实际使用时需要: import { ExpressRunner } from 'qlexpress-js'
      // const runner = new ExpressRunner()
      // const result = runner.execute(expression, contextObj)

      // 执行
      let mockResult: any
      try {
        const runner = new ExpressRunner()
        mockResult = runner.execute(expression, contextObj)
      } catch (e: any) {
        throw new Error(e.message)
      }

      const endTime = performance.now()
      const duration = (endTime - startTime).toFixed(2)

      setResult(formatResult(mockResult))
      setExecutionTime(parseFloat(duration))
      setStats(prev => ({ ...prev, total: prev.total + 1, success: prev.success + 1 }))
    } catch (e: any) {
      const endTime = performance.now()
      const duration = (endTime - startTime).toFixed(2)
      setError(e.message || '执行错误')
      setExecutionTime(parseFloat(duration))
      setStats(prev => ({ ...prev, total: prev.total + 1, error: prev.error + 1 }))
    }
  }

  const formatResult = (result: any): string => {
    console.log('原始结果:', result)
    if (result === null) return 'null'
    if (result === undefined) return 'undefined'
    if (typeof result === 'string') return result
    if (typeof result === 'number' || typeof result === 'boolean') return String(result)
    if (Array.isArray(result)) return JSON.stringify(result, null, 2)
    if (typeof result === 'object') return JSON.stringify(result.value, null, 2)
    return String(result)
  }

  const handleClear = () => {
    setResult('')
    setError('')
    setExecutionTime(0)
  }

  const useExample = (example: Example) => {
    setExpression(example.expression)
    setContext(JSON.stringify(example.context, null, 2))
    handleExecute()
  }

  return (
    <div className="app">
      <header className="header">
        <h1>QLExpress-JS 表达式引擎</h1>
        <p>基于 React + Monaco Editor 的表达式编辑器</p>
      </header>

      <div className="container">
        {/* 侧边栏：快速实例 */}
        <aside className="sidebar">
          <div className="sidebar-header">快速实例（点击使用）</div>
          <div className="examples-grid">
            {examples.map((example, index) => (
              <div
                key={index}
                className="example-card"
                onClick={() => useExample(example)}
              >
                <span className="example-tag">{example.tag}</span>
                <h4>{example.title}</h4>
                <p>{example.description}</p>
              </div>
            ))}
          </div>
        </aside>

        {/* 主内容区域 */}
        <main className="main-content">
          {/* 表达式输入 */}
          <div className="card">
            <div className="card-header">表达式输入</div>
            <div className="card-body">
              <MonacoEditor
                width="100%"
                height="300px"
                language="javascript"
                theme="vs-dark"
                value={expression}
                onChange={(value) => setExpression(value || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                  wordWrap: 'on'
                }}
              />
              <div className="btn-group">
                <button className="btn btn-primary" onClick={handleExecute}>
                  执行表达式
                </button>
                <button className="btn btn-secondary" onClick={handleClear}>
                  清除结果
                </button>
              </div>
            </div>
          </div>

          {/* 变量和输出区域 */}
          <div className="card">
            <div className="card-header">变量输入 & 执行结果</div>
            <div className="card-body">
              <div className="form-group">
                <label>变量上下文（JSON格式）：</label>
                <MonacoEditor
                  width="100%"
                  height="200px"
                  language="json"
                  theme="vs-dark"
                  value={context}
                  onChange={(value: string) => setContext(value || '')}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    wordWrap: 'on'
                  }}
                />
              </div>
              <div className="form-group">
                <label>执行结果：</label>
                <div className={`result-area ${error ? 'error' : result ? 'success' : 'empty'}`}>
                  {error || result || '点击"执行表达式"按钮查看结果...'}
                </div>
                {executionTime > 0 && (
                  <div className="execution-time">
                    执行时间: <span className="highlight">{executionTime}ms</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 统计卡片 */}
          <div className="stats-container">
            <div className="stat-card total">
              <div className="stat-value">{stats.total}</div>
              <div className="stat-label">总执行次数</div>
            </div>
            <div className="stat-card success">
              <div className="stat-value">{stats.success}</div>
              <div className="stat-label">成功次数</div>
            </div>
            <div className="stat-card error">
              <div className="stat-value">{stats.error}</div>
              <div className="stat-label">失败次数</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
