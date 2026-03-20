const { ExpressRunner } = require('../dist/index.js');

const qlExpress = new ExpressRunner();

console.log('=== 箭头函数测试 ===\n');

// 测试1: 简单箭头函数
try {
  const result1 = qlExpress.execute('x => x * 2', { x: 5 });
  console.log('测试1 - 简单箭头函数: x => x * 2, x=5');
  console.log('结果:', typeof result1.value === 'function' ? result1.value(5) : result1.value);
  console.log('预期: 10');
  console.log('状态:', typeof result1.value === 'function' && result1.value(5) === 10 ? '✅ 通过' : '❌ 失败');
} catch (error) {
  console.log('测试1 - 失败:', error.message);
}
console.log();

// 测试2: 多参数箭头函数
try {
  const result2 = qlExpress.execute('(a, b) => a + b', { a: 3, b: 4 });
  console.log('测试2 - 多参数箭头函数: (a, b) => a + b, a=3, b=4');
  console.log('结果:', typeof result2.value === 'function' ? result2.value(3, 4) : result2.value);
  console.log('预期: 7');
  console.log('状态:', typeof result2.value === 'function' && result2.value(3, 4) === 7 ? '✅ 通过' : '❌ 失败');
} catch (error) {
  console.log('测试2 - 失败:', error.message);
}
console.log();

// 测试3: 块级箭头函数
try {
  const result3 = qlExpress.execute('x => { return x * x; }', { x: 5 });
  console.log('测试3 - 块级箭头函数: x => { return x * x; }, x=5');
  console.log('结果:', typeof result3.value === 'function' ? result3.value(5) : result3.value);
  console.log('预期: 25');
  console.log('状态:', typeof result3.value === 'function' && result3.value(5) === 25 ? '✅ 通过' : '❌ 失败');
} catch (error) {
  console.log('测试3 - 失败:', error.message);
}
console.log();

// 测试4: 闭包
try {
  const result4 = qlExpress.execute('x => x + multiplier', { x: 5, multiplier: 10 });
  console.log('测试4 - 闭包: x => x + multiplier, x=5, multiplier=10');
  console.log('结果:', typeof result4.value === 'function' ? result4.value(5) : result4.value);
  console.log('预期: 15');
  console.log('状态:', typeof result4.value === 'function' && result4.value(5) === 15 ? '✅ 通过' : '❌ 失败');
} catch (error) {
  console.log('测试4 - 失败:', error.message);
}
console.log();

// 测试5: 立即调用
try {
  const result5 = qlExpress.execute('(x => x * 3)(5)', {});
  console.log('测试5 - 立即调用: (x => x * 3)(5)');
  console.log('结果:', result5.value);
  console.log('预期: 15');
  console.log('状态:', result5.value === 15 ? '✅ 通过' : '❌ 失败');
} catch (error) {
  console.log('测试5 - 失败:', error.message);
}
console.log();

// 测试6: 数组map
try {
  const result6 = qlExpress.execute('[1, 2, 3].map(x => x * 2)', {});
  console.log('测试6 - 数组map: [1, 2, 3].map(x => x * 2)');
  console.log('结果:', result6.value);
  console.log('预期: [2, 4, 6]');
  console.log('状态:', JSON.stringify(result6.value) === JSON.stringify([2, 4, 6]) ? '✅ 通过' : '❌ 失败');
} catch (error) {
  console.log('测试6 - 失败:', error.message);
}
console.log();

// 测试7: 数组filter
try {
  const result7 = qlExpress.execute('[1, 2, 3, 4, 5].filter(x => x > 2)', {});
  console.log('测试7 - 数组filter: [1, 2, 3, 4, 5].filter(x => x > 2)');
  console.log('结果:', result7.value);
  console.log('预期: [3, 4, 5]');
  console.log('状态:', JSON.stringify(result7.value) === JSON.stringify([3, 4, 5]) ? '✅ 通过' : '❌ 失败');
} catch (error) {
  console.log('测试7 - 失败:', error.message);
}
console.log();

// 测试8: 嵌套箭头函数
try {
  const result8 = qlExpress.execute('(x => y => x + y)(5)(3)', {});
  console.log('测试8 - 嵌套箭头函数: (x => y => x + y)(5)(3)');
  console.log('结果:', result8.value);
  console.log('预期: 8');
  console.log('状态:', result8.value === 8 ? '✅ 通过' : '❌ 失败');
} catch (error) {
  console.log('测试8 - 失败:', error.message);
}
console.log();

// 测试9: 复杂表达式
try {
  const result9 = qlExpress.execute('(a, b) => a * a + b * b', { a: 3, b: 4 });
  console.log('测试9 - 复杂表达式: (a, b) => a * a + b * b, a=3, b=4');
  console.log('结果:', typeof result9.value === 'function' ? result9.value(3, 4) : result9.value);
  console.log('预期: 25');
  console.log('状态:', typeof result9.value === 'function' && result9.value(3, 4) === 25 ? '✅ 通过' : '❌ 失败');
} catch (error) {
  console.log('测试9 - 失败:', error.message);
}
console.log();

// 测试10: 三元表达式
try {
  const result10 = qlExpress.execute('x => x > 0 ? "positive" : "non-positive"', { x: 5 });
  console.log('测试10 - 三元表达式: x => x > 0 ? "positive" : "non-positive", x=5');
  console.log('结果:', typeof result10.value === 'function' ? result10.value(5) : result10.value);
  console.log('预期: "positive"');
  console.log('状态:', typeof result10.value === 'function' && result10.value(5) === 'positive' ? '✅ 通过' : '❌ 失败');
} catch (error) {
  console.log('测试10 - 失败:', error.message);
}
console.log();

console.log('=== 测试完成 ===');
