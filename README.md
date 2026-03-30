# QLExpress-JS

一个功能强大的 JavaScript 表达式引擎，灵感来自阿里巴巴 QLExpress 脚本引擎。适用于前端开发的流程编排、规则引擎等场景。

## 特性

- **轻量级**：纯 JavaScript 实现，无外部依赖
- **高性能**：支持指令编译缓存，执行效率高
- **弱类型脚本语言**：语法类似 JavaScript，学习成本低
- **安全控制**：支持沙箱模式、超时控制、循环次数限制
- **可扩展**：支持自定义函数、操作符、宏定义

## 安装

```bash
npm install qlexpress-js
```

## 快速开始

### 基础使用

``` typeScript
import { ExpressRunner, execute } from 'qlexpress-js';

// 方式一：使用快速执行函数
const result = execute('a + b * c', { a: 1, b: 2, c: 3 });
console.log(result); // 输出: 7

// 方式二：使用 ExpressRunner 实例
const runner = new ExpressRunner();
const result2 = runner.execute('1 + 2 * 3').value;
console.log(result2); // 输出: 7
```

### 变量和上下文

``` typeScript
const runner = new ExpressRunner();

// 传入上下文变量
const result = runner.execute('name + " is " + age + " years old"', {
  name: 'John',
  age: 30
});
console.log(result.value); // 输出: "John is 30 years old"

// 获取执行后的变量
const result2 = runner.execute('x = 10; y = 20; return x + y');
console.log(result2.value); // 输出: 30
console.log(result2.variables); // 输出: { x: 10, y: 30 }
```

## 支持的语法

### 数据类型

``` typeScript
// 数字
42
3.14
-10
0xFF    // 十六进制
0b1010  // 二进制
0o755   // 八进制

// 字符串
"hello"
'world'
`template`

// 布尔
true
false

// 空值
null
undefined

// 数组
[1, 2, 3, 4, 5]

// 对象
{ name: "John", age: 30 }
```

### 运算符

``` typeScript
// 算术运算符
+ - * / % mod

// 比较运算符
== != <> < > <= >= === !==

// 逻辑运算符
&& || ! and or not

// 赋值运算符
= += -= *= /= %=

// 自增/自减
++ --

// 三元运算符
condition ? value1 : value2

// SQL 风格运算符
value in [1, 2, 3]
name like "张%"
score between 60 and 100
```

### 控制流

``` typeScript
// if 语句
if (score >= 90) then {
  return "优秀"
} else {
  return "良好"
}

// for 循环
sum = 0;
for (i = 0; i < 10; i++) {
  sum = sum + i;
}
return sum;

// while 循环
i = 0;
while (i < 5) {
  i++;
}

// break 和 continue
for (i = 0; i < 10; i++) {
  if (i == 5) break;
  if (i % 2 == 0) continue;
}
```

### 函数定义

``` typeScript
function add(a, b) {
  return a + b;
}

function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

return factorial(5); // 输出: 120
```

## 内置函数

### 数学函数

``` typeScript
abs(x)       // 绝对值
ceil(x)      // 向上取整
floor(x)     // 向下取整
round(x)     // 四舍五入
sqrt(x)      // 平方根
pow(x, y)    // 幂运算
sin(x)       // 正弦
cos(x)       // 余弦
tan(x)       // 正切
log(x)       // 自然对数
log10(x)     // 常用对数
```

### 聚合函数

``` typeScript
min(a, b, ...)   // 最小值
max(a, b, ...)   // 最大值
sum(a, b, ...)   // 求和
avg(a, b, ...)   // 平均值
```

### 字符串函数

``` typeScript
strlen(s)           // 字符串长度
substr(s, start, len)  // 截取子串
toUpperCase(s)      // 转大写
toLowerCase(s)      // 转小写
trim(s)             // 去除首尾空白
replace(s, old, new) // 替换
split(s, sep)       // 分割
indexOf(s, search)  // 查找位置
startsWith(s, prefix) // 是否以...开头
endsWith(s, suffix)   // 是否以...结尾
```

### 数组函数

``` typeScript
size(arr)           // 数组大小
first(arr)          // 第一个元素
last(arr)           // 最后一个元素
range(start, end)   // 生成范围数组
unique(arr)         // 去重
reverseArray(arr)   // 反转数组
```

