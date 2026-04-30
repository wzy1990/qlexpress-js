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
  }
}

const { ExpressRunner } = require('../dist/index.js');

console.log('=== 占位符功能测试 ===\n');

// 创建表达式运行器
const runner = new ExpressRunner();

// 测试用例1: 基本占位符
test('基本占位符', () => {
  const context1 = { name: 'Alice', age: 25 };
  const result1 = runner.execute('${name} + " is " + ${age} + " years old"', context1).value;
  if (result1 !== 'Alice is 25 years old') {
    throw new Error(`期望: "Alice is 25 years old", 实际: "${result1}"`);
  }
});

// 测试用例2: 占位符与运算
test('占位符与运算', () => {
  const context2 = { a: 10, b: 20 };
  const result2 = runner.execute('${a} + ${b}', context2).value;
  if (result2 !== 30) {
    throw new Error(`期望: 30, 实际: ${result2}`);
  }
});

// 测试用例3: 混合占位符和普通标识符
test('混合占位符和普通标识符', () => {
  const context3 = { x: 5, y: 3 };
  // 注意：这里需要确保普通标识符也能正常工作
  const result3 = runner.execute('x + ${y}', context3).value;
  if (result3 !== 8) {
    throw new Error(`期望: 8, 实际: ${result3}`);
  }
});

// 测试用例4: 复杂表达式
test('复杂表达式', () => {
  const context4 = { price: 100, discount: 0.1, tax: 0.08 };
  const result4 = runner.execute('${price} * (1 - ${discount}) * (1 + ${tax})', context4).value;
  const expected4 = 100 * (1 - 0.1) * (1 + 0.08);
  if (Math.abs(result4 - expected4) > 0.001) {
    throw new Error(`期望: ${expected4}, 实际: ${result4}`);
  }
});

// 测试用例5: 未定义的占位符
test('未定义的占位符', () => {
  const context5 = { defined: 'value' };
  const result5 = runner.execute('"defined: " + ${defined} + ", undefined: " + ${undefinedVar}', context5).value;
  // 未定义的变量应该返回 undefined
  if (!result5.includes('undefined: undefined')) {
    throw new Error(`期望包含 "undefined: undefined", 实际: "${result5}"`);
  }
});

// 测试用例6: 字符串连接
test('字符串连接', () => {
  const context6 = { firstName: 'John', lastName: 'Doe' };
  const result6 = runner.execute('"Hello " + ${firstName} + " " + ${lastName} + "!"', context6).value;
  if (result6 !== 'Hello John Doe!') {
    throw new Error(`期望: "Hello John Doe!", 实际: "${result6}"`);
  }
});

// 测试用例7: 数字占位符计算
test('数字占位符计算', () => {
  const context7 = { num1: 15, num2: 25 };
  const result7 = runner.execute('${num1} * ${num2}', context7).value;
  if (result7 !== 375) {
    throw new Error(`期望: 375, 实际: ${result7}`);
  }
});

// 测试用例8: 布尔值占位符
test('布尔值占位符', () => {
  const context8 = { isActive: true, isAdmin: false };
  const result8 = runner.execute('${isActive} && !${isAdmin}', context8).value;
  if (result8 !== true) {
    throw new Error(`期望: true, 实际: ${result8}`);
  }
});

// 测试用例9: 嵌套表达式
test('嵌套表达式', () => {
  const context9 = { base: 10, multiplier: 2, offset: 5 };
  const result9 = runner.execute('(${base} + ${offset}) * ${multiplier}', context9).value;
  if (result9 !== 30) {
    throw new Error(`期望: 30, 实际: ${result9}`);
  }
});

// 测试用例10: 中文变量名占位符
test('中文变量名占位符', () => {
  const context10 = { 姓名: '张三', 年龄: 30 };
  const result10 = runner.execute('${姓名} + "今年" + ${年龄} + "岁"', context10).value;
  if (result10 !== '张三今年30岁') {
    throw new Error(`期望: "张三今年30岁", 实际: "${result10}"`);
  }
});

console.log('\n========================================');
console.log(`   测试完成: ${testCount} 个测试`);
console.log(`   ✅ 通过: ${passCount}`);
console.log(`   ❌ 失败: ${failCount}`);
console.log('========================================\n');

// 返回退出码
if (failCount > 0) {
  process.exit(1);
}