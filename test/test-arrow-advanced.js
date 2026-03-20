const { ExpressRunner } = require('../dist/index.js');

console.log('=== 箭头函数高级测试 ===\n');

const qlExpress = new ExpressRunner();

// 测试1: 高阶函数
try {
  const result1 = qlExpress.execute('[1, 2, 3, 4, 5].map(x => x * x).reduce((a, b) => a + b, 0)');
  console.log('测试1 - 高阶函数: map + reduce');
  console.log('结果:', result1.value);
  console.log('预期: 55');
  console.log('状态:', result1.value === 55 ? '✅ 通过' : '❌ 失败');
} catch (error) {
  console.log('测试1 - 失败:', error.message);
}
console.log();

// 测试2: 柯里化
try {
  const result2 = qlExpress.execute('(x => y => z => x + y + z)(1)(2)(3)');
  console.log('测试2 - 柯里化: (x => y => z => x + y + z)(1)(2)(3)');
  console.log('结果:', result2.value);
  console.log('预期: 6');
  console.log('状态:', result2.value === 6 ? '✅ 通过' : '❌ 失败');
} catch (error) {
  console.log('测试2 - 失败:', error.message);
}
console.log();

// 测试3: 对象数组处理
try {
  const result3 = qlExpress.execute(
    'items.map(item => item.price * item.quantity).reduce((sum, price) => sum + price, 0)',
    { items: [{ price: 10, quantity: 2 }, { price: 20, quantity: 3 }, { price: 5, quantity: 4 }] }
  );
  console.log('测试3 - 对象数组处理: 计算总价');
  console.log('结果:', result3.value);
  console.log('预期: 100 (10*2 + 20*3 + 5*4 = 20 + 60 + 20)');
  console.log('状态:', result3.value === 100 ? '✅ 通过' : '❌ 失败');
} catch (error) {
  console.log('测试3 - 失败:', error.message);
}
console.log();

// 测试4: 链式调用
try {
  const result4 = qlExpress.execute('[1, 2, 3, 4, 5, 6].filter(x => x % 2 === 0).map(x => x * x).reduce((a, b) => a + b, 0)');
  console.log('测试4 - 链式调用: filter -> map -> reduce');
  console.log('结果:', result4.value);
  console.log('预期: 56 (2² + 4² + 6² = 4 + 16 + 36)');
  console.log('状态:', result4.value === 56 ? '✅ 通过' : '❌ 失败');
} catch (error) {
  console.log('测试4 - 失败:', error.message);
}
console.log();

// 测试5: 块级箭头函数
try {
  const result5 = qlExpress.execute(
    'nums.map(x => { if (x > 3) return x * 2; else return x; })',
    { nums: [1, 2, 3, 4, 5] }
  );
  console.log('测试5 - 块级箭头函数: 带if语句');
  console.log('结果:', result5.value);
  console.log('预期: [1, 2, 3, 8, 10]');
  console.log('状态:', JSON.stringify(result5.value) === JSON.stringify([1, 2, 3, 8, 10]) ? '✅ 通过' : '❌ 失败');
} catch (error) {
  console.log('测试5 - 失败:', error.message);
}
console.log();

// 测试6: 闭包和状态保持
try {
  const result6 = qlExpress.execute(
    '(x => { let counter = 0; return () => { counter += x; return counter; }; })(5)()',
    {}
  );
  console.log('测试6 - 闭包和状态保持');
  console.log('结果:', typeof result6.value === 'function' ? result6.value() : result6.value);
  console.log('预期: 5');
  console.log('状态:', typeof result6.value === 'function' && result6.value() === 5 ? '✅ 通过' : '❌ 失败');
} catch (error) {
  console.log('测试6 - 失败:', error.message);
}
console.log();

// 测试7: 解构模拟
try {
  const result7 = qlExpress.execute(
    'points.map(p => p.x * p.x + p.y * p.y)',
    { points: [{ x: 3, y: 4 }, { x: 5, y: 12 }] }
  );
  console.log('测试7 - 对象属性访问: 计算距离平方');
  console.log('结果:', result7.value);
  console.log('预期: [25, 169]');
  console.log('状态:', JSON.stringify(result7.value) === JSON.stringify([25, 169]) ? '✅ 通过' : '❌ 失败');
} catch (error) {
  console.log('测试7 - 失败:', error.message);
}
console.log();

// 测试8: 多参数组合
try {
  const result8 = qlExpress.execute(
    '(a, b, c) => a * b + c',
    { a: 2, b: 3, c: 4 }
  );
  console.log('测试8 - 多参数组合: (a, b, c) => a * b + c');
  console.log('结果:', typeof result8.value === 'function' ? result8.value(2, 3, 4) : result8.value);
  console.log('预期: 10');
  console.log('状态:', typeof result8.value === 'function' && result8.value(2, 3, 4) === 10 ? '✅ 通过' : '❌ 失败');
} catch (error) {
  console.log('测试8 - 失败:', error.message);
}
console.log();

// 测试9: 箭头函数作为参数
try {
  const result9 = qlExpress.execute(
    '[10, 20, 30].reduce((sum, x) => sum + x, 0)'
  );
  console.log('测试9 - 箭头函数作为参数: reduce');
  console.log('结果:', result9.value);
  console.log('预期: 60');
  console.log('状态:', result9.value === 60 ? '✅ 通过' : '❌ 失败');
} catch (error) {
  console.log('测试9 - 失败:', error.message);
}
console.log();

// 测试10: 复杂业务逻辑
try {
  const result10 = qlExpress.execute(
    'orders.filter(o => o.amount > 100).map(o => o.amount * 0.9).reduce((sum, amount) => sum + amount, 0)',
    { orders: [{ amount: 50 }, { amount: 150 }, { amount: 200 }, { amount: 80 }] }
  );
  console.log('测试10 - 复杂业务逻辑: 订单折扣计算');
  console.log('结果:', result10.value);
  console.log('预期: 315 (150*0.9 + 200*0.9 = 135 + 180)');
  console.log('状态:', result10.value === 315 ? '✅ 通过' : '❌ 失败');
} catch (error) {
  console.log('测试10 - 失败:', error.message);
}
console.log();

console.log('=== 测试完成 ===');
