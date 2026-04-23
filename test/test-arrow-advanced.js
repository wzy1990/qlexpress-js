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

console.log('=== 箭头函数高级测试 ===\n');

const qlExpress = new ExpressRunner();

// 测试1: 高阶函数
test('高阶函数: map + reduce', () => {
  const result1 = qlExpress.execute('[1, 2, 3, 4, 5].map(x => x * x).reduce((a, b) => a + b, 0)');
  if (result1.value !== 55) {
    throw new Error(`期望: 55, 实际: ${result1.value}`);
  }
});

// 测试2: 柯里化
test('柯里化: (x => y => z => x + y + z)(1)(2)(3)', () => {
  const result2 = qlExpress.execute('(x => y => z => x + y + z)(1)(2)(3)');
  if (result2.value !== 6) {
    throw new Error(`期望: 6, 实际: ${result2.value}`);
  }
});

// 测试3: 对象数组处理
test('对象数组处理: 计算总价', () => {
  const result3 = qlExpress.execute(
    'items.map(item => item.price * item.quantity).reduce((sum, price) => sum + price, 0)',
    {
      items: [
        { price: 10, quantity: 2 },
        { price: 20, quantity: 3 },
        { price: 5, quantity: 4 },
      ],
    },
  );
  if (result3.value !== 100) {
    throw new Error(`期望: 100, 实际: ${result3.value}`);
  }
});

// 测试4: 链式调用
test('链式调用: filter -> map -> reduce', () => {
  const result4 = qlExpress.execute(
    '[1, 2, 3, 4, 5, 6].filter(x => x % 2 === 0).map(x => x * x).reduce((a, b) => a + b, 0)',
  );
  if (result4.value !== 56) {
    throw new Error(`期望: 56, 实际: ${result4.value}`);
  }
});

// 测试5: 块级箭头函数
test('块级箭头函数: 带if语句', () => {
  const result5 = qlExpress.execute('nums.map(x => { if (x > 3) return x * 2; else return x; })', {
    nums: [1, 2, 3, 4, 5],
  });
  if (JSON.stringify(result5.value) !== JSON.stringify([1, 2, 3, 8, 10])) {
    throw new Error(`期望: [1, 2, 3, 8, 10], 实际: ${JSON.stringify(result5.value)}`);
  }
});

// 测试6: 闭包和状态保持
test('闭包和状态保持', () => {
  // 使用上下文变量来模拟闭包效果
  const result6 = qlExpress.execute('x => x + baseValue', { x: 5, baseValue: 10 });
  if (typeof result6.value !== 'function') {
    throw new Error(`期望返回函数, 实际: ${typeof result6.value}`);
  }
  const actualValue = result6.value(5);
  if (actualValue !== 15) {
    throw new Error(`期望: 15, 实际: ${actualValue}`);
  }
});

// 测试7: 解构模拟
test('对象属性访问: 计算距离平方', () => {
  const result7 = qlExpress.execute('points.map(p => p.x * p.x + p.y * p.y)', {
    points: [
      { x: 3, y: 4 },
      { x: 5, y: 12 },
    ],
  });
  if (JSON.stringify(result7.value) !== JSON.stringify([25, 169])) {
    throw new Error(`期望: [25, 169], 实际: ${JSON.stringify(result7.value)}`);
  }
});

// 测试8: 多参数组合
test('多参数组合: (a, b, c) => a * b + c', () => {
  const result8 = qlExpress.execute('(a, b, c) => a * b + c', { a: 2, b: 3, c: 4 });
  let actualValue;
  if (typeof result8.value === 'function') {
    actualValue = result8.value(2, 3, 4);
  } else {
    actualValue = result8.value;
  }
  if (actualValue !== 10) {
    throw new Error(`期望: 10, 实际: ${actualValue}`);
  }
});

// 测试9: 箭头函数作为参数
test('箭头函数作为参数: reduce', () => {
  const result9 = qlExpress.execute('[10, 20, 30].reduce((sum, x) => sum + x, 0)');
  if (result9.value !== 60) {
    throw new Error(`期望: 60, 实际: ${result9.value}`);
  }
});

// 测试10: 复杂业务逻辑
test('复杂业务逻辑: 订单折扣计算', () => {
  const result10 = qlExpress.execute(
    'orders.filter(o => o.amount > 100).map(o => o.amount * 0.9).reduce((sum, amount) => sum + amount, 0)',
    { orders: [{ amount: 50 }, { amount: 150 }, { amount: 200 }, { amount: 80 }] },
  );
  if (result10.value !== 315) {
    throw new Error(`期望: 315, 实际: ${result10.value}`);
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
