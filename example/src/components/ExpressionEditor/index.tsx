import React, { useState, useCallback, useEffect } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { ExpressRunner } from 'qlexpress-js';
import './index.less';

interface Example {
  tag: string;
  title: string;
  description: string;
  expression: string;
  context: Record<string, any>;
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
  },
  // ========== 多行表达式测试用例 ==========
  {
    tag: '多行运算',
    title: '多行加减法',
    description: '带换行的价格计算',
    expression: `商家应收=\n    价格\n   - 饭卡商家承担\n   + 平台补贴`,
    context: { '价格': 100, '饭卡商家承担': 10, '平台补贴': 5 }
  },
  {
    tag: '多行运算',
    title: '多行乘除法',
    description: '多行格式的四则运算',
    expression: `result =\n    a\n   * b\n   / c`,
    context: { a: 12, b: 3, c: 2 }
  },
  {
    tag: '多行运算',
    title: '复杂混合运算',
    description: '多行格式的混合四则运算',
    expression: `total =\n    价格\n   * 数量\n   - 折扣\n   + 税费`,
    context: { '价格': 100, '数量': 2, '折扣': 20, '税费': 10 }
  },
  {
    tag: '多行运算',
    title: '多行逻辑运算',
    description: '多行格式的逻辑表达式',
    expression: `result =\n    条件 1\n   && 条件 2\n   || 条件 3`,
    context: { '条件 1': true, '条件 2': false, '条件 3': true }
  },
  {
    tag: '多行运算',
    title: '多行比较运算',
    description: '多行格式的比较表达式',
    expression: `result =\n    数值 1\n   > 数值 2\n   && 数值 1\n   < 数值 3`,
    context: { '数值 1': 50, '数值 2': 30, '数值 3': 100 }
  },
  {
    tag: '多行运算',
    title: '括号嵌套运算',
    description: '带括号的多行复杂运算',
    expression: `final =\n    (a + b)\n   * (c - d)\n   / e`,
    context: { a: 10, b: 20, c: 30, d: 5, e: 5 }
  },
  {
    tag: '多行运算',
    title: '带空格缩进',
    description: '包含空格和缩进的多行表达式',
    expression: `  计算  =\n      值 1\n    + 值 2\n    - 值 3\n  `,
    context: { '值 1': 100, '值 2': 50, '值 3': 30 }
  },
  {
    tag: '多行运算',
    title: '中文变量名',
    description: '使用中文变量名的多行表达式',
    expression: `总收入=\n    销售额\n   + 服务费\n   - 成本`,
    context: { '销售额': 1000, '服务费': 200, '成本': 500 }
  }
];

const ExpressionEditor: React.FC = () => {
  const [expression, setExpression] = useState('a=\n    b\n    -  c\n    + a');
  const [context, setContext] = useState(JSON.stringify({ a: 1, b: 2, c: 3 }));
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [executionTime, setExecutionTime] = useState<number>(0);
  const [stats, setStats] = useState({ total: 0, success: 0, error: 0 });

  /**
   * 将字符串解析为 JavaScript 对象
   *
   * 首先尝试直接进行 JSON 解析，若失败则尝试将 JavaScript 对象字面量格式
   * （如 {name: 'value'}）转换为标准 JSON 格式后再解析。
   *
   * @param str - 要解析的字符串，支持 JSON 格式或 JavaScript 对象字面量格式
   * @returns 解析后的对象，若输入为空则返回空对象
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
        const runner = new ExpressRunner();
        executeResult = runner.execute(expression, contextObj);
      } catch (e: any) {
        throw new Error(e.message);
      }

      const endTime = performance.now();
      const duration = (endTime - startTime).toFixed(2);

      setResult(formatResult(executeResult));
      setExecutionTime(parseFloat(duration));
      setStats(prev => ({ ...prev, total: prev.total + 1, success: prev.success + 1 }));
    } catch (e: any) {
      const endTime = performance.now();
      const duration = (endTime - startTime).toFixed(2);
      setError(e.message || '执行错误');
      setExecutionTime(parseFloat(duration));
      setStats(prev => ({ ...prev, total: prev.total + 1, error: prev.error + 1 }));
    }
  }, [expression, context]);

  const formatResult = (result: any): string => {
    console.log('原始结果:', result);
    if (result === null) return 'null';
    if (result === undefined) return 'undefined';
    if (typeof result === 'string') return result;
    if (typeof result === 'number' || typeof result === 'boolean') return String(result);
    if (Array.isArray(result)) return JSON.stringify(result, null, 2);
    if (typeof result === 'object') return JSON.stringify(result.value, null, 2);
    return String(result);
  };

  const handleClear = () => {
    setResult('');
    setError('');
    setExecutionTime(0);
  };

  const useExample = useCallback((example: Example) => {
    setExpression(example.expression);
    setContext(JSON.stringify(example.context, null, 2));
  }, []);

  useEffect(() => {
    handleExecute();
  }, [handleExecute]);

  return (
    <div className="expression-editor-container">
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
        {/* 第一行：表达式输入和变量输入 */}
        <div className="grid-row">
          {/* 表达式输入 */}
          <div className="card card-left">
            <div className="card-header">表达式输入</div>
            <div className="card-body">
              <MonacoEditor
                width="100%"
                height="300px"
                language="javascript"
                // theme="vs-dark"
                value={expression}
                onChange={(value) => setExpression(value || '')}
                options={{
                  minimap: { enabled: true },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 1,
                  wordWrap: 'off'
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

          {/* 变量输入 */}
          <div className="card card-right">
            <div className="card-header">变量输入</div>
            <div className="card-body">
              <MonacoEditor
                width="100%"
                height="300px"
                language="json"
                // theme="vs-dark"
                value={context}
                onChange={(value: string) => setContext(value || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 1,
                  wordWrap: 'off'
                }}
              />
            </div>
          </div>
        </div>

        {/* 第二行：执行结果和统计卡片 */}
        <div className="grid-row">
          {/* 执行结果 */}
          <div className="card card-left">
            <div className="card-header">执行结果</div>
            <div className="card-body">
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

          {/* 统计卡片 */}
          <div className="stats-column">
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
        </div>
      </main>
    </div>
  );
};

export default ExpressionEditor;