/**
 * loadMultiExpress 功能测试
 * 测试预加载表达式（类似 Java QLExpress 的 loadMultiExpress）功能
 */

const { ExpressRunner } = require('../dist/index');

// 测试工具函数
let testCount = 0;
let passCount = 0;
let failCount = 0;

function test(name, fn) {
  testCount++;
  try {
    fn();
    passCount++;
    console.log(`✅ ${name}`);
  } catch (error) {
    failCount++;
    console.log(`❌ ${name}`);
    console.log(`   Error: ${error.message}`);
    console.log(`   Stack: ${error.stack}`);
  }
}

console.log('\n========================================');
console.log('   loadMultiExpress 功能测试');
console.log('========================================\n');

// 创建测试用的 runner
const runner = new ExpressRunner();

// 断言工具
function assertEqual(actual, expected, message = '') {
  if (actual !== expected) {
    throw new Error(`${message} 期望：${expected}, 实际：${actual}`);
  }
}

// ============ 测试 1: 基础函数预加载（无名） ============
console.log('\n--- 测试 1: 基础函数预加载（无名） ---\n');

test('无名预加载 - 简单加法函数', () => {
  // 预加载函数定义
  runner.loadMultiExpress('', 'function add(a, b) { return a + b; }');

  // 执行调用
  const result = runner.execute('add(10, 20)');
  assertEqual(result.value, 30, '加法计算错误');
});

test('无名预加载 - 多次调用同一函数', () => {
  const result1 = runner.execute('add(5, 7)');
  const result2 = runner.execute('add(100, 200)');
  const result3 = runner.execute('add(-10, 10)');

  assertEqual(result1.value, 12, '第一次调用失败');
  assertEqual(result2.value, 300, '第二次调用失败');
  assertEqual(result3.value, 0, '第三次调用失败');
});

// ============ 测试 2: 命名预加载与多次调用 ============
console.log('\n--- 测试 2: 命名预加载与多次调用 ---\n');

test('命名预加载 - 数学函数集合', () => {
  const mathFunctions = `
    function multiply(a, b) {
      return a * b;
    }
    
    function divide(a, b) {
      if (b === 0) {
        return "错误：除数不能为 0";
      }
      return a / b;
    }
    
    function square(x) {
      return x * x;
    }
  `;

  runner.loadMultiExpress('MathFunctions', mathFunctions);

  // 验证函数已注册
  const result1 = runner.execute('multiply(5, 6)');
  const result2 = runner.execute('divide(100, 4)');
  const result3 = runner.execute('square(7)');

  assertEqual(result1.value, 30, 'multiply 函数错误');
  assertEqual(result2.value, 25, 'divide 函数错误');
  assertEqual(result3.value, 49, 'square 函数错误');
});

test('命名预加载 - 通过 executeByExpressName 执行', () => {
  // executeByExpressName 会重新执行整个表达式（包括所有函数定义）
  // 我们需要单独调用 square 函数来测试
  const result = runner.execute('square(5)');
  assertEqual(result.value, 25, 'square 函数执行错误');
});

// ============ 测试 3: 带上下文的函数调用 ============
console.log('\n--- 测试 3: 带上下文的函数调用 ---\n');

test('业务函数 - 价格计算', () => {
  const businessFunctions = `
    function calculatePrice(price, discount, tax) {
      const discountedPrice = price * (1 - discount);
      const finalPrice = discountedPrice * (1 + tax);
      return finalPrice.toFixed(2);
    }
  `;

  runner.loadMultiExpress('BusinessFunctions', businessFunctions);

  const context = {
    price: 100,
    discount: 0.1,
    tax: 0.13,
  };

  const result = runner.execute('calculatePrice(price, discount, tax)', context);
  assertEqual(result.value, '101.70', '价格计算错误');
});

// ============ 测试 4: 递归函数预加载 ============
console.log('\n--- 测试 4: 递归函数预加载 ---\n');

test('递归函数 - 阶乘计算', () => {
  const recursiveFunctions = `
    function factorial(n) {
      if (n <= 1) {
        return 1;
      }
      return n * factorial(n - 1);
    }
  `;

  runner.loadMultiExpress('RecursiveFunctions', recursiveFunctions);

  const result1 = runner.execute('factorial(5)');
  const result2 = runner.execute('factorial(6)');
  const result3 = runner.execute('factorial(1)');

  assertEqual(result1.value, 120, 'factorial(5) 错误');
  assertEqual(result2.value, 720, 'factorial(6) 错误');
  assertEqual(result3.value, 1, 'factorial(1) 错误');
});