### 类型检查函数

``` typeScript
isArray(x)      // 是否为数组
isObject(x)     // 是否为对象
isString(x)     // 是否为字符串
isNumber(x)     // 是否为数字
isBoolean(x)    // 是否为布尔值
isNull(x)       // 是否为null
isEmpty(x)      // 是否为空
```

### 日期函数

``` typeScript
now()                    // 当前时间戳
date(timestamp)          // 创建日期
format(date, pattern)    // 格式化日期
year(date)               // 获取年份
month(date)              // 获取月份
day(date)                // 获取日期
addDays(date, days)      // 添加天数
daysBetween(d1, d2)      // 计算天数差
```

### 条件函数

``` typeScript
if(condition, trueVal, falseVal)  // 条件选择
switch(value, case1, val1, ...)   // switch选择
coalesce(v1, v2, ...)             // 返回第一个非空值
defaultIfEmpty(val, default)       // 默认值
```

### 集合创建

``` typeScript
NewList(1, 2, 3)           // 创建List
NewMap([key1, val1], ...)  // 创建Map
NewSet(1, 2, 3)            // 创建Set
```

## 自定义扩展

### 添加自定义函数

``` typeScript
const runner = new ExpressRunner();

// 添加简单函数
runner.addFunction('double', (x) => x * 2);
runner.execute('double(5)'); // 返回: 10

// 添加复杂函数
runner.addFunction('formatPrice', (price, currency = '¥') => {
  return currency + price.toFixed(2);
});
runner.execute('formatPrice(99.9)'); // 返回: "¥99.90"
```

### 添加自定义操作符

``` typeScript
const runner = new ExpressRunner();

// 添加自定义操作符
runner.addOperator('=>>', (args) => {
  return args[0] * 10 + args[1];
});
runner.execute('3 =>> 4'); // 返回: 34

// 替换现有操作符
runner.replaceOperator('+', (args) => {
  return Number(args[0]) + Number(args[1]) + 100;
});
runner.execute('1 + 2'); // 返回: 103
```

### 添加操作符别名

``` typeScript
const runner = new ExpressRunner();

// 中文别名
runner.addOperatorWithAlias('加', '+', null);
runner.addOperatorWithAlias('减', '-', null);
runner.addOperatorWithAlias('乘', '*', null);
runner.addOperatorWithAlias('除', '/', null);

runner.execute('10 加 5 乘 2'); // 返回: 20
```

### 宏定义

``` typeScript
const runner = new ExpressRunner();

// 定义宏
runner.addMacro('计算平均成绩', '(语文 + 数学 + 英语) / 3');
runner.addMacro('是否优秀', '计算平均成绩 > 90');

// 使用宏
const result = runner.execute('是否优秀', {
  语文: 95,
  数学: 92,
  英语: 88
});
console.log(result.value); // 输出: true
```

### 预加载表达式 (loadMultiExpress)

**功能说明**：预加载函数定义、类定义等元数据到引擎中，支持命名管理和重复调用。类似 Java QLExpress 的 `loadMultiExpress` 功能。

#### 基础用法

``` typeScript
const runner = new ExpressRunner();

// 1. 无名预加载 - 函数定义
runner.loadMultiExpress('', `
  function add(a, b) {
    return a + b;
  }
  
  function multiply(a, b) {
    return a * b;
  }
`);

// 2. 多次调用已定义的函数
runner.execute('add(10, 20)');      // 返回：30
runner.execute('multiply(5, 6)');   // 返回：30
runner.execute('add(100, 200)');    // 返回：300
```

#### 命名预加载与管理

