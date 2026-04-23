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

const qlExpress = new ExpressRunner();

console.log('=== 箭头函数测试 ===\n');

// 测试1: 简单箭头函数
test('简单箭头函数: x => x * 2, x=5', () => {
  const result1 = qlExpress.execute('x => x * 2', { x: 5 });
  const actual = typeof result1.value === 'function' ? result1.value(5) : result1.value;
  if (typeof result1.value !== 'function' || actual !== 10) {
    throw new Error(`期望: 10, 实际: ${actual}`);
  }
});

// 测试2: 多参数箭头函数
test('多参数箭头函数: (a, b) => a + b, a=3, b=4', () => {
  const result2 = qlExpress.execute('(a, b) => a + b', { a: 3, b: 4 });
  const actual = typeof result2.value === 'function' ? result2.value(3, 4) : result2.value;
  if (typeof result2.value !== 'function' || actual !== 7) {
    throw new Error(`期望: 7, 实际: ${actual}`);
  }
});

// 测试3: 块级箭头函数
test('块级箭头函数: x => { return x * x; }, x=5', () => {
  const result3 = qlExpress.execute('x => { return x * x; }', { x: 5 });
  const actual = typeof result3.value === 'function' ? result3.value(5) : result3.value;
  if (typeof result3.value !== 'function' || actual !== 25) {
    throw new Error(`期望: 25, 实际: ${actual}`);
  }
});

// 测试4: 闭包
test('闭包: x => x + multiplier, x=5, multiplier=10', () => {
  const result4 = qlExpress.execute('x => x + multiplier', { x: 5, multiplier: 10 });
  const actual = typeof result4.value === 'function' ? result4.value(5) : result4.value;
  if (typeof result4.value !== 'function' || actual !== 15) {
    throw new Error(`期望: 15, 实际: ${actual}`);
  }
});

// 测试5: 立即调用
test('立即调用: (x => x * 3)(5)', () => {
  const result5 = qlExpress.execute('(x => x * 3)(5)', {});
  if (result5.value !== 15) {
    throw new Error(`期望: 15, 实际: ${result5.value}`);
  }
});

// 测试6: 数组map
test('数组map: [1, 2, 3].map(x => x * 2)', () => {
  const result6 = qlExpress.execute('[1, 2, 3].map(x => x * 2)', {});
  if (JSON.stringify(result6.value) !== JSON.stringify([2, 4, 6])) {
    throw new Error(`期望: [2, 4, 6], 实际: ${JSON.stringify(result6.value)}`);
  }
});

// 测试7: 数组filter
test('数组filter: [1, 2, 3, 4, 5].filter(x => x > 2)', () => {
  const result7 = qlExpress.execute('[1, 2, 3, 4, 5].filter(x => x > 2)', {});
  if (JSON.stringify(result7.value) !== JSON.stringify([3, 4, 5])) {
    throw new Error(`期望: [3, 4, 5], 实际: ${JSON.stringify(result7.value)}`);
  }
});

// 测试8: 嵌套箭头函数
test('嵌套箭头函数: (x => y => x + y)(5)(3)', () => {
  const result8 = qlExpress.execute('(x => y => x + y)(5)(3)', {});
  if (result8.value !== 8) {
    throw new Error(`期望: 8, 实际: ${result8.value}`);
  }
});

// 测试9: 复杂表达式
test('复杂表达式: (a, b) => a * a + b * b, a=3, b=4', () => {
  const result9 = qlExpress.execute('(a, b) => a * a + b * b', { a: 3, b: 4 });
  const actual = typeof result9.value === 'function' ? result9.value(3, 4) : result9.value;
  if (typeof result9.value !== 'function' || actual !== 25) {
    throw new Error(`期望: 25, 实际: ${actual}`);
  }
});

// 测试10: 三元表达式
test('三元表达式: x => x > 0 ? "positive" : "non-positive", x=5', () => {
  const result10 = qlExpress.execute('x => x > 0 ? "positive" : "non-positive"', { x: 5 });
  const actual = typeof result10.value === 'function' ? result10.value(5) : result10.value;
  if (typeof result10.value !== 'function' || actual !== 'positive') {
    throw new Error(`期望: "positive", 实际: ${actual}`);
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