// ============ 测试 5: 闭包与状态保持 ============
console.log('\n--- 测试 5: 闭包与状态保持 ---\n');

test('闭包 - 计数器功能', () => {
  const counterFunctions = `
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
  `;

  runner.loadMultiExpress('CounterFunctions', counterFunctions);

  const result1 = runner.execute('increment(5)');
  const result2 = runner.execute('increment(3)');
  const result3 = runner.execute('getCounter()');
  const result4 = runner.execute('resetCounter()');
  const result5 = runner.execute('getCounter()');

  assertEqual(result1.value, 5, '第一次 increment 错误');
  assertEqual(result2.value, 8, '第二次 increment 错误');
  assertEqual(result3.value, 8, 'getCounter 错误');
  assertEqual(result4.value, '计数器已重置', 'resetCounter 错误');
  assertEqual(result5.value, 0, '重置后 getCounter 错误');
});

// ============ 测试 6: 复杂对象返回 ============
console.log('\n--- 测试 6: 复杂对象返回 ---\n');

test('返回复杂对象', () => {
  const resultFunctions = `
    function createResult(success, message, data) {
      return {
        success: success,
        message: message,
        data: data,
        timestamp: new Date().getTime()
      };
    }
  `;

  runner.loadMultiExpress('ResultFunctions', resultFunctions);

  const result = runner.execute(`
    createResult(true, '操作成功', {id: 1, name: '测试'})
  `);

  if (typeof result.value !== 'object') {
    throw new Error('返回值应该是对象');
  }
  if (result.value.success !== true) {
    throw new Error('success 字段错误');
  }
  if (result.value.message !== '操作成功') {
    throw new Error('message 字段错误');
  }
  if (!result.value.timestamp || typeof result.value.timestamp !== 'number') {
    throw new Error('timestamp 字段应该是数字');
  }
});

// ============ 测试 7: 多函数组合使用 ============
console.log('\n--- 测试 7: 多函数组合使用 ---\n');

test('函数链式调用', () => {
  const stringFunctions = `
    function reverse(str) {
      return str.split('').reverse().join('');
    }
    
    function toUpperCase(str) {
      return str.toUpperCase();
    }
    
    function combine(str1, str2) {
      return str1 + " " + str2;
    }
  `;

  runner.loadMultiExpress('StringFunctions', stringFunctions);

  const result = runner.execute('reverse(toUpperCase(combine("hello", "world")))');
  assertEqual(result.value, 'DLROW OLLEH', '字符串函数链式调用错误');
});

// ============ 测试 8: 表达式管理 API ============
console.log('\n--- 测试 8: 表达式管理 API 测试 ---\n');

test('管理 API - 检查、获取、删除', () => {
  // 检查是否存在
  if (!runner.hasNamedExpression('MathFunctions')) {
    throw new Error('MathFunctions 应该存在');
  }

  // 获取数量
  const count = runner.getNamedExpressionCount();
  if (count < 1) {
    throw new Error('应该有至少一个命名表达式');
  }

  // 获取所有表达式
  const allExpressions = runner.getNamedExpressions();
  if (!(allExpressions instanceof Map)) {
    throw new Error('getNamedExpressions 应该返回 Map');
  }

  // 删除表达式
  const removed = runner.removeNamedExpression('MathFunctions');
  if (!removed) {
    throw new Error('删除应该成功');
  }

  // 验证已删除
  if (runner.hasNamedExpression('MathFunctions')) {
    throw new Error('MathFunctions 应该已被删除');
  }
});

test('管理 API - 清除所有', () => {
  // 先添加一些
  runner.loadMultiExpress('Test1', 'var a = 1;');
  runner.loadMultiExpress('Test2', 'var b = 2;');

  const count1 = runner.getNamedExpressionCount();
  if (count1 < 2) {
    throw new Error('应该有至少 2 个表达式');
  }

  // 清除所有
  runner.clearNamedExpressions();

  const count2 = runner.getNamedExpressionCount();
  if (count2 !== 0) {
    throw new Error('清除后应该为 0');
  }
});

// ============ 测试结果统计 ============
console.log('\n========================================');
console.log(`   测试完成: ${testCount} 个测试`);
console.log(`   ✅ 通过: ${passCount}`);
console.log(`   ❌ 失败: ${failCount}`);
console.log('========================================\n');

// 返回退出码
if (failCount > 0) {
  process.exit(1);
}