``` typeScript
const runner = new ExpressRunner();

// 1. 命名预加载 - 便于后续调用和管理
runner.loadMultiExpress('MathFunctions', `
  function square(x) {
    return x * x;
  }
  
  function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
  }
  
  function fibonacci(n) {
    if (n <= 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
`);

// 2. 通过名称执行预加载的表达式
runner.executeByExpressName('MathFunctions', {});

// 3. 在后续表达式中使用预加载的函数
runner.execute('square(5)');           // 返回：25
runner.execute('factorial(5)');        // 返回：120
runner.execute('fibonacci(10)');       // 返回：89
```

#### 带上下文的函数调用

``` typeScript
const runner = new ExpressRunner();

// 1. 预加载业务函数
runner.loadMultiExpress('BusinessFunctions', `
  function calculatePrice(price, discount, tax) {
    const discountedPrice = price * (1 - discount);
    const finalPrice = discountedPrice * (1 + tax);
    return finalPrice.toFixed(2);
  }
`);

// 2. 传入上下文变量执行
const result = runner.execute('calculatePrice(价格，饭卡商家承担，平台补贴)', {
  价格：100,
  饭卡商家承担：0.2,
  平台补贴：0.05
});
console.log(result.value); // 返回："84.00"
```

#### 闭包与状态保持

``` typeScript
const runner = new ExpressRunner();

// 1. 预加载带状态的计数器函数
runner.loadMultiExpress('CounterFunctions', `
  var counter = 0;
  
  function increment(amount) {
    counter += amount;
    return counter;
  }
  
  function getCounter() {
    return counter;
  }
  
  function resetCounter() {
    counter = 0;
    return "计数器已重置";
  }
`);

// 2. 多次调用保持状态
runner.execute('increment(5)');    // 返回：5
runner.execute('increment(10)');   // 返回：15
runner.execute('getCounter()');    // 返回：15
runner.execute('resetCounter()');  // 返回："计数器已重置"
runner.execute('getCounter()');    // 返回：0
```

#### 表达式管理 API

``` typeScript
const runner = new ExpressRunner();

// 1. 预加载多个命名表达式
runner.loadMultiExpress('Test1', 'var a = 1;');
runner.loadMultiExpress('Test2', 'var b = 2;');

// 2. 检查是否存在
if (runner.hasNamedExpression('Test1')) {
  console.log('Test1 已预加载');
}

// 3. 获取所有命名表达式
const expressions = runner.getNamedExpressions();
console.log(`已预加载 ${expressions.size} 个表达式`);

// 4. 删除指定的命名表达式
runner.removeNamedExpression('Test1');

// 5. 清除所有命名表达式
runner.clearNamedExpressions();

// 6. 获取数量
const count = runner.getNamedExpressionCount();
```

#### 复杂对象返回

``` typeScript
const runner = new ExpressRunner();

// 预加载返回复杂对象的函数
runner.loadMultiExpress('ResultFunctions', `
  function createResult(success, message, data) {
    return {
      success: success,
      message: message,
      data: data,
      timestamp: new Date().getTime()
    };
  }
`);

// 执行并获取结果
const result = runner.execute('createResult(true, "成功", { id: 1 })');
console.log(result.value);
// 输出：{ success: true, message: "成功", data: { id: 1 }, timestamp: ... }
```

#### 多函数组合使用

``` typeScript
const runner = new ExpressRunner();

// 预加载字符串处理函数
runner.loadMultiExpress('StringFunctions', `
  function reverse(str) {
    return str.split('').reverse().join('');
  }
  
  function toUpperCase(str) {
    return str.toUpperCase();
  }
  
  function combine(str1, str2) {
    return str1 + " " + str2;
  }
`);

// 链式调用多个函数
const result = runner.execute('toUpperCase(reverse("hello"))');
console.log(result.value); // 输出："OLLEH"

const result2 = runner.execute('combine(toUpperCase("hello"), reverse("world"))')
console.log(result2.value); // 输出："HELLO DLROW"
```

### 绑定实例方法

``` typeScript
const runner = new ExpressRunner();

const service = {
  getValue: (key) => `value of ${key}`,
  calculate: (a, b) => a * b + 100
};

// 绑定实例方法
runner.addFunctionOfServiceMethod('getValue', service, 'getValue');
runner.addFunctionOfServiceMethod('calculate', service, 'calculate');

runner.execute('getValue("name")'); // 返回: "value of name"
runner.execute('calculate(5, 3)'); // 返回: 115
```

## 安全控制

### 超时控制

``` typeScript
const runner = new ExpressRunner({
  security: { timeout: 1000 } // 1秒超时
});

// 或者在执行时设置
runner.execute('while(true){}', {}, { timeout: 100 });
```

### 循环次数限制

``` typeScript
const runner = new ExpressRunner({
  security: { maxLoopCount: 10000 }
});
```

### 沙箱模式

``` typeScript
const runner = new ExpressRunner({
  security: { sandbox: true }
});

// 沙箱模式下禁止:
// - new 操作
// - 访问外部对象
// 只允许使用内置函数和自定义函数
```

### API访问控制

``` typeScript
const runner = new ExpressRunner();

// 添加危险方法到黑名单
runner.addSecurityRiskMethod('MyClass', 'dangerousMethod');

// 设置白名单模式
runner.addSecureMethod('MyClass', 'safeMethod');
```

## API 参考

### ExpressRunner 类

#### 构造函数

``` typeScript
new ExpressRunner(options?: {
  precise?: boolean;      // 是否高精度计算
  shortCircuit?: boolean; // 是否短路求值
  trace?: boolean;        // 是否追踪执行
  security?: SecurityConfig;
});
```

#### 执行方法

``` typeScript
execute(expression: string, context?: object, options?: {
  isCache?: boolean;
  isTrace?: boolean;
  timeout?: number;
}): ExecutionResult
```

#### 函数管理

``` typeScript
addFunction(name: string, handler: Function): void
removeFunction(name: string): boolean
hasFunction(name: string): boolean
addFunctionOfServiceMethod(name: string, service: object, method: string): void
```

#### 操作符管理

``` typeScript
addOperator(name: string, handler: Function): void
replaceOperator(name: string, handler: Function): void
addOperatorWithAlias(alias: string, original: string): void
```

#### 宏管理

``` typeScript
addMacro(name: string, expression: string): void
removeMacro(name: string): boolean
hasMacro(name: string): boolean
getMacro(name: string): string
```

#### 预加载表达式管理

``` typeScript
/**
 * 预加载表达式（函数定义、类定义等）
 * @param name - 表达式名称（可选，用于后续通过名称执行）
 * @param expressContent - 表达式内容
 * @param options - 配置选项
 */
loadMultiExpress(name: string = '', expressContent: string, options?: {
  isCache?: boolean;
  isTrace?: boolean;
}): ExecutionResult

/**
 * 根据名称执行预加载的表达式
 * @param name - 表达式名称
 * @param context - 上下文对象
 * @param options - 执行选项
 */
executeByExpressName(name: string, context?: object, options?: {
  isCache?: boolean;
  isTrace?: boolean;
  timeout?: number;
}): ExecutionResult

/**
 * 获取所有已预加载的命名表达式
 */
getNamedExpressions(): Map<string, string>

/**
 * 检查是否存在指定名称的表达式
 */
hasNamedExpression(name: string): boolean

/**
 * 删除指定的命名表达式
 */
removeNamedExpression(name: string): boolean

/**
 * 清除所有命名表达式
 */
clearNamedExpressions(): void

/**
 * 获取命名表达式数量
 */
getNamedExpressionCount(): number
```

#### 语法分析

``` typeScript
getOutVarNames(expression: string): string[]
getOutFunctionNames(expression: string): string[]
validate(expression: string): { valid: boolean; error?: string }
```

#### 缓存管理

``` typeScript
getInstructionSetFromLocalCache(expression: string): any
clearExpressCache(): void
getCacheSize(): number
```

#### 安全配置

``` typeScript
setSandboxMode(enabled: boolean): void
setTimeout(timeout: number): void
setMaxLoopCount(count: number): void
setMaxArrayLength(length: number): void
addSecurityRiskMethod(className: string, methodName: string): void
addSecureMethod(className: string, methodName: string): void
```

## 使用场景

### 1. 规则引擎

``` typeScript
const runner = new ExpressRunner();

// 定义业务规则
runner.addMacro('VIP 折扣', '会员等级 >= 3 ? 0.8 : (会员等级 >= 1 ? 0.9 : 1)');
runner.addMacro('满减优惠', '订单金额 >= 500 ? 50 : (订单金额 >= 200 ? 20 : 0)');

// 执行规则
const order = {
  会员等级：3,
  订单金额：600
};

const result = runner.execute('订单金额 * VIP 折扣 - 满减优惠', order);
console.log(result.value); // 600 * 0.8 - 50 = 430
```

### 2. 动态配置

``` typeScript
const runner = new ExpressRunner();

// 动态价格计算
const priceConfig = `
  if (购买数量 >= 100) {
    return 单价 * 0.7;
  } else if (购买数量 >= 50) {
    return 单价 * 0.8;
  } else if (购买数量 >= 10) {
    return 单价 * 0.9;
  } else {
    return 单价;
  }
`;

const price = runner.execute(priceConfig, { 单价：100, 购买数量：60 });
console.log(price.value); // 80
```

### 3. 数据验证

``` typeScript
const runner = new ExpressRunner();

// 复杂验证规则
runner.addFunction('validateEmail', (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
runner.addFunction('validatePhone', (phone) => /^1[3-9]\d{9}$/.test(phone));

const validateRule = `
  if (!validateEmail(email)) {
    return "邮箱格式不正确";
  }
  if (!validatePhone(phone)) {
    return "手机号格式不正确";
  }
  if (age < 18 || age > 120) {
    return "年龄必须在 18-120 之间";
  }
  return "验证通过";
`;

const result = runner.execute(validateRule, {
  email: 'test@example.com',
  phone: '13800138000',
  age: 25
});
```

### 4. 报表计算

``` typeScript
const runner = new ExpressRunner();

const reportData = {
  销售额：[1000, 2000, 1500, 3000, 2500],
  成本：[800, 1500, 1200, 2000, 1800]
};

// 计算利润率
const profitRate = runner.execute(`
  总销售额 = sum(销售额);
  总成本 = sum(成本);
  总利润 = 总销售额 - 总成本;
  利润率 = 总利润 / 总销售额 * 100;
  return round(利润率);
`, reportData);

console.log(profitRate.value); // 利润率
```

### 5. 函数库预加载（推荐）

**场景**：在复杂的业务系统中，预先加载常用的业务函数库，然后在多个规则中复用。

``` typeScript
const runner = new ExpressRunner();

// 1. 预加载工具函数库
runner.loadMultiExpress('StringUtils', `
  function isNotEmpty(str) {
    return str != null && str.trim() !== '';
  }
  
  function isValidMobile(mobile) {
    return /^1[3-9]\d{9}$/.test(mobile);
  }
  
  function maskPhone(mobile) {
    if (!isValidMobile(mobile)) return mobile;
    return mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
  }
`);

// 2. 预加载数学计算函数库
runner.loadMultiExpress('MathUtils', `
  function percentage(part, total) {
    return total === 0 ? 0 : (part / total * 100).toFixed(2);
  }
  
  function average(...numbers) {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((a, b) => a + b, 0);
    return (sum / numbers.length).toFixed(2);
  }
  
  function stdDev(...numbers) {
    if (numbers.length <= 1) return 0;
    const avg = numbers.reduce((a, b) => a + b, 0) / numbers.length;
    const squareDiffs = numbers.map(num => Math.pow(num - avg, 2));
    const variance = squareDiffs.reduce((a, b) => a + b, 0) / numbers.length;
    return Math.sqrt(variance).toFixed(2);
  }
`);

// 3. 在实际业务规则中使用
const userData = {
  name: '张三',
  mobile: '13800138000',
  scores: [85, 92, 78, 90, 88]
};

const result = runner.execute(`
  if (isNotEmpty(name) && isValidMobile(mobile)) {
    maskedMobile = maskPhone(mobile);
    avgScore = average(scores);
    stdDevScore = stdDev(scores);
    return {
      姓名：name,
      手机：maskedMobile,
      平均分：avgScore,
      标准差：stdDevScore
    };
  } else {
    return "数据不完整";
  }
`, userData);

console.log(result.value);
// 输出：{ 姓名："张三", 手机："138****8000", 平均分："86.60", 标准差："4.98" }
```

### 6. 模板化业务计算

**场景**：将常见的业务计算逻辑定义为模板函数，传入不同参数即可快速计算。

``` typeScript
const runner = new ExpressRunner();

// 1. 预加载贷款计算器模板
runner.loadMultiExpress('LoanCalculator', `
  function calculateMonthlyPayment(principal, annualRate, months) {
    // 等额本息还款
    const monthlyRate = annualRate / 12 / 100;
    if (monthlyRate === 0) {
      return (principal / months).toFixed(2);
    }
    const payment = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / 
                    (Math.pow(1 + monthlyRate, months) - 1);
    return payment.toFixed(2);
  }
  
  function calculateTotalInterest(principal, monthlyPayment, months) {
    // 计算总利息
    const totalPayment = monthlyPayment * months;
    return (totalPayment - principal).toFixed(2);
  }
  
  function calculateLoanDetails(principal, annualRate, months) {
    const monthlyPayment = calculateMonthlyPayment(principal, annualRate, months);
    const totalInterest = calculateTotalInterest(principal, monthlyPayment, months);
    return {
      月供：monthlyPayment,
      总利息：totalInterest,
      还款总额：(Number(monthlyPayment) * months).toFixed(2)
    };
  }
`);

// 2. 计算不同贷款方案
const loan1 = runner.execute('calculateLoanDetails(1000000, 4.9, 30)', {});
console.log('贷款 100 万，30 年:', loan1.value);
// 输出：{ 月供："5307.27", 总利息："910616.80", 还款总额："1910616.80" }

const loan2 = runner.execute('calculateLoanDetails(500000, 4.5, 20)', {});
console.log('贷款 50 万，20 年:', loan2.value);
// 输出：{ 月供："3163.25", 总利息："259179.20", 还款总额："759179.20" }
```

### 7. 测试用例管理

**场景**：分离函数定义和测试用例，便于单元测试和验证。

``` typeScript
const runner = new ExpressRunner();

// 1. 预加载被测试的函数
runner.loadMultiExpress('ValidatorFunctions', `
  function isPrime(n) {
    if (n <= 1) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  }
  
  function isEven(n) {
    return n % 2 === 0;
  }
  
  function isOdd(n) {
    return n % 2 !== 0;
  }
`);

// 2. 执行多个测试用例
const tests = [
  { expr: 'isPrime(2)', expected: true },
  { expr: 'isPrime(17)', expected: true },
  { expr: 'isPrime(20)', expected: false },
  { expr: 'isEven(10)', expected: true },
  { expr: 'isOdd(7)', expected: true }
];

tests.forEach(test => {
  const result = runner.execute(test.expr);
  console.log(`${test.expr}: ${result.value} (期望：${test.expected})`);
  if (result.value === test.expected) {
    console.log('✓ 通过');
  } else {
    console.log('✗ 失败');
  }
});
```

### 8. 递归与高级算法

**场景**：实现复杂的递归算法，并在多个地方调用。

``` typeScript
const runner = new ExpressRunner();

// 1. 预加载递归函数库
runner.loadMultiExpress('Algorithms', `
  // 快速排序
  function quickSort(arr) {
    if (arr.length <= 1) return arr;
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(x => x < pivot);
    const middle = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);
    return [...quickSort(left), ...middle, ...quickSort(right)];
  }
  
  // 二分查找
  function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] === target) return mid;
      if (arr[mid] < target) left = mid + 1;
      else right = mid - 1;
    }
    return -1;
  }
  
  // 最大公约数
  function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
  }
  
  // 最小公倍数
  function lcm(a, b) {
    return (a * b) / gcd(a, b);
  }
