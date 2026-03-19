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

```javascript
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

```javascript
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

```javascript
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

```javascript
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

```javascript
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

```javascript
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

```javascript
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

```javascript
min(a, b, ...)   // 最小值
max(a, b, ...)   // 最大值
sum(a, b, ...)   // 求和
avg(a, b, ...)   // 平均值
```

### 字符串函数

```javascript
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

```javascript
size(arr)           // 数组大小
first(arr)          // 第一个元素
last(arr)           // 最后一个元素
range(start, end)   // 生成范围数组
unique(arr)         // 去重
reverseArray(arr)   // 反转数组
```

### 类型检查函数

```javascript
isArray(x)      // 是否为数组
isObject(x)     // 是否为对象
isString(x)     // 是否为字符串
isNumber(x)     // 是否为数字
isBoolean(x)    // 是否为布尔值
isNull(x)       // 是否为null
isEmpty(x)      // 是否为空
```

### 日期函数

```javascript
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

```javascript
if(condition, trueVal, falseVal)  // 条件选择
switch(value, case1, val1, ...)   // switch选择
coalesce(v1, v2, ...)             // 返回第一个非空值
defaultIfEmpty(val, default)       // 默认值
```

### 集合创建

```javascript
NewList(1, 2, 3)           // 创建List
NewMap([key1, val1], ...)  // 创建Map
NewSet(1, 2, 3)            // 创建Set
```

## 自定义扩展

### 添加自定义函数

```javascript
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

```javascript
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

```javascript
const runner = new ExpressRunner();

// 中文别名
runner.addOperatorWithAlias('加', '+', null);
runner.addOperatorWithAlias('减', '-', null);
runner.addOperatorWithAlias('乘', '*', null);
runner.addOperatorWithAlias('除', '/', null);

runner.execute('10 加 5 乘 2'); // 返回: 20
```

### 宏定义

```javascript
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

### 绑定实例方法

```javascript
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

```javascript
const runner = new ExpressRunner({
  security: { timeout: 1000 } // 1秒超时
});

// 或者在执行时设置
runner.execute('while(true){}', {}, { timeout: 100 });
```

### 循环次数限制

```javascript
const runner = new ExpressRunner({
  security: { maxLoopCount: 10000 }
});
```

### 沙箱模式

```javascript
const runner = new ExpressRunner({
  security: { sandbox: true }
});

// 沙箱模式下禁止:
// - new 操作
// - 访问外部对象
// 只允许使用内置函数和自定义函数
```

### API访问控制

```javascript
const runner = new ExpressRunner();

// 添加危险方法到黑名单
runner.addSecurityRiskMethod('MyClass', 'dangerousMethod');

// 设置白名单模式
runner.addSecureMethod('MyClass', 'safeMethod');
```

## API 参考

### ExpressRunner 类

#### 构造函数

```javascript
new ExpressRunner(options?: {
  precise?: boolean;      // 是否高精度计算
  shortCircuit?: boolean; // 是否短路求值
  trace?: boolean;        // 是否追踪执行
  security?: SecurityConfig;
});
```

#### 执行方法

```javascript
execute(expression: string, context?: object, options?: {
  isCache?: boolean;
  isTrace?: boolean;
  timeout?: number;
}): ExecutionResult
```

#### 函数管理

```javascript
addFunction(name: string, handler: Function): void
removeFunction(name: string): boolean
hasFunction(name: string): boolean
addFunctionOfServiceMethod(name: string, service: object, method: string): void
```

#### 操作符管理

```javascript
addOperator(name: string, handler: Function): void
replaceOperator(name: string, handler: Function): void
addOperatorWithAlias(alias: string, original: string): void
```

#### 宏管理

```javascript
addMacro(name: string, expression: string): void
removeMacro(name: string): boolean
hasMacro(name: string): boolean
getMacro(name: string): string
```

#### 语法分析

```javascript
getOutVarNames(expression: string): string[]
getOutFunctionNames(expression: string): string[]
validate(expression: string): { valid: boolean; error?: string }
```

#### 缓存管理

```javascript
getInstructionSetFromLocalCache(expression: string): any
clearExpressCache(): void
getCacheSize(): number
```

#### 安全配置

```javascript
setSandboxMode(enabled: boolean): void
setTimeout(timeout: number): void
setMaxLoopCount(count: number): void
setMaxArrayLength(length: number): void
addSecurityRiskMethod(className: string, methodName: string): void
addSecureMethod(className: string, methodName: string): void
```

## 使用场景

### 1. 规则引擎

```javascript
const runner = new ExpressRunner();

// 定义业务规则
runner.addMacro('VIP折扣', '会员等级 >= 3 ? 0.8 : (会员等级 >= 1 ? 0.9 : 1)');
runner.addMacro('满减优惠', '订单金额 >= 500 ? 50 : (订单金额 >= 200 ? 20 : 0)');

// 执行规则
const order = {
  会员等级: 3,
  订单金额: 600
};

const result = runner.execute('订单金额 * VIP折扣 - 满减优惠', order);
console.log(result.value); // 600 * 0.8 - 50 = 430
```

### 2. 动态配置

```javascript
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

const price = runner.execute(priceConfig, { 单价: 100, 购买数量: 60 });
console.log(price.value); // 80
```

### 3. 数据验证

```javascript
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
    return "年龄必须在18-120之间";
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

```javascript
const runner = new ExpressRunner();

const reportData = {
  销售额: [1000, 2000, 1500, 3000, 2500],
  成本: [800, 1500, 1200, 2000, 1800]
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

## License

MIT