`);

// 2. 使用算法
const sorted = runner.execute('quickSort([64, 34, 25, 12, 22, 11, 90])');
console.log('排序结果:', sorted.value);

const index = runner.execute('binarySearch([1, 3, 5, 7, 9, 11], 7)');
console.log('查找位置:', index.value);

const gcdResult = runner.execute('gcd(48, 18)');
console.log('最大公约数:', gcdResult.value);

const lcmResult = runner.execute('lcm(12, 18)');
console.log('最小公倍数:', lcmResult.value);
```

## 与 QLExpress 的对比

| 特性 | QLExpress (Java) | QLExpress-JS |
|------|-----------------|--------------|
| 运行环境 | JVM | JavaScript 运行时 |
| 类型系统 | 弱类型 | 弱类型 |
| 运算符 | 支持自定义 | 支持自定义 |
| 宏定义 | 支持 | 支持 |
| 控制流 | if/for/while | if/for/while |
| 函数定义 | 支持 | 支持 |
| 安全控制 | 多级安全 | 多级安全 |
| 缓存 | 编译缓存 | 编译缓存 |
| 沙箱模式 | 支持 | 支持 |
| **预加载表达式** | **loadMultiExpress** | **✅ loadMultiExpress** |
| **按名称执行** | **executeByExpressName** | **✅ executeByExpressName** |
| **表达式管理** | **支持** | **✅ 完整支持** |
| **闭包状态保持** | **支持** | **✅ 完整支持** |

## License

MIT
